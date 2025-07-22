const History = require('../models/History');

exports.addHistory = async (req, res) => {
  try {
    const { userId, points } = req.body;
    const newHistory = new History({ userId, points, claimedAt: new Date() });
    await newHistory.save();
    res.status(201).json(newHistory);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await History.find().populate('userId', 'name');
    res.status(200).json(history);
  } catch (err) {
    res.status(409).json({ error: 'Failed to retrieve history' });
  }
};
