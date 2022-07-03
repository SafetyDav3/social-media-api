// Establish router and import route sources
const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// Establish appends for URLs
router.use("/users", userRoutes);
router.use("/Thought", thoughtRoutes);

// Get this module outta here!
module.exports = router;
