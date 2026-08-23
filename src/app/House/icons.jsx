export const XpFlag = ({ size = 32 }) => (
  <svg width={size} height={size * 0.88} viewBox="0 0 48 42">
    <path d="M3 11 Q13 3.5 22 5 L22 19 Q12.5 17.5 3 24 Z" fill="#f25022" />
    <path d="M24 5 Q34 6.5 45 10 L45 24 Q33.5 20 24 19 Z" fill="#7fba00" />
    <path d="M3 26 Q12.5 19.5 22 21 L22 35 Q12.5 33.5 3 40 Z" fill="#ffb900" />
    <path d="M24 21 Q33.5 22 45 26 L45 40 Q34 36 24 35 Z" fill="#00a4ef" />
  </svg>
);

const Svg = ({ children, s, vb = "0 0 48 48" }) => (
  <svg width={s} height={s} viewBox={vb}>
    {children}
  </svg>
);

const ComputerSvg = ({ s }) => (
  <Svg s={s}>
    <rect x="4" y="7" width="34" height="24" rx="2" fill="#dfe3e8" stroke="#5a6572" strokeWidth="2" />
    <rect x="7" y="10" width="28" height="17" rx="1" fill="#2f6fd0" />
    <path d="M7 22 q14 -9 28 -6 v11 H7 Z" fill="#5b9cf5" opacity="0.55" />
    <rect x="18" y="31" width="6" height="5" fill="#b9c1cb" stroke="#5a6572" />
    <rect x="11" y="36" width="20" height="4" rx="1.5" fill="#dfe3e8" stroke="#5a6572" strokeWidth="1.5" />
    <rect x="38" y="14" width="7" height="26" rx="1.5" fill="#e8ebef" stroke="#5a6572" strokeWidth="1.5" />
    <circle cx="41.5" cy="33" r="1.4" fill="#63d471" />
  </Svg>
);

const ProfileSvg = ({ s }) => (
  <Svg s={s}>
    <rect x="7" y="4" width="34" height="40" rx="2" fill="#fff" stroke="#7a8699" strokeWidth="1.6" />
    <path d="M7 6 a2 2 0 0 1 2 -2 h30 a2 2 0 0 1 2 2 v7 H7 Z" fill="#2f6fd0" stroke="#1d4fa0" />
    <circle cx="17" cy="23" r="6" fill="#f0b429" stroke="#c98a10" />
    <path d="M8 37 c1 -7 17 -7 18 0 v3 H8 Z" fill="#2f6fd0" />
    <rect x="29" y="19" width="9" height="2.4" rx="1.2" fill="#9aa7ba" />
    <rect x="29" y="24" width="9" height="2.4" rx="1.2" fill="#9aa7ba" />
    <rect x="29" y="29" width="6" height="2.4" rx="1.2" fill="#9aa7ba" />
  </Svg>
);

const FolderSvg = ({ s }) => (
  <Svg s={s}>
    <path d="M4 10 h14 l4 5 h22 v25 a2 2 0 0 1 -2 2 H6 a2 2 0 0 1 -2 -2 Z" fill="#f7c94b" stroke="#c98a10" strokeWidth="1.6" />
    <path d="M4 18 h40 v22 a2 2 0 0 1 -2 2 H6 a2 2 0 0 1 -2 -2 Z" fill="#ffd968" stroke="#c98a10" strokeWidth="1.4" />
    <path d="M4 18 h40 v4 H4 Z" fill="#ffe49a" opacity="0.85" />
  </Svg>
);

const GamepadSvg = ({ s }) => (
  <Svg s={s}>
    <path d="M12 15 c-7 0 -10 7 -10 14 c0 5 3 9 6.5 9 c3 0 4 -3.5 7.5 -3.5 h16 c3.5 0 4.5 3.5 7.5 3.5 c3.5 0 6.5 -4 6.5 -9 c0 -7 -3 -14 -10 -14 Z" fill="#4a5568" stroke="#2b3446" strokeWidth="1.6" />
    <rect x="11" y="21" width="4.4" height="12" rx="1.2" fill="#cbd5e0" />
    <rect x="7.2" y="24.8" width="12" height="4.4" rx="1.2" fill="#cbd5e0" />
    <circle cx="31" cy="21.5" r="2.4" fill="#f25022" />
    <circle cx="37" cy="25.5" r="2.4" fill="#7fba00" />
    <circle cx="31" cy="29.5" r="2.4" fill="#00a4ef" />
    <circle cx="25" cy="25.5" r="2.4" fill="#ffb900" />
  </Svg>
);

const MusicSvg = ({ s }) => (
  <Svg s={s}>
    <circle cx="24" cy="24" r="19" fill="#ff8a00" stroke="#cc5f00" strokeWidth="1.6" />
    <circle cx="24" cy="24" r="14.5" fill="#ffa333" />
    <path d="M31 12.5 v15.5 a4.6 4 0 1 1 -2.8 -3.7 V17 l-9.4 2.6 v12.6 a4.6 4 0 1 1 -2.8 -3.7 V15.6 Z" fill="#fff" />
  </Svg>
);

const RobotSvg = ({ s }) => (
  <Svg s={s}>
    <line x1="24" y1="13" x2="24" y2="8" stroke="#2b56ad" strokeWidth="2.2" />
    <circle cx="24" cy="6.6" r="2.6" fill="#ffb900" stroke="#c98a10" />
    <rect x="8" y="13" width="32" height="23" rx="4.5" fill="#5b8def" stroke="#2b56ad" strokeWidth="1.8" />
    <rect x="13" y="19.5" width="22" height="10" rx="2.4" fill="#dbe8ff" />
    <circle cx="19.5" cy="24.5" r="2.5" fill="#2b56ad" />
    <circle cx="28.5" cy="24.5" r="2.5" fill="#2b56ad" />
    <path d="M18 31 h12" stroke="#2b56ad" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8 30 l-5 9 l11 -3.4 Z" fill="#5b8def" stroke="#2b56ad" strokeWidth="1.4" />
  </Svg>
);

const CalcSvg = ({ s }) => (
  <Svg s={s}>
    <rect x="10" y="4" width="28" height="40" rx="3" fill="#e8ebef" stroke="#5a6572" strokeWidth="1.6" />
    <rect x="14" y="8" width="20" height="8" rx="1" fill="#bfe3c0" stroke="#5a8a5c" />
    {[0, 1, 2].map((r) =>
      [0, 1, 2].map((c) => (
        <rect key={`${r}${c}`} x={14 + c * 6.6} y={20 + r * 6.6} width="5" height="5" rx="1" fill="#5b8def" />
      ))
    )}
    <rect x="33.5" y="20" width="4.5" height="18.2" rx="1" fill="#ff8a00" />
  </Svg>
);

const NotepadSvg = ({ s }) => (
  <Svg s={s}>
    <rect x="9" y="4" width="30" height="40" rx="2" fill="#fff" stroke="#7a8699" strokeWidth="1.6" />
    <g stroke="#aab6c8" strokeWidth="2">
      <line x1="14" y1="13" x2="34" y2="13" />
      <line x1="14" y1="19" x2="34" y2="19" />
      <line x1="14" y1="25" x2="34" y2="25" />
      <line x1="14" y1="31" x2="27" y2="31" />
    </g>
    <path d="M29 41 l10.5 -10.5 l4 4 L33 45 l-5.4 1.4 Z" fill="#f7c94b" stroke="#c98a10" strokeWidth="1.4" />
  </Svg>
);

const PaintSvg = ({ s }) => (
  <Svg s={s}>
    <path d="M24 6 C13 6 5 13 5 23 c0 8 6 12 12 12 c2 0 3 1 3 3 c0 2 -1 2 -1 4 c0 2 2 4 5 4 c11 0 19 -9 19 -20 C43 14 35 6 24 6 Z" fill="#f0f2f5" stroke="#5a6572" strokeWidth="1.6" />
    <circle cx="15.5" cy="18" r="3.2" fill="#e2352b" />
    <circle cx="25" cy="13.5" r="3.2" fill="#f7c94b" />
    <circle cx="33.5" cy="19.5" r="3.2" fill="#2f6fd0" />
    <circle cx="30.5" cy="29.5" r="3.2" fill="#3fa142" />
  </Svg>
);

const GlobeSvg = ({ s }) => (
  <Svg s={s}>
    <circle cx="24" cy="24" r="19" fill="#2f8fe0" stroke="#1b5fa8" strokeWidth="1.6" />
    <path d="M24 5 a19 19 0 0 1 0 38 a26 26 0 0 0 0 -38 Z" fill="#5fb0f0" opacity="0.65" />
    <ellipse cx="24" cy="24" rx="9" ry="19" fill="none" stroke="#dff0ff" strokeWidth="1.6" />
    <path d="M6 18 h36 M6 30 h36 M24 5 v38" stroke="#dff0ff" strokeWidth="1.6" fill="none" />
  </Svg>
);

const MineSvg = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24">
    <g stroke="#000" strokeWidth="2.4">
      <line x1="12" y1="1" x2="12" y2="23" />
      <line x1="1" y1="12" x2="23" y2="12" />
      <line x1="4.2" y1="4.2" x2="19.8" y2="19.8" />
      <line x1="19.8" y1="4.2" x2="4.2" y2="19.8" />
    </g>
    <circle cx="12" cy="12" r="7" fill="#111" />
    <circle cx="9.4" cy="9.4" r="1.8" fill="#eee" />
  </svg>
);

const FlagRedSvg = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24">
    <path d="M6 2 v20" stroke="#111" strokeWidth="2.4" />
    <path d="M7 3 h12 l-4 5 l4 5 H7 Z" fill="#e2352b" stroke="#7d130c" strokeWidth="1.2" />
  </svg>
);

export const SmileyFace = ({ dead = false, cool = false, s = 22 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="#fdd835" stroke="#8a6d00" strokeWidth="1.6" />
    {dead ? (
      <>
        <path d="M6.5 7.5 l4 4 M10.5 7.5 l-4 4 M13.5 7.5 l4 4 M17.5 7.5 l-4 4" stroke="#111" strokeWidth="1.6" />
        <path d="M8 17 q4 -3 8 0" stroke="#111" strokeWidth="1.6" fill="none" />
      </>
    ) : cool ? (
      <>
        <path d="M5 10.4 h14 l-1.6 -2.4 h-10.8 Z" fill="#111" />
        <path d="M8 16 q4 3 8 0" stroke="#111" strokeWidth="1.6" fill="none" />
      </>
    ) : (
      <>
        <circle cx="8.6" cy="10" r="1.5" fill="#111" />
        <circle cx="15.4" cy="10" r="1.5" fill="#111" />
        <path d="M8 15 q4 3.4 8 0" stroke="#111" strokeWidth="1.6" fill="none" />
      </>
    )}
  </svg>
);

export const PowerIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24">
    <path d="M12 3 a1.6 1.6 0 0 1 1.6 1.6 v7 a1.6 1.6 0 0 1 -3.2 0 v-7 A1.6 1.6 0 0 1 12 3 Z M6.3 6.9 a1.6 1.6 0 0 1 0 2.26 a7 7 0 1 0 11.4 0 a1.6 1.6 0 1 1 2.26 -2.26 a10.2 10.2 0 1 1 -15.92 0 a1.6 1.6 0 0 1 2.26 0 Z" />
  </svg>
);

export const ErrorIcon = ({ s = 36 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="#e2352b" stroke="#7d130c" />
    <path d="M8 8 l8 8 M16 8 l-8 8" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const ShutdownIcon = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24">
    <path d="M12 4 v8" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M7 7 a7 7 0 1 0 10 0" stroke="#fff" strokeWidth="2" fill="none" />
  </svg>
);

export const RestartIcon = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24">
    <path d="M5 12 a7 7 0 1 1 2 5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <path d="M5 21 v-4 h4" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LogOffIcon = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24">
    <rect x="5" y="4" width="14" height="16" rx="2" fill="#f7c94b" stroke="#8a6d00" />
    <path d="M8 9 h8 M8 12 h8 M8 15 h5" stroke="#8a6d00" strokeWidth="1.4" />
  </svg>
);

export const TurnOffIcon = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" fill="#e2352b" stroke="#7d130c" />
    <ShutdownIcon s={14} />
  </svg>
);

export const CaptionGlyphs = {
  min: (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <rect x="1" y="6.6" width="6.4" height="2.2" fill="#fff" />
    </svg>
  ),
  max: (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <rect x="1" y="1" width="8" height="8" fill="none" stroke="#fff" strokeWidth="1.4" />
      <rect x="1" y="1" width="8" height="2.4" fill="#fff" />
    </svg>
  ),
  restore: (
    <svg width="11" height="10" viewBox="0 0 11 10">
      <rect x="3.4" y="0.8" width="6.8" height="6" fill="none" stroke="#fff" strokeWidth="1.3" />
      <rect x="3.4" y="0.8" width="6.8" height="2" fill="#fff" />
      <rect x="0.8" y="3.2" width="6.8" height="6" fill="#5a8ae0" stroke="#fff" strokeWidth="1.3" />
      <rect x="0.8" y="3.2" width="6.8" height="2" fill="#fff" />
    </svg>
  ),
  close: (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <path d="M1.4 1.4 L8.6 8.6 M8.6 1.4 L1.4 8.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

const ICON_MAP = {
  computer: ComputerSvg,
  profile: ProfileSvg,
  folder: FolderSvg,
  gamepad: GamepadSvg,
  music: MusicSvg,
  robot: RobotSvg,
  calc: CalcSvg,
  notepad: NotepadSvg,
  paint: PaintSvg,
  globe: GlobeSvg,
};

export const MetaIcon = ({ name, size = 16 }) => {
  const Cmp = ICON_MAP[name];
  return Cmp ? <Cmp s={size} /> : null;
};
