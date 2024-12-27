// src/routers/statistical/index.js
"use strict";

const express = require("express");
const router = express.Router();
const { asyncHandler, authenticationV2 } = require("../../auth/authUtils");
const StatisticalController = require("../../controllers/statistical.controller");

// Require authentication for all statistical routes
// router.use(asyncHandler(authenticationV2));

// Revenue statistics
router.get(
  "/revenue/tours",
  asyncHandler(StatisticalController.getRevenueByTour)
);
router.get(
  "/revenue/tours/today",
  asyncHandler(StatisticalController.getRevenueByTourOfToday)
);
router.get(
  "/revenue/quarters",
  asyncHandler(StatisticalController.getRevenueByQuarter)
);
router.get(
  "/revenue/months",
  asyncHandler(StatisticalController.calculateRevenueOfEachMonth)
);

router.get(
  "/revenue/days",
  asyncHandler(StatisticalController.getRevenueByDay)
);

// Booking statistics
router.get(
  "/bookings/most-booked",
  asyncHandler(StatisticalController.getMostBookedTours)
);

router.get(
  "/tours/top-booked",
  asyncHandler(StatisticalController.getTopBookedToursByMonth)
);

router.get(
  "/tours/top-revenue",
  asyncHandler(StatisticalController.getTopRevenueToursByMonth)
);

// Dashboard overview
router.get("/dashboard", asyncHandler(StatisticalController.getDashboardStats)); // example: /v1/api/statistical/dashboard

module.exports = router;
