// src/services/statistical.service.js
"use strict";

const BookingRepo = require("./repositories/booking.repo");
const TourRepo = require("./repositories/tour.repo");
const { NotFoundError } = require("../core/error.response");

class StatisticalService {
  // Tính doanh thu theo tour
  static async calculateRevenueByTour(fromDate, toDate) {
    const pipeline = [
      {
        $match: {
          status: "success",
          ...(fromDate && toDate
            ? {
                createdAt: {
                  $gte: new Date(fromDate),
                  $lte: new Date(toDate),
                },
              }
            : {}),
        },
      },
      {
        $group: {
          _id: "$tour",
          totalRevenue: { $sum: "$total_price" },
          totalBookings: { $sum: 1 },
          totalPeople: { $sum: "$number_of_people" },
        },
      },
      {
        $lookup: {
          from: "Tours",
          localField: "_id",
          foreignField: "_id",
          as: "tourDetails",
        },
      },
      {
        $unwind: "$tourDetails",
      },
      {
        $project: {
          tourName: "$tourDetails.name",
          totalRevenue: 1,
          totalBookings: 1,
          totalPeople: 1,
          averageRevenue: { $divide: ["$totalRevenue", "$totalBookings"] },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
    ];

    return await BookingRepo.aggregate(pipeline);
  }

  // Tính doanh thu theo quý
  static async calculateRevenueByQuarter(year) {
    const pipeline = [
      {
        $match: {
          status: "success",
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            quarter: {
              $ceil: {
                $divide: [{ $month: "$createdAt" }, 3],
              },
            },
          },
          totalRevenue: { $sum: "$total_price" },
          totalBookings: { $sum: 1 },
          averageBookingValue: { $avg: "$total_price" },
        },
      },
      {
        $sort: { "_id.quarter": 1 },
      },
    ];

    return await BookingRepo.aggregate(pipeline);
  }

  // Tính doanh thu theo tháng
  static async calculateRevenueByMonth(year, month) {
    const pipeline = [
      {
        $match: {
          status: "success",
          ...(month
            ? {
                createdAt: {
                  $gte: new Date(`${year}-${month}-01`),
                  $lte: new Date(`${year}-${month}-31`),
                },
              }
            : {
                createdAt: {
                  $gte: new Date(`${year}-01-01`),
                  $lte: new Date(`${year}-12-31`),
                },
              }),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$total_price" },
          totalBookings: { $sum: 1 },
          averageBookingValue: { $avg: "$total_price" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ];

    return await BookingRepo.aggregate(pipeline);
  }

  // Thống kê tour được đặt nhiều nhất
  static async getMostBookedTours(limit = 10, fromDate, toDate) {
    const pipeline = [
      {
        $match: {
          status: "success",
          ...(fromDate && toDate
            ? {
                createdAt: {
                  $gte: new Date(fromDate),
                  $lte: new Date(toDate),
                },
              }
            : {}),
        },
      },
      {
        $group: {
          _id: "$tour",
          bookingCount: { $sum: 1 },
          totalRevenue: { $sum: "$total_price" },
          totalPeople: { $sum: "$number_of_people" },
        },
      },
      {
        $lookup: {
          from: "Tours",
          localField: "_id",
          foreignField: "_id",
          as: "tourDetails",
        },
      },
      {
        $unwind: "$tourDetails",
      },
      {
        $project: {
          tourName: "$tourDetails.name",
          bookingCount: 1,
          totalRevenue: 1,
          totalPeople: 1,
          averageRevenue: { $divide: ["$totalRevenue", "$bookingCount"] },
        },
      },
      {
        $sort: { bookingCount: -1 },
      },
      {
        $limit: parseInt(limit),
      },
    ];

    return await BookingRepo.aggregate(pipeline);
  }

  // Thống kê tổng quan
  static async getDashboardStats() {
    // Tổng doanh thu
    const totalRevenue = await BookingRepo.aggregate([
      {
        $match: { status: "success" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total_price" },
        },
      },
    ]);

    // Tổng số booking
    const totalBookings = await BookingRepo.countDocuments({
      status: "success",
    });

    // Booking trong tháng hiện tại
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthlyBookings = await this.calculateRevenueByMonth(
      currentYear,
      currentMonth
    );

    // Tour được đặt nhiều nhất
    const topTours = await this.getMostBookedTours(5);

    return {
      totalRevenue: totalRevenue[0]?.total || 0,
      totalBookings,
      monthlyStats: monthlyBookings,
      topTours,
    };
  }
}

module.exports = StatisticalService;
