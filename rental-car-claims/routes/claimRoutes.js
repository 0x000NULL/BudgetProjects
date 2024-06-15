const express = require('express');
const { addClaim, getClaims, sendEmail, upload } = require('../controllers/claimController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, upload.array('images'), addClaim);
router.get('/', protect, getClaims);
router.post('/email', protect, sendEmail);

module.exports = router;