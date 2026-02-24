import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";

export default function About() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the about.txt content
    fetch("/about.txt")
      .then((response) => response.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading about.txt:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="about-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="about-container">
      {/* Background Elements */}
      <div className="about-starfield">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="about-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="about-nav">
        <button className="nav-back-button" onClick={() => navigate("/")}>
          <span>←</span> Home
        </button>
        <h2 className="nav-title">About This Project</h2>
        
        {/* Protocol Buttons */}
        <div className="protocol-nav-section">
          <button 
            className="protocol-link-btn" 
            onClick={() => navigate("/protocol/BB84")}
          >
            BB84
          </button>
          <button 
            className="protocol-link-btn" 
            onClick={() => navigate("/protocol/B92")}
          >
            B92
          </button>
          <button 
            className="protocol-link-btn" 
            onClick={() => navigate("/protocol/E91")}
          >
            E91
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="about-main">
        <article className="about-article fade-in">
          <pre className="about-content">{content}</pre>

          {/* Footer */}
          <footer className="article-footer">
            <div className="footer-divider"></div>
            <p className="footer-text">
              Simulation and Analysis of Quantum Key Distribution Protocols
            </p>
            <button className="footer-button" onClick={() => navigate("/")}>
              Explore Simulations →
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}
