import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Explore from './pages/Explore'
import FormCheck from './pages/FormCheck'

function App() {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#0d0d0d' : '#F4F6F6'
    document.body.style.color = theme === 'dark' ? '#ffffff' : '#121212'
  }, [theme])

  return (
    <BrowserRouter>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route path="/explore" element={<Explore theme={theme} />} />
        <Route path="/form-check" element={<FormCheck theme={theme} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App