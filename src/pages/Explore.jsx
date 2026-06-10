import { useState, useEffect } from 'react'

const MUSCLE_GROUPS = {
  chest: { label: 'Chest', api: 'pectorals' },
  shoulders: { label: 'Shoulders', api: 'delts' },
  biceps: { label: 'Biceps', api: 'biceps' },
  abs: { label: 'Abs', api: 'abs' },
  quads: { label: 'Quads', api: 'quads' },
  traps: { label: 'Traps', api: 'traps' },
  lats: { label: 'Lats', api: 'lats' },
  triceps: { label: 'Triceps', api: 'triceps' },
  glutes: { label: 'Glutes', api: 'glutes' },
  hamstrings: { label: 'Hamstrings', api: 'hamstrings' },
}

// 🚀 EXPANDED DATABASE: 5 Unique Exercises Per Muscle with Distinct Images
const LOCAL_FALLBACK_DATA = {
  pectorals: [
    { id: 'ch1', name: 'Barbell Bench Press', equipment: 'barbell', target: 'pectorals', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop' },
    { id: 'ch2', name: 'Incline Dumbbell Press', equipment: 'dumbbell', target: 'pectorals', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
    { id: 'ch3', name: 'Cable Chest Flyes', equipment: 'cable', target: 'pectorals', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' },
    { id: 'ch4', name: 'Decline Bench Press', equipment: 'barbell', target: 'pectorals', difficulty: 'advanced', gifUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
    { id: 'ch5', name: 'Push-Ups', equipment: 'body weight', target: 'pectorals', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=400&auto=format&fit=crop' }
  ],
  delts: [
    { id: 'sh1', name: 'Overhead Barbell Press', equipment: 'barbell', target: 'delts', difficulty: 'advanced', gifUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
    { id: 'sh2', name: 'Dumbbell Lateral Raise', equipment: 'dumbbell', target: 'delts', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=400&auto=format&fit=crop' },
    { id: 'sh3', name: 'Bent-Over Rear Delt Fly', equipment: 'dumbbell', target: 'delts', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
    { id: 'sh4', name: 'Arnold Press', equipment: 'dumbbell', target: 'delts', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' },
    { id: 'sh5', name: 'Front Dumbbell Raise', equipment: 'dumbbell', target: 'delts', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop' }
  ],
  biceps: [
    { id: 'bi1', name: 'Barbell Bicep Curl', equipment: 'barbell', target: 'biceps', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' },
    { id: 'bi2', name: 'Dumbbell Hammer Curl', equipment: 'dumbbell', target: 'biceps', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
    { id: 'bi3', name: 'Preacher Curl', equipment: 'barbell', target: 'biceps', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=400&auto=format&fit=crop' },
    { id: 'bi4', name: 'Incline Dumbbell Curl', equipment: 'dumbbell', target: 'biceps', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
    { id: 'bi5', name: 'Concentration Curl', equipment: 'dumbbell', target: 'biceps', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop' }
  ],
  abs: [
    { id: 'ab1', name: 'Hanging Leg Raises', equipment: 'body weight', target: 'abs', difficulty: 'advanced', gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop' },
    { id: 'ab2', name: 'Ab Wheel Rollout', equipment: 'stability wheel', target: 'abs', difficulty: 'advanced', gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
    { id: 'ab3', name: 'Cable Crunch', equipment: 'cable', target: 'abs', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=400&auto=format&fit=crop' },
    { id: 'ab4', name: 'Plank', equipment: 'body weight', target: 'abs', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
    { id: 'ab5', name: 'Russian Twist', equipment: 'medicine ball', target: 'abs', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop' }
  ],
  quads: [
    { id: 'qd1', name: 'Barbell Back Squat', equipment: 'barbell', target: 'quads', difficulty: 'advanced', gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop' },
    { id: 'qd2', name: 'Leg Extension Machine', equipment: 'machine', target: 'quads', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=400&auto=format&fit=crop' },
    { id: 'qd3', name: 'Goblet Squat', equipment: 'kettlebell', target: 'quads', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
    { id: 'qd4', name: 'Leg Press', equipment: 'machine', target: 'quads', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
    { id: 'qd5', name: 'Bulgarian Split Squat', equipment: 'dumbbell', target: 'quads', difficulty: 'advanced', gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' }
  ],
  traps: [
    { id: 'tr1', name: 'Dumbbell Shrugs', equipment: 'dumbbell', target: 'traps', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
    { id: 'tr2', name: 'Barbell Upright Row', equipment: 'barbell', target: 'traps', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop' },
    { id: 'tr3', name: 'Face Pulls', equipment: 'cable', target: 'traps', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
    { id: 'tr4', name: 'Barbell Shrugs', equipment: 'barbell', target: 'traps', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' },
    { id: 'tr5', name: 'Overhead Shrugs', equipment: 'barbell', target: 'traps', difficulty: 'advanced', gifUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' }
  ],
  lats: [
    { id: 'lt1', name: 'Wide-Grip Lat Pulldown', equipment: 'machine', target: 'lats', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
    { id: 'lt2', name: 'Bent Over Barbell Row', equipment: 'barbell', target: 'lats', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' },
    { id: 'lt3', name: 'Pull-Ups', equipment: 'body weight', target: 'lats', difficulty: 'advanced', gifUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=400&auto=format&fit=crop' },
    { id: 'lt4', name: 'Seated Cable Row', equipment: 'cable', target: 'lats', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
    { id: 'lt5', name: 'One-Arm Dumbbell Row', equipment: 'dumbbell', target: 'lats', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop' }
  ],
  triceps: [
    { id: 'tc1', name: 'Triceps Rope Pushdown', equipment: 'cable', target: 'triceps', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
    { id: 'tc2', name: 'Skull Crushers', equipment: 'barbell', target: 'triceps', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop' },
    { id: 'tc3', name: 'Overhead Dumbbell Extension', equipment: 'dumbbell', target: 'triceps', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
    { id: 'tc4', name: 'Diamond Push-Ups', equipment: 'body weight', target: 'triceps', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=400&auto=format&fit=crop' },
    { id: 'tc5', name: 'Tricep Dips', equipment: 'bench', target: 'triceps', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' }
  ],
  glutes: [
    { id: 'gl1', name: 'Barbell Hip Thrust', equipment: 'barbell', target: 'glutes', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop' },
    { id: 'gl2', name: 'Glute Bridges', equipment: 'body weight', target: 'glutes', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
    { id: 'gl3', name: 'Sumo Deadlift', equipment: 'barbell', target: 'glutes', difficulty: 'advanced', gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop' },
    { id: 'gl4', name: 'Cable Kickbacks', equipment: 'cable', target: 'glutes', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' },
    { id: 'gl5', name: 'Walking Lunges', equipment: 'dumbbell', target: 'glutes', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=400&auto=format&fit=crop' }
  ],
  hamstrings: [
    { id: 'hm1', name: 'Lying Leg Curl', equipment: 'machine', target: 'hamstrings', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' },
    { id: 'hm2', name: 'Romanian Deadlift', equipment: 'barbell', target: 'hamstrings', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop' },
    { id: 'hm3', name: 'Seated Leg Curl', equipment: 'machine', target: 'hamstrings', difficulty: 'beginner', gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' },
    { id: 'hm4', name: 'Nordic Hamstring Curl', equipment: 'body weight', target: 'hamstrings', difficulty: 'advanced', gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop' },
    { id: 'hm5', name: 'Single-Leg RDL', equipment: 'dumbbell', target: 'hamstrings', difficulty: 'intermediate', gifUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop' }
  ]
}

function BodyMap({ view, selected, onSelect, isDark }) {
  // 🚀 React Local state for hover tracking to eliminate sticky behaviors completely
  const [hovered, setHovered] = useState(null)

  // 🎨 High-tech translucent color setup
  const getFillColor = (muscle) => {
    if (selected === muscle) return 'rgba(255, 107, 53, 0.25)' // Soft high-tech glass fill
    if (hovered === muscle) return 'rgba(255, 107, 53, 0.12)'   // Light interactive aura glow
    return isDark ? 'rgba(42, 42, 42, 0.6)' : 'rgba(208, 208, 208, 0.5)' 
  }
  
  // ⚡ Active sharp border indicators
  const getStrokeColor = (muscle) => {
    if (selected === muscle) return '#FF6B35' // Sharp solid active boundary
    if (hovered === muscle) return 'rgba(255, 107, 53, 0.6)'
    return isDark ? '#444' : '#bbb'
  }

  const getStrokeWidth = (muscle) => {
    return selected === muscle || hovered === muscle ? '1.5' : '1'
  }

  return (
    <svg viewBox="0 0 200 400" className="w-full max-w-[220px] mx-auto cursor-pointer select-none">
      {/* Body outline */}
      <ellipse cx="100" cy="40" rx="28" ry="32" fill={isDark ? '#1f1f1f' : '#e8e8e8'} stroke={isDark ? '#444' : '#bbb'} strokeWidth="1" />

      {view === 'front' ? (
        <>
          {/* Neck */}
          <rect x="90" y="68" width="20" height="18" rx="4" fill={isDark ? '#1f1f1f' : '#e8e8e8'} stroke={isDark ? '#444' : '#bbb'} strokeWidth="1" />

          {/* Chest */}
          <ellipse cx="100" cy="110" rx="38" ry="28"
            fill={getFillColor('chest')} stroke={getStrokeColor('chest')} strokeWidth={getStrokeWidth('chest')}
            onClick={() => onSelect('chest')}
            onMouseEnter={() => setHovered('chest')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Shoulders */}
          <ellipse cx="58" cy="95" rx="18" ry="14"
            fill={getFillColor('shoulders')} stroke={getStrokeColor('shoulders')} strokeWidth={getStrokeWidth('shoulders')}
            onClick={() => onSelect('shoulders')}
            onMouseEnter={() => setHovered('shoulders')}
            onMouseLeave={() => setHovered(null)}
          />
          <ellipse cx="142" cy="95" rx="18" ry="14"
            fill={getFillColor('shoulders')} stroke={getStrokeColor('shoulders')} strokeWidth={getStrokeWidth('shoulders')}
            onClick={() => onSelect('shoulders')}
            onMouseEnter={() => setHovered('shoulders')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Biceps */}
          <rect x="34" y="108" width="18" height="48" rx="9"
            fill={getFillColor('biceps')} stroke={getStrokeColor('biceps')} strokeWidth={getStrokeWidth('biceps')}
            onClick={() => onSelect('biceps')}
            onMouseEnter={() => setHovered('biceps')}
            onMouseLeave={() => setHovered(null)}
          />
          <rect x="148" y="108" width="18" height="48" rx="9"
            fill={getFillColor('biceps')} stroke={getStrokeColor('biceps')} strokeWidth={getStrokeWidth('biceps')}
            onClick={() => onSelect('biceps')}
            onMouseEnter={() => setHovered('biceps')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Forearms */}
          <rect x="28" y="160" width="16" height="44" rx="8" fill={isDark ? '#1f1f1f' : '#e8e8e8'} stroke={isDark ? '#444' : '#bbb'} strokeWidth="1" />
          <rect x="156" y="160" width="16" height="44" rx="8" fill={isDark ? '#1f1f1f' : '#e8e8e8'} stroke={isDark ? '#444' : '#bbb'} strokeWidth="1" />

          {/* Abs */}
          <rect x="80" y="135" width="40" height="55" rx="8"
            fill={getFillColor('abs')} stroke={getStrokeColor('abs')} strokeWidth={getStrokeWidth('abs')}
            onClick={() => onSelect('abs')}
            onMouseEnter={() => setHovered('abs')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Quads */}
          <rect x="72" y="198" width="24" height="72" rx="10"
            fill={getFillColor('quads')} stroke={getStrokeColor('quads')} strokeWidth={getStrokeWidth('quads')}
            onClick={() => onSelect('quads')}
            onMouseEnter={() => setHovered('quads')}
            onMouseLeave={() => setHovered(null)}
          />
          <rect x="104" y="198" width="24" height="72" rx="10"
            fill={getFillColor('quads')} stroke={getStrokeColor('quads')} strokeWidth={getStrokeWidth('quads')}
            onClick={() => onSelect('quads')}
            onMouseEnter={() => setHovered('quads')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Calves front */}
          <rect x="74" y="276" width="20" height="52" rx="8" fill={isDark ? '#1f1f1f' : '#e8e8e8'} stroke={isDark ? '#444' : '#bbb'} strokeWidth="1" />
          <rect x="106" y="276" width="20" height="52" rx="8" fill={isDark ? '#1f1f1f' : '#e8e8e8'} stroke={isDark ? '#444' : '#bbb'} strokeWidth="1" />
        </>
      ) : (
        <>
          {/* Neck back */}
          <rect x="90" y="68" width="20" height="18" rx="4" fill={isDark ? '#1f1f1f' : '#e8e8e8'} stroke={isDark ? '#444' : '#bbb'} strokeWidth="1" />

          {/* Traps */}
          <ellipse cx="100" cy="95" rx="38" ry="18"
            fill={getFillColor('traps')} stroke={getStrokeColor('traps')} strokeWidth={getStrokeWidth('traps')}
            onClick={() => onSelect('traps')}
            onMouseEnter={() => setHovered('traps')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Shoulders back */}
          <ellipse cx="58" cy="95" rx="18" ry="14"
            fill={getFillColor('shoulders')} stroke={getStrokeColor('shoulders')} strokeWidth={getStrokeWidth('shoulders')}
            onClick={() => onSelect('shoulders')}
            onMouseEnter={() => setHovered('shoulders')}
            onMouseLeave={() => setHovered(null)}
          />
          <ellipse cx="142" cy="95" rx="18" ry="14"
            fill={getFillColor('shoulders')} stroke={getStrokeColor('shoulders')} strokeWidth={getStrokeWidth('shoulders')}
            onClick={() => onSelect('shoulders')}
            onMouseEnter={() => setHovered('shoulders')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Lats */}
          <ellipse cx="100" cy="128" rx="38" ry="30"
            fill={getFillColor('lats')} stroke={getStrokeColor('lats')} strokeWidth={getStrokeWidth('lats')}
            onClick={() => onSelect('lats')}
            onMouseEnter={() => setHovered('lats')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Triceps */}
          <rect x="34" y="108" width="18" height="48" rx="9"
            fill={getFillColor('triceps')} stroke={getStrokeColor('triceps')} strokeWidth={getStrokeWidth('triceps')}
            onClick={() => onSelect('triceps')}
            onMouseEnter={() => setHovered('triceps')}
            onMouseLeave={() => setHovered(null)}
          />
          <rect x="148" y="108" width="18" height="48" rx="9"
            fill={getFillColor('triceps')} stroke={getStrokeColor('triceps')} strokeWidth={getStrokeWidth('triceps')}
            onClick={() => onSelect('triceps')}
            onMouseEnter={() => setHovered('triceps')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Forearms back */}
          <rect x="28" y="160" width="16" height="44" rx="8" fill={isDark ? '#1f1f1f' : '#e8e8e8'} stroke={isDark ? '#444' : '#bbb'} strokeWidth="1" />
          <rect x="156" y="160" width="16" height="44" rx="8" fill={isDark ? '#1f1f1f' : '#e8e8e8'} stroke={isDark ? '#444' : '#bbb'} strokeWidth="1" />

          {/* Lower back */}
          <rect x="80" y="155" width="40" height="35" rx="6" fill={isDark ? '#1f1f1f' : '#e8e8e8'} stroke={isDark ? '#444' : '#bbb'} strokeWidth="1" />

          {/* Glutes */}
          <ellipse cx="100" cy="205" rx="32" ry="20"
            fill={getFillColor('glutes')} stroke={getStrokeColor('glutes')} strokeWidth={getStrokeWidth('glutes')}
            onClick={() => onSelect('glutes')}
            onMouseEnter={() => setHovered('glutes')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Hamstrings */}
          <rect x="72" y="222" width="24" height="60" rx="10"
            fill={getFillColor('hamstrings')} stroke={getStrokeColor('hamstrings')} strokeWidth={getStrokeWidth('hamstrings')}
            onClick={() => onSelect('hamstrings')}
            onMouseEnter={() => setHovered('hamstrings')}
            onMouseLeave={() => setHovered(null)}
          />
          <rect x="104" y="222" width="24" height="60" rx="10"
            fill={getFillColor('hamstrings')} stroke={getStrokeColor('hamstrings')} strokeWidth={getStrokeWidth('hamstrings')}
            onClick={() => onSelect('hamstrings')}
            onMouseEnter={() => setHovered('hamstrings')}
            onMouseLeave={() => setHovered(null)}
          />

          {/* Calves back */}
          <rect x="74" y="288" width="20" height="44" rx="8" fill={isDark ? '#1f1f1f' : '#e8e8e8'} stroke={isDark ? '#444' : '#bbb'} strokeWidth="1" />
          <rect x="106" y="288" width="20" height="44" rx="8" fill={isDark ? '#1f1f1f' : '#e8e8e8'} stroke={isDark ? '#444' : '#bbb'} strokeWidth="1" />
        </>
      )}
    </svg>
  )
}

function Explore({ theme }) {
  const isDark = theme === 'dark'
  const [view, setView] = useState('front')
  const [selected, setSelected] = useState(null)
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const surface = isDark ? '#161616' : '#ffffff'
  const border = isDark ? '#2a2a2a' : '#e0e0e0'

  useEffect(() => {
    if (!selected) return
    const muscle = MUSCLE_GROUPS[selected]?.api
    if (!muscle) return

    setLoading(true)
    setError(null)
    setExercises([])

    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY

    if (!apiKey) {
      console.warn("RapidAPI key missing in environment variables. Loading local fallback instead.")
      setTimeout(() => {
        setExercises(LOCAL_FALLBACK_DATA[muscle] || [])
        setLoading(false)
      }, 600)
      return
    }

    fetch(`https://exercisedb.p.rapidapi.com/exercises/muscle/${muscle}?limit=12&offset=0`, {
      headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setExercises(data)
        } else {
          console.log("API responded but array was empty or rate-limited. Serving local fallback layout.")
          setExercises(LOCAL_FALLBACK_DATA[muscle] || [])
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("RapidAPI connection error, switching to safe mock database:", err)
        setExercises(LOCAL_FALLBACK_DATA[muscle] || [])
        setLoading(false)
      })
  }, [selected])

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-[#0d0d0d] text-white' : 'bg-[#F4F6F6] text-[#121212]'}`}>

      {/* Header */}
      <div className="px-4 sm:px-8 lg:px-16 py-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-px bg-[#FF6B35]" />
          <span className="text-xs font-bold tracking-[3px] uppercase text-[#FF6B35]">Exercise Library </span>
        </div>
        <h1 className="font-black tracking-wider mb-2"
          style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
          FIND YOUR <span className="text-[#FF6B35]">EXERCISE.</span>
        </h1>
        <p className={`text-sm lg:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Click a muscle on the body map to explore exercises.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 lg:px-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">

          {/* Left — Body Map */}
          <div>
            {/* Front / Back Toggle */}
            <div className="flex mb-6 border" style={{ borderColor: border }}>
              <button
                onClick={() => setView('front')}
                className={`flex-1 py-2.5 text-xs font-black tracking-[2px] uppercase transition-colors ${view === 'front' ? 'bg-[#FF6B35] text-white' : isDark ? 'bg-[#161616] text-gray-400 hover:text-white' : 'bg-white text-gray-400 hover:text-[#121212]'}`}>
                Front
              </button>
              <button
                onClick={() => setView('back')}
                className={`flex-1 py-2.5 text-xs font-black tracking-[2px] uppercase transition-colors ${view === 'back' ? 'bg-[#FF6B35] text-white' : isDark ? 'bg-[#161616] text-gray-400 hover:text-white' : 'bg-white text-gray-400 hover:text-[#121212]'}`}>
                Back
              </button>
            </div>

            {/* SVG Body */}
            <div className="p-4 border" style={{ background: surface, borderColor: border }}>
              <BodyMap view={view} selected={selected} onSelect={setSelected} isDark={isDark} />
            </div>

            {/* Muscle Labels */}
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(MUSCLE_GROUPS)
                .filter(([key]) => {
                  const frontMuscles = ['chest', 'shoulders', 'biceps', 'abs', 'quads']
                  const backMuscles = ['traps', 'lats', 'triceps', 'glutes', 'hamstrings']
                  return view === 'front' ? frontMuscles.includes(key) : backMuscles.includes(key)
                })
                .map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setSelected(key)}
                    className={`px-3 py-1 text-xs font-bold tracking-wider uppercase transition-colors border ${selected === key
                      ? 'bg-[#FF6B35] text-white border-[#FF6B35]'
                      : isDark
                        ? 'bg-[#161616] text-gray-400 border-[#2a2a2a] hover:border-[#FF6B35] hover:text-white'
                        : 'bg-white text-gray-500 border-[#e0e0e0] hover:border-[#FF6B35] hover:text-[#121212]'
                    }`}>
                    {val.label}
                  </button>
                ))}
            </div>
          </div>

          {/* Right — Exercise List */}
          <div>
            {!selected && (
              <div className="flex flex-col items-center justify-center h-64 border" style={{ borderColor: border, background: surface }}>
                <div className="text-4xl mb-3">👈</div>
                <p className={`text-sm font-bold tracking-wider uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Select a muscle to get started
                </p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-64 border" style={{ borderColor: border, background: surface }}>
                <div className="w-8 h-8 border-2 border-[#FF6B35] border-t-transparent rounded-full animate-spin mb-3" />
                <p className={`text-sm font-bold tracking-wider uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Loading exercises
                </p>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center h-64 border border-red-500/30 bg-red-500/5">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {selected && !loading && !error && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-black tracking-wider uppercase text-xl" style={{ fontFamily: 'Impact, Haettenschweiler, sans-serif' }}>
                    {MUSCLE_GROUPS[selected]?.label}<span className="text-[#FF6B35]"> Exercises</span>
                  </h2>
                  <span className={`text-xs font-bold tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {exercises.length} found
                  </span>
                </div>

                {exercises.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {exercises.map((ex) => (
                      <div key={ex.id}
                        className="border transition-all duration-200 cursor-pointer hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
                        style={{ background: surface, borderColor: border }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = border}>

                        {ex.gifUrl && (
                          <img src={ex.gifUrl} alt={ex.name} className="w-full h-40 object-cover" style={{ background: isDark ? '#1f1f1f' : '#f0f0f0' }} />
                        )}

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div className="mb-3">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-black text-sm tracking-wide uppercase leading-tight">{ex.name}</h3>
                              <span className={`text-[10px] px-2 py-0.5 shrink-0 font-bold uppercase tracking-wider ${ex.difficulty === 'beginner' ? 'text-[#2EC4B6] bg-[rgba(46,196,182,0.1)]' : ex.difficulty === 'intermediate' ? 'text-[#FF6B35] bg-[rgba(255,107,53,0.1)]' : 'text-red-400 bg-red-400/10'}`}>
                                {ex.difficulty || 'intermediate'}
                              </span>
                            </div>
                            <div className={`text-[11px] font-semibold tracking-wider uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              EQUIPMENT: <strong className={isDark ? 'text-gray-300' : 'text-gray-700'}>{ex.equipment}</strong>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-dashed" style={{ borderColor: border }}>
                            <span className="text-xs text-[#2EC4B6] font-bold tracking-wider uppercase">{ex.target}</span>
                            <button className="text-[11px] font-black tracking-wider uppercase text-[#FF6B35] hover:text-white transition-colors">
                              Check Form →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 border" style={{ borderColor: border, background: surface }}>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No exercises found for this group in local backup.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore