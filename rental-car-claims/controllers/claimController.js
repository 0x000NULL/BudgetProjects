const Claim = require('../models/Claim');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const addClaim = async (req, res) => {
    const { description, renterName, renterEmail, renterPhone } = req.body;
    const images = req.files.map(file => file.path);
    const claim = new Claim({ user: req.user._id, description, renterName, renterEmail, renterPhone, images });
    const createdClaim = await claim.save();
    res.status(201).json(createdClaim);
};

const updateClaim = async (req, res) => {
    const { description, renterName, renterEmail, renterPhone } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];
    const claim = await Claim.findById(req.params.id);
    if (claim) {
        claim.description = description || claim.description;
        claim.renterName = renterName || claim.renterName;
        claim.renterEmail = renterEmail || claim.renterEmail;
        claim.renterPhone = renterPhone || claim.renterPhone;
        if (images.length > 0) {
            claim.images = images;
        }
        const updatedClaim = await claim.save();
        res.json(updatedClaim);
    } else {
        res.status(404).json({ message: 'Claim not found' });
    }
};

const getClaims = async (req, res) => {
    const claims = await Claim.find({ user: req.user._id });
    res.json(claims);
};

const getClaimById = async (req, res) => {
    const claim = await Claim.findById(req.params.id);
    if (claim) {
        res.json(claim);
    } else {
        res.status(404).json({ message: 'Claim not found' });
    }
};

const getClaimPDF = async (req, res) => {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
        return res.status(404).json({ message: 'Claim not found' });
    }

    const doc = new PDFDocument();
    const filePath = `uploads/${claim._id}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));

    doc.text(`Renter's Name: ${claim.renterName}`);
    doc.text(`Renter's Email: ${claim.renterEmail}`);
    doc.text(`Renter's Phone: ${claim.renterPhone}`);
    doc.text(`Description: ${claim.description}`);
    doc.text(`Status: ${claim.status}`);
    doc.text(`Created At: ${claim.createdAt}`);
    doc.end();

    res.download(filePath);
};

module.exports = { upload, addClaim, updateClaim, getClaims, getClaimById, getClaimPDF };
