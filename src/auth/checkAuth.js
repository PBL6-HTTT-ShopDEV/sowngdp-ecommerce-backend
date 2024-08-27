"use strict";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKeyService = require("../services/apiKey.service");

const checkAuth = async (req, res, next) => {
  try {
    const apiKey = req.headers[HEADER.API_KEY]?.toString();
    const authorization = req.headers[HEADER.AUTHORIZATION];
    if (!apiKey || !authorization) {
      return res.json({
        status: 403,
        message: "Forbidden",
      });
    }

    const objectKey = await apiKeyService.findByID(apiKey);

  } catch (error) {
    return res.json({
      status: 403,
      message: "Forbidden",
    });
  }
};


module.exports = {
    checkAuth,
}