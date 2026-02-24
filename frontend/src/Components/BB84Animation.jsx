import React, { useState, useEffect } from 'react';
import '../styles/BB84Animation.css';

const BB84Animation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [autoPlay, setAutoPlay] = useState(false);

  // Fixed data for consistent visualization
  const aliceBits = [1, 0, 0, 1, 1, 0, 1, 1];
  const aliceBases = ['+', '×', '×', '+', '+', '+', '×', '×'];
  const bobBases = ['+', '+', '×', '□', '+', '+', '×', '+'];
  const bobResults = [1, 0, 0, 1, 1, 0, 1, 0];
  
  const siftedIndices = [0, 4, 5, 6]; // Positions where bases match
  const siftedKey = [1, 1, 0, 1];

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setTimeout(() => {
      if (currentStep < 5) {
        setCurrentStep((prev) => Math.min(5, prev + 1));
      } else {
        setAutoPlay(false);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentStep, autoPlay]);

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      setAutoPlay(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setAutoPlay(false);
    }
  };

  const resetAnimation = () => {
    setCurrentStep(1);
    setAutoPlay(false);
  };

  const toggleAutoPlay = () => {
    setAutoPlay((prev) => !prev);
  };

  const handleSliderChange = (event) => {
    const value = Number(event.target.value);
    setCurrentStep(value);
    setAutoPlay(false);
  };

  return (
    <div className="bb84-animation-container">
      <div className="animation-header">
        <h2>Working Principle of the BB84 Protocol</h2>
        <p className="animation-subtitle">Interactive step-by-step visualization</p>
      </div>

      {/* Step 1: Random Bit Generation */}
      <div className={`animation-step ${currentStep === 1 ? 'active' : ''}`}>
        <div className="step-title">
          <span className="step-number">1</span>
          <span className="step-name">Random Bit Generation By Subhash</span>
        </div>
        
        <div className="animation-content">
          <p className="step-description">Subhash generates a random sequence of bits to form the secret key.</p>
          
          <div className="bits-display">
            {aliceBits.map((bit, idx) => (
              <div 
                key={idx} 
                className={`bit-box ${currentStep === 1 ? 'animate-appear' : ''}`}
                style={{ animationDelay: currentStep === 1 ? `${idx * 0.2}s` : '0s' }}
              >
                {bit}
              </div>
            ))}
          </div>
          
          <div className="step-info">
            <p>✓ 8 random bits generated: <strong>1 0 0 1 1 0 1 1</strong></p>
            <p>✓ Bits appear one-by-one to emphasize randomness</p>
          </div>
        </div>
      </div>

      {/* Step 2: Random Basis Selection */}
      <div className={`animation-step ${currentStep === 2 ? 'active' : ''}`}>
        <div className="step-title">
          <span className="step-number">2</span>
          <span className="step-name">Random Basis Selection By Subhash</span>
        </div>
        
        <div className="animation-content">
          <p className="step-description">For each bit, Subhash randomly selects a measurement basis (Z-basis or X-basis).</p>
          
          <div className="basis-pairing">
            {aliceBits.map((bit, idx) => (
              <div key={idx} className={`bit-basis-pair ${currentStep === 2 ? 'animate-slide' : ''}`}
                   style={{ animationDelay: currentStep === 2 ? `${idx * 0.2}s` : '0s' }}>
                <div className="bit-value">{bit}</div>
                <div className="basis-icon" title={aliceBases[idx] === '+' ? 'Z-basis (Rectilinear)' : 'X-basis (Diagonal)'}>
                  {aliceBases[idx]}
                </div>
              </div>
            ))}
          </div>
          
          <div className="basis-legend">
            <div className="legend-item">
              <span className="basis-symbol z-basis">+</span>
              <span>Z-basis (Rectilinear) - measures |0⟩ or |1⟩</span>
            </div>
            <div className="legend-item">
              <span className="basis-symbol x-basis">×</span>
              <span>X-basis (Diagonal) - measures |+⟩ or |−⟩</span>
            </div>
          </div>
          
          <div className="step-info">
            <p>✓ Each bit paired with randomly chosen basis</p>
            <p>✓ Subhash keeps this information SECRET</p>
          </div>
        </div>
      </div>

      {/* Step 3: Quantum State Encoding and Transmission */}
      <div className={`animation-step ${currentStep === 3 ? 'active' : ''}`}>
        <div className="step-title">
          <span className="step-number">3</span>
          <span className="step-name">Quantum State Encoding and Transmission</span>
        </div>
        
        <div className="animation-content">
          <p className="step-description">Subhash encodes each bit into a polarized photon and sends it through the quantum channel.</p>
          
          <div className="quantum-channel-visual">
            <div className="alice-section">
              <div className="actor-label">Subhash</div>
              <div className="photons-source">
                {aliceBits.map((bit, idx) => (
                  <div 
                    key={idx}
                    className={`photon ${currentStep === 3 ? 'transmit-photon' : ''}`}
                    style={{ animationDelay: currentStep === 3 ? `${idx * 0.3}s` : '0s' }}
                    title={`Bit: ${bit}, Basis: ${aliceBases[idx]}`}
                  >
                    ◉
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`quantum-channel ${currentStep === 3 ? 'active' : ''}`}>
              <div className="channel-label">Quantum Channel</div>
              <div className="wave-animation"></div>
            </div>
            
            <div className="bob-section">
              <div className="actor-label">David</div>
              <div className="photons-destination">
                {aliceBits.map((bit, idx) => (
                  <div 
                    key={idx}
                    className={`photon-received ${currentStep === 3 ? 'receive-photon' : ''}`}
                    style={{ animationDelay: currentStep === 3 ? `${idx * 0.3}s` : '0s' }}
                  >
                    ◉
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="step-info">
            <p>✓ Photons travel through quantum channel</p>
            <p>✓ Quantum states preserve Subhash's encoding</p>
            <p>✓ No eavesdropper can copy the state without disturbing it</p>
          </div>
        </div>
      </div>

      {/* Step 4: Measurement by David */}
      <div className={`animation-step ${currentStep === 4 ? 'active' : ''}`}>
        <div className="step-title">
          <span className="step-number">4</span>
          <span className="step-name">Measurement by David </span>
        </div>
        
        <div className="animation-content">
          <p className="step-description">David randomly chooses a measurement basis for each photon and records the result.</p>
          
          <div className="measurement-table">
            <div className="table-header">
              <div className="table-cell">Position</div>
              <div className="table-cell">Subhash Bit</div>
              <div className="table-cell">Subhash Basis</div>
              <div className="table-cell">David Basis</div>
              <div className="table-cell">Match?</div>
              <div className="table-cell">David Result</div>
            </div>
            
            {aliceBits.map((bit, idx) => {
              const basesMatch = aliceBases[idx] === bobBases[idx];
              return (
                <div 
                  key={idx} 
                  className={`table-row ${currentStep === 4 ? 'animate-reveal' : ''}`}
                  style={{ animationDelay: currentStep === 4 ? `${idx * 0.15}s` : '0s' }}
                >
                  <div className="table-cell">{idx + 1}</div>
                  <div className="table-cell">{bit}</div>
                  <div className="table-cell">{aliceBases[idx]}</div>
                  <div className="table-cell">{bobBases[idx]}</div>
                  <div className={`table-cell match-indicator ${basesMatch ? 'match' : 'no-match'}`}>
                    {basesMatch ? '✓' : '✗'}
                  </div>
                  <div className={`table-cell result ${basesMatch ? 'correct' : 'random'}`}>
                    {bobResults[idx]}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="step-info">
            <p>✓ When bases match: David's result = Subhash's bit (Correct)</p>
            <p>✓ When bases differ: David gets random result (50% chance of error)</p>
            <p>✓ David's choice of basis is INDEPENDENT of Subhash's choice</p>
          </div>
        </div>
      </div>

      {/* Step 5: Basis Reconciliation and Key Sifting */}
      <div className={`animation-step ${currentStep === 5 ? 'active' : ''}`}>
        <div className="step-title">
          <span className="step-number">5</span>
          <span className="step-name">Basis Reconciliation and Key Sifting</span>
        </div>
        
        <div className="animation-content">
          <p className="step-description">Subhash and David publicly announce their bases (NOT the bits). They keep only bits where bases matched.</p>
          
          <div className="sifting-visualization">
            <div className="sifting-row">
              <div className="row-label">All Bits:</div>
              {aliceBits.map((bit, idx) => (
                <div 
                  key={idx}
                  className={`sift-bit ${currentStep === 5 ? 'animate-sift' : ''}`}
                  style={{ animationDelay: currentStep === 5 ? `${idx * 0.2}s` : '0s' }}
                >
                  {bit}
                </div>
              ))}
            </div>
            
            <div className="sifting-row">
              <div className="row-label">Bases Match:</div>
              {aliceBits.map((bit, idx) => {
                const basesMatch = aliceBases[idx] === bobBases[idx];
                return (
                  <div 
                    key={idx}
                    className={`sift-indicator ${currentStep === 5 ? 'animate-highlight' : ''} ${basesMatch ? 'keep' : 'discard'}`}
                    style={{ animationDelay: currentStep === 5 ? `${idx * 0.2}s` : '0s' }}
                    title={basesMatch ? 'Keep - bases match' : 'Discard - bases differ'}
                  >
                    {basesMatch ? '✓' : '✗'}
                  </div>
                );
              })}
            </div>
            
            <div className={`sifting-row sifted-key ${currentStep === 5 ? 'animate-final' : ''}`}>
              <div className="row-label">Sifted Key:</div>
              {siftedKey.map((bit, idx) => (
                <div key={idx} className="sift-bit kept">
                  {bit}
                </div>
              ))}
            </div>
          </div>
          
          <div className="final-result">
            <div className="result-label">Final Shared Secret Key:</div>
            <div className="result-key">
              {siftedKey.join(' ')}
            </div>
            <div className="key-stats">
              <p>Positions kept: {siftedIndices.map(i => i + 1).join(', ')}</p>
              <p>Sifting efficiency: {Math.round((siftedKey.length / aliceBits.length) * 100)}% of transmitted bits</p>
            </div>
          </div>
          
          <div className="step-info">
            <p>✓ Public basis comparison reveals which positions to keep</p>
            <p>✓ No eavesdropper can have all correct measurements</p>
            <p>✓ {siftedKey.length} bits retained from {aliceBits.length} transmitted qubits</p>
          </div>
        </div>
      </div>

      {/* Step Slider for quick navigation */}
      <div className="step-slider-panel">
        <div className="slider-header">
          <span className="slider-title">Navigate steps</span>
          <span className="slider-status">Step {currentStep} of 5</span>
        </div>
        <div className="slider-control">
          <input
            type="range"
            min="1"
            max="5"
            value={currentStep}
            onChange={handleSliderChange}
            className="step-slider"
            aria-label="BB84 step slider"
          />
          <div className="slider-track">
            <div
              className="slider-progress"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`slider-dot ${currentStep === step ? 'active' : ''}`}
                style={{ left: `${((step - 1) / 4) * 100}%` }}
                aria-label={`Go to step ${step}`}
                onClick={() => handleSliderChange({ target: { value: step } })}
              />
            ))}
          </div>
          <div className="slider-labels">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="animation-controls">
        <button 
          className="control-btn" 
          onClick={resetAnimation}
          title="Go to Step 1"
        >
          ⏮ Reset
        </button>
        
        <button 
          className="control-btn" 
          onClick={prevStep}
          disabled={currentStep === 1}
          title="Previous step"
        >
          ◀ Previous
        </button>
        
        <div className="step-indicator">
          Step {currentStep} of 5
        </div>
        
        <button 
          className="control-btn" 
          onClick={nextStep}
          disabled={currentStep === 5}
          title="Next step"
        >
          Next ▶
        </button>
        
        <button 
          className={`control-btn auto-play-btn ${autoPlay ? 'active' : ''}`}
          onClick={toggleAutoPlay}
          title="Auto-play animation"
        >
          {autoPlay ? '⏸ Pause' : '▶ Auto-Play'}
        </button>
      </div>

      <div className="animation-footer">
        <p className="footer-note">
          💡 <strong>Key Insight:</strong> The security of BB84 lies in the quantum mechanics principle that measuring a quantum state in the wrong basis disturbs it, allowing eavesdropping detection through increased error rates.
        </p>
      </div>
    </div>
  );
};

export default BB84Animation;
