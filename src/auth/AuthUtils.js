'use strict'

const jwt = require('jsonwebtoken')

const createTokenPair = async ( payload, privateKey, publicKey ) => {
    try {
        const accessToken = jwt.sign(payload, publicKey, { expiresIn: '2 days' });
        const refreshToken = jwt.sign(payload, privateKey, { expiresIn: '7 days' });

        jwt.verify(accessToken, publicKey, (err, decoded) => {
            if (err) {
                console.log(err, 'error verify accessToken');
            } else {
                console.log(decoded, 'decoded verify accessToken');
            }
        }
        );

        return { accessToken, refreshToken };
    } catch (error) {
        return null;
    }
}


module.exports = {
    createTokenPair,
};