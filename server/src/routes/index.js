const router = require("express").Router();
const user = require('./user')
const userKYC = require('./userKYC')
const admin = require('./admin')

router.use("/auth", user);
router.use("/auth",userKYC);
router.use("/admin",admin)
module.exports = router;