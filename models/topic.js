const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  name: { type: String, required: true },
  user: { type: String, required: true },
  hours: { type: Number, required: true }
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
