import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Explore from './pages/Explore'
import FormCheck from './pages/FormCheck'
import Swapper from './pages/Swapper'

function App() {
  const [ToolsOpen, setToolsOpen] = useState(false);
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // 🎨 Body ka base color bhi deep black (#030303) set kar diya
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#030303' : '#F4F6F6'
    document.body.style.color = theme === 'dark' ? '#ffffff' : '#121212'
  }, [theme])

  return (
    <BrowserRouter>
      
      {/* 🌐 GLOBAL CYBER GRID BACKGROUND (DEEP ABYSS SHADE) */}
      <div className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          backgroundColor: theme === 'dark' ? '#030303' : '#f4f6f6',
          backgroundImage: theme === 'dark' 
            ? 'linear-gradient(rgba(46,196,182,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(46,196,182,0.025) 1px, transparent 1px)'
            : 'linear-gradient(rgba(46,196,182,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(46,196,182,0.06) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(circle at 50% 30%, black 15%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black 15%, transparent 85%)'
        }}
      />

      {/* Navbar with remote control */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        ToolsOpen={ToolsOpen}
        setToolsOpen={setToolsOpen} 
      />
      
      <Routes>
        <Route path="/" element={<Home theme={theme} setToolsOpen={setToolsOpen} />} />
        <Route path="/explore" element={<Explore theme={theme} />} />
        <Route path="/form-check" element={<FormCheck theme={theme} />} />
        <Route path="/swapper" element={<Swapper theme={theme} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App