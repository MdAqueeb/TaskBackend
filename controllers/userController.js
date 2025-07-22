const User = require('../models/User');
const History = require('../models/History');

exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await User.findOne({ name });
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const users = await User.find()
      .sort({ rank: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.claimPoints = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const points = Math.floor(Math.random() * 10) + 1;
    user.points += points;
    await user.save();

    const history = new History({
      userId: user._id,
      points,
      claimedAt: new Date()
    });
    await history.save();

    await updateRanksLogic();

    res.status(200).json({ message: 'Points claimed', points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRanks = async (req, res) => {
  try {
    await updateRanksLogic();
    res.status(200).json({ message: 'Ranks updated' });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

exports.updateUserPoints = async (req, res) => {
  try {
    const { points } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.points = points;
    await user.save();
    await updateRanksLogic();

    res.status(200).json({ message: 'User points updated', user });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const updateRanksLogic = async () => {
  const users = await User.find().sort({ points: -1 });
  for (let i = 0; i < users.length; i++) {
    users[i].rank = i + 1;
    await users[i].save();
  }
};
