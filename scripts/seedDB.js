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
    topics: ["Marathon", "Community Garden"]
  }
];

const topicSeed = [
  {
    name: "Marathon",
    user: "Bob Seed",
    hours: 1
  },
  {
    name: "Marathon",
    user: "Jeff Seed",
    hours: 2
  },
  {
    name: "Marathon",
    user: "George Seed",
    hours: 3
  }
];
// debugger;
db.Student.remove({})
  .then(() => db.Student.collection.insertMany(studentSeed))
  .then(data => {
    console.log(data.result.n + " students inserted!");
    // process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Topic.remove({})
  .then(() => db.Topic.collection.insertMany(topicSeed))
  .then(data => {
    console.log(data.result.n + " topics inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
