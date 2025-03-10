import React, { useEffect, useState } from "react";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editEvent, setEditEvent] = useState(null); // Store event to edit
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDateTime, setUpdatedDateTime] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents(events.filter((event) => event._id !== eventId));
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditModal = (event) => {
    setEditEvent(event);
    setUpdatedName(event.name);
    setUpdatedDateTime(event.dateTime);
  };

  const updateEvent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/events/${editEvent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: updatedName, dateTime: updatedDateTime }),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      setEvents(events.map((event) => (event._id === editEvent._id ? { ...event, name: updatedName, dateTime: updatedDateTime } : event)));
      setEditEvent(null); // Close the edit modal
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Event List</h1>
      <p>View & manage your scheduled events.</p>

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && events.length === 0 && <p>No events found.</p>}

      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <strong>{event.name}</strong> - {new Date(event.dateTime).toLocaleString()}
            <button onClick={() => deleteEvent(event._id)} style={{ marginLeft: "10px", color: "red" }}>
              Delete
            </button>
            <button onClick={() => openEditModal(event)} style={{ marginLeft: "10px", color: "blue" }}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      {editEvent && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "20px", background: "white", border: "1px solid black" }}>
          <h2>Edit Event</h2>
          <label>Name:</label>
          <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <br />
          <label>Date & Time:</label>
          <input type="datetime-local" value={updatedDateTime} onChange={(e) => setUpdatedDateTime(e.target.value)} />
          <br />
          <button onClick={updateEvent} style={{ marginRight: "10px", color: "green" }}>
            Save
          </button>
          <button onClick={() => setEditEvent(null)} style={{ color: "red" }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EventList;
