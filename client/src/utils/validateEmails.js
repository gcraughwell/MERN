const regularExpression = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  emails = emails.replace(/(^[,\s]+)|([,\s]+$)/g, '');
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => regularExpression.test(email) === false);

  if (invalidEmails.length) {
    return `Invalid Email Address: ${invalidEmails}`;
  }
  return;
};
