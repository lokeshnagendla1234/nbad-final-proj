const express = require('express');
const router = express.Router();
const chartController = require('../Controllers/chartController');

// Route to get chart data based on type
router.get('/bar-chart', chartController.getBarData);

router.get('/pie-chart', chartController.getPieData);

module.exports = router;
