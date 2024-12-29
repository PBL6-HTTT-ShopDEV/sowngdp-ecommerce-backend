"use strict";

const BookingController = require("../../controllers/booking.controller");
const express = require("express");
const router = express.Router();
const { asyncHandler, authenticationV2 } = require("../../auth/authUtils");

// Public routes
router.get(
  "/bookings/tour/:tourId",
  asyncHandler(BookingController.getBookingByTourId)
);
router.get(
  "/bookings/availability/:tourId",
  asyncHandler(BookingController.checkAvailability)
);

// Protected routes - require authentication
// router.use(asyncHandler(authenticationV2));

// Booking management
router.get("/bookings", asyncHandler(BookingController.getAllBooking));
router.get("/bookings/:id", asyncHandler(BookingController.getBookingById)); // example: /bookings/123
router.post("/bookings", asyncHandler(BookingController.createBooking)); // example: /bookings?tourId=123
router.put("/bookings", asyncHandler(BookingController.updateBooking));
router.delete("/bookings", asyncHandler(BookingController.cancelBooking));

// User specific bookings
router.get(
  "/bookings/user/me",
  asyncHandler(BookingController.getBookingsByUser)
);

// get booking by time
router.get(
  "/bookings/by-time/time", // Changed from /bookings/time/:time
  asyncHandler(BookingController.getBookingByTime)
);

router.get(
  "/bookings/today/day",
  asyncHandler(BookingController.getBookingToday)
);

// Booking payment and confirmation
router.post(
  "/bookings/:id/payment",
  asyncHandler(BookingController.processPayment)
);
// router.post(
//   "/bookings/:id/confirm",
//   asyncHandler(BookingController.confirmBooking)
// );

module.exports = router;
