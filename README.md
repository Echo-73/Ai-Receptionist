# AI Receptionist

## 📌 Project Overview
The **AI Receptionist** is a web-based assistant designed to help users manage their events and receive reminders via SMS. It integrates OpenAI's chatbot to answer event-related queries and provides a streamlined dashboard for event management.

## 🚀 Features Implemented
### 🔹 Authentication & User Management
- User registration & login system (Node.js, Express, MongoDB)

### 🔹 Event Management
- Event creation (React Frontend & Node.js Backend)
- Event list with details & SMS status
- MongoDB as a database for event storage

### 🔹 AI Chatbot (OpenAI API)
- Chatbot to answer event-related queries
- Backend API using OpenAI's GPT-4o-mini model
- Frontend chat interface with user & bot messages

### 🔹 SMS Notifications (Twilio Integration)
- Scheduled SMS reminders for upcoming events

## 📂 Project Structure
```
📁 ai_receptionist/
├── 📁 client/           # React Frontend
│   ├── 📄 src/
│   │   ├── 📄 App.js
│   │   ├── 📄 components/
│   │   │   ├── 📄 Chatbot.jsx
│   │   │   ├── 📄 EventList.jsx
│   │   │   ├── 📄 EventForm.jsx
│   ├── 📄 package.json
│
├── 📁 server/           # Node.js Backend
│   ├── 📄 config/
│   │   ├── 📄 db.js    # MongoDB Connection
│   ├── 📄 routes/
│   │   ├── 📄 authRoutes.js
│   │   ├── 📄 eventRoutes.js
│   │   ├── 📄 participantRoutes.js
│   ├── 📄 services/
│   │   ├── 📄 cronJobs.js  # SMS Scheduler
│   ├── 📄 server.js
│   ├── 📄 package.json
│
└── 📄 README.md
```

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT
- **AI Chatbot:** OpenAI API
- **SMS Reminders:** Twilio API

## 📖 Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/ai-receptionist.git
cd ai-receptionist
```

### 2️⃣ Backend Setup
```sh
cd server
npm install
```
- Create a `.env` file and add the following variables:
```env
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-api-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```
- Start the backend:
```sh
node server.js
```

### 3️⃣ Frontend Setup
```sh
cd client
npm install
npm run dev
```

## 📌 Future Scope
🔜 Upcoming features to be added:
- **Dashboard Enhancements**: Advanced analytics & event statistics.
- **Email Reminders**: Integrate email reminders using Nodemailer.
- **Event Search & Filters**: Users can search & filter events.
- **Voice Assistant Integration**: AI-driven voice command support.

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repository, make your changes, and submit a pull request.


---

💡 **Developed by [Bellapukonda Divija, Kovvuri Lakshmi, Paladugu Sindhu, Padamata Bhavya Deekshitha]** | ✉️ Contact: divijabellapukonda@gmail.com

