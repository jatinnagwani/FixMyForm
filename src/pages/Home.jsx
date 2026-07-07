import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'



function Home({ theme, setToolsOpen }) {
  const isDark = theme === 'dark'

  const surface = isDark ? '#161616' : '#ffffff'
  const border = isDark ? '#2a2a2a' : '#e0e0e0'
  
  // 🧠 State for dynamic subtitle switcher
  const subtitles = ["AI-Powered Form Coach", "Instant Rep Analyzer", "Injury Prevention Engine"]
  const [subIndex, setSubIndex] = useState(0)

  // 🎨 CYBERPUNK COLOR ENGINE FOR HEADLINES (Added here inside the function!)
// 🎨 EXPANDED CYBERPUNK COLOR ENGINE (15 Theme-matched colors)
  const cyberColors = [
    'text-[#FF6B35]', // Brand Solid Orange
    'text-[#2EC4B6]', // Brand Neon Teal
    'text-[#00F5D4]', // Cyber Cyan Bright
    'text-purple-500', // Electric Purple
    'text-yellow-400', // Warning Yellow
    'text-pink-500',  // Cyber Pink
    'text-green-400', // Matrix Green
    'text-blue-500',  // Hologram Blue
    'text-rose-500',  // Blood Rose
    'text-fuchsia-500',// Neon Magenta
    'text-amber-500', // Solar Amber
    'text-indigo-400', // Deep Space Indigo
    'text-lime-400',  // Toxic Lime
    'text-cyan-400',  // Ice Cyan
    'text-red-500'    // Danger Red
  ];

  const [colorHarder, setColorHarder] = useState('text-[#FF6B35]');
  const [colorRight, setColorRight] = useState('text-[#2EC4B6]');
  const [colorFixing, setColorFixing] = useState('text-[#FF6B35]');

  const handleHoverHarder = () => {
    setColorHarder(cyberColors[Math.floor(Math.random() * cyberColors.length)]);
  };
  const handleHoverRight = () => {
    setColorRight(cyberColors[Math.floor(Math.random() * cyberColors.length)]);
  };
  const handleHoverFixing = () => {
    setColorFixing(cyberColors[Math.floor(Math.random() * cyberColors.length)]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSubIndex((prev) => (prev + 1) % subtitles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`min-h-screen ${isDark ? 'text-white' : 'text-[#121212]'} bg-transparent`}>

      {/* Hero */}
      <section className="flex items-center px-4 sm:px-8 lg:px-16 pt-24 pb-16 relative overflow-hidden">

        <div className="absolute top-1/4 right-[5%] w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(46,196,182,0.05) 0%, transparent 70%)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Left */}
          <div>
<div className="inline-flex items-center gap-2 border border-[rgba(255,107,53,0.3)] bg-[rgba(255,107,53,0.1)] px-4 py-1.5 mb-8 min-w-[210px]">
  <div className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full" style={{ animation: 'pulse 1.5s infinite' }} />
  <span className="text-xs font-bold tracking-[2px] uppercase text-[#FF6B35] transition-all duration-500">
    {subtitles[subIndex]}
  </span>
</div>

<h1 className="font-heading uppercase leading-[0.95] tracking-wide mb-6"
              style={{ fontSize: 'clamp(4rem, 9vw, 9rem)' }}>
              TRAIN<br />
              <span 
                onMouseEnter={handleHoverHarder} 
                className={`${colorHarder} transition-colors duration-300 cursor-default inline-block hover:scale-[1.02]`}
              >
                HARDER.
              </span><br />
              LIFT <br /><span 
                onMouseEnter={handleHoverRight} 
                className={`${colorRight} transition-colors duration-300 cursor-default inline-block hover:scale-[1.02]`}
              >
                SMARTER.
              </span>
            </h1>

            <p className={`text-base lg:text-lg leading-relaxed max-w-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Stop guessing your form. Upload your exercise photo and get{' '}
              <strong className={isDark ? 'text-white' : 'text-[#121212]'}>INSTANT AI FEEDBACK</strong>
              {' '}on what's right, what's wrong, and how to fix it.
            </p>

{/* 🚀 TRIO ACTION HUBS — Perfectly aligned with matching typography and scales */}
        <div className="flex flex-wrap items-center gap-3.5 mt-2 animate-fadeIn">
<Link to="/form-check" 
            className="h-11 flex items-center justify-center border border-[#FF6B36]/40 hover:border-[#FF6B36] bg-[#2EC4B6]/5 text-[#FF6B36] hover:text-white px-5 text-xs font-nav font-black tracking-[0.15em] uppercase transition-all duration-300 active:scale-95 shadow-[0_4px_15px_rgba(46,196,182,0.05)]"
          >
            ANALYZE MY LIFT
          </Link>

          <Link to="/explore" 
            className="h-11 flex items-center justify-center border border-gray-800 hover:border-gray-600 text-gray-300 hover:text-white px-5 text-xs font-nav font-black tracking-[0.15em] uppercase transition-all duration-300"
          >
            Browse Exercises
          </Link>

          <Link to="/swapper" 
            className="h-11 flex items-center justify-center border border-[#2EC4B6]/40 hover:border-[#2EC4B6] bg-[#2EC4B6]/5 text-[#2EC4B6] hover:text-white px-5 text-xs font-nav font-black tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(46,196,182,0.05)]"
          >
            Smart Swapper
          </Link>
        </div>
          </div>

          {/* Right — AI Card */}
          <div className="relative p-8 flex flex-col justify-between min-h-[520px]"
            style={{ background: surface, border: `1px solid ${border}` }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: 'linear-gradient(90deg, #FF6B35, #2EC4B6)' }} />

            <div>
              <div className="inline-flex items-center gap-2 border border-[rgba(46,196,182,0.3)] bg-[rgba(46,196,182,0.1)] px-3 py-1.5 mb-6">
                <span className="text-xs font-bold tracking-[1px] text-[#2EC4B6]">● AI Analyzing</span>
              </div>

{/* 👇 Div ko Link bana diya hai taaki ye poora box ek tagda button ban jaye */}
<Link 
  to="/form-check" 
  className={`block border border-dashed border-[rgba(255,107,53,0.3)] p-16 text-center mb-6 relative overflow-hidden cursor-pointer transition-all duration-300 hover:border-solid hover:border-[#FF6B35] hover:bg-[rgba(255,107,53,0.05)] no-underline ${isDark ? 'bg-[#0d0d0d]' : 'bg-[#F4F6F6]'}`}
>
  {/* 🪖 Holographic Laser Scanner Line */}
  <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2EC4B6] to-transparent shadow-[0_0_12px_#2EC4B6] pointer-events-none"
    style={{ animation: 'scan 2.5s linear infinite alternate' }} />

  <div className="text-5xl mb-3 relative z-10 transition-transform duration-300 hover:scale-110">📸</div>
  <div className="text-[#FF6B35] font-bold mb-1 relative z-10">Drop your photo here</div>
  <div className={`text-sm relative z-10 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>or tap to upload</div>
</Link>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { color: '#4ade80', label: 'Back position', msg: 'Spine neutral — excellent alignment' },
                { color: '#FF6B35', label: 'Knee tracking', msg: 'Slight cave inward, push knees out' },
                { color: '#2EC4B6', label: 'Try instead', msg: 'Goblet Squat, Box Squat' },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 ${isDark ? 'bg-[#1f1f1f]' : 'bg-[#f5f5f5]'}`}
                  style={{ border: `1px solid ${border}` }}>
                  <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: item.color }} />
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <strong className={isDark ? 'text-white' : 'text-[#121212]'}>{item.label}</strong> — {item.msg}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="px-4 sm:px-8 lg:px-16 py-8 border-y"
        style={{ background: surface, borderColor: border }}>
        <div className="flex justify-around items-center flex-wrap gap-8">
          {[
            { num: '50+', label: 'Exercises' },
            { num: '11', label: 'Muscle Groups' },
            { num: 'AI', label: 'Form Analysis' },
            { num: '0', label: 'Paywalls' },
            { num: '24/7', label: 'Virtual Spotter' },

          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-[#FF6B35] text-5xl tracking-wide font-heading">{stat.num}</div>
              <div className={`text-xs font-bold font-ui tracking-[2px] uppercase mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="px-4 sm:px-8 lg:px-16 py-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-px bg-[#FF6B35]" />
          <span className="text-xs font-bold tracking-[3px] uppercase text-[#FF6B35]">What We Do</span>
        </div>
        <h2 className="text-4xl lg:text-6xl uppercase font-heading tracking-wide leading-none mb-4">
          EVERYTHING YOU NEED.<br />NOTHING YOU DON'T.
        </h2>
<p className="text-gray-400 mt-4 text-sm md:text-base font-medium transition-all duration-300 ease-in-out hover:scale-[1.02] hover:text-[#2EC4B6] origin-left cursor-default">
            Three powerful tools, one goal — making sure every rep counts.
          </p>
          <br></br>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: '01', icon: '💪', title: 'Exercise Explorer', desc: 'Browse 50+ exercises by muscle group. Reference photos, step-by-step cues, and common mistakes to avoid.', tag: '→ Explore Library', path: '/explore' },
            { num: '02', icon: '🤖', title: 'AI Form Checker', desc: 'Upload a photo mid-rep. Our AI compares it against perfect form and gives you honest, specific feedback instantly.', tag: '→ Check My Form', path: '/form-check' },
            { num: '03', icon: '⚡', title: 'Smart Alternatives', desc: "Can't do this exercise? AI suggests 1-2 alternatives that hit the same muscle — based on your situation.", tag: '→ Find Alternatives', path: '/swapper' },
          ].map((f, i) => (
            <Link 
              key={i} 
              to={f.path} 
              className={`block p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:bg-[#090909] border no-underline ${isDark ? 'bg-[#161616]' : 'bg-white'}`}
              style={{ 
                borderColor: isDark ? '#2a2a2a' : '#e0e0e0',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = f.num === '02' ? '#2EC4B6' : '#FF6B35';
                e.currentTarget.style.boxShadow = f.num === '02' ? '0 0 20px rgba(46,196,182,0.15)' : '0 0 20px rgba(255,107,53,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = isDark ? '#2a2a2a' : '#e0e0e0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="text-6xl font-heading leading-none mb-4 text-[rgba(255,107,53,0.1)]">{f.num}</div>
              <div className="text-3xl mb-4">{f.icon}</div>
              <div className={`font-ui font-bold text-lg tracking-wide uppercase mb-3 ${isDark ? 'text-white' : 'text-black'}`}>{f.title}</div>
              <div className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{f.desc}</div>
              <div className="mt-4 text-xs font-bold tracking-[2px] text-[#2EC4B6]">{f.tag}</div>
            </Link>
          ))}
        </div>
      </section>

{/* HOW IT WORKS SECTION */}
        {/* 👇 Yahan side padding add ki hai taaki edges se na chipke */}
        <div className="mt-32 px-4 sm:px-8 lg:px-16">
          
          {/* 👇 Ye dabba poore content ko exactly baaki page ke center line me layega */}
          <div className="w-full relative z-10">
            
            <h3 className="text-[#FF6B35] text-xs font-black tracking-widest uppercase mb-2">How It Works</h3>
            <h2 className="text-4xl md:text-5xl font-black text-white font-ops uppercase tracking-wide mb-12">
              Four Steps. Zero Confusion.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* STEP 1 - Neon Teal Focus */}
              <div className="group cursor-pointer p-4 rounded-xs transition-all duration-300 hover:bg-[#121212]">
                <div className="text-6xl font-black text-gray-800 transition-colors duration-300 group-hover:text-[#2EC4B6] font-ops mb-4">01</div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2">Pick Exercise</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Browse by muscle group or search directly.</p>
              </div>

              {/* STEP 2 - Electric Purple Focus */}
              <div className="group cursor-pointer p-4 rounded-xs transition-all duration-300 hover:bg-[#121212]">
                <div className="text-6xl font-black text-gray-800 transition-colors duration-300 group-hover:text-purple-500 font-ops mb-4">02</div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2">Upload Photo</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Snap a photo mid-rep. Front or side angle works best.</p>
              </div>

              {/* STEP 3 - Warning Yellow Focus */}
              <div className="group cursor-pointer p-4 rounded-xs transition-all duration-300 hover:bg-[#121212]">
                <div className="text-6xl font-black text-gray-800 transition-colors duration-300 group-hover:text-yellow-400 font-ops mb-4">03</div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2">Get Feedback</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Instant AI breakdown on what's good, what to fix.</p>
              </div>

              {/* STEP 4 - Primary Orange Focus */}
              <div className="group cursor-pointer p-4 rounded-xs transition-all duration-300 hover:bg-[#121212]">
                <div className="text-6xl font-black text-gray-800 transition-colors duration-300 group-hover:text-[#FF6B35] font-ops mb-4">04</div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2">Fix & Repeat</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Apply feedback, retry, keep leveling up.</p>
              </div>
            </div>
            
          </div>
        </div>

{/* ⚡ BONUS TOOLS SECTION */}
      <section className="px-4 sm:px-8 lg:px-16 py-24 relative overflow-hidden">
        
        <div className="w-full relative z-10">
          
          {/* 👇 Grid ko 12-column se badal kar 2-column (50/50 split) kiya h aur gap control kiya h */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
            
            {/* Left Column (Info & Tools Matrix) */}
            <div className="flex flex-col justify-center w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[2px] bg-[#2EC4B6]" />
                <span className="text-xs font-black tracking-[0.25em] uppercase text-[#2EC4B6]">Extensible Ecosystem</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl uppercase font-heading tracking-wide leading-[0.95] mb-6">
                LIFTING EXPERIENCE,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">UPGRADED.</span>
              </h2>

              {/* 🔥 EXPANDED TEXT (MAX-WIDTH REMOVED TO FILL SPACE) */}
              {/* 👇 Yahan se max-w-2xl hata diya h taaki ye blank space ko cover kare */}
              <p className="text-lg sm:text-xl leading-relaxed font-medium text-gray-300 my-6 tracking-wide w-full">
                A <span className="text-[#FF6B35] font-black drop-shadow-[0_0_15px_rgba(255,107,53,0.3)]">high-performance toolset</span> engineered for your daily grind. Stop wasting mental energy on manual calculations and keep your focus strictly on <span className="text-white font-bold border-b-2 border-[#2EC4B6] pb-1">executing perfect reps</span>. 
              </p>
              
              {/* 🛠️ ALL CORE TOOLS EXPANDED MATRIX */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 w-full">
                {[
                  { name: '1RM Calculator', icon: '🧮' },
                  { name: 'Barbell Plate Calculator', icon: '⚖️' },
                  { name: 'Chrono Cadence Matrix', icon: '⏱️' },
                  { name: 'Wilks/DOTS Tracker', icon: '📈' },
                  { name: 'TDEE Calculator', icon: '🔥' },
                  { name: 'Warmup Set Planner', icon: '💪' }
                ].map((tool, idx) => (
                  <div key={idx} className={`p-3 border flex items-center gap-3 transition-all duration-300 hover:border-[#2EC4B6]/60 ${isDark ? 'bg-[#0f0f0f] border-gray-800 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}>
                    <span className="text-lg">{tool.icon}</span>
                    <span className="text-xs font-bold tracking-wider uppercase font-ui">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

{/* 🔥 Right Column (Active Terminal Layout) - NOW FULLY CLICKABLE */}
            {/* 👇 W-full kiya taaki ye apne 50% share ko pooray tarike se occupy kare */}
            <div className="w-full hidden md:block">
              {/* 👇 Main outer div ko Link bana diya hai jisse click karte hi form-check khulega */}
              <Link 
                to="/form-check"
                className="block p-6 border relative rounded-xs bg-[#111111] border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group/terminal overflow-hidden min-h-[350px] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-[#2EC4B6]/50 hover:shadow-[0_0_30px_rgba(46,196,182,0.15)] no-underline"
              >
                
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[rgba(46,196,182,0.05)] via-transparent to-transparent h-12 w-full animate-scan" style={{ animation: 'scan 4s linear infinite' }} />
                
                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2EC4B6]/70" />
                    <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest ml-2">MATRIX_CONSOLE_V2.0</span>
                  </div>
                  <div className="text-[10px] text-[#4ADE80] font-mono animate-pulse">● LIVE_FEED</div>
                </div>

                <div className="my-4 p-3 bg-[#161616] border border-gray-800 relative group-hover/terminal:border-[#2EC4B6]/30 transition-colors duration-300">
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-2">
                    <span>[01] ESTIMATED ONE-REP MAX</span>
                    <span className="text-[#2EC4B6] font-bold">142.5 KG</span>
                  </div>
                  <div className="w-full bg-gray-900 h-6 relative overflow-hidden flex items-center">
                    <div className="h-full bg-gradient-to-r from-[#FF6B35] to-[#2EC4B6] transition-all duration-1000 w-[85%] relative" />
                    <span className="absolute right-2 text-[9px] font-mono text-white z-10">85% EFFICIENCY</span>
                  </div>
                </div>

                <div className="my-2 p-3 bg-[#161616] border border-gray-800 group-hover/terminal:border-[#FF6B35]/30 transition-colors duration-300">
                  <div className="text-[11px] font-mono text-gray-400 mb-2">[02] BARBELL LOADING ARCHITECTURE</div>
                  <div className="flex items-center gap-1 h-8 bg-gray-900 px-2 justify-center">
                    <div className="w-3 h-7 bg-gray-700 border-x border-gray-900" />
                    <div className="w-5 h-8 bg-[#FF6B35] rounded-xs" />
                    <div className="w-5 h-8 bg-[#FF6B35] rounded-xs" />
                    <div className="w-4 h-6 bg-[#2EC4B6] rounded-xs" />
                    <div className="w-2 h-4 bg-yellow-500 rounded-xs" />
                    <div className="w-40 h-2 bg-gray-800 mx-1 rounded-sm relative">
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-600 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div className="mt-2 p-3 bg-[#161616] border border-gray-800 flex items-center justify-between group-hover/terminal:border-[#4ADE80]/30 transition-colors duration-300">
                  <div>
                    <div className="text-[10px] font-mono text-gray-500">REST INTERMISSION COUNTDOWN</div>
                    <div className="text-xl font-mono font-bold text-[#4ADE80] tracking-wider animate-pulse">01:48 <span className="text-xs text-gray-400">/ 03:00</span></div>
                  </div>
                  <div className="w-10 h-10 border-2 border-dashed border-[#4ADE80]/40 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '10s' }}>
                    <div className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full" />
                  </div>
                </div>

              </Link>
            </div>

          </div>

          {/* 🕹️ GLOBAL CENTERED DEPLOY BUTTON */}
          <div className="w-full flex justify-center mt-12">
            <div className="relative group inline-block">
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#4ADE80] pointer-events-none transition-all duration-300 group-hover:-top-1 group-hover:-left-1" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#4ADE80] pointer-events-none transition-all duration-300 group-hover:-top-1 group-hover:-right-1" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#4ADE80] pointer-events-none transition-all duration-300 group-hover:-bottom-1 group-hover:-left-1" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#4ADE80] pointer-events-none transition-all duration-300 group-hover:-bottom-1 group-hover:-right-1" />
              
              <button 
                onClick={() => setToolsOpen(true)}
                className="relative bg-transparent text-[#4ADE80] border border-[#4ADE80]/30 px-12 py-5 font-black text-xs sm:text-sm tracking-[3px] uppercase transition-all duration-300 overflow-hidden cursor-pointer shadow-[inset_0_0_12px_rgba(74,222,128,0.05)] group-hover:text-black group-hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]"
              >
                <div className="absolute inset-0 w-full h-full bg-[#4ADE80] translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 -z-10" />
                <span className="flex items-center gap-3 relative z-10">
                  ⚡ DEPLOY ADVANCED UTILITIES
                </span>
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="px-4 sm:px-8 lg:px-16 py-28 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)' }} />
<h2 className="font-heading uppercase tracking-wide leading-[0.95] mb-6 relative"
          style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
          STOP GUESSING.<br />
          <span 
            onMouseEnter={handleHoverFixing}
            className={`${colorFixing} transition-colors duration-300 cursor-default inline-block hover:scale-[1.03]`}
          >
            START FIXING.
          </span>
        </h2>
<p className="text-gray-400 mt-4 text-sm md:text-base font-medium transition-all duration-300 ease-in-out hover:scale-[1.03] hover:text-[#2EC4B6] origin-center cursor-default">
            Your form is either building muscle or building injuries. Find out which, AT NO COST.
          </p>
          <br></br>
        <div className="flex flex-wrap gap-4 justify-center">
<Link to="/form-check" 
            className="border border-[#FF6B35]/40 hover:border-[#FF6B35] bg-[#FF6B35]/5 text-[#FF6B35] hover:text-white px-10 py-4 font-black text-sm tracking-[2px] uppercase transition-all duration-300 no-underline shadow-[0_4px_15px_rgba(255,107,53,0.05)]"
          >
            ANALYZE MY LIFT
          </Link>
          <Link to="/explore"
            className={`bg-transparent px-10 py-4 font-bold text-sm tracking-[2px] uppercase transition-colors no-underline border ${isDark ? 'text-white border-[#2a2a2a] hover:border-white' : 'text-[#121212] border-[#e0e0e0] hover:border-[#121212]'}`}>
            Browse Exercises
          </Link>
          <Link to="/swapper"
            className="border border-[#2EC4B6]/40 hover:border-[#2EC4B6] bg-[#2EC4B6]/5 text-[#2EC4B6] hover:text-white px-10 py-4 font-black text-sm tracking-[2px] uppercase transition-all duration-300 no-underline shadow-[0_4px_15px_rgba(46,196,182,0.05)]">
            Find Alternate Exercises
          </Link>
        </div>
      </section>

{/* Footer */}
      <footer className="px-4 sm:px-8 lg:px-16 py-8 flex items-center justify-between flex-wrap gap-4 border-t"
        style={{ background: surface, borderColor: border }}>
        
        {/* 🛡️ LOGO AREA */}
        <div className="flex items-center gap-3 text-2xl font-ui font-bold tracking-wide uppercase">
          {/* 👇 Logo Image Tag: Apne logo ki image public folder me daal kar yahan src change kar lena */}
          <img 
            src="/logo.png" 
            alt="FixMyForm Logo" 
            className="h-8 w-auto object-contain fallback-hidden"
            onError={(e) => e.target.style.display = 'none'} // Agar image na mile to text kharab nahi hoga
          />
          <div>
            Fix<span className="text-[#FF6B35]">My</span>Form
          </div>
        </div>

        <div className={`text-xs tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          © 2025 FixMyForm. Built different.
        </div>

        {/* 🔗 FOOTER LINKS */}
        <div className="flex gap-6">
          {[
            { name: 'Explore', path: '/explore' },
            { name: 'Analyze Lift', path: '/form-check' }, // Replaced Form Check text but kept the path
            { name: 'Swapper', path: '/swapper' }          // Added Swapper next to it
          ].map(link => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-xs font-ui font-semibold tracking-wide uppercase no-underline hover:text-[#FF6B35] transition-colors ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </footer>

<style>{`
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  @keyframes scan {
    0% { top: 0%; }
    100% { top: 100%; }
  }
  .no-underline { text-decoration: none; }
`}</style>
    </div>
  )
}

export default Home