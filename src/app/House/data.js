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
    live: "https://colorblind-alpha.vercel.app",
    repo: "https://github.com/Rafiadnan0666/color-blind",
    tags: ["SvelteKit", "ONNX Runtime", "TensorFlow.js"],
  },
  {
    title: "Tabwise",
    desc: "Collaborative research platform with shared sessions, AI-powered insights, real-time co-editing and team management.",
    img: "https://placehold.co/600x400/dce7fb/12439e?text=Tabwise",
    live: "https://gugel-ebon.vercel.app",
    repo: "https://github.com/Rafiadnan0666/gugel",
    tags: ["Next.js", "TypeScript", "Supabase"],
  },
  {
    title: "Disaster Tracker",
    desc: "Live earthquake and weather monitoring dashboard with a server-side risk analysis engine, alerting and trend charts.",
    img: "https://img.itch.zone/aW1nLzI0ODcyNjI1LnBuZw==/original/BZlGcM.png",
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
    desc: "Quantum manufacturing terminal. Command a futuristic production core through a retro-cyberpunk interface.",
    img: "https://placehold.co/600x400/101418/39ff8b?text=FACTORY+404",
    live: "https://factoryy.vercel.app",
    repo: "https://github.com/Rafiadnan0666/factory-1",
    tags: ["Next.js 15", "TypeScript", "Tailwind"],
  },
  {
    title: "SummitPeak",
    desc: "Full outdoor-gear e-commerce platform with product variants, customer reviews, saved addresses and complete checkout flow.",
    img: "https://placehold.co/600x400/e8efe2/2c6e2c?text=SummitPeak",
    repo: "https://github.com/Rafiadnan0666",
    tags: ["CodeIgniter 4", "MySQL", "Neubrutalism"],
  },
  {
    title: "Ey-Ay",
    desc: "AI desktop assistant built with Node.js and custom voice interaction. Part productivity tool, part lonely coder friend.",
    img: "https://placehold.co/600x400/fdeee0/b3541e?text=Ey-Ay",
    repo: "https://github.com/Rafiadnan0666/Ey-Ay",
    tags: ["Node.js", "Python", "Voice AI"],
  },
  {
    title: "Business Finder",
    desc: "Responsive business directory web app built for easy listing, search and filtering.",
    img: "https://placehold.co/600x400/e3ecf7/12439e?text=Business+Finder",
    live: "https://business-finder-cyan.vercel.app",
    repo: "https://github.com/Rafiadnan0666/business-finder",
    tags: ["Next.js", "JavaScript"],
  },
  {
    title: "Ollama Copilot",
    desc: "Web copilot powered by locally hosted Ollama models. Chat with your own LLM, completely privately.",
    img: "https://placehold.co/600x400/14181f/7ee787?text=Ollama+Copilot",
    live: "https://ollama-copilot.vercel.app",
    repo: "https://github.com/Rafiadnan0666/ollama-copilot",
    tags: ["TypeScript", "Ollama", "LLM"],
  },
  {
    title: "PyCommerce",
    desc: "Python-powered storefront with catalog, cart and order flow deployed on Vercel.",
    img: "https://placehold.co/600x400/fdf3d8/a07c0f?text=PyCommerce",
    live: "https://pyecommerce.vercel.app",
    repo: "https://github.com/Rafiadnan0666/pyecommerce",
    tags: ["Python", "E-commerce"],
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
  * ClrBlind: privacy-first accessibility app for color-blind users; real-time object detection, Indonesian rupiah recognition, OCR and scene narration running fully on-device (SvelteKit, ONNX Runtime Web, TensorFlow.js). Live: https://colorblind-alpha.vercel.app
  * Tabwise: collaborative research platform with AI insights and real-time co-editing (Next.js, TypeScript, Supabase). Live: https://gugel-ebon.vercel.app
  * Disaster Tracker: live earthquake/weather monitoring dashboard with risk analysis engine (SvelteKit, MongoDB, Leaflet, Chart.js).
  * Ideas: real-time team collaboration platform like Notion/Linear (Next.js, Supabase Realtime). Live: https://ideas-wheat.vercel.app
  * FACTORY 404: quantum manufacturing terminal web toy (Next.js 15). Live: https://factoryy.vercel.app
  * SummitPeak: outdoor gear e-commerce with variants, reviews, checkout (CodeIgniter 4).
  * Ey-Ay: AI desktop assistant with voice interaction (Node.js, Python).
- Indie games published as "Gregrsea 975" on itch.io: Distortion Protocol (tactical RPG), Ghost, Time Loop, Artifact Fetching for Dummies, END, bear, Kaiju Commander, FACTORY, Mabar Rek. Profile: https://gregrsea-975.itch.io
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
    a: "ClrBlind is his flagship: an AI accessibility app for color-blind users. Object detection, rupiah recognition and OCR run 100% on-device. Zero uploads. Try it live: https://colorblind-alpha.vercel.app",
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
