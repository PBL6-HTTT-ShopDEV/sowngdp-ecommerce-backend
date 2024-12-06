const BookingRepo = require("./repositories/booking.repo");
const { BadRequestError } = require("../core/error.response");

// src/services/statistical.service.js

("use strict");

class StatisticalService {
  // Helper to validate and parse dates
  static _getDateRange(year, month = null, day = null) {
    // Validate year
    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
      throw new BadRequestError("Invalid year");
    }

    // If month provided, validate it
    if (month) {
      console.log("month", month);
      const monthNum = parseInt(month);
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        throw new BadRequestError("Invalid month");
      }

      if (day) {
        const dayNum = parseInt(day);
        if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
          throw new BadRequestError("Invalid day");
        }
        return {
          startDate: new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 0, 0, 0)),
          endDate: new Date(
            Date.UTC(yearNum, monthNum - 1, dayNum, 23, 59, 59)
          ),
        };
      }

      // Get last day of month
      const lastDay = new Date(yearNum, monthNum, 0).getDate();

      return {
        startDate: new Date(Date.UTC(yearNum, monthNum - 1, 1, 0, 0, 0)),
        endDate: new Date(Date.UTC(yearNum, monthNum - 1, lastDay, 23, 59, 59)),
      };
    }

    // Full year range
    return {
      startDate: new Date(Date.UTC(yearNum, 0, 1, 0, 0, 0)),
      endDate: new Date(Date.UTC(yearNum, 11, 31, 23, 59, 59)),
    };
  }

  static _getDateRangeFromDateToDate(fromday, toDay) {
    // Validate year
    // day format: yyyy-mm-dd
    const fromDate = new Date(fromday);
    const toDate = new Date(toDay);

    return {
      startDate: new Date(
        Date.UTC(
          fromDate.getFullYear(),
          fromDate.getMonth(),
          fromDate.getDate(),
          0,
          0,
          0
        )
      ),
      endDate: new Date(
        Date.UTC(
          toDate.getFullYear(),
          toDate.getMonth(),
          toDate.getDate(),
          23,
          59,
          59
        )
      ),
    };
  }

  // Calculate revenue by tour with date range
  static async calculateRevenueByTour(fromDate, toDate) {
    const dateQuery = {};
    if (fromDate && toDate) {
      const { fromDay, toDay } = this._getDateRangeFromDateToDate(
        fromDate,
        toDate
      );
      dateQuery.updatedAt = {
        $gte: new Date(fromDay),
        $lte: new Date(toDay),
      };
    }

    const pipeline = [
      {
        $match: {
          status: "success",
          ...dateQuery,
        },
      },
      // Rest of pipeline remains same
    ];

    return await BookingRepo.aggregate(pipeline);
  }

  // Calculate revenue by tour of today
  static async calculateRevenueByTourOfToday() {
    const now = new Date();
    const today = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
    ); // Start of today
    const tomorrow = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)
    ); // Start of tomorrow

    const pipeline = [
      {
        $match: {
          status: "success",
          updatedAt: {
            $gte: today,
            $lt: tomorrow,
          },
        },
      },
      // Rest of pipeline remains same
    ];

    return await BookingRepo.aggregate(pipeline);
  }

  // Calculate revenue by quarter
  static async calculateRevenueByQuarter(quarter) {
    // const { startDate, endDate } = this._getDateRange(year);
    const now = new Date();
    const currentYear = now.getFullYear();

    if (quarter) {
      if (quarter < 1 || quarter > 4) {
        throw new BadRequestError("Invalid quarter");
      }

      if (quarter === 1) {
        var startDate = new Date(Date.UTC(currentYear, 0, 1, 0, 0, 0));
        var endDate = new Date(Date.UTC(currentYear, 2, 31, 23, 59, 59));
      } else if (quarter === 2) {
        var startDate = new Date(Date.UTC(currentYear, 3, 1, 0, 0, 0));
        var endDate = new Date(Date.UTC(currentYear, 5, 30, 23, 59, 59));
      } else if (quarter === 3) {
        var startDate = new Date(Date.UTC(currentYear, 6, 1, 0, 0, 0));
        var endDate = new Date(Date.UTC(currentYear, 8, 30, 23, 59, 59));
      } else {
        var startDate = new Date(Date.UTC(currentYear, 9, 1, 0, 0, 0));
        var endDate = new Date(Date.UTC(currentYear, 11, 31, 23, 59, 59));
      }
    } else {
      var startDate = new Date(Date.UTC(currentYear, 0, 1, 0, 0, 0));
      var endDate = new Date(Date.UTC(currentYear, 11, 31, 23, 59, 59));
    }

    const pipeline = [
      {
        $match: {
          status: "success",
          updatedAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$updatedAt" },
            quarter: {
              $ceil: {
                $divide: [{ $month: "$updatedAt" }, 3],
              },
            },
          },
          totalRevenue: { $sum: "$total_price" },
          totalBookings: { $sum: 1 },
          averageBookingValue: { $avg: "$total_price" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.quarter": 1,
        },
      },
    ];

    return await BookingRepo.aggregate(pipeline);
  }

  // Calculate revenue by month
  static async calculateRevenueByMonth(month) {
    // const { startDate, endDate } = this._getDateRange(year, month);

    // this month
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = month || now.getMonth() + 1;
    console.log(currentYear, currentMonth);

    const { startDate, endDate } = this._getDateRange(
      currentYear,
      currentMonth
    );

    const pipeline = [
      {
        $match: {
          status: "success",
          updatedAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$updatedAt" },
            month: { $month: "$updatedAt" },
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

  // Calculate revenue by day
  static async calculateRevenueByDay(day) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const { startDate, endDate } = this._getDateRange(
      currentYear,
      currentMonth,
      day
    );

    const pipeline = [
      {
        $match: {
          status: "success",
          updatedAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$updatedAt" },
            month: { $month: "$updatedAt" },
            day: { $dayOfMonth: "$updatedAt" },
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
          "_id.day": 1,
        },
      },
    ];

    return await BookingRepo.aggregate(pipeline);
  }

  // Get most booked tours
  static async getMostBookedTours(limit, fromDate, toDate) {
    const dateQuery = {};
    if (fromDate && toDate) {
      dateQuery.updatedAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const pipeline = [
      {
        $match: {
          status: "success",
          ...dateQuery,
        },
      },
      {
        $group: {
          _id: "$tour",
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: "$total_price" },
          averageBookingValue: { $avg: "$total_price" },
        },
      },
      {
        $sort: {
          totalBookings: -1,
        },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "tours",
          localField: "_id",
          foreignField: "_id",
          as: "tour",
        },
      },
      {
        $unwind: "$tour",
      },
      {
        $project: {
          _id: 0,
          tour: {
            _id: 1,
            name: 1,
            price: 1,
            thumbnail_url: 1,
            destination: 1,
          },
          totalBookings: 1,
          totalRevenue: 1,
          averageBookingValue: 1,
        },
      },
    ];

    return await BookingRepo.aggregate(pipeline);
  }

  // Dashboard stats with proper date handling
  static async getDashboardStats() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Get current month's stats
    const monthlyStats = await this.calculateRevenueByMonth(currentMonth);

    // Get yearly stats
    const yearlyStats = await this.calculateRevenueByQuarter();

    // Get top tours (last 30 days)
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const topTours = await this.getMostBookedTours(
      5,
      thirtyDaysAgo.toISOString(),
      new Date().toISOString()
    );

    return {
      currentMonth: monthlyStats[0] || { totalRevenue: 0, totalBookings: 0 },
      yearlyStats: yearlyStats,
      last30Days: {
        topTours,
      },
    };
  }
}

module.exports = StatisticalService;
