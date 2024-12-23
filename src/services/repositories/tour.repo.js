"use strict";

const tourModel = require("../../models/tour.model");
const categoryModel = require("../../models/category.model");

class TourRepo {
  static async getAllTour() {
    const tours = await tourModel.find().lean();
    return tours;
  }

  static async getTourById(id) {
    console.log('[Repository] 🔍 Tìm tour với ID:', id);
    const tour = await tourModel.findById(id).lean();
    console.log('[Repository] 📦 Kết quả:', {
      found: !!tour,
      tourData: tour ? {
        id: tour._id,
        name: tour.name,
        status: tour.status
      } : null
    });
    return tour;
  }

  static async getTours(page, limit, categoryId, price) {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    const skip = (page - 1) * limit;
    const query = {};

    if (categoryId) {
      query.categories = categoryId;
    }
    if (price) {
      query.price = { $lte: price };
    }

    const tours = await tourModel
      .find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    return tours;
  }

  static async createTour(data) {
    const tour = await tourModel.create(data);
    return tour;
  }

  static async updateTour(id, data) {
    const tour = await tourModel.findByIdAndUpdate(id, data, { new: true });
    return tour;
  }

  static async deleteTour(id) {
    const tour = await tourModel.findByIdAndDelete(id);
    return tour;
  }
}

module.exports = TourRepo;
