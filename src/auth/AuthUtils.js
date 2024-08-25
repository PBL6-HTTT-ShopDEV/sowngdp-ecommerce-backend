'use strict'

const jwt = require('jsonwebtoken')

const createTokenPair = async ( payload, privateKey, publicKey ) => {
    try {
        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
        const refreshToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
        return { token, refreshToken };
    } catch (error) {
        return null;
    }
}


module.exports = {
    createTokenPair,
};