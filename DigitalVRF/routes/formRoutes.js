const express = require('express');
const { addForm, getForms, getFormPDF, upload } = require('../controllers/formController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Route to add a new vehicle release form
router.post('/', protect, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 2 }]), addForm);

// Route to get all vehicle release forms
router.get('/', protect, getForms);

// Route to generate and download a PDF of a specific vehicle release form
router.get('/:id/pdf', protect, getFormPDF);

module.exports = router;
