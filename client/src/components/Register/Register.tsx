import React, { useState } from "react";
import { Mail, Lock, Loader2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StarBackground from "../StarsBackground/StarsBackground";
import "./Register.css";

interface RegisterProps {
  setAuth: (authState: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // For error handling
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Input validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    setError(""); // Clear previous error

    try {
      // Send registration data to backend
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show error if registration fails
        setError(data.error || "Registration failed.");
      } else {
        // Save token to localStorage for persistent login
        localStorage.setItem("token", data.token);

        // Update authentication state
        setAuth(true);

        // Redirect to home page
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong during registration. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <div className={`register-page ${isLoading ? "processing" : ""}`}>
      <StarBackground />

      <div className="register-content">
        <div className="logo-container">
          <h1 className="app-logo">
            Stud<span className="help-text">Help</span>
          </h1>
        </div>

        <div className="register-box">
          <h2 className="register-title">Create an Account</h2>
          <p className="register-subtitle">Start exploring study resources</p>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

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

          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button
            className="register-btn"
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="btn-icon spin" />
            ) : (
              <>
                <UserPlus className="btn-icon" /> Sign Up
              </>
            )}
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
