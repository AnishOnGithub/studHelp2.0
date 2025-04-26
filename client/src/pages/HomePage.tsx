import React from 'react';
import StarsBackground from '../components/StarsBackground/StarsBackground';
import { FileText, Bookmark, Book } from 'lucide-react'; // Updated icons
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <StarsBackground />

      {/* Welcome Section */}
      <div className="content">
        <h1 className="title">
          <span className="welcome-white">Welcome to </span> 
          <span className="welcome-gradient">studHelp</span>
        </h1>
        <p className="subtitle">
          Your personal study companion. Access past exams, important topics, and comprehensive notes to excel in your studies.
        </p>
      </div>

      {/* Study Resources Section */}
      <div className="resources-container">
        <div className="card">
          <div className="icon-circle">
            <FileText className="resource-icon" />
          </div>
          <h2 className="card-title">Previous Question Papers</h2>
          <p className="card-text">Access past exam papers to practice and prepare for your exams.</p>
          <button className="resource-btn">View Papers</button>
        </div>
        
        <div className="card">
          <div className="icon-circle">
            <Bookmark className="resource-icon" />
          </div>
          <h2 className="card-title">Important Topics</h2>
          <p className="card-text">Focus on key topics and track your progress as you study.</p>
          <button className="resource-btn">View Topics</button>
        </div>
        
        <div className="card">
          <div className="icon-circle">
            <Book className="resource-icon" />
          </div>
          <h2 className="card-title">Study Notes</h2>
          <p className="card-text">Comprehensive notes to help you understand complex concepts.</p>
          <button className="resource-btn">View Notes</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
