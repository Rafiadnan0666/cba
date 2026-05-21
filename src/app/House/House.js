"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faWindowMaximize,
  faWindowRestore,
  faTimes,
  faFolder,
  faMusic,
  faUser,
  faGamepad,
  faRobot,
  faChess,
  faBorderAll,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "./../page.css";
import Script from "next/script";
const PortXFolio = () => {
  // State hooks
  const [mounted, setMounted] = useState(false);
  const [windows, setWindows] = useState({
    profile: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 1,
      pos: { x: 40, y: 40 },
    },
    projects: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 2,
      pos: { x: 80, y: 60 },
    },
    spotify: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 3,
      pos: { x: 120, y: 80 },
    },
    gamesLibrary: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 4,
      pos: { x: 160, y: 100 },
    },
    targetPractice: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 5,
      pos: { x: 200, y: 120 },
    },
    minesweeper: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 6,
      pos: { x: 240, y: 100 },
    },
    snake: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 7,
      pos: { x: 280, y: 120 },
    },
    tetris: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 8,
      pos: { x: 320, y: 80 },
    },
    chess: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 9,
      pos: { x: 360, y: 100 },
    },
    aiChat: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 10,
      pos: { x: 400, y: 60 },
    },
    calculator: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 11,
      pos: { x: 440, y: 80 },
    },
    notepad: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 12,
      pos: { x: 480, y: 100 },
    },
    paint: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 13,
      pos: { x: 520, y: 120 },
    },
    itchio: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 14,
      pos: { x: 560, y: 80 },
    },
  });

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [activeWindow, setActiveWindow] = useState(null);
  const [time, setTime] = useState(new Date());
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragWindow, setDragWindow] = useState(null);
  const [bootScreen, setBootScreen] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [screensaverActive, setScreensaverActive] = useState(false);
  const [lastActivity, setLastActivity] = useState(0);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [profileTab, setProfileTab] = useState("about");

  // Game states
  const [gameScore, setGameScore] = useState(0);
  const [gamePosition, setGamePosition] = useState({ x: 50, y: 50 });

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("RIGHT");
  const [snakeGameOver, setSnakeGameOver] = useState(false);

  const [minesweeperGrid, setMinesweeperGrid] = useState([]);
  const [revealedCells, setRevealedCells] = useState([]);
  const [flaggedCells, setFlaggedCells] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  const [tetrisGrid, setTetrisGrid] = useState(
    Array(20)
      .fill()
      .map(() => Array(10).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState(null);
  const [tetrisScore, setTetrisScore] = useState(0);
  const [tetrisGameOver, setTetrisGameOver] = useState(false);

  const [chessBoard, setChessBoard] = useState([]);
  const [selectedChessPiece, setSelectedChessPiece] = useState(null);

  // AI Chat
  const [aiResponse, setAiResponse] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  // Calculator
  const [calcDisplay, setCalcDisplay] = useState("0");
  const [calcPrevValue, setCalcPrevValue] = useState("");
  const [calcOperation, setCalcOperation] = useState("");

  // Notepad
  const [notepadContent, setNotepadContent] = useState("Welcome to Windows XP Notepad!\n\nThis is Rafi Adnan's portfolio.\n\nTry out the games and explore the features!");

  // Paint
  const [isDrawing, setIsDrawing] = useState(false);
  const [paintColor, setPaintColor] = useState("#000000");
  const canvasRef = useRef(null);

  const initializeSnake = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection("RIGHT");
    setSnakeGameOver(false);
    setGameScore(0);
  };

  useEffect(() => {
    if (!mounted) return;
    if (windows.snake.open && snake.length === 1 && snake[0].x === 10) {
      initializeSnake();
    }
    if (windows.tetris.open && tetrisGrid[0][0] === 0) {
      initializeTetris();
    }
    if (windows.minesweeper.open && minesweeperGrid.length === 0) {
      initializeMinesweeper();
    }
    if (windows.chess.open && chessBoard.length === 0) {
      initializeChess();
    }
  }, [windows, mounted]);

  // Snake game logic
  useEffect(() => {
    if (!windows.snake.open || snakeGameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };

        switch (direction) {
          case "UP":
            head.y -= 1;
            break;
          case "DOWN":
            head.y += 1;
            break;
          case "LEFT":
            head.x -= 1;
            break;
          case "RIGHT":
            head.x += 1;
            break;
        }

     
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
          setSnakeGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (
          prevSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y
          )
        ) {
          setSnakeGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Food collision
        if (head.x === food.x && head.y === food.y) {
          setGameScore((prev) => prev + 10);
          setFood({
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, 200);
    return () => clearInterval(gameLoop);
  }, [direction, snakeGameOver, food, windows.snake.open]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Snake controls
      if (windows.snake.open && !snakeGameOver) {
        switch (e.key) {
          case "ArrowUp":
            if (direction !== "DOWN") setDirection("UP");
            break;
          case "ArrowDown":
            if (direction !== "UP") setDirection("DOWN");
            break;
          case "ArrowLeft":
            if (direction !== "RIGHT") setDirection("LEFT");
            break;
          case "ArrowRight":
            if (direction !== "LEFT") setDirection("RIGHT");
            break;
        }
      }

      // Tetris controls
      if (windows.tetris.open && !tetrisGameOver && currentPiece) {
        switch (e.key) {
          case "ArrowLeft":
            moveTetrisPiece(-1, 0);
            break;
          case "ArrowRight":
            moveTetrisPiece(1, 0);
            break;
          case "ArrowDown":
            moveTetrisPiece(0, 1);
            break;
          case "ArrowUp":
            rotateTetrisPiece();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, snakeGameOver, currentPiece, tetrisGameOver, windows]);

  // Initialize mounted state
  useEffect(() => {
    setMounted(true);
    setLastActivity(Date.now());
  }, []);

  // Clock update
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [mounted]);

  // Boot sequence
  useEffect(() => {
    if (!mounted) return;
    const bootTimer = setTimeout(() => {
      setBootProgress(100);
      setTimeout(() => {
        setBootScreen(false);
        playSystemSound('startup');
        setTimeout(() => {
          setShowWelcomeDialog(true);
        }, 1000);
      }, 500);
    }, 3000);
    return () => clearTimeout(bootTimer);
  }, [mounted]);

  // Boot progress animation
  useEffect(() => {
    if (bootScreen) {
      const progressTimer = setInterval(() => {
        setBootProgress(prev => Math.min(prev + 2, 100));
      }, 50);
      return () => clearInterval(progressTimer);
    }
  }, [bootScreen]);

  // Screensaver
  useEffect(() => {
    if (!mounted || lastActivity === 0) return;
    const activityTimer = setInterval(() => {
      if (Date.now() - lastActivity > 30000) { // 30 seconds
        setScreensaverActive(true);
      }
    }, 1000);
    return () => clearInterval(activityTimer);
  }, [lastActivity, mounted]);

  // System sounds
  const playSystemSound = (sound) => {
    if (typeof window === 'undefined' || !mounted) return;
    try {
      const audio = new Audio();
      switch(sound) {
        case 'startup':
          audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiS2Oy9diMFl2+z5N17URACOafm8s17IwUte8fw35JBEApOqOPxtGMcBjGH0fPTgjMGHm7A7+OZURE';
          break;
        case 'error':
          audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiS2Oy9diMFl2+z5N17URACOafm8s17IwUte8fw35JBEApOqOPxtGMcBjGH0fPTgjMGHm7A7+OZURE';
          break;
        case 'click':
          audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiS2Oy9diMFl2+z5N17URACOafm8s17IwUte8fw35JBEApOqOPxtGMcBjGH0fPTgjMGHm7A7+OZURE';
          break;
      }
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {
      // Ignore audio errors
    }
  };

  // Update last activity
  const updateActivity = () => {
    if (!mounted) return;
    setLastActivity(Date.now());
    if (screensaverActive) {
      setScreensaverActive(false);
    }
  };

  // Calculator functions
  const handleCalcInput = (value) => {
    if (value === "C") {
      setCalcDisplay("0");
      setCalcPrevValue("");
      setCalcOperation("");
    } else if (value === "=") {
      if (calcOperation && calcPrevValue) {
        const result = eval(calcPrevValue + calcOperation + calcDisplay);
        setCalcDisplay(result.toString());
        setCalcPrevValue("");
        setCalcOperation("");
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      setCalcPrevValue(calcDisplay);
      setCalcOperation(value);
      setCalcDisplay("0");
    } else {
      setCalcDisplay(calcDisplay === "0" ? value : calcDisplay + value);
    }
  };

  // Paint functions
  const startDrawing = (e) => {
    if (!mounted) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing || !mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = paintColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Helper function for chess symbols
  const getChessSymbol = (type, color) => {
    const symbols = {
      king: color === "white" ? "♔" : "♚",
      queen: color === "white" ? "♕" : "♛",
      rook: color === "white" ? "♖" : "♜",
      bishop: color === "white" ? "♗" : "♝",
      knight: color === "white" ? "♘" : "♞",
      pawn: color === "white" ? "♙" : "♟",
    };
    return symbols[type];
  };

  // Window dragging logic
  const handleMouseDown = (e, windowName) => {
    if (e.target.closest(".window-controls")) return;

    bringToFront(windowName);
    setIsDragging(true);
    setDragWindow(windowName);
    setDragOffset({
      x: e.clientX - windows[windowName].pos.x,
      y: e.clientY - windows[windowName].pos.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragWindow) return;

    setWindows((prev) => ({
      ...prev,
      [dragWindow]: {
        ...prev[dragWindow],
        pos: {
          x: e.clientX - dragOffset.x,
          y: Math.min(e.clientY - dragOffset.y, window.innerHeight - 100),
        },
      },
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragWindow(null);
  };

  // Window management functions
  const openWindow = (windowName) => {
    setWindows((prev) => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        open: true,
        minimized: false,
        zIndex:
          Object.values(prev).reduce((max, w) => Math.max(max, w.zIndex), 0) +
          1,
      },
    }));
    setActiveWindow(windowName);
  };

  const closeWindow = (windowName) => {
    setWindows((prev) => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        open: false,
      },
    }));
    if (activeWindow === windowName) setActiveWindow(null);
  };

  const toggleMinimize = (windowName) => {
    setWindows((prev) => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        minimized: !prev[windowName].minimized,
      },
    }));
  };

  const toggleFullscreen = (windowName) => {
    setWindows((prev) => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        fullscreen: !prev[windowName].fullscreen,
        pos: prev[windowName].fullscreen
          ? prev[windowName].pos
          : { x: 0, y: 0 },
      },
    }));
  };

  const bringToFront = (windowName) => {
    setWindows((prev) => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        zIndex:
          Object.values(prev).reduce((max, w) => Math.max(max, w.zIndex), 0) +
          1,
      },
    }));
    setActiveWindow(windowName);
  };

  const initializeMinesweeper = () => {
    const grid = Array(10)
      .fill()
      .map(() => Array(10).fill(0));
    let mines = 15;

    while (mines > 0) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (grid[y][x] !== "M") {
        grid[y][x] = "M";
        mines--;
      }
    }

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (grid[y][x] === "M") continue;

        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (
              y + dy >= 0 &&
              y + dy < 10 &&
              x + dx >= 0 &&
              x + dx < 10 &&
              grid[y + dy][x + dx] === "M"
            ) {
              count++;
            }
          }
        }
        grid[y][x] = count;
      }
    }

    setMinesweeperGrid(grid);
    setRevealedCells([]);
    setFlaggedCells([]);
    setGameWon(false);
    setGameLost(false);
  };

  const revealCell = (x, y) => {
    if (
      flaggedCells.includes(`${x},${y}`) ||
      revealedCells.includes(`${x},${y}`)
    )
      return;
    if (gameWon || gameLost) return;

    const newRevealed = [...revealedCells, `${x},${y}`];
    setRevealedCells(newRevealed);

    if (minesweeperGrid[y][x] === "M") {
      setGameLost(true);
      return;
    }

    if (minesweeperGrid[y][x] === 0) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (
            y + dy >= 0 &&
            y + dy < 10 &&
            x + dx >= 0 &&
            x + dx < 10 &&
            !newRevealed.includes(`${x + dx},${y + dy}`)
          ) {
            revealCell(x + dx, y + dy);
          }
        }
      }
    }

    let unrevealed = 0;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (
          minesweeperGrid[y][x] !== "M" &&
          !newRevealed.includes(`${x},${y}`)
        ) {
          unrevealed++;
        }
      }
    }
    if (unrevealed === 0) setGameWon(true);
  };

  const toggleFlag = (x, y, e) => {
    e.preventDefault();
    if (revealedCells.includes(`${x},${y}`)) return;

    if (flaggedCells.includes(`${x},${y}`)) {
      setFlaggedCells(flaggedCells.filter((cell) => cell !== `${x},${y}`));
    } else {
      setFlaggedCells([...flaggedCells, `${x},${y}`]);
    }
  };

  const initializeTetris = () => {
    const emptyGrid = Array(20)
      .fill()
      .map(() => Array(10).fill(0));
    setTetrisGrid(emptyGrid);
    setTetrisScore(0);
    setTetrisGameOver(false);
    spawnNewTetrisPiece();
  };

  const spawnNewTetrisPiece = () => {
    const pieces = [
      [[1, 1, 1, 1]],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
      ],
    ];

    const newPiece = {
      shape: pieces[Math.floor(Math.random() * pieces.length)],
      pos: { x: 4, y: 0 },
    };

    setCurrentPiece(newPiece);
  };

  const moveTetrisPiece = (x, y) => {
    if (!currentPiece) return;

    const newX = currentPiece.pos.x + x;
    const newY = currentPiece.pos.y + y;

    if (isValidMove(currentPiece.shape, newX, newY)) {
      setCurrentPiece({
        ...currentPiece,
        pos: { x: newX, y: newY },
      });
    } else if (y > 0) {
      lockTetrisPiece();
    }
  };

  const rotateTetrisPiece = () => {
    if (!currentPiece) return;

    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map((row) => row[i]).reverse()
    );

    if (isValidMove(rotated, currentPiece.pos.x, currentPiece.pos.y)) {
      setCurrentPiece({
        ...currentPiece,
        shape: rotated,
      });
    }
  };

  const isValidMove = (shape, x, y) => {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const newX = x + col;
          const newY = y + row;

          if (
            newX < 0 ||
            newX >= 10 ||
            newY >= 20 ||
            (newY >= 0 && tetrisGrid[newY][newX] !== 0)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const lockTetrisPiece = () => {
    const newGrid = [...tetrisGrid];
    let gameOver = false;

    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col] !== 0) {
          const y = currentPiece.pos.y + row;
          const x = currentPiece.pos.x + col;

          if (y < 0) {
            gameOver = true;
            break;
          }

          newGrid[y][x] = 1;
        }
      }
    }

    if (gameOver) {
      setTetrisGameOver(true);
      return;
    }

    const linesCleared = newGrid.reduce((count, row, y) => {
      if (row.every((cell) => cell !== 0)) {
        newGrid.splice(y, 1);
        newGrid.unshift(Array(10).fill(0));
        return count + 1;
      }
      return count;
    }, 0);

    setTetrisScore((prev) => prev + linesCleared * 100);
    setTetrisGrid(newGrid);
    spawnNewTetrisPiece();
  };

  const initializeChess = () => {
    const board = Array(8)
      .fill()
      .map(() => Array(8).fill(null));

    for (let i = 0; i < 8; i++) {
      board[1][i] = { type: "pawn", color: "black" };
      board[6][i] = { type: "pawn", color: "white" };
    }

    const pieces = [
      "rook",
      "knight",
      "bishop",
      "queen",
      "king",
      "bishop",
      "knight",
      "rook",
    ];
    for (let i = 0; i < 8; i++) {
      board[0][i] = { type: pieces[i], color: "black" };
      board[7][i] = { type: pieces[i], color: "white" };
    }

    setChessBoard(board);
  };

  const handleChessClick = (row, col) => {
    if (!selectedChessPiece) {
      if (chessBoard[row][col]) {
        setSelectedChessPiece({ row, col });
      }
    } else {
      const { row: fromRow, col: fromCol } = selectedChessPiece;
      const piece = chessBoard[fromRow][fromCol];

      const newBoard = [...chessBoard];
      newBoard[row][col] = piece;
      newBoard[fromRow][fromCol] = null;

      setChessBoard(newBoard);
      setSelectedChessPiece(null);
    }
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    setIsThinking(true);

    setTimeout(() => {
      const responses = [
        "I'm an AI assistant in this Windows XP portfolio. How can I help you?",
        "Rafi is a full-stack developer with expertise in React, Laravel, and Unity.",
        "Check out the Games section for some nostalgic Windows XP-style games!",
        "This portfolio showcases innovative web technologies and interactive elements.",
        "The Minesweeper and Snake games are fully functional. Try them out!",
        "Rafi is currently working on a sci-fi roguelike shooter called Starfall.",
      ];
      setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
      setIsThinking(false);
      setUserMessage("");
    }, 1500);
  };

  // Target game
  const hitTarget = () => {
    setGameScore((prev) => prev + 1);
    setGamePosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    });
  };

  // Projects data
  const projects = [
    {
      title: "Time Loop",
      description:
        "Puzzle platformer where you cooperate with your past self. Built for GMTK 2025 in Unity.",
      image: "https://img.itch.zone/aW1nLzIyNDc4OTYyLnBuZw==/315x250%23c/LkK6v4.png",
      link: "https://gregrsea-975.itch.io/loop",
    },
    {
      title: "Artifact Fetching For Dummies",
      description:
        "A horror-parkour FPS game built in Unity. Escape with the relic... if you can.",
      image: "https://img.itch.zone/aW1nLzE4Nzk0Njg5LnBuZw==/original/FsHEyg.png",
      link: "https://gregrsea-975.itch.io/artifact-fetching-for-dummies",
    },
    {
      title: "End",
      description:
        "Sinister gladiator arena game where freedom is a lie. Developed in Unity. Built for Boss Rush 2024.",
      image: "https://img.itch.zone/aW1nLzE5NjM4NTM0LmpwZw==/315x250%23c/YRDn7Q.jpg",
      link: "https://gregrsea-975.itch.io/end",
    },
    {
      title: "Starfall (Coming Soon)",
      description:
        "Sci-fi roguelike shooter inspired by Risk of Rain 2 & No Man's Sky. Procedural planets. Co-op. Chaos.",
      image: "https://via.placeholder.com/300x200?text=Starfall+Game",
      link: "#",
    },
    {
      title: "SignalDeck",
      description:
        "Real-time webhook dashboard system built with Next.js and Supabase. Listen to webhook events, store them, and display them live.",
      image: "https://placehold.co/600x400/EEE/31343C?text=SignalDeck",
      link: "#",
    },
    {
      title: "Deployly.dev",
      description:
        "One-click deployment system for shared hosting using FTP/SFTP. Making shared hosting deployment painless.",
      image: "https://placehold.co/600x400/EEE/31343C?text=Deployly",
      link: "#",
    },
    {
      title: "Link Hub",
      description:
        "Customizable link-in-bio profile hub inspired by Lynk. Built with React and clean modern UI.",
      image: "https://placehold.co/600x400/EEE/31343C?text=Link+Hub",
      link: "#",
    },
    {
      title: "Ey-Ay",
      description:
        "AI desktop assistant built with Node.js and custom voice interaction - part productivity tool, part lonely coder friend.",
      image: "https://placehold.co/600x400/EEE/31343C?text=Ey-Ay",
      link: "https://github.com/Rafiadnan0666/Ey-Ay",
    },
    {
      title: "Vaultify (Ideas)",
      description:
        "Minimalist idea vault to store your wildest project concepts. Built with Next.js & Supabase.",
      image: "https://placehold.co/600x400/EEE/31343C?text=Vaultify",
      link: "https://ideas-wheat.vercel.app/",
    },
    {
      title: "JawaraDM Landing Page",
      description:
        "Marketing-first landing page for digital agency. Built with React and Tailwind.",
      image: "https://placehold.co/600x400/EEE/31343C?text=JawaraDM",
      link: "https://jawaradm.com/",
    },
    {
      title: "Business Finder",
      description:
        "Responsive business directory web app using Next.js, built for easy listing and filtering.",
      image: "https://placehold.co/600x400/EEE/31343C?text=Business+Finder",
      link: "https://business-finder-wine.vercel.app/",
    },
    {
      title: "Feane Restaurant Landing",
      description:
        "Scroll-snappy, clean restaurant landing page made with HTML, CSS, and Vercel deployment.",
      image: "https://placehold.co/600x400/EEE/31343C?text=Feane",
      link: "https://feane-1-0-0.vercel.app/",
    },
    {
      title: "Furni Furniture Store",
      description:
        "Sleek e-commerce front-end built with Tailwind. Product grids, shopping-ready UI.",
      image: "https://placehold.co/600x400/EEE/31343C?text=Furni",
      link: "https://furni-1-0-0-sepia.vercel.app/",
    },
    {
      title: "Koppee Coffee Shop",
      description:
        "A hip cafe landing page with parallax scrolling and retro brew vibes.",
      image: "https://placehold.co/600x400/EEE/31343C?text=Koppee",
      link: "https://koppee-1-0-0.vercel.app/",
    },
    {
      title: "ISBN Labeling Feature",
      description:
        "Custom ISBN generator and label system for KemPU's internal library web app (Laravel).",
      image: "https://placehold.co/600x400/EEE/31343C?text=ISBN+Feature",
      link: "https://bitbucket.org/bixelyte/laravel-pustaka8/commits/branch/feature%2Fisbn",
    },
  ];

  const games = [
    {
      title: "Minesweeper",
      description: "Classic Windows XP Minesweeper game",
      icon: faGamepad,
      action: () => openWindow("minesweeper"),
    },
    {
      title: "Snake",
      description: "Nostalgic Snake game from old mobile phones",
      icon: faGamepad,
      action: () => openWindow("snake"),
    },
    {
      title: "Tetris",
      description: "Classic block-stacking game",
      icon: faBorderAll,
      action: () => openWindow("tetris"),
    },
    {
      title: "Chess",
      description: "Traditional chess game",
      icon: faChess,
      action: () => openWindow("chess"),
    },
    {
      title: "Target Practice",
      description: "Click the moving target to score points",
      icon: faGamepad,
      action: () => openWindow("targetPractice"),
    },
  ];

  const itchioGames = [
    {
      title: "Time Loop",
      description: "A mind-bending FPS puzzle game where the only help you have... is yourself. Literally.",
      image: "https://img.itch.zone/aW1nLzIyNDc4OTYyLnBuZw==/315x250%23c/LkK6v4.png",
      link: "https://gregrsea-975.itch.io/loop",
      genre: "Platformer",
    },
    {
      title: "Artifact Fetching for Dummies",
      description: "Steal the Artifact. Dodge the Drones. Question Your Life Choices.",
      image: "https://img.itch.zone/aW1nLzE4Nzk0Njg5LnBuZw==/original/FsHEyg.png",
      link: "https://gregrsea-975.itch.io/artifact-fetching-for-dummies",
      genre: "Action",
    },
    {
      title: "END",
      description: "A sinister coliseum where warriors fight for false freedom.",
      image: "https://img.itch.zone/aW1nLzE5NjM4NTM0LmpwZw==/315x250%23c/YRDn7Q.jpg",
      link: "https://gregrsea-975.itch.io/end",
      genre: "Adventure",
    },
    {
      title: "bear",
      description: "Scratch the back of a bear but watch it - he can get mad.",
      image: "https://img.itch.zone/aW1nLzI2Nzk3MzEwLnBuZw==/original/uzuPEy.png",
      link: "https://gregrsea-975.itch.io/bear",
      genre: "Action",
    },
    {
      title: "Kaiju Commander",
      description: "You don't control the kaiju. You suggest.",
      image: "https://img.itch.zone/aW1nLzI1NzYwOTM5LnBuZw==/315x250%23c/yHALPU.png",
      link: "https://gregrsea-975.itch.io/kaiju-commander",
      genre: "Role Playing",
    },
    {
      title: "FACTORY",
      description: "A minimalist factory simulation prototype where you design and optimize production flows.",
      image: "https://img.itch.zone/aW1nLzI0ODcyNjI1LnBuZw==/original/BZlGcM.png",
      link: "https://gregrsea-975.itch.io/factory",
      genre: "Simulation",
    },
    {
      title: "Mabar Rek",
      description: "Multiplayer fps shooter up to 20 peopple",
      image: "https://placehold.co/600x400/EEE/31343C?text=Mabar+Rek",
      link: "https://gregrsea-975.itch.io/mabar-rek",
      genre: "Tool",
    },
  ];

  if (!mounted) {
    return (
      <div className="loading-state">
        <div>Loading Windows XP Portfolio...</div>
      </div>
    );
  }

  if (bootScreen) {
    const stars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2,
    }));

    return (
      <div className="boot-screen">
        <div className="boot-starfield">
          {stars.map((star) => (
            <div
              key={star.id}
              className="boot-star"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>
        <div className="boot-logo-container">
          <div className="boot-flag">
            <div className="boot-flag-piece boot-flag-red" />
            <div className="boot-flag-piece boot-flag-green" />
            <div className="boot-flag-piece boot-flag-blue" />
            <div className="boot-flag-piece boot-flag-yellow" />
          </div>
          <div className="boot-title">Microsoft Windows XP</div>
          <div className="boot-subtitle">Rafi Adnan Portfolio Edition</div>
        </div>
        <div className="boot-progress-container">
          <div className="boot-progress">
            <div
              className="boot-progress-bar"
              style={{ width: `${bootProgress}%` }}
            >
              <div className="boot-progress-glow" />
            </div>
          </div>
          <div className="boot-text">
            {bootProgress < 30
              ? "Loading personal configuration..."
              : bootProgress < 60
              ? "Starting Windows XP..."
              : bootProgress < 90
              ? "Preparing your desktop..."
              : "Almost there..."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`windows-xp-bg ${screensaverActive ? 'screensaver-active' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={updateActivity}
      onKeyDown={updateActivity}
    >
      {/* Windows XP Starfield Screensaver */}
      {screensaverActive && (
        <div className="screensaver">
          {Array.from({ length: 80 }, (_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
          <div
            className="screensaver-text"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'none',
              fontSize: '24px',
              color: 'rgba(255,255,255,0.15)',
              fontWeight: 'bold',
              letterSpacing: '4px',
            }}
          >
            Windows XP Portfolio
          </div>
        </div>
      )}

      {/* Welcome Dialog */}
      {showWelcomeDialog && (
        <div className="xp-dialog info-dialog" style={{ width: '400px' }}>
          <div className="xp-dialog-title">
            <span>Welcome to Windows XP Portfolio</span>
            <button onClick={() => setShowWelcomeDialog(false)}>×</button>
          </div>
          <div className="xp-dialog-content">
            <div className="xp-dialog-icon">👋</div>
            <div className="xp-dialog-text">
              Welcome to Rafi Adnan&apos;s Windows XP Portfolio! This interactive experience showcases my web development and game development projects. Click on desktop icons to open windows, play games, and explore my work. Enjoy the nostalgic Windows XP experience!
            </div>
          </div>
          <div className="xp-dialog-buttons">
            <button className="xp-button" onClick={() => setShowWelcomeDialog(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Error Dialog */}
      {showErrorDialog && (
        <div className="xp-dialog error-dialog">
          <div className="xp-dialog-title">
            <span>Error</span>
            <button onClick={() => setShowErrorDialog(false)}>×</button>
          </div>
          <div className="xp-dialog-content">
            <div className="xp-dialog-icon">⚠️</div>
            <div className="xp-dialog-text">{errorMessage}</div>
          </div>
          <div className="xp-dialog-buttons">
            <button className="xp-button" onClick={() => setShowErrorDialog(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Desktop Icons */}
      <div className="desktop-icons" onClick={updateActivity}>
        <div className="desktop-icon" onClick={() => openWindow("profile")}>
          <FontAwesomeIcon icon={faUser} size="3x" />
          <span>My Profile</span>
        </div>
        <div className="desktop-icon" onClick={() => openWindow("projects")}>
          <FontAwesomeIcon icon={faFolder} size="3x" />
          <span>Projects</span>
        </div>
        <div
          className="desktop-icon"
          onClick={() => openWindow("gamesLibrary")}
        >
          <FontAwesomeIcon icon={faGamepad} size="3x" />
          <span>Games</span>
        </div>
        <div className="desktop-icon" onClick={() => openWindow("spotify")}>
          <FontAwesomeIcon icon={faMusic} size="3x" />
          <span>Spotify</span>
        </div>
        <div className="desktop-icon" onClick={() => openWindow("aiChat")}>
          <FontAwesomeIcon icon={faRobot} size="3x" />
          <span>AI Assistant</span>
        </div>
        <div className="desktop-icon" onClick={() => openWindow("calculator")}>
          <span style={{fontSize: '48px'}}>🧮</span>
          <span>Calculator</span>
        </div>
        <div className="desktop-icon" onClick={() => openWindow("notepad")}>
          <span style={{fontSize: '48px'}}>📝</span>
          <span>Notepad</span>
        </div>
        <div className="desktop-icon" onClick={() => openWindow("paint")}>
          <span style={{fontSize: '48px'}}>🎨</span>
          <span>Paint</span>
        </div>
        <div className="desktop-icon" onClick={() => openWindow("itchio")}>
          <FontAwesomeIcon icon={faGlobe} size="3x" style={{color: '#ff5c5c'}} />
          <span>Itch.io Games</span>
        </div>
      </div>

      {/* Profile Window */}
      {windows.profile.open && !windows.profile.minimized && (
  <div
    className={`window ${
      activeWindow === "profile" ? "active-window" : ""
    }`}
    style={{
      width: windows.profile.fullscreen ? "95vw" : "580px",
      height: windows.profile.fullscreen ? "90vh" : "480px",
      zIndex: windows.profile.zIndex,
      left: windows.profile.fullscreen ? 0 : windows.profile.pos.x,
      top: windows.profile.fullscreen ? 0 : windows.profile.pos.y,
    }}
    onMouseDown={(e) => handleMouseDown(e, "profile")}
  >
    <div className="window-title-bar">
      <span>Rafi Adnan - Profile</span>
      <div className="window-controls">
        <button onClick={() => closeWindow("profile")}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button onClick={() => toggleMinimize("profile")}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button onClick={() => toggleFullscreen("profile")}>
          <FontAwesomeIcon
            icon={
              windows.profile.fullscreen
                ? faWindowRestore
                : faWindowMaximize
            }
          />
        </button>
      </div>
    </div>
    <div className="window-content" style={{ padding: 0 }}>
      <div className="profile-header">
        <div className="profile-header-bg" />
        <div className="profile-header-content">
          <div className="profile-avatar-frame">
            <img
              src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5807b862bf1790ac6b1f82ab75d1be73-1743593947676/af264c2c-8fbc-4003-a5b3-d0b46292c8f8.png"
              alt="Profile"
              className="profile-avatar"
            />
          </div>
          <div className="profile-header-info">
            <h2 className="profile-name">Rafi Adnan</h2>
            <p className="profile-title">Full-stack Developer & Game Developer</p>
            <div className="profile-badges">
              <span className="profile-badge">📍 Indonesia</span>
              <span className="profile-badge">🏆 3rd Place Competition</span>
              <span className="profile-badge">✅ BNSP Certified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="xp-tabs">
        <button
          className={`xp-tab ${profileTab === "about" ? "active" : ""}`}
          onClick={() => setProfileTab("about")}
        >
          📋 About
        </button>
        <button
          className={`xp-tab ${profileTab === "skills" ? "active" : ""}`}
          onClick={() => setProfileTab("skills")}
        >
          🛠 Skills
        </button>
        <button
          className={`xp-tab ${profileTab === "contact" ? "active" : ""}`}
          onClick={() => setProfileTab("contact")}
        >
          📫 Contact
        </button>
        <button
          className={`xp-tab ${profileTab === "music" ? "active" : ""}`}
          onClick={() => setProfileTab("music")}
        >
          🎵 Music
        </button>
      </div>

      <div className="profile-tab-content">
        {profileTab === "about" && (
          <div className="profile-section" style={{ padding: '15px' }}>
            <fieldset className="xp-fieldset">
              <legend>About Me</legend>
              <p style={{ lineHeight: '1.6', fontSize: '12px' }}>
                I&apos;m a passionate and versatile developer based in Indonesia,
                dedicated to building immersive digital experiences across web
                and game development. My skillset bridges frontend and backend
                systems, real-time interaction, and creative design. Whether
                it&apos;s a sleek full-stack application or a high-energy multiplayer
                game in Unity, I bring ideas to life with clean code, smart logic,
                and memorable user experiences.
              </p>
            </fieldset>

            <fieldset className="xp-fieldset">
              <legend>Education & Achievements</legend>
              <ul className="xp-list">
                <li><strong>Certification:</strong> BNSP Web Developer</li>
                <li><strong>Competition:</strong> 3rd Place - Portfolio Competition 2025</li>
                <li><strong>Internship:</strong> Web Developer at YBM PLN</li>
              </ul>
            </fieldset>

          </div>
        )}

        {profileTab === "skills" && (
          <div className="profile-section" style={{ padding: '15px' }}>
            <fieldset className="xp-fieldset">
              <legend>Web Development</legend>
              <div className="skill-bar">
                <span className="skill-label">React / Next.js</span>
                <div className="skill-track"><div className="skill-fill" style={{width: '90%'}} /></div>
              </div>
              <div className="skill-bar">
                <span className="skill-label">Laravel / PHP</span>
                <div className="skill-track"><div className="skill-fill" style={{width: '85%'}} /></div>
              </div>
              <div className="skill-bar">
                <span className="skill-label">Tailwind CSS</span>
                <div className="skill-track"><div className="skill-fill" style={{width: '92%'}} /></div>
              </div>
              <div className="skill-bar">
                <span className="skill-label">MySQL / Databases</span>
                <div className="skill-track"><div className="skill-fill" style={{width: '80%'}} /></div>
              </div>
              <div className="skill-bar">
                <span className="skill-label">Node.js</span>
                <div className="skill-track"><div className="skill-fill" style={{width: '75%'}} /></div>
              </div>
            </fieldset>

            <fieldset className="xp-fieldset">
              <legend>Game Development</legend>
              <div className="skill-bar">
                <span className="skill-label">Unity / C#</span>
                <div className="skill-track"><div className="skill-fill" style={{width: '88%'}} /></div>
              </div>
              <div className="skill-bar">
                <span className="skill-label">Shader Graph</span>
                <div className="skill-track"><div className="skill-fill" style={{width: '70%'}} /></div>
              </div>
              <div className="skill-bar">
                <span className="skill-label">NavMesh AI</span>
                <div className="skill-track"><div className="skill-fill" style={{width: '82%'}} /></div>
              </div>
              <div className="skill-bar">
                <span className="skill-label">Procedural Generation</span>
                <div className="skill-track"><div className="skill-fill" style={{width: '75%'}} /></div>
              </div>
            </fieldset>

            <fieldset className="xp-fieldset">
              <legend>Tools & Others</legend>
              <div className="skill-bar">
                <span className="skill-label">Git / GitHub</span>
                <div className="skill-track"><div className="skill-fill" style={{width: '90%'}} /></div>
              </div>
              <div className="skill-bar">
                <span className="skill-label">Figma</span>
                <div className="skill-track"><div className="skill-fill" style={{width: '65%'}} /></div>
              </div>
              <div className="skill-bar">
                <span className="skill-label">Vercel / Netlify</span>
                <div className="skill-track"><div className="skill-fill" style={{width: '85%'}} /></div>
              </div>
            </fieldset>
          </div>
        )}

        {profileTab === "contact" && (
          <div className="profile-section" style={{ padding: '15px' }}>
            <fieldset className="xp-fieldset">
              <legend>Get In Touch</legend>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:rafiadnan@example.com" className="contact-link">rafiadnan@example.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <a href="https://rafiadnan.my.id" target="_blank" rel="noopener noreferrer" className="contact-link">rafiadnan.my.id</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🐙</span>
                <a href="https://github.com/Rafiadnan0666" target="_blank" rel="noopener noreferrer" className="contact-link">github.com/Rafiadnan0666</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🎮</span>
                <a href="https://gregrsea-975.itch.io" target="_blank" rel="noopener noreferrer" className="contact-link">gregrsea-975.itch.io</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">☕</span>
                <a href="https://ko-fi.com/Q5Q81DS5SA" target="_blank" rel="noopener noreferrer" className="contact-link">Buy me a coffee</a>
              </div>
            </fieldset>

            <fieldset className="xp-fieldset">
              <legend>Support</legend>
              <div className="kofi-section" style={{ marginTop: '10px' }}>
                <a
                  href="https://ko-fi.com/Q5Q81DS5SA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    height="36"
                    style={{ border: 0, height: 36 }}
                    src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
                    alt="Buy Me a Coffee at ko-fi.com"
                  />
                </a>
              </div>
            </fieldset>
          </div>
        )}

        {profileTab === "music" && (
          <div className="profile-section" style={{ padding: '15px' }}>
            <fieldset className="xp-fieldset">
              <legend>My Music</legend>
              <p style={{ fontSize: '12px', lineHeight: '1.6' }}>
                I also produce electronic and dubstep music! Check out my track &quot;Joy Theme&quot; on Spotify.
              </p>
            </fieldset>
            <div className="profile-spotify">
              <iframe
                src="https://open.spotify.com/embed/artist/2PYunjmmYVDbsSudTPSwyv?utm_source=generator"
                width="100%"
                height="200"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="spotify-embed"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}


      {/* Projects Window */}
      {windows.projects.open && !windows.projects.minimized && (
        <div
          className={`window ${
            activeWindow === "projects" ? "active-window" : ""
          }`}
          style={{
            width: windows.projects.fullscreen ? "95vw" : "600px",
            height: windows.projects.fullscreen ? "90vh" : "500px",
            zIndex: windows.projects.zIndex,
            left: windows.projects.fullscreen ? 0 : windows.projects.pos.x,
            top: windows.projects.fullscreen ? 0 : windows.projects.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "projects")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("projects")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("projects")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("projects")}>
                <FontAwesomeIcon
                  icon={
                    windows.projects.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>Projects</span>
          </div>
          <div className="window-content" style={{ display: 'flex', height: 'calc(100% - 30px)' }}>
            <div className="explorer-sidebar">
              <h3>File & Folder Tasks</h3>
              <div className="file-item" onClick={() => window.open('https://github.com/Rafiadnan0666', '_blank')}>
                <span className="file-icon">📁</span>
                <span>My GitHub</span>
              </div>
              <div className="file-item" onClick={() => window.open('https://rafiadnan.my.id', '_blank')}>
                <span className="file-icon">🌐</span>
                <span>Website</span>
              </div>
              <div className="file-item" onClick={() => setStartMenuOpen(true)}>
                <span className="file-icon">📂</span>
                <span>Other Places</span>
              </div>
              <h3 style={{ marginTop: '20px' }}>Details</h3>
              <p style={{ fontSize: '11px', lineHeight: '1.4' }}>
                Rafi Adnan<br/>
                Web & Game Developer<br/>
                <br/>
                Skills: React, Laravel, Unity<br/>
                Location: Indonesia<br/>
                <br/>
                {projects.length} Projects
              </p>
            </div>
            <div className="explorer-content">
              <div className="xp-menubar">
                <div className="xp-menu-item">File</div>
                <div className="xp-menu-item">Edit</div>
                <div className="xp-menu-item">View</div>
                <div className="xp-menu-item">Favorites</div>
                <div className="xp-menu-item">Tools</div>
                <div className="xp-menu-item">Help</div>
              </div>
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <div key={index} className="project-card">
                    <div className="project-image-container">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <Link
                        href={project.link}
                        target="_blank"
                        className="project-link"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Games Library Window */}
      {windows.gamesLibrary.open && !windows.gamesLibrary.minimized && (
        <div
          className={`window ${
            activeWindow === "gamesLibrary" ? "active-window" : ""
          }`}
          style={{
            width: windows.gamesLibrary.fullscreen ? "95vw" : "500px",
            height: windows.gamesLibrary.fullscreen ? "90vh" : "400px",
            zIndex: windows.gamesLibrary.zIndex,
            left: windows.gamesLibrary.fullscreen
              ? 0
              : windows.gamesLibrary.pos.x,
            top: windows.gamesLibrary.fullscreen
              ? 0
              : windows.gamesLibrary.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "gamesLibrary")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("gamesLibrary")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("gamesLibrary")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("gamesLibrary")}>
                <FontAwesomeIcon
                  icon={
                    windows.gamesLibrary.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>Games Library</span>
          </div>
          <div className="window-content">
            <div className="games-library">
              <h2>Windows XP Classic Games</h2>
              <div className="games-grid">
                {games.map((game, index) => (
                  <div key={index} className="game-card" onClick={game.action}>
                    <FontAwesomeIcon icon={game.icon} size="3x" />
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Target Practice Game Window */}
      {windows.targetPractice.open && !windows.targetPractice.minimized && (
        <div
          className={`window ${
            activeWindow === "targetPractice" ? "active-window" : ""
          }`}
          style={{
            width: windows.targetPractice.fullscreen ? "95vw" : "400px",
            height: windows.targetPractice.fullscreen ? "90vh" : "400px",
            zIndex: windows.targetPractice.zIndex,
            left: windows.targetPractice.fullscreen
              ? 0
              : windows.targetPractice.pos.x,
            top: windows.targetPractice.fullscreen
              ? 0
              : windows.targetPractice.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "targetPractice")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("targetPractice")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("targetPractice")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("targetPractice")}>
                <FontAwesomeIcon
                  icon={
                    windows.targetPractice.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>Target Practice - Score: {gameScore}</span>
          </div>
          <div className="window-content game-container" onClick={hitTarget}>
            <div
              className="game-target"
              style={{
                left: `${gamePosition.x}%`,
                top: `${gamePosition.y}%`,
              }}
            ></div>
            <div className="game-instructions">
              Click the target to score points!
            </div>
          </div>
        </div>
      )}

      {/* Minesweeper Game Window */}
      {windows.minesweeper.open && !windows.minesweeper.minimized && (
        <div
          className={`window ${
            activeWindow === "minesweeper" ? "active-window" : ""
          }`}
          style={{
            width: windows.minesweeper.fullscreen ? "95vw" : "500px",
            height: windows.minesweeper.fullscreen ? "90vh" : "500px",
            zIndex: windows.minesweeper.zIndex,
            left: windows.minesweeper.fullscreen
              ? 0
              : windows.minesweeper.pos.x,
            top: windows.minesweeper.fullscreen ? 0 : windows.minesweeper.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "minesweeper")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("minesweeper")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("minesweeper")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("minesweeper")}>
                <FontAwesomeIcon
                  icon={
                    windows.minesweeper.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>
              Minesweeper{" "}
              {gameWon ? "🎉 You Won!" : gameLost ? "💥 Game Over!" : ""}
            </span>
          </div>
          <div className="window-content">
            <div className="minesweeper-container">
              <div className="minesweeper-controls">
                <button onClick={initializeMinesweeper}>New Game</button>
                <span>Mines: 15</span>
              </div>
              <div className="minesweeper-grid">
                {minesweeperGrid.map((row, y) => (
                  <div key={y} className="minesweeper-row">
                    {row.map((cell, x) => (
                      <div
                        key={`${x}-${y}`}
                        className={`minesweeper-cell ${
                          revealedCells.includes(`${x},${y}`) ? "revealed" : ""
                        } ${
                          flaggedCells.includes(`${x},${y}`) ? "flagged" : ""
                        }`}
                        onClick={() => revealCell(x, y)}
                        onContextMenu={(e) => toggleFlag(x, y, e)}
                      >
                        {revealedCells.includes(`${x},${y}`)
                          ? cell === "M"
                            ? "💣"
                            : cell > 0
                            ? cell
                            : null
                          : flaggedCells.includes(`${x},${y}`)
                          ? "🚩"
                          : null}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {gameLost && (
                <div className="game-over-message">
                  <p>You hit a mine! Game over.</p>
                  <button onClick={initializeMinesweeper}>Play Again</button>
                </div>
              )}
              {gameWon && (
                <div className="game-won-message">
                  <p>Congratulations! You cleared all mines!</p>
                  <button onClick={initializeMinesweeper}>Play Again</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Snake Game Window */}
      {windows.snake.open && !windows.snake.minimized && (
        <div
          className={`window ${
            activeWindow === "snake" ? "active-window" : ""
          }`}
          style={{
            width: windows.snake.fullscreen ? "95vw" : "500px",
            height: windows.snake.fullscreen ? "90vh" : "500px",
            zIndex: windows.snake.zIndex,
            left: windows.snake.fullscreen ? 0 : windows.snake.pos.x,
            top: windows.snake.fullscreen ? 0 : windows.snake.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "snake")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("snake")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("snake")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("snake")}>
                <FontAwesomeIcon
                  icon={
                    windows.snake.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>
              Snake - Score: {gameScore} {snakeGameOver ? "💀 Game Over!" : ""}
            </span>
          </div>
          <div className="window-content">
            <div className="snake-game-container">
              {snake.map((segment, index) => (
                <div
                  key={index}
                  className={`snake-segment ${index === 0 ? "snake-head" : ""}`}
                  style={{
                    left: `${segment.x * 5}%`,
                    top: `${segment.y * 5}%`,
                  }}
                ></div>
              ))}
              <div
                className="snake-food"
                style={{
                  left: `${food.x * 5}%`,
                  top: `${food.y * 5}%`,
                }}
              ></div>
              {snakeGameOver && (
                <div className="snake-game-over">
                  <h2>Game Over!</h2>
                  <p>Final Score: {gameScore}</p>
                  <button onClick={initializeSnake}>Play Again</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tetris Game Window */}
      {windows.tetris.open && !windows.tetris.minimized && (
        <div
          className={`window ${
            activeWindow === "tetris" ? "active-window" : ""
          }`}
          style={{
            width: windows.tetris.fullscreen ? "95vw" : "400px",
            height: windows.tetris.fullscreen ? "90vh" : "600px",
            zIndex: windows.tetris.zIndex,
            left: windows.tetris.fullscreen ? 0 : windows.tetris.pos.x,
            top: windows.tetris.fullscreen ? 0 : windows.tetris.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "tetris")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("tetris")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("tetris")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("tetris")}>
                <FontAwesomeIcon
                  icon={
                    windows.tetris.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>
              Tetris - Score: {tetrisScore}{" "}
              {tetrisGameOver ? "💀 Game Over!" : ""}
            </span>
          </div>
          <div className="window-content">
            <div className="tetris-container">
              <div className="tetris-grid">
                {tetrisGrid.map((row, y) => (
                  <div key={y} className="tetris-row">
                    {row.map((cell, x) => {
                      // Current piece cells
                      let isCurrentPiece = false;
                      if (currentPiece) {
                        for (let py = 0; py < currentPiece.shape.length; py++) {
                          for (
                            let px = 0;
                            px < currentPiece.shape[py].length;
                            px++
                          ) {
                            if (
                              currentPiece.shape[py][px] !== 0 &&
                              y === currentPiece.pos.y + py &&
                              x === currentPiece.pos.x + px
                            ) {
                              isCurrentPiece = true;
                            }
                          }
                        }
                      }

                      return (
                        <div
                          key={x}
                          className={`tetris-cell ${
                            cell !== 0 || isCurrentPiece ? "filled" : ""
                          }`}
                        ></div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="tetris-controls">
                <p>Controls: Arrow keys to move, Up to rotate</p>
                {tetrisGameOver && (
                  <button onClick={initializeTetris}>Play Again</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {windows.chess.open && !windows.chess.minimized && (
        <div
          className={`window ${
            activeWindow === "chess" ? "active-window" : ""
          }`}
          style={{
            width: windows.chess.fullscreen ? "95vw" : "500px",
            height: windows.chess.fullscreen ? "90vh" : "500px",
            zIndex: windows.chess.zIndex,
            left: windows.chess.fullscreen ? 0 : windows.chess.pos.x,
            top: windows.chess.fullscreen ? 0 : windows.chess.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "chess")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("chess")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("chess")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("chess")}>
                <FontAwesomeIcon
                  icon={
                    windows.chess.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>Chess</span>
          </div>
          <div className="window-content">
            <div className="chess-container">
              <div className="chess-board">
                {chessBoard.map((row, y) => (
                  <div key={y} className="chess-row">
                    {row.map((piece, x) => (
                      <div
                        key={x}
                        className={`chess-cell ${
                          (x + y) % 2 === 0 ? "light" : "dark"
                        } ${
                          selectedChessPiece?.row === y &&
                          selectedChessPiece?.col === x
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => handleChessClick(y, x)}
                      >
                        {piece && (
                          <span className={`chess-piece ${piece.color}`}>
                            {getChessSymbol(piece.type, piece.color)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="chess-controls">
                <button onClick={initializeChess}>New Game</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calculator Window */}
      {windows.calculator.open && !windows.calculator.minimized && (
        <div
          className={`window ${activeWindow === "calculator" ? "active-window" : ""}`}
          style={{
            width: windows.calculator.fullscreen ? "95vw" : "280px",
            height: windows.calculator.fullscreen ? "90vh" : "350px",
            zIndex: windows.calculator.zIndex,
            left: windows.calculator.fullscreen ? 0 : windows.calculator.pos.x,
            top: windows.calculator.fullscreen ? 0 : windows.calculator.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "calculator")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("calculator")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("calculator")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("calculator")}>
                <FontAwesomeIcon
                  icon={
                    windows.calculator.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>Calculator</span>
          </div>
          <div className="window-content">
            <div className="calculator-container">
              <div className="calc-display">{calcDisplay}</div>
              <div className="calc-buttons">
                {["C", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", "=", "+"].map((btn, index) => (
                  <button
                    key={index}
                    className={`xp-button calc-btn ${btn === "=" ? "calc-equals" : ""}`}
                    onClick={() => handleCalcInput(btn)}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notepad Window */}
      {windows.notepad.open && !windows.notepad.minimized && (
        <div
          className={`window ${activeWindow === "notepad" ? "active-window" : ""}`}
          style={{
            width: windows.notepad.fullscreen ? "95vw" : "500px",
            height: windows.notepad.fullscreen ? "90vh" : "400px",
            zIndex: windows.notepad.zIndex,
            left: windows.notepad.fullscreen ? 0 : windows.notepad.pos.x,
            top: windows.notepad.fullscreen ? 0 : windows.notepad.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "notepad")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("notepad")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("notepad")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("notepad")}>
                <FontAwesomeIcon
                  icon={
                    windows.notepad.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>Notepad</span>
          </div>
          <div className="window-content">
            <div className="notepad-container">
              <textarea
                className="notepad-textarea"
                value={notepadContent}
                onChange={(e) => setNotepadContent(e.target.value)}
                placeholder="Start typing..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Paint Window */}
      {windows.paint.open && !windows.paint.minimized && (
        <div
          className={`window ${activeWindow === "paint" ? "active-window" : ""}`}
          style={{
            width: windows.paint.fullscreen ? "95vw" : "600px",
            height: windows.paint.fullscreen ? "90vh" : "500px",
            zIndex: windows.paint.zIndex,
            left: windows.paint.fullscreen ? 0 : windows.paint.pos.x,
            top: windows.paint.fullscreen ? 0 : windows.paint.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "paint")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("paint")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("paint")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("paint")}>
                <FontAwesomeIcon
                  icon={
                    windows.paint.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>Paint</span>
          </div>
          <div className="window-content">
            <div className="paint-container">
              <div className="paint-toolbar">
                <div className="color-picker">
                  <input
                    type="color"
                    value={paintColor}
                    onChange={(e) => setPaintColor(e.target.value)}
                  />
                  <button className="xp-button" onClick={() => setPaintColor("#000000")}>Clear</button>
                </div>
              </div>
              <canvas
                ref={canvasRef}
                width={550}
                height={400}
                className="paint-canvas"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Window */}
      {windows.aiChat.open && !windows.aiChat.minimized && (
        <div
          className={`window ${
            activeWindow === "aiChat" ? "active-window" : ""
          }`}
          style={{
            width: windows.aiChat.fullscreen ? "95vw" : "400px",
            height: windows.aiChat.fullscreen ? "90vh" : "500px",
            zIndex: windows.aiChat.zIndex,
            left: windows.aiChat.fullscreen ? 0 : windows.aiChat.pos.x,
            top: windows.aiChat.fullscreen ? 0 : windows.aiChat.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "aiChat")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("aiChat")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("aiChat")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("aiChat")}>
                <FontAwesomeIcon
                  icon={
                    windows.aiChat.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>AI Assistant</span>
          </div>
          <div className="window-content">
            <div className="ai-chat-container">
              <div className="ai-header">
                <FontAwesomeIcon icon={faRobot} size="2x" />
                <h3>Portfolio AI Assistant</h3>
              </div>
              <div className="ai-messages">
                {aiResponse && (
                  <div className="ai-message">
                    <p>{aiResponse}</p>
                  </div>
                )}
                {isThinking && (
                  <div className="ai-thinking">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleAiSubmit} className="ai-input-form">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Ask me about Rafis skills or projects..."
                />
                <button type="submit" disabled={isThinking}>
                  {isThinking ? "Thinking..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Spotify Window */}
      {windows.spotify.open && !windows.spotify.minimized && (
  <div
    className={`window ${
      activeWindow === "spotify" ? "active-window" : ""
    }`}
    style={{
      width: windows.spotify.fullscreen ? "95vw" : "400px",
      height: windows.spotify.fullscreen ? "90vh" : "500px",
      zIndex: windows.spotify.zIndex,
      left: windows.spotify.fullscreen ? 0 : windows.spotify.pos.x,
      top: windows.spotify.fullscreen ? 0 : windows.spotify.pos.y,
    }}
    onMouseDown={(e) => handleMouseDown(e, "spotify")}
  >
    <div className="window-title-bar">
      <div className="window-controls">
        <button onClick={() => closeWindow("spotify")}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button onClick={() => toggleMinimize("spotify")}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button onClick={() => toggleFullscreen("spotify")}>
          <FontAwesomeIcon
            icon={
              windows.spotify.fullscreen
                ? faWindowRestore
                : faWindowMaximize
            }
          />
        </button>
      </div>
      <span>My Music</span>
    </div>
    <div className="window-content">
      <iframe
        src="https://open.spotify.com/embed/artist/2PYunjmmYVDbsSudTPSwyv?utm_source=generator"
        width="100%"
        height="380"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="spotify-embed"
      ></iframe>
      <div className="spotify-info">
        <h3>Rafi Adnan on Spotify</h3>
        <p>
      
        </p>
      </div>
    </div>
  </div>
)}


      {/* Itch.io Games Window */}
      {windows.itchio.open && !windows.itchio.minimized && (
        <div
          className={`window ${activeWindow === "itchio" ? "active-window" : ""}`}
          style={{
            width: windows.itchio.fullscreen ? "95vw" : "700px",
            height: windows.itchio.fullscreen ? "90vh" : "500px",
            zIndex: windows.itchio.zIndex,
            left: windows.itchio.fullscreen ? 0 : windows.itchio.pos.x,
            top: windows.itchio.fullscreen ? 0 : windows.itchio.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "itchio")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("itchio")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("itchio")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("itchio")}>
                <FontAwesomeIcon icon={windows.itchio.fullscreen ? faWindowRestore : faWindowMaximize} />
              </button>
            </div>
            <span>Itch.io Game Library - Gregrsea 975</span>
          </div>
          <div className="window-content">
            <div className="itchio-header">
              <span className="itchio-logo">🎮</span>
              <div className="itchio-header-text">
                <h2>Gregrsea 975 - Game Dev Studio</h2>
                <p>Indie games built with Unity, sweat, and questionable life choices.</p>
                <a href="https://gregrsea-975.itch.io" target="_blank" rel="noopener noreferrer" className="itchio-profile-link">
                  View Full Profile on Itch.io
                </a>
              </div>
            </div>
            <div className="itchio-games-grid">
              {itchioGames.map((game, index) => (
                <div key={index} className="itchio-game-card">
                  <div className="itchio-game-image">
                    <img src={game.image} alt={game.title} />
                    <span className="itchio-game-genre">{game.genre}</span>
                  </div>
                  <div className="itchio-game-info">
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                    <a href={game.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      Play / Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="taskbar" onClick={updateActivity}>
        <div
          className="start-button"
          onClick={(e) => {
            e.stopPropagation();
            setStartMenuOpen(!startMenuOpen);
          }}
        >
          <span>Start</span>
        </div>
        
        {/* Quick Launch */}
        <div className="quick-launch">
          <div className="quick-launch-item" onClick={() => openWindow('profile')} title="Show Desktop">
            🏠
          </div>
          <div className="quick-launch-item" onClick={() => openWindow('projects')} title="Internet Explorer">
            🌐
          </div>
          <div className="quick-launch-item" onClick={() => openWindow('gamesLibrary')} title="Games">
            🎮
          </div>
          <div className="quick-launch-item" onClick={() => openWindow('itchio')} title="Itch.io Games">
            🕹️
          </div>
        </div>
        {startMenuOpen && (
          <div className="start-menu active" onClick={(e) => e.stopPropagation()}>
            <div className="start-header">
              <img
                src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5807b862bf1790ac6b1f82ab75d1be73-1743593947676/af264c2c-8fbc-4003-a5b3-d0b46292c8f8.png"
                alt="Profile"
                width="48"
                height="48"
              />
              <div>
                <div className="start-name">Rafi Adnan</div>
                <div className="start-skills">Web & Game Developer</div>
              </div>
            </div>
            <div className="start-menu-items">
              <div className="start-menu-item" onClick={() => { openWindow('profile'); setStartMenuOpen(false); }}>
                <span>👤</span>
                <span>My Profile</span>
              </div>
              <div className="start-menu-item" onClick={() => { openWindow('projects'); setStartMenuOpen(false); }}>
                <span>📁</span>
                <span>My Projects</span>
              </div>
              <div className="start-menu-item" onClick={() => { openWindow('documents'); setStartMenuOpen(false); }}>
                <span>📄</span>
                <span>My Documents</span>
              </div>
              <div className="start-menu-item" onClick={() => { openWindow('pictures'); setStartMenuOpen(false); }}>
                <span>🖼️</span>
                <span>My Pictures</span>
              </div>
              <div className="start-menu-item" onClick={() => { openWindow('music'); setStartMenuOpen(false); }}>
                <span>🎵</span>
                <span>My Music</span>
              </div>
              <div className="start-menu-divider"></div>
              <div className="start-menu-item" onClick={() => { openWindow('gamesLibrary'); setStartMenuOpen(false); }}>
                <span>🎮</span>
                <span>Games</span>
              </div>
              <div className="start-menu-item" onClick={() => { openWindow('itchio'); setStartMenuOpen(false); }}>
                <span>🕹️</span>
                <span>Itch.io Games</span>
              </div>
              <div className="start-menu-item" onClick={() => { openWindow('calculator'); setStartMenuOpen(false); }}>
                <span>🧮</span>
                <span>Calculator</span>
              </div>
              <div className="start-menu-item" onClick={() => { openWindow('notepad'); setStartMenuOpen(false); }}>
                <span>📝</span>
                <span>Notepad</span>
              </div>
              <div className="start-menu-divider"></div>
              <div className="start-menu-item" onClick={() => { 
                setErrorMessage('This is a simulated Windows XP error message!');
                setShowErrorDialog(true);
                setStartMenuOpen(false);
                playSystemSound('error');
              }}>
                <span>⚠️</span>
                <span>Simulate Error</span>
              </div>
              <div className="start-menu-item" onClick={() => { setScreensaverActive(true); setStartMenuOpen(false); }}>
                <span>🖥️</span>
                <span>Screensaver</span>
              </div>
              <div className="start-menu-divider"></div>
              <div className="start-menu-item" onClick={() => { setStartMenuOpen(false); }}>
                <span>❌</span>
                <span>Log Off</span>
              </div>
              <div className="start-menu-item" onClick={() => { 
                setStartMenuOpen(false);
                setBootScreen(true);
                setTimeout(() => {
                  setBootScreen(false);
                }, 3000);
              }}>
                <span>🔄</span>
                <span>Restart</span>
              </div>
              <div className="start-menu-item" onClick={() => { 
                setStartMenuOpen(false);
                window.close();
              }}>
                <span>💤</span>
                <span>Shut Down</span>
              </div>
            </div>
          </div>
        )}
        <div className="taskbar-items">
          {Object.entries(windows).map(
            ([name, state]) =>
              state.open && (
                <div
                  key={name}
                  className={`taskbar-item ${
                    activeWindow === name ? "active" : ""
                  }`}
                  onClick={() => {
                    if (state.minimized) {
                      toggleMinimize(name);
                    }
                    bringToFront(name);
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      name === "profile"
                        ? faUser
                        : name === "projects"
                        ? faFolder
                        : name === "spotify"
                        ? faMusic
                        : name === "gamesLibrary" ||
                          name === "minesweeper" ||
                          name === "snake" ||
                          name === "tetris" ||
                          name === "targetPractice"
                        ? faGamepad
                        : name === "chess"
                        ? faChess
                        : name === "aiChat"
                        ? faRobot
                        : name === "itchio"
                        ? faGlobe
                        : faGlobe
                    }
                  />
                  <span>
                    {name === "minesweeper"
                      ? "Minesweeper"
                      : name === "snake"
                      ? "Snake"
                      : name === "tetris"
                      ? "Tetris"
                      : name === "chess"
                      ? "Chess"
                      : name === "targetPractice"
                      ? "Target Practice"
                      : name === "itchio"
                      ? "Itch.io"
                      : name === "gamesLibrary"
                      ? "Games"
                      : name.charAt(0).toUpperCase() + name.slice(1)}
                  </span>
                </div>
              )
          )}
        </div>
        {/* System Tray */}
        <div className="system-tray">
          <div className="tray-icon" title="Volume">
            🔊
          </div>
          <div className="tray-icon" title="Network">
            🌐
          </div>
          <div className="tray-icon" title="Security">
            🛡️
          </div>
          <div className="clock">
            {time.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortXFolio;


