const Claim = require('../models/Claim');
const multer = require('multer');
const nodemailer = require('nodemailer');

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
    const { description } = req.body;
    const images = req.files.map(file => file.path);
    const claim = new Claim({ user: req.user._id, description, images });
    const createdClaim = await claim.save();
    res.status(201).json(createdClaim);
};

const getClaims = async (req, res) => {
    const claims = await Claim.find({ user: req.user._id });
    res.json(claims);
};

const sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        res.status(200).json({ message: 'Email sent: ' + info.response });
    });
};

module.exports = { upload, addClaim, getClaims, sendEmail };