const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user.model');
const Biodata = require('./models/biodata.model');

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected');
        const user = await User.findOne();
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }
        console.log('Using user:', user.email);
        const res = await Biodata.create({
            userId: user._id,
            personalDetails: { fullName: 'Test Manual' }
        });
        console.log('Created:', res._id);
        const bios = await Biodata.find({ userId: user._id });
        console.log('Bios count for user:', bios.length);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
test();
