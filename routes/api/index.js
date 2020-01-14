const router = require("express").Router();
const studentRoutes = require("./students");

// Book routes
router.use("/students", studentRoutes);

module.exports = router;
