'use strict'


const keyTokenModel = require('../models/keytoken.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey }) => {
        try {
            const publicKeyString = publicKey.toString();
            const tokens = await keyTokenModel.create({
                user: userId,
                publicKey: publicKeyString,
            });
            /*
            await newKey.save();
            return {
                code: 201,
                message: "Key created successfully",
            };
            */
            return tokens ? publicKeyString : null;
        } catch (error) {
            return {
                code: 500,
                message: error.message,
            };
        }
    };
}

module.exports = KeyTokenService;