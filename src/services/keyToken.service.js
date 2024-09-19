'use strict';

const keyTokenModel = require("../models/keyToken.model");
const { Types } = require('mongoose');

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            //publicKey duoc sinh ra boi thuat toan bat doi xung
            //cho nen no la buffer, chua duoc hash
            //chung ta se chuyen ve toString
            //de luu vao trong DB, neu khong  se bi loi

            //level 0
            // const tokens = await keyTokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // })
            // return tokens ? tokens.publicKey : null;


            //level xxx
            const filter = { user: userId }
            const update = {
                publicKey,
                privateKey,
                refreshTokensUsed: [],
                refreshToken
            };
            //Neu ma chua co thi no se insert moi, neu ma co roi thi no se update
            const option = {
                upsert: true,
                new: true
            }
            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, option);
            return tokens ? tokens.publicKey : null;
        } catch (err) {
            return err;
        }
    }

    static findByUserId = async (userId) => {
        return await keyTokenModel.findOne({ user: new Types.ObjectId(userId) });
    }

    static removeKeyToken = async (keyTokenId) => {
        return await keyTokenModel.deleteOne({ _id: keyTokenId});
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken });
    }

    static findByRefreshToken = async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshToken: refreshToken });
    }
};

module.exports = KeyTokenService;