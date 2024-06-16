const express = require('express');
const { addClaim, updateClaim, getClaims, getClaimById, getClaimPDF, upload } = require('../controllers/claimController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, upload.array('images'), addClaim);
router.put('/:id', protect, upload.array('images'), updateClaim);
router.get('/', protect, getClaims);
router.get('/:id', protect, getClaimById);
router.get('/:id/pdf', protect, getClaimPDF);

module.exports = router;
