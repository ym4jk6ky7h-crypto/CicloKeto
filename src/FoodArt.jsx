const PALETTE = {
  bowl: ["#F7E2B8", "#3D6B5A", "#E07A5F"],
  fish: ["#D7E8F4", "#3D6B5A", "#4F8A73"],
  salad: ["#DCEFDC", "#3D6B5A", "#E07A5F"],
  soup: ["#F3D9B0", "#C57A5A", "#3D6B5A"],
  eggs: ["#F8E7C4", "#D4A054", "#3D6B5A"],
  meat: ["#F3D4C4", "#E07A5F", "#3D6B5A"],
  smoothie: ["#D9EFE3", "#4F8A73", "#E07A5F"],
  pudding: ["#EED9F0", "#7A5A8A", "#D4A054"],
  bread: ["#F3E0C4", "#C48A4A", "#3D6B5A"],
  sauce: ["#E8F0D8", "#4F8A73", "#D4A054"],
  dessert: ["#F6E0D4", "#C57A5A", "#3D6B5A"],
  ice: ["#E4F1F8", "#6CB4D8", "#3D6B5A"],
  fast: ["#E8E4F4", "#5A5A8A", "#D4A054"],
};

function Frame({ bg, label, children }) {
  return (
    <svg viewBox="0 0 200 140" className="food-art" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="140" fill={bg} />
      <circle cx="24" cy="18" r="28" fill="rgba(255,255,255,0.28)" />
      <circle cx="176" cy="128" r="36" fill="rgba(36,49,43,0.06)" />
      {children}
    </svg>
  );
}

export function FoodArt({ kind = "bowl", title = "" }) {
  const [bg, a, b] = PALETTE[kind] || PALETTE.bowl;
  switch (kind) {
    case "fish":
      return (
        <Frame bg={bg} label={title}>
          <ellipse cx="108" cy="78" rx="54" ry="22" fill={a} />
          <path d="M56 78 L28 62 L34 78 L28 94 Z" fill={b} />
          <circle cx="142" cy="72" r="4" fill="#fff9f1" />
          <path d="M90 62 Q108 50 130 60" fill="none" stroke="#fff9f1" strokeWidth="3" />
          <ellipse cx="48" cy="108" rx="18" ry="6" fill="#9ad0c0" />
          <ellipse cx="160" cy="108" rx="14" ry="5" fill="#9ad0c0" />
        </Frame>
      );
    case "salad":
      return (
        <Frame bg={bg} label={title}>
          <ellipse cx="100" cy="108" rx="58" ry="12" fill="#cfe6c8" />
          <ellipse cx="100" cy="96" rx="50" ry="10" fill="#fff9f1" />
          <path d="M70 92 C78 58, 122 58, 130 92" fill={a} />
          <path d="M78 90 C86 64, 118 68, 122 92" fill="#6fa37a" />
          <circle cx="88" cy="82" r="8" fill={b} />
          <circle cx="112" cy="78" r="7" fill="#d4a054" />
          <circle cx="102" cy="88" r="6" fill="#e07a5f" />
        </Frame>
      );
    case "soup":
      return (
        <Frame bg={bg} label={title}>
          <ellipse cx="100" cy="102" rx="52" ry="14" fill="#e8c896" />
          <path d="M52 88 Q100 118 148 88 L140 70 Q100 86 60 70 Z" fill={a} />
          <ellipse cx="100" cy="70" rx="40" ry="10" fill="#f4c27a" />
          <path d="M84 48 Q88 36 92 48" fill="none" stroke="#fff9f1" strokeWidth="3" />
          <path d="M100 44 Q104 30 108 44" fill="none" stroke="#fff9f1" strokeWidth="3" />
          <path d="M116 48 Q120 36 124 48" fill="none" stroke="#fff9f1" strokeWidth="3" />
          <circle cx="88" cy="72" r="4" fill={b} />
          <circle cx="110" cy="74" r="3.5" fill="#3d6b5a" />
        </Frame>
      );
    case "eggs":
      return (
        <Frame bg={bg} label={title}>
          <ellipse cx="78" cy="86" rx="32" ry="24" fill="#fff9f1" />
          <circle cx="78" cy="86" r="11" fill={a} />
          <ellipse cx="126" cy="90" rx="28" ry="21" fill="#fff9f1" />
          <circle cx="126" cy="90" r="10" fill={a} />
          <path d="M40 108 Q100 128 164 108" fill="none" stroke={b} strokeWidth="8" strokeLinecap="round" />
          <circle cx="54" cy="54" r="6" fill="#e07a5f" />
        </Frame>
      );
    case "meat":
      return (
        <Frame bg={bg} label={title}>
          <ellipse cx="100" cy="86" rx="48" ry="28" fill={a} />
          <path d="M62 78 Q100 58 140 82 Q120 108 78 100 Z" fill="#c45a45" />
          <rect x="148" y="70" width="18" height="10" rx="4" fill="#f1c7a3" />
          <ellipse cx="70" cy="114" rx="22" ry="8" fill="#d7eadb" />
          <ellipse cx="128" cy="116" rx="18" ry="7" fill="#d7eadb" />
        </Frame>
      );
    case "smoothie":
      return (
        <Frame bg={bg} label={title}>
          <path d="M78 46 H122 L116 112 Q100 128 84 112 Z" fill={a} />
          <path d="M82 58 H118 L116 78 H84 Z" fill="#9ad0c0" />
          <rect x="94" y="28" width="12" height="22" rx="6" fill={b} />
          <circle cx="64" cy="96" r="8" fill="#e07a5f" />
          <circle cx="140" cy="88" r="7" fill="#d4a054" />
        </Frame>
      );
    case "pudding":
      return (
        <Frame bg={bg} label={title}>
          <path d="M64 58 H136 L128 112 Q100 128 72 112 Z" fill="#fff9f1" />
          <path d="M70 70 H130 L126 96 H74 Z" fill={a} />
          <circle cx="88" cy="62" r="6" fill={b} />
          <circle cx="108" cy="58" r="5" fill="#e07a5f" />
          <circle cx="122" cy="64" r="5" fill="#3d6b5a" />
        </Frame>
      );
    case "bread":
      return (
        <Frame bg={bg} label={title}>
          <ellipse cx="100" cy="86" rx="52" ry="28" fill={a} />
          <ellipse cx="100" cy="78" rx="44" ry="20" fill="#e8c896" />
          <path d="M70 74 Q80 64 90 74" fill="none" stroke="#fff9f1" strokeWidth="3" />
          <path d="M100 70 Q110 60 120 72" fill="none" stroke="#fff9f1" strokeWidth="3" />
          <rect x="40" y="108" width="28" height="8" rx="4" fill={b} />
        </Frame>
      );
    case "sauce":
      return (
        <Frame bg={bg} label={title}>
          <ellipse cx="100" cy="96" rx="36" ry="28" fill="#fff9f1" />
          <ellipse cx="100" cy="88" rx="28" ry="18" fill={a} />
          <path d="M88 86 Q100 96 112 84" fill="none" stroke={b} strokeWidth="4" />
          <rect x="132" y="48" width="10" height="40" rx="4" fill="#c57a5a" transform="rotate(18 137 68)" />
        </Frame>
      );
    case "dessert":
      return (
        <Frame bg={bg} label={title}>
          <rect x="62" y="70" width="76" height="36" rx="8" fill={a} />
          <path d="M62 78 Q100 50 138 78" fill="#5a3a32" />
          <circle cx="88" cy="64" r="5" fill={b} />
          <circle cx="112" cy="60" r="5" fill="#fff9f1" />
          <rect x="70" y="108" width="60" height="8" rx="4" fill="#e8d5b5" />
        </Frame>
      );
    case "ice":
      return (
        <Frame bg={bg} label={title}>
          <path d="M86 108 L114 108 L128 70 L72 70 Z" fill="#fff9f1" />
          <circle cx="100" cy="58" r="22" fill={a} />
          <circle cx="88" cy="50" r="8" fill="#fff9f1" opacity="0.45" />
          <circle cx="132" cy="96" r="6" fill={b} />
        </Frame>
      );
    case "fast":
      return (
        <Frame bg={bg} label={title}>
          <circle cx="108" cy="70" r="28" fill={a} />
          <circle cx="120" cy="62" r="22" fill={bg} />
          <ellipse cx="70" cy="108" rx="16" ry="7" fill="#fff9f1" />
          <path d="M86 108 Q100 92 114 108" fill="none" stroke={b} strokeWidth="4" />
        </Frame>
      );
    default:
      return (
        <Frame bg={bg} label={title}>
          <ellipse cx="100" cy="108" rx="50" ry="12" fill="#e8d5b5" />
          <ellipse cx="100" cy="96" rx="44" ry="12" fill="#fff9f1" />
          <path d="M64 92 Q100 40 136 92" fill={a} />
          <circle cx="88" cy="78" r="7" fill={b} />
          <circle cx="112" cy="74" r="6" fill="#d4a054" />
          <circle cx="100" cy="86" r="5" fill="#fff9f1" />
        </Frame>
      );
  }
}
