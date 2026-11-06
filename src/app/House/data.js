export const AVATAR =
  "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5807b862bf1790ac6b1f82ab75d1be73-1743593947676/af264c2c-8fbc-4003-a5b3-d0b46292c8f8.png";

export const GITHUB_STATS = {
  repos: 66,
  publicRepos: 38,
  stars: 39,
  followers: 6,
  contributions: 334,
  achievements: ["Pull Shark", "YOLO", "Quickdraw"],
};

export const WINDOW_META = {
  profile: { label: "Rafi Adnan - Profile", icon: "profile", w: 620, h: 545 },
  projects: { label: "My Projects", icon: "folder", w: 800, h: 575 },
  gamesLibrary: { label: "Games Library", icon: "gamepad", w: 560, h: 450 },
  itchio: { label: "Itch.io Game Library", icon: "globe", w: 780, h: 555 },
  spotify: { label: "Windows Media Player", icon: "music", w: 430, h: 560 },
  aiChat: { label: "XP Assistant", icon: "robot", w: 440, h: 545 },
  calculator: { label: "Calculator", icon: "calc", w: 264, h: 380 },
  notepad: { label: "Untitled - Notepad", icon: "notepad", w: 520, h: 415 },
  paint: { label: "untitled - Paint", icon: "paint", w: 650, h: 505 },
  minesweeper: { label: "Minesweeper", icon: "gamepad", w: 400, h: 520 },
  snake: { label: "Snake", icon: "gamepad", w: 450, h: 515 },
  tetris: { label: "Tetris", icon: "gamepad", w: 460, h: 545 },
  chess: { label: "Chess", icon: "gamepad", w: 430, h: 535 },
  targetPractice: { label: "Target Practice", icon: "gamepad", w: 470, h: 430 },
};

export const INITIAL_WINDOWS = Object.fromEntries(
  Object.keys(WINDOW_META).map((name, i) => [
    name,
    {
      open: false,
      minimized: false,
      maximized: false,
      closing: false,
      z: i + 1,
      pos: { x: 70 + (i % 6) * 30, y: 36 + (i % 6) * 26 },
    },
  ])
);

export const PROJECTS = [
  {
    title: "SIBI Translator",
    desc: "Webcam-based Indonesian sign language translator. Recognises SIBI alphabet gestures, assembles words, predicts Indonesian sentences, then speaks them with text-to-speech.",
    img: "/shots/sibi.png",
    live: "https://sibii.vercel.app",
    repo: "https://github.com/Rafiadnan0666/sibi",
    tags: ["Python", "TensorFlow", "Text-to-Speech"],
  },
  {
    title: "Awake Alarm",
    desc: "A non-dismissable Android alarm clock that stops only when you solve math or scan a real object. Detection runs fully on-device with TensorFlow Lite. Beta APK available.",
    img: "/shots/awake-home.png",
    live: "https://github.com/Rafiadnan0666/bangun/releases/download/v1.0.2-beta/app-release.apk",
    liveLabel: "Download APK",
    repo: "https://github.com/Rafiadnan0666/bangun",
    tags: ["Flutter", "Dart", "TensorFlow Lite"],
  },
  {
    title: "ABS Attendance",
    desc: "Self-hosted Laravel 13 HR and attendance starter with GPS check-in, leave management, reimbursement approvals and role-based access control. MIT licensed.",
    img: "/shots/absen.png",
    live: null,
    repo: "https://github.com/Rafiadnan0666/absen-laravel",
    tags: ["Laravel 13", "MySQL", "RBAC"],
  },
  {
    title: "ClrBlind",
    desc: "Privacy-first accessibility app for colour-blind users. Object, colour, currency, medicine and meat-freshness detection plus OCR, all running on-device in the browser.",
    img: "/shots/clrblind.png",
    live: "https://collind.vercel.app",
    repo: "https://github.com/Rafiadnan0666/color-blind",
    tags: ["SvelteKit", "TensorFlow.js", "ONNX"],
  },
  {
    title: "Tabwise",
    desc: "Collaborative research platform with shared research tabs, AI summaries, real-time co-editing, drafts and team management. Also packaged as a Chrome extension.",
    img: "/shots/tabwise-editor.png",
    live: "https://gugel-ebon.vercel.app",
    repo: "https://github.com/Rafiadnan0666/gugel",
    tags: ["Next.js", "Supabase", "AI"],
  },
  {
    title: "Outdoor Gear POS",
    desc: "Full CodeIgniter 4 point-of-sale and e-commerce system for an outdoor gear store: multi-attribute variants, Midtrans payments, Biteship shipping and a walk-in POS dashboard.",
    img: "/shots/posci4-store.png",
    live: null,
    repo: "https://github.com/Rafiadnan0666/pos-ci4",
    tags: ["CodeIgniter 4", "Midtrans", "Biteship"],
  },
  {
    title: "Wavan Coffee",
    desc: "Corporate and product website for Wavan Coffee Roastery (WR.39 GRUP JemeKite), a coffee roastery based in Way Kanan, Lampung, Indonesia.",
    img: "/shots/wavan.png",
    live: "https://wavancoffee.vercel.app",
    repo: null,
    tags: ["Svelte", "Corporate Site", "SEO"],
  },
  {
    title: "SMA Cahaya Nusantara",
    desc: "School website for SMA Cahaya Nusantara with PPDB 2026 admissions, academic programmes, extracurriculars, news and contact flows.",
    img: "/shots/schoolweb.png",
    live: "https://schoolwebexample.vercel.app",
    repo: null,
    tags: ["SvelteKit", "School Site", "PPDB"],
  },
  {
    title: "FACTORY 404",
    desc: "Quantum manufacturing terminal: command a futuristic production core through a retro-cyberpunk interface. A browser toy with a serious factory-sim soul.",
    img: "/shots/factory404.png",
    live: "https://factoryy.vercel.app",
    repo: "https://github.com/Rafiadnan0666/factory-1",
    tags: ["Next.js 15", "TypeScript", "Retro UI"],
  },
  {
    title: "CBA Portfolio",
    desc: "The site you are using: a hand-built Windows XP desktop portfolio with working games, a local AI assistant and a chess engine that does not show mercy.",
    img: "/shots/cba.jpg",
    live: "https://www.rafiadnan.my.id",
    repo: "https://github.com/Rafiadnan0666/cba",
    tags: ["Next.js 15", "React", "Windows XP"],
  },
  {
    title: "Business Finder",
    desc: "OSINT and business intelligence web app. Search businesses by area, category and radius, with auto-enrichment, map scanning and a clean dashboard.",
    img: "/shots/businessfinder.png",
    live: "https://busfind.vercel.app",
    repo: "https://github.com/Rafiadnan0666/business-finder",
    tags: ["Next.js 15", "OSINT", "OpenStreetMap"],
  },
  {
    title: "Bear Scratching Game",
    desc: "Scratch the back of a bear. But watch it, he can get mad. A tiny interactive browser game with hand-drawn chaos.",
    img: "/shots/beargame.png",
    live: "https://bear-scratching-game.vercel.app",
    repo: "https://github.com/Rafiadnan0666/bear-scratching-game",
    tags: ["TypeScript", "Canvas", "Game"],
  },
  {
    title: "FACTORY Clicker",
    desc: "Minimalist factory clicker game about designing and optimising production lines. Build the machine, then watch the numbers go up.",
    img: "/shots/factoryclicker.png",
    live: "https://factory-silk.vercel.app",
    repo: "https://github.com/Rafiadnan0666/factory-clicker-game",
    tags: ["Next.js", "TypeScript", "Game"],
  },
];

export const ITCH_GAMES = [
  {
    title: "Ghost",
    desc: "You are a ghost.",
    img: "/covers/ghost.png",
    link: "https://gregrsea-975.itch.io/ghost",
    genre: "Action",
    playable: true,
  },
  {
    title: "Distortion Protocol",
    desc: "A turn-based tactical RPG.",
    img: "/covers/distortion-protocol.png",
    link: "https://gregrsea-975.itch.io/distortion-protocol",
    genre: "Role Playing",
    playable: false,
  },
  {
    title: "bear",
    desc: "Scratch the back of a bear but watch it, he can get mad.",
    img: "/covers/bear.png",
    link: "https://gregrsea-975.itch.io/bear",
    genre: "Action",
    playable: true,
  },
  {
    title: "Kaiju Commander",
    desc: "You do not control the kaiju. You suggest.",
    img: "/covers/kaiju-commander.png",
    link: "https://gregrsea-975.itch.io/kaiju-commander",
    genre: "Role Playing",
    playable: false,
  },
  {
    title: "FACTORY",
    desc: "Minimalist factory simulation prototype. Design and optimise production flows.",
    img: "/covers/factory.png",
    link: "https://gregrsea-975.itch.io/factory-yyh",
    genre: "Simulation",
    playable: true,
  },
  {
    title: "Time Loop",
    desc: "Mind-bending FPS puzzle where the only help you have... is yourself. Literally.",
    img: "/covers/time-loop.png",
    link: "https://gregrsea-975.itch.io/loop",
    genre: "Platformer",
    playable: false,
  },
  {
    title: "END",
    desc: "A sinister coliseum where warriors fight for false freedom.",
    img: "/covers/end.jpg",
    link: "https://gregrsea-975.itch.io/end",
    genre: "Adventure",
    playable: false,
  },
  {
    title: "Mabar Rek",
    desc: "Multiplayer FPS shooter for up to 20 players. Download for Windows.",
    img: "/covers/mabar-rek.svg",
    link: "https://gregrsea-975.itch.io/mabar-rek",
    genre: "Shooter",
    playable: false,
  },
  {
    title: "Artifact Fetching for Dummies",
    desc: "Steal the Artifact. Dodge the Drones. Question Your Life Choices.",
    img: "/covers/artifact-fetching.png",
    link: "https://gregrsea-975.itch.io/artifact-fetching-for-dummies",
    genre: "Action",
    playable: false,
  },
];

export const SYSTEM_PROMPT = `You are the XP Assistant living inside Rafi Adnan's Windows XP themed portfolio website. You speak English: short, warm, slightly playful, retro-flavored. You help recruiters and visitors learn about Rafi and encourage them to hire him.

FACTS ABOUT RAFI ADNAN:
- Full-stack web, mobile and indie game developer based in Indonesia. Currently open to work.
- BNSP certified Web Developer; 3rd place winner of a Portfolio Competition 2025; interned as Web Developer at YBM PLN (Feb-Jul 2024).
- GitHub: 66 repositories (38 public), 39 stars, 6 followers and 334 contributions in the last year. Achievements: Pull Shark, YOLO, Quickdraw.
- Web stack: React, Next.js, TypeScript, JavaScript, SvelteKit, Laravel 13, CodeIgniter 4, Tailwind CSS, Supabase, MySQL, MongoDB, Node.js.
- Mobile/AI stack: Flutter, Dart, Python, TensorFlow Lite, TensorFlow.js, ONNX Runtime Web, on-device ML.
- Game stack: Unity, C#, Shader Graph, NavMesh AI, procedural generation.
- Flagship projects:
  * Awake: non-dismissable Android alarm clock that stops only when you solve math or scan a real object; all detection on-device with TensorFlow Lite. Beta APK v1.0.2.
  * SIBI Translator: webcam Indonesian sign language translator; recognises SIBI alphabet, builds words, predicts sentences and speaks them. Live: https://sibii.vercel.app
  * ABS: self-hosted Laravel 13 HR and attendance system with GPS check-in, leave, reimbursements and RBAC. MIT licensed.
  * ClrBlind: privacy-first colour-vision accessibility app with on-device object, colour, currency, medicine and freshness detection. Live: https://collind.vercel.app
  * Tabwise: collaborative research platform with AI summaries and real-time co-editing. Live: https://gugel-ebon.vercel.app
  * Outdoor Gear POS: CodeIgniter 4 POS and e-commerce system with Midtrans and Biteship.
  * Wavan Coffee: corporate/product site for a Lampung coffee roastery. Live: https://wavancoffee.vercel.app
  * CBA Portfolio: this Windows XP themed portfolio with working games and an on-device AI assistant. Live: https://rafiadnan.my.id
- 9 indie games published as "Gregrsea 975" on itch.io: Ghost, Distortion Protocol, bear, Kaiju Commander, FACTORY, Time Loop, END, Mabar Rek, Artifact Fetching for Dummies. Profile: https://gregrsea-975.itch.io
- GitHub: https://github.com/Rafiadnan0666 | Website: https://rafiadnan.my.id | Instagram: @gregrsea_ninesevenfive
- He also produces electronic/dubstep music ("Joy Theme" on Spotify).

RULES:
- Keep answers under 90 words. Plain text only.
- If asked who built the site: Rafi did, entirely by himself.
- If someone seems like a recruiter, highlight Awake, SIBI, ABS, ClrBlind and his web + mobile + game range, then point them to the Contact tab in the Profile window or rafiadnan.my.id.
- Never invent facts outside this knowledge.`;

export const FALLBACK_ANSWERS = [
  {
    k: ["hire", "hired", "recruit", "job", "available", "open to work"],
    a: "Rafi is open to opportunities! He ships production web apps (React, Next.js, Laravel, SvelteKit), mobile apps in Flutter, and indie games in Unity. Start with Awake or SIBI in My Projects, then hit Contact in his Profile.",
  },
  {
    k: ["awake", "bangun", "alarm"],
    a: "Awake is a non-dismissable Android alarm clock. It only stops when you solve math problems or scan a real object. TensorFlow Lite handles all detection on-device. Beta APK v1.0.2 is available from My Projects.",
  },
  {
    k: ["sibi", "sign", "isyarat", "webcam"],
    a: "SIBI Translator watches your webcam, recognises Indonesian sign-language alphabet gestures, builds words, predicts sentences and speaks them with text-to-speech. Try it live at sibii.vercel.app.",
  },
  {
    k: ["absen", "attendance", "hr", "laravel"],
    a: "ABS is a self-hosted Laravel 13 HR and attendance starter with GPS check-in, leave management, reimbursement approvals and role-based access control. It is MIT licensed on GitHub.",
  },
  {
    k: ["clrblind", "color blind", "accessib", "a11y"],
    a: "ClrBlind is his privacy-first accessibility app for colour-blind users. Object detection, currency recognition, OCR and scene narration run 100% on-device. Try it live: https://collind.vercel.app",
  },
  {
    k: ["game", "itch", "unity", "play"],
    a: "As Gregrsea 975 he shipped 9 games on itch.io: tactical RPGs, horror parkour FPS, multiplayer shooters and more. Open the Itch.io Library on the desktop to play several right in your browser!",
  },
  {
    k: ["skill", "stack", "tech", "framework", "language"],
    a: "Web: React, Next.js, TypeScript, SvelteKit, Laravel, CodeIgniter, Tailwind, Supabase. Mobile/AI: Flutter, Dart, Python, TensorFlow Lite. Games: Unity, C#. Certified BNSP Web Developer.",
  },
  {
    k: ["contact", "email", "reach", "cv", "resume"],
    a: "Reach Rafi at fn234561@gmail.com or via rafiadnan.my.id. GitHub: github.com/Rafiadnan0666 | itch.io: gregrsea-975.itch.io. The Contact tab in the Profile window has every link.",
  },
  {
    k: ["xp", "windows", "site", "portfolio"],
    a: "This whole site is hand-built nostalgia: Luna windows, Bliss wallpaper, authentic sounds, working Minesweeper. Even this assistant runs on Chrome's built-in Gemini Nano model, fully offline. Just like 2003, but employable.",
  },
];

export const GENERIC_FALLBACK =
  "Great question! Short version: Rafi builds polished web apps (React/Next.js/Laravel/SvelteKit), mobile apps (Flutter) and indie games (Unity). Highlights: Awake, SIBI, ABS, ClrBlind, Tabwise and 9 games on itch.io.";

export const AVAILABILITY_LABEL = {
  checking: "Checking on-device AI...",
  available: "Gemini Nano ready (on-device)",
  downloadable: "AI model ready to download",
  downloading: "Downloading Gemini Nano...",
  unavailable: "Offline mode (smart fallback)",
};

export const PALETTE = [
  "#000000", "#7f7f7f", "#880015", "#ed1c24", "#ff7f27",
  "#fff200", "#22b14c", "#00a2e8", "#3f48cc", "#a349a4",
  "#ffffff", "#c3c3c3", "#b97a57", "#ffaec9", "#ffc90e",
  "#efe4b0", "#b5e61d", "#99d9ea", "#7092be", "#c8bfe7",
];
