const express = require('express');
const { createInvestment } = require('../controller/investmentController');
const { getAllInvestments } = require('../controller/investmentController');
const router = express.Router();

router.post('/invest', createInvestment);
router.get("/getloan", getAllInvestments);


module.exports = router;
