import React, { useState } from 'react';
import { EXERCISE_REFS } from './ExerciseData.js'; // Adjust path if needed

export default function Swapper() {
  // 🟢 FIXED: Initial state set to empty string for clean onboarding state
  const [selectedExercise, setSelectedExercise] = useState('');
  const [swapReason, setSwapReason] = useState('equipment'); // equipment, injury, home

  const currentData = EXERCISE_REFS[selectedExercise] || {};

  // 1. Get all exercises that hit the exact same muscle group
  const sameMuscleExercises = Object.keys(EXERCISE_REFS).filter(name => 
    name !== selectedExercise && 
    EXERCISE_REFS[name].muscle === currentData.muscle
  );

  // 2. Dynamic Filtration Array computed on EVERY Single Re-render perfectly
  const getFilteredList = () => {
    if (!selectedExercise) return [];
    
    if (swapReason === 'home') {
      return sameMuscleExercises.filter(name => {
        const eq = (EXERCISE_REFS[name].equipment || '').toLowerCase();
        return eq.includes('bodyweight') || eq.includes('none');
      });
    }
    
    if (swapReason === 'injury') {
      return sameMuscleExercises.filter(name => {
        const eq = (EXERCISE_REFS[name].equipment || '').toLowerCase();
        return eq.includes('cable') || (eq.includes('dumbbell') && name !== selectedExercise);
      });
    }

    const eqList = sameMuscleExercises.filter(name => 
      (EXERCISE_REFS[name].equipment || '').toLowerCase() !== (currentData.equipment || '').toLowerCase()
    );
    return eqList.length > 0 ? eqList : sameMuscleExercises;
  };

  const finalRenderList = getFilteredList().slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-nav p-6 pt-24">
      {/* Hero Header Matrix — Max Width Extended */}
      <div className="max-w-7xl mx-auto xl:max-w-[95%] mb-8 border-b border-gray-800/40 pb-4">
        <h1 className="text-2xl font-black tracking-wider text-[#FF6B35] uppercase font-ops">
          🧠 Smart Routine Swapper Engine
        </h1>
        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-semibold">
          Biomechanical Alternate Routing Matrix v1.0
        </p>
      </div>

      {/* Main Dropdown Matrix Control Panel */}
      <div className="max-w-7xl mx-auto xl:max-w-[95%] mb-6">
        <div className="bg-[#0d0d0d] border border-gray-800 p-4 rounded-sm max-w-xl">
          <label className="text-[10px] uppercase font-black text-gray-500 block mb-1.5 tracking-wider">
            ⚡ Select Target Core Lift
          </label>
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="w-full p-2.5 bg-[#121212] border border-gray-800 text-xs font-bold text-white focus:outline-none focus:border-[#FF6B35] rounded-xs cursor-pointer transition-colors"
          >
            {/* 🟢 NEW PLACEHOLDER OPTION */}
            <option value="" disabled hidden>--- CHOOSE THE EXERCISE YOU WANT TO SWAP ---</option>
            {Object.keys(EXERCISE_REFS).sort().map(name => (
              <option key={name} value={name} className="bg-[#121212]">{name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Conditional Layout Routing */}
      {!selectedExercise ? (
/* 🌌 PRE-SELECTION SCI-FI HUD EMPTY STATE DISPLAY — Infinite Laser Orbit */
        <div className="max-w-7xl mx-auto xl:max-w-[95%] animate-fadeIn">
          <div className="w-full min-h-[450px] bg-[#0d0d0d] rounded-xs flex flex-col items-center justify-center p-8 relative overflow-hidden group border border-gray-900 shadow-2xl">
            
            {/* 🚀 INFINITE MOVING LASER BORDER OVERLAYS */}
            {/* Top Border Laser (Left to Right) */}
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent animate-[marquee_3s_linear_infinite]"></div>
            
            {/* Right Border Laser (Top to Bottom) */}
            <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#00F5D4] to-transparent animate-[marqueeDown_3s_linear_infinite] delay-75"></div>
            
            {/* Bottom Border Laser (Right to Left) */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent animate-[marqueeReverse_3s_linear_infinite]"></div>
            
            {/* Left Border Laser (Bottom to Top) */}
            <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#00F5D4] to-transparent animate-[marqueeUp_3s_linear_infinite] delay-150"></div>

            {/* Internal Cyber Tech Corner Brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#FF6B35]/30"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#FF6B35]/30"></div>

            {/* Core Instruction Layout */}
            <div className="flex flex-col items-center max-w-md text-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-[#FF6B35]/5 border border-[#FF6B35]/20 flex items-center justify-center text-xl shadow-[0_0_30px_rgba(255,107,53,0.1)] group-hover:scale-105 transition-transform duration-500">
                🔄
              </div>
              <h2 className="text-base font-black uppercase tracking-widest text-white">
                Swapper Engine Standby Mode
              </h2>
              <p className="text-[11px] text-gray-400 leading-relaxed max-w-sm">
                Please initialize the routing matrix by selecting your current core exercise from the dropdown layout above. The system will instantly fetch dynamic biomechanical alternatives.
              </p>
              
              <div className="flex gap-2 mt-1">
                <span className="text-[9px] uppercase font-black px-2 py-0.5 bg-gray-950 text-gray-500 border border-gray-900 rounded-xs">
                  Vector Matrix: Offline
                </span>
                <span className="text-[9px] uppercase font-black px-2 py-0.5 bg-gray-950 text-[#FF6B35] border border-[#FF6B35]/10 rounded-xs animate-pulse tracking-wide">
                  Awaiting Input Signal
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 📊 CORE ACTIVE INTERFACE WORKBENCH GRID */
        <div className="max-w-7xl mx-auto xl:max-w-[95%] grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          
          {/* Left Control Column: Input & Target Specs */}
          <div className="bg-[#0d0d0d] border border-gray-800 p-4 rounded-sm flex flex-col gap-4 h-fit">
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

            {/* ⚡ FUSED FULL-SCALE BIOMECHANICAL ENGINE MATRIX */}
            <div className="mt-2 pt-4 border-t border-gray-900/60 flex flex-col gap-4">
              <span className="text-[10px] uppercase font-black tracking-widest text-[#FF6B35]">
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
                <span className="text-[9px] uppercase font-black text-gray-500 tracking-wider">🎯 Target Fiber Distribution Map</span>
                
                {(() => {
                  const muscle = (currentData.muscle || '').toLowerCase();
                  
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
                <span className="text-[9px] uppercase font-black text-gray-500 tracking-wider">📈 Volume Translation Protocol</span>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {swapReason === 'home' && "Gym load intensity isn't matching? Shift protocol to 4 Sets × 15-20 Reps with a strict 30-second rest cadence to spike metabolic stress accumulation."}
                  {swapReason === 'injury' && "Joint preservation mode active. Maintain 3 Sets × 12 Reps. Focus entirely on peak squeeze contraction at the top for 1 full second."}
                  {swapReason === 'equipment' && "Direct alternate routing mapped. Stick to standard 4 Sets × 8-10 Reps progression matrix. Load vectors remain structurally uniform."}
                </p>
              </div>

              {/* Quick Micro-Tip Box */}
              <div className="p-3 bg-[#FF6B35]/5 border border-[#FF6B35]/10 rounded-xs text-[11px] text-gray-400 leading-relaxed">
                <span className="font-bold text-white block mb-0.5 text-[10px] uppercase tracking-wide">💡 Pro-Engagement Cue:</span>
                Always control the eccentric (lowering) phase for 2-3 seconds when running alternative vector setups to keep total mechanical tension uniform.
              </div>
            </div>
          </div>

          {/* Right Columns: Output Alternatives Panel with Dynamic Mapping */}
          <div className="lg:col-span-2 bg-[#0d0d0d] border border-gray-8850 p-5 rounded-sm relative overflow-hidden min-h-[400px]">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#FF6B35] bg-[#FF6B35]/10 px-2.5 py-1 border border-[#FF6B35]/20 rounded-xs inline-block mb-4">
              🔄 Biomechanical Alternatives Located
            </span>

            {/* Quick Stats Banner */}
            <div className="mb-4 p-3 bg-[#121212] border border-gray-900 rounded-xs flex gap-4 text-xs">
              <div><span className="text-gray-500 font-bold uppercase">Target Muscle:</span> <span className="text-red-400 font-black uppercase">{currentData.muscle || 'Compound'}</span></div>
              <div><span className="text-gray-500 font-bold uppercase">Default Gear:</span> <span className="text-gray-300 font-bold uppercase">{currentData.equipment || 'None'}</span></div>
            </div>

            {/* Dynamic Alternatives Render Loop */}
            <div className="flex flex-col gap-5">
              {finalRenderList.map((altName) => {
                const altDetails = EXERCISE_REFS[altName] || {};
                
                return (
                  <div 
                    key={altName} 
                    className="p-5 bg-[#0f0f0f] border border-gray-900 rounded-xs flex flex-col gap-2.5 transition-all duration-300 relative group transform hover:scale-[1.01] hover:bg-[#131313] shadow-xl"
                  >
                    {/* 🌌 POPPED-OUT FUTURISTIC SCI-FI CORNER BRACKETS */}
                    <div className="absolute -top-[3px] -left-[3px] w-3 h-3 border-t-[3px] border-l-[3px] border-[#FF6B35]/40 group-hover:border-[#FF6B35] transition-colors duration-300 rounded-tl-xs drop-shadow-[0_0_4px_rgba(255,107,53,0.2)]"></div>
                    <div className="absolute -top-[3px] -right-[3px] w-3 h-3 border-t-[3px] border-r-[3px] border-[#FF6B35]/40 group-hover:border-white transition-colors duration-300 rounded-tr-xs drop-shadow-[0_0_4px_rgba(255,107,53,0.2)]"></div>
                    <div className="absolute -bottom-[3px] -left-[3px] w-3 h-3 border-b-[3px] border-l-[3px] border-[#FF6B35]/40 group-hover:border-white transition-colors duration-300 rounded-bl-xs drop-shadow-[0_0_4px_rgba(255,107,53,0.2)]"></div>
                    <div className="absolute -bottom-[3px] -right-[3px] w-3 h-3 border-b-[3px] border-r-[3px] border-[#FF6B35]/40 group-hover:border-[#FF6B35] transition-colors duration-300 rounded-br-xs drop-shadow-[0_0_4px_rgba(255,107,53,0.2)]"></div>

                    {/* 🚀 DUAL EDGE SUBTLE LASER ACCENTS */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35]/80 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out overflow-hidden"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35]/80 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-out overflow-hidden"></div>

                    {/* Clean Non-Duplicated Header Area */}
                    <div className="flex justify-between items-center border-b border-gray-900/60 pb-2">
                      <span className="text-base font-black uppercase text-[#FF6B35] tracking-wide group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,107,53,0.15)]">
                        {altName}
                      </span>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-gray-950 text-[#00F5D4] border border-[#00F5D4]/20 rounded-xs transition-colors duration-300">
                        {altDetails.equipment || 'Custom Fluid'}
                      </span>
                    </div>
                    
                    {/* 🔥 ULTRA-SMART CONTEXTUAL SCENARIO GUIDANCE ENGINE */}
                    <div className="mt-1 flex flex-col gap-1">
                      <span className="text-[9px] uppercase font-black tracking-widest text-gray-500">Engine Analysis & Cues:</span>
                      <div className="text-xs text-gray-300 leading-relaxed">
                        {swapReason === 'equipment' && (
                          <p>
                            No {currentData.equipment}? <span className="text-[#FF6B35] font-semibold">{altName}</span> uses <span className="text-[#FF6B35] font-semibold">{altDetails.equipment}</span> to hit the same {currentData.muscle} with equal intensity.
                            {altDetails.tips?.[0] && <span className="block mt-1 text-gray-400">→ {altDetails.tips[0]}</span>}
                          </p>
                        )}
                        {swapReason === 'injury' && (
                          <p>
                            <span className="text-yellow-500 font-semibold">⚠️ Joint Safe:</span> <span className="text-[#FF6B35] font-semibold">{altName}</span> with {altDetails.equipment} reduces joint stress.
                            {altDetails.tips?.[0] && <span className="block mt-1 text-gray-400">→ {altDetails.tips[0]}</span>}
                          </p>
                        )}
                        {swapReason === 'home' && (
                          <p>
                            <span className="text-purple-400 font-semibold">🏠 Zero-Rig:</span> <span className="text-[#FF6B35] font-semibold">{altName}</span> — {altDetails.equipment}.
                            {altDetails.tips?.[0] && <span className="block mt-1 text-gray-400">→ {altDetails.tips[0]}</span>}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 📈 DYNAMIC FILLER MATRIX */}
            {finalRenderList.length < 3 && (
              <div className="mt-4 flex flex-col gap-4 animate-fadeIn">
                <div className="p-4 bg-[#0e0e0e] border border-gray-900 rounded-xs flex flex-col gap-4 opacity-85 hover:opacity-100 transition-opacity">
                  <div className="border-b border-gray-800/60 pb-2">
                    <span className="text-[11px] uppercase font-black tracking-widest text-[#FF6B35]">
                      📊 Engine Optimization Checklist (Alternative Strategy)
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="flex flex-col gap-2 bg-[#0d0d0d] p-3 border border-gray-900 rounded-xs">
                      <span className="font-bold text-gray-500 uppercase text-[9px] tracking-wide">🔒 Joint Safety & Tension Guide</span>
                      <p className="text-gray-400 text-[11px] leading-relaxed">
                        Alternative options are limited here. Avoid forcing extreme progressive overload. Instead, focus on <span className="text-white font-semibold">slow and controlled reps</span> to maximize Time-Under-Tension (TUT). This keeps full mechanical load on the muscle while protecting your joints from shear forces.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 bg-[#0d0d0d] p-3 border border-gray-900 rounded-xs">
                      <span className="font-bold text-gray-500 uppercase text-[9px] tracking-wide">🔄 Workout Volume Management</span>
                      <p className="text-gray-400 text-[11px] leading-relaxed">
                        Since there are only 1-2 high-quality alternatives available for the <span className="text-white lowercase font-medium">{currentData.muscle || 'target'}</span> right now, avoid over-training this single movement. Allocate your remaining workout capacity and energy sets into secondary accessory exercises safely.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0e0e0e] border border-gray-900 rounded-xs flex flex-col gap-3 opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-[9px] uppercase font-black text-gray-500 tracking-wider">
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
      )}
    </div>
  );
}