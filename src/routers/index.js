"use strict";

const express = require("express");
const router = express.Router();

router.use("/v1/api", require("./access"));

// check API key

// check permission

module.exports = router;
