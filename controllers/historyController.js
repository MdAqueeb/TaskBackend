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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const history = await History.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name profilePicture');

    const total = await History.countDocuments();

    res.status(200).json({
      history,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};



