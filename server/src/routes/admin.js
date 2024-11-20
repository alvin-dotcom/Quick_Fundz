const router = require('express').Router();
const adminController = require('../controller/adminController');
const authenticate = require('../middleware/authenticate.middleware');

router.get('/showRequest',adminController.showKycRequest)
router.post('/confirmOrRejectUser',adminController.confirm_OR_Reject_user)
router.get('/kycUsers', adminController.getAllKycDetails);
router.get('/users', adminController.getAllUsers);
router.delete('/deleteUser/:id', adminController.deleteUser);
router.post('/adminUpdateKycUser', adminController.adminUpdateKycUser);
router.post('/UpdateCurrent_user', adminController.adminUpdateUser);
router.get('/message',authenticate, adminController.adminMessage);
router.get('/allInvestment', adminController.allInvestorDetails);
router.get('/allLoanRequest', adminController.allLoanRequest);
router.post('/updateLoan_details', adminController.updateLoanUser);
router.post('/updateInvestor_details', adminController.updateInvestorUser);
//router.get('/messageDelete',authenticate, adminController.adminMessageDelete);

module.exports = router;