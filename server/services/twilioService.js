const twilio = require("twilio");
require("dotenv").config();

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendReminderSMS = async (phone, eventName, eventDateTime) => {
  try {
    const message = await client.messages.create({
      body: `Reminder: You have registered for "${eventName}" on ${eventDateTime}. Don't miss it!`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    console.log(`📩 SMS sent to ${phone}: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(`❌ Error sending SMS: ${error.message}`);
  }
};

module.exports = sendReminderSMS;
