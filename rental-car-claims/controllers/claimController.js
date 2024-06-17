const Claim = require('../models/Claim');
const AuditLog = require('../models/AuditLog');
const nodemailer = require('nodemailer');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const json2csv = require('json2csv').parse;
const excel = require('node-excel-export');

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
    const images = req.files.images ? req.files.images.map(file => file.path) : [];
    const additionalFiles = req.files.additionalFiles ? req.files.additionalFiles.map(file => file.path) : [];
    const claim = new Claim({ user: req.user._id, description, renterName, renterEmail, renterPhone, images, additionalFiles });
    const createdClaim = await claim.save();

    // Log action
    await logAction(req.user._id, 'Created Claim', createdClaim._id);

    // Send notification email
    sendNotificationEmail(renterEmail, 'Claim Submitted', `Your claim has been submitted and is under review.`);

    res.status(201).json(createdClaim);
};

const updateClaim = async (req, res) => {
    const { description, renterName, renterEmail, renterPhone, status } = req.body;
    const images = req.files.images ? req.files.images.map(file => file.path) : [];
    const additionalFiles = req.files.additionalFiles ? req.files.additionalFiles.map(file => file.path) : [];
    const claim = await Claim.findById(req.params.id);
    if (claim) {
        const oldStatus = claim.status;
        claim.description = description || claim.description;
        claim.renterName = renterName || claim.renterName;
        claim.renterEmail = renterEmail || claim.renterEmail;
        claim.renterPhone = renterPhone || claim.renterPhone;
        claim.status = status || claim.status;
        if (images.length > 0) {
            claim.images = images;
        }
        if (additionalFiles.length > 0) {
            claim.additionalFiles = additionalFiles;
        }
        const updatedClaim = await claim.save();

        // Log action
        await logAction(req.user._id, `Updated Claim (${status})`, updatedClaim._id);

        // Send notification email
        if (status && status !== oldStatus) {
            sendNotificationEmail(renterEmail, `Claim ${status}`, `Your claim status has been updated to ${status}.`);
        }

        res.json(updatedClaim);
    } else {
        res.status(404).json({ message: 'Claim not found' });
    }
};

const logAction = async (userId, action, claimId) => {
    const auditLog = new AuditLog({ user: userId, action, claim: claimId });
    await auditLog.save();
};

const sendNotificationEmail = (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending notification email:', error);
        } else {
            console.log('Notification email sent:', info.response);
        }
    });
};

const getClaims = async (req, res) => {
    const { status, startDate, endDate, renterName, vehicleDetails, exportFormat } = req.query;
    let query = { user: req.user._id };

    if (status) {
        query.status = status;
    }

    if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    if (renterName) {
        query.renterName = { $regex: renterName, $options: 'i' };
    }

    if (vehicleDetails) {
        query.vehicleDetails = { $regex: vehicleDetails, $options: 'i' };
    }

    const claims = await Claim.find(query);

    if (exportFormat) {
        switch (exportFormat) {
            case 'csv':
                const csv = json2csv(claims);
                res.header('Content-Type', 'text/csv');
                res.attachment('claims.csv');
                return res.send(csv);
            case 'excel':
                const styles = {
                    headerDark: {
                        fill: {
                            fgColor: {
                                rgb: 'FF000000'
                            }
                        },
                        font: {
                            color: {
                                rgb: 'FFFFFFFF'
                            },
                            sz: 14,
                            bold: true,
                            underline: true
                        }
                    },
                    cellPink: {
                        fill: {
                            fgColor: {
                                rgb: 'FFFFCCFF'
                            }
                        }
                    },
                    cellGreen: {
                        fill: {
                            fgColor: {
                                rgb: 'FF00FF00'
                            }
                        }
                    }
                };

                const specification = {
                    renterName: { displayName: 'Renter Name', headerStyle: styles.headerDark, width: 120 },
                    renterEmail: { displayName: 'Renter Email', headerStyle: styles.headerDark, width: 200 },
                    renterPhone: { displayName: 'Renter Phone', headerStyle: styles.headerDark, width: 120 },
                    description: { displayName: 'Description', headerStyle: styles.headerDark, width: 300 },
                    status: { displayName: 'Status', headerStyle: styles.headerDark, width: 100 }
                };

                const dataset = claims.map(claim => ({
                    renterName: claim.renterName,
                    renterEmail: claim.renterEmail,
                    renterPhone: claim.renterPhone,
                    description: claim.description,
                    status: claim.status
                }));

                const report = excel.buildExport([{
                    name: 'Claims Report',
                    specification: specification,
                    data: dataset
                }]);

                res.attachment('claims.xlsx');
                return res.send(report);
            default:
                return res.status(400).json({ message: 'Invalid export format' });
        }
    }

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
