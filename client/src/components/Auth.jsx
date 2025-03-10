import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Auth = ({ isSignup }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email.includes("@")) {
      setError("Invalid email format");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) return;
  
    setLoading(true);
  
    try {
      const response = await fetch(
       ` http://localhost:8080/api/auth/${isSignup ? "signup" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
  
      const data = await response.json();
      console.log("Response Data:", data); // 🔍 Debugging
  
      if (!response.ok) throw new Error(data.error || "Something went wrong");
  
      localStorage.setItem("token", data.token);
      console.log("Token Stored:", localStorage.getItem("token")); // 🔍 Verify token is stored
      navigate("/dashboard"); // Redirect after login/signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center">{isSignup ? "Sign Up" : "Login"}</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center mt-3">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link to={isSignup ? "/login" : "/signup"} className="text-primary">
            {isSignup ? "Login" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Auth;