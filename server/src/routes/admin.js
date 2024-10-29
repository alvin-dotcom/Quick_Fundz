const router = require('express').Router();
const adminController = require('../controller/adminController')

router.get('/showRequest',adminController.showKycRequest)
router.post('/confirmOrRejectUser',adminController.confirm_OR_Reject_user)

module.exports = router;