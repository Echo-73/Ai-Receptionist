const express = require("express");
const Event = require("../models/Event");
const { addEvent } = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Get events for logged-in user
// router.get("/", async (req, res) => {
//     try {
//       const userId = req.query.userId; // Assuming frontend sends userId
//       const events = await Event.find({ userId });
//       res.json(events);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   // Create new event (with userId)
//   router.post("/", async (req, res) => {
//     try {
//       const { userId, name, dateTime } = req.body;
//       const newEvent = new Event({ userId, name, dateTime });
//       await newEvent.save();
//       res.json(newEvent);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
// router.post("/", authMiddleware, async (req, res) => {
//   console.log("Token received:", req.header("Authorization"));

//   try {
//     const { name, dateTime } = req.body;
//     if (!name || !dateTime) {
//       return res.status(400).json({ error: "Please provide all details" });
//     }

//     const newEvent = new Event({
//       userId: req.user.id,
//       name,
//       dateTime,
//     });

//     await newEvent.save();
//     res.status(201).json({ message: "Event created successfully!", event: newEvent });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });



// // Protect route with authMiddleware
// router.post("/", authMiddleware, addEvent);

router.post("/", authMiddleware, async (req, res) => {
  console.log("📥 Received Event Creation Request");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  try {
    const { name, dateTime } = req.body;
    
    // Ensure userId is extracted from the authenticated request
    const userId = req.user ? req.user.id : null; 

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No userId found" });
    }

    if (!name || !dateTime) {
      return res.status(400).json({ error: "Please provide all details" });
    }

    console.log("✅ Request Data Valid, User ID:", userId);

    const newEvent = new Event({
      userId,  // 🔴 Add userId from token
      name,
      dateTime,
    });

    await newEvent.save();
    console.log("🎉 Event Created:", newEvent);

    res.status(201).json({ message: "Event created successfully!", event: newEvent });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});
router.get("/", authMiddleware, async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id }); // Fetch events for the logged-in user
    res.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting event:", error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, dateTime } = req.body;

    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    event.name = name;
    event.dateTime = dateTime;
    await event.save();

    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("❌ Error updating event:", error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});


module.exports = router;