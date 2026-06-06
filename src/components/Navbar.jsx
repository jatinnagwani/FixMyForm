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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2a2a]"
      style={{ background: 'rgba(13,13,13,0.95)', backdropFilter: 'blur(12px)' }}>
      <div className="w-full px-48 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="FixMyForm" className="h-12 w-12 object-contain" />
          <span style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif', letterSpacing: '0.08em' }}
            className="text-white text-3xl uppercase">
            Fix<span className="text-[#FF6B35]">My</span>Form
          </span>
        </Link>

        {/* Center — Links + Search */}
        <div className="hidden md:flex items-center gap-40 ml-6">
          <Link to="/explore"
            className={`text-sm font-bold tracking-[0.18em] uppercase transition-colors ${isActive('/explore') ? 'text-[#FF6B35]' : 'text-gray-400 hover:text-white'}`}>
            Explore
          </Link>
          <Link to="/form-check"
            className={`text-sm font-bold tracking-[0.18em] uppercase transition-colors ${isActive('/form-check') ? 'text-[#FF6B35]' : 'text-gray-400 hover:text-white'}`}>
            Form Check
          </Link>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search exercises..."
              className="w-[700px] bg-[#161616] border border-[#2a2a2a] text-white text-base pl-8 pr-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] transition-colors"
            />
          </div>
        </div>

        {/* Right — Toggle + CTA */}
        <div className="hidden md:flex items-center gap-16 shrink-0 mr-2">
          <button
            onClick={toggleTheme}
            className="text-gray-400 hover:text-[#FF6B35] text-xl transition-all"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <Link to="/form-check"
            className="bg-[#FF6B35] hover:bg-[#cc5429] text-white px-6 py-2 text-xs font-black tracking-[0.18em] uppercase transition-colors">
            Get Started
          </Link>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-1 ml-auto">
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-[#2a2a2a] px-6 py-8 flex flex-col gap-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search exercises"
              className="w-full bg-[#161616] border border-[#2a2a2a] text-white text-sm pl-8 pr-4 py-2 placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] transition-colors"
            />
          </div>
          <Link to="/explore" onClick={() => setMenuOpen(false)}
            className="text-2xl font-black tracking-widest uppercase text-white hover:text-[#FF6B35] transition-colors">
            Explore
          </Link>
          <Link to="/form-check" onClick={() => setMenuOpen(false)}
            className="text-2xl font-black tracking-widest uppercase text-white hover:text-[#FF6B35] transition-colors">
            Form Check
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme}
              className="text-gray-400 hover:text-[#FF6B35] text-xl transition-all">
              {theme === 'dark' ? '☀ Light' : '☾ Dark'}
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