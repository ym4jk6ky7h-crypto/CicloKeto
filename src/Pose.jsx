function Person({ children, label }) {
  return (
    <svg viewBox="0 0 200 200" className="pose" role="img" aria-label={label}>
      <circle cx="100" cy="100" r="92" fill="#F4E3C1" />
      <circle cx="100" cy="100" r="84" fill="#FFF9F1" />
      {children}
    </svg>
  );
}

function Head({ x = 100, y = 48, r = 16 }) {
  return (
    <>
      <circle cx={x} cy={y} r={r} fill="#F1C7A3" />
      <circle cx={x - 5} cy={y - 1} r="1.6" fill="#2A332E" />
      <circle cx={x + 5} cy={y - 1} r="1.6" fill="#2A332E" />
      <path d={`M${x - 4} ${y + 6} Q${x} ${y + 10} ${x + 4} ${y + 6}`} stroke="#C57A5A" fill="none" strokeWidth="1.4" />
    </>
  );
}

export function Pose({ pose }) {
  switch (pose) {
    case "catcow":
      return (
        <Person label="Gato-vaca">
          <path d="M48 118 C70 92, 130 92, 152 118" fill="none" stroke="#3D6B5A" strokeWidth="14" strokeLinecap="round" />
          <path d="M52 118 L38 132" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M148 118 L164 132" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M58 108 L46 92" stroke="#3D6B5A" strokeWidth="8" strokeLinecap="round" />
          <path d="M142 108 L156 90" stroke="#3D6B5A" strokeWidth="8" strokeLinecap="round" />
          <Head x={44} y={84} r={13} />
        </Person>
      );
    case "shoulders":
      return (
        <Person label="Círculos de hombros">
          <Head />
          <rect x="86" y="66" width="28" height="46" rx="12" fill="#3D6B5A" />
          <path d="M88 78 C60 70, 52 108, 78 118" fill="none" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M112 78 C140 70, 148 108, 122 118" fill="none" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M90 112 L84 150" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M110 112 L116 150" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <circle cx="44" cy="78" r="10" fill="none" stroke="#D4A054" strokeWidth="3" strokeDasharray="4 4" />
        </Person>
      );
    case "squat":
      return (
        <Person label="Sentadilla">
          <Head y={42} />
          <rect x="84" y="58" width="32" height="40" rx="12" fill="#3D6B5A" />
          <path d="M88 96 L70 128 L78 152" fill="none" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M112 96 L130 128 L122 152" fill="none" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M86 72 L62 92" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M114 72 L138 92" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
        </Person>
      );
    case "bridge":
      return (
        <Person label="Puente de glúteos">
          <path d="M40 138 L70 92 L130 92 L168 138" fill="none" stroke="#3D6B5A" strokeWidth="14" strokeLinecap="round" />
          <path d="M70 92 L58 70" stroke="#3D6B5A" strokeWidth="8" strokeLinecap="round" />
          <Head x={52} y={62} r={13} />
          <path d="M130 92 L150 70 L168 78" fill="none" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
        </Person>
      );
    case "wallpush":
      return (
        <Person label="Flexiones en pared">
          <rect x="158" y="28" width="10" height="144" rx="4" fill="#E8D5B5" />
          <Head x={78} y={50} />
          <rect x="66" y="66" width="28" height="44" rx="12" fill="#3D6B5A" transform="rotate(-18 80 88)" />
          <path d="M88 78 L154 70" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M74 108 L62 150" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M86 110 L98 150" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
        </Person>
      );
    case "birddog":
      return (
        <Person label="Pájaro-perro">
          <path d="M58 118 L142 118" stroke="#3D6B5A" strokeWidth="14" strokeLinecap="round" />
          <path d="M58 118 L42 96" stroke="#3D6B5A" strokeWidth="8" strokeLinecap="round" />
          <Head x={38} y={88} r={13} />
          <path d="M142 118 L168 92" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M78 118 L68 150" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M122 118 L148 150" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
        </Person>
      );
    case "plank":
      return (
        <Person label="Plancha de rodillas">
          <path d="M52 108 L148 108" stroke="#3D6B5A" strokeWidth="14" strokeLinecap="round" />
          <path d="M52 108 L40 128 L58 132" fill="none" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <Head x={40} y={92} r={13} />
          <path d="M110 108 L118 138" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M148 108 L160 132" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
        </Person>
      );
    case "calf":
      return (
        <Person label="Elevaciones de gemelo">
          <Head />
          <rect x="86" y="66" width="28" height="46" rx="12" fill="#3D6B5A" />
          <path d="M94 112 L94 138 L90 148" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M108 112 L108 138 L104 148" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M86 78 L70 108" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M114 78 L130 108" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M70 156 H130" stroke="#D4A054" strokeWidth="4" />
        </Person>
      );
    case "walk":
      return (
        <Person label="Marcha en casa">
          <Head x={108} y={44} />
          <rect x="94" y="60" width="28" height="44" rx="12" fill="#3D6B5A" />
          <path d="M102 104 L82 150" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M114 104 L138 128 L128 150" fill="none" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M98 74 L70 92" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M118 74 L148 64" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
        </Person>
      );
    case "hip":
      return (
        <Person label="Apertura de cadera">
          <Head />
          <rect x="86" y="66" width="28" height="42" rx="12" fill="#3D6B5A" />
          <path d="M96 108 L90 150" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M110 106 L142 118 L138 146" fill="none" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M88 78 L72 108" stroke="#3D6B5A" strokeWidth="8" strokeLinecap="round" />
          <path d="M114 78 L132 96" stroke="#3D6B5A" strokeWidth="8" strokeLinecap="round" />
        </Person>
      );
    case "fold":
      return (
        <Person label="Flexión de pie">
          <path d="M100 70 L100 118" stroke="#3D6B5A" strokeWidth="14" strokeLinecap="round" />
          <path d="M100 70 L72 108" stroke="#3D6B5A" strokeWidth="8" strokeLinecap="round" />
          <Head x={68} y={118} r={13} />
          <path d="M100 118 L86 152" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M100 118 L116 152" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M100 86 L128 108" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
        </Person>
      );
    case "breath":
      return (
        <Person label="Respiración">
          <Head />
          <rect x="82" y="66" width="36" height="48" rx="16" fill="#3D6B5A" />
          <path d="M90 112 L84 150" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M110 112 L116 150" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M86 84 L68 108" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M114 84 L132 108" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <circle cx="100" cy="88" r="28" fill="none" stroke="#D4A054" strokeWidth="3" opacity="0.55" />
        </Person>
      );
    case "deadbug":
      return (
        <Person label="Bicho muerto">
          <path d="M46 118 L154 118" stroke="#3D6B5A" strokeWidth="14" strokeLinecap="round" />
          <Head x="40" y="104" r={13} />
          <path d="M70 118 L58 84" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M130 118 L150 86" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M90 118 L78 154" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M120 118 L148 146" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
        </Person>
      );
    case "step":
      return (
        <Person label="Step al escalón">
          <rect x="118" y="132" width="50" height="22" rx="4" fill="#E8D5B5" />
          <Head x={96} y={40} />
          <rect x="82" y="56" width="28" height="44" rx="12" fill="#3D6B5A" />
          <path d="M92 100 L86 150" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M108 100 L132 118 L128 132" fill="none" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M84 72 L64 96" stroke="#3D6B5A" strokeWidth="8" strokeLinecap="round" />
          <path d="M110 70 L132 88" stroke="#3D6B5A" strokeWidth="8" strokeLinecap="round" />
        </Person>
      );
    case "sideleg":
      return (
        <Person label="Abducción de cadera">
          <path d="M48 128 L132 128" stroke="#3D6B5A" strokeWidth="14" strokeLinecap="round" />
          <Head x={40} y={114} r={13} />
          <path d="M132 128 L168 92" stroke="#E07A5F" strokeWidth="8" strokeLinecap="round" />
          <path d="M70 128 L62 154" stroke="#2A332E" strokeWidth="8" strokeLinecap="round" />
          <path d="M58 118 L70 96" stroke="#3D6B5A" strokeWidth="8" strokeLinecap="round" />
        </Person>
      );
    default:
      return (
        <Person label="Movimiento">
          <Head />
        </Person>
      );
  }
}
