'use strict';

const tourModel = require('../../models/tour.model')

class TourRepo {
    static async getAllTour() {
        const tours = await tourModel.find().lean();
        return tours;
    }

    static async getTourById(id) {
        const tour = await tourModel.findById(id).lean();
        return tour;
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

    static async getTourByCategory(categoryId) {
        const tours = await tourModel.find({ category: categoryId }).lean();
        return tours;
    }

    static async getTourByLocation(locationId) {
        const tours = await tourModel.find({ location: locationId }).lean();
        return tours;
    }

    static async getTourByPrice(price) {
        const tours = await tourModel.find({ price: { $lte: price } }).lean();
        return tours;
    }

    static async getTourByCategoryAndLocation(categoryId, locationId) {
        const tours = await tourModel.find({ category: categoryId, location: locationId }).lean();
        return tours;
    }

    static async getTourByCategoryAndLocationAndPrice(categoryId, locationId, price) {
        const tours = await tourModel.find({ category: categoryId, location: locationId, price: { $lte: price } }).lean();
        return tours;
    }

}

module.exports = TourRepo;
