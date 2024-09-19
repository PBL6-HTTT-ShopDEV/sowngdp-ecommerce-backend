'use strict'

const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Account';
const COLLECTION_NAME = "Accounts";

const accountSchema = new Schema({
    user_name: {
        type: String,
        trim: true,
        maxLength: 150
    },
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'unactive'],
        default: 'unactive'
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false,
    },
    roles: {
        type: Array,
        default: [],
    },
    name: {
         type: String,  
         required: true 
        },
    phone_number: { 
        type: String, 
        required: false 
    },
    address: { 
        type: String, 
        required: false 
    },
    date_of_birth: { 
        type: Date, 
        required: false 
    },
    favourite_lists: [{
         type: Schema.Types.ObjectId, 
         ref: 'Tour' 
        }], // Reference to Tours
    bookings: [{
         type: Schema.Types.ObjectId, 
         ref: 'Booking' 
        }], // Reference to Bookings
    created_at: { 
        type: Date, 
        default: Date.now 
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, accountSchema);