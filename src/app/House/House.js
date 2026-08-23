"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "./../page.css";
import { XpFlag, MetaIcon, CaptionGlyphs } from "./icons";
import {
  AVATAR,
  WINDOW_META,
  INITIAL_WINDOWS,
  ITCH_GAMES,
  SYSTEM_PROMPT,
  FALLBACK_ANSWERS,
  GENERIC_FALLBACK,
  AVAILABILITY_LABEL,
} from "./data";
import { ProfileContent, ProjectsContent } from "./windows.jsx";
import {
  MinesweeperBody,
  SnakeBody,
  TetrisBody,
  ChessBody,
  TargetBody,
  CalculatorBody,
  NotepadBody,
  PaintBody,
} from "./apps.jsx";
import { playSound } from "./sounds";
import {
  PowerScreen,
  BootScreen,
  StartMenu,
  ContextMenu,
  BalloonTip,
  WelcomeDialog,
  AboutDialog,
  TurnOffDialog,
  ErrorDialogBox,
} from "./menus.jsx";

const TETROMINOES = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[1, 1, 1], [0, 1, 0]],
  [[1, 1, 1], [1, 0, 0]],
  [[1, 1, 1], [0, 0, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 1, 0], [0, 1, 1]],
];

const normalizeAvailability = (v) => {
  const map = { readily: "available", "after-download": "downloadable", no: "unavailable" };
  return map[v] || v || "unavailable";
};

export default function PortXFolio() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState("off");
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const zCounter = useRef(100);
  const [activeWin, setActiveWin] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [allProgramsOpen, setAllProgramsOpen] = useState(false);
  const [ctxMenu, setCtxMenu] = useState(null);
  const [time, setTime] = useState(new Date());
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const [balloon, setBalloon] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [screensaver, setScreensaver] = useState(false);
  const lastActivity = useRef(Date.now());
  const [selectedIcon, setSelectedIcon] = useState(null);
  const isTouchRef = useRef(false);

  const [profileTab, setProfileTab] = useState("about");
  const dragState = useRef(null);

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const directionRef = useRef("RIGHT");
  const [snakeOver, setSnakeOver] = useState(false);
  const [snakeScore, setSnakeScore] = useState(0);

  const [tetrisGrid, setTetrisGrid] = useState(() => Array.from({ length: 20 }, () => Array(10).fill(0)));
  const tetrisGridRef = useRef(tetrisGrid);
  tetrisGridRef.current = tetrisGrid;
  const [tetrisPiece, setTetrisPiece] = useState(null);
  const tetrisPieceRef = useRef(tetrisPiece);
  tetrisPieceRef.current = tetrisPiece;
  const [tetrisScore, setTetrisScore] = useState(0);
  const [tetrisLines, setTetrisLines] = useState(0);
  const [tetrisOver, setTetrisOver] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm the XP Assistant (Ey-Ay), powered by Chrome's built-in Gemini Nano, running on your device. No server needed. Ask me anything about Rafi!",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [aiStatus, setAiStatus] = useState("checking");
  const [aiDownload, setAiDownload] = useState(null);
  const aiBusyRef = useRef(false);
  const sessionRef = useRef(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    setMounted(true);
    try {
      isTouchRef.current = window.matchMedia("(pointer: coarse)").matches;
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!mounted || phase !== "on") return;
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, [mounted, phase]);

  const startBoot = useCallback(() => {
    setDialog(null);
    setPhase("boot");
    setTimeout(() => {
      setPhase("on");
      playSound("startup", mutedRef.current);
      setTimeout(() => setDialog("welcome"), 700);
      const b1 = setTimeout(() => setBalloon(true), 2400);
      const b2 = setTimeout(() => setBalloon(false), 14000);
      lastActivity.current = Date.now();
      return () => {
        clearTimeout(b1);
        clearTimeout(b2);
      };
    }, 3200);
  }, []);

  useEffect(() => {
    if (!mounted || phase !== "on") return;
    const bump = () => {
      lastActivity.current = Date.now();
      setScreensaver((ss) => (ss ? false : ss));
    };
    window.addEventListener("pointermove", bump, { passive: true });
    window.addEventListener("keydown", bump);
    const idle = setInterval(() => {
      if (Date.now() - lastActivity.current > 75000) setScreensaver(true);
    }, 2000);
    return () => {
      window.removeEventListener("pointermove", bump);
      window.removeEventListener("keydown", bump);
      clearInterval(idle);
    };
  }, [mounted, phase]);

  useEffect(() => {
    if (!startOpen && !ctxMenu) return;
    const close = () => {
      setStartOpen(false);
      setAllProgramsOpen(false);
      setCtxMenu(null);
    };
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [startOpen, ctxMenu]);

  const openWindow = useCallback((name, opts) => {
    if (opts?.tab) setProfileTab(opts.tab);
    setSelectedIcon(null);
    setStartOpen(false);
    setAllProgramsOpen(false);
    setCtxMenu(null);
    let mobileMax = false;
    try {
      mobileMax = isTouchRef.current && window.innerWidth < 760;
    } catch (e) {}
    setWindows((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        open: true,
        closing: false,
        minimized: false,
        maximized: prev[name].maximized || mobileMax,
        pos:
          prev[name].open && !mobileMax
            ? prev[name].pos
            : {
                x: Math.max(12, Math.min(70 + Math.random() * 110, Math.max(12, window.innerWidth - WINDOW_META[name].w - 16))),
                y: Math.max(8, Math.min(34 + Math.random() * 70, Math.max(8, window.innerHeight - WINDOW_META[name].h - 50))),
              },
        z: ++zCounter.current,
      },
    }));
    setActiveWin(name);
  }, []);

  const closeWindow = useCallback((name) => {
    setWindows((prev) => ({ ...prev, [name]: { ...prev[name], closing: true } }));
    setTimeout(() => {
      setWindows((prev) => ({ ...prev, [name]: { ...prev[name], open: false, closing: false } }));
      setActiveWin((cur) => (cur === name ? null : cur));
    }, 170);
  }, []);

  const minimizeWindow = useCallback((name) => {
    playSound("minimize", mutedRef.current);
    setWindows((prev) => ({ ...prev, [name]: { ...prev[name], minimized: true } }));
  }, []);

  const toggleMaximize = useCallback((name) => {
    playSound("menu", mutedRef.current);
    setWindows((prev) => ({ ...prev, [name]: { ...prev[name], maximized: !prev[name].maximized } }));
  }, []);

  const bringToFront = useCallback((name) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) => ({ ...prev, [name]: { ...prev[name], z } }));
    setActiveWin(name);
  }, []);

  const onTitlePointerDown = (e, name) => {
    if (e.target.closest(".caption-btn") || windows[name].maximized) return;
    bringToFront(name);
    dragState.current = {
      name,
      offX: e.clientX - windows[name].pos.x,
      offY: e.clientY - windows[name].pos.y,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const onTitlePointerMove = (e) => {
    const d = dragState.current;
    if (!d) return;
    const nx = Math.min(Math.max(e.clientX - d.offX, -(WINDOW_META[d.name].w - 90)), window.innerWidth - 90);
    const ny = Math.min(Math.max(e.clientY - d.offY, 0), window.innerHeight - 70);
    setWindows((prev) => ({ ...prev, [d.name]: { ...prev[d.name], pos: { x: nx, y: ny } } }));
  };

  const onTitlePointerUp = () => {
    dragState.current = null;
  };

  useEffect(() => {
    if (!windows.snake.open || snakeOver) return;
    const iv = setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        const dir = directionRef.current;
        if (dir === "UP") head.y -= 1;
        else if (dir === "DOWN") head.y += 1;
        else if (dir === "LEFT") head.x -= 1;
        else head.x += 1;
        if (
          head.x < 0 ||
          head.x >= 20 ||
          head.y < 0 ||
          head.y >= 20 ||
          prev.some((s) => s.x === head.x && s.y === head.y)
        ) {
          setSnakeOver(true);
          playSound("error", mutedRef.current);
          return prev;
        }
        const body = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setSnakeScore((s) => s + 10);
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        } else body.pop();
        return body;
      });
    }, 170);
    return () => clearInterval(iv);
  }, [windows.snake.open, snakeOver, food]);

  const resetSnake = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    directionRef.current = "RIGHT";
    setSnakeOver(false);
    setSnakeScore(0);
  };

  const spawnTetris = useCallback(() => {
    setTetrisPiece({
      shape: TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)],
      pos: { x: 3, y: 0 },
    });
  }, []);

  const initTetris = useCallback(() => {
    setTetrisGrid(Array.from({ length: 20 }, () => Array(10).fill(0)));
    setTetrisScore(0);
    setTetrisLines(0);
    setTetrisOver(false);
    spawnTetris();
  }, [spawnTetris]);

  useEffect(() => {
    if (windows.tetris.open && !tetrisPieceRef.current && !tetrisOver) initTetris();
  }, [windows.tetris.open, tetrisOver, initTetris]);

  const tetrisValid = (shape, px, py) => {
    const grid = tetrisGridRef.current;
    for (let r = 0; r < shape.length; r++)
      for (let c = 0; c < shape[r].length; c++) {
        if (!shape[r][c]) continue;
        const x = px + c;
        const y = py + r;
        if (x < 0 || x >= 10 || y >= 20 || (y >= 0 && grid[y][x])) return false;
      }
    return true;
  };

  const lockTetris = useCallback(() => {
    const piece = tetrisPieceRef.current;
    if (!piece) return;
    setTetrisGrid((prevGrid) => {
      const g = prevGrid.map((row) => [...row]);
      let over = false;
      piece.shape.forEach((row, r) =>
        row.forEach((v, c) => {
          if (!v) return;
          const y = piece.pos.y + r;
          const x = piece.pos.x + c;
          if (y < 0) over = true;
          else g[y][x] = 1;
        })
      );
      if (over) {
        setTetrisOver(true);
        playSound("error", mutedRef.current);
        return prevGrid;
      }
      const kept = g.filter((row) => !row.every((cell) => cell));
      const cleared = 20 - kept.length;
      if (cleared > 0) {
        setTetrisLines((l) => l + cleared);
        setTetrisScore((s) => s + cleared * 100);
      }
      while (kept.length < 20) kept.unshift(Array(10).fill(0));
      return kept;
    });
    spawnTetris();
  }, [spawnTetris]);

  useEffect(() => {
    if (!windows.tetris.open || windows.tetris.minimized || tetrisOver || !tetrisPiece) return;
    const iv = setInterval(() => {
      const piece = tetrisPieceRef.current;
      if (!piece) return;
      if (tetrisValid(piece.shape, piece.pos.x, piece.pos.y + 1)) {
        setTetrisPiece((p) => (p ? { ...p, pos: { ...p.pos, y: p.pos.y + 1 } } : p));
      } else lockTetris();
    }, 600);
    return () => clearInterval(iv);
  }, [windows.tetris.open, windows.tetris.minimized, tetrisOver, tetrisPiece, lockTetris]);

  const moveTetris = (dx, dy) => {
    const piece = tetrisPieceRef.current;
    if (!piece || tetrisOver) return;
    if (tetrisValid(piece.shape, piece.pos.x + dx, piece.pos.y + dy)) {
      setTetrisPiece((p) => (p ? { ...p, pos: { x: p.pos.x + dx, y: p.pos.y + dy } } : p));
    } else if (dy > 0) lockTetris();
  };

  const rotateTetris = () => {
    const piece = tetrisPieceRef.current;
    if (!piece || tetrisOver) return;
    const rotated = piece.shape[0].map((_, i) => piece.shape.map((row) => row[i]).reverse());
    if (tetrisValid(rotated, piece.pos.x, piece.pos.y)) setTetrisPiece((p) => (p ? { ...p, shape: rotated } : p));
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setStartOpen(false);
        setCtxMenu(null);
        setDialog((d) => (d === "welcome" || d === "about" || d?.type === "error" ? null : d));
        return;
      }
      if (activeWin === "snake" && !snakeOver) {
        const dir = directionRef.current;
        if (e.key === "ArrowUp" && dir !== "DOWN") directionRef.current = "UP";
        else if (e.key === "ArrowDown" && dir !== "UP") directionRef.current = "DOWN";
        else if (e.key === "ArrowLeft" && dir !== "RIGHT") directionRef.current = "LEFT";
        else if (e.key === "ArrowRight" && dir !== "LEFT") directionRef.current = "RIGHT";
        else return;
        e.preventDefault();
      }
      if (activeWin === "tetris" && !tetrisOver && tetrisPieceRef.current) {
        if (e.key === "ArrowLeft") moveTetris(-1, 0);
        else if (e.key === "ArrowRight") moveTetris(1, 0);
        else if (e.key === "ArrowDown") moveTetris(0, 1);
        else if (e.key === "ArrowUp") rotateTetris();
        else return;
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const showError = (title, msg) => {
    setDialog({ type: "error", title, msg });
    playSound("error", mutedRef.current);
  };

  const checkAiAvailability = useCallback(async () => {
    try {
      if (typeof window === "undefined" || !window.LanguageModel) {
        setAiStatus("unavailable");
        return;
      }
      const availability = await window.LanguageModel.availability({
        expectedOutputs: [{ type: "text", languages: ["en"] }],
      });
      setAiStatus(normalizeAvailability(availability));
    } catch (err) {
      setAiStatus("unavailable");
    }
  }, []);

  useEffect(() => {
    if (windows.aiChat.open && aiStatus === "checking") checkAiAvailability();
  }, [windows.aiChat.open, aiStatus, checkAiAvailability]);

  const ensureSession = async () => {
    if (sessionRef.current) return sessionRef.current;
    const LM = window.LanguageModel;
    const opts = {
      temperature: 0.7,
      topK: 3,
      initialPrompts: [{ role: "system", content: SYSTEM_PROMPT }],
      expectedOutputs: [{ type: "text", languages: ["en"] }],
    };
    const availability = await LM.availability(opts);
    if (normalizeAvailability(availability) === "unavailable") throw new Error("unavailable");
    const session = await LM.create({
      ...opts,
      monitor(m) {
        m.addEventListener("downloadprogress", (e) => {
          setAiDownload(Math.round(e.loaded * 100));
          if (e.loaded >= 1) setTimeout(() => setAiDownload(null), 900);
        });
        m.addEventListener("statechange", (ev) => {
          if (ev.target.state === "available") setAiStatus("available");
        });
      },
    });
    sessionRef.current = session;
    return session;
  };

  const sendChat = async (e) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text || aiBusyRef.current) return;
    aiBusyRef.current = true;
    setChatMessages((m) => [...m, { role: "user", text }]);
    setChatInput("");
    try {
      if (typeof window !== "undefined" && window.LanguageModel) {
        const session = await ensureSession();
        let result = "";
        if (session.promptStreaming) {
          const stream = session.promptStreaming(text);
          setChatMessages((m) => [...m, { role: "bot", text: "" }]);
          for await (const chunk of stream) {
            result += chunk;
            const snapshot = result;
            setChatMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1] = { role: "bot", text: snapshot };
              return copy;
            });
          }
          if (!result.trim()) throw new Error("empty");
        } else {
          result = await session.prompt(text);
          setChatMessages((m) => [...m, { role: "bot", text: result }]);
        }
      } else {
        throw new Error("nolm");
      }
    } catch (err) {
      const lower = text.toLowerCase();
      const match = FALLBACK_ANSWERS.find((f) => f.k.some((k) => lower.includes(k)));
      setChatMessages((m) => [...m, { role: "bot", text: match?.a || GENERIC_FALLBACK }]);
    } finally {
      aiBusyRef.current = false;
      requestAnimationFrame(() => chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const DESKTOP_ICONS = [
    { id: "my-profile", label: "My Profile", icon: "profile", action: () => openWindow("profile") },
    { id: "projects", label: "My Projects", icon: "folder", action: () => openWindow("projects") },
    { id: "games", label: "Games", icon: "gamepad", action: () => openWindow("gamesLibrary") },
    { id: "assistant", label: "XP Assistant", icon: "robot", action: () => openWindow("aiChat") },
    { id: "chess", label: "Chess vs Ey-Ay", icon: "gamepad", action: () => openWindow("chess") },
    { id: "music", label: "My Music", icon: "music", action: () => openWindow("spotify") },
    { id: "itchio", label: "Itch.io Games", icon: "globe", action: () => openWindow("itchio") },
    { id: "calculator", label: "Calculator", icon: "calc", action: () => openWindow("calculator") },
    { id: "notepad", label: "Notepad", icon: "notepad", action: () => openWindow("notepad") },
    { id: "paint", label: "Paint", icon: "paint", action: () => openWindow("paint") },
  ];

  const smLeftPinned = [
    { key: "Internet", sub: "Internet Explorer", icon: <MetaIcon name="globe" size={28} />, action: () => openWindow("projects") },
    { key: "Contact Me", sub: "Outlook Express", icon: <MetaIcon name="notepad" size={28} />, action: () => openWindow("profile", { tab: "contact" }) },
  ];
  const smLeftRecent = [
    { key: "XP Assistant", icon: <MetaIcon name="robot" size={24} />, action: () => openWindow("aiChat") },
    { key: "ClrBlind + more", icon: <MetaIcon name="folder" size={24} />, action: () => openWindow("projects") },
    { key: "Chess vs Ey-Ay", icon: <MetaIcon name="gamepad" size={24} />, action: () => openWindow("chess") },
    { key: "Itch.io Games", icon: <MetaIcon name="globe" size={24} />, action: () => openWindow("itchio") },
  ];
  const smRightItems = [
    { key: "My Documents", icon: <MetaIcon name="notepad" size={22} />, action: () => openWindow("notepad") },
    { key: "My Pictures", icon: <MetaIcon name="paint" size={22} />, action: () => openWindow("paint") },
    { key: "My Music", icon: <MetaIcon name="music" size={22} />, action: () => openWindow("spotify") },
    { key: "My Computer", icon: <MetaIcon name="computer" size={22} />, action: () => setDialog("about") },
    { key: "Control Panel", icon: <MetaIcon name="profile" size={22} />, action: () => openWindow("profile") },
    { key: "Help and Support", icon: <MetaIcon name="robot" size={22} />, action: () => setDialog("welcome") },
  ];
  const allPrograms = [
    { header: "Accessories" },
    { key: "Calculator", icon: <MetaIcon name="calc" size={18} />, action: () => openWindow("calculator") },
    { key: "Notepad", icon: <MetaIcon name="notepad" size={18} />, action: () => openWindow("notepad") },
    { key: "Paint", icon: <MetaIcon name="paint" size={18} />, action: () => openWindow("paint") },
    { header: "Games" },
    { key: "Minesweeper", icon: <MetaIcon name="gamepad" size={18} />, action: () => openWindow("minesweeper") },
    { key: "Snake", icon: <MetaIcon name="gamepad" size={18} />, action: () => openWindow("snake") },
    { key: "Tetris", icon: <MetaIcon name="gamepad" size={18} />, action: () => openWindow("tetris") },
    { key: "Chess vs Ey-Ay", icon: <MetaIcon name="gamepad" size={18} />, action: () => openWindow("chess") },
    { key: "Target Practice", icon: <MetaIcon name="gamepad" size={18} />, action: () => openWindow("targetPractice") },
    { header: "Internet" },
    { key: "Windows Messenger", icon: <MetaIcon name="robot" size={18} />, action: () => openWindow("aiChat") },
    { key: "Itch.io Library", icon: <MetaIcon name="globe" size={18} />, action: () => openWindow("itchio") },
  ];

  const ctxItems = [
    { label: "Refresh", action: () => { setCtxMenu(null); playSound("recycle", mutedRef.current); } },
    { sep: true },
    { label: "View Projects", action: () => openWindow("projects") },
    { label: "Challenge Ey-Ay at Chess", action: () => openWindow("chess") },
    { label: "Ask XP Assistant", action: () => openWindow("aiChat") },
    { label: "Start Screensaver", action: () => { setCtxMenu(null); setScreensaver(true); } },
    { sep: true },
    { label: "Properties", action: () => { setCtxMenu(null); setDialog("about"); } },
  ];

  const renderContent = (name) => {
    switch (name) {
      case "profile":
        return <ProfileContent tab={profileTab} setTab={setProfileTab} />;
      case "projects":
        return <ProjectsContent />;
      case "minesweeper":
        return <MinesweeperBody muted={muted} />;
      case "snake":
        return <SnakeBody snake={snake} food={food} over={snakeOver} score={snakeScore} length={snake.length} onReset={resetSnake} />;
      case "tetris":
        return <TetrisBody grid={tetrisGrid} piece={tetrisPiece} score={tetrisScore} lines={tetrisLines} over={tetrisOver} onReset={initTetris} />;
      case "chess":
        return <ChessBody muted={muted} />;
      case "targetPractice":
        return <TargetBody muted={muted} />;
      case "calculator":
        return <CalculatorBody />;
      case "notepad":
        return <NotepadBody />;
      case "paint":
        return <PaintBody />;
      case "spotify":
        return (
          <div className="window-content spotify-wrap">
            <iframe
              src="https://open.spotify.com/embed/artist/2PYunjmmYVDbsSudTPSwyv?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify player"
              className="spotify-embed"
            />
            <div className="side-detail" style={{ padding: "8px 2px" }}>
              Rafi also produces electronic and dubstep music. Track: <b>Joy Theme</b>.
            </div>
          </div>
        );
      case "itchio":
        return (
          <div className="window-content xp-scroll" style={{ background: "#fdfdfd" }}>
            <div className="itchio-header">
              <MetaIcon name="gamepad" size={44} />
              <div className="itchio-header-text">
                <h2>Gregrsea 975 Game Studio</h2>
                <p>Indie games built with Unity, sweat, and questionable life choices.</p>
                <a className="itchio-profile-link" href="https://gregrsea-975.itch.io" target="_blank" rel="noopener noreferrer">
                  View full profile on itch.io
                </a>
              </div>
            </div>
            <div className="itchio-games-grid">
              {ITCH_GAMES.map((g) => (
                <div key={g.title} className="itchio-game-card">
                  <div className="itchio-game-image">
                    <img src={g.img} alt={g.title} loading="lazy" />
                    <span className="itchio-game-genre">{g.genre}</span>
                    {g.playable && <span className="itchio-play-badge">PLAY IN BROWSER</span>}
                  </div>
                  <div className="itchio-game-info">
                    <h3>{g.title}</h3>
                    <p>{g.desc}</p>
                    <a className="project-link" href={g.link} target="_blank" rel="noopener noreferrer">
                      Play / Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "gamesLibrary":
        return (
          <div className="window-content games-library">
            <div className="games-library-head">
              <MetaIcon name="gamepad" size={36} />
              <div>
                <h2 style={{ color: "#0c3290", fontSize: 15 }}>RafiOS Game Collection</h2>
                <p style={{ fontSize: 10, color: "#666" }}>Every game below actually works. The chess one even has an AI.</p>
              </div>
            </div>
            <div className="games-grid">
              {[
                { label: "Minesweeper", act: () => openWindow("minesweeper"), ic: "gamepad" },
                { label: "Snake", act: () => openWindow("snake"), ic: "gamepad" },
                { label: "Tetris", act: () => openWindow("tetris"), ic: "gamepad" },
                { label: "Chess vs Ey-Ay", act: () => openWindow("chess"), ic: "robot" },
                { label: "Target Practice", act: () => openWindow("targetPractice"), ic: "gamepad" },
              ].map((g) => (
                <div key={g.label} className="game-card" onClick={g.act}>
                  <div className="game-svg">
                    <MetaIcon name={g.ic} size={32} />
                  </div>
                  <h3>{g.label}</h3>
                  <p>Click to launch</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "aiChat":
        return (
          <div className="ai-shell">
            <div className="ai-banner">
              <MetaIcon name="robot" size={24} />
              <div style={{ flex: 1 }}>
                XP Assistant (Ey-Ay)
                <div style={{ fontWeight: "normal", fontSize: 9.5, opacity: 0.85 }}>
                  {AVAILABILITY_LABEL[aiStatus] || "Checking on-device AI..."}
                </div>
              </div>
              {aiDownload !== null && <span style={{ fontSize: 10 }}>{aiDownload}%</span>}
            </div>
            {aiDownload !== null && (
              <div style={{ padding: "6px 10px", background: "#ffffe1", borderBottom: "1px solid #d8d5c5", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10 }}>Downloading Gemini Nano…</span>
                <div className="skill-track" style={{ flex: 1 }}>
                  <div className="skill-fill" style={{ width: `${Math.max(aiDownload, 4)}%` }} />
                </div>
              </div>
            )}
            <div className="ai-messages">
              {chatMessages.map((m, i) => (
                <div key={i} className={`msg-row ${m.role}`}>
                  {m.role === "bot" ? (
                    <span className="msg-avatar bot-avatar">
                      <MetaIcon name="robot" size={20} />
                    </span>
                  ) : (
                    <img className="msg-avatar" src={AVATAR} alt="" />
                  )}
                  <div className="msg-bubble">{m.text}</div>
                </div>
              ))}
              {aiBusyRef.current && (
                <div className="msg-row bot">
                  <span className="msg-avatar bot-avatar">
                    <MetaIcon name="robot" size={20} />
                  </span>
                  <div className="msg-bubble typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>
            <form onSubmit={sendChat} className="ai-input-form">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about Rafi's skills, projects, games..."
              />
              <button type="submit" className="xp-button">
                Send
              </button>
            </form>
          </div>
        );
      default:
        return <div className="window-content" />;
    }
  };

  if (!mounted) {
    return <div className="loading-state">Starting RafiOS...</div>;
  }

  if (phase === "off") {
    return (
      <PowerScreen
        onStart={() => {
          playSound("logon", mutedRef.current);
          startBoot();
        }}
      />
    );
  }

  if (phase === "boot") {
    return <BootScreen />;
  }

  if (phase === "shutdown") {
    return (
      <div className="shutdown-screen">
        <XpFlag size={64} />
        <div>It&apos;s now safe to close this tab.</div>
        <button className="xp-button" onClick={() => setPhase("off")}>
          Power On
        </button>
      </div>
    );
  }

  return (
    <div className="xp-desktop">
      <div className="xp-wallpaper" />

      <div
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
        onClick={() => setSelectedIcon(null)}
        onContextMenu={(e) => {
          e.preventDefault();
          setStartOpen(false);
          setCtxMenu({ x: e.clientX, y: e.clientY });
        }}
      />

      <div className="desktop-icons">
        {DESKTOP_ICONS.map((di) => (
          <div
            key={di.id}
            className={`desktop-icon ${selectedIcon === di.id ? "selected" : ""}`}
            onClick={() => {
              if (isTouchRef.current) di.action();
              else setSelectedIcon(di.id);
            }}
            onDoubleClick={() => {
              if (!isTouchRef.current) di.action();
            }}
          >
            <div className="di-img">
              <MetaIcon name={di.icon} size={38} />
            </div>
            <span className="di-label">{di.label}</span>
          </div>
        ))}
      </div>

      {Object.entries(windows)
        .filter(([, w]) => w.open)
        .map(([name, w]) => {
          const isActive = activeWin === name;
          const cls = ["window", isActive ? "" : "inactive-window", w.closing ? "closing" : "", w.minimized ? "minimized-state" : ""]
            .filter(Boolean)
            .join(" ");
          const style = w.maximized
            ? { left: 0, top: 0, width: "100vw", height: "calc(100vh - 30px)", zIndex: w.z, borderRadius: 0 }
            : {
                left: w.pos.x,
                top: w.pos.y,
                width: WINDOW_META[name].w,
                height: WINDOW_META[name].h,
                maxWidth: "calc(100vw - 12px)",
                maxHeight: "calc(100vh - 48px)",
                zIndex: w.z,
              };
          return (
            <div key={name} className={cls} style={style}>
              <div
                className="window-title-bar"
                onPointerDown={(e) => onTitlePointerDown(e, name)}
                onPointerMove={onTitlePointerMove}
                onPointerUp={onTitlePointerUp}
                onDoubleClick={() => toggleMaximize(name)}
              >
                <span className="wt-icon">
                  <MetaIcon name={WINDOW_META[name].icon} size={16} />
                </span>
                <span className="wt-title">{WINDOW_META[name].label}</span>
                <div className="caption-buttons">
                  <button className="caption-btn minmax" aria-label="Minimize" onClick={(e) => { e.stopPropagation(); minimizeWindow(name); }}>
                    {CaptionGlyphs.min}
                  </button>
                  <button className="caption-btn minmax" aria-label="Maximize" onClick={(e) => { e.stopPropagation(); toggleMaximize(name); }}>
                    {w.maximized ? CaptionGlyphs.restore : CaptionGlyphs.max}
                  </button>
                  <button className="caption-btn close" aria-label="Close" onClick={(e) => { e.stopPropagation(); closeWindow(name); }}>
                    {CaptionGlyphs.close}
                  </button>
                </div>
              </div>
              <div className="window-body">{renderContent(name)}</div>
            </div>
          );
        })}

      {ctxMenu && <ContextMenu x={ctxMenu.x} y={ctxMenu.y} items={ctxItems} />}

      {startOpen && (
        <StartMenu
          leftPinned={smLeftPinned}
          leftRecent={smLeftRecent}
          rightItems={smRightItems}
          allPrograms={allPrograms}
          allProgramsOpen={allProgramsOpen}
          onToggleAllPrograms={() => setAllProgramsOpen((o) => !o)}
          onLogOff={() => {
            setStartOpen(false);
            startBoot();
          }}
          onTurnOff={() => {
            setStartOpen(false);
            setDialog("turnoff");
          }}
        />
      )}

      {balloon && <BalloonTip onClose={() => setBalloon(false)} />}

      <div className="taskbar" onContextMenu={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
        <div
          className={`start-button ${startOpen ? "open" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setCtxMenu(null);
            setStartOpen((o) => !o);
            setAllProgramsOpen(false);
          }}
        >
          <XpFlag size={22} />
          <span className="sb-text">start</span>
        </div>
        <div className="quick-launch">
          <div className="ql-item" title="My Projects" onClick={() => openWindow("projects")}>
            <MetaIcon name="folder" size={16} />
          </div>
          <div className="ql-item" title="Profile" onClick={() => openWindow("profile")}>
            <MetaIcon name="profile" size={16} />
          </div>
          <div className="ql-item" title="Games" onClick={() => openWindow("gamesLibrary")}>
            <MetaIcon name="gamepad" size={16} />
          </div>
          <div className="ql-item" title="XP Assistant" onClick={() => openWindow("aiChat")}>
            <MetaIcon name="robot" size={16} />
          </div>
        </div>
        <div className="taskbar-items">
          {Object.entries(windows)
            .filter(([, w]) => w.open)
            .map(([name, w]) => (
              <div
                key={name}
                className={`taskbar-item ${activeWin === name && !w.minimized ? "active" : ""}`}
                onClick={() => {
                  if (activeWin === name && !w.minimized) {
                    minimizeWindow(name);
                    setActiveWin(null);
                  } else {
                    setWindows((prev) => ({ ...prev, [name]: { ...prev[name], minimized: false } }));
                    bringToFront(name);
                  }
                }}
              >
                <MetaIcon name={WINDOW_META[name].icon} size={15} />
                <span>{WINDOW_META[name].label.split(" - ")[0]}</span>
              </div>
            ))}
        </div>
        <div className="system-tray">
          <div className="tray-icon" title={muted ? "Sounds off" : "Sounds on"} onClick={() => setMuted((m) => !m)}>
            {muted ? (
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path d="M4 9 h4 l5 -5 v16 l-5 -5 H4 Z" fill="#fff" />
                <path d="M16 8 l6 8 M22 8 l-6 8" stroke="#ff6a5c" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path d="M4 9 h4 l5 -5 v16 l-5 -5 H4 Z" fill="#fff" />
                <path d="M16 8 q3 4 0 8 M18.5 5.5 q5 6.5 0 13" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <div className="tray-icon" title="Network" onClick={() => setBalloon((b) => !b)}>
            <svg width="15" height="15" viewBox="0 0 24 24">
              <rect x="3" y="10" width="18" height="10" rx="2" fill="#e8ebef" stroke="#5a6572" />
              <path d="M7 10 V7 a5 5 0 0 1 10 0 v3" stroke="#fff" strokeWidth="2.2" fill="none" />
              <circle cx="12" cy="15" r="1.6" fill="#2c8a2c" />
            </svg>
          </div>
          <div className="tray-icon" title="Security" onClick={() => openWindow("profile", { tab: "contact" })}>
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M12 2 L20 5 v6 c0 5.5 -3.4 9.4 -8 11 c-4.6 -1.6 -8 -5.5 -8 -11 V5 Z" fill="#3fa142" stroke="#1d5c20" />
              <path d="M8.5 12 l2.5 2.5 l4.5 -5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div className="clock" title={time.toDateString()}>
            {time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
          </div>
        </div>
      </div>

      {dialog === "welcome" && <WelcomeDialog onClose={() => setDialog(null)} onProjects={() => { setDialog(null); openWindow("projects"); }} />}
      {dialog === "about" && <AboutDialog onClose={() => setDialog(null)} />}
      {dialog === "turnoff" && (
        <TurnOffDialog
          onClose={() => setDialog(null)}
          onStandBy={() => {
            setDialog(null);
            showError("Stand By unavailable", "Rafi never sleeps, and neither does this portfolio.");
          }}
          onTurnOff={() => {
            setDialog(null);
            playSound("shutdown", mutedRef.current);
            setPhase("shutdown");
          }}
          onRestart={() => {
            setDialog(null);
            startBoot();
          }}
        />
      )}
      {dialog?.type === "error" && <ErrorDialogBox title={dialog.title} msg={dialog.msg} onClose={() => setDialog(null)} />}

      {screensaver && (
        <div className="screensaver" onClick={() => setScreensaver(false)} onPointerDown={() => setScreensaver(false)}>
          {Array.from({ length: 70 }, (_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                width: `${(i % 3) + 1}px`,
                height: `${(i % 3) + 1}px`,
                animationDuration: `${(i % 4) + 1.5}s`,
              }}
            />
          ))}
          <div className="screensaver-text" style={{ top: "48%", left: "50%", transform: "translate(-50%, -50%)" }}>
            RAFI ADNAN · PORTFOLIO
          </div>
        </div>
      )}
    </div>
  );
}
