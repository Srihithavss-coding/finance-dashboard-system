const express = require('express');
const router = express.Router();
const { getSummary, getCategoryStats } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('analyst', 'admin'));

router.get('/summary', getSummary);
router.get('/categories', getCategoryStats);

module.exports = router;