# Quantum Key Distribution (QKD) Simulation Platform

A comprehensive, interactive educational platform for simulating and understanding quantum cryptography protocols. This project provides hands-on visualization and analysis of four major Quantum Key Distribution (QKD) protocols used in secure quantum communication.

## Overview

This platform demonstrates the principles of quantum mechanics in cryptography through interactive simulations of quantum key distribution protocols. Users can explore how quantum states are used to establish secure communication channels that are theoretically impossible to eavesdrop on without detection.

The project combines a **React + Tailwind CSS frontend** with a **Python Flask backend** powered by **IBM Qiskit** for accurate quantum simulations.

## Features

### 🔐 Quantum Protocols Implemented
- **BB84 Protocol** - The original prepare-and-measure quantum key distribution protocol with real-time simulation and measurement outcomes
- **B92 Protocol** - A two-state QKD protocol using non-orthogonal quantum states with efficiency analysis
- **E91 Protocol** - An entanglement-based QKD protocol with Bell inequality testing for eavesdropping detection

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
- **React 19** - UI framework with functional components and hooks
- **React Router DOM** - Client-side routing for multi-page navigation
- **Tailwind CSS** - Utility-first CSS framework for responsive styling
- **Vite** - Fast build tool and development server
- **ESLint** - Code quality and linting

### Backend
- **Python 3.x** - Core simulation engine
- **Flask** - Lightweight REST API server
- **Flask-CORS** - Cross-origin resource sharing for React frontend
- **IBM Qiskit 2.3** - Quantum computing framework for accurate quantum simulations
- **NumPy 2.4** - Numerical operations and quantum state calculations
- **SciPy** - Scientific computing utilities

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
│   │   │   ├── About.jsx             # Project overview page
│   │   │   └── simulation/           # Simulation component pages
│   │   │       ├── B92.jsx           # B92 simulation
│   │   │       ├── BB84.jsx          # BB84 simulation
│   │   │       └── E91.jsx           # E91 simulation
│   │   ├── Components/
│   │   │   ├── articles/
│   │   │   │   ├── B92.jsx           # B92 protocol documentation
│   │   │   │   ├── BB84.jsx          # BB84 protocol documentation
│   │   │   │   ├── E91.jsx           # E91 protocol documentation
│   │   │   │   └── ProtocolArticle.jsx # Reusable documentation component
│   │   ├── api/                      # API integration
│   │   │   ├── b92.jsx               # B92 API wrapper
│   │   │   ├── bb84.jsx              # BB84 API wrapper
│   │   │   └── e91.jsx               # E91 API wrapper
│   │   ├── styles/                   # CSS styling
│   │   │   ├── Home.css
│   │   │   ├── About.css
│   │   │   ├── B92.css
│   │   │   ├── BB84.css
│   │   │   ├── E91.css
│   │   │   ├── ProtocolArticle.css
│   │   ├── App.jsx                   # Main router configuration
│   │   ├── index.css                 # Global styles
│   │   └── main.jsx                  # React entry point
│   ├── public/
│   │   ├── about.json                # About page content
│   │   ├── b92-protocol.txt          # B92 documentation
│   │   ├── bb84-protocol.txt         # BB84 documentation
│   │   ├── e91-protocol.txt          # E91 documentation
│   │   └── image/                    # Assets and images
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # npm dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── eslint.config.js              # ESLint configuration
│   └── README.md                     # Frontend documentation
│
├── backend/                           # Flask API server
│   ├── app.py                        # Flask application setup
│   ├── protocols/                    # Quantum protocol implementations
│   │   ├── b92.py                    # B92 quantum simulation
│   │   ├── bb84.py                   # BB84 quantum simulation
│   │   ├── e91.py                    # E91 quantum simulation
│   │   └── __pycache__/
│   └── api/                          # REST API routes
│       ├── b92_routes.py             # B92 endpoints
│       ├── bb84_routes.py            # BB84 endpoints
│       ├── e91_routes.py             # E91 endpoints
│       └── __pycache__/
│
├── requirements.txt                  # Python dependencies
├── README.md                         # This file
├── note.txt                          # Development notes
└── about.txt                         # About project info
```

## Getting Started

### Prerequisites
- **Node.js** (v16+) and npm
- **Python** (v3.8+) and pip
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Subhashsah/Secure-Quantum-Communication-Simulation-and-Analysis-of-Quantum-Key-Distribution-Protocols.git
   cd simulationProject
   ```

2. **Setup Backend**
   ```bash
   python -m venv .sim
   source .sim/bin/activate  # On Windows: .sim\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

**Terminal 1 - Backend Server:**
```bash
source .sim/bin/activate
python backend/app.py
```
The API will be available at `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**
```bash
source .sim/bin/activate
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
- **Visual Communication** - Complex quantum concepts made accessible through simulations
- **Academic Rigor** - Quantum simulations powered by IBM Qiskit for accuracy
- **Clean Design** - Professional interface using Tailwind CSS
- **Responsive Design** - Optimized for desktop and mobile devices

## Color Scheme

The application uses a professional color palette with quantum-inspired aesthetics:
- **Primary Colors** - Blues and cyans for quantum operations
- **Accent Colors** - Greens for success, oranges/reds for errors
- **Dark Theme** - Easy on the eyes for extended studying

## Performance Considerations

- Frontend optimized with React 19 hooks and lazy loading
- Backend uses Qiskit quantum simulators for accurate quantum computations
- Handles simulations with configurable qubit counts
- Responsive UI with Tailwind CSS

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

**Last Updated:** April 2026

**Status:** Actively Maintained ✨

Experience the future of quantum cryptography through interactive simulation and learn quantum computing with IBM Qiskit!
