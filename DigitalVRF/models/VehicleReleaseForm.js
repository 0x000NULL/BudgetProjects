const mongoose = require('mongoose');

// Define the Vehicle Release Form schema
const formSchema = new mongoose.Schema({
    mva: { type: String, required: true },
    vin: { type: String, required: true },
    makeModel: { type: String, required: true },
    color: { type: String, required: true },
    images: [String],  // Array of image paths
    videos: [String],  // Array of video paths
    miles: { type: Number, required: true },
    poNumber: { type: String, required: true },
    soldTo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }  // Auto-generated timestamp
});

// Create and export the VehicleReleaseForm model
const VehicleReleaseForm = mongoose.model('VehicleReleaseForm', formSchema);
module.exports = VehicleReleaseForm;
