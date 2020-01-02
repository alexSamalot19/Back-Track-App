import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getWeather: function() {
    return axios.get("/api/weather");
  },

  getRecipes: function(query) {
    return axios.get("/api/recipes", { params: { q: query } });
  }
};
