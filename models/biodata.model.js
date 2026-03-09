const mongoose = require('mongoose');

const biodataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    templateId: { type: String, default: 'traditional' },
    customization: {
        primaryColor: { type: String, default: '#8B0000' }, // Default deep red
        secondaryColor: { type: String, default: '#FFD700' }, // Default gold
        fontFamily: { type: String, default: 'Inter' }
    },
    personalDetails: {
        fullName: String,
        gender: String,
        dob: Date,
        age: Number,
        height: String,
        religion: String,
        caste: String,
        motherTongue: String,
        maritalStatus: String,
        nationality: { type: String, default: 'Indian' }
    },
    contactDetails: {
        phone: String,
        email: String,
        address: String,
        hideContact: { type: Boolean, default: false }
    },
    educationProfession: {
        qualification: String,
        college: String,
        occupation: String,
        company: String,
        income: String,
        workLocation: String
    },
    familyDetails: {
        fatherName: String,
        fatherOccupation: String,
        motherName: String,
        motherOccupation: String,
        siblings: String,
        familyType: String,
        familyStatus: String,
        nativePlace: String
    },
    horoscope: {
        showHoroscope: { type: Boolean, default: false },
        rashi: String,
        nakshatra: String,
        gotra: String,
        timeOfBirth: String,
        placeOfBirth: String
    },
    photo: {
        url: String,
        isCropped: Boolean
    },
    privacy: {
        showPhone: { type: Boolean, default: true },
        showEmail: { type: Boolean, default: true },
        showIncome: { type: Boolean, default: true }
    },
    version: { type: Number, default: 1 },
    isWatermarked: { type: Boolean, default: true },
    passwordProtected: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

biodataSchema.pre('save', function () {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('Biodata', biodataSchema);
