// src/services/booking.service.js
"use strict";

const BookingRepo = require("./repositories/booking.repo");
const TourService = require("./tour.service");
const { BadRequestError, NotFoundError } = require("../core/error.response");

class BookingService {
  static async getAllBooking() {
    return await BookingRepo.getAllBooking();
  }

  static async getBookingById(query) {
    const { id, tourid, userid } = query;
    return await BookingRepo.getBookingById(id, tourid, userid);
  }

  static async getBookingByUserId(userId) {
    return await BookingRepo.getBookingByUserId(userId);
  }

  static async getBookingByTourId(tourId) {
    return await BookingRepo.getBookingByTourId(tourId);
  }

  static async createBooking(bookingData, userId) {
    // Validate tour exists
    const tour = await TourService.getTourById(bookingData.tour);
    if (!tour) {
      throw new NotFoundError("Tour not found");
    }

    // Calculate total price
    const totalPrice = tour.price * bookingData.number_of_people;

    // Check availability
    const isAvailable = await this.checkAvailability(
      bookingData.tour,
      bookingData.date,
      bookingData.number_of_people
    );

    if (!isAvailable) {
      throw new BadRequestError("Tour is not available for selected date/people");
    }

    const booking = await BookingRepo.createBooking({
      ...bookingData,
      total_price: totalPrice,
      user: userId,
      status: bookingData.status || "pending",
    });

    return booking;
  }

  static async updateBooking(id, data) {
    const booking = await BookingRepo.getBookingById(id);
    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    return await BookingRepo.updateBooking(id, data);
  }

  static async cancelBooking(id, userId) {
    const booking = await BookingRepo.getBookingById(id);
    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (booking.user.toString() !== userId) {
      throw new BadRequestError("Not authorized to cancel this booking");
    }

    return await BookingRepo.updateBooking(id, { status: "cancelled" });
  }

  static async checkAvailability(tourId, date, numberOfPeople) {
    const tour = await TourService.getTourById(tourId);
    if (!tour) {
      throw new NotFoundError("Tour not found");
    }

    // Chuyển đổi numberOfPeople thành số (nếu cần)
    const numPeople = parseInt(numberOfPeople, 10);

    // Kiểm tra ngày đặt có sớm hơn ngày khởi hành
    const tourStartDate = new Date(tour.start_date);
    const requestedDateObj = new Date(date);

    if (requestedDateObj >= tourStartDate) {
      console.log("Requested date must be earlier than the tour start date.");
      return false; // Ngày đặt không hợp lệ
    }

    // Lấy các booking đã tồn tại cho ngày đó
    const existingBookings = await BookingRepo.getBookings({
      tour: tourId,
      date: date,
      status: "success", // Chỉ tính các booking đã thành công
    });

    // Nếu không có booking nào, kiểm tra số lượng người
    if (!existingBookings || existingBookings.length === 0) {
      return numPeople <= tour.max_group_size;
    }

    // Tính tổng số người đã đặt
    const bookedSpots = existingBookings.reduce((total, booking) => {
      return total + booking.number_of_people;
    }, 0);

    // Kiểm tra nếu còn đủ chỗ
    return bookedSpots + numPeople <= tour.max_group_size;
  }

  static async processPayment(bookingId, userId, paymentData) {
    const booking = await BookingRepo.getBookingById(bookingId);
    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (booking.user.toString() !== userId) {
      throw new BadRequestError("Not authorized to process payment for this booking");
    }

    // Here you would integrate with a payment provider
    // For now, we'll just mark the booking as paid
    const updatedBooking = await BookingRepo.updateBooking(bookingId, {
      status: "success",
      payment_details: paymentData,
    });

    return updatedBooking;
  }
}

module.exports = BookingService;

/*
"use strict";

const BookingRepo = require("../services/repositories/booking.repo");

class BookingService {
  static async getAllBooking() {
    const bookings = await BookingRepo.getAllBooking();
    return bookings;
  }

  static async getBookingsByUserId(userId) {
    const bookings = await BookingRepo.getBookingByUserId(userId);
    return bookings;
  }

  static async getBookingById(query) {
    const { id, tourid, userid } = query;

    const booking = await BookingRepo.getBookingById(id, tourid, userid);
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

*/
