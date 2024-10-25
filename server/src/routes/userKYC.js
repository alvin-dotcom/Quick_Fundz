const router = require('express').Router();
const kycController = require('../controller/kycController');
const authenticate = require('../middleware/authenticate.middleware');

router.post('/kycEntry', authenticate,kycController.userKyc);
router.post('/verifiedKyc',kycController.verifiedUser)
router.post('/updatekyc',kycController.updateKyc)

module.exports = router;