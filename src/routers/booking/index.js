"use strict";

const BookingController = require("../../controllers/booking.controller");
const express = require("express");
const router = express.Router();
const { asyncHandler, authenticationV2 } = require("../../auth/authUtils");

// router.get("/bookings", asyncHandler(BookingController.getAllBooking));
router.get("/bookings", asyncHandler(BookingController.getBookings));
router.get("/booking/:id", asyncHandler(BookingController.getBookingById));
router.get("/booking", asyncHandler(BookingController.getBookingByTourId)); //example url : http://localhost:3055/v1/api/booking?tourid=663a91b18d40b8bc1b388b4d
router.post("/booking", asyncHandler(BookingController.createBooking)); //example url : http://localhost:3055/v1/api/booking
// example json data for create booking :
// {
//   "tour": "663a91b18d40b8bc1b388b4d",
//   "date": "2024-05-01",
//   "quantity": 2
//   "price": 100
//   "paid": true
// }

router.post("/bookings", asyncHandler(BookingController.createMultipleBooking));
router.put("/:id", asyncHandler(BookingController.updateBooking));
router.delete("/:id", asyncHandler(BookingController.deleteBooking));

module.exports = router;
