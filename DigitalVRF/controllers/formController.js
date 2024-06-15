const VehicleReleaseForm = require('../models/VehicleReleaseForm');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Controller function to add a new vehicle release form
const addForm = async (req, res) => {
    const { mva, vin, makeModel, color, miles, poNumber, soldTo } = req.body;
    const images = req.files.images.map(file => file.path);
    const videos = req.files.videos.map(file => file.path);
    const form = new VehicleReleaseForm({ mva, vin, makeModel, color, images, videos, miles, poNumber, soldTo });
    const createdForm = await form.save();
    res.status(201).json(createdForm);
};

// Controller function to get all vehicle release forms
const getForms = async (req, res) => {
    const forms = await VehicleReleaseForm.find();
    res.json(forms);
};

// Controller function to generate a PDF of a specific vehicle release form
const getFormPDF = async (req, res) => {
    const form = await VehicleReleaseForm.findById(req.params.id);
    if (!form) {
        return res.status(404).json({ message: 'Form not found' });
    }

    const doc = new PDFDocument();
    const filePath = `uploads/${form._id}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));

    // Add form details to the PDF
    doc.text(`MVA: ${form.mva}`);
    doc.text(`VIN: ${form.vin}`);
    doc.text(`Make and Model: ${form.makeModel}`);
    doc.text(`Color: ${form.color}`);
    doc.text(`Miles: ${form.miles}`);
    doc.text(`Purchase Order Number: ${form.poNumber}`);
    doc.text(`Sold To: ${form.soldTo}`);
    doc.end();

    // Send the PDF file to the client
    res.download(filePath);
};

module.exports = { upload, addForm, getForms, getFormPDF };
