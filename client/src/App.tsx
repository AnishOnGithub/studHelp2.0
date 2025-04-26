import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import StarBackground from "./components/StarsBackground/StarsBackground";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token on page load to persist authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // If token exists, user is authenticated
    }
  }, []);

  // Logout function to reset authentication state and clear token
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsAuthenticated(false); // Update auth state
  };

  return (
    <div className="App">
      <StarBackground />
      <div className={`background-overlay ${!isAuthenticated ? "blur-active" : ""}`}></div>

      {/* Pass handleLogout to Navbar */}
      {isAuthenticated && <NavBar onLogout={handleLogout} />}

      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login setAuth={setIsAuthenticated} />
          }
        />
        {/* Register Route */}
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Register setAuth={setIsAuthenticated} />
          }
        />
        {/* Home Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
