const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const scheduleReminders = require("./services/cronJobs");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai")

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend (adjust if needed)
  methods: ["GET", "POST"], // Allow required methods
  allowedHeaders: ["Content-Type"]
}));
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// Start Scheduled SMS Job
scheduleReminders();

// **Auth Routes**
app.use("/api/auth", require("./routes/authRoutes"));

// Event & Participant Routes
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/participants", require("./routes/participantRoutes"));

app.get("/", (req, res) => {
  res.send("AI Receptionist Backend is Running");
});
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "AI response failed." });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
