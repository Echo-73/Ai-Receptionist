const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");
const Event = require("../models/Event");
const sendReminderSMS = require("../services/twilioService");

// // Get participants for a specific event
// router.get("/event/:eventId", async (req, res) => {
//     try {
//       const { eventId } = req.params;
//       const participants = await Participant.find({ event: eventId });
//       res.status(200).json(participants);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching participants" });
//     }
//   });

// // Add a Participant & Send SMS Reminder
// router.post("/", async (req, res) => {
//   try {
//     const { name, phone, eventId } = req.body;

//     // Validate event existence
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ error: "Event not found" });
//     }

//     // Create participant
//     const participant = new Participant({ name, phone, event: eventId });
//     await participant.save();

//     // Link participant to event
//     await Event.findByIdAndUpdate(eventId, {
//       $push: { participants: participant._id },
//     });

//     // Send SMS reminder
//     await sendReminderSMS(phone, event.name, event.dateTime);

//     res.status(201).json(participant);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// module.exports = router;

// Add participant (ensure user owns the event)
router.post("/", async (req, res) => {
  try {
    const { userId, eventId, name, phone } = req.body;

    // Check if event belongs to the user
    const event = await Event.findOne({ _id: eventId, userId });
    if (!event) return res.status(403).json({ error: "Unauthorized to add participant to this event." });

    const newParticipant = new Participant({ userId, eventId, name, phone });
    await newParticipant.save();
    res.json(newParticipant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get participants for user's events
router.get("/:eventId", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming frontend sends userId
    const { eventId } = req.params;

    // Check if event belongs to user
    const event = await Event.findOne({ _id: eventId, userId });
    if (!event) return res.status(403).json({ error: "Unauthorized to view participants." });

    const participants = await Participant.find({ eventId });
    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
