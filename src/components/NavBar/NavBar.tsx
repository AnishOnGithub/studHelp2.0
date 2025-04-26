import React, { useState, useEffect } from "react";
import { BookOpen, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

type NavBarProps = {
  onLogout: () => void; // Logout function passed from App
};

const NavBar: React.FC<NavBarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  // Handle scrolling behavior for Navbar visibility
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setHidden(true); // Navbar hides when scrolling down
    } else {
      setHidden(false); // Navbar reappears when scrolling up
    }

    setLastScrollY(currentScrollY);
  };

  // Handle user logout
  const handleLogout = () => {
    onLogout(); // Updates authentication state in App
    navigate("/login"); // Redirect user to login page
  };

  useEffect(() => {
    // Add scroll event listener on mount
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${hidden ? "navbar-hidden" : ""}`}>
      <div className="navbar-container">
        {/* User Avatar */}
        <div className="user-avatar">
          <div className="avatar-circle">U</div>
        </div>

        {/* Logo */}
        <div className="navbar-logo-container" onClick={() => navigate("/")}>
          <BookOpen className="navbar-icon" />
          <span className="navbar-title">StudHelp</span>
        </div>

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut className="logout-icon" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
