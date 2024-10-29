const express = require('express');
const loanController = require('../controller/loanController')
//const authenticate = require('../middleware/authenticate.middleware')
const router = express.Router();

router.post('/loan', loanController.requestLoan);
router.post("/requestInvestor", loanController.requestInvestor);
router.post("/rejectLoan", loanController.rejectedLoan);
router.post("/acceptLoan", loanController.rejectedLoan);
router.post("/lastNegotiate", loanController.lastNegotiate);
router.post("/paidStatus", loanController.paidStatus);

module.exports = router;
