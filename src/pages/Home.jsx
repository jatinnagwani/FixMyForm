import { Link } from 'react-router-dom'

function Home({ theme }) {
  const isDark = theme === 'dark'

  const surface = isDark ? '#161616' : '#ffffff'
  const border = isDark ? '#2a2a2a' : '#e0e0e0'

  return (
    <div className={`${isDark ? 'bg-[#0d0d0d] text-white' : 'bg-[#F4F6F6] text-[#121212]'}`}>

      {/* Hero */}
      <section className="flex items-center px-4 sm:px-8 lg:px-16 pt-24 pb-16 relative overflow-hidden">

        <div className="absolute top-1/4 right-[5%] w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(46,196,182,0.05) 0%, transparent 70%)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 border border-[rgba(255,107,53,0.3)] bg-[rgba(255,107,53,0.1)] px-4 py-1.5 mb-8">
              <div className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full" style={{ animation: 'pulse 1.5s infinite' }} />
              <span className="text-xs font-bold tracking-[2px] uppercase text-[#FF6B35]">AI-Powered Form Coach</span>
            </div>

            <h1 className="font-black leading-[0.95] tracking-wider mb-6"
              style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif', fontSize: 'clamp(4rem, 9vw, 9rem)', letterSpacing: '2px' }}>
              TRAIN<br />
              <span className="text-[#FF6B35]">HARDER.</span><br />
              MOVE <span className="text-[#2EC4B6]">RIGHT.</span>
            </h1>

            <p className={`text-base lg:text-lg leading-relaxed max-w-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Stop guessing your form. Upload your exercise photo and get{' '}
              <strong className={isDark ? 'text-white' : 'text-[#121212]'}>instant AI feedback</strong>
              {' '}— what's right, what's wrong, and how to fix it.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/form-check"
                className="bg-[#FF6B35] hover:bg-[#cc5429] text-white px-8 py-4 font-black text-sm tracking-[2px] uppercase transition-colors no-underline">
                Check My Form →
              </Link>
              <Link to="/explore"
                className={`bg-transparent px-8 py-4 font-bold text-sm tracking-[2px] uppercase transition-colors no-underline border ${isDark ? 'text-white border-[#2a2a2a] hover:border-white' : 'text-[#121212] border-[#e0e0e0] hover:border-[#121212]'}`}>
                Browse Exercises
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

              <div className={`border border-dashed border-[rgba(255,107,53,0.3)] p-16 text-center mb-6 ${isDark ? 'bg-[#0d0d0d]' : 'bg-[#F4F6F6]'}`}>
                <div className="text-5xl mb-3">📸</div>
                <div className="text-[#FF6B35] font-bold mb-1">Drop your photo here</div>
                <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>or tap to upload</div>
              </div>
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
            { num: '6', label: 'Muscle Groups' },
            { num: 'AI', label: 'Form Analysis' },
            { num: '0₹', label: 'Always Free' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-[#FF6B35] text-5xl tracking-wider"
                style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif' }}>{stat.num}</div>
              <div className={`text-xs font-semibold tracking-[2px] uppercase mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</div>
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
        <h2 className="text-4xl lg:text-6xl font-black tracking-wider mb-4"
          style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif' }}>
          EVERYTHING YOU NEED.<br />NOTHING YOU DON'T.
        </h2>
        <p className={`max-w-lg leading-relaxed mb-16 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Three powerful tools, one goal — making sure every rep counts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: '01', icon: '💪', title: 'Exercise Explorer', desc: 'Browse 50+ exercises by muscle group. Reference photos, step-by-step cues, and common mistakes to avoid.', tag: '→ Explore Library' },
            { num: '02', icon: '🤖', title: 'AI Form Checker', desc: 'Upload a photo mid-rep. Our AI compares it against perfect form and gives you honest, specific feedback instantly.', tag: '→ Check My Form' },
            { num: '03', icon: '⚡', title: 'Smart Alternatives', desc: "Can't do this exercise? AI suggests 1-2 alternatives that hit the same muscle — based on your situation.", tag: '→ Find Alternatives' },
          ].map((f, i) => (
            <div key={i} className="p-8 cursor-pointer transition-all duration-200 hover:-translate-y-1"
              style={{ background: surface, border: `1px solid ${border}` }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,107,53,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = border}>
              <div className="text-6xl font-black leading-none mb-4 text-[rgba(255,107,53,0.1)]"
                style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif' }}>{f.num}</div>
              <div className="text-3xl mb-4">{f.icon}</div>
              <div className="font-black text-lg tracking-wider uppercase mb-3">{f.title}</div>
              <div className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{f.desc}</div>
              <div className="mt-4 text-xs font-bold tracking-[2px] text-[#2EC4B6]">{f.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="px-4 sm:px-8 lg:px-16 py-20 border-y"
        style={{ background: surface, borderColor: border }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-px bg-[#FF6B35]" />
          <span className="text-xs font-bold tracking-[3px] uppercase text-[#FF6B35]">How It Works</span>
        </div>
        <h2 className="text-4xl lg:text-6xl font-black tracking-wider mb-16"
          style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif' }}>
          FOUR STEPS.<br />ZERO CONFUSION.
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { num: '01', title: 'Pick Exercise', desc: 'Browse by muscle group or search directly.' },
            { num: '02', title: 'Upload Photo', desc: 'Snap a photo mid-rep. Front or side angle works best.' },
            { num: '03', title: 'Get Feedback', desc: "Instant AI breakdown — what's good, what to fix." },
            { num: '04', title: 'Fix & Repeat', desc: 'Apply feedback, retry, keep leveling up.' },
          ].map((step, i) => (
            <div key={i} className="p-6 lg:p-8 text-center"
              style={{ borderRight: i % 2 === 0 ? `1px solid ${border}` : 'none' }}>
              <div className="text-6xl lg:text-7xl font-black leading-none mb-2 text-[rgba(255,107,53,0.12)]"
                style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif' }}>{step.num}</div>
              <div className="font-black text-sm tracking-wider uppercase mb-2">{step.title}</div>
              <div className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-8 lg:px-16 py-28 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)' }} />
        <h2 className="font-black tracking-wider leading-[0.95] mb-6 relative"
          style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif', fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
          STOP GUESSING.<br />
          <span className="text-[#FF6B35]">START FIXING.</span>
        </h2>
        <p className={`text-base leading-relaxed max-w-lg mx-auto mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Your form is either building muscle or building injuries. Find out which — for free.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/form-check"
            className="bg-[#FF6B35] hover:bg-[#cc5429] text-white px-10 py-4 font-black text-sm tracking-[2px] uppercase transition-colors no-underline">
            Check My Form Now →
          </Link>
          <Link to="/explore"
            className={`bg-transparent px-10 py-4 font-bold text-sm tracking-[2px] uppercase transition-colors no-underline border ${isDark ? 'text-white border-[#2a2a2a] hover:border-white' : 'text-[#121212] border-[#e0e0e0] hover:border-[#121212]'}`}>
            Browse Exercises
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-8 lg:px-16 py-8 flex items-center justify-between flex-wrap gap-4 border-t"
        style={{ background: surface, borderColor: border }}>
        <div className="text-2xl tracking-wider"
          style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif' }}>
          Fix<span className="text-[#FF6B35]">My</span>Form
        </div>
        <div className={`text-xs tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          © 2025 FixMyForm. Built different.
        </div>
        <div className="flex gap-6">
          {['Explore', 'Form Check'].map(link => (
            <Link key={link} to={link === 'Explore' ? '/explore' : '/form-check'}
              className={`text-xs tracking-wider uppercase no-underline hover:text-[#FF6B35] transition-colors ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {link}
            </Link>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .no-underline { text-decoration: none; }
      `}</style>
    </div>
  )
}

export default Home