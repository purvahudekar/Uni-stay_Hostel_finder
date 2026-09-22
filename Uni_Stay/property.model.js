const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    propertyName: {
        type: String,
        required: true,
        trim: true
    },
    propertyType: {
        type: String,
        required: true,
        enum: ['Hostel', 'PG'],
        index: true
    },
    hostelType: {
        type: String,
        required: true,
        enum: ['Boys', 'Girls', 'Co-ed'],
        index: true
    },
    location: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    nearbyCollege: {
        type: String,
        required: true,
        trim: true
    },
    monthlyRent: {
        type: Number,
        required: true,
        index: true
    },
    securityDeposit: {
        type: Number,
        required: true
    },
    acType: {
        type: String,
        required: true,
        enum: ['AC', 'Non-AC'],
        index: true
    },
    bedType: {
        type: String,
        required: true,
        enum: ['Single', 'Double', 'Triple', '4 Sharing'],
        index: true
    },
    foodIncluded: {
        type: Boolean,
        required: true,
        default: false,
        index: true
    },
    attachedBathroom: {
        type: Boolean,
        required: true,
        default: false,
        index: true
    },
    distanceFromCampus: {
        type: Number, // In km
        required: true,
        index: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 5.0,
        index: true
    },
    amenities: {
        type: [String],
        required: true,
        default: [],
        index: true
    },
    availableBeds: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    images: {
        type: [String],
        required: true,
        default: []
    },
    description: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// --- OPTIMIZED FILTER QUERY INDEXES (Compound and covered indexes for production-ready performance) ---
// 1. Compound index for common dashboard grid filters (property type + hostel gender + price limit)
propertySchema.index({ propertyType: 1, hostelType: 1, monthlyRent: 1 });

// 2. Compound index for location-based search filtering and distance boundaries
propertySchema.index({ location: 1, monthlyRent: 1, distanceFromCampus: 1 });

// 3. Text search index on name, location, and nearby college for the global query search box
propertySchema.index({ 
    propertyName: 'text', 
    location: 'text', 
    nearbyCollege: 'text' 
}, {
    weights: {
        propertyName: 10,
        location: 5,
        nearbyCollege: 3
    },
    name: 'PropertyTextSearchIndex'
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
