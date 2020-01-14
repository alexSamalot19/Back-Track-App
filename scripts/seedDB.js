const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Students collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/students", {
  useNewUrlParser: true
});

const studentSeed = [
  {
    first_name: "Bob",
    last_name: "Seed",
    email: "bobSeed@gmail.com",
    gender: "MALE"
  }
];

db.Student.remove({})
  .then(() => db.Student.collection.insertMany(studentSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
