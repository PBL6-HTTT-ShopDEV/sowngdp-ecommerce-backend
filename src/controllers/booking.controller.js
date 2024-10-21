'use strict';

const BookingService = require('../services/booking.service');

class BookingController {
    static async getAllBooking(req, res) {
        try {
            const bookings = await BookingService.getAllBooking();
            res.status(200).json({ bookings });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getBookingById(req, res) {
        try {
            const booking = await BookingService.getBookingById(req.params.id);
            res.status(200).json({ booking });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createBooking(req, res) {
        try {
            const booking = await BookingService.createBooking(req.body);
            res.status(201).json({ booking });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateBooking(req, res) {
        try {
            const booking = await BookingService.updateBooking(req.params.id, req.body);
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
