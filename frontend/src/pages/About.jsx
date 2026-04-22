import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";

export default function About() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        animationDelay: `${(i % 6) * 0.5}s`,
      })),
    [],
  );

  const formatLabel = (key) =>
    key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    // Fetch structured about content
    fetch("/about.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch about content");
        }
        return response.json();
      })
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((fetchError) => {
        console.error("Error loading about.json:", fetchError);
        setError("Unable to load about content right now.");
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

  if (error || !content) {
    return (
      <div className="about-container">
        <div className="loading-spinner">
          <p>{error || "No about content found."}</p>
          <button className="footer-button" onClick={() => navigate("/")}>
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="about-container">
      {/* Background Elements */}
      <div className="about-starfield">
        {stars.map((star, i) => (
          <div key={i} className="about-star" style={star} />
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
            onClick={() => navigate("/bb84")}
          >
            BB84
          </button>
          <button
            className="protocol-link-btn"
            onClick={() => navigate("/b92")}
          >
            B92
          </button>
          <button
            className="protocol-link-btn"
            onClick={() => navigate("/e91")}
          >
            E91
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="about-main">
        <article className="about-article fade-in">
          <section className="main-title-section">
            <h1 className="article-main-title">{content.title}</h1>
          </section>

          <section className="content-section">
            <h2 className="section-heading">Abstract</h2>
            <p className="section-paragraph">{content.abstract}</p>
          </section>

          <section className="content-section">
            <h2 className="section-heading">Aim and Objectives</h2>
            <p className="section-paragraph">
              {content.aim_and_objectives?.aim}
            </p>
            <h3 className="subsection-heading">Objectives</h3>
            <ol className="content-list ordered-list">
              {(content.aim_and_objectives?.objectives || []).map(
                (objective) => (
                  <li key={objective}>{objective}</li>
                ),
              )}
            </ol>
          </section>

          <section className="content-section">
            <h2 className="section-heading">Motivation</h2>
            <p className="section-paragraph">{content.motivation}</p>
          </section>

          <section className="content-section">
            <h2 className="section-heading">Methodology</h2>

            <h3 className="subsection-heading">Protocol Selection</h3>
            <p className="section-paragraph">
              {content.methodology?.protocol_selection?.description}
            </p>

            <dl className="content-definitions">
              {Object.entries(
                content.methodology?.protocol_selection?.categories || {},
              ).map(([category, protocols]) => (
                <div className="definition-item" key={category}>
                  <dt className="definition-term">{formatLabel(category)}</dt>
                  <dd className="definition-text">
                    <ul className="content-list">
                      {(protocols || []).map((protocol) => (
                        <li key={protocol}>{protocol}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className="subsection-heading">Simulation Pipeline</h3>
            <ul className="content-list">
              <li>{content.methodology?.quantum_state_simulation}</li>
              <li>{content.methodology?.key_generation_and_sifting}</li>
              <li>{content.methodology?.eavesdropping_analysis}</li>
              <li>{content.methodology?.user_interface_and_visualization}</li>
            </ul>
          </section>

          <section className="content-section">
            <h2 className="section-heading">Results and Discussion</h2>
            <p className="section-paragraph">
              {content.results_and_discussion}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-heading">Conclusion</h2>
            <p className="section-paragraph">{content.conclusion}</p>
          </section>

          <section className="content-section">
            <h2 className="section-heading">Glossary</h2>
            <dl className="content-definitions glossary-definitions">
              {(content.glossary || []).map((item) => (
                <div className="definition-item" key={item.term}>
                  <dt className="definition-term">{item.term}</dt>
                  <dd className="definition-text">{item.definition}</dd>
                </div>
              ))}
            </dl>
          </section>

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
        <div className="max-w-[900px] max-h-[900px] sticky top-8">
          <img
            src={content.image}
            alt="about image"
            className="object-contain max-w-full max-h-full mx-auto"
          />
        </div>
      </main>
    </div>
  );
}
