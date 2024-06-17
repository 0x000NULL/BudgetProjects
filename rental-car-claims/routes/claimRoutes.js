const express = require('express');
const { addClaim, updateClaim, getClaims, getClaimById, getClaimPDF, upload } = require('../controllers/claimController');
const { protect } = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', protect, roleMiddleware(['Admin', 'Manager', 'User']), upload.array('images'), addClaim);
router.put('/:id', protect, roleMiddleware(['Admin', 'Manager']), upload.array('images'), updateClaim);
router.get('/', protect, roleMiddleware(['Admin', 'Manager', 'User']), getClaims);
router.get('/:id', protect, roleMiddleware(['Admin', 'Manager']), getClaimById);
router.get('/:id/pdf', protect, roleMiddleware(['Admin', 'Manager']), getClaimPDF);

module.exports = router;
