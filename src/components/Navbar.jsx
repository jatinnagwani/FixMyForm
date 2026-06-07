import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/explore?search=${search.trim()}`)
      setSearch('')
      setMenuOpen(false)
    }
  }

  const isDark = theme === 'dark'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b ${isDark ? 'border-[#2a2a2a]' : 'border-[#e0e0e0]'}`}
      style={{ background: isDark ? 'rgba(13,13,13,0.95)' : 'rgba(244,246,246,0.95)', backdropFilter: 'blur(12px)' }}>
      <div className="w-full px-4 sm:px-8 lg:px-16 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="FixMyForm" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain" />
          <span style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif', letterSpacing: '0.08em' }}
            className={`text-xl sm:text-2xl lg:text-3xl uppercase ${isDark ? 'text-white' : 'text-[#121212]'}`}>
            Fix<span className="text-[#FF6B35]">My</span>Form
          </span>
        </Link>

        {/* Center — Links + Search */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          <Link to="/explore"
            className={`text-xs lg:text-sm font-bold tracking-[0.18em] uppercase transition-colors ${isActive('/explore') ? 'text-[#FF6B35]' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-[#121212]'}`}>
            Explore
          </Link>
          <Link to="/form-check"
            className={`text-xs lg:text-sm font-bold tracking-[0.18em] uppercase transition-colors ${isActive('/form-check') ? 'text-[#FF6B35]' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-[#121212]'}`}>
            Form Check
          </Link>
          <div className="relative">
            <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search exercises"
              className={`w-48 md:w-64 lg:w-96 xl:w-[500px] border text-sm lg:text-base pl-8 pr-4 py-2 lg:py-3 focus:outline-none focus:border-[#FF6B35] transition-colors
                ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212] placeholder-gray-400'}`}
            />
          </div>
        </div>

        {/* Right — Toggle + CTA */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 shrink-0">
          <button
            onClick={toggleTheme}
            className={`text-xl transition-all ${isDark ? 'text-gray-400 hover:text-[#FF6B35]' : 'text-gray-500 hover:text-[#FF6B35]'}`}
          >
            {isDark ? '☀' : '☾'}
          </button>
          <Link to="/form-check"
            className="bg-[#FF6B35] hover:bg-[#cc5429] text-white px-4 lg:px-6 py-2 text-xs font-black tracking-[0.18em] uppercase transition-colors">
            Get Started
          </Link>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-1 ml-auto">
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-[#121212]'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-[#121212]'} ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-[#121212]'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden border-t px-6 py-8 flex flex-col gap-6 ${isDark ? 'bg-[#0d0d0d] border-[#2a2a2a]' : 'bg-[#F4F6F6] border-[#e0e0e0]'}`}>
          <div className="relative">
            <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search exercises"
              className={`w-full border text-sm pl-8 pr-4 py-2 focus:outline-none focus:border-[#FF6B35] transition-colors
                ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212] placeholder-gray-400'}`}
            />
          </div>
          <Link to="/explore" onClick={() => setMenuOpen(false)}
            className={`text-2xl font-black tracking-widest uppercase hover:text-[#FF6B35] transition-colors ${isDark ? 'text-white' : 'text-[#121212]'}`}>
            Explore
          </Link>
          <Link to="/form-check" onClick={() => setMenuOpen(false)}
            className={`text-2xl font-black tracking-widest uppercase hover:text-[#FF6B35] transition-colors ${isDark ? 'text-white' : 'text-[#121212]'}`}>
            Form Check
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme}
              className={`text-xl transition-all ${isDark ? 'text-gray-400 hover:text-[#FF6B35]' : 'text-gray-500 hover:text-[#FF6B35]'}`}>
              {isDark ? '☀ Light' : '☾ Dark'}
            </button>
            <Link to="/form-check" onClick={() => setMenuOpen(false)}
              className="bg-[#FF6B35] text-white px-5 py-3 text-sm font-black tracking-widest uppercase flex-1 text-center hover:bg-[#cc5429] transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar