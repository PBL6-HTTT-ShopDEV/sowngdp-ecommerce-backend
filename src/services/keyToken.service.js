'use strict'


const keyTokenModel = require('../models/keytoken.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const tokens = await keyTokenModel.create({
                user: userId,
                publicKey,
                privateKey,
            });
            /*
            await newKey.save();
            return {
                code: 201,
                message: "Key created successfully",
            };
            */
            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return {
                code: 500,
                message: error.message,
            };
        }
    };
}

module.exports = KeyTokenService;