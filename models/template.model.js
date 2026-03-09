const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    isActive: { type: Boolean, default: true },
    previewImage: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Template', templateSchema);
