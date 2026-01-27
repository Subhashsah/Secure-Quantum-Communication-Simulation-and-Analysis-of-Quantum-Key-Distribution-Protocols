import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BB84 from './pages/BB84'
import E91 from './pages/E91'
import BBM92 from './pages/BBM92'
import B92 from './pages/B92'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bb84" element={<BB84 />} />
        <Route path="/e91" element={<E91 />} />
        <Route path="/bbm92" element={<BBM92 />} />
        <Route path="/b92" element={<B92 />} />
      </Routes>
    </Router>
  )
}

export default App
