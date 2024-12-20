"use strict";

const tourRepo = require("./repositories/tour.repo");

const { NotFoundError } = require("../core/error.response");

const FirebaseStorage = require("../helpers/firebase.storage");

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

  static async getTours(filter) {
    const { page, limit, categoryId, price } = filter; // Đặt giá trị mặc định cho page và limit
    console.log(page, limit, categoryId, price);
    return await tourRepo.getTours(page, limit, categoryId, price);
  }

  static async createTour(tourData, thumbnailFile, imageFiles, userId) {
    // Upload thumbnail
    if (thumbnailFile) {
      const firebaseStorage = FirebaseStorage.getInstance();
      const thumbnailUrl = await firebaseStorage.uploadImage(thumbnailFile);
      tourData.thumbnail_url = thumbnailUrl;
    } else {
      throw new Error("Thumbnail is required");
    }

    // Upload images array
    if (imageFiles.length > 0) {
      const firebaseStorage = FirebaseStorage.getInstance();
      const imageUrls = await firebaseStorage.uploadImage(imageFiles);
      tourData.image_url = imageUrls;
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