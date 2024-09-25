const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = "Tours";
const DOCUMENT_NAME = "Tour";
// Define the Tour Schema
const tourSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    created_by: { 
        type: Schema.Types.ObjectId, 
        ref: "Account", 
        required: true 
    }, // Reference to User (admin who created the tour)
    categories: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Category" ,
        required: false
    }], // Reference to Categories
    reviews: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Review",
        required: false 
    }], // Reference to Reviews
    average_review_star: { 
        type: Number, 
        default: 0 
    }, 
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    destination: { 
        type: String, 
        required: true 
    },
    duration: { 
        type: String, 
        required: true 
    },
    max_group_size: { 
        type: Number, 
        required: true 
    },
    image_cover: { 
        type: String, 
        required: true, 
    },
    thumbnail: { 
        type: String, 
        required: true 
    },
    images: {
        type: [String],
        default: [],
    },
}
, {
    collection: COLLECTION_NAME,
    timestamps: true,
});

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, tourSchema);
