const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.use("/", (req, res, next) => {
  if (!req.headers.authorization) {
    next();
    return;
  }
  const { userId } = jwt.decode(req.headers.authorization);
  req.userId = userId;
  next();
});

module.exports = router;
