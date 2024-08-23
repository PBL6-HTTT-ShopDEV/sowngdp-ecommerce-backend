"use strict";

const express = require("express");
const router = express.Router();

router.use("/v1/api", require("./access"));
/*
router.get("", (req, res, next) => {
  return res.status(200).json({
    message: "Welcom to my first RestfulAPI server by NodeJS",
  });
});
*/

module.exports = router;
