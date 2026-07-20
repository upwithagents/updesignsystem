import { useId } from "react";

// Per-app glyph markup only (cream #fff8f0 on the shared dark chassis,
// with #14100c cutout details where a glyph needs them) - the chassis
// itself (tile, clip, gradient corners) is shared and rendered once
// below, keeping every app icon visually part of one family.
const GLYPHS: Record<string, string> = {
  walletup: `
    <rect x="33" y="25" width="30" height="20" rx="3" fill="#fff8f0" transform="rotate(-8 48 35)" opacity="0.85"/>
    <path d="M27,38 h46 a8,8 0 0 1 8,8 v22 a8,8 0 0 1 -8,8 h-46 a8,8 0 0 1 -8,-8 v-22 a8,8 0 0 1 8,-8 Z" fill="#fff8f0"/>
    <rect x="58" y="49" width="23" height="15" rx="4" fill="#14100c"/><circle cx="66" cy="56.5" r="3.2" fill="#fff8f0"/>
  `,
  sheetup: `
    <g fill="#fff8f0"><ellipse cx="41" cy="69" rx="11.5" ry="8.5" transform="rotate(-22 41 69)"/><rect x="46.5" y="30" width="5.5" height="40"/><path d="M46.5,30 L52,30 C62,32 67,41 63,52 C62,43 57,39 51,39.5 L46.5,39.5 Z"/></g>
  `,
  avatarup: `
    <g fill="#fff8f0"><circle cx="50" cy="40" r="14"/><path d="M26,78 v-2 a24,20 0 0 1 48,0 v2 Z"/></g>
  `,
  homeup: `
    <g fill="#fff8f0"><path d="M50,22 L82,50 L74,50 L74,76 L26,76 L26,50 L18,50 Z"/></g>
    <rect x="43" y="56" width="14" height="20" rx="2" fill="#14100c"/>
  `,
  cleanup: `
    <g transform="translate(-4,4) rotate(30 50 50)">
      <rect x="47.5" y="6" width="5" height="33" rx="2.5" fill="#fff8f0"/>
      <rect x="42.5" y="38" width="15" height="8" rx="2" fill="#fff8f0"/>
      <path d="M42.5,46 C40,58 37,65 35,72 L65,72 C63,65 60,58 57.5,46 Z" fill="#fff8f0"/>
      <rect x="42" y="46" width="16" height="2.5" fill="#14100c"/>
      <g stroke="#14100c" stroke-width="2"><path d="M45.5,50 L41,70 M50,50 L50,70 M54.5,50 L59,70"/></g>
    </g>
  `,
  yourideaup: `
    <g fill="#fff8f0"><path d="M50,22 a20,20 0 0 1 12,36 v6 h-24 v-6 a20,20 0 0 1 12,-36 Z"/><rect x="40" y="66" width="20" height="6" rx="3"/><rect x="43" y="74" width="14" height="5" rx="2.5"/></g>
    <g stroke="#14100c" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M50,58 L50,44 M44,50 L50,44 L56,50"/></g>
  `,
  musicmarketingup: `
    <rect x="40" y="16" width="20" height="30" rx="10" fill="#fff8f0"/>
    <g stroke="#14100c" stroke-width="2" stroke-linecap="round"><path d="M45,28 h10 M45,34 h10"/></g>
    <path d="M32,38 a18,18 0 0 0 36,0" fill="none" stroke="#fff8f0" stroke-width="5" stroke-linecap="round"/>
    <rect x="47" y="56" width="6" height="14" fill="#fff8f0"/>
    <rect x="37" y="70" width="26" height="5" rx="2.5" fill="#fff8f0"/>
  `,
  musicproductionup: `
    <g stroke="#fff8f0" stroke-width="4" stroke-linecap="round"><path d="M32,26 L32,74 M50,26 L50,74 M68,26 L68,74"/></g>
    <g fill="#fff8f0"><rect x="25" y="40" width="14" height="9" rx="3"/><rect x="43" y="56" width="14" height="9" rx="3"/><rect x="61" y="34" width="14" height="9" rx="3"/></g>
  `,
  agenticosup: `
    <g fill="#fff8f0"><rect x="20" y="26" width="60" height="40" rx="5"/><rect x="44" y="66" width="12" height="8"/><rect x="34" y="74" width="32" height="5" rx="2.5"/></g>
    <g fill="#14100c"><rect x="30" y="48" width="7" height="10"/><rect x="41" y="42" width="7" height="16"/><rect x="52" y="37" width="7" height="21"/><rect x="63" y="44" width="7" height="14"/></g>
  `,
  upagent: `
    <g fill="#fff8f0"><rect x="27" y="36" width="46" height="38" rx="11"/><rect x="47" y="22" width="6" height="10"/><circle cx="50" cy="20" r="4.5"/></g>
    <g fill="#14100c"><circle cx="41" cy="54" r="5"/><circle cx="59" cy="54" r="5"/></g>
  `,
  updiscord: `
    <path d="M50,28 C64,28 75,37 75,49 C75,61 64,70 50,70 C46,70 43,69.5 40,68.5 L28,74 L31.5,63 C27.5,59 25,54.5 25,49 C25,37 36,28 50,28 Z" fill="#fff8f0"/>
    <g fill="#14100c"><circle cx="39" cy="49" r="4"/><circle cx="50" cy="49" r="4"/><circle cx="61" cy="49" r="4"/></g>
  `,
};

export function AppIcon({
  slug,
  size = 40,
  className,
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const uid = useId();
  const sq = `sq-${uid}`;
  const cA = `cA-${uid}`;
  const cB = `cB-${uid}`;
  const glyph = GLYPHS[slug];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden
      className={className}
      style={{ borderRadius: size * 0.22 }}
    >
      <defs>
        <clipPath id={sq}>
          <rect width="100" height="100" rx="22" />
        </clipPath>
        <linearGradient id={cA} x1="56" y1="0" x2="100" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFB020" />
          <stop offset="1" stopColor="#EB4E10" />
        </linearGradient>
        <linearGradient id={cB} x1="0" y1="56" x2="44" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#EB4E10" />
          <stop offset="1" stopColor="#B8380A" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${sq})`}>
        <rect width="100" height="100" fill="#14100c" />
        <path d="M56,0 L100,0 L100,44 Z" fill={`url(#${cA})`} />
        <path d="M0,56 L0,100 L44,100 Z" fill={`url(#${cB})`} />
        {glyph && <g dangerouslySetInnerHTML={{ __html: glyph }} />}
      </g>
    </svg>
  );
}
