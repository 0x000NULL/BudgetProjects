const mongoose = require('mongoose');

const vehicleReleaseFormSchema = new mongoose.Schema({
    mva: { type: String, required: false },
    vin: { type: String, required: false },
    make: { type: String, required: false },
    model: { type: String, required: false },
    color: { type: String, required: false },
    images: [String],
    videos: [String],
    miles: { type: Number, required: true },
    purchaseOrderNumber: { type: String, required: true },
    soldTo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const VehicleReleaseForm = mongoose.model('VehicleReleaseForm', vehicleReleaseFormSchema);

module.exports = VehicleReleaseForm;
