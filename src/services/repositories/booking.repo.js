'use strict';

const bookingModel = require('../../models/booking.model')

class BookingRepo {
    static async getAllBooking() {
        const bookings = await bookingModel.find().lean();
        return bookings;
    }

    static async getBookings(query) {
        const bookings = await bookingModel.find(query).lean();
        return bookings;
    }

    static async getBookingById(id) {
        const booking = await bookingModel.findById(id).lean();
        return booking;
    }

    static async createBooking(data, userId) {
        const booking = await bookingModel.create({ ...data, user: userId });
        return booking;
    }

    static async updateBooking(id, data) {
        const booking = await bookingModel.findByIdAndUpdate(id, data, { new: true });
        return booking;
    }

    static async deleteBooking(id) {
        const booking = await bookingModel.findByIdAndDelete(id);
        return booking;
    }
}


module.exports = BookingRepo;