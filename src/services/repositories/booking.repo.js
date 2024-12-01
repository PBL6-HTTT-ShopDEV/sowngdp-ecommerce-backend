// src/services/repositories/booking.repo.js
"use strict";

const bookingModel = require("../../models/booking.model");

class BookingRepo {
  // Basic CRUD operations
  static async getAllBooking() {
    return await bookingModel
      .find()
      .populate("tour", "name price thumbnail_url")
      .populate("user", "name email")
      .lean();
  }

  static async getBookingById(id, tourid, userid) {
    const query = {};
    if (id) query._id = id;
    if (tourid) query.tour = tourid;
    if (userid) query.user = userid;

    return await bookingModel
      .findOne(query)
      .populate("tour", "name price thumbnail_url")
      .populate("user", "name email")
      .lean();
  }

  static async getBookings(query) {
    return await bookingModel
      .find(query)
      .populate("tour", "name price thumbnail_url")
      .populate("user", "name email")
      .lean();
  }

  static async createBooking(data) {
    const booking = await bookingModel.create(data);
    return await booking.populate([
      { path: "tour", select: "name price thumbnail_url" },
      { path: "user", select: "name email" },
    ]);
  }

  static async updateBooking(id, data) {
    const booking = await bookingModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate([
        { path: "tour", select: "name price thumbnail_url" },
        { path: "user", select: "name email" },
      ]);
    return booking;
  }

  static async deleteBooking(id) {
    return await bookingModel.findByIdAndDelete(id);
  }

  // Specialized queries
  static async getBookingByUserId(userId) {
    return await bookingModel
      .find({ user: userId })
      .populate("tour", "name price thumbnail_url")
      .lean();
  }

  static async getBookingByTourId(tourId) {
    return await bookingModel
      .find({ tour: tourId })
      .populate("user", "name price thumbnail_url")
      .lean();
  }

  static async checkExistingBookings(tourId, userId) {
    return await bookingModel
      .findOne({
        tour: tourId,
        user: userId,
        status: { $in: ["pending", "success"] },
      })
      .lean();
  }

  static async getBookingsByDateRange(tourId, startDate, endDate) {
    return await bookingModel
      .find({
        tour: tourId,
        created_at: {
          $gte: startDate,
          $lte: endDate,
        },
        status: { $ne: "cancelled" },
      })
      .lean();
  }

  static async countActiveBookings(tourId) {
    return await bookingModel.countDocuments({
      tour: tourId,
      status: { $in: ["pending", "success"] },
    });
  }
}

module.exports = BookingRepo;
