"use strict";

const tourRepo = require("./repositories/tour.repo");

const { NotFoundError } = require("../core/error.response");

const ImageService = require("../helpers/upload.image");

class TourService {
  static async getAllTour() {
    return await tourRepo.getAllTour();
  }

  static async getTourById(id) {
    const tour = await tourRepo.getTourById(id);
    if (!tour) {
      throw new NotFoundError("Tour not found!");
    }
    return tour;
  }

  static async createTour(
    tourData,
    imageCoverFile,
    thumbnailFile,
    imageFiles,
    userId
  ) {
    // Upload image cover
    if (imageCoverFile) {
      const imageCoverUrl = await ImageService.uploadImage(imageCoverFile);
      tourData.image_cover = imageCoverUrl;
    } else {
      throw new Error("Image cover is required");
    }

    // Upload thumbnail
    if (thumbnailFile) {
      const thumbnailUrl = await ImageService.uploadImage(thumbnailFile);
      tourData.thumbnail = thumbnailUrl;
    } else {
      throw new Error("Thumbnail is required");
    }

    // Upload images array
    if (imageFiles.length > 0) {
      const imageUrls = await ImageService.uploadImages(imageFiles);
      tourData.images = imageUrls;
    } else {
      tourData.images = []; // Or handle as per your requirements
    }

    if (userId) {
      tourData.created_by = userId;
    } else {
      throw new Error("User ID is required");
    }

    // Save the tour data to the database
    const tour = await tourRepo.createTour(tourData);

    return tour;
  }

  static async updateTour(id, data) {
    const tour = await tourRepo.updateTour(id, data);
    if (!tour) {
      throw new NotFoundError("Tour not found!");
    }
    return tour;
  }

  static async deleteTour(id) {
    const tour = await tourRepo.deleteTour(id);
    if (!tour) {
      throw new NotFoundError("Tour not found!");
    }
    return tour;
  }

  static async getTourByCategory(categoryId) {
    return await tourRepo.getTourByCategory(categoryId);
  }

  static async getTourByLocation(locationId) {
    return await tourRepo.getTourByLocation(locationId);
  }

  static async getTourByPrice(price) {
    return await tourRepo.getTourByPrice(price);
  }

  static async getTourByCategoryAndLocation(categoryId, locationId) {
    return await tourRepo.getTourByCategoryAndLocation(categoryId, locationId);
  }

  static async getTourByCategoryAndLocationAndPrice(
    categoryId,
    locationId,
    price
  ) {
    return await tourRepo.getTourByCategoryAndLocationAndPrice(
      categoryId,
      locationId,
      price
    );
  }

  static async getTourByCategoryAndPrice(categoryId, price) {
    return await tourRepo.getTourByCategoryAndPrice(categoryId, price);
  }

  static async getTourByLocationAndPrice(locationId, price) {
    return await tourRepo.getTourByLocationAndPrice(locationId, price);
  }
}

module.exports = TourService;
