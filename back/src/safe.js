const { Error } = require("mongoose");

module.exports = (callback) => async (req, res, next) => {
  try {
    await callback(req, res, next);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send();
      return;
    }
    res.status(500).send();
  }
};
