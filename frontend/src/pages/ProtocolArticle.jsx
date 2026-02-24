import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProtocolArticle.css";

export default function ProtocolArticle({ protocol }) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const protocolConfig = {
    BB84: {
      file: "/bb84-protocol.txt",
      color: "#64c8ff",
      label: "BB84 Protocol",
    },
    B92: {
      file: "/b92-protocol.txt",
      color: "#00d4ff",
      label: "B92 Protocol",
    },
    E91: {
      file: "/e91-protocol.txt",
      color: "#64ff64",
      label: "E91 Protocol",
    },
  };

  const config = protocolConfig[protocol];

  useEffect(() => {
    fetch(config.file)
      .then((response) => response.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading protocol file:", error);
        setLoading(false);
      });
  }, [protocol, config.file]);

  if (loading) {
    return (
      <div className="protocol-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading {config.label}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="protocol-container">
      {/* Background Elements */}
      <div className="protocol-starfield">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="protocol-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="protocol-nav">
        <button className="nav-back-button" onClick={() => navigate("/about")}>
          <span>←</span> Back
        </button>
        <h2 className="nav-title">{config.label}</h2>
        
        {/* Protocol Buttons */}
        <div className="protocol-buttons">
          <button
            className={`protocol-nav-btn ${protocol === "BB84" ? "active" : ""}`}
            onClick={() => navigate("/protocol/BB84")}
            style={{
              borderColor: protocol === "BB84" ? "#64c8ff" : "rgba(100, 200, 255, 0.3)",
            }}
          >
            BB84
          </button>
          <button
            className={`protocol-nav-btn ${protocol === "B92" ? "active" : ""}`}
            onClick={() => navigate("/protocol/B92")}
            style={{
              borderColor: protocol === "B92" ? "#00d4ff" : "rgba(0, 212, 255, 0.3)",
            }}
          >
            B92
          </button>
          <button
            className={`protocol-nav-btn ${protocol === "E91" ? "active" : ""}`}
            onClick={() => navigate("/protocol/E91")}
            style={{
              borderColor: protocol === "E91" ? "#64ff64" : "rgba(100, 255, 100, 0.3)",
            }}
          >
            E91
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="protocol-main">
        <article className="protocol-article fade-in">
          <pre className="protocol-content">{content}</pre>

          {/* Footer */}
          <footer className="article-footer">
            <div className="footer-divider"></div>
            <p className="footer-text">
              {config.label} - Quantum Key Distribution Protocol
            </p>
            <button className="footer-button" onClick={() => navigate("/about")}>
              ← Back to About
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}
