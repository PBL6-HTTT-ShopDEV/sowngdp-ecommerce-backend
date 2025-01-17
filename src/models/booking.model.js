"use strict";

const mongoose = require("mongoose");

const COLLECTION_NAME = "Bookings";
const DOCUMENT_NAME = "Booking";

// khai báo một enum status
const bookingStatus = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};

const bookingSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(bookingStatus),
      default: bookingStatus.PENDING,
    },
    total_price: {
      type: Number,
      required: true,
    },
    number_of_people: {
      type: Number,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, bookingSchema, COLLECTION_NAME);
