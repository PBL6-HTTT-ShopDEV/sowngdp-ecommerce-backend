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
}

module.exports = TourRepo;
