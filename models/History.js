
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: { type: Number, required: true },   
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);

