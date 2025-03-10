import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    
    <Router>
        <Navbar />
      <Routes>
        {/* Redirect root ("/") to Login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Pages (Only accessible when logged in) */}
        <Route element={<ProtectedRoute />}>
       
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
