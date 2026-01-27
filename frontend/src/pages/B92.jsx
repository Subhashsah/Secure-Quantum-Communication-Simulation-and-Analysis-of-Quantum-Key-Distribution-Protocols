import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { runB92 } from "../api/b92";
import "../styles/B92.css";

export default function B92() {
  const navigate = useNavigate();
  const [bits, setBits] = useState(100);
  const [noise, setNoise] = useState(0.0);
  const [eve, setEve] = useState(0.0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    try {
      const data = await runB92({ bits, noise, eve });
      setResult(data);
    } catch (error) {
      console.error("Simulation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBits(100);
    setNoise(0.0);
    setEve(0.0);
    setResult(null);
  };

  return (
    <div className="b92-container">
      {/* Background Elements */}
      <div className="starfield-bg">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star-bg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="b92-header">
        <button className="back-button" onClick={() => navigate("/")}>
          <span>←</span> Back
        </button>
        <div className="header-content">
          <h1 className="b92-title">B92 Quantum Key Distribution Protocol</h1>
          <p className="b92-subtitle">
            Two-state quantum cryptography with POVM measurements
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="b92-content">
        <div className="simulation-panel">
          {/* Control Section */}
          <div className="control-section">
            <h2 className="section-title">Simulation Parameters</h2>

            {/* Input Controls */}
            <div className="controls-grid">
              {/* Number of Bits */}
              <div className="control-group">
                <label htmlFor="bits" className="control-label">
                  <span className="label-text">Number of Signals</span>
                  <span className="label-value">{bits}</span>
                </label>
                <input
                  id="bits"
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={bits}
                  onChange={(e) => setBits(parseInt(e.target.value))}
                  className="slider"
                />
                <div className="input-numeric">
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={bits}
                    onChange={(e) => setBits(parseInt(e.target.value) || 10)}
                    className="numeric-input"
                  />
                </div>
              </div>

              {/* Noise Level */}
              <div className="control-group">
                <label htmlFor="noise" className="control-label">
                  <span className="label-text">Channel Noise</span>
                  <span className="label-value">{noise.toFixed(2)}</span>
                </label>
                <input
                  id="noise"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={noise}
                  onChange={(e) => setNoise(parseFloat(e.target.value))}
                  className="slider"
                />
                <div className="input-numeric">
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={noise}
                    onChange={(e) => setNoise(parseFloat(e.target.value) || 0)}
                    className="numeric-input"
                  />
                </div>
              </div>

              {/* Eavesdropper Probability */}
              <div className="control-group">
                <label htmlFor="eve" className="control-label">
                  <span className="label-text">Eve Attack Probability</span>
                  <span className="label-value">{eve.toFixed(2)}</span>
                </label>
                <input
                  id="eve"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={eve}
                  onChange={(e) => setEve(parseFloat(e.target.value))}
                  className="slider"
                />
                <div className="input-numeric">
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={eve}
                    onChange={(e) => setEve(parseFloat(e.target.value) || 0)}
                    className="numeric-input"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="button-group">
              <button
                onClick={handleRun}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Running..." : "Run Simulation"}
              </button>
              <button onClick={handleReset} className="btn btn-secondary">
                Reset
              </button>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="results-section">
              <h2 className="section-title">Simulation Results</h2>

              <div className="results-grid">
                <div className="result-card">
                  <div className="result-icon">📡</div>
                  <div className="result-content">
                    <p className="result-label">Total Signals Sent</p>
                    <p className="result-value">{result.total_signals}</p>
                    <p className="result-description">
                      Quantum states transmitted
                    </p>
                  </div>
                </div>

                <div className="result-card">
                  <div className="result-icon">✓</div>
                  <div className="result-content">
                    <p className="result-label">Conclusive Detections</p>
                    <p className="result-value">{result.conclusive_detections}</p>
                    <p className="result-description">
                      Successful POVM measurements
                    </p>
                  </div>
                </div>

                <div className="result-card">
                  <div className="result-icon">📊</div>
                  <div className="result-content">
                    <p className="result-label">Conclusive Rate</p>
                    <p className="result-value">{(result.conclusive_rate * 100).toFixed(2)}%</p>
                    <p className="result-description">
                      Efficiency of detection
                    </p>
                  </div>
                </div>

                <div className="result-card">
                  <div className="result-icon">⚠️</div>
                  <div className="result-content">
                    <p className="result-label">Errors Detected</p>
                    <p className="result-value">{result.errors}</p>
                    <p className="result-description">
                      Inconsistencies in transmission
                    </p>
                  </div>
                </div>

                <div className="result-card highlight">
                  <div className="result-icon">🔐</div>
                  <div className="result-content">
                    <p className="result-label">QBER (Quantum Bit Error Rate)</p>
                    <p className="result-value">{(result.qber * 100).toFixed(2)}%</p>
                    <p className="result-description">
                      {result.qber < 0.11
                        ? "✓ Secure - No eavesdropping detected"
                        : "✗ Alert - Possible eavesdropping"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="security-indicator">
                <div className="indicator-bar">
                  <div
                    className="indicator-fill"
                    style={{
                      width: `${Math.max(0, Math.min(100, (0.25 - result.qber) * 400))}%`,
                      backgroundColor:
                        result.qber < 0.11
                          ? "#00ff88"
                          : result.qber < 0.15
                          ? "#ffaa00"
                          : "#ff0055",
                    }}
                  ></div>
                </div>
                <p className="indicator-text">
                  {result.qber < 0.11
                    ? "Channel is Secure"
                    : result.qber < 0.15
                    ? "Channel Compromised"
                    : "Critical Alert"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Information Panel */}
        <div className="info-panel">
          <div className="info-card">
            <h3 className="info-title">About B92</h3>
            <p className="info-text">
              The B92 protocol is a simplified quantum key distribution method that uses only
              two non-orthogonal quantum states instead of four. It was proposed by Charles
              Bennett in 1992 as a more efficient alternative to BB84.
            </p>
          </div>

          <div className="info-card">
            <h3 className="info-title">How It Works</h3>
            <ul className="info-list">
              <li>Alice encodes bits using |H⟩ (0) or |+⟩ (1)</li>
              <li>Bob performs POVM measurements with |V⟩ or |−⟩</li>
              <li>Only conclusive results are kept</li>
              <li>No basis reconciliation needed</li>
              <li>QBER analysis for security verification</li>
            </ul>
          </div>

          <div className="info-card">
            <h3 className="info-title">Key Features</h3>
            <dl className="info-definitions">
              <dt>Two-State</dt>
              <dd>Uses only 2 quantum states vs 4 in BB84</dd>
              <dt>POVM</dt>
              <dd>Positive Operator-Valued Measure detection</dd>
              <dt>Efficiency</dt>
              <dd>~50% conclusive detection rate theoretically</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
