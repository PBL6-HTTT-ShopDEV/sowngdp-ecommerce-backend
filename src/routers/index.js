'use strict'

const express = require('express');
const { apiKey, checkPermission } = require('../auth/authUtils');
const router = express.Router();

// router.get('/', (req, res, next) => {
//     return res.status(200).json({
//         message: 'Welcome Fantipjs, this data is got by router',
//     });
// });


//đầu tiên 1 cái hệ thống ít nhất là phải chúng ta biết cái api đó xài cái version của chúng ta hay k
//check apiKey
router.use(apiKey);
//check permission - check xem key này có đc uỷ quyền vào hệ thống backend của chúng ta hay k
router.use(checkPermission('0000'));

router.use('/v1/api', require('./access'));
// router.use('/v1/api', require('./cart'));
// router.use('/v1/api', require('./product'));
module.exports = router;