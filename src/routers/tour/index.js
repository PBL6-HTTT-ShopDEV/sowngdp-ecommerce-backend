"use strict";

const express = require("express");
const multer = require("multer");
const { asyncHandler, authenticationV2 } = require("../../auth/authUtils");
const TourController = require("../../controllers/tour.controller");
const BookingController = require("../../controllers/booking.controller");
const router = express.Router();

// Define `upload` before using it
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

const createTourUpload = upload.fields([
  { name: "image_cover", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 10 }, // Adjust maxCount as needed
]);

// router.get("/tours", asyncHandler(TourController.getAllTour));
router.get("/tourbyid", asyncHandler(TourController.getTourById)); // example: /tourbyid?tourId=123

// example url = "http://localhost:3055/v1/api/tours?page=1&limit=10&categoryId=5f3d9f7b2e6d2d0017d5b9d1&price=1000000"
router.get("/tour", asyncHandler(TourController.getTours)); // example: /tour?page=1&limit=10&categoryId=5f3d9f7b2e6d2d0017d5b9d1&price=1000000
router.get("/tour-all", asyncHandler(TourController.getAllTour)); // example: /tour-all
// router.use();
router.post("/tour", createTourUpload, asyncHandler(TourController.createTour));
router.post("/tour/addFavorite", asyncHandler(TourController.addFavoriteTour)); // example: /tour/addFavorite?tourId=123

router.put("/tour", createTourUpload, asyncHandler(TourController.updateTour)); // example: /tour?id=123
router.delete("/tour", asyncHandler(TourController.deleteTour)); // example: /tour?tourId=123

// router.get("/bookings", asyncHandler(authenticationV2), asyncHandler(BookingController.getAllBooking));

module.exports = router;
// Compare this snippet from src/routers/access/index.js:
