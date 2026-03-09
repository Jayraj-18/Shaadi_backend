const Biodata = require('../models/biodata.model');
const mongoose = require('mongoose');

exports.saveBiodata = async (req, res) => {
    try {

        const { personalDetails, contactDetails, educationProfession, familyDetails, horoscope, customization, photo, privacy } = req.body;
        const biodata = await Biodata.create({
            userId: req.user._id,
            personalDetails,
            contactDetails,
            educationProfession,
            familyDetails,
            horoscope,
            customization,
            photo,
            privacy
        });

        res.status(201).json(biodata);
    } catch (error) {
        console.error('SERVER SAVE BIODATA ERROR:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateBiodata = async (req, res) => {
    try {
        const biodata = await Biodata.findById(req.params.id);
        if (!biodata) return res.status(404).json({ message: 'Biodata not found' });
        if (biodata.userId.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

        Object.assign(biodata, req.body);
        biodata.version += 1;
        await biodata.save();
        res.json(biodata);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBiodataById = async (req, res) => {
    try {
        const biodata = await Biodata.findById(req.params.id);
        if (!biodata) return res.status(404).json({ message: 'Biodata not found' });
        res.json(biodata);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserBiodatas = async (req, res) => {
    try {
        const biodatas = await Biodata.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(biodatas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.duplicateBiodata = async (req, res) => {
    try {
        const original = await Biodata.findById(req.params.id);
        if (!original) return res.status(404).json({ message: 'Biodata not found' });

        const duplicate = new Biodata(original.toObject());
        duplicate._id = new mongoose.Types.ObjectId();
        duplicate.isNew = true;
        duplicate.version = 1;
        duplicate.createdAt = Date.now();
        await duplicate.save();
        res.status(201).json(duplicate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBiodata = async (req, res) => {
    try {
        const biodata = await Biodata.findById(req.params.id);
        if (!biodata) return res.status(404).json({ message: 'Biodata not found' });
        if (biodata.userId.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

        await biodata.remove();
        res.json({ message: 'Biodata deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
