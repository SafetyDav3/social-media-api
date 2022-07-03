// Establish express router
const router = require("express").Router();

// Get api routes
const apiRoutes = require("./api");

// Establish  URL route
router.use("/api", apiRoutes);

// Display 404 not found in the event of user err
router.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

module.exports = router;
