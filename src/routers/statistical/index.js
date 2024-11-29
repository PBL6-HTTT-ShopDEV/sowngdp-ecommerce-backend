// src/routers/statistical/index.js
"use strict";

const express = require("express");
const router = express.Router();
const { asyncHandler, authenticationV2 } = require("../../auth/authUtils");
const StatisticalController = require("../../controllers/statistical.controller");

// Require authentication for all statistical routes
router.use(asyncHandler(authenticationV2));

// Revenue statistics
router.get(
  "/revenue/tours",
  asyncHandler(StatisticalController.getRevenueByTour)
);
router.get(
  "/revenue/quarters",
  asyncHandler(StatisticalController.getRevenueByQuarter)
);
router.get(
  "/revenue/months",
  asyncHandler(StatisticalController.getRevenueByMonth)
);

// Booking statistics
router.get(
  "/bookings/most-booked",
  asyncHandler(StatisticalController.getMostBookedTours)
);

// Dashboard overview
router.get("/dashboard", asyncHandler(StatisticalController.getDashboardStats));

module.exports = router;
