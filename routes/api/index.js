const router = require("express").Router();
const userRoute = require("./userRoute");
const thoughtRoute = require("./thoughtRoute");

router.use("/user", userRoute);
router.use("thought", thoughtRoute);

module.exports = router;