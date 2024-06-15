const express = require('express');
const { addForm, getForms, getFormPDF, upload } = require('../controllers/formController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 2 }]), addForm);
router.get('/', protect, getForms);
router.get('/:id/pdf', protect, getFormPDF);

module.exports = router;
