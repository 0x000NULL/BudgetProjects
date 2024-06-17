const VehicleReleaseForm = require('../models/VehicleReleaseForm');

const addVehicleReleaseForm = async (req, res) => {
    const { mva, vin, make, model, color, miles, purchaseOrderNumber, soldTo } = req.body;
    const images = req.files.images ? req.files.images.map(file => file.path) : [];
    const videos = req.files.videos ? req.files.videos.map(file => file.path) : [];

    try {
        const form = new VehicleReleaseForm({
            mva,
            vin,
            make,
            model,
            color,
            images,
            videos,
            miles,
            purchaseOrderNumber,
            soldTo
        });
        await form.save();
        res.status(201).json(form);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getVehicleReleaseForms = async (req, res) => {
    try {
        const forms = await VehicleReleaseForm.find();
        res.json(forms);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addVehicleReleaseForm, getVehicleReleaseForms };
