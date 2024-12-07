const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = "Tours";
const DOCUMENT_NAME = "Tour";
// Define the Tour Schema
const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    price: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    departure_location: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Tour must belong to a category!"],
      },
    ],
    image_url: {
      type: [String],
      default: [],
    },
    thumbnail_url: {
      type: String,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Tour must belong to a user!"],
    }, // Reference to User (admin who created the tour)
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        required: false,
      },
    ], // Reference to Reviews
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
        require: false,
      },
    ],
    average_review_star: {
      type: Number,
      default: 0,
    },
    max_group_size: {
      type: Number,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, tourSchema, COLLECTION_NAME);
