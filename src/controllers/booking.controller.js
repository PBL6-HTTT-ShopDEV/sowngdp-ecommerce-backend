// src/controllers/booking.controller.js
"use strict";

const BookingService = require("../services/booking.service");
const { Success, Created } = require("../core/success.response");

class BookingController {
  // Get all bookings (admin only)
  static async getAllBooking(req, res, next) {
    const bookings = await BookingService.getAllBooking();
    return new Success({
      message: "Get all bookings success!",
      metadata: bookings,
    }).send(res);
  }

  static async getBookingById(req, res, next) {
    const booking = await BookingService.getBookingById(req.params.id);
    return new Success({
      message: "Get booking by id success!",
      metadata: booking,
    }).send(res);
  }

  static async getBookingToday(req, res, next) {
    const bookings = await BookingService.getBookingToday();
    return new Success({
      message: "Get today's bookings success!",
      metadata: bookings,
    }).send(res);
  }

  // Get bookings by tour id (public)
  static async getBookingByTourId(req, res, next) {
    const bookings = await BookingService.getBookingByTourId(req.params.tourId);
    return new Success({
      message: "Get bookings by tour success!",
      metadata: bookings,
    }).send(res);
  }

  // Get bookings by user id (authenticated)
  static async getBookingsByUser(req, res, next) {
    const userId = req.headers["x-client-id"];
    const bookings = await BookingService.getBookingByUserId(userId);
    return new Success({
      message: "Get user bookings success!",
      metadata: bookings,
    }).send(res);
  }

  // Create new booking
  static async createBooking(req, res, next) {
    const userId = req.headers["x-client-id"];
    const booking = await BookingService.createBooking(req.body, userId);
    return new Created({
      message: "Create booking success!",
      metadata: booking,
    }).send(res);
  }

  // Update booking status
  static async updateBooking(req, res, next) {
    const data = {
      status: req.body.status,
      number_of_people: req.body.number_of_people,
    };
    const booking = await BookingService.updateBooking(req.query.id, data);
    return new Success({
      message: "Update booking success!",
      metadata: booking,
    }).send(res);
  }

  // Cancel booking
  static async cancelBooking(req, res, next) {
    const userId = req.headers["x-client-id"];
    const booking = await BookingService.cancelBooking(req.query.id, userId);
    return new Success({
      message: "Cancel booking success!",
      metadata: booking,
    }).send(res);
  }

  // Check availability
  static async checkAvailability(req, res, next) {
    const { tourId, date, numberOfPeople } = req.query;
    const available = await BookingService.checkAvailability(
      tourId,
      date,
      numberOfPeople
    );
    return new Success({
      message: "Check availability success!",
      metadata: { available },
    }).send(res);
  }

  // Process payment
  static async processPayment(req, res, next) {
    const { bookingId } = req.params;
    const userId = req.headers["x-client-id"];
    const payment = await BookingService.processPayment(
      bookingId,
      userId,
      req.body
    );
    return new Success({
      message: "Process payment success!",
      metadata: payment,
    }).send(res);
  }

  // Get bookings by time range
  static async getBookingByTime(req, res, next) {
    const { fromDate, toDate } = req.query;
    const bookings = await BookingService.getBookingsByTimeRange(
      fromDate,
      toDate
    );

    return new Success({
      message: "Get bookings by time range success!",
      metadata: {
        bookings,
        total: bookings.length,
        timeRange: {
          from: fromDate,
          to: toDate,
        },
      },
    }).send(res);
  }
}

module.exports = BookingController;
