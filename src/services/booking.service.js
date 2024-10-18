'use strict';


const BookingRepo = require('../services/repositories/booking.repo');


class BookingService {
    static async getAllBooking() {
        const bookings = await BookingRepo.getAllBooking();
        return bookings;
    }

    static async getBookingById(id) {
        const booking = await BookingRepo.getBookingById(id);
        return booking;
    }

    static async createBooking(data) {
        const booking = await BookingRepo.createBooking(data);
        return booking;
    }

    static async updateBooking(id, data) {
        const booking = await BookingRepo.updateBooking(id, data);
        return booking;
    }

    static async deleteBooking(id) {
        const booking = await BookingRepo.deleteBooking(id);
        return booking;
    }
}

module.exports = BookingService;