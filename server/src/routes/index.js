const router = require("express").Router();
const user = require('./user');
const userKYC = require('./userKYC');
const admin = require('./admin');
const investment = require('./investmentRoutes'); 

router.use("/auth", user);
router.use("/auth", userKYC);
router.use("/admin", admin);
router.use("/investments", investment);


module.exports = router;
