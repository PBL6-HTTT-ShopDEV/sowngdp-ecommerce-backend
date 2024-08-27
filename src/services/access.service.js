"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const { getInfoData } = require("../Utils");
/**
 * The AuthUtils module provides utility functions for authentication.
 * @module AuthUtils
 */
const AuthUtils = require("../auth/authUtils");
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITER: "EDITER",
  ADMIN: "ADMIN",
};

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
      }
      // step 2: hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // step 3: save user
      const newShop = new shopModel({
        name,
        email,
        password: hashedPassword,
        role: [RoleShop.SHOP],
      });

      if (newShop) {


        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        // create token
        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });
        console.log(keyStore);
        if (!keyStore) {
          return {
            code: 500,
            message: "Error creating token",
            status: "error",
          };
        }

        // create token pair
        const tokenPair = await AuthUtils.createTokenPair(
          { id: newShop._id, email },
          publicKey,
          privateKey
        );

        console.log("create token success", tokenPair);
        await newShop.save();
        return {
          code: 201,
          // 201: Created
          message: "Shop created successfully",
          status: "success",
          metadata: getInfoData({fileds: ["name", "email"], object:newShop}),
          tokenPair,
        };
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

module.exports = AccessService;
