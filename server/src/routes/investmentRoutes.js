const express = require('express');
const investmentController = require('../controller/investmentController')
const authenticate = require('../middleware/authenticate.middleware')
const router = express.Router();

router.post('/invest', authenticate,investmentController.createInvestment);
router.get("/moneyLender",authenticate,investmentController.getAllInvestments);


module.exports = router;
