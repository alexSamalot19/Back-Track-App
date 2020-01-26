import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getWeather: function() {
    return axios.get("/api/weather");
  },

  getStudent: function() {
    return axios.get("/api/students");
  },
  // Gets the student with the given id
  getAStudent: function(id) {
    return axios.get("/api/students/" + id);
  },

  // Deletes the student with the given id
  deleteStudent: function(id) {
    return axios.delete("/api/students/" + id);
  },

  // Deletes the topic with the given id
  deleteTopic: function(id) {
    return axios.delete("/api/topics/" + id);
  },

  getTopic: function() {
    return axios.get("/api/topics");
  },

  // Saves a topic to the database
  saveTopic: function(topic) {
    return axios.post("/api/topics", topic);
  },

  // Saves a topic to the database
  saveStudent: function(student) {
    return axios.post("/api/students", student);
  },

  getRecipes: function(query) {
    return axios.get("/api/recipes", { params: { q: query } });
  }
};
