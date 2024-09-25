'use strict';

const { Success } = require('../core/success.response');
const TourService = require('../services/tour.service');

class TourController {
    static async getAllTour(req, res, next) {
        const tours = await TourService.getAllTour();
        if (!tours) {
            return new Success({
                message: 'Get all tour success!',
                metadata: [],
            }).send(res);
        }
        return new Success({
            message: 'Get all tour success!',
            metadata: tours,
        }).send(res);
    }

    static async getTourById(req, res, next) {
        const tour = await TourService.getTourById(req.params.id);
        return new Success({
            message: 'Get tour by id success!',
            metadata: tour,
        }).send(res);
    }

    static async createTour(req, res, next) {
        try {
            console.log('req.body:', req.body);
            console.log('req.files:', req.files);
            const tourData = req.body;
            const files = req.files;

            // Extract files based on field names
            const imageCoverFile = files['image_cover'] ? files['image_cover'][0] : null;
            const thumbnailFile = files['thumbnail'] ? files['thumbnail'][0] : null;
            const imageFiles = files['images'] || [];

            const tour = await TourService.createTour(
                tourData,
                imageCoverFile,
                thumbnailFile,
                imageFiles
            );

            return new Success({
                message: 'Create tour success!',
                metadata: tour,
            }).send(res);
        } catch (error) {
            next(error);
        }
    }


    // static createTour = async (req, res, next) => {
    //     const tour = await TourService.createTour(req.body);
    //     return new Success({
    //         message: 'Create tour success!',
    //         metadata: tour,
    //     }).send(res);
    // }

    static async updateTour(req, res, next) {
        const tour = await TourService.updateTour(req.params.id, req.body);
        return new Success({
            message: 'Update tour success!',
            metadata: tour,
        }).send(res);
    }

    static async deleteTour(req, res, next) {
        const tour = await TourService.deleteTour(req.params.id);
        return new Success({
            message: 'Delete tour success!',
            metadata: tour,
        }).send(res);
    }
}

module.exports = TourController;