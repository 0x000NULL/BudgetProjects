const express = require('express');
const { addVehicleReleaseForm, getVehicleReleaseForms } = require('../controllers/vehicleReleaseFormController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, addVehicleReleaseForm);
router.get('/', protect, getVehicleReleaseForms);

module.exports = router;
