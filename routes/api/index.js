const router = require("express").Router();
const studentRoutes = require("./students");
const topicRoutes = require("./topics");

// Book routes
router.use("/students", studentRoutes);

router.use("/topics", topicRoutes);

module.exports = router;
