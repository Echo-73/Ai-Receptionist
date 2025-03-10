import { useState } from "react";

const AddEvent = () => {
  const [eventData, setEventData] = useState({ name: "", dateTime: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");
  
      console.log("Using Token:", token); // Debug token usage
  
      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Ensure "Bearer " is included
        },
        body: JSON.stringify(eventData),
      });
  
      const data = await response.json();
      // console.log("Response Status:", response.status); // Debug status
      console.log("Event API Response:", data); // Debugging
  
      if (!response.ok) throw new Error(data.error || "Failed to add event");
  
      setMessage("Event created successfully!");
      setEventData({ name: "", dateTime: "" }); // Clear form
    } catch (err) {
      console.error("Error:", err);
      setMessage(err.message);
    }
  };  
  

  return (
    <div className="container mt-5">
      <h2>Add Event</h2>
      {message && <p className="text-success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Event Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={eventData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Event Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            className="form-control"
            value={eventData.dateTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
