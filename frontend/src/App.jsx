import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BB84 from './pages/BB84'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bb84" element={<BB84 />} />
      </Routes>
    </Router>
  )
}

export default App
