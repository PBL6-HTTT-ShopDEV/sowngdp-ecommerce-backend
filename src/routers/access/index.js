'use strict';

const express = require('express');
const { asyncHandler, authenticationV2 } = require('../../auth/authUtils');
const accessController = require('../../controllers/access.controller');
const router = express.Router();

//signUp
router.post('/account/signup', asyncHandler(accessController.signUp));
router.post('/account/login', asyncHandler(accessController.logIn));


// router.use(asyncHandler(authenticationV2));
router.post('/account/logout', asyncHandler(authenticationV2), asyncHandler(accessController.logOut));
router.post('/account/handlerRefreshToken', asyncHandler(authenticationV2), asyncHandler(accessController.handlerRefreshToken));


module.exports = router;