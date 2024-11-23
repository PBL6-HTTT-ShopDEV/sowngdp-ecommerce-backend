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
