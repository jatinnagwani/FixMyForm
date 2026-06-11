// src/exerciseData.js

export const EXERCISE_REFS = {
  // === CHEST ===
  'Bench Press': {
    // 🚀 Heavy Barbell Bench Press ki correct photo link
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    tips: ["Keep your feet flat on the floor and drive your shoulder blades hard into the bench.", "Lower the barbell controlled to your mid-chest; keep wrists stacked vertically over elbows."]
  },
  'Push-ups': {
    // Standard Push-up position link
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop',
    tips: ["Keep your body in a strict straight line from head to heels; do not let your hips sag.", "Lower your chest until it almost touches the floor, tracking elbows back at a 45-degree angle."]
  },
  'Incline Bench Press': {
    // Incline Barbell/Dumbbell press area link
    img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=400&auto=format&fit=crop',
    tips: ["Set the bench at a 30 to 45-degree angle to strictly prioritize the upper pectorals.", "Control the barbell down to your upper chest or clavicle area smoothly without bouncing."]
  },
  'Incline Dumbbell Press': {
    img: 'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=400&auto=format&fit=crop',
    tips: ["Keep weights stacked directly over elbows; press up in a controlled, smooth ceiling arc.", "Avoid clashing the dumbbells at the top to maintain constant mechanical tension on the chest."]
  },
  'Cable Flyes': {
    img: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?q=80&w=400&auto=format&fit=crop',
    tips: ["Maintain a slight, fixed bend in your elbows throughout the entire opening and closing arc.", "Focus on squeezing your chest muscles together intensely at the peak contraction point."]
  },

  // === BACK / LATS / TRAPS ===
  'Pull-ups': {
    img: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=400&auto=format&fit=crop',
    tips: ["Depress your scapula first, pulling your chest up to the bar rather than leading with your chin.", "Control the eccentric (lowering) phase completely; avoid dropping down passively into a dead-hang."]
  },
  'Deadlift': {
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop',
    tips: ["Keep the bar locked tight against your shins and maintain a perfectly neutral spinal posture.", "Drive hard through your legs and snap your hips forward to lock out at the top position."]
  },
  'Bent Over Row': {
    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop',
    tips: ["Hinge deeply at your hips to keep your torso near parallel to the floor safely.", "Pull the bar toward your lower belly button, leading strictly with your elbows to engage lats."]
  },
  'Lat Pulldown': {
    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop',
    tips: ["Lean back slightly and pull the attachment bar down toward your upper chest collarbone.", "Squeeze your shoulder blades down and back at the bottom, eliminating excessive body momentum."]
  },
  'Face Pulls': {
    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop',
    tips: ["Pull the rope towards your eyes or forehead while actively flaring your hands outward.", "Hold the peak contraction for a split second to fire the rear deltoids and rotator cuff."]
  },

  // === SHOULDERS ===
  'Overhead Press': {
    img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop',
    tips: ["Brace your core and squeeze your glutes hard to protect your lower lumbar spine from arching.", "Press the bar straight up in a vertical path, moving your head back slightly and then forward."]
  },
  'Arnold Press': {
    img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop',
    tips: ["Start with your palms facing you, then rotate them outward fluidly as you press up.", "Ensure the dynamic rotation happens seamlessly without breaking the overhead pressing plane."]
  },
  'Lateral Raises': {
    img: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=400&auto=format&fit=crop',
    tips: ["Lead the movement upward with your elbows, keeping your wrists slightly lower than elbow height.", "Tilt your torso slightly forward to line up the lateral deltoid fibers with the line of force."]
  },
  'Shoulder Press': {
    img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop',
    tips: ["Keep your wrists straight and ensure the dumbbells do not drift too far behind your head.", "Lower the weights down under control until your elbows reach roughly a 90-degree angle."]
  },

  // === ARMS (BICEPS / TRICEPS) ===
  'Bicep Curls': {
    img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop',
    tips: ["Pin your elbows securely against your torso; eliminate elbow flare or shoulder swinging.", "Fully extend your arms at the bottom of the movement for a complete range of motion."]
  },
  'Hammer Curls': {
    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop',
    tips: ["Keep your palms facing each other (neutral grip) through the entire execution of the curl.", "This position heavily targets the brachialis and brachioradialis forearm muscles."]
  },
  'Preacher Curls': {
    img: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=400&auto=format&fit=crop',
    tips: ["Keep your armpits nestled flush against the top edge of the pad support surface.", "Avoid snapping your elbows violently at full extension under heavy eccentric loads."]
  },
  'Tricep Dips': {
    img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop',
    tips: ["Keep your chest slightly tilted forward and elbows tracking directly backward, not flaring.", "Lower down until upper arms are parallel to the floor, then lock out your triceps forcefully."]
  },
  'Skull Crushers': {
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop',
    tips: ["Lower the weight slightly behind your forehead/crown rather than directly onto your face.", "Keep your upper arms perfectly stationary; rotate solely at the elbow joints."]
  },
  'Triceps Rope Pushdown': {
    img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop',
    tips: ["Keep your shoulders down and lock your elbows stationary at your sides.", "Split the rope raw edges wide apart at the bottom of the rep for maximum tricep contraction."]
  },

  // === LEGS (QUADS / GLUTES / HAMSTRINGS) ===
  'Squats': {
    img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop',
    tips: ["Keep your chest proud and drive your knees outward, tracking them over your toes.", "Hinge backward at your hips to drop safely into deep structural mechanical depth."]
  },
  'Lunges': {
    img: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=400&auto=format&fit=crop',
    tips: ["Take a step out wide enough so your front knee doesn't overshoot your toes at full depth.", "Drop your back knee straight down toward the floor to preserve safe leg alignment."]
  },
  'Leg Press': {
    img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop',
    tips: ["Keep your lower back and glutes pressed perfectly flat against the seat pad throughout.", "CRITICAL: Do NOT lock your knees completely straight or hyper-extended at the top."]
  },
  'Bulgarian Split Squats': {
    img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop',
    tips: ["Hop forward to find a stable tracking stance; distribute load mostly onto the front leg.", "Drive directly through your front heel, avoiding lifting your heel off the floor boundary."]
  },
  'Romanian Deadlift': {
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop',
    tips: ["Push your hips back as far as possible while maintaining a flat, neutral spinal posture.", "Lower the bar down close to your thighs until you feel your hamstrings fully stretch."]
  },
  'Glute Bridge': {
    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop',
    tips: ["Drive directly through your heels to extend your hips fully up toward the ceiling sky.", "Squeeze your glutes tightly at the peak height and slightly tuck your pelvis underneath."]
  },
  'Hip Thrust': {
    img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop',
    tips: ["Secure the bench right below your shoulder blades before performing the driving lift.", "Keep your chin tucked forward, looking straight ahead rather than looking at the ceiling."]
  },

  // === ABS / CORE ===
  'Plank': {
    img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop',
    tips: ["Engage your quads and glutes to create full-body tension, keeping the spine safe.", "Keep forearms parallel and actively push the floor away to fill out your upper back muscle."]
  },
  'Crunches': {
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop',
    tips: ["Focus on sliding your ribs down toward your hips; lift smoothly using your abs, not your neck.", "Avoid pulling your head forward aggressively with your hands; keep chin spacing neutral."]
  },
  'Hanging Leg Raises': {
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop',
    tips: ["Minimize torso swinging momentum by controlling the descent of your legs tightly.", "Think about tilting your pelvis upward at the top peak to fully activate the lower rectus abdominis."]
  },
  'Russian Twist': {
    img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop',
    tips: ["Lean back to a steady 45-degree angle, keeping your spine straight and core loaded.", "Rotate your entire torso from side to side rather than just flapping your arms across body."]
  }
};



// src/ExerciseData.js ke andar bas ye links update kar do:




