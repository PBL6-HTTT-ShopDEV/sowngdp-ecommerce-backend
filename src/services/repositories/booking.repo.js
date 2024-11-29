// src/services/repositories/booking.repo.js
"use strict";

const bookingModel = require("../../models/booking.model");

class BookingRepo {
  // Basic CRUD operations
  static async getAllBooking() {
    return await bookingModel
      .find()
      .populate("tour", "name price")
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
      .populate("tour", "name price")
      .populate("user", "name email")
      .lean();
  }

  static async getBookings(query) {
    return await bookingModel
      .find(query)
      .populate("tour", "name price")
      .populate("user", "name email")
      .lean();
  }

  static async createBooking(data) {
    const booking = await bookingModel.create(data);
    return await booking.populate([
      { path: "tour", select: "name price" },
      { path: "user", select: "name email" },
    ]);
  }

  static async updateBooking(id, data) {
    const booking = await bookingModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate([
        { path: "tour", select: "name price" },
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
      .populate("tour", "name price")
      .lean();
  }

  static async getBookingByTourId(tourId) {
    return await bookingModel
      .find({ tour: tourId })
      .populate("user", "name email")
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

/*
"use strict";

const bookingModel = require("../../models/booking.model");

class BookingRepo {
  static async getAllBooking() {
    const bookings = await bookingModel.find().lean();
    return bookings;
  }

  static async getBookings(query) {
    const bookings = await bookingModel.find(query).lean();
    return bookings;
  }

  static async getBookingById(id, tourid, userid) {
    // if has id, tourid, userid
    if (id && tourid && userid) {
      const booking = await bookingModel
        .find({ id: id, user: userid, tour: tourid })
        .lean();
      return booking;
    }
    // if has only id
    if (id) {
      const booking = await bookingModel.find({ id: id }).lean();
      return booking;
    }
    // if has only tourid
    if (tourid) {
      const booking = await bookingModel.find({ tour: tourid }).lean();
      return booking;
    }
    // if has only userid
    if (userid) {
      const booking = await bookingModel.find({ user: userid }).lean();
      return booking;
    }
  }

  static async getBookingByUserId(userId) {
    const booking = await bookingModel.find({ user: userId }).lean();
    return booking;
  }

  static async getBookingByTourId(tourId) {
    const booking = await bookingModel.find({ tour: tourId }).lean();
    return booking;
  }

  static async createBooking(data, userId) {
    const booking = await bookingModel.create({ ...data, user: userId });
    return booking;
  }

  static async updateBooking(id, data) {
    const booking = await bookingModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return booking;
  }

  static async deleteBooking(id) {
    const booking = await bookingModel.findByIdAndDelete(id);
    return booking;
  }
}

module.exports = BookingRepo;

*/
