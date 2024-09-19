'use strict';

const { Created, Success } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {

    async handlerRefreshToken(req, res, next) {
        const jsonData = await AccessService.handlerRefreshTokenV2({
            refreshToken: req.refreshToken,
            user: req.user,
            keyStore: req.keyStore,
        });

        return new Success({
            message: 'Get token success!',
            metadata: jsonData,
        }
        ).send(res);
    }


    async logOut(req, res, next) {
        const jsonData = await AccessService.logOut(req.keyStore);
        return new Success({
            message: 'LogOut success!',
            metadata: jsonData,
        }
        ).send(res);
    }


    async logIn(req, res, next) {
        const jsonData = await AccessService.login(req.body);
        return new Success({
            message: 'Log in success!',
            metadata: jsonData,
        }
        ).send(res);
    }

    async signUp( req, res, next ) {
        const jsonData = await AccessService.signUp(req.body);
        return new Created({
            message: 'Sign up success!',
            metadata: jsonData,
        }).send(res);
    };
};

module.exports = new AccessController();