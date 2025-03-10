const cron = require("node-cron");
const Event = require("../models/Event");
const Participant = require("../models/Participant");
const sendReminderSMS = require("./twilioService");

const scheduleReminders = () => {
  // Run this job every day at 9 AM
  cron.schedule("0 9 * * *", async () => {
    console.log("⏰ Running scheduled SMS reminders...");

    try {
      // Get events happening in the next 24 hours
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);

      const events = await Event.find({
        dateTime: { $gte: now, $lte: tomorrow },
      });

      for (const event of events) {
        const participants = await Participant.find({ event: event._id });

        for (const participant of participants) {
          await sendReminderSMS(
            participant.phone,
            event.name,
            event.dateTime.toISOString()
          );
          console.log(`📩 Reminder sent to ${participant.name}`);
        }
      }
    } catch (error) {
      console.error("❌ Error in scheduled reminders:", error);
    }
  });
};

module.exports = scheduleReminders;
