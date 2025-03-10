const Participant = require("../models/Participant");
const Event = require("../models/Event");

exports.addParticipant = async (req, res) => {
  try {
    const { name, phone, eventId } = req.body;

    const participant = new Participant({ name, phone, event: eventId });
    await participant.save();

    await Event.findByIdAndUpdate(eventId, {
      $push: { participants: participant._id },
    });

    res.status(201).json(participant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().populate("event");
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
