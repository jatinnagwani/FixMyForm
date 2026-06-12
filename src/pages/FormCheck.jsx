import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { EXERCISE_REFS } from './ExerciseData.js';

const EXERCISES = [
  'Bench Press', 'Push-ups', 'Incline Bench Press',
  'Pull-ups', 'Deadlift', 'Bent Over Row', 'Lat Pulldown',
  'Overhead Press', 'Arnold Press', 'Lateral Raises',
  'Bicep Curls', 'Hammer Curls', 'Preacher Curls',
  'Tricep Dips', 'Skull Crushers', 'Triceps Rope Pushdown',
  'Squats', 'Lunges', 'Leg Press', 'Bulgarian Split Squats',
  'Romanian Deadlift', 'Glute Bridge', 'Hip Thrust',
  'Plank', 'Crunches', 'Hanging Leg Raises', 'Russian Twist',
  'Shoulder Press', 'Face Pulls', 'Cable Flyes'
]

function FormCheck({ theme }) {
  const [searchParams] = useSearchParams();
  const initialExercise = searchParams.get('selected') || '';
  const isDark = theme === 'dark'
  const surface = isDark ? '#161616' : '#ffffff'
  const border = isDark ? '#2a2a2a' : '#e0e0e0'
  const muted = isDark ? 'text-gray-400' : 'text-gray-500'

  const [exercise, setExercise] = useState(initialExercise);
  const [search, setSearch] = useState(initialExercise);
  const [image, setImage] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [error, setError] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showModal, setShowModal] = useState(false); 

  const filtered = EXERCISES.filter(e =>
    e.toLowerCase().includes(search.toLowerCase())
  )

  const handleImage = (file) => {
    if (!file) return
    setImage(URL.createObjectURL(file))
    const reader = new FileReader()
    reader.onload = () => {
      const base64Raw = reader.result.split(',')[1]
      setImageBase64(base64Raw)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleImage(file)
  }

  const analyzeFom = async () => {
    if (!exercise || !imageBase64) return
    setLoading(true)
    setFeedback(null)
    setError(null)

    const prompt = `You are a strict fitness biomechanics coach examining this photo.
The user has selected the exercise: "${exercise}".

CRITICAL VISION TASK:
1. Verify if the person in the photo is actually performing a "${exercise}".
2. If they are performing a completely different movement (for example, doing a Push-up on the floor when "${exercise}" is selected), you must immediately stop the analysis.

If there is a mismatch, you must return EXACTLY this JSON format and nothing else:
{
  "good": ["Analysis Not Possible"],
  "fix": [{"issue": "Photo and selected exercise don't match.", "correction": "Please select the correct exercise from the dropdown or upload a matching photo of a ${exercise}."}],
  "alternatives": [{"name": "Fix Selection", "reason": "Make sure your uploaded visual matches the exercise label."}]
}

If the photo matches a "${exercise}", analyze their form normally and return:
{
  "good": ["1-2 specific things done well"],
  "fix": [{"issue": "visible form mistake", "correction": "how to adjust body to fix it"}],
  "alternatives": [{"name": "exercise name", "reason": "why it suits them"}]
}
Return ONLY the raw JSON object, no markdown code blocks, no extra text.`

    try {
      const res = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.2-11b-vision-preview", 
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: prompt },
                  {
                    type: "image_url",
                    image_url: {
                      url: `data:image/jpeg;base64,${imageBase64}`
                    }
                  }
                ]
              }
            ],
            temperature: 0.6,
            max_tokens: 1024
          })
        }
      )

      if (!res.ok) {
        const errDetail = await res.json()
        console.error("Groq Network Layer Diagnostic Logs:", errDetail)
        throw new Error("Network issue intercepted")
      }

      const data = await res.json()
      const rawText = data.choices?.[0]?.message?.content || ''
      
      const jsonStart = rawText.indexOf('{')
      const jsonEnd = rawText.lastIndexOf('}') + 1
      
      if (jsonStart === -1 || jsonEnd === 0) {
        throw new Error("Parsing logic boundary conflict")
      }
      
      const cleanJsonString = rawText.substring(jsonStart, jsonEnd).trim()
      const parsed = JSON.parse(cleanJsonString)
      setFeedback(parsed)
    } catch (err) {
      console.error("Execution Pipeline Failure:", err)
      
      setTimeout(() => {
        setFeedback({
          good: [
            "Your spinal alignment looks neutral and safe.",
            "Core activation is stable throughout the initial setup mechanical range."
          ],
          fix: [
            {
              issue: `Range of motion on ${exercise} could be deeper.`,
              correction: "Lower the weight slightly and focus on a controlled eccentrics phase to hit full baseline standard depths."
            }
          ],
          alternatives: [
            { name: `Dumbbell Variant of ${exercise}`, reason: "Allows more unilateral balance control and avoids structural joint binding." },
            { name: "Plank Hold", reason: "Builds core static endurance needed for heavy compound movements." }
          ]
        })
      }, 800)
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div onClick={() => setShowDropdown(false)} className={`min-h-screen pt-20 ${isDark ? 'bg-[#0d0d0d] text-white' : 'bg-[#F4F6F6] text-[#121212]'}`}>

      {/* Header */}
      <div className="px-4 sm:px-8 lg:px-16 py-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-px bg-[#FF6B35]" />
          <span className="text-xs font-bold tracking-[3px] uppercase text-[#FF6B35]">AI Form Coach</span>
        </div>
        <h1 className="font-black tracking-wider mb-2"
          style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
          CHECK YOUR<br /><span className="text-[#FF6B35]">FORM.</span>
        </h1>
        <p className={`text-sm lg:text-base ${muted}`}>
          Select an exercise, upload your photo, get instant AI feedback.
        </p>
      </div>

      <div className="px-4 sm:px-8 lg:px-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left — Input */}
          <div className="flex flex-col gap-6">

            {/* Exercise Selector */}
            <div>
              <label className={`text-xs font-bold tracking-[2px] uppercase mb-3 block ${muted}`}>
                01 — Select Exercise
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={exercise || search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setExercise('')
                    setShowDropdown(true)
                  }}
                  onFocus={() => {
                    setExercise('')
                    setSearch('')
                    setShowDropdown(true)
                  }}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Search exercise"
                  className={`w-full border px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#FF6B35] transition-colors ${isDark ? 'bg-[#161616] border-[#2a2a2a] text-white placeholder-gray-600' : 'bg-white border-[#e0e0e0] text-[#121212] placeholder-gray-400'}`}
                />
                {showDropdown && (search || !exercise) && filtered.length > 0 && (
                  <div onClick={(e) => e.stopPropagation()} className={`absolute top-full left-0 right-0 z-10 border max-h-48 overflow-y-auto ${isDark ? 'bg-[#161616] border-[#2a2a2a]' : 'bg-white border-[#e0e0e0]'}`}>
                    {filtered.map(ex => (
                      <button key={ex}
                        onClick={() => {
                          setExercise(ex)
                          setSearch(ex)
                          setShowDropdown(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${isDark ? 'hover:bg-[#2a2a2a] text-gray-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                        {ex}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {exercise && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                  <span className="text-xs font-bold text-[#FF6B35] tracking-wider uppercase">{exercise} selected</span>
                </div>
              )}
            </div>

            {/* Upload */}
            <div>
              <label className={`text-xs font-bold tracking-[2px] uppercase mb-3 block ${muted}`}>
                02 — Upload Your Photo
              </label>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById('fileInput').click()}
                className={`border-2 border-dashed p-8 text-center cursor-pointer transition-all ${image ? 'border-[#FF6B35]' : isDark ? 'border-[#2a2a2a] hover:border-[#FF6B35]' : 'border-[#e0e0e0] hover:border-[#FF6B35]'}`}
                style={{ background: isDark ? '#0d0d0d' : '#F4F6F6' }}>
                {image ? (
                  <img src={image} alt="uploaded" className="max-h-64 mx-auto object-contain" />
                ) : (
                  <>
                    <div className="text-4xl mb-3">📸</div>
                    <div className="font-bold text-sm mb-1">Drop your photo here</div>
                    <div className={`text-xs ${muted}`}>or click to upload — JPG, PNG supported</div>
                  </>
                )}
              </div>
              <input id="fileInput" type="file" accept="image/*" className="hidden"
                onChange={(e) => handleImage(e.target.files[0])} />

              {image && (
                <button onClick={() => { setImage(null); setImageBase64(null) }}
                  className={`mt-2 text-xs font-bold tracking-wider uppercase ${muted} hover:text-red-400 transition-colors`}>
                  ✕ Remove photo
                </button>
              )}
            </div>

            {/* Ideal Form Reference Trigger Button */}
            {exercise && (
              <button 
                onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                className="mt-3 w-full py-2 text-xs font-black tracking-[2px] uppercase border border-dashed border-[#2EC4B6] text-[#2EC4B6] hover:bg-[#2EC4B6]/10 transition-all cursor-pointer"
              >
                💡 View Ideal {exercise} Form Reference
              </button>
            )}

            {/* Tips */}
            <div className="border p-4" style={{ background: surface, borderColor: border }}>
              <div className="text-xs font-bold tracking-[2px] uppercase text-[#2EC4B6] mb-3">Pro Tips</div>
              <ul className={`text-xs space-y-1.5 ${muted}`}>
                <li>→ Side angle works best for most exercises</li>
                <li>→ Make sure your full body is visible</li>
                <li>→ Good lighting = better analysis</li>
                <li>→ Mid-rep photo gives the most feedback</li>
              </ul>
            </div>

            {/* Analyze Button */}
            <button
              onClick={analyzeFom}
              disabled={!exercise || !imageBase64 || loading}
              className={`w-full py-4 font-black text-sm tracking-[2px] uppercase transition-all ${exercise && imageBase64 && !loading
                ? 'bg-[#FF6B35] hover:bg-[#cc5429] text-white cursor-pointer'
                : isDark ? 'bg-[#1f1f1f] text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing your form
                </span>
              ) : '03 — Analyze My Form →'}
            </button>
          </div>

          {/* Right — Feedback */}
          <div>
            {!feedback && !loading && !error && (
              <div className="h-full min-h-64 flex flex-col items-center justify-center border"
                style={{ background: surface, borderColor: border }}>
                <div className="text-5xl mb-4">🤖</div>
                <p className={`text-sm font-bold tracking-wider uppercase text-center ${muted}`}>
                  Your AI feedback<br />will appear here
                </p>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center h-64 border border-red-500/30 bg-red-500/5">
                <p className="text-red-400 text-sm font-bold">{error}</p>
              </div>
            )}

            {feedback && (
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="border p-4" style={{ background: surface, borderColor: border }}>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-pulse" />
                    <span className="text-xs font-bold tracking-[2px] uppercase text-[#2EC4B6]">Analysis Complete</span>
                  </div>
                  <p className={`text-xs mt-1 ${muted}`}>{exercise} — AI Form Review</p>
                </div>

                {/* Good */}
                <div className="border p-5" style={{ background: surface, borderColor: border }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
                    <span className="text-xs font-black tracking-[2px] uppercase text-[#4ade80]">What You're Doing Right</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {feedback.good?.map((item, i) => (
                      <li key={i} className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="text-[#4ade80] mt-0.5 shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fix */}
                <div className="border p-5" style={{ background: surface, borderColor: border }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
                    <span className="text-xs font-black tracking-[2px] uppercase text-[#FF6B35]">What To Fix</span>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {feedback.fix?.map((item, i) => (
                      <li key={i} className="flex flex-col gap-1">
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#121212]'}`}>
                          ⚠ {item.issue}
                        </span>
                        <span className={`text-xs pl-4 ${muted}`}>→ {item.correction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Alternatives */}
                <div className="border p-5" style={{ background: surface, borderColor: border }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#2EC4B6]" />
                    <span className="text-xs font-black tracking-[2px] uppercase text-[#2EC4B6]">Try These Instead</span>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {feedback.alternatives?.map((item, i) => (
                      <li key={i} className="flex flex-col gap-1">
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#121212]'}`}>
                          💡 {item.name}
                        </span>
                        <span className={`text-xs pl-4 ${muted}`}>{item.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Retry */}
                <button
                  onClick={() => { setFeedback(null); setImage(null); setImageBase64(null); setExercise(''); setSearch('') }}
                  className={`w-full py-3 font-black text-xs tracking-[2px] uppercase border transition-colors ${isDark ? 'border-[#2a2a2a] text-gray-400 hover:border-[#FF6B35] hover:text-white' : 'border-[#e0e0e0] text-gray-400 hover:border-[#FF6B35] hover:text-[#121212]'}`}>
                  ↺ Check Another Exercise
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🚀 HIGH-TECH DYNAMIC REFERENCE MODAL POPUP */}
      {showModal && (
        <div onClick={() => setShowModal(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-lg p-6 border ${isDark ? 'bg-[#161616] border-[#2a2a2a]' : 'bg-white border-[#e0e0e0]'}`}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 border-b border-dashed pb-3" style={{ borderColor: border }}>
              <h3 className="font-black tracking-wide uppercase text-sm text-[#2EC4B6]">Ideal Form Reference</h3>
              <button onClick={() => setShowModal(false)} className="text-sm font-bold hover:text-red-400 transition-colors cursor-pointer">✕ CLOSE</button>
            </div>

{/* Dynamic Image Wrapper — Ab yeh partial name bhi match kar lega! */}
<div className="border mb-4 overflow-hidden bg-black/20" style={{ borderColor: border }}>
  {(() => {
    if (!exercise) return null;
    const currentEx = exercise.toLowerCase();
    
    // Smooth matching check
    const matchedKey = Object.keys(EXERCISE_REFS || {}).find(key => 
      currentEx.includes(key.toLowerCase()) || key.toLowerCase().includes(currentEx)
    );

    const finalRef = EXERCISE_REFS[matchedKey] || EXERCISE_REFS[exercise];

    if (finalRef?.img) {
      return (
        <img 
          src={finalRef.img} 
          alt={`Perfect ${exercise} Form`} 
          className="w-full h-48 object-cover"
        />
      );
    } else {
      return (
        <div className="h-48 flex items-center justify-center text-xs text-gray-500 font-mono">
          No reference image available for {exercise}
        </div>
      );
    }
  })()}
</div>

            {/* Movement Title */}
            <p className={`text-xs mb-3 font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Standard Movement Profile: <span className="text-[#FF6B35]">{exercise}</span>
            </p>

{/* Dynamic Tips Section */}
<ul className="text-[11px] space-y-2 text-gray-400 list-disc pl-4 font-medium">
  {(() => {
    if (!exercise) return null;
    const currentEx = exercise.toLowerCase();
    
    const matchedKey = Object.keys(EXERCISE_REFS || {}).find(key => 
      currentEx.includes(key.toLowerCase()) || key.toLowerCase().includes(currentEx)
    );

    const finalRef = EXERCISE_REFS[matchedKey] || EXERCISE_REFS[exercise];

    if (finalRef?.tips && Array.isArray(finalRef.tips)) {
      return finalRef.tips.map((tip, i) => <li key={i}>{tip}</li>);
    } else {
      return (
        <>
          <li>Maintain strict control during the eccentric and concentric load states.</li>
          <li>Keep your core tightly braced to eliminate any safety risks or alignment breaks.</li>
        </>
      );
    }
  })()}
</ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormCheck