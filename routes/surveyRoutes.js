const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for providing feedback');
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
