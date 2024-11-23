'use strict';


const BookingRepo = require('../services/repositories/booking.repo');


class BookingService {
    static async getAllBooking() {
        const bookings = await BookingRepo.getAllBooking();
        return bookings;
    }

    static async getBookings(query) {
        const bookings = await BookingRepo.getBookings(query);
        return bookings;
    }

    static async getBookingById(id) {
        const booking = await BookingRepo.getBookingById(id);
        return booking;
    }

    static async getBookingByTourId(tourId) {
        console.log(tourId);
        const booking = await BookingRepo.getBookingByTourId(tourId);
        return booking;
    }

    static async createBooking(data, userId) {
        const booking = await BookingRepo.createBooking(data, userId);
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