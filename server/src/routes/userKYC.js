const router = require('express').Router();
const kycController = require('../controller/kycController');
const authenticate = require('../middleware/authenticate.middleware');

router.post('/kycEntry', authenticate,kycController.userKyc);
router.post('/verifiedKyc',kycController.verifiedUser)


module.exports = router;