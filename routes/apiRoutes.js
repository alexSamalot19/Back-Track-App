const axios = require("axios");
const router = require("express").Router();

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

// router.get("/CalendarEvent", (req, res) => {
//   gapi.client
//     .init({
//       apiKey: "AIzaSyCduOIHnl_CeNGGdiulRH82jJ7F7o6XGCs"
//     })
//     .then(function() {
//       return gapi.client.request({
//         path: `https://www.googleapis.com/calendar/v3/calendars/bvd8t1il5aqgfmb275colgafh4@group.calendar.google.com/events?maxResults=11&orderBy=updated&timeMin=${moment().toISOString()}&timeMax=${moment()
//           .endOf("day")
//           .toISOString()}`
//       });
//     })
//     .then(response => {
//       let events = response.result.items;
//     });
// });

module.exports = router;
