require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

// Init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Init DB
require("./dbs/init.mongodb");
/*
const { checkOverLoad } = require("./helpers/check.connect");
checkOverLoad();
*/
// Init routes
app.use("/", require("./routers"));
/*
 app.get("/", (req, res) => {
  const strsForTestCompression = "Hello World";
  return res.status(200).json({
    message: "Welcom to my first RestfulAPI server by NodeJS",
    metadata: strsForTestCompression.repeat(1000),
  });
});
*/
// Handle errors

module.exports = app;
