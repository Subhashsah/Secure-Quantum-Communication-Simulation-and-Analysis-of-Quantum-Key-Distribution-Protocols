import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { runE91 } from "../api/e91";
import "../styles/E91.css";

export default function E91() {
  const navigate = useNavigate();
  const [totalPairs, setTotalPairs] = useState(1000);
  const [noiseProb, setNoiseProb] = useState(0.0);
  const [eveProb, setEveProb] = useState(0.0);
  const [bellRatio, setBellRatio] = useState(0.2);
  const [eveMode, setEveMode] = useState("both");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    try {
      const data = await runE91({
        total_pairs: totalPairs,
        noise_prob: noiseProb,
        eve_prob: eveProb,
        bell_ratio: bellRatio,
        eve_mode: eveMode,
      });
      setResult(data);
    } catch (error) {
      console.error("Simulation error:", error);
      alert("Error running simulation: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTotalPairs(1000);
    setNoiseProb(0.0);
    setEveProb(0.0);
    setBellRatio(0.2);
    setEveMode("both");
    setResult(null);
  };

  return (
    <div className="e91-container">
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

      <header className="e91-header">
        <button className="back-button" onClick={() => navigate("/")}>
          <span>←</span> Back
        </button>
        <div className="header-content">
          <h1 className="e91-title">E91 Quantum Key Distribution Protocol</h1>
          <p className="e91-subtitle">
            Entanglement-based QKD with CHSH Bell test
          </p>
        </div>
      </header>

      <div className="e91-content">
        <div className="simulation-panel">
          <div className="control-section">
            <h2 className="section-title">Simulation Parameters</h2>
            <div className="controls-grid">
              <div className="control-group">
                <label htmlFor="pairs" className="control-label">
                  <span className="label-text">Total Pairs</span>
                  <span className="label-value">{totalPairs}</span>
                </label>
                <input
                  id="pairs"
                  type="range"
                  min="50"
                  max="20000"
                  step="50"
                  value={totalPairs}
                  onChange={(e) => setTotalPairs(parseInt(e.target.value, 10))}
                  className="slider"
                />
                <div className="input-numeric">
                  <input
                    type="number"
                    min="50"
                    max="20000"
                    step="50"
                    value={totalPairs}
                    onChange={(e) => setTotalPairs(parseInt(e.target.value || 50, 10))}
                    className="numeric-input"
                  />
                </div>
              </div>

              <div className="control-group">
                <label htmlFor="noise" className="control-label">
                  <span className="label-text">Noise Probability</span>
                  <span className="label-value">{noiseProb.toFixed(2)}</span>
                </label>
                <input
                  id="noise"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={noiseProb}
                  onChange={(e) => setNoiseProb(parseFloat(e.target.value))}
                  className="slider"
                />
                <div className="input-numeric">
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={noiseProb}
                    onChange={(e) => setNoiseProb(parseFloat(e.target.value) || 0)}
                    className="numeric-input"
                  />
                </div>
              </div>

              <div className="control-group">
                <label htmlFor="eve" className="control-label">
                  <span className="label-text">Eve Probability</span>
                  <span className="label-value">{eveProb.toFixed(2)}</span>
                </label>
                <input
                  id="eve"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={eveProb}
                  onChange={(e) => setEveProb(parseFloat(e.target.value))}
                  className="slider"
                />
                <div className="input-numeric">
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={eveProb}
                    onChange={(e) => setEveProb(parseFloat(e.target.value) || 0)}
                    className="numeric-input"
                  />
                </div>
              </div>

              <div className="control-group">
                <label htmlFor="bell" className="control-label">
                  <span className="label-text">Bell Test Ratio</span>
                  <span className="label-value">{bellRatio.toFixed(2)}</span>
                </label>
                <input
                  id="bell"
                  type="range"
                  min="0.05"
                  max="0.95"
                  step="0.01"
                  value={bellRatio}
                  onChange={(e) => setBellRatio(parseFloat(e.target.value))}
                  className="slider"
                />
                <div className="input-numeric">
                  <input
                    type="number"
                    min="0.05"
                    max="0.95"
                    step="0.01"
                    value={bellRatio}
                    onChange={(e) => setBellRatio(parseFloat(e.target.value) || 0.2)}
                    className="numeric-input"
                  />
                </div>
              </div>

              <div className="control-group">
                <label htmlFor="eveMode" className="control-label">
                  <span className="label-text">Eve Attack Mode</span>
                  <span className="label-value">{eveMode}</span>
                </label>
                <select
                  id="eveMode"
                  value={eveMode}
                  onChange={(e) => setEveMode(e.target.value)}
                  className="dropdown-select"
                >
                  
                  <option value="none">None</option>
                  <option value="both">Both (Key + Bell)</option>
                  <option value="key">Key Generation Only</option>
                  <option value="bell">Bell Test Only</option>
                </select>
              </div>
            </div>

            <div className="button-group">
              <button onClick={handleRun} disabled={loading} className="btn btn-primary">
                {loading ? "Running..." : "Run Simulation"}
              </button>
              <button onClick={handleReset} className="btn btn-secondary">
                Reset
              </button>
            </div>
          </div>

          {result && (
            <div className="results-section">
              <h2 className="section-title">Simulation Results</h2>
              <div className="results-grid">
                <div className="result-card">
                  <div className="result-icon">📡</div>
                  <div className="result-content">
                    <p className="result-label">CHSH S Value</p>
                    <p className="result-value">{result.S?.toFixed(3)}</p>
                    <p className="result-description">
                      {result.S > 2 ? "✓ Bell violation detected" : "✗ No violation"}
                    </p>
                  </div>
                </div>

                <div className="result-card">
                  <div className="result-icon">🔐</div>
                  <div className="result-content">
                    <p className="result-label">QBER</p>
                    <p className="result-value">{(result.QBER * 100).toFixed(2)}%</p>
                    <p className="result-description">
                      {result.QBER < 0.11 ? "✓ Secure channel" : "✗ Potential eavesdropping"}
                    </p>
                  </div>
                </div>

                <div className="result-card">
                  <div className="result-icon">⚠️</div>
                  <div className="result-content">
                    <p className="result-label">Bit Errors</p>
                    <p className="result-value">{result.errors}</p>
                    <p className="result-description">Mismatches detected</p>
                  </div>
                </div>

                <div className="result-card">
                  <div className="result-icon">🕵️</div>
                  <div className="result-content">
                    <p className="result-label">Eve Mode</p>
                    <p className="result-value">{result.eve_mode}</p>
                    <p className="result-description">
                      {result.eve_mode === "both" ? "Key + Bell attacks" : result.eve_mode === "key" ? "Key generation attacks" : "Bell test attacks"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="security-indicator">
                <div className="indicator-bar">
                  <div
                    className="indicator-fill"
                    style={{
                      width: `${Math.max(0, Math.min(100, (0.25 - result.QBER) * 400))}%`,
                      backgroundColor:
                        result.QBER < 0.11
                          ? "#00ff88"
                          : result.QBER < 0.15
                          ? "#ffaa00"
                          : "#ff0055",
                    }}
                  ></div>
                </div>
                <p className="indicator-text">
                  {result.S > 2 && result.QBER < 0.11
                    ? "✓ Secure key established"
                    : result.S >2 && result.QBER < 0.15
                    ? "Channel Compromised"
                    : result.S <= 2
                    ? "✗ Abort: No Bell violation"
                    : result.QBER > 0.11
                    ? "✗ Abort: QBER too high"
                    : "Status unclear"}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="info-panel">
          <div className="info-card">
            <h3 className="info-title">About E91</h3>
            <p className="info-text">
              The E91 protocol leverages entangled photon pairs and Bell inequality tests to ensure
              secure key distribution. A high CHSH S value greater then 2 confirms entanglement and helps detect
              eavesdropping.
            </p>
          </div>

          <div className="info-card">
            <h3 className="info-title">Parameters</h3>
            <dl className="info-definitions">
              <dt>Total Pairs</dt>
              <dd>Number of entangled pairs distributed.</dd>
              <dt>Noise Probability</dt>
              <dd>Depolarizing noise level in the channel.</dd>
              <dt>Eve Probability</dt>
              <dd>Chance of intercept-resend attack.</dd>
              <dt>Bell Ratio</dt>
              <dd>Fraction of pairs used for CHSH Bell test.</dd>
              <dt>Eve Attack Mode</dt>
              <dd>
                <strong>Both:</strong> Eve attacks key generation and Bell test rounds.<br/>
                <strong>Key:</strong> Eve attacks only key-generation rounds.<br/>
                <strong>Bell:</strong> Eve attacks only Bell-test rounds.
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
