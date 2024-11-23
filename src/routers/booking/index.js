"use strict";

const BookingController = require("../../controllers/booking.controller");
const express = require("express");
const router = express.Router();
const { asyncHandler, authenticationV2 } = require("../../auth/authUtils");

router.get("/booking", asyncHandler(BookingController.getAllBooking)); // example url: http://localhost:3055/v1/api/booking
router.get("/bookings", asyncHandler(BookingController.getBookingById)); // example url: http://localhost:3055/v1/api/bookings?tourid=123&userid=123

router.post(
  "/bookings",
  //   authenticationV2,
  asyncHandler(BookingController.createBooking)
);
router.put(
  "/bookings/:id",
  //   authenticationV2,
  asyncHandler(BookingController.updateBooking)
);
router.delete(
  "/bookings/:id",
  //   authenticationV2,
  asyncHandler(BookingController.deleteBooking)
);

module.exports = router;
