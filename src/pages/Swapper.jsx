import React, { useState } from 'react';
import { EXERCISE_REFS } from './ExerciseData.js'; // Adjust path if needed

export default function Swapper() {
  const [selectedExercise, setSelectedExercise] = useState(Object.keys(EXERCISE_REFS)[0] || '');
  const [swapReason, setSwapReason] = useState('equipment'); // equipment, injury, home

  const currentData = EXERCISE_REFS[selectedExercise] || {};

  // 1. Get all exercises that hit the exact same muscle group
  const sameMuscleExercises = Object.keys(EXERCISE_REFS).filter(name => 
    name !== selectedExercise && 
    EXERCISE_REFS[name].muscle === currentData.muscle
  );

  // 2. Dynamic Filtration Array computed on EVERY Single Re-render perfectly
  const getFilteredList = () => {
if (swapReason === 'home') {
      // 🏠 Home Pivot: Strictly Bodyweight or None. No Barbells, No Cables.
      return sameMuscleExercises.filter(name => {
        const eq = (EXERCISE_REFS[name].equipment || '').toLowerCase();
        return eq.includes('bodyweight') || eq.includes('none');
      });
    }
    
    if (swapReason === 'injury') {
      // ⚠️ Joint Pain: Skip fixed barbell or bodyweight strain. Cables or High-articulation Dumbbells only.
      return sameMuscleExercises.filter(name => {
        const eq = (EXERCISE_REFS[name].equipment || '').toLowerCase();
        return eq.includes('cable') || (eq.includes('dumbbell') && name !== selectedExercise);
      });
    }

    // Default: 'equipment'
    const eqList = sameMuscleExercises.filter(name => 
      (EXERCISE_REFS[name].equipment || '').toLowerCase() !== (currentData.equipment || '').toLowerCase()
    );
    return eqList.length > 0 ? eqList : sameMuscleExercises;
  };

  const finalRenderList = getFilteredList().slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-nav p-6 pt-24">
{/* Hero Header Matrix — Fused Design Language */}
      <div className="max-w-6xl mx-auto mb-8 border-b border-gray-800/60 pb-4">
        <h1 className="text-2xl font-black tracking-wider text-[#FF6B35] uppercase font-ops">
          🧠 Smart Routine Swapper Engine
        </h1>
        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-semibold">
          Biomechanical Alternate Routing Matrix v1.0
        </p>
      </div>

      {/* Main Grid Workbench */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Control Column: Input & Target Specs */}
        <div className="bg-[#0d0d0d] border border-gray-800 p-4 rounded-sm flex flex-col gap-4 h-fit">
          <div>
            <label className="text-[10px] uppercase font-black text-gray-500 block mb-1">Select Core Lift</label>
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="w-full p-2.5 bg-[#121212] border border-gray-800 text-xs font-bold text-white focus:outline-none focus:border-red-500 rounded-xs cursor-pointer"
            >
              {Object.keys(EXERCISE_REFS).sort().map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

{/* Swap Context Toggles */}
          <div>
            <label className="text-[10px] uppercase font-black text-gray-500 block mb-1.5">Swap Context Vector</label>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setSwapReason('equipment')}
                className={`w-full py-2 px-3 text-left text-xs font-black uppercase tracking-wider rounded-xs border transition-all cursor-pointer ${
                  swapReason === 'equipment' 
                    ? 'bg-[#FF6B35]/10 border-[#FF6B35] text-[#FF6B35] shadow-[0_0_15px_rgba(255,107,53,0.05)]' 
                    : 'bg-[#121212] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                }`}
              >
                🛠️ Missing Equipment
              </button>

              <button
                type="button"
                onClick={() => setSwapReason('injury')}
                className={`w-full py-2 px-3 text-left text-xs font-black uppercase tracking-wider rounded-xs border transition-all cursor-pointer ${
                  swapReason === 'injury' 
                    ? 'bg-[#FF6B35]/10 border-[#FF6B35] text-[#FF6B35] shadow-[0_0_15px_rgba(255,107,53,0.05)]' 
                    : 'bg-[#121212] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                }`}
              >
                ⚠️ Joint Pain / Flaw Constraint
              </button>

              <button
                type="button"
                onClick={() => setSwapReason('home')}
                className={`w-full py-2 px-3 text-left text-xs font-black uppercase tracking-wider rounded-xs border transition-all cursor-pointer ${
                  swapReason === 'home' 
                    ? 'bg-[#FF6B35]/10 border-[#FF6B35] text-[#FF6B35] shadow-[0_0_15px_rgba(255,107,53,0.05)]' 
                    : 'bg-[#121212] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                }`}
              >
                🏠 Home / Bodyweight Pivot
              </button>
            </div>
          </div>
        </div>

{/* Right Columns: Output Alternatives Panel with Dynamic Mapping */}
        <div className="md:col-span-2 bg-[#0d0d0d] border border-gray-800 p-5 rounded-sm relative overflow-hidden min-h-[400px]">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#FF6B35] bg-[#FF6B35]/10 px-2.5 py-1 border border-[#FF6B35]/20 rounded-xs inline-block mb-4">
            🔄 Biomechanical Alternatives Located
          </span>

          {/* Quick Stats Banner */}
          <div className="mb-4 p-3 bg-[#121212] border border-gray-900 rounded-xs flex gap-4 text-xs">
            <div><span className="text-gray-500 font-bold uppercase">Target Muscle:</span> <span className="text-red-400 font-black uppercase">{currentData.muscle || 'Compound'}</span></div>
            <div><span className="text-gray-500 font-bold uppercase">Default Gear:</span> <span className="text-gray-300 font-bold uppercase">{currentData.equipment || 'None'}</span></div>
          </div>

          {/* Dynamic Alternatives Render Loop */}
          <div className="flex flex-col gap-3.5">
            {finalRenderList.map((altName) => {
              const altDetails = EXERCISE_REFS[altName] || {};
              
              return (
                <div key={altName} className="p-4 bg-[#121212] border-l-2 border-l-[#FF6B35] border-y-gray-850 border-r-gray-850 border rounded-xs flex flex-col gap-1.5 shadow-md hover:border-y-gray-700 hover:border-r-gray-700 transition-all duration-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black uppercase text-white tracking-wide">{altName}</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-gray-950 text-[#00F5D4] border border-[#00F5D4]/20 rounded-xs">
                      {altDetails.equipment || 'Custom Fluid'}
                    </span>
                  </div>
                  
                  {/* 🔥 ULTRA-SMART CONTEXTUAL SCENARIO GUIDANCE ENGINE */}
                  <div className="mt-2 pt-2 border-t border-gray-900/60 flex flex-col gap-1">
                    <span className="text-[9px] uppercase font-black tracking-widest text-gray-500">Engine Analysis & Cues:</span>
                    <div className="text-xs text-gray-300 leading-relaxed">
{swapReason === 'equipment' && (
  <p>
    No {currentData.equipment}? <span className="text-[#00F5D4] font-semibold">{altName}</span> uses <span className="text-[#00F5D4] font-semibold">{altDetails.equipment}</span> to hit the same {currentData.muscle} with equal intensity.
    {altDetails.tips?.[0] && <span className="block mt-1 text-gray-400">→ {altDetails.tips[0]}</span>}
  </p>
)}
{swapReason === 'injury' && (
  <p>
    <span className="text-yellow-500 font-semibold">⚠️ Joint Safe:</span> <span className="text-[#00F5D4] font-semibold">{altName}</span> with {altDetails.equipment} reduces joint stress.
    {altDetails.tips?.[0] && <span className="block mt-1 text-gray-400">→ {altDetails.tips[0]}</span>}
  </p>
)}
{swapReason === 'home' && (
  <p>
    <span className="text-purple-400 font-semibold">🏠 Zero-Rig:</span> <span className="text-[#00F5D4] font-semibold">{altName}</span> — {altDetails.equipment}.
    {altDetails.tips?.[0] && <span className="block mt-1 text-gray-400">→ {altDetails.tips[0]}</span>}
  </p>
)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}