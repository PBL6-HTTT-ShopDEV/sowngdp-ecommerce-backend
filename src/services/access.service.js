"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITER: "EDITER",
  ADMIN: "ADMIN",

}

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
          // create private key and public key
          const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            /*
            publicKeyEncoding: {
              type: "spki",
              format: "pem",
            },
            privateKeyEncoding: {
              type: "pkcs8",
              format: "pem",
            },
            */

          });
          console.log(publicKey);
          console.log(privateKey);

          // create token
          const publicKeyString = KeyTokenService.createKeyToken({
            userId: newShop._id,
            publicKey,
          });
          console.log(publicKeyString);
          if (!publicKeyString) {
            return {
              code: 500,
              message: "Error creating token",
              status: "error",
            };
          }

        }
        /*
        await newShop.save();
        return {
          code: 201,
          // 201: Created
          message: "Shop created successfully",
          status: "success",
        };
        */
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
