import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { text: input, user: "user" }]);

    try {
      const response = await axios.post("http://localhost:8080/api/chat", {
        message: input,
      });

      const botReply = response.data.response || "No valid response.";
      setMessages((prev) => [...prev, { text: botReply, user: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "Error: AI response failed.", user: "bot" }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div>
      <h1>AI Chatbot</h1>
      <div style={{ border: "1px solid gray", padding: "10px", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.user === "user" ? "right" : "left" }}>
            <strong>{msg.user === "user" ? "You: " : "Bot: "}</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
};

export default Chatbot;
