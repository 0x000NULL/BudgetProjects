const nodemailer = require('nodemailer');
const EmailTemplate = require('../models/EmailTemplate');
const Claim = require('../models/Claim');

const saveTemplate = async (req, res) => {
    const { templateName, subject, body } = req.body;
    const template = new EmailTemplate({ templateName, subject, body });
    const savedTemplate = await template.save();
    res.status(201).json(savedTemplate);
};

const getTemplates = async (req, res) => {
    const templates = await EmailTemplate.find();
    res.json(templates);
};

const sendEmail = async (req, res) => {
    const { claimId, templateName } = req.body;
    const claim = await Claim.findById(claimId);
    const template = await EmailTemplate.findOne({ templateName });

    if (!claim || !template) {
        return res.status(404).json({ message: 'Claim or template not found' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: claim.renterEmail,
        subject: template.subject,
        text: template.body.replace('{{renterName}}', claim.renterName)
            .replace('{{description}}', claim.description)
            .replace('{{status}}', claim.status)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        res.status(200).json({ message: 'Email sent: ' + info.response });
    });
};

module.exports = { saveTemplate, getTemplates, sendEmail };
