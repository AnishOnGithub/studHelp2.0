import React, { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react"; // Icons for input and button
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the corresponding CSS file

interface LoginProps {
  setAuth: (value: boolean) => void; // Prop to update authentication state
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [isLoading, setIsLoading] = useState(false); // State for loading behavior
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation
    setError(""); // Clear any previous errors

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to localStorage for persistent login
        localStorage.setItem("token", data.token);
        setAuth(true); // Update authentication state
        navigate("/"); // Redirect to home page
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <div className={`login-page ${isLoading ? "processing" : ""}`}>
      {/* Logo */}
      <h1 className="app-logo">
        Stud<span className="help-text">Help</span>
      </h1>

      {/* Login Box */}
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please log in to access your account</p>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-group">
            <Mail className="input-icon" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="spin" /> // Spinner for loading state
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Sign-up Link */}
        <p className="signup-text">
          Don’t have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/register")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
