// src/ExerciseData.js

export const EXERCISE_REFS = {
  // === CHEST ===
  'Bench Press': {
    muscle: 'Chest',
    equipment: 'Barbell',
    img: '',
    tips: ["Feet flat on the floor, drive your shoulder blades hard into the bench.", "Lower the barbell controlled to your mid-chest; keep wrists stacked vertically over elbows."]
  },
  'Push-ups': {
    muscle: 'Chest',
    equipment: 'Bodyweight',
    img: '',
    tips: ["Keep your body in a strict straight line from head to heels; do not let your hips sag.", "Lower your chest until it almost touches the floor, tracking elbows back at a 45-degree angle."]
  },
  'Incline Bench Press': {
    muscle: 'Chest',
    equipment: 'Barbell',
    img: '',
    tips: ["Set the bench at a 30 to 45-degree angle to strictly prioritize the upper pectorals.", "Control the barbell down to your upper chest smoothly without bouncing."]
  },
  'Incline Dumbbell Press': {
    muscle: 'Chest',
    equipment: 'Dumbbell',
    img: '',
    tips: ["Keep weights stacked directly over elbows; press up in a controlled ceiling arc.", "Avoid clashing the dumbbells at the top to maintain constant tension."]
  },
  'Cable Flyes': {
    muscle: 'Chest',
    equipment: 'Cables',
    img: '',
    tips: ["Maintain a slight, fixed bend in your elbows throughout the entire opening and closing arc.", "Focus on squeezing your chest muscles together intensely at the peak contraction point."]
  },

  // === BACK / LATS / TRAPS ===
  'Pull-ups': {
    muscle: 'Back',
    equipment: 'Bodyweight',
    img: '',
    tips: ["Depress your scapula first, pulling your chest up to the bar rather than leading with your chin.", "Control the eccentric phase completely; avoid dropping down passively into a dead-hang."]
  },
  'Deadlift': {
    muscle: 'Back',
    equipment: 'Barbell',
    img: '',
    tips: ["Keep the bar locked tight against your shins and maintain a perfectly neutral spinal posture.", "Drive hard through your legs and snap your hips forward to lock out at the top position."]
  },
  'Bent Over Row': {
    muscle: 'Back',
    equipment: 'Barbell',
    img: '',
    tips: ["Hinge deeply at your hips to keep your torso near parallel to the floor safely.", "Pull the bar toward your lower belly button, leading strictly with your elbows."]
  },
  'Lat Pulldown': {
    muscle: 'Back',
    equipment: 'Machine',
    img: '',
    tips: ["Lean back slightly and pull the attachment bar down toward your upper chest.", "Squeeze your shoulder blades down and back, eliminating excessive body momentum."]
  },
  'Face Pulls': {
    muscle: 'Back',
    equipment: 'Cables',
    img: '',
    tips: ["Pull the rope towards your eyes or forehead while actively flaring your hands outward.", "Hold the peak contraction for a split second to fire the rear deltoids."]
  },

  // === SHOULDERS ===
  'Overhead Press': {
    muscle: 'Shoulders',
    equipment: 'Barbell',
    img: '',
    tips: ["Brace your core and squeeze your glutes hard to protect your lower lumbar spine.", "Press the bar straight up in a vertical path, moving your head back slightly."]
  },
  'Overhead Barbell Press': {
    muscle: 'Shoulders',
    equipment: 'Barbell',
    img: '',
    tips: ["Brace your core tightly and squeeze your glutes to maintain absolute stability.", "Drive the barbell straight up, clearing your chin and locking out directly overhead."]
  },
  'Arnold Press': {
    muscle: 'Shoulders',
    equipment: 'Dumbbell',
    img: '',
    tips: ["Start with your palms facing you, then rotate them outward fluidly as you press up.", "Ensure the dynamic rotation happens seamlessly without breaking the pressing plane."]
  },
  'Lateral Raises': {
    muscle: 'Shoulders',
    equipment: 'Dumbbell',
    img: '',
    tips: ["Lead the movement upward with your elbows, keeping your wrists slightly lower.", "Tilt your torso slightly forward to line up the lateral deltoid fibers perfectly."]
  },
  'Shoulder Press': {
    muscle: 'Shoulders',
    equipment: 'Dumbbell',
    img: '',
    tips: ["Keep your wrists straight and ensure the dumbbells do not drift behind your head.", "Lower the weights down under control until your elbows reach a 90-degree angle."]
  },

  // === ARMS (BICEPS / TRICEPS) ===
  'Bicep Curls': {
    muscle: 'Arms',
    equipment: 'Dumbbell',
    img: '',
    tips: ["Pin your elbows securely against your torso; eliminate elbow flare or body swinging.", "Fully extend your arms at the bottom of the movement for a complete range of motion."]
  },
  'Hammer Curls': {
    muscle: 'Arms',
    equipment: 'Dumbbell',
    img: '',
    tips: ["Keep your palms facing each other (neutral grip) through the entire execution.", "This position heavily targets the brachialis and brachioradialis forearm muscles."]
  },
  'Preacher Curls': {
    muscle: 'Arms',
    equipment: 'Machine',
    img: '',
    tips: ["Keep your armpits nestled flush against the top edge of the pad support surface.", "Avoid snapping your elbows violently at full extension under heavy loads."]
  },
  'Tricep Dips': {
    muscle: 'Arms',
    equipment: 'Bodyweight',
    img: '',
    tips: ["Keep your chest slightly tilted forward and elbows tracking directly backward.", "Lower down until upper arms are parallel to the floor, then lock out forcefully."]
  },
  'Skull Crushers': {
    muscle: 'Arms',
    equipment: 'Barbell',
    img: '',
    tips: ["Lower the weight slightly behind your forehead rather than directly onto your face.", "Keep your upper arms perfectly stationary; rotate solely at the elbow joints."]
  },
  'Triceps Rope Pushdown': {
    muscle: 'Arms',
    equipment: 'Cables',
    img: '',
    tips: ["Keep your shoulders down and lock your elbows stationary at your sides.", "Split the rope wide apart at the bottom of the rep for maximum tricep contraction."]
  },

  // === LEGS (QUADS / GLUTES / HAMSTRINGS) ===
  'Squats': {
    muscle: 'Legs',
    equipment: 'Bodyweight',
    img: '',
    tips: ["Keep your chest proud and drive your knees outward, tracking them over your toes.", "Hinge backward at your hips to drop safely into deep structural depth."]
  },
  'Barbell Back Squat': {
    muscle: 'Legs',
    equipment: 'Barbell',
    img: '',
    tips: ["Keep your spine strictly neutral and drive through your mid-foot.", "Ensure your hips break parallel depth while keeping your knees pushing outwards."]
  },
  'Lunges': {
    muscle: 'Legs',
    equipment: 'Dumbbell',
    img: '',
    tips: ["Take a step out wide enough so your front knee doesn't overshoot your toes.", "Drop your back knee straight down toward the floor to preserve safe leg alignment."]
  },
  'Leg Press': {
    muscle: 'Legs',
    equipment: 'Machine',
    img: '',
    tips: ["Keep your lower back and glutes pressed perfectly flat against the seat pad.", "CRITICAL: Do NOT lock your knees completely straight at the top of the rep."]
  },
  'Bulgarian Split Squats': {
    muscle: 'Legs',
    equipment: 'Dumbbell',
    img: '',
    tips: ["Hop forward to find a stable stance; distribute load mostly onto the front leg.", "Drive directly through your front heel, avoiding lifting your foot off the floor."]
  },
  'Romanian Deadlift': {
    muscle: 'Legs',
    equipment: 'Barbell',
    img: '',
    tips: ["Push your hips back as far as possible while maintaining a flat spinal posture.", "Lower the bar down close to your thighs until you feel your hamstrings stretch."]
  },
  'Glute Bridge': {
    muscle: 'Legs',
    equipment: 'Bodyweight',
    img: '',
    tips: ["Drive directly through your heels to extend your hips fully up toward the ceiling.", "Squeeze your glutes tightly at the peak height and tuck your pelvis underneath."]
  },
  'Hip Thrust': {
    muscle: 'Legs',
    equipment: 'Barbell',
    img: '',
    tips: ["Secure the bench right below your shoulder blades before performing the lift.", "Keep your chin tucked forward, looking straight ahead throughout the movement."]
  },

  // === ABS / CORE ===
  'Plank': {
    muscle: 'Core',
    equipment: 'Bodyweight',
    img: '',
    tips: ["Engage your quads and glutes to create full-body tension, keeping spine safe.", "Keep forearms parallel and actively push the floor away to fill out your upper back."]
  },
  'Crunches': {
    muscle: 'Core',
    equipment: 'Bodyweight',
    img: '',
    tips: ["Focus on sliding your ribs down toward your hips; lift smoothly using your abs.", "Avoid pulling your head forward aggressively; keep your neck spacing neutral."]
  },
  'Hanging Leg Raises': {
    muscle: 'Core',
    equipment: 'Bodyweight',
    img: '',
    tips: ["Minimize torso swinging momentum by controlling the descent of your legs tightly.", "Think about tilting your pelvis upward at the top to fully activate the lower abs."]
  },
  'Russian Twist': {
    muscle: 'Core',
    equipment: 'Bodyweight',
    img: '',
    tips: ["Lean back to a steady 45-degree angle, keeping your spine straight and core loaded.", "Rotate your entire torso from side to side rather than just moving your arms."]
  }
};