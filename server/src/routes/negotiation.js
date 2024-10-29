const express = require('express');
const negotiateController = require('../controller/negotiateController');
const authenticate = require('../middleware/authenticate.middleware');
//const authenticate = require('../middleware/authenticate.middleware')
const router = express.Router();

router.get('/allNegotiateAmount',authenticate, negotiateController.negotiateAmount);
router.post('/approveNegotiation',negotiateController.negotiationApprove);
router.post('/negotiationReject',negotiateController.negotiationReject);


module.exports = router;