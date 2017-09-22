const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  //find all the surveys made by this user
  //_user is from the survey model  _user needs to be logged in req.user.id
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for providing feedback');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact() //Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.
      .uniqBy('email', 'surveyId') //removes duplicates
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId, //_ is mongo
            recipients: {
              $elemMatch: { email: email, responded: false } //find email and no response
            }
          },
          {
            //$inc $set are mongo operators
            //[choice] will changed to yes or no and increase 1
            $inc: { [choice]: 1 },
            //look inside the survey found and the recipients sub document $ lines up with $elemMatch
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec(); //exec is needed to execute the function
      })
      .value(); //new array and we assign to events
    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      //splits the emails by the comma and removes all whitespace email.trim()
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id, //user id from mongoose
      dateSent: Date.now()
    });

    //Send Email
    //first argument survey is the body and list of recipents
    //second argument is the html survey template to send
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save(); //saves the survey to the datbase
      req.user.credits -= 1; //takes a credit
      const user = await req.user.save(); //updates req.user to const user
      res.send(user); //sends updated user to the database
    } catch (err) {
      res.status(422).send(err); //unprocessable
    }
  });
};
