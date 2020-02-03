const router = require("express").Router();
const studentRoutes = require("./students");
const topicRoutes = require("./topics");

router.use("/students", studentRoutes);

router.use("/topics", topicRoutes);

module.exports = router;
