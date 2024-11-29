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
    const booking = await BookingService.updateBooking(req.params.id, req.body);
    return new Success({
      message: "Update booking success!",
      metadata: booking,
    }).send(res);
  }

  // Cancel booking
  static async cancelBooking(req, res, next) {
    const userId = req.headers["x-client-id"];
    const booking = await BookingService.cancelBooking(req.params.id, userId);
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
}

module.exports = BookingController;

/*
"use strict";

const BookingService = require("../services/booking.service");
const { Success } = require("../core/success.response");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFESHTOKEN: "x-rtoken-id",
};

class BookingController {
  static async getAllBooking(req, res) {
    const bookings = await BookingService.getAllBooking();

    return new Success({
      message: "Get all bookings success!",
      metadata: bookings,
    }).send(res);
  }

  static async getBookings(req, res) {
    const userId = req.query.userid;
    const bookings = await BookingService.getBookings(req.query);

    return new Success({
      message: "Get bookings success!",
      metadata: bookings,
    }).send(res);
  }

  static async getBookingById(req, res) {
    const { id, tourid, userid } = req.query;
    const query = { id, tourid, userid };
    const booking = await BookingService.getBookingById(query);

    return new Success({
      message: "Get booking by id success!",
      metadata: booking,
    }).send(res);
  }

  static async getBookingsByUser(req, res) {
    const userId = req.query.userid;
    const booking = await BookingService.getBookingByUserId(userId);

    return new Success({
      message: "Get booking by user id success!",
      metadata: booking,
    }).send(res);
  }

  static async getBookingByTourId(req, res) {
    const booking = await BookingService.getBookingByTourId(req.query.tourid);
    if (!booking) {
      throw new Error("Booking not found");
    }

    return new Success({
      message: "Get booking by tour id success!",
      metadata: booking,
    }).send(res);
  }

  static async getBookingByUserId(req, res) {
    const booking = await BookingService.getBookingByUserId(req.params.userid);

    return new Success({
      message: "Get booking by user id success!",
      metadata: booking,
    }).send(res);
  }

  static async createBooking(req, res) {
    const bookingData = req.body;
    const userId = req.headers[HEADER.CLIENT_ID];
    const booking = await BookingService.createBooking(bookingData, userId);

    return new Success({
      message: "Create booking success!",
      metadata: booking,
    }).send(res);
  }

  static async updateBooking(req, res) {
    try {
      const booking = await BookingService.updateBooking(
        req.params.id,
        req.body
      );
      res.status(200).json({ booking });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteBooking(req, res) {
    try {
      const booking = await BookingService.deleteBooking(req.params.id);
      res.status(200).json({ booking });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BookingController;

*/
