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
    <div className="min-h-screen bg-transparent text-white font-nav p-6 pt-24">

        
      {/* Hero Header Matrix — Max Width Extended */}
      <div className="max-w-7xl mx-auto xl:max-w-[95%] mb-8 border-b border-gray-800/40 pb-4">
        <h1 className="text-2xl font-black tracking-wider text-[#FF6B35] uppercase font-ops">
          🧠 Smart Routine Swapper Engine
        </h1>
        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-semibold">
          Biomechanical Alternate Routing Matrix v1.0
        </p>
      </div>

{/* Main Grid Workbench — Fused Screen-Edge Tracking */}
      <div className="max-w-7xl mx-auto xl:max-w-[95%] grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Control Column: Input & Target Specs */}
        <div className="bg-[#0d0d0d] border border-gray-800 p-4 rounded-sm flex flex-col gap-4 h-fit">
          <div>
            <label className="text-[10px] uppercase font-black text-red-500 block mb-1">Select Core Lift</label>
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
            <label className="text-[10px] uppercase font-black text-purple-500 block mb-1.5">Swap Context Vector</label>
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

{/* ⚡ FUSED FULL-SCALE BIOMECHANICAL ENGINE MATRIX */}
          <div className="mt-2 pt-4 border-t border-gray-900/60 flex flex-col gap-4">
            <span className="text-[14px] uppercase font-black tracking-widest text-green-500">
              ⚡ Live Engine Metrics
            </span>
            
            {/* Live Stats Row */}
            <div className="bg-[#121212] p-3 border border-gray-850 rounded-xs flex flex-col gap-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-400 font-medium">Primary Joint Load:</span>
                <span className="text-red-400 font-black uppercase tracking-wider text-[10px]">
                  {swapReason === 'injury' ? '⚡ Deflected' : '🔥 High'}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-400 font-medium">Target Fiber Recruits:</span>
                <span className="text-[#00F5D4] font-black text-[10px]">
                  {swapReason === 'home' ? '80% (Tempo)' : '100% (Optimal)'}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-400 font-medium">System Constraint:</span>
                <span className="text-purple-400 font-black text-[10px] uppercase">
                  {swapReason === 'home' ? 'Zero Gear' : swapReason === 'injury' ? 'Fluid Path' : 'Rig Block'}
                </span>
              </div>
            </div>

{/* 📊 INTERACTIVE MUSCLE HEAD ENGAGEMENT MAP (Fully Dynamic Engine) */}
            <div className="bg-[#121212] p-3 border border-gray-850 rounded-xs flex flex-col gap-2.5">
              <span className="text-[10px] uppercase font-black text-[#00F5D4] tracking-wider">🎯 Target Fiber Distribution Map</span>
              
              {(() => {
                const muscle = (currentData.muscle || '').toLowerCase();
                
                // Set custom labels and values based on the exact selected muscle group
                let head1 = "Primary Target Fibers";
                let head2 = "Stabilizers / Assistance";
                let val1 = swapReason === 'injury' ? 70 : 95;
                let val2 = swapReason === 'home' ? 60 : 80;

                if (muscle === 'shoulders') {
                  head1 = "Anterior / Lateral Deltoids";
                  head2 = "Posterior Deltoids & Rotator Cuff";
                  val1 = swapReason === 'injury' ? 65 : 90;
                  val2 = swapReason === 'home' ? 55 : 75;
                } else if (muscle === 'legs') {
                  head1 = "Glutes & Hamstrings Load";
                  head2 = "Quadriceps Stabilization";
                  val1 = swapReason === 'home' ? 70 : 95;
                  val2 = swapReason === 'injury' ? 45 : 85;
                } else if (muscle === 'chest') {
                  head1 = "Sternal Head (Mid-Chest)";
                  head2 = "Clavicular Head (Upper Chest)";
                  val1 = swapReason === 'injury' ? 60 : 95;
                  val2 = swapReason === 'home' ? 50 : 80;
                } else if (muscle === 'back') {
                  head1 = "Latissimus Dorsi (Lats)";
                  head2 = "Rhomboids & Traps Matrix";
                  val1 = swapReason === 'home' ? 65 : 90;
                  val2 = swapReason === 'injury' ? 70 : 85;
                } else if (muscle === 'arms' || muscle === 'biceps' || muscle === 'triceps') {
                  head1 = "Primary Isolation Peak";
                  head2 = "Synergist Forearm / Elongation";
                  val1 = swapReason === 'injury' ? 75 : 95;
                  val2 = swapReason === 'home' ? 60 : 75;
                }

                return (
                  <div className="flex flex-col gap-2">
                    <div>
                      <div className="flex justify-between text-[10px] uppercase text-gray-400 mb-1">
                        <span>{head1}</span>
                        <span className="text-white font-bold">{val1}%</span>
                      </div>
                      <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden border border-gray-850">
                        <div className="bg-[#FF6B35] h-full transition-all duration-500" style={{ width: `${val1}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] uppercase text-gray-400 mb-1">
                        <span>{head1 === "Primary Target Fibers" ? "Secondary Assistance" : head2}</span>
                        <span className="text-white font-bold">{val2}%</span>
                      </div>
                      <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden border border-gray-850">
                        <div className="bg-[#FF6B35] h-full transition-all duration-500" style={{ width: `${val2}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 📈 PROGRESSION MATRIX LOADING CARD */}
            <div className="bg-[#121212] p-3 border border-gray-850 rounded-xs flex flex-col gap-2">
              <span className="text-[11px] uppercase font-black text-pink-500 tracking-wider">📈 Volume Translation Protocol</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                {swapReason === 'home' && "Gym load intensity isn't matching? Shift protocol to 4 Sets × 15-20 Reps with a strict 30-second rest cadence to spike metabolic stress accumulation."}
                {swapReason === 'injury' && "Joint preservation mode active. Maintain 3 Sets × 12 Reps. Focus entirely on peak squeeze contraction at the top for 1 full second."}
                {swapReason === 'equipment' && "Direct alternate routing mapped. Stick to standard 4 Sets × 8-10 Reps progression matrix. Load vectors remain structurally uniform."}
              </p>
            </div>

            {/* Quick Micro-Tip Box */}
            <div className="p-3 bg-[#FF6B35]/5 border border-[#FF6B35]/10 rounded-xs text-[11px] text-gray-400 leading-relaxed">
              <span className="font-bold text-white block mb-0.5 text-[12px] uppercase tracking-wide">💡 Pro-Engagement Cue:</span>
              Always control the eccentric (lowering) phase for 2-3 seconds when running alternative vector setups to keep total mechanical tension uniform.
            </div>
          </div>

        </div>

        {/* Right Columns: Output Alternatives Panel with Dynamic Mapping */}

{/* Right Columns: Output Alternatives Panel with Dynamic Mapping */}
        <div className="md:col-span-2 bg-[#0d0d0d] border border-gray-800 p-5 rounded-sm relative overflow-hidden min-h-[400px]">
          <span className="text-[12px] uppercase font-bold tracking-widest text-[#00FF66] bg-[#00FF66]/10 px-2.5 py-1 border border-[#00FF66]/20 rounded-xs inline-block mb-4">
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
                <div key={altName} className="group relative p-4 bg-[#121212] border-l-2 border-l-[#FF6B35] border-y-gray-850 border-r-gray-850 border rounded-xs flex flex-col shadow-md overflow-hidden transition-all duration-500 hover:border-y-[#00F5D4]/50 hover:border-r-[#00F5D4]/50 hover:shadow-[0_0_15px_rgba(0,245,212,0.1)] cursor-pointer">
                  
                  {/* ✨ THE CYBERPUNK SCANNER SWEEP EFFECT ✨ */}
                  {/* (Ye line hover hone par left se right jayegi) */}
                  <div className="absolute top-0 left-[-150%] w-full h-full bg-gradient-to-r from-transparent via-[#00F5D4]/20 to-transparent skew-x-[-30deg] transition-all duration-700 ease-in-out group-hover:left-[150%] pointer-events-none z-0"></div>

                  {/* 📝 ORIGINAL CONTENT WRAPPER (z-10 taaki text scanner ke upar rahe) */}
                  <div className="relative z-10 flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-black uppercase text-white tracking-wide">{altName}</span>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-gray-950 text-[#00F5D4] border border-[#00F5D4]/20 rounded-xs">
                        {altDetails.equipment || 'Custom Fluid'}
                      </span>
                    </div>
                    
                    {/* 🔥 ULTRA-SMART CONTEXTUAL SCENARIO GUIDANCE ENGINE */}
                    <div className="mt-2 pt-2 border-t border-gray-900/60 flex flex-col gap-1 transition-colors duration-500 group-hover:border-[#00F5D4]/30">
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

                </div>
              );
            })}
            <br />

{/* 📈 DYNAMIC FILLER MATRIX — Simplified Technical Language */}
            {finalRenderList.length < 3 && (
              <div className="mt-4 flex flex-col gap-4 animate-fadeIn">
                
                {/* 1. Core Checklist Grid */}
                <div className="p-4 bg-[#121212] border border-gray-850 rounded-xs flex flex-col gap-4">
                  <div className="border-b border-gray-800/60 pb-2">
                    <span className="text-[12px] uppercase font-black tracking-widest text-purple-500">
                      📊 Engine Optimization Checklist (Alternative Strategy)
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Left Box */}
                    <div className="flex flex-col gap-2 bg-[#0d0d0d] p-3 border border-gray-900 rounded-xs">
                      <span className="font-bold text-gray-500 uppercase text-[9px] tracking-wide">🔒 Joint Safety & Tension Guide</span>
                      <p className="text-gray-400 text-[11px] leading-relaxed">
                        Alternative options are limited here. Avoid forcing extreme progressive overload. Instead, focus on <span className="text-white font-semibold">slow and controlled reps</span> to maximize Time-Under-Tension (TUT). This keeps full mechanical load on the muscle while protecting your joints from shear forces.
                      </p>
                    </div>

                    {/* Right Box */}
                    <div className="flex flex-col gap-2 bg-[#0d0d0d] p-3 border border-gray-900 rounded-xs">
                      <span className="font-bold text-gray-500 uppercase text-[9px] tracking-wide">🔄 Workout Volume Management</span>
                      <p className="text-gray-400 text-[11px] leading-relaxed">
                        Since there are only 1-2 high-quality alternatives available for the <span className="text-white lowercase font-medium">{currentData.muscle || 'target'}</span> right now, avoid over-training this single movement. Allocate your remaining workout capacity and energy sets into secondary accessory exercises safely.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Comparison Table */}
                <div className="p-4 bg-[#121212] border border-gray-850 rounded-xs flex flex-col gap-3">
                  <span className="text-[11px] uppercase font-black text-blue-400 tracking-wider">
                    ⚖️ Movement Mechanics: Alternative vs Default Setup
                  </span>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-gray-800 text-gray-500 uppercase text-[9px]">
                          <th className="pb-2 font-bold">Movement Type</th>
                          <th className="pb-2 font-bold">Joint Strain</th>
                          <th className="pb-2 font-bold">Max Tension Range</th>
                          <th className="pb-2 font-bold">Movement Path</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300 divide-y divide-gray-900">
                        <tr className="hover:bg-gray-900/40">
                          <td className="py-2.5 font-bold text-white">Current Alternative</td>
                          <td className="py-2.5 text-green-400">⬇️ Very Safe / Low</td>
                          <td className="py-2.5">Squeeze at Top / Mid-Range</td>
                          <td className="py-2.5 text-[#00F5D4]">🛡️ Fluid / Natural Plane</td>
                        </tr>
                        <tr className="hover:bg-gray-900/40 opacity-60">
                          <td className="py-2.5 font-medium">Standard Barbell</td>
                          <td className="py-2.5 text-red-400">⬆️ High Joint Friction</td>
                          <td className="py-2.5">Deep Stretch at Bottom</td>
                          <td className="py-2.5">Rigid / Locked Path</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* System Pills */}
                <div className="flex gap-2 px-1">
                  <span className="text-[9px] uppercase font-black px-2 py-0.5 bg-gray-950 text-gray-400 border border-gray-850 rounded-xs">
                    🎯 System: Adaptive
                  </span>
                  <span className="text-[9px] uppercase font-black px-2 py-0.5 bg-gray-950 text-[#00F5D4] border border-[#00F5D4]/10 rounded-xs">
                    🔥 Target Focus: Activated
                  </span>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}