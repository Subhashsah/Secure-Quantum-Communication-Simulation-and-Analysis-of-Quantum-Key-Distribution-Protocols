import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import QKDLogo from '../assets/qkd-logo.svg'

function Home() {
  const navigate = useNavigate()

  const handleProtocolSelect = (protocol) => {
    if (protocol === 'BB84') {
      navigate('/bb84')
    } else if (protocol === 'E91') {
      navigate('/e91')
    } else if (protocol === 'BBM92') {
      navigate('/bbm92')
    } else if (protocol === 'B92') {
      navigate('/b92')
    }
  }

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo-section" onClick={() => navigate('/')}>
            <img src={QKDLogo} alt="QKD Logo" className="qkd-logo" />
            <span className="logo-text">QKD Simulator</span>
          </div>
          <button className="about-nav-btn" onClick={() => navigate('/about')}>
            About
          </button>
        </div>
      </nav>

      {/* Starfield Background */}
      <div className="starfield">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Bloch Sphere */}
      <div className="bloch-sphere">
        <div className="sphere-inner">
          <div className="sphere-glow"></div>
          <div className="qubit-state">
            <div className="state-vector"></div>
            <div className="state-dot"></div>
          </div>
          <div className="grid-lines"></div>
          <div className="sphere-light"></div>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="header">
          <h1 className="title">Secure Communication Analysis</h1>
          <p className="subtitle">using QKD</p>
        </div>

        <div className="protocol-section">
          <p className="select-text">Select the Protocol</p>
          <div className="button-group">
            <button
              className="protocol-btn bb84-btn"
              onClick={() => handleProtocolSelect('BB84')}
            >
              BB84 Protocol
            </button>
            <button
              className="protocol-btn b92-btn"
              onClick={() => handleProtocolSelect('B92')}
            >
              B92 Protocol
            </button>
            <button
              className="protocol-btn e91-btn"
              onClick={() => handleProtocolSelect('E91')}
            >
              E91 Protocol
            </button>
            {/* <button
              className="protocol-btn b94-btn"
              onClick={() => handleProtocolSelect('BBM92')}
            >
              BBM92 Protocol
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
