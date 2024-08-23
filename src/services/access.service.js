"use strict";

const shopModel = require("../models/shop.model");

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step 1: check if email exists
      const holelShop = await shopModel.findOne({ email }).lean();
      if (holelShop) {
        return {
          code: 400,
          // 400: Bad Request
          message: "Email already exists",
          status: "error",
        };
      } else {
      }
    } catch (error) {
      return {
        code: 500,
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService();
