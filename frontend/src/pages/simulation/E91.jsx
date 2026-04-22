import { useE91Fn } from "../../../utility/useE91Fn";
import { useNavigate } from "react-router-dom";
import "../../styles/E91.css";
export default function E91Simulation() {
  const navigate = useNavigate();
  const {
    totalPairs,
    setTotalPairs,
    noiseProb,
    setNoiseProb,
    eveProb,
    setEveProb,
    bellRatio,
    setBellRatio,
    eveMode,
    setEveMode,
    handleRun,
    loading,
    handleReset,
    result,
  } = useE91Fn();
  return (
    <div className="w-screen h-screen py-5 relative">
      <div className="simulation-panel">
        <div className="flex justify-center">
          <h3 className="font-bold text-[#0392ba] text-4xl align-center mb-10">
            E91 Protocol
          </h3>
        </div>
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
                  onChange={(e) =>
                    setTotalPairs(parseInt(e.target.value || 50, 10))
                  }
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
                  onChange={(e) =>
                    setNoiseProb(parseFloat(e.target.value) || 0)
                  }
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
                  onChange={(e) =>
                    setBellRatio(parseFloat(e.target.value) || 0.2)
                  }
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
                    {result.S > 2
                      ? "✓ Bell violation detected"
                      : "✗ No violation"}
                  </p>
                </div>
              </div>

              <div className="result-card">
                <div className="result-icon">🔐</div>
                <div className="result-content">
                  <p className="result-label">QBER</p>
                  <p className="result-value">
                    {(result.QBER * 100).toFixed(2)}%
                  </p>
                  <p className="result-description">
                    {result.QBER < 0.05
                      ? "✓ Secure channel"
                      : "✗ Potential eavesdropping"}
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
                    {result.eve_mode === "both"
                      ? "Key + Bell attacks"
                      : result.eve_mode === "key"
                        ? "Key generation attacks"
                        : "Bell test attacks"}
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
                      result.QBER < 0.05
                        ? "#00ff88"
                        : (result.qber === 0.05 || result.qber > 0.05) &&
                            result.qber < 0.11
                          ? "#ffaa00"
                          : "#ff0055",
                  }}
                ></div>
              </div>
              <p className="indicator-text">
                {result.S > 2 && result.QBER < 0.05
                  ? "✓ Secure key established"
                  : result.S > 2 &&
                      (result.qber === 0.05 || result.qber > 0.05) &&
                      result.qber < 0.11
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
        <div className="nav">
          <button className="nav-btn" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
