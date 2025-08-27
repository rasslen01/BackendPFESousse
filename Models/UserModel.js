const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },
    password: { type: String, required: true, minlength: 6 },
    roleType: { type: String, enum: ['admin', 'player', 'gestionnaire de terrain', 'organisateur'] },
    ProfilePicture: { type: String, default: 'client.png' }
}, { timestamps: true });

usersSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', usersSchema);
module.exports = User;
