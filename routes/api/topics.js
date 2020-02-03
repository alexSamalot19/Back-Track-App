const router = require("express").Router();
const topicsController = require("../../controllers/topicController");

// Matches with "/api/students"
router
  .route("/")
  .get(topicsController.findAll)
  .post(topicsController.create);

// Matches with "/api/students/:id"
router
  .route("/:id")
  .get(topicsController.findById)
  .put(topicsController.update)
  .delete(topicsController.remove);

module.exports = router;
