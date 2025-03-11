const Event = require("../models/Event");

const addEvent = async (req, res) => {
  try {
    const { name, dateTime } = req.body;
    const userId = req.user.id; // Get user ID from token

    if (!name || !dateTime) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEvent = new Event({ userId, name, dateTime });
    await newEvent.save();

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ error: "Server error. Try again later." });
  }
};

module.exports = { addEvent };
