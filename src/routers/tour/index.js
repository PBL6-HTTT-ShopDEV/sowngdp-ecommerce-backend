'use strict';

const express = require('express');
const multer = require('multer');
const { asyncHandler, authenticationV2 } = require('../../auth/authUtils');
const tourController = require('../../controllers/tour.controller');
const router = express.Router();

// Define `upload` before using it
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});  

router.get('/tours', asyncHandler(tourController.getAllTour));
router.get('/tour/:id', asyncHandler(tourController.getTourById));
const createTourUpload = upload.fields([
    { name: 'image_cover', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 }, // Adjust maxCount as needed
  ]);


router.use(asyncHandler(authenticationV2));
router.post(
    '/tour',
    createTourUpload,
    asyncHandler(tourController.createTour)
);

router.put('/tour/:id', asyncHandler(tourController.updateTour));
router.delete('/tour/:id', asyncHandler(tourController.deleteTour));

module.exports = router;
// Compare this snippet from src/routers/access/index.js: