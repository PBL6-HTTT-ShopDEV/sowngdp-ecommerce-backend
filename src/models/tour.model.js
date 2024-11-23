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

// example json file to import to database
// {
//     "name": "Tour 1",
//     "destination": "Vietnam",
//     "description": "Tour 1 description",
//     "price": 1000,
//     "start_date": "2021-01-01",
//     "end_date": "2021-01-10",
//     "departure_location": "Hanoi",
//     "categories": ["5f7d2e9f5b1b4b0017f4e0f4"],
//     "image_url": ["https://www.google.com"],
//     "thumbnail_url": "https://www.google.com",
//     "created_by": "5f7d2e9f5b1b4b0017f4e0f4",
//     "reviews": [],
//     "bookings": [],
//     "average_review_star": 0,
//     "max_group_size": 10
// }
//
