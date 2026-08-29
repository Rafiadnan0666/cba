export const AVATAR =
  "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5807b862bf1790ac6b1f82ab75d1be73-1743593947676/af264c2c-8fbc-4003-a5b3-d0b46292c8f8.png";

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
    title: "ClrBlind",
    desc: "Privacy-first accessibility app for color-blind users. Real-time object detection, rupiah recognition, OCR and scene narration, all running fully on-device in the browser.",
    img: "https://img.itch.zone/aW1nLzE4Nzk0Njg5LnBuZw==/original/FsHEyg.png",
    live: "https://collind.vercel.app",
    repo: "https://github.com/Rafiadnan0666/color-blind",
    tags: ["SvelteKit", "ONNX Runtime", "TensorFlow.js"],
  },
  {
    title: "Tabwise (gugel)",
    desc: "Collaborative research platform with shared sessions, AI-powered insights, real-time co-editing and team management. Draft quality assessment and link analysis components.",
    img: "https://placehold.co/600x400/dce7fb/12439e?text=Tabwise",
    live: "https://gugel-ebon.vercel.app",
    repo: "https://github.com/Rafiadnan0666/gugel",
    tags: ["Next.js", "TypeScript", "Supabase"],
  },
  {
    title: "CBA Portfolio",
    desc: "Windows XP themed portfolio website with ΩMEGA chess tier (depth 12 unbeatable), contact links for Fastwork, Fiverr, Instagram, LinkedIn.",
    img: "https://placehold.co/600x400/1a1a2e/00d4ff?text=CBA+Portfolio",
    live: "https://www.rafiadnan.my.id",
    repo: "https://github.com/Rafiadnan0666/cba",
    tags: ["Next.js", "React", "Tailwind", "Chess.js"],
  },
  {
    title: "Land Baru",
    desc: "Landing page with security hardening, contrast fixes, GSAP animations, and cross-device layout fixes.",
    img: "https://placehold.co/600x400/0f3460/e94560?text=Land+Baru",
    live: "https://landbaru.vercel.app",
    repo: "https://github.com/Rafiadnan0666/landbaru",
    tags: ["Next.js", "GSAP", "Tailwind"],
  },
  {
    title: "School Web Example",
    desc: "School website example with SvelteKit, Vercel adapter, and Font Awesome icons. Fixed Vercel 500 errors.",
    img: "https://placehold.co/600x400/1b263b/00b4d8?text=School+Web",
    live: "https://schoolwebexample.vercel.app",
    repo: "https://github.com/Rafiadnan0666/school-web",
    tags: ["SvelteKit", "Vercel Adapter", "Font Awesome"],
  },
  {
    title: "Disaster Tracker",
    desc: "Live earthquake and weather monitoring dashboard with a server-side risk analysis engine, alerting and trend charts.",
    img: "https://img.itch.zone/aW1nLzI0ODcyNjI1LnBuZw==/original/BZlGcM.png",
    live: "https://disaster-tracker.vercel.app",
    repo: "https://github.com/Rafiadnan0666/disaster-svelte",
    tags: ["SvelteKit", "MongoDB", "Leaflet"],
  },
  {
    title: "Ideas",
    desc: "Real-time team collaboration platform inspired by Notion and Linear: team chat, threaded posts, roles and invite links.",
    img: "https://placehold.co/600x400/e9e2f7/5b3a9e?text=Ideas",
    live: "https://ideas-wheat.vercel.app",
    repo: "https://github.com/Rafiadnan0666/vault2",
    tags: ["Next.js", "Supabase Realtime"],
  },
  {
    title: "FACTORY 404",
    desc: "Quantum manufacturing terminal. Command a futuristic production core through a retro-cyberpunk interface. Google site verification added.",
    img: "https://placehold.co/600x400/101418/39ff8b?text=FACTORY+404",
    live: "https://factoryy.vercel.app",
    repo: "https://github.com/Rafiadnan0666/factory-1",
    tags: ["Next.js 15", "TypeScript", "Tailwind"],
  },
  {
    title: "Business Finder",
    desc: "Responsive business directory web app built for easy listing, search and filtering. Next.js 13.4.0 upgrade.",
    img: "https://placehold.co/600x400/e3ecf7/12439e?text=Business+Finder",
    live: "https://busfind.vercel.app",
    repo: "https://github.com/Rafiadnan0666/business-finder",
    tags: ["Next.js", "JavaScript"],
  },
  {
    title: "POS App",
    desc: "Point of Sale application with updated profile page styles and layout components.",
    img: "https://placehold.co/600x400/2d6a4f/95d5b2?text=POS+App",
    live: "https://pos-app-peach.vercel.app",
    repo: "https://github.com/Rafiadnan0666/pos-pake-jees",
    tags: ["Next.js", "React", "Tailwind"],
  },
  {
    title: "Jasuke Nyoss",
    desc: "Simple landing page project.",
    img: "https://placehold.co/600x400/f77f00/fcbf49?text=Jasuke+Nyoss",
    live: "https://jasukenyoss.vercel.app",
    repo: "https://github.com/Rafiadnan0666/jasukenyoss",
    tags: ["Next.js", "JavaScript"],
  },
  {
    title: "Bear Scratching Game",
    desc: "Interactive bear scratching game.",
    img: "https://placehold.co/600x400/8b5e3c/d4a574?text=Bear+Game",
    live: "https://bear-scratching-game.vercel.app",
    repo: "https://github.com/Rafiadnan0666/bear-scratching-game",
    tags: ["JavaScript", "Canvas", "Game"],
  },
  {
    title: "Ahlul Qohwah Landing",
    desc: "Landing page for Ahlul Qohwah.",
    img: "https://placehold.co/600x400/1a1a2e/00d4ff?text=Ahlul+Qohwah",
    live: "https://ahlulqohwah.vercel.app",
    repo: "https://github.com/Rafiadnan0666/ahlul-qohwah-landing",
    tags: ["Next.js", "Tailwind"],
  },
  {
    title: "Landing Start",
    desc: "Initial landing page template.",
    img: "https://placehold.co/600x400/2c3e50/ecf0f1?text=Landing+Start",
    live: "https://landingstart.vercel.app",
    repo: "https://github.com/Rafiadnan0666/landingstart",
    tags: ["Next.js", "JavaScript"],
  },
  {
    title: "FACTORY (Clicker Game)",
    desc: "Factory clicker game with Next.js security updates.",
    img: "https://placehold.co/600x400/101418/39ff8b?text=FACTORY+Game",
    live: "https://factory-silk.vercel.app",
    repo: "https://github.com/Rafiadnan0666/factory-clicker-game",
    tags: ["Next.js", "Game", "TypeScript"],
  },
  {
    title: "Ollama Copilot",
    desc: "AI coding assistant powered by Ollama.",
    img: "https://placehold.co/600x400/6c5ce7/a29bfe?text=Ollama+Copilot",
    live: "https://ollama-copilot.vercel.app",
    repo: "https://github.com/Rafiadnan0666/ollama-copilot",
    tags: ["Next.js", "Ollama", "AI"],
  },
  {
    title: "QR Next",
    desc: "QR code generator built with Next.js.",
    img: "https://placehold.co/600x400/00b894/ffffff?text=QR+Next",
    live: "https://qrnext-one.vercel.app",
    repo: "https://github.com/Rafiadnan0666/qrnext",
    tags: ["Next.js", "QR Code"],
  },
  {
    title: "URL to QR",
    desc: "URL to QR code converter.",
    img: "https://placehold.co/600x400/0984e3/ffffff?text=URL+to+QR",
    live: "https://qrnext-psi.vercel.app",
    repo: "https://github.com/Rafiadnan0666/qrnext",
    tags: ["Next.js", "QR Code"],
  },
  {
    title: "Next.js Commerce",
    desc: "E-commerce starter with Next.js.",
    img: "https://placehold.co/600x400/1e3799/ffffff?text=Next.js+Commerce",
    live: "https://nextjs-commerce-pink-ten-97.vercel.app",
    repo: "https://github.com/Rafiadnan0666/nextjs-commerce",
    tags: ["Next.js", "Commerce", "Tailwind"],
  },
  {
    title: "PyEcommerce",
    desc: "Python-based e-commerce project.",
    img: "https://placehold.co/600x400/306998/ffd43b?text=PyEcommerce",
    live: "https://pyecommerce.vercel.app",
    repo: "https://github.com/Rafiadnan0666/pyecommerce",
    tags: ["Python", "FastAPI", "Next.js"],
  },
  {
    title: "Rafi Azure",
    desc: "Personal project deployed on Azure.",
    img: "https://placehold.co/600x400/0078d4/ffffff?text=Rafi+Azure",
    live: "https://rafi-azure.vercel.app",
    repo: "https://github.com/Rafiadnan0666/rafi",
    tags: ["Next.js", "Azure"],
  },
  {
    title: "Feane 1.0.0",
    desc: "Feane project v1.0.0.",
    img: "https://placehold.co/600x400/6c5ce7/ffffff?text=Feane",
    live: "https://feane-1-0-0.vercel.app",
    repo: "https://github.com/Rafiadnan0666/feane-1.0.0",
    tags: ["Next.js", "React"],
  },
  {
    title: "Furni 1.0.0",
    desc: "Furniture e-commerce template v1.0.0.",
    img: "https://placehold.co/600x400/2d3436/ffeaa7?text=Furni",
    live: "https://furni-1-0-0-sepia.vercel.app",
    repo: "https://github.com/Rafiadnan0666/furni-1.0.0",
    tags: ["Next.js", "E-commerce", "Tailwind"],
  },
  {
    title: "Koppee 1.0.0",
    desc: "Coffee shop template v1.0.0.",
    img: "https://placehold.co/600x400/6f4e37/d7b49e?text=Koppee",
    live: "https://koppee-1-0-0.vercel.app",
    repo: "https://github.com/Rafiadnan0666/Koppee-1.0.0",
    tags: ["Next.js", "Tailwind"],
  },
  {
    title: "Okelah",
    desc: "Okelah project.",
    img: "https://placehold.co/600x400/e17055/fdcb6e?text=Okelah",
    live: "https://okelah-vert.vercel.app",
    repo: "https://github.com/Rafiadnan0666/okelah",
    tags: ["Next.js", "JavaScript"],
  },
];

export const ITCH_GAMES = [
  {
    title: "Distortion Protocol",
    desc: "A turn-based tactical RPG.",
    img: "https://img.itch.zone/aW1nLzI1NzYwOTM5LnBuZw==/315x250%23c/yHALPU.png",
    link: "https://gregrsea-975.itch.io/distortion-protocol",
    genre: "Role Playing",
    playable: false,
  },
  {
    title: "Ghost",
    desc: "You are a ghost.",
    img: "https://placehold.co/600x400/1b1e2b/cfd8ff?text=Ghost",
    link: "https://gregrsea-975.itch.io/ghost",
    genre: "Action",
    playable: true,
  },
  {
    title: "Time Loop",
    desc: "Mind-bending FPS puzzle where the only help you have... is yourself. Literally.",
    img: "https://img.itch.zone/aW1nLzIyNDc4OTYyLnBuZw==/315x250%23c/LkK6v4.png",
    link: "https://gregrsea-975.itch.io/loop",
    genre: "Platformer",
    playable: true,
  },
  {
    title: "Artifact Fetching for Dummies",
    desc: "Steal the Artifact. Dodge the Drones. Question Your Life Choices.",
    img: "https://img.itch.zone/aW1nLzE4Nzk0Njg5LnBuZw==/original/FsHEyg.png",
    link: "https://gregrsea-975.itch.io/artifact-fetching-for-dummies",
    genre: "Action",
    playable: true,
  },
  {
    title: "END",
    desc: "A sinister coliseum where warriors fight for false freedom.",
    img: "https://img.itch.zone/aW1nLzE5NjM4NTM0LmpwZw==/315x250%23c/YRDn7Q.jpg",
    link: "https://gregrsea-975.itch.io/end",
    genre: "Adventure",
    playable: true,
  },
  {
    title: "bear",
    desc: "Scratch the back of a bear but watch it, he can get mad.",
    img: "https://img.itch.zone/aW1nLzI2Nzk3MzEwLnBuZw==/original/uzuPEy.png",
    link: "https://gregrsea-975.itch.io/bear",
    genre: "Action",
    playable: true,
  },
  {
    title: "Kaiju Commander",
    desc: "You don't control the kaiju. You suggest.",
    img: "https://img.itch.zone/aW1nLzE4Nzk0Njg5LnBuZw==/315x250%23c/FsHEyg.png",
    link: "https://gregrsea-975.itch.io/kaiju-commander",
    genre: "Role Playing",
    playable: false,
  },
  {
    title: "FACTORY",
    desc: "Minimalist factory simulation prototype. Design and optimize production flows.",
    img: "https://img.itch.zone/aW1nLzI0ODcyNjI1LnBuZw==/original/BZlGcM.png",
    link: "https://gregrsea-975.itch.io/factory-yyh",
    genre: "Simulation",
    playable: true,
  },
  {
    title: "Mabar Rek",
    desc: "Multiplayer FPS shooter up to 20 people.",
    img: "https://placehold.co/600x400/22262e/8be9fd?text=Mabar+Rek",
    link: "https://gregrsea-975.itch.io/mabar-rek",
    genre: "Shooter",
    playable: false,
  },
];

export const SYSTEM_PROMPT = `You are the XP Assistant living inside Rafi Adnan's Windows XP themed portfolio website. You speak English: short, warm, slightly playful, retro-flavored. You help recruiters and visitors learn about Rafi and encourage them to hire him.

FACTS ABOUT RAFI ADNAN:
- Full-stack web developer and indie game developer based in Indonesia.
- BNSP certified Web Developer; 3rd place winner of a Portfolio Competition 2025; interned as Web Developer at YBM PLN (Feb-Jul 2024).
- Web stack: React, Next.js, TypeScript, JavaScript, Laravel/PHP, CodeIgniter, Tailwind CSS, SvelteKit, Supabase, MySQL, MongoDB, Node.js.
- Game stack: Unity, C#, Shader Graph, NavMesh AI, procedural generation.
- Flagship projects:
  * ClrBlind: privacy-first accessibility app for color-blind users; real-time object detection, Indonesian rupiah recognition, OCR and scene narration running fully on-device (SvelteKit, ONNX Runtime Web, TensorFlow.js). Live: https://collind.vercel.app
  * Tabwise (gugel): collaborative research platform with AI insights and real-time co-editing (Next.js, TypeScript, Supabase). Live: https://gugel-ebon.vercel.app
  * Disaster Tracker: live earthquake/weather monitoring dashboard with risk analysis engine (SvelteKit, MongoDB, Leaflet, Chart.js). Live: https://disaster-tracker.vercel.app
  * Ideas: real-time team collaboration platform like Notion/Linear (Next.js, Supabase Realtime). Live: https://ideas-wheat.vercel.app
  * FACTORY 404: quantum manufacturing terminal web toy (Next.js 15). Live: https://factoryy.vercel.app
  * Business Finder: responsive business directory web app (Next.js). Live: https://busfind.vercel.app
  * CBA Portfolio: Windows XP themed portfolio with ΩMEGA chess (depth 12). Live: https://rafiadnan.my.id
- Indie games published as "Gregrsea 975" on itch.io: Distortion Protocol (tactical RPG), Ghost, Time Loop, Artifact Fetching for Dummies, END, bear, Kaiju Commander, FACTORY, Mabar Rek. Profile: https://gregrsea-975.itch.io
- 30+ projects on Vercel including: Land Baru, School Web, POS App, Bear Scratching Game, FACTORY Clicker Game, Ollama Copilot, QR Next, Next.js Commerce, Feane, Furni, Koppee, and more.
- GitHub: https://github.com/Rafiadnan0666 | Website: https://rafiadnan.my.id
- He also produces electronic/dubstep music ("Joy Theme" on Spotify).

RULES:
- Keep answers under 90 words. Plain text only.
- If asked who built the site: Rafi did, entirely by himself.
- If someone seems like a recruiter, highlight ClrBlind, Tabwise, and his full-stack + game range, then point them to the Contact tab in the Profile window or rafiadnan.my.id.
- Never invent facts outside this knowledge.`;

export const FALLBACK_ANSWERS = [
  {
    k: ["hire", "hired", "recruit", "job", "available", "open to work"],
    a: "Rafi is open to opportunities! He ships production web apps (React, Next.js, Laravel, SvelteKit) AND indie games in Unity. Start with the ClrBlind project in My Projects, then hit the Contact tab in his Profile.",
  },
  {
    k: ["clrblind", "color blind", "accessib", "a11y"],
    a: "ClrBlind is his flagship: an AI accessibility app for color-blind users. Object detection, rupiah recognition and OCR run 100% on-device. Zero uploads. Try it live: https://collind.vercel.app",
  },
  {
    k: ["game", "itch", "unity", "play"],
    a: "As Gregrsea 975 he shipped 9 games on itch.io: tactical RPGs, horror parkour FPS, multiplayer shooters. Open the Itch.io Library on the desktop to play several right in your browser!",
  },
  {
    k: ["skill", "stack", "tech", "framework", "language"],
    a: "Frontend: React, Next.js, TypeScript, Tailwind, SvelteKit. Backend: Laravel, CodeIgniter, Node.js, Supabase, MySQL, MongoDB. Games: Unity, C#, Shader Graph. Certified BNSP Web Developer.",
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
  "Great question! Short version: Rafi builds polished web apps (React/Next.js/Laravel/SvelteKit) and indie games (Unity). Highlights: ClrBlind, Tabwise and 9 games on itch.io. Ask me about his skills, projects, games or how to hire him!";

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
