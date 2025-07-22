const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/users', userController.addUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users/:id/claim', userController.claimPoints);
router.put('/users/:id/points', userController.updateUserPoints);
router.put('/users/ranks/update', userController.updateRanks);

module.exports = router;
