const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    images: [String],
    additionalFiles: [String],
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    renterName: { type: String, required: true },
    renterEmail: { type: String, required: true },
    renterPhone: { type: String, required: true }
});

const Claim = mongoose.model('Claim', claimSchema);

module.exports = Claim;
