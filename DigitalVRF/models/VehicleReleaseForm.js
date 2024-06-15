const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    mva: { type: String, required: true },
    vin: { type: String, required: true },
    makeModel: { type: String, required: true },
    color: { type: String, required: true },
    images: [String],
    videos: [String],
    miles: { type: Number, required: true },
    poNumber: { type: String, required: true },
    soldTo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const VehicleReleaseForm = mongoose.model('VehicleReleaseForm', formSchema);

module.exports = VehicleReleaseForm;
