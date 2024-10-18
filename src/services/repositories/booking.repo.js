'use strict';

const bookingModel = require('../../models/booking.model')

class BookingRepo {
    static async getAllBooking() {
        const bookings = await bookingModel.find().lean();
        return bookings;
    }

    static async getBookingById(id) {
        const booking = await bookingModel.findById(id).lean();
        return booking;
    }

    static async createBooking(data) {
        const booking = await bookingModel.create(data);
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