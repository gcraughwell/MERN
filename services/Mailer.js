const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// new Mailer calls the constructor automatically
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    //Keys.sendgridKey is from config
    this.sgApi = sendgrid(keys.sendGridKey);
    //helper is sendgrid to help it work in the email
    this.from_email = new helper.Email('no-reply@supafolk.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    //addContent is a helper from helper.Mail
    //adds the body content
    //addClickTracking is a helper function defined below in the class
    //addRecipients is a helper functions
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  //formats all the recipients from recipients/email
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request);
    return response;
  }
}
module.exports = Mailer;
