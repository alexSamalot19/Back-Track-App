const router = require("express").Router();
const studentController = require("../../controllers/studentController");

// Matches with "/api/students"
router
  .route("/")
  .get(studentsController.findAll)
  .post(studentsController.create);

// Matches with "/api/students/:id"
router
  .route("/:id")
  .get(studentsController.findById)
  .put(studentsController.update)
  .delete(studentsController.remove);

//Gets external api call
router.get("/recipes", (req, res) => {
  axios
    .get("http://www.recipepuppy.com/api/", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

router.get("/weather", (req, res) => {
  axios
    .get(
      "https://api.darksky.net/forecast/65ed3ddef608a447f48aebd7e82b1e28/37.8267,-122.4233"
    )
    // .then(({ data: { results } }) => res.json(results))
    .then(response => {
      const temperature = response.data.currently.temperature;
      const apparentTemperature = response.data.currently.apparentTemperature;

      console.log(
        `It's currently ${temperature}. It feels like ${apparentTemperature}.`
      );

      res.json(response.data);
    })

    .catch(err => res.status(422).json(err));
});

module.exports = router;
