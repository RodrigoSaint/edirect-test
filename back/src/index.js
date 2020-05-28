const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRouter = require("./auth");
const userRouter = require("./user/router");
const projectRouter = require("./project/router");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/project", projectRouter);

connect(
  "mongodb://edirect_server:MMaK66e5b2tqTPfQ@ds249967.mlab.com:49967/edirect_test",
  { useNewUrlParser: true }
).then(() => app.listen(3000, () => console.log("Server Started")));
