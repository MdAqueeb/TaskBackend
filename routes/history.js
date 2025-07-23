const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

router.post('/history', historyController.addHistory);
router.get('/history', historyController.getHistory);

module.exports = router;
