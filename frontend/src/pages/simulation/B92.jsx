import { useB92Fn } from "../../../utility/useB92Fn";
import { useNavigate } from "react-router-dom";
import "../../styles/B92.css";
export default function B92Simulation() {
  const navigate = useNavigate();
  const {
    result,
    loading,
    bits,
    noise,
    eve,
    setNoise,
    setBits,
    setEve,
    handleRun,
    handleReset,
  } = useB92Fn();

  return (
    <div className="w-full h-full py-10">
      <div className="simulation-panel">
        <div className = "flex justify-center"><h3 className = "font-bold text-[#0392ba] text-4xl align-center mb-10">B92 Protocol</h3></div>
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
                min="1000"
                max="50000"
                step="1000"
                value={bits}
                onChange={(e) => setBits(parseInt(e.target.value))}
                className="slider"
              />
              <div className="input-numeric">
                <input
                  type="number"
                  min="1000"
                  max="50000"
                  step="1000"
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
                  <p className="result-value">
                    {(result.conclusive_rate * 100).toFixed(2)}%
                  </p>
                  <p className="result-description">Efficiency of detection</p>
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
                  <p className="result-value">
                    {(result.qber * 100).toFixed(2)}%
                  </p>
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
                      result.qber < 0.05
                        ? "#00ff88"
                        : (result.qber === 0.05 || result.qber > 0.05) &&
                            result.qber < 0.11
                          ? "#ffaa00"
                          : "#ff0055",
                  }}
                ></div>
              </div>
              <p className="indicator-text">
                {result.qber < 0.05
                  ? 
                    "Secure Communication"
                  : (result.qber === 0.05 || result.qber > 0.05) &&
                            result.qber < 0.11
                    ? "Channel Compromised"
                    : "Critical Alert"}
              </p>
            </div>
          </div>
        )}
        <div className="nav">
          <button className="nav-btn" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
