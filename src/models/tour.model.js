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
    start_date: { 
        type: Date, 
        required: true 
    },
    end_date: { 
        type: Date, 
        required: true 
    },
    created_by: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, // Reference to User (admin who created the tour)
    categories: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Category" 
    }], // Reference to Categories
    reviews: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Review" 
    }], // Reference to Reviews
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    destination: { 
        type: String, 
        required: true 
    },
}
, {
    collection: COLLECTION_NAME,
    timestamps: true,
});

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, tourSchema);
