// src/controllers/statistical.controller.js
"use strict";

const { Success } = require("../core/success.response");
const StatisticalService = require("../services/statistical.service");

class StatisticalController {
  // Thống kê doanh thu từng tour
  static async getRevenueByTour(req, res) {
    const { fromDate, toDate } = req.query;
    const statistics = await StatisticalService.calculateRevenueByTour(
      fromDate,
      toDate
    );
    return new Success({
      message: "Get revenue by tour success!",
      metadata: statistics,
    }).send(res);
  }

  static async getRevenueByTourOfToday(req, res) {
    const statistics = await StatisticalService.calculateRevenueByTourOfToday();
    return new Success({
      message: "Get revenue by tour of today success!",
      metadata: statistics,
    }).send(res);
  }

  // Thống kê doanh thu theo quý
  static async getRevenueByQuarter(req, res) {
    const { quarter } = req.query;
    const statistics = await StatisticalService.calculateRevenueByQuarter(
      quarter
    );
    return new Success({
      message: "Get revenue by quarter success!",
      metadata: statistics,
    }).send(res);
  }

  // Thống kê doanh thu theo tháng
  static async calculateRevenueOfEachMonth(req, res) {
    // get all months in this year
    console.log("getRevenueByMonth");
    const statistics = await StatisticalService.calculateRevenueOfEachMonth();
    return new Success({
      message: "Get revenue by month success!",
      metadata: statistics,
    }).send(res);
  }

  static async getRevenueByDay(req, res) {
    const { day } = req.query;
    const statistics = await StatisticalService.calculateRevenueByDay(day);
    return new Success({
      message: "Get revenue by day success!",
      metadata: statistics,
    }).send(res);
  }

  // Thống kê top tours được đặt nhiều nhất
  static async getMostBookedTours(req, res) {
    const { limit = 10, fromDate, toDate } = req.query;
    const statistics = await StatisticalService.getMostBookedTours(
      limit,
      fromDate,
      toDate
    );
    return new Success({
      message: "Get most booked tours success!",
      metadata: statistics,
    }).send(res);
  }

  // Thống kê tổng quan
  static async getDashboardStats(req, res) {
    const statistics = await StatisticalService.getDashboardStats();
    return new Success({
      message: "Get dashboard statistics success!",
      metadata: statistics,
    }).send(res);
  }
}

module.exports = StatisticalController;
