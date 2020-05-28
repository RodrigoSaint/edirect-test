const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./model");
const safe = require("../safe");

const SALT_ROUNDS = 10;
const SECRET = "#&49R:aj/{fHC}hH";

const router = express.Router();

router.get("/current-user", async (req, res) => {
  const { userId } = req;
  const user = await User.findById(userId);
  res.status(200).send(user);
});

router.post(
  "/",
  safe(async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).send(user);
  })
);

router.post(
  "/login",
  safe(async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    });
    const isSamePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isSamePassword) {
      res.status(403).send();
      return;
    }

    const token = jwt.sign({ userId: user._id }, SECRET);
    res.status(200).send({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  })
);

router.put(
  "/",
  safe(async (req, res) => {
    const { userId } = req;
    const changedUser = await User.findByIdAndUpdate(userId, req.body);
    req.status(200).send(changedUser);
  })
);

module.exports = router;
