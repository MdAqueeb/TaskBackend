
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    profilePicture: { type: String, default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' } 
});

module.exports = mongoose.model('User', userSchema);
