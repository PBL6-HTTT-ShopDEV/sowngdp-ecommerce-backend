"use strict";

const { Success } = require("../core/success.response");
const TourService = require("../services/tour.service");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFESHTOKEN: "x-rtoken-id",
};

class TourController {
  static async getAllTour(req, res, next) {
    const tours = await TourService.getAllTour();
    if (!tours) {
      return new Success({
        message: "Get all tour success!",
        metadata: [],
      }).send(res);
    }
    return new Success({
      message: "Get all tour success!",
      metadata: tours,
    }).send(res);
  }

  static async getTours(req, res, next) {
      const { page, limit, categoryId, price } = req.query;
      console.log(page,limit, categoryId, price);
      const tours = await TourService.getTours({ page, limit, categoryId, price });
      return new Success({
        message: "Get tours with pagination success!",
        metadata: tours,
      }).send(res);
  }

  static async getTourById(req, res, next) {
    console.log('\n[Controller] 📥 Request:', {
      params: req.params,
      query: req.query,
      url: req.url,
      headers: {
        'x-api-key': req.headers['x-api-key']?.slice(0, 10) + '...',
        'content-type': req.headers['content-type']
      }
    });

    const tour = await TourService.getTourById(req.query.tourId);
    console.log('[Controller] 📦 Response:', {
      found: !!tour,
      tourId: tour?._id
    });

    return new Success({
      message: "Get tour by id success!",
      metadata: tour,
    }).send(res);
  }

  static async getTourByUserId(req, res, next) {
    const tours = await TourService.getTourByUserId(req.params.userId);
    return new Success({
      message: "Get tour by user id success!",
      metadata: tours,
    }).send(res);
  }

  static async getTourByCategory(req, res, next) {
    const tours = await TourService.getTourByCategory(req.params.categoryId);
    return new Success({
      message: "Get tour by category success!",
      metadata: tours,
    }).send(res);
  }

  static async createTour(req, res, next) {
    try {
      const tourData = req.body;
      const files = req.files;
      const userId = req.headers[HEADER.CLIENT_ID];

      const thumbnailFile = files["thumbnail"] ? files["thumbnail"][0] : null;
      const imageFiles = files["images"] || [];

      const tour = await TourService.createTour(
        tourData,
        thumbnailFile,
        imageFiles,
        userId
      );

      return new Success({
        message: "Create tour success!",
        metadata: tour,
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  static async updateTour(req, res, next) {
    const tour = await TourService.updateTour(req.params.id, req.body);
    return new Success({
      message: "Update tour success!",
      metadata: tour,
    }).send(res);
  }

  static async deleteTour(req, res, next) {
    const tour = await TourService.deleteTour(req.params.id);
    return new Success({
      message: "Delete tour success!",
      metadata: tour,
    }).send(res);
  }

  // example json body for delete tour
  // {
  //     "tourId": "5f7d2e9f5b1b4b0017f4e0f4"
  // }

  static async getTourByCategory(req, res, next) {
    const tours = await TourService.getTourByCategory(req.params.categoryId);
    return new Success({
      message: "Get tour by category success!",
      metadata: tours,
    }).send(res);
  }

  static async getTourByLocation(req, res, next) {
    const tours = await TourService.getTourByLocation(req.params.locationId);
    return new Success({
      message: "Get tour by location success!",
      metadata: tours,
    }).send(res);
  }

  static async getTourByPrice(req, res, next) {
    const tours = await TourService.getTourByPrice(req.params.price);
    return new Success({
      message: "Get tour by price success!",
      metadata: tours,
    }).send(res);
  }

  static async getTourByCategoryAndLocation(req, res, next) {
    const tours = await TourService.getTourByCategoryAndLocation(
      req.params.categoryId,
      req.params.locationId
    );
    return new Success({
      message: "Get tour by category and location success!",
      metadata: tours,
    }).send(res);
  }

  static async getTourByCategoryAndLocationAndPrice(req, res, next) {
    const tours = await TourService.getTourByCategoryAndLocationAndPrice(
      req.params.categoryId,
      req.params.locationId,
      req.params.price
    );

    return new Success({
      message: "Get tour by category, location and price success!",
      metadata: tours,
    }).send(res);
  }

  static async getTourByCategoryAndPrice(req, res, next) {
    const tours = await TourService.getTourByCategoryAndPrice(
      req.params.categoryId,
      req.params.price
    );
    return new Success({
      message: "Get tour by category and price success!",
      metadata: tours,
    }).send(res);
  }

  static async getTourByLocationAndPrice(req, res, next) {
    const tours = await TourService.getTourByLocationAndPrice(
      req.params.locationId,
      req.params.price
    );
    return new Success({
      message: "Get tour by location and price success!",
      metadata: tours,
    }).send(res);
  }

  // example json body for get tour by category, location and price
  // {
  //     "categoryId": "5f7d2e9f5b1b4b0017f4e0f4",
  //     "locationId": "5f7d2e9f5b1b4b0017f4e0f4",
  //     "price": 100
  // }
}

module.exports = TourController;