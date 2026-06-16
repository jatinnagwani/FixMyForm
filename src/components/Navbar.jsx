import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { EXERCISE_REFS } from "../pages/ExerciseData.js"; // 🚀 Connecting metadata structure 

function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path
  const isDark = theme === 'dark'

  // 🧠 Smart Filter engine that parses Name, Muscle groups, and Equipment tags
  const getFilteredSuggestions = (queryStr) => {
    if (!queryStr) return [];
    const query = queryStr.toLowerCase().trim();

    return Object.keys(EXERCISE_REFS).filter(name => {
      const data = EXERCISE_REFS[name];
      const muscle = data.muscle ? data.muscle.toLowerCase() : '';
      const equipment = data.equipment ? data.equipment.toLowerCase() : '';
      const exerciseName = name.toLowerCase();

      if (exerciseName.includes(query)) return true;
      if (muscle.includes(query) || equipment.includes(query)) return true;

      const queryWords = query.split(' ');
      return queryWords.every(word => 
        exerciseName.includes(word) || muscle.includes(word) || equipment.includes(word)
      );
    });
  };

  const suggestions = getFilteredSuggestions(search);

  const handleSelectExercise = (exerciseName) => {
    setSearch('');
    setShowSuggestions(false);
    setMenuOpen(false);
    // Direct redirect query params payload link
    navigate(`/form-check?selected=${encodeURIComponent(exerciseName)}`);
  };

  const handleKeyDownSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/explore?search=${search.trim()}`);
      setShowSuggestions(false);
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b ${isDark ? 'border-[#2a2a2a]' : 'border-[#e0e0e0]'}`}
      style={{ background: isDark ? 'rgba(13,13,13,0.95)' : 'rgba(244,246,246,0.95)', backdropFilter: 'blur(12px)' }}>
      <div className="w-full px-4 sm:px-8 lg:px-16 py-3 flex items-center justify-between">

        {/* Logo — Strictly Protected Tactical Gaming Look */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="FixMyForm" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain" />
          <span className={`text-xl sm:text-2xl lg:text-3xl uppercase font-ops tracking-wider ${isDark ? 'text-white' : 'text-[#121212]'}`}>
            Fix<span className="text-[#FF6B35]">My</span>Form
          </span>
        </Link>

        {/* Center — Links (Shifted to font-nav/Syne) + Search Container */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          <Link to="/explore"
            className={`text-xs lg:text-sm font-nav font-semibold tracking-[0.15em] uppercase transition-colors ${isActive('/explore') ? 'text-[#FF6B35]' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-[#121212]'}`}>
            Explore
          </Link>
          <Link to="/form-check"
            className={`text-xs lg:text-sm font-nav font-semibold tracking-[0.15em] uppercase transition-colors ${isActive('/form-check') ? 'text-[#FF6B35]' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-[#121212]'}`}>
            Form Check
          </Link>
          
          {/* 🔍 Desktop Search Box with Dropdown Menu */}
          <div className="relative">
            <svg 
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-20 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDownSearch}
              placeholder="Search name, muscle, or gear..."
              className={`w-48 md:w-64 lg:w-96 xl:w-[500px] border text-sm lg:text-base pl-8 pr-8 py-2 lg:py-3 focus:outline-none focus:border-[#FF6B35] transition-colors relative z-10 font-nav
                ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212] placeholder-gray-400'}`}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-[10px] text-gray-500 hover:text-[#FF6B35]">✕</button>
            )}

            {/* Desktop Autocomplete Panel */}
            {showSuggestions && suggestions.length > 0 && (
              <div className={`absolute top-full left-0 right-0 mt-1 z-50 border shadow-2xl max-h-64 overflow-y-auto ${isDark ? 'bg-[#161616] border-[#2a2a2a]' : 'bg-white border-[#e0e0e0]'}`}>
                {suggestions.map((name) => {
                  const info = EXERCISE_REFS[name];
                  return (
                    <button
                      key={name}
                      onClick={() => handleSelectExercise(name)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between border-b border-dashed last:border-0 transition-colors group cursor-pointer ${isDark ? 'hover:bg-[#202020] border-[#2a2a2a]' : 'hover:bg-gray-50 border-[#e0e0e0]'}`}
                    >
                      <span className={`text-xs font-bold font-nav uppercase tracking-wide group-hover:text-[#FF6B35] transition-colors ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {name}
                      </span>
                      <div className="flex gap-1.5 shrink-0 pl-2">
                        <span className="text-[9px] font-black font-nav px-1.5 py-0.5 tracking-wider uppercase bg-[#2EC4B6]/10 text-[#2EC4B6] border border-[#2EC4B6]/20">
                          {info.muscle}
                        </span>
                        <span className="text-[9px] font-black font-nav px-1.5 py-0.5 tracking-wider uppercase bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20">
                          {info.equipment}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right — Toggle + CTA (Shifted to font-nav) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 shrink-0">
          <button
            onClick={toggleTheme}
            className={`text-xl transition-all ${isDark ? 'text-gray-400 hover:text-[#FF6B35]' : 'text-gray-500 hover:text-[#FF6B35]'}`}
          >
            {isDark ? '☀' : '☾'}
          </button>
          <Link to="/form-check"
            className="bg-[#FF6B35] hover:bg-[#cc5429] text-white px-4 lg:px-6 py-2 text-xs font-nav font-bold tracking-[0.12em] uppercase transition-colors">
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

      {/* Mobile Menu — Upgraded Mobile Search Layer (font-nav integrated) */}
      {menuOpen && (
        <div className={`md:hidden border-t px-6 py-8 flex flex-col gap-6 ${isDark ? 'bg-[#0d0d0d] border-[#2a2a2a]' : 'bg-[#F4F6F6] border-[#e0e0e0]'}`}>
          
          {/* 🔍 Mobile Input Container */}
          <div className="relative">
            <svg
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-20 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDownSearch}
              placeholder="Search name, muscle, or gear..."
              className={`w-full border text-sm pl-8 pr-8 py-2 focus:outline-none focus:border-[#FF6B35] transition-colors relative z-10 font-nav
                ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212] placeholder-gray-400'}`}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-[10px] text-gray-500">✕</button>
            )}

            {/* Mobile Autocomplete Panel */}
            {showSuggestions && suggestions.length > 0 && (
              <div className={`absolute top-full left-0 right-0 mt-1 z-50 border shadow-2xl max-h-48 overflow-y-auto ${isDark ? 'bg-[#161616] border-[#2a2a2a]' : 'bg-white border-[#e0e0e0]'}`}>
                {suggestions.map((name) => {
                  const info = EXERCISE_REFS[name];
                  return (
                    <button
                      key={name}
                      onClick={() => handleSelectExercise(name)}
                      className={`w-full text-left px-4 py-2.5 flex items-center justify-between border-b border-dashed last:border-0 transition-colors ${isDark ? 'hover:bg-[#202020] border-[#2a2a2a] text-gray-300' : 'hover:bg-gray-50 border-[#e0e0e0] text-gray-700'}`}
                    >
                      <span className="text-xs font-bold font-nav uppercase tracking-wide">{name}</span>
                      <div className="flex gap-1 shrink-0 pl-1">
                        <span className="text-[8px] font-black font-nav px-1 py-0.5 bg-[#2EC4B6]/10 text-[#2EC4B6] border border-[#2EC4B6]/20">{info.muscle}</span>
                        <span className="text-[8px] font-black font-nav px-1 py-0.5 bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20">{info.equipment}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <Link to="/explore" onClick={() => setMenuOpen(false)}
            className={`text-2xl font-black font-nav tracking-widest uppercase hover:text-[#FF6B35] transition-colors ${isDark ? 'text-white' : 'text-[#121212]'}`}>
            Explore
          </Link>
          <Link to="/form-check" onClick={() => setMenuOpen(false)}
            className={`text-2xl font-black font-nav tracking-widest uppercase hover:text-[#FF6B35] transition-colors ${isDark ? 'text-white' : 'text-[#121212]'}`}>
            Form Check
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => { toggleTheme(); setMenuOpen(false); }}
              className={`text-xl transition-all font-nav ${isDark ? 'text-gray-400 hover:text-[#FF6B35]' : 'text-gray-500 hover:text-[#FF6B35]'}`}>
              {isDark ? '☀ Light' : '☾ Dark'}
            </button>
            <Link to="/form-check" onClick={() => setMenuOpen(false)}
              className="bg-[#FF6B35] text-white px-5 py-3 text-sm font-black font-nav tracking-widest uppercase flex-1 text-center hover:bg-[#cc5429] transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      )}

      {/* Global overlay close backdrop monitor */}
      {showSuggestions && (
        <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} />
      )}
    </nav>
  )
}

export default Navbar