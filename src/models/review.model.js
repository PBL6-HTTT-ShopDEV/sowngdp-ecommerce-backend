'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'Reviews';
const DOCUMENT_NAME = 'Review';

const reviewSchema = new Schema({
    tour: {
        type: Schema.Types.ObjectId,
        ref: 'Tour',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

module.exports = mongoose.model(DOCUMENT_NAME, reviewSchema);