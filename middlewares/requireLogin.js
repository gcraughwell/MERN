//next is a function called when the function is complete.
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must be logged in!' });
  }
  next();
};
