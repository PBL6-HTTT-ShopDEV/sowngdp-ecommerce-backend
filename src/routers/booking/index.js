"use strict";

const BookingController = require("../../controllers/booking.controller");
const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../auth/authUtils");

// router.get("/bookings", asyncHandler(BookingController.getAllBooking));
router.get("/bookings", asyncHandler(BookingController.getBookings));
router.get("/booking/:id", asyncHandler(BookingController.getBookingById));
router.get("/booking", asyncHandler(BookingController.getBookingByQuery));
router.post("/booking", asyncHandler(BookingController.createBooking));
router.post("/bookings", asyncHandler(BookingController.createMultipleBooking));
router.put("/:id", asyncHandler(BookingController.updateBooking));
router.delete("/:id", asyncHandler(BookingController.deleteBooking));
