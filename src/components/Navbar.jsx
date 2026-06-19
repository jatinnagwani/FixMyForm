import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { EXERCISE_REFS } from "../pages/ExerciseData.js"; // 🚀 Connecting metadata structure 

function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [toolsOpen, setToolsOpen] = useState(false)
  const [calcWeight, setCalcWeight] = useState('')
  const [calcReps, setCalcReps] = useState('')
  const [activeTool, setActiveTool] = useState(null) // 🧠 Tracks active tool view
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
    <>
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

          {/* Right — Toggle + Upgraded Lifter Tools CTA */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 shrink-0">
            <button
              onClick={toggleTheme}
              className={`text-xl transition-all cursor-pointer ${isDark ? 'text-gray-400 hover:text-[#FF6B35]' : 'text-gray-500 hover:text-[#FF6B35]'}`}
            >
              {isDark ? '☀' : '☾'}
            </button>
            <button
              onClick={() => setToolsOpen(true)}
              className="bg-[#FF6B35] hover:bg-[#cc5429] text-white px-4 lg:px-6 py-2.5 text-xs font-nav font-black tracking-[0.12em] uppercase transition-all cursor-pointer active:scale-95 shadow-[0_0_15px_rgba(255,107,53,0.2)]"
            >
              ⚡ Lifter Tools
            </button>
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
                className={`text-sm font-bold font-nav tracking-wider uppercase transition-all ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-[#121212]'}`}>
                {isDark ? '☀ Light Mode' : '☾ Dark Mode'}
              </button>
              <button
                onClick={() => { setToolsOpen(true); setMenuOpen(false); }}
                className="bg-[#FF6B35] text-white px-5 py-3 text-sm font-black font-nav tracking-widest uppercase flex-1 text-center hover:bg-[#cc5429] transition-colors cursor-pointer"
              >
                ⚡ Lifter Tools
              </button>
            </div>
          </div>
        )}

        {/* Global overlay close backdrop monitor */}
        {showSuggestions && (
          <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} />
        )}
      </nav>

      {/* 🚀 LIFTER TOOLS SIDE OVERLAY PANEL — Safely out of Nav flow, absolute peak z-index */}
      {toolsOpen && (
        <div className="fixed inset-0" style={{ zIndex: 99999 }}>
          {/* Backdrop blur layer */}
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-xs transition-opacity duration-300" 
            onClick={() => { setToolsOpen(false); setActiveTool(null); }} 
          />

          {/* Sliding Sidebar Box Container */}
          <div 
            className="fixed right-0 top-0 w-full max-w-md h-full shadow-2xl flex flex-col p-6 border-l border-dashed transition-all duration-300"
            style={{ backgroundColor: isDark ? '#0f0f0f' : '#ffffff', borderColor: isDark ? '#2a2a2a' : '#e0e0e0', color: isDark ? '#ffffff' : '#121212' }}
          >
            {/* Header Area */}
            <div className="flex items-center justify-between pb-4 border-b border-dashed border-gray-700/30 mb-6">
              <div className="flex items-center gap-2">
                {activeTool ? (
                  <button onClick={() => setActiveTool(null)} className="text-xs font-bold text-[#2EC4B6] hover:underline uppercase cursor-pointer">
                    ← Back to Menu
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[#2EC4B6] font-black text-xl">⚡</span>
                    <h3 className="font-nav tracking-wider text-xl font-black uppercase">LIFTER TOOLKIT</h3>
                  </div>
                )}
              </div>
              <button onClick={() => { setToolsOpen(false); setActiveTool(null); }} className="text-xs font-bold hover:text-red-400 transition-colors uppercase cursor-pointer">✕ CLOSE</button>
            </div>

            {/* List Menu View */}
            <div className="flex-1 overflow-y-auto pr-1">
              {!activeTool ? (
                <div className="flex flex-col gap-3 font-nav">
                  <div className="text-[10px] font-black tracking-[2px] text-gray-500 uppercase mb-1">01 — Fitness Metrics</div>
                  <button onClick={() => setActiveTool('fat')} className={`w-full text-left p-4 border transition-all text-sm font-bold flex items-center justify-between group cursor-pointer ${isDark ? 'bg-[#161616] border-[#2a2a2a] hover:border-[#2EC4B6]' : 'bg-gray-50 border-[#e0e0e0] hover:border-[#2EC4B6]'}`}>
                    <span>📏 AI Body Fat % Estimator</span> <span className="text-xs text-gray-500 group-hover:text-[#2EC4B6]">→</span>
                  </button>
                  <button onClick={() => setActiveTool('bmi')} className={`w-full text-left p-4 border transition-all text-sm font-bold flex items-center justify-between group cursor-pointer ${isDark ? 'bg-[#161616] border-[#2a2a2a] hover:border-[#2EC4B6]' : 'bg-gray-50 border-[#e0e0e0] hover:border-[#2EC4B6]'}`}>
                    <span>⚖ Dynamic BMI & BMR Calc</span> <span className="text-xs text-gray-500 group-hover:text-[#2EC4B6]">→</span>
                  </button>
                  {/* 🔥 NEW TDEE BUTTON ADDED */}
                  <button onClick={() => setActiveTool('tdee')} className={`w-full text-left p-4 border transition-all text-sm font-bold flex items-center justify-between group cursor-pointer ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white hover:border-[#2EC4B6]' : 'bg-gray-50 border-[#e0e0e0] text-[#121212] hover:border-[#2EC4B6]'}`}>
                    <span>🔥 Total Daily Energy (TDEE) Calculator</span> <span className="text-xs text-gray-500 group-hover:text-[#2EC4B6]">→</span>
                  </button>

                  <div className="text-[10px] font-black tracking-[2px] text-gray-500 uppercase mt-4 mb-1">02 — Personal Trackers</div>
                  <button onClick={() => setActiveTool('tracker')} className={`w-full text-left p-4 border transition-all text-sm font-bold flex items-center justify-between group cursor-pointer ${isDark ? 'bg-[#161616] border-[#2a2a2a] hover:border-[#FF6B35]' : 'bg-gray-50 border-[#e0e0e0] hover:border-[#FF6B35]'}`}>
                    <span>💾 Form Score Tracker</span> <span className="text-xs text-gray-500 group-hover:text-[#FF6B35]">→</span>
                  </button>
                  <button onClick={() => setActiveTool('radar')} className={`w-full text-left p-4 border transition-all text-sm font-bold flex items-center justify-between group cursor-pointer ${isDark ? 'bg-[#161616] border-[#2a2a2a] hover:border-[#FF6B35]' : 'bg-gray-50 border-[#e0e0e0] hover:border-[#FF6B35]'}`}>
                    <span>🎯 Injury Risk Radar</span> <span className="text-xs text-gray-500 group-hover:text-[#FF6B35]">→</span>
                  </button>

                  <div className="text-[10px] font-black tracking-[2px] text-gray-500 uppercase mt-4 mb-1">03 — Gym Math & Code</div>
                  <button onClick={() => setActiveTool('1rm')} className={`w-full text-left p-4 border transition-all text-sm font-bold flex items-center justify-between group cursor-pointer ${isDark ? 'bg-[#161616] border-[#2a2a2a] hover:border-[#2EC4B6]' : 'bg-gray-50 border-[#e0e0e0] hover:border-[#2EC4B6]'}`}>
                    <span>🏋️ 1-Rep Max (1RM) Calculator</span> <span className="text-xs text-gray-500 group-hover:text-[#2EC4B6]">→</span>
                  </button>
                  <button onClick={() => setActiveTool('plate')} className={`w-full text-left p-4 border transition-all text-sm font-bold flex items-center justify-between group cursor-pointer ${isDark ? 'bg-[#161616] border-[#2a2a2a] hover:border-[#2EC4B6]' : 'bg-gray-50 border-[#e0e0e0] hover:border-[#2EC4B6]'}`}>
                    <span>🧮 Barbell Plate Calculator</span> <span className="text-xs text-gray-500 group-hover:text-[#2EC4B6]">→</span>
                  </button>

                  <div className="text-[10px] font-black tracking-[2px] text-gray-500 uppercase mt-4 mb-1">04 — Workout Plans</div>
                  <button onClick={() => setActiveTool('routine')} className={`w-full text-left p-4 border transition-all text-sm font-bold flex items-center justify-between group cursor-pointer ${isDark ? 'bg-[#161616] border-[#2a2a2a] hover:border-[#FF6B35]' : 'bg-gray-50 border-[#e0e0e0] hover:border-[#FF6B35]'}`}>
                    <span>🧠 Smart Routine Swapper</span> <span className="text-xs text-gray-500 group-hover:text-[#FF6B35]">→</span>
                  </button>
                </div>
              ) : (
                <div className="font-nav">
                  {activeTool === 'fat' && <div className="p-4 border border-dashed border-[#2EC4B6]/30 text-center text-xs text-gray-400">📏 Body Fat Calculation Panel!</div>}
                  {activeTool === 'bmi' && <div className="p-4 border border-dashed border-[#2EC4B6]/30 text-center text-xs text-gray-400">⚖ BMI Metric Panel!</div>}
                  {activeTool === 'tdee' && <div className="p-4 border border-dashed border-[#2EC4B6]/30 text-center text-xs text-gray-400">🔥 TDEE Energy Multiplier integration zone coming up!</div>}
                  {activeTool === 'tracker' && <div className="p-4 border border-dashed border-red-400/30 text-center text-xs text-gray-400">💾 History Log!</div>}
                  {activeTool === 'radar' && <div className="p-4 border border-dashed border-red-400/30 text-center text-xs text-gray-400">🎯 Analytics Chart!</div>}
                  {activeTool === '1rm' && (
  <div className="p-4 border border-[#2EC4B6]/30 bg-black/20 rounded-sm font-nav text-sm">
    {/* 🔥 Main Title Highlighted with Bottom Border/Underline */}
    <h4 className="text-sm font-black text-[#2EC4B6] uppercase tracking-wider pb-2 border-b-2 border-[#2EC4B6]/20 mb-4 flex items-center gap-1.5">
      <span>🏋️</span> 1-Rep Max Calculator
    </h4>
    
    <div className="flex flex-col gap-4">
      {/* Weight Input */}
      <div>
        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Weight Lifted (KG)</label>
        <input 
          type="number" 
          value={calcWeight} 
          onChange={(e) => setCalcWeight(e.target.value)}
          placeholder="e.g., 80" 
          className={`w-full p-2.5 border text-xs focus:outline-none focus:border-[#2EC4B6] ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212] placeholder-gray-400'}`}
        />
      </div>

      {/* Reps Input */}
      <div>
        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Reps Performed</label>
        <input 
          type="number" 
          value={calcReps} 
          onChange={(e) => setCalcReps(e.target.value)}
          placeholder="e.g., 6" 
          className={`w-full p-2.5 border text-xs focus:outline-none focus:border-[#2EC4B6] ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212] placeholder-gray-400'}`}
        />
      </div>

      {/* Dynamic Conditional Rendering for Lower Section */}
      {calcWeight && calcReps ? (
        /* Dynamic Live Calculation Output Card */
        <div className="mt-2 p-4 border border-dashed border-[#FF6B35]/30 bg-[#FF6B35]/5 text-center rounded-xs flex flex-col gap-1">
          <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block">Estimated 1-Rep Max</span>
          <span className="text-3xl font-black text-[#FF6B35] tracking-wide my-1">
            {Math.round(parseFloat(calcWeight) * (1 + parseInt(calcReps) / 30))} KG
          </span>
          <span className="text-[10px] text-gray-500 font-medium leading-relaxed">
            Calculated in real-time using the standard Epley math equation.
          </span>
        </div>
      ) : (
        /* Educational Dashboard Layout */
        <div className="mt-2 flex flex-col gap-4">
          <div className="p-3 border border-dashed border-gray-700/30 text-center text-xs text-gray-400 rounded-xs bg-black/5">
            Enter your weight and reps above to dynamically calculate your maximum capacity.
          </div>
          
          {/* Section 1: Reps Percentage Breakdown Quick Table */}
          <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-1.5">
            {/* 🆙 Increased Subheading Size & Weight */}
            <span className="text-[11px] uppercase font-black text-[#2EC4B6] tracking-wider block mb-1.5">
              💡 Reps Strength Conversion Guide
            </span>
            <div className="flex justify-between text-[11px] border-b border-gray-800 pb-1">
              <span className="text-gray-400">1 Rep</span>
              <span className="text-gray-300 font-bold">100% of 1RM</span>
            </div>
            <div className="flex justify-between text-[11px] border-b border-gray-800 pb-1">
              <span className="text-gray-400">5 Reps</span>
              <span className="text-gray-300 font-bold">~87% of 1RM</span>
            </div>
            <div className="flex justify-between text-[11px] border-b border-gray-800 pb-1">
              <span className="text-gray-400">10 Reps</span>
              <span className="text-gray-300 font-bold">~75% of 1RM</span>
            </div>
          </div>

          {/* Section 2: Targeted Training Intensity Guide */}
          <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-2">
            {/* 🆙 Increased Subheading Size & Weight */}
            <span className="text-[11px] uppercase font-black text-[#FF6B35] tracking-wider block mb-1">
              🎯 1RM Intensity Target Zones
            </span>
            <div className="flex flex-col gap-1.5 text-[11px]">
              <div>
                <span className="text-gray-300 font-bold">80-100% 1RM (1-3 Reps):</span>
                <span className="text-gray-400 block pl-1">Promotes overall strength and mechanical power output.</span>
              </div>
              <div>
                <span className="text-gray-300 font-bold">70-80% 1RM (7-12 Reps):</span>
                <span className="text-gray-400 block pl-1">Optimal spectrum for muscle hypertrophy (growth).</span>
              </div>
              <div>
                <span className="text-gray-300 font-bold">~70% 1RM (10-15 Reps):</span>
                <span className="text-gray-400 block pl-1">Builds local muscular endurance and recovery capability.</span>
              </div>
            </div>
          </div>

          {/* Section 3: Safety & Measurement Protocol Checklist */}
          <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-2">
            {/* 🆙 Increased Subheading Size & Weight */}
            <span className="text-[11px] uppercase font-black text-red-400 tracking-wider block mb-1">
              🛡️ Safe Measurement Protocols
            </span>
            <div className="flex flex-col gap-2 text-[11px] text-gray-400 leading-relaxed">
              <p>
                <strong className="text-gray-300">Estimation Method:</strong> Lift a challenging weight for 3-10 reps until form failure. Lower rep ranges yield closer accuracy to your actual 1RM.
              </p>
              <p>
                <strong className="text-gray-300">Direct Method:</strong> Progressively load plates with 2-5 min rest cycles. Always prioritize a spotter and strict form over mechanical ego lifting.
              </p>
            </div>
          </div>

          {/* Section 4: Advanced Plateau Breaking Tactics */}
          <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-2">
            {/* 🆙 Increased Subheading Size & Weight */}
            <span className="text-[11px] uppercase font-black text-[#2EC4B6] tracking-wider block mb-1">
              ⚡ Systems to Improve Your 1RM
            </span>
            <div className="flex flex-col gap-1.5 text-[11px] text-gray-400 leading-relaxed">
              <p>
                <strong className="text-gray-300">Pyramid Sets:</strong> Start with lower weight and higher reps, progressively scaling up the load while dropping the repetition matrix.
              </p>
              <p>
                <strong className="text-gray-300">Compound / Supersets:</strong> Execute back-to-back exercises working surrounding supporting muscle groups without rest to force neural adaptation.
              </p>
              <p>
                <strong className="text-gray-300">Strategic Recovery:</strong> Overtraining actively limits mechanical force output. Ensure deep neurological rest blocks to let muscle tissue rebuild.
              </p>
            </div>
            <span className="text-[9px] text-gray-600 italic block mt-1 border-t border-gray-800 pt-1.5">
              *Epley Formula accuracy peaks between 1 to 10 repetitions.
            </span>
          </div>
        </div>
      )}
    </div>
  </div>
)}
                  {activeTool === 'plate' && <div className="p-4 border border-dashed border-[#2EC4B6]/30 text-center text-xs text-gray-400">🧮 Plate Breakdown!</div>}
                  {activeTool === 'routine' && <div className="p-4 border border-dashed border-red-400/30 text-center text-xs text-gray-400">🧠 AI Workout Builder!</div>}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default Navbar