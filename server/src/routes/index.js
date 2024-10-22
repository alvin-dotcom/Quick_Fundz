const router = require("express").Router();
const user = require('./user')
router.use("/auth", user);

module.exports = router;