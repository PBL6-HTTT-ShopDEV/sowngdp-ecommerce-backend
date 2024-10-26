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

router.get("/tours", asyncHandler(TourController.getAllTour));
router.get("/tour/:id", asyncHandler(TourController.getTourById));
const createTourUpload = upload.fields([
  { name: "image_cover", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 10 }, // Adjust maxCount as needed
]);

router.get(
  "/tours/:location/:price/:category",
  asyncHandler(TourController.getTourByCategoryAndLocationAndPrice)
);
router.get(
  "/tours/:location/:category",
  asyncHandler(TourController.getTourByCategoryAndLocation)
);
router.get("/tours/:location", asyncHandler(TourController.getTourByLocation));
router.get(
  "/tours/:categoryId",
  asyncHandler(TourController.getTourByCategory)
); /// example url for get tour by category : http://localhost:3055/v1/api/tours/5f3d9f7b2e6d2d0017d5b9d1
router.get("/tours/:price", asyncHandler(TourController.getTourByPrice));
router.get(
  "/tours/:category/:price",
  asyncHandler(TourController.getTourByCategoryAndPrice)
);
router.get(
  "/tours/:location/:price",
  asyncHandler(TourController.getTourByLocationAndPrice)
);

router.use(asyncHandler(authenticationV2));
router.post("/tour", createTourUpload, asyncHandler(TourController.createTour));

router.put("/tour/:id", asyncHandler(TourController.updateTour));
router.delete("/tour/:id", asyncHandler(TourController.deleteTour));
/// example json data for delete tour combine url
/// example url for delete tour by id : http://localhost:3055/v1/api/tour/5f3d9f7b2e6d2d0017d5b9d1
// {
//     "tour_id": "5f3d9f7b2e6d2d0017d5b9d1"
// }

// tour booking routers

router.get("/bookings", asyncHandler(BookingController.getAllBooking));

module.exports = router;
// Compare this snippet from src/routers/access/index.js:
