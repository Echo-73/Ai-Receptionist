// const mongoose = require("mongoose");

// const ParticipantSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   phone: { type: String, required: true }, // Store phone numbers
//   event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
// });

// module.exports = mongoose.model("Participant", ParticipantSchema);
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 Link to user
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Participant", participantSchema);
