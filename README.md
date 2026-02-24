# Quantum Key Distribution (QKD) Simulation Platform

A comprehensive, interactive educational platform for simulating and understanding quantum cryptography protocols. This project provides hands-on visualization and analysis of four major Quantum Key Distribution (QKD) protocols used in secure quantum communication.

## Overview

This platform demonstrates the principles of quantum mechanics in cryptography through interactive simulations of quantum key distribution protocols. Users can explore how quantum states are used to establish secure communication channels that are theoretically impossible to eavesdrop on without detection.

## Features

### 🔐 Quantum Protocols Implemented
- **BB84 Protocol** - The original prepare-and-measure quantum key distribution protocol with real-time simulation and measurement outcomes
- **B92 Protocol** - A two-state QKD protocol using non-orthogonal quantum states with efficiency analysis
- **E91 Protocol** - An entanglement-based QKD protocol with Bell inequality testing for eavesdropping detection
- **BBM92 Protocol** - An entanglement variant of the BB84 protocol

### 🎨 Interactive Visualization
- **Working Principle Animation** - Step-by-step interactive animation showing the complete BB84 protocol with 5 detailed stages
- **Real-time Parameter Control** - Adjustable sliders for protocol parameters (bit count, noise levels, Eve probability)
- **Dynamic Results Display** - Live calculation of key metrics (total signals, conclusive detections, QBER, sifting efficiency)
- **Measurement Tables** - Detailed tables showing quantum state measurements and basis reconciliation
- **Visual State Representation** - Quantum state vectors and polarization diagrams

### 📚 Educational Content
- **Protocol Documentation** - Comprehensive articles for each QKD protocol with mathematical foundations
- **Quantum Mechanics Explanation** - Clear explanations of quantum states, measurement bases, and entanglement
- **Security Analysis** - Detailed security properties and eavesdropping detection mechanisms
- **About Section** - Project overview and theoretical background

### 🎯 User Experience
- **Professional UI Design** - Academic, minimal design with quantum-themed aesthetics
- **Responsive Layout** - Optimized for desktop and mobile devices
- **Smooth Animations** - Subtle, educational animations (not flashy)
- **Navigation Bar** - Branded QKD logo with easy access to all sections
- **Dark Theme** - Eye-friendly dark interface with cyan/blue quantum color scheme

## Technologies Used

### Frontend
- **React 18** - UI framework with functional components and hooks
- **React Router** - Client-side routing for multi-page navigation
- **CSS3** - Custom styling with gradients, animations, and responsive design
- **Vite** - Fast build tool and development server
- **SVG** - Custom graphics for QKD logo and favicon

### Backend
- **Python 3.x** - Core simulation engine
- **Flask** - Lightweight REST API server
- **Flask-CORS** - Cross-origin resource sharing for React frontend
- **NumPy** - Quantum state calculations and numerical simulations

## Project Structure

```
simulationProject/
├── frontend/                          # React application
│   ├── src/
│   │   ├── pages/                    # Main page components
│   │   │   ├── Home.jsx              # Landing page with protocol selection
│   │   │   ├── BB84.jsx              # BB84 simulation interface
│   │   │   ├── B92.jsx               # B92 simulation interface
│   │   │   ├── E91.jsx               # E91 simulation interface
│   │   │   ├── BBM92.jsx             # BBM92 simulation interface
│   │   │   ├── About.jsx             # Project overview page
│   │   │   ├── BB84Page.jsx          # BB84 with animation + documentation
│   │   │   ├── B92Article.jsx        # B92 protocol documentation
│   │   │   └── E91Article.jsx        # E91 protocol documentation
│   │   ├── Components/
│   │   │   ├── BB84Animation.jsx     # Interactive BB84 protocol animation
│   │   │   └── ProtocolArticle.jsx   # Reusable protocol documentation
│   │   ├── styles/                   # CSS styling
│   │   │   ├── Home.css              # Landing page + navbar styles
│   │   │   ├── BB84.css              # BB84 UI styles
│   │   │   ├── B92.css               # B92 UI styles
│   │   │   ├── E91.css               # E91 UI styles
│   │   │   ├── BB84Animation.css     # Animation component styles
│   │   │   ├── About.css             # About page styles
│   │   │   └── ProtocolArticle.css   # Protocol documentation styles
│   │   ├── api/                      # API integration
│   │   │   ├── bb84.jsx              # BB84 API wrapper
│   │   │   ├── b92.jsx               # B92 API wrapper
│   │   │   ├── e91.jsx               # E91 API wrapper
│   │   │   └── bbm92.jsx             # BBM92 API wrapper
│   │   ├── assets/                   # Static assets
│   │   │   └── qkd-logo.svg          # QKD logo for navbar
│   │   ├── App.jsx                   # Main router configuration
│   │   └── main.jsx                  # React entry point
│   ├── public/
│   │   ├── favicon.svg               # QKD favicon
│   │   ├── about.txt                 # About page content
│   │   ├── bb84-protocol.txt         # BB84 documentation
│   │   ├── b92-protocol.txt          # B92 documentation
│   │   └── e91-protocol.txt          # E91 documentation
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # npm dependencies
│   └── vite.config.js                # Vite configuration
│
└── backend/                           # Flask API server
    ├── app.py                        # Flask application setup
    ├── protocols/
    │   ├── bb84.py                   # BB84 quantum simulation
    │   ├── b92.py                    # B92 quantum simulation
    │   ├── e91.py                    # E91 quantum simulation
    │   └── bbm92.py                  # BBM92 quantum simulation
    └── api/
        ├── bb84_routes.py            # BB84 REST endpoints
        ├── b92_routes.py             # B92 REST endpoints
        ├── e91_routes.py             # E91 REST endpoints
        └── bbm92_routes.py           # BBM92 REST endpoints
```

## Getting Started

### Prerequisites
- **Node.js** (v16+) and npm
- **Python** (v3.8+) and pip
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simulationProject
   ```

2. **Setup Backend**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install flask flask-cors numpy
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

**Terminal 1 - Backend Server:**
```bash
python backend/app.py
```
The API will be available at `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
```
The application will be available at `http://localhost:5173`

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

## How to Use

1. **Launch the Application** - Open the landing page to see protocol options
2. **Select a Protocol** - Choose from BB84, B92, E91, or BBM92
3. **Adjust Parameters** - Use sliders to customize:
   - Number of bits to transmit
   - Noise level in the quantum channel
   - Eavesdropper (Eve) probability
4. **Run Simulation** - Click the simulate button to execute the protocol
5. **Analyze Results** - View metrics like:
   - Total signals sent
   - Conclusive detections
   - Quantum Bit Error Rate (QBER)
   - Sifting efficiency
6. **View Documentation** - Access detailed protocol explanations and mathematical foundations
7. **Watch Animation** - See the BB84 protocol unfold step-by-step with interactive controls

## Quantum Protocols Explained

### BB84 (Bennett & Brassard 1984)
The foundational QKD protocol using:
- Two measurement bases (rectilinear + and diagonal ×)
- Random bit preparation
- Public basis comparison
- Eavesdropping detection via QBER

### B92 (Bennett 1992)
An optimized protocol using:
- Two non-orthogonal quantum states
- Single measurement basis
- Improved efficiency (50% signal loss vs 75% for BB84)
- Simpler implementation

### E91 (Ekert 1991)
An entanglement-based protocol featuring:
- Entangled photon pairs (Bell states)
- Three measurement bases per party
- Bell inequality testing
- Direct eavesdropping detection

### BBM92 (Bennett, Brassard, Mermin 1992)
An entanglement variant combining:
- Two-photon entanglement
- Simplified measurement setup
- Enhanced security guarantees

## Security Properties

All implemented protocols are **unconditionally secure** against eavesdropping:
- ✅ Information-theoretic security (not computational)
- ✅ Eavesdropping induces detectable quantum state disturbance
- ✅ QBER monitoring reveals presence of Eve
- ✅ Secure against all possible attacks (current and future)

## Educational Value

This platform is designed for:
- **Students** learning quantum cryptography and quantum mechanics
- **Researchers** studying QKD protocol implementations
- **Educators** teaching quantum information theory
- **Enthusiasts** exploring quantum computing and security

## Design Philosophy

- **Interactive Learning** - Hands-on exploration rather than passive reading
- **Visual Communication** - Complex quantum concepts made accessible through animation
- **Academic Rigor** - Mathematically accurate simulations with proper quantum mechanics
- **Clean Aesthetics** - Professional design that supports learning without distraction
- **Responsive Design** - Works seamlessly across devices

## Color Scheme

The application uses a quantum-themed color palette:
- **Primary Blue**: `#64c8ff` - Cyan photons
- **Secondary Blue**: `#00d4ff` - Quantum operations
- **Success Green**: `#64ff64` - Correct measurements
- **Warning Orange**: `#ff8888` - Errors/mismatches
- **Dark Background**: `#0a0e27` to `#1a1f4d` - Dark space metaphor

## Performance Considerations

- Frontend optimized with React hooks and lazy loading
- Backend calculations use NumPy for efficient quantum state math
- Simulations handle up to 10,000 qubits per protocol run
- Responsive UI with smooth 60fps animations

## Future Enhancements

- [ ] More QKD protocols (SARG04, GLLP, decoy-state)
- [ ] Experimental data import and analysis
- [ ] 3D Bloch sphere visualization
- [ ] Multi-party key distribution
- [ ] Quantum error correction module
- [ ] Educational quiz system

## Contributing

Contributions are welcome! Areas for contribution:
- New QKD protocol implementations
- UI/UX improvements
- Documentation enhancements
- Performance optimizations
- Bug fixes and testing

## License

This project is created for educational purposes. See LICENSE file for details.

## Credits

Developed as a comprehensive Quantum Key Distribution simulation and education platform.

### References
- Bennett, C. H., & Brassard, G. (1984). "Quantum cryptography: public key distribution and coin tossing"
- Bennett, C. H. (1992). "Quantum cryptography using two nonorthogonal states"
- Ekert, A. K. (1991). "Quantum cryptography based on Bell's theorem"
- Nielsen, M. A., & Chuang, I. L. (2010). "Quantum Computation and Quantum Information"

## Contact & Support

For questions, suggestions, or issues:
- Review the About page for project details
- Check protocol documentation for theoretical background
- Examine the code comments for implementation details

---

**Last Updated:** January 2026

**Status:** Actively Maintained ✨

Experience the future of quantum cryptography through interactive simulation!
