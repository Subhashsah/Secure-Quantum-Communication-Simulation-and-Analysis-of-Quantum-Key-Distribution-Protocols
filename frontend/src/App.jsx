import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BB84 from './pages/BB84'
import E91 from './pages/E91'
import BBM92 from './pages/BBM92'
import B92 from './pages/B92'
import About from './pages/About'
import BB84Page from './pages/BB84Page'
import B92Article from './pages/B92Article'
import E91Article from './pages/E91Article'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bb84" element={<BB84 />} />
        <Route path="/e91" element={<E91 />} />
        <Route path="/bbm92" element={<BBM92 />} />
        <Route path="/b92" element={<B92 />} />
        <Route path="/about" element={<About />} />
        <Route path="/protocol/BB84" element={<BB84Page />} />
        <Route path="/protocol/B92" element={<B92Article />} />
        <Route path="/protocol/E91" element={<E91Article />} />
      </Routes>
    </Router>
  )
}

export default App
