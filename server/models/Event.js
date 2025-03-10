const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 Store which user created the event
  name: { type: String, required: true },
  dateTime: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Participant" }],
});

module.exports = mongoose.model("Event", eventSchema);
