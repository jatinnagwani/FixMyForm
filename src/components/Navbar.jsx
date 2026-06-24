import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { EXERCISE_REFS } from "../pages/ExerciseData.js"; // 🚀 Connecting metadata structure 

function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [toolsOpen, setToolsOpen] = useState(false)
  const [calcWeight, setCalcWeight] = useState('')
  const [calcReps, setCalcReps] = useState('')
  const [plateWeight, setPlateWeight] = useState('')
  const [manualPlates, setManualPlates] = useState([]); // Tracks manual plate clicks
  const [fatGender, setFatGender] = useState('male')
  const [fatHeight, setFatHeight] = useState('')
  const [fatNeck, setFatNeck] = useState('')
  const [fatWaist, setFatWaist] = useState('')
  const [fatHip, setFatHip] = useState('') // Required only if gender is female
  const [weightUnit, setWeightUnit] = useState('KG')
  const [activeTool, setActiveTool] = useState(null) // 🧠 Tracks active tool view
  const [showSuggestions, setShowSuggestions] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

const [trackerLogs, setTrackerLogs] = useState([]);


const [inputLogExercise, setInputLogExercise] = useState('');
const [inputLogScore, setInputLogScore] = useState('');
const [inputLogIssue, setInputLogIssue] = useState('');
  
  // 🟢 Ensure these 4 Metabolic States are accurately pasted here:
  const [metaWeight, setMetaWeight] = useState('')
  const [metaHeight, setMetaHeight] = useState('')
  const [metaAge, setMetaAge] = useState('')
  const [metaActivity, setMetaActivity] = useState('1.2')


useEffect(() => {
  if (toolsOpen) {
    // Blocks the background page from scrolling
    document.body.style.overflow = 'hidden';
  } else {
    // Restores default scrolling when sidebar is closed
    document.body.style.overflow = 'unset';
  }

  // Cleanup to ensure no scroll lock leaks if component unmounts
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [toolsOpen]);

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
            className="fixed right-0 top-0 w-full max-w-md h-full shadow-2xl flex flex-col p-6 border-l border-dashed transition-all duration-300 overflow-y-auto overscroll-contain"
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
                    <span>⚖ Dynamic BMI & BMR Calculator</span> <span className="text-xs text-gray-500 group-hover:text-[#2EC4B6]">→</span>
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
{activeTool === 'fat' && (() => {
  const h = parseFloat(fatHeight) || 0;
  const n = parseFloat(fatNeck) || 0;
  const w = parseFloat(fatWaist) || 0;
  const hp = parseFloat(fatHip) || 0;
  
  let calculatedBF = null;

  // US Navy Body Fat Formula Execution (Metric Version)
  if (h > 0 && n > 0 && w > 0) {
    if (fatGender === 'male' && w > n) {
      calculatedBF = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else if (fatGender === 'female' && w + hp > n && hp > 0) {
      calculatedBF = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
    }
    if (calculatedBF && (calculatedBF < 2 || calculatedBF > 50)) calculatedBF = null; // Bound protection
  }

  // Helper to find physiological fitness category labels
  const getBFCategory = (bf) => {
    if (fatGender === 'male') {
      if (bf < 6) return { label: 'Essential Fat', color: 'text-red-400' };
      if (bf <= 13) return { label: 'Athletic Spectrum', color: 'text-[#2EC4B6]' };
      if (bf <= 17) return { label: 'Optimal Fitness', color: 'text-green-400' };
      if (bf <= 24) return { label: 'Acceptable Average', color: 'text-yellow-400' };
      return { label: 'Excess Fat / Higher Risk', color: 'text-red-500' };
    } else {
      if (bf < 14) return { label: 'Essential Fat', color: 'text-red-400' };
      if (bf <= 20) return { label: 'Athletic Spectrum', color: 'text-[#2EC4B6]' };
      if (bf <= 24) return { label: 'Optimal Fitness', color: 'text-green-400' };
      if (bf <= 31) return { label: 'Acceptable Average', color: 'text-yellow-400' };
      return { label: 'Excess Fat / Higher Risk', color: 'text-red-500' };
    }
  };

  return (
    <div className="p-4 border border-[#2EC4B6]/30 bg-black/20 rounded-sm font-nav text-sm">
      {/* Main Title Matching the 1RM/Barbell Highlight Style */}
      <h4 className="text-sm font-black text-[#2EC4B6] uppercase tracking-wider pb-2 border-b-2 border-[#2EC4B6]/20 mb-4 flex items-center gap-1.5">
        <span>📏</span> AI Body Fat % Estimator
      </h4>
      
      <div className="flex flex-col gap-3.5">
        {/* Gender Toggle Selector */}
        <div className="flex items-center justify-between bg-[#121212] border border-[#2a2a2a] p-1.5 rounded-xs">
          <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 pl-1">Biological Gender</span>
          <div className="flex gap-1">
            <button 
              onClick={() => setFatGender('male')}
              className={`text-[10px] font-black px-3 py-1 transition-all rounded-xs cursor-pointer ${fatGender === 'male' ? 'bg-[#2EC4B6] text-black shadow-xs' : 'text-gray-400 hover:text-white'}`}
            >
              MALE
            </button>
            <button 
              onClick={() => setFatGender('female')}
              className={`text-[10px] font-black px-3 py-1 transition-all rounded-xs cursor-pointer ${fatGender === 'female' ? 'bg-[#FF6B35] text-white shadow-xs' : 'text-gray-400 hover:text-white'}`}
            >
              FEMALE
            </button>
          </div>
        </div>

        {/* Input Fields Grid Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Height (CM)</label>
            <input 
              type="number" value={fatHeight} onChange={(e) => setFatHeight(e.target.value)} placeholder="e.g., 175" 
              className={`w-full p-2.5 border text-xs focus:outline-none focus:border-[#2EC4B6] ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212] placeholder-gray-400'}`}
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Neck (CM)</label>
            <input 
              type="number" value={fatNeck} onChange={(e) => setFatNeck(e.target.value)} placeholder="e.g., 38" 
              className={`w-full p-2.5 border text-xs focus:outline-none focus:border-[#2EC4B6] ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212] placeholder-gray-400'}`}
            />
          </div>
          <div className={fatGender === 'male' ? 'col-span-2' : 'col-span-1'}>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Waist (CM)</label>
            <input 
              type="number" value={fatWaist} onChange={(e) => setFatWaist(e.target.value)} placeholder="e.g., 84" 
              className={`w-full p-2.5 border text-xs focus:outline-none focus:border-[#2EC4B6] ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212] placeholder-gray-400'}`}
            />
          </div>
          {fatGender === 'female' && (
            <div>
              <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Hips (CM)</label>
              <input 
                type="number" value={fatHip} onChange={(e) => setFatHip(e.target.value)} placeholder="e.g., 92" 
                className={`w-full p-2.5 border text-xs focus:outline-none focus:border-[#2EC4B6] ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212] placeholder-gray-400'}`}
              />
            </div>
          )}
        </div>

        {/* Dynamic Calculation Render Result Box */}
        {calculatedBF ? (
          (() => {
            const category = getBFCategory(calculatedBF);
            return (
              <div className="mt-1 p-4 border border-dashed border-[#FF6B35]/30 bg-[#FF6B35]/5 text-center rounded-xs flex flex-col gap-1.5">
                <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block">Estimated Body Fat Percentage</span>
                <span className="text-3xl font-black text-[#FF6B35] tracking-wide">
                  {calculatedBF.toFixed(1)}%
                </span>
                <span className={`text-xs font-black uppercase tracking-wider ${category.color}`}>
                  Classification: {category.label}
                </span>
              </div>
            );
          })()
        ) : (
          /* 🔥 Ultimate Info Dashboard Layout */
          <div className="mt-1 flex flex-col gap-4">
            <div className="p-3 border border-dashed border-gray-700/30 text-center text-xs text-gray-400 rounded-xs bg-black/5">
              Enter your physical dimensions above to dynamically solve your current body fat matrix.
            </div>

            {/* Section 1: Standard Reference Ranges */}
            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-1.5">
              <span className="text-[11px] uppercase font-black text-[#2EC4B6] tracking-wider block mb-1.5">
                📊 Healthy Body Fat Reference Scale
              </span>
              <div className="flex justify-between text-[11px] border-b border-gray-800 pb-1">
                <span className="text-gray-400">Athletes Range</span>
                <span className="text-gray-300 font-bold">6 - 13% (M) | 14 - 20% (F)</span>
              </div>
              <div className="flex justify-between text-[11px] border-b border-gray-800 pb-1">
                <span className="text-gray-400">Fitness Optimal</span>
                <span className="text-gray-300 font-bold">14 - 17% (M) | 21 - 24% (F)</span>
              </div>
              <div className="flex justify-between text-[11px] border-b border-gray-800 pb-1">
                <span className="text-gray-400">Average Acceptable</span>
                <span className="text-gray-300 font-bold">18 - 24% (M) | 25 - 31% (F)</span>
              </div>
            </div>

            {/* 🔥 NEW Section 2: Jackson & Pollock Age Ideal Targets */}
            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-1.5">
              <span className="text-[11px] uppercase font-black text-[#FF6B35] tracking-wider block mb-1.5">
                📈 Age-Based Ideal Fat Matrices (Jackson & Pollock)
              </span>
              <div className="flex justify-between text-[11px] border-b border-gray-800 pb-1">
                <span className="text-gray-400">Age 20 - 25 Baseline</span>
                <span className="text-gray-300 font-bold">~8.5% - 10.5% (M) | ~17.7% - 18.4% (F)</span>
              </div>
              <div className="flex justify-between text-[11px] border-b border-gray-800 pb-1">
                <span className="text-gray-400">Age 30 - 35 Mid-Tier</span>
                <span className="text-gray-300 font-bold">~12.7% - 13.7% (M) | ~19.3% - 21.5% (F)</span>
              </div>
              <div className="flex justify-between text-[11px] border-b border-gray-800 pb-1">
                <span className="text-gray-400">Age 40 - 45 Mature</span>
                <span className="text-gray-300 font-bold">~15.3% - 16.4% (M) | ~22.2% - 22.9% (F)</span>
              </div>
            </div>

            {/* 🔥 NEW Section 3: Visceral Adipose Risk Assessment */}
            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-2">
              <span className="text-[11px] uppercase font-black text-red-400 tracking-wider block mb-1">
                ⚠️ Pathological Risks of Excess Storage Fat
              </span>
              <div className="flex flex-col gap-1.5 text-[11px] text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-gray-300">Visceral Accumulation:</strong> Deep abdominal fat surrounding internal organs disrupts standard endocrine balance, directly provoking insulin resistance.
                </p>
                <p>
                  <strong className="text-gray-300">Cardiovascular Stress:</strong> High composition triggers cytokine proteins, raising low-density lipoprotein (LDL/Bad Cholesterol) while clogging arterial passages.
                </p>
              </div>
            </div>

            {/* Section 4: Safe Measurement Protocol */}
            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-2">
              <span className="text-[11px] uppercase font-black text-[#2EC4B6] tracking-wider block mb-1">
                🛡️ Standard Measurement Protocol Cues
              </span>
              <div className="flex flex-col gap-1.5 text-[11px] text-gray-400 leading-relaxed">
                <p><strong className="text-gray-300">Morning Fasted State:</strong> Measure first thing in the morning on an empty stomach to avoid dynamic water/food weight fluctuations.</p>
                <p><strong className="text-gray-300">Tape Alignment:</strong> Measure your waist horizontally at the navel line, and your neck just below the larynx (Adam's apple) without compressing the skin tissue.</p>
              </div>
              <span className="text-[9px] text-gray-600 italic block mt-1 border-t border-gray-800 pt-1.5">
                *Uses the official mathematical algorithm standard from the US Navy Circumference Method.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
})()}
                  {activeTool === 'bmi' && (() => {
  const w = parseFloat(metaWeight) || 0;
  const h = parseFloat(metaHeight) || 0;
  const age = parseFloat(metaAge) || 0;

  let bmi = null;
  if (w > 0 && h > 0) bmi = w / ((h / 100) * (h / 100));

  let bmr = null;
  if (w > 0 && h > 0 && age > 0) bmr = (10 * w) + (6.25 * h) - (5 * age) + 5;

  const bmiPrime = bmi ? bmi / 25 : null;

  const getBMICategory = (val) => {
    if (val < 16) return { label: 'Severe Thinness', color: 'text-red-500' };
    if (val < 17) return { label: 'Moderate Thinness', color: 'text-orange-400' };
    if (val < 18.5) return { label: 'Mild Thinness', color: 'text-blue-400' };
    if (val <= 25) return { label: 'Optimal Normal Weight', color: 'text-[#2EC4B6]' };
    if (val <= 30) return { label: 'Overweight Range', color: 'text-yellow-400' };
    if (val <= 35) return { label: 'Obese Class I', color: 'text-orange-500' };
    if (val <= 40) return { label: 'Obese Class II', color: 'text-red-400' };
    return { label: 'Obese Class III (Extreme)', color: 'text-red-600' };
  };

  return (
    <div className="p-4 border border-[#2EC4B6]/30 bg-black/20 rounded-sm font-nav text-sm">
      <h4 className="text-sm font-black text-[#2EC4B6] uppercase tracking-wider pb-2 border-b-2 border-[#2EC4B6]/20 mb-4 flex items-center gap-1.5">
        <span>⚖️</span> Dynamic BMI & BMR Calculator
      </h4>

      <div className="flex flex-col gap-3.5">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Weight (KG)</label>
            <input type="number" value={metaWeight} onChange={(e) => setMetaWeight(e.target.value)} placeholder="70" className={`w-full p-2.5 border text-xs focus:outline-none focus:border-[#2EC4B6] ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212]'}`} />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Height (CM)</label>
            <input type="number" value={metaHeight} onChange={(e) => setMetaHeight(e.target.value)} placeholder="175" className={`w-full p-2.5 border text-xs focus:outline-none focus:border-[#2EC4B6] ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212]'}`} />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Age (Years)</label>
            <input type="number" value={metaAge} onChange={(e) => setMetaAge(e.target.value)} placeholder="22" className={`w-full p-2.5 border text-xs focus:outline-none focus:border-[#2EC4B6] ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212]'}`} />
          </div>
        </div>

        {bmi && bmr ? (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="p-3 border border-[#2a2a2a] bg-[#121212]/40 text-center rounded-xs flex flex-col justify-between">
                <span className="text-[9px] uppercase font-bold text-gray-400 block">Body Mass Index</span>
                <span className="text-xl font-black text-[#FF6B35] block my-0.5">{bmi.toFixed(1)} <span className="text-[9px] text-gray-500 font-normal">top-shelf</span></span>
                <span className={`text-[9px] uppercase font-black leading-tight ${getBMICategory(bmi).color}`}>{getBMICategory(bmi).label}</span>
              </div>
              <div className="p-3 border border-[#2a2a2a] bg-[#121212]/40 text-center rounded-xs flex flex-col justify-between">
                <span className="text-[9px] uppercase font-bold text-gray-400 block">Basal Metabolic Rate</span>
                <span className="text-xl font-black text-[#2EC4B6] block my-0.5">{Math.round(bmr)}</span>
                <span className="text-[9px] text-gray-500 uppercase font-black block">Kcal / Day Baseline</span>
              </div>
            </div>

            {/* 📊 REAL-TIME BMI SPEEDOMETER GAUGE */}
            {(() => {
              const minBmi = 15;
              const maxBmi = 35;
              let percentage = ((bmi - minBmi) / (maxBmi - minBmi)) * 100;
              if (percentage < 2) percentage = 2;
              if (percentage > 98) percentage = 98;

              return (
                <div className="p-3 border border-[#2a2a2a] bg-[#121212]/60 rounded-xs flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-wider text-gray-400">
                    <span>⚡ BMI Spectrum Gauge</span>
                    <span className="text-gray-500">Prime: {bmiPrime?.toFixed(2)}</span>
                  </div>
                  <div className="relative w-full h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-[#2EC4B6] via-yellow-400 via-orange-500 to-red-500 mt-1">
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-500 ease-out z-10" style={{ left: `${percentage}%` }}>
                      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px] border-b-white transform rotate-180 -mt-2 mb-0.5"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-white border border-black shadow-md flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[9px] font-bold text-gray-500 px-0.5">
                    <span className="text-blue-400">15 (Thin)</span>
                    <span className="text-[#2EC4B6]">22 (Optimal)</span>
                    <span className="text-yellow-400">27 (Bulk)</span>
                    <span className="text-red-500">35+ (Obese)</span>
                  </div>
                </div>
              );
            })()}

            {/* WHO Exhaustive Reference Table */}
            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-1.5 text-[11px]">
              <span className="text-[11px] uppercase font-black text-[#2EC4B6] tracking-wider block mb-1">📊 WHO Weight Breakdown Scale</span>
              <div className="flex justify-between border-b border-gray-800 pb-1"><span className="text-gray-400">Severe / Moderate Thinness</span><span className="text-red-400 font-bold">&lt; 16.0 – 17.0</span></div>
              <div className="flex justify-between border-b border-gray-800 pb-1"><span className="text-gray-400">Mild Thinness Baseline</span><span className="text-blue-400 font-bold">17.0 – 18.5</span></div>
              <div className="flex justify-between border-b border-gray-800 pb-1"><span className="text-gray-400">Normal Weight Target Zone</span><span className="text-[#2EC4B6] font-bold">18.5 – 25.0</span></div>
              <div className="flex justify-between border-b border-gray-800 pb-1"><span className="text-gray-400">Overweight Corpulence Phase</span><span className="text-yellow-400 font-bold">25.0 – 30.0</span></div>
              <div className="flex justify-between border-b border-gray-800 pb-1"><span className="text-gray-400">Obese Class I / II / III Matrix</span><span className="text-red-500 font-bold">30.0 to &ge; 40.0</span></div>
            </div>
          </div>
        ) : (
          <div className="mt-1 flex flex-col gap-4">
            <div className="p-3 border border-dashed border-gray-700/30 text-center text-xs text-gray-400 rounded-xs bg-black/5">Enter stats above to isolate baseline body mass index and rest metabolism.</div>
            
            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-1.5">
              <span className="text-[11px] uppercase font-black text-[#2EC4B6] tracking-wider block mb-1">🧬 Muscle Mass & BMR Hypertrophy</span>
              <p className="text-[11px] text-gray-400 leading-relaxed"><strong className="text-gray-300">Anaerobic Weight Lifting:</strong> Building dense skeletal muscle mass scales up resting energy consumption because active tissue demands continuous upkeep calories even when completely idle.</p>
              <p className="text-[11px] text-gray-400 leading-relaxed"><strong className="text-gray-300">The Diet Starvation Trap:</strong> Severe food restriction can force your body's rest metabolism to drop by up to 30%, sacrificing physical energy and brain function.</p>
            </div>

            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-1.5">
              <span className="text-[11px] uppercase font-black text-[#FF6B35] tracking-wider block mb-0.5">📐 Advanced Metric: The Ponderal Index (PI)</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">Unlike BMI which squares your height, the <strong className="text-gray-300">Ponderal Index cubes it ($mass/height^3$)</strong>. This mathematical adjustment yields significantly more reliable leanness data for extremely tall or short lifters.</p>
            </div>

            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-1.5">
              <span className="text-[11px] uppercase font-black text-[#2EC4B6] tracking-wider block mb-0.5">👦 CDC Youth Percentiles (Ages 2-20)</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">For teenagers and children, raw BMI numbers don't work. The CDC maps weight tracking based on growth percentiles: <strong className="text-blue-400">&lt;5% is Underweight</strong>, <strong className="text-[#2EC4B6]">5%-85% is Healthy</strong>, and <strong className="text-red-400">&gt;95% is classified as Overweight</strong>.</p>
            </div>

            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-2">
              <span className="text-[11px] uppercase font-black text-red-400 tracking-wider block mb-1">⚠️ Extreme Deviation Pathology Risks</span>
              <p className="text-[11px] text-gray-400 leading-relaxed"><strong className="text-gray-300">Overweight Extent:</strong> Elevates systemic blood pressure, type-II insulin complications, and chronic joint degradation (Osteoarthritis).</p>
              <p className="text-[11px] text-gray-400 leading-relaxed"><strong className="text-gray-300">Underweight Extent:</strong> Triggers vitamin deficiencies, high anemia stress, bone tissue weakness (Osteoporosis), and degraded recovery response.</p>
            </div>

            <div className="p-2 bg-[#121212] border border-gray-800 rounded-xs text-[10px] text-gray-500 leading-normal italic">*Efficacy Note: BMI is an overall mass calculator that cannot distinguish muscle from visceral fat. Muscular bodybuilders may map as "Overweight" despite elite conditioning.</div>
          </div>
        )}
      </div>
    </div>
  );
})()}
                  {/* 2. 🔥 THE ULTIMATE SPECIALIZED SHOWSTOPPER TDEE CALCULATOR */}
{activeTool === 'tdee' && (() => {
  // Strict text state capture checking
  const w = parseFloat(metaWeight);
  const h = parseFloat(metaHeight);
  const age = parseFloat(metaAge);
  const activity = parseFloat(metaActivity) || 1.2;

  // Strict structural evaluation activation parameter
  // User ne jab tak manually type nahi kiya, hasInputs explicitly FALSE rahega
  const hasInputs = metaWeight && metaHeight && metaAge && !isNaN(w) && !isNaN(h) && !isNaN(age);

  let bmr = null;
  if (hasInputs) {
    const isMale = fatGender === 'male'; 
    bmr = (10 * w) + (6.25 * h) - (5 * age) + (isMale ? 5 : -161);
  }
  const tdee = bmr ? bmr * activity : 0; // Fallback directly to 0 if no explicit active input strings found

  const isMale = fatGender === 'male';
  const activeColor = isMale ? '#FF6B35' : '#00F5D4';
  const focusClass = isMale ? 'focus:border-[#FF6B35]' : 'focus:border-[#00F5D4]';

  return (
    <div className="p-4 border bg-[#0d0d0d]/90 rounded-sm font-nav text-sm relative overflow-hidden transition-all duration-300" style={{ borderColor: `${activeColor}40`, boxShadow: `0 0 40px ${activeColor}08` }}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,53,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,53,0.01)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" style={{ backgroundImage: `linear-gradient(${activeColor}05 1px, transparent 1px), linear-gradient(90deg, ${activeColor}05 1px, transparent 1px)` }} />

      <h4 className="text-sm font-black uppercase tracking-wider pb-2 border-b-2 border-gray-800/80 mb-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5 font-ops">

          <span className="text-[#00F5D4]">🔥 Total Daily Energy (TDEE) Calculator</span>
        </div>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeColor }}></span>
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: activeColor }}></span>
        </span>
      </h4>
      
      <div className="flex flex-col gap-4 relative z-10">
        {/* Gender Multiplier Profile Toggle */}
        <div className="flex items-center justify-between bg-[#121212] border border-[#2a2a2a] p-1.5 rounded-xs">
          <span className="text-[9px] uppercase font-black tracking-widest text-gray-400 pl-1">Metabolic Multiplier Profile</span>
          <div className="flex gap-1">
            <button 
              onClick={() => setFatGender('male')}
              className={`text-[9px] font-black px-3 py-1 transition-all rounded-xs cursor-pointer ${isMale ? 'bg-[#FF6B35] text-black shadow-xs' : 'text-gray-500 hover:text-white'}`}
            >
              MALE (+5)
            </button>
            <button 
              onClick={() => setFatGender('female')}
              className={`text-[9px] font-black px-3 py-1 transition-all rounded-xs cursor-pointer ${!isMale ? 'bg-[#00F5D4] text-black shadow-xs' : 'text-gray-500 hover:text-white'}`}
            >
              FEMALE (-161)
            </button>
          </div>
        </div>

        {/* Core Dimensions Arrays */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-[9px] uppercase font-black text-gray-400 block mb-1 tracking-widest">Weight (KG)</label>
            <input 
              type="number" value={metaWeight} onChange={(e) => setMetaWeight(e.target.value)} placeholder="e.g., 70" 
              className={`w-full p-2.5 border text-xs font-bold focus:outline-none transition-all rounded-xs bg-[#121212] border-[#2a2a2a] text-white placeholder-gray-700 ${focusClass}`} 
            />
          </div>
          <div>
            <label className="text-[9px] uppercase font-black text-gray-400 block mb-1 tracking-widest">Height (CM)</label>
            <input 
              type="number" value={metaHeight} onChange={(e) => setMetaHeight(e.target.value)} placeholder="e.g., 175" 
              className={`w-full p-2.5 border text-xs font-bold focus:outline-none transition-all rounded-xs bg-[#121212] border-[#2a2a2a] text-white placeholder-gray-700 ${focusClass}`} 
            />
          </div>
          <div>
            <label className="text-[9px] uppercase font-black text-gray-400 block mb-1 tracking-widest">Age (Yrs)</label>
            <input 
              type="number" value={metaAge} onChange={(e) => setMetaAge(e.target.value)} placeholder="e.g., 22" 
              className={`w-full p-2.5 border text-xs font-bold focus:outline-none transition-all rounded-xs bg-[#121212] border-[#2a2a2a] text-white placeholder-gray-700 ${focusClass}`} 
            />
          </div>
        </div>

        {/* Activity Selection Matrix */}
        <div>
          <label className="text-[9px] uppercase font-black text-gray-400 block mb-1 tracking-widest">Activity Matrix Multiplier</label>
          <select 
            value={metaActivity} onChange={(e) => setMetaActivity(e.target.value)} 
            className={`w-full p-2.5 border text-xs font-bold focus:outline-none bg-[#121212] border-[#2a2a2a] text-white rounded-xs cursor-pointer transition-colors ${focusClass}`}
          >
            <option value="1.2">Sedentary (Zero Purposeful Gym / Desk Job)</option>
            <option value="1.375">Light Activity (Casual Training 1-3 Days/Week)</option>
            <option value="1.55">Moderate Activity (Intense Lifting 3-5 Days/Week)</option>
            <option value="1.725">Heavy Athlete (Vicious Compound Lifting 6-7 Days/Week)</option>
          </select>
        </div>

        {/* 🎬 DYNAMIC SWITCH FOR OUTPUT OR INFORMATION LOG PANEL */}
        {hasInputs ? (
          <div className="flex flex-col gap-3.5 mt-1 animate-fadeIn">
            {/* Dual Glow Dynamic Cyber Card Box */}
            <div className="p-4 border-y border-dashed bg-gradient-to-br from-[#FF6B35]/5 via-transparent to-[#00F5D4]/5 text-center rounded-sm relative transition-all" style={{ borderLeft: `4px solid ${isMale ? '#FF6B35' : '#00F5D4'}`, borderRight: `4px solid ${isMale ? '#00F5D4' : '#FF6B35'}` }}>
              <span className="text-[9px] uppercase font-black tracking-widest text-gray-400 block">TOTAL DAILY ENERGY EXPENDITURE</span>
              <span className="text-3xl font-black text-white tracking-wide my-1.5 block">
                {Math.round(tdee)} <span className="text-xs font-black px-1.5 py-0.5 text-black rounded-xs tracking-normal" style={{ background: `linear-gradient(90deg, #FF6B35, #00F5D4)` }}>KCAL/DAY</span>
              </span>
              <div className="text-[10px] text-gray-500 font-bold border-t border-gray-800/80 pt-2 flex justify-center gap-4">
                <span>BMR Base: <strong style={{ color: isMale ? '#00F5D4' : '#FF6B35' }}>{Math.round(bmr)}</strong></span>
                <span className="text-gray-700">|</span>
                <span>Active Multiplier: <strong style={{ color: isMale ? '#FF6B35' : '#00F5D4' }}>x{activity}</strong></span>
              </div>
            </div>

            {/* Target Strategy Adaptation Panels */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider block mb-0.5">🎯 Target Strategy Adaptations</span>
              <div className="p-3 border border-[#2a2a2a] bg-gradient-to-r from-[#00F5D4]/5 to-transparent rounded-xs flex items-center justify-between border-l-2 border-l-[#00F5D4] hover:bg-black/40 transition-all group">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-black text-white uppercase group-hover:text-[#00F5D4] transition-colors">Clean Muscle Bulk (+15%)</span>
                  <span className="text-[9px] text-gray-500 leading-none">Controlled energy surplus optimized for direct protein synthesis.</span>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <span className="text-base font-black text-[#00F5D4] tracking-wide block">{Math.round(tdee + 300)}</span>
                  <span className="text-[8px] uppercase text-gray-600 font-bold block">Kcal / Day</span>
                </div>
              </div>

              <div className="p-3 border border-[#2a2a2a] bg-gradient-to-r from-[#FF6B35]/5 to-transparent rounded-xs flex items-center justify-between border-l-2 border-l-[#FF6B35] hover:bg-black/40 transition-all group">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-black text-white uppercase group-hover:text-[#FF6B35] transition-colors">Aggressive Fat Cut (-500)</span>
                  <span className="text-[9px] text-gray-500 leading-none">Forcing adipose tissue utilization via systemic calorie deficit.</span>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <span className="text-base font-black text-[#FF6B35] tracking-wide block">{Math.round(tdee - 500)}</span>
                  <span className="text-[8px] uppercase text-gray-600 font-bold block">Kcal / Day</span>
                </div>
              </div>
            </div>

            {/* Metabolism Allocation Section */}
            <div className="border border-[#2a2a2a] bg-[#121212]/60 rounded-xs p-3 flex flex-col gap-2.5">
              <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider block border-b border-gray-800/80 pb-1.5">📊 Metabolism Allocation Metrics</span>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-0.5">
                    <span>Basal Metabolism (Organ Upkeep)</span>
                    <span className="text-[#00F5D4]">~70%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full"><div className="w-[70%] h-full bg-[#00F5D4]" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-0.5">
                    <span>Workout Output & Motion</span>
                    <span className="text-[#FF6B35]">~20%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full"><div className="w-[20%] h-full bg-[#FF6B35]" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-0.5">
                    <span>Thermic Effect of Digestion (TEF)</span>
                    <span className="text-yellow-500">~10%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full"><div className="w-[10%] h-full bg-yellow-500" /></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Space High-Density Info Layout Panels (Triggers when empty) */
          <div className="mt-1 flex flex-col gap-3.5 animate-fadeIn">
            <div className="p-3 border border-dashed border-gray-800 bg-black/10 text-center text-xs text-gray-500 rounded-xs font-medium">
              Enter specifications matrix above to compute your precise active metabolic profile.
            </div>

            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-1.5">
              <span className="text-[11px] uppercase font-black text-[#FF6B35] tracking-wider block mb-1">
                🚀 The First Law of Thermodynamics
              </span>
              <div className="flex flex-col gap-2 text-[11px] text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-gray-300">Energy Balance Matrix:</strong> TDEE is an active calculation of your biological daily energy cost. Consuming calories above this line forces a weight surplus, while dropping below it creates fat oxidation.
                </p>
                <p>
                  <strong className="text-gray-300">The 26% Variance Clause:</strong> Modern 2005 medical meta-analyses confirm that due to unseen genetic variables, even the most perfect formulas possess an implicit variance window between tracking lines.
                </p>
              </div>
            </div>

            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-1.5">
              <span className="text-[11px] uppercase font-black text-[#2EC4B6] tracking-wider block mb-1">
                📝 The Modern Progression Protocol
              </span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Since all digital math options are statistical estimates, the ultimate bodybuilding progression method is maintaining an exact daily log of food ingestion weights combined with strength tracking metrics over 2-3 week testing cycles.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
})()}
                  {/* 💾 MODULAR FORM SCORE TRACKER PANEL */}
{activeTool === 'tracker' && (() => {
  const handleAddLog = (e) => {
    e.preventDefault();
    if (!inputLogExercise || !inputLogScore) return;
    
    const newLog = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      exercise: inputLogExercise,
      score: Math.min(100, Math.max(0, parseInt(inputLogScore) || 0)),
      issue: inputLogIssue || 'Form optimized / Clear rep profile'
    };
    
    setTrackerLogs([newLog, ...trackerLogs]);
    setInputLogExercise('');
    setInputLogScore('');
    setInputLogIssue('');
  };

  return (
    <div className="p-4 border border-red-500/30 bg-[#0d0d0d]/90 rounded-sm font-nav text-sm relative overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.05)]">
      <h4 className="text-sm font-black text-red-500 uppercase tracking-wider pb-2 border-b-2 border-red-500/20 mb-4 flex items-center gap-1.5 font-ops">
        <span>💾</span> Tactical Form Score Tracker
      </h4>

      {/* Interactive Telemetry Log Submission Form */}
      <form onSubmit={handleAddLog} className="flex flex-col gap-3 bg-[#121212] border border-[#2a2a2a] p-3 rounded-xs mb-4">
        <span className="text-[10px] uppercase font-black tracking-widest text-gray-400 block mb-0.5">Log Fresh Form Telemetry</span>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[9px] uppercase font-bold text-gray-500 block mb-1">Exercise Name</label>
            <input 
              type="text" value={inputLogExercise} onChange={(e) => setInputLogExercise(e.target.value)} placeholder="e.g., Barbell Squat" 
              className="w-full p-2 bg-[#161616] border border-[#2a2a2a] text-xs font-bold text-white focus:outline-none focus:border-red-500 rounded-xs"
            />
          </div>
          <div>
            <label className="text-[9px] uppercase font-bold text-gray-500 block mb-1">AI Score %</label>
            <input 
              type="number" value={inputLogScore} onChange={(e) => setInputLogScore(e.target.value)} placeholder="e.g., 90" 
              className="w-full p-2 bg-[#161616] border border-[#2a2a2a] text-xs font-bold text-white focus:outline-none focus:border-red-500 rounded-xs"
            />
          </div>
        </div>
        <div>
          <label className="text-[9px] uppercase font-bold text-gray-500 block mb-1">AI Critical Dev Notes / Flaws</label>
          <input 
            type="text" value={inputLogIssue} onChange={(e) => setInputLogIssue(e.target.value)} placeholder="e.g., Hip shift / Excessive knee forward" 
            className="w-full p-2 bg-[#161616] border border-[#2a2a2a] text-xs font-bold text-white focus:outline-none focus:border-red-500 rounded-xs"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest transition-all rounded-xs active:scale-[0.98] mt-1 cursor-pointer">
          DEPLOY REPOSIT_ METRIC
        </button>
      </form>

      {/* Dynamic Render Loop for Saved Data Database */}
      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
        <span className="text-[10px] uppercase font-black tracking-wider text-gray-500 block">Historical Tracking Sequence</span>
        
        {trackerLogs.length === 0 ? (
          <div className="p-4 border border-dashed border-gray-800 text-center text-xs text-gray-500 italic">No telemetry logged yet. Scan and check your form to initialize tracking sequence.</div>
        ) : (
          trackerLogs.map(log => (
            <div key={log.id} className="p-2.5 border border-gray-800/80 bg-black/40 rounded-xs flex flex-col gap-1.5">
              <div className="flex justify-between items-center border-b border-gray-900 pb-1">
                <span className="text-white font-black text-xs uppercase">{log.exercise}</span>
                <span className="text-[9px] text-gray-600 font-bold">{log.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-gray-400 leading-normal max-w-[80%] italic">"{log.issue}"</span>
                <span className={`text-sm font-black ${log.score >= 80 ? 'text-[#2EC4B6]' : log.score >= 65 ? 'text-yellow-400' : 'text-red-500'}`}>
                  {log.score}%
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
})()}
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
{activeTool === 'plate' && (() => {
  const targetWeight = parseFloat(plateWeight) || 0;
  const barbellWeight = weightUnit === 'KG' ? 20 : 45; // 20kg or 45lbs standard bar
  
  const availablePlatesKG = [20, 15, 10, 5, 2.5];
  const availablePlatesLB = [45, 35, 25, 10, 5, 2.5];
  const availablePlates = weightUnit === 'KG' ? availablePlatesKG : availablePlatesLB;

  // 1. Auto Mode Sorting Math
  let autoPlates = [];
  if (targetWeight > barbellWeight) {
    let currentRemainder = (targetWeight - barbellWeight) / 2;
    availablePlates.forEach(plate => {
      while (currentRemainder >= plate) {
        autoPlates.push(plate);
        currentRemainder -= plate;
      }
    });
  }

  const activeDisplayPlates = targetWeight > 0 ? autoPlates : manualPlates;
  const currentTotalWeight = targetWeight > 0 
    ? targetWeight 
    : barbellWeight + (manualPlates.reduce((a, b) => a + b, 0) * 2);

  // Dynamic Plate Color Spec Mapping
  const plateColors = {
    // KG Plates
    20: 'bg-blue-600 border-blue-400 text-white',
    15: 'bg-yellow-500 border-yellow-300 text-black',
    10: 'bg-green-600 border-green-400 text-white',
    5: 'bg-red-600 border-red-400 text-white',
    2.5: 'bg-gray-500 border-gray-400 text-white',
    // LB Plates Mapping
    45: 'bg-blue-600 border-blue-400 text-white',
    35: 'bg-yellow-500 border-yellow-300 text-black',
    25: 'bg-green-600 border-green-400 text-white',
  };

  const handlePlateClick = (plate) => {
    if (targetWeight > 0) setPlateWeight('');
    setManualPlates([...manualPlates, plate]);
  };

  // Undo Last Plate Logic
  const handleUndoPlate = () => {
    setManualPlates(manualPlates.slice(0, -1));
  };

  // Unit Toggle Converter Engine
  const toggleUnit = (unit) => {
    if (weightUnit === unit) return;
    setWeightUnit(unit);
    
    // Convert current values to new metric system smoothly
    if (targetWeight > 0) {
      const converted = unit === 'LB' ? targetWeight * 2.20462 : targetWeight / 2.20462;
      setPlateWeight(Math.round(converted).toString());
    } else {
      setManualPlates([]); // Reset manual plates on conversion to prevent spec mixing
    }
  };

  return (
    <div className="p-4 border border-[#2EC4B6]/30 bg-black/20 rounded-sm font-nav text-sm">
      {/* Main Title Highlighted with Bottom Border */}
      <h4 className="text-sm font-black text-[#2EC4B6] uppercase tracking-wider pb-2 border-b-2 border-[#2EC4B6]/20 mb-4 flex items-center gap-1.5">
        <span>🧮</span> Barbell Plate Calculator
      </h4>
      
      <div className="flex flex-col gap-4">
        {/* METRIC UNIT TOGGLE SWITCH ENGINE */}
        <div className="flex items-center justify-between bg-[#121212] border border-[#2a2a2a] p-1.5 rounded-xs">
          <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 pl-1">Target Weight Unit</span>
          <div className="flex gap-1">
            <button 
              onClick={() => toggleUnit('KG')}
              className={`text-[10px] font-black px-3 py-1 transition-all rounded-xs cursor-pointer ${weightUnit === 'KG' ? 'bg-[#2EC4B6] text-black shadow-xs' : 'text-gray-400 hover:text-white'}`}
            >
              KG (Metric)
            </button>
            <button 
              onClick={() => toggleUnit('LB')}
              className={`text-[10px] font-black px-3 py-1 transition-all rounded-xs cursor-pointer ${weightUnit === 'LB' ? 'bg-[#FF6B35] text-white shadow-xs' : 'text-gray-400 hover:text-white'}`}
            >
              LB (Imperial)
            </button>
          </div>
        </div>

        {/* Input Block */}
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
            Total Target Weight ({weightUnit})
          </label>
          <input 
            type="number" 
            value={plateWeight} 
            onChange={(e) => {
              setPlateWeight(e.target.value);
              setManualPlates([]);
            }}
            placeholder={`e.g., ${weightUnit === 'KG' ? '60' : '135'} (includes ${barbellWeight}${weightUnit} bar)`} 
            className={`w-full p-2.5 border text-xs focus:outline-none focus:border-[#2EC4B6] ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212] placeholder-gray-400'}`}
          />
        </div>

        {/* DYNAMIC VISUAL BARBELL GRAPHIC ENGINE */}
        <div className="my-2 p-4 bg-[#121212] border border-[#2a2a2a] rounded-xs flex flex-col items-center justify-center gap-2 min-h-[120px]">
          <span className="text-[10px] uppercase font-black tracking-wider text-gray-500">Live Barbell Visualization</span>
          
          <div className="w-full flex items-center justify-center relative py-4">
            {/* Left Sleeve Loaded Plates */}
            <div className="flex flex-row-reverse gap-0.5 items-center justify-start h-12 w-1/3 pr-1">
              {activeDisplayPlates.map((plate, idx) => (
                <div key={`l-${idx}`} className={`w-3 flex items-center justify-center rounded-xs border text-[8px] font-black writing-mode-vertical h-12 ${plateColors[plate] || 'bg-gray-700 text-white border-gray-600'}`}>
                  {plate}
                </div>
              ))}
            </div>

            {/* Core Center Shaft & Sleeves */}
            <div className="w-2/5 h-2 bg-gray-600 rounded-full relative flex items-center justify-between">
              <div className="w-2 h-6 bg-gray-400 rounded-xs absolute -left-1"></div>
              <div className="w-full text-center text-[10px] font-black text-white mix-blend-difference">
                {currentTotalWeight} {weightUnit}
              </div>
              <div className="w-2 h-6 bg-gray-400 rounded-xs absolute -right-1"></div>
            </div>

            {/* Right Sleeve Loaded Plates */}
            <div className="flex flex-row gap-0.5 items-center justify-start h-12 w-1/3 pl-1">
              {activeDisplayPlates.map((plate, idx) => (
                <div key={`r-${idx}`} className={`w-3 flex items-center justify-center rounded-xs border text-[8px] font-black writing-mode-vertical h-12 ${plateColors[plate] || 'bg-gray-700 text-white border-gray-600'}`}>
                  {plate}
                </div>
              ))}
            </div>
          </div>
          
          {/* UPGRADED MODULAR CONTROL BUTTON ZONE */}
          {manualPlates.length > 0 && (
            <div className="flex gap-4 mt-2">
              <button 
                onClick={handleUndoPlate}
                className="text-[10px] uppercase font-black text-[#2EC4B6] hover:text-[#2EC4B6]/80 tracking-wider cursor-pointer transition-all border border-[#2EC4B6]/20 px-2 py-0.5 rounded-xs"
              >
                &larr; Undo Last Plate
              </button>
              <button 
                onClick={() => setManualPlates([])}
                className="text-[10px] uppercase font-black text-red-400 hover:text-red-300 tracking-wider cursor-pointer transition-all border border-red-500/20 px-2 py-0.5 rounded-xs"
              >
                Clear All Plates
              </button>
            </div>
          )}
        </div>

        {/* INTERACTIVE CLICK REPOSITORY ZONE */}
        <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-2">
          <span className="text-[11px] uppercase font-black text-[#2EC4B6] tracking-wider block mb-1.5">
            💡 Interactive Plate Click Inventory ({weightUnit})
          </span>
          <p className="text-[10px] text-gray-400 mb-1">Tap a plate below to manually load it to both sides of the shaft:</p>
          <div className="flex flex-wrap gap-2 justify-between">
            {availablePlates.map(plate => (
              <button
                key={plate}
                onClick={() => handlePlateClick(plate)}
                className={`flex-1 min-w-[50px] p-2 text-center text-xs font-black border rounded-xs transition-all hover:scale-105 active:scale-95 cursor-pointer ${plateColors[plate] || 'bg-gray-800 text-white border-gray-700'}`}
              >
                +{plate}{weightUnit.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Space Filler Check */}
        {!plateWeight && manualPlates.length === 0 && (
          <div className="flex flex-col gap-4 mt-1">
            {/* 🔥 Gyaan Box 1: Standard Barbell Weight Classes */}
            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-1.5">
              <span className="text-[11px] uppercase font-black text-[#2EC4B6] tracking-wider block mb-1.5">
                📊 Standard Barbell Weight Specs
              </span>
              <div className="flex justify-between text-[11px] border-b border-gray-800 pb-1">
                <span className="text-gray-400">Olympic Standard Bar</span>
                <span className="text-gray-300 font-bold">20 KG / 45 LBS</span>
              </div>
              <div className="flex justify-between text-[11px] border-b border-gray-800 pb-1">
                <span className="text-gray-400">Women's Olympic Bar</span>
                <span className="text-gray-300 font-bold">15 KG / 33 LBS</span>
              </div>
              <div className="flex justify-between text-[11px] border-b border-gray-800 pb-1">
                <span className="text-gray-400">Standard Technical Bar</span>
                <span className="text-gray-300 font-bold">10 KG / 22 LBS</span>
              </div>
            </div>

            {/* 🔥 Gyaan Box 2: Warm-up Ramping Guidelines */}
            <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-2">
              <span className="text-[11px] uppercase font-black text-[#FF6B35] tracking-wider block mb-1">
                🚀 Pyramid Warm-Up Ramping Protocol
              </span>
              <div className="flex flex-col gap-1.5 text-[11px] text-gray-400 leading-relaxed">
                <div>
                  <span className="text-gray-300 font-bold">Set 1 (Activation):</span>
                  <span className="text-gray-400 block pl-1">Empty Barbell x 10-12 controlled reps to lubricate joints.</span>
                </div>
                <div>
                  <span className="text-gray-300 font-bold">Set 2 (Acclimation):</span>
                  <span className="text-gray-400 block pl-1">Load 50% of your target weight matrix x 5 smooth reps.</span>
                </div>
                <div>
                  <span className="text-gray-300 font-bold">Set 3 (Neural Prep):</span>
                  <span className="text-gray-400 block pl-1">Load 80% of your target weight matrix x 1-2 heavy reps before working sets.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Standard Loading Protocols */}
        <div className="border border-[#2a2a2a] bg-[#121212]/40 rounded-xs p-3 flex flex-col gap-2">
          <span className="text-[11px] uppercase font-black text-[#FF6B35] tracking-wider block mb-1">
            🛡️ Barbell Loading Protocol
          </span>
          <div className="flex flex-col gap-1.5 text-[11px] text-gray-400 leading-relaxed">
            <p><strong className="text-gray-300">Always Collar Lock:</strong> Dynamic heavy lifting shifts plates horizontally. Use spring collars to secure the loaded mechanical sleeve.</p>
            <p><strong className="text-gray-300">Load Progressively:</strong> Load heavy plates internal to the sleeves first, followed by incremental fraction plates to balance the moment arm.</p>
          </div>
        </div>
      </div>
    </div>
  );
})()}
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