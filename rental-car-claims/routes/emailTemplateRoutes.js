const express = require('express');
const { saveTemplate, getTemplates, sendEmail } = require('../controllers/emailTemplateController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, saveTemplate);
router.get('/', protect, getTemplates);
router.post('/send', protect, sendEmail);

module.exports = router;
