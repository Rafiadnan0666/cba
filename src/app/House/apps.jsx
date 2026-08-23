"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { SmileyFace, MetaIcon } from "./icons";
import { PALETTE } from "./data";
import { playSound } from "./sounds";

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

function makeMsGrid() {
  const grid = Array.from({ length: 10 }, () => Array(10).fill(0));
  let placed = 0;
  while (placed < 15) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (grid[y][x] !== "M") {
      grid[y][x] = "M";
      placed++;
    }
  }
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      if (grid[y][x] === "M") continue;
      let n = 0;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const yy = y + dy;
          const xx = x + dx;
          if (yy >= 0 && yy < 10 && xx >= 0 && xx < 10 && grid[yy][xx] === "M") n++;
        }
      grid[y][x] = n;
    }
  }
  return grid;
}

export function MinesweeperBody({ muted }) {
  const [grid, setGrid] = useState(() => makeMsGrid());
  const [revealed, setRevealed] = useState([]);
  const [flags, setFlags] = useState([]);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!started || won || lost) return;
    const iv = setInterval(() => setTime((t) => Math.min(t + 1, 999)), 1000);
    return () => clearInterval(iv);
  }, [started, won, lost]);

  const reset = () => {
    setGrid(makeMsGrid());
    setRevealed([]);
    setFlags([]);
    setWon(false);
    setLost(false);
    setStarted(false);
    setTime(0);
  };

  const flood = (revealedSet, x, y) => {
    const stack = [[x, y]];
    const out = new Set(revealedSet);
    while (stack.length) {
      const [cx, cy] = stack.pop();
      const key = `${cx},${cy}`;
      if (cx < 0 || cx >= 10 || cy < 0 || cy >= 10 || out.has(key)) continue;
      out.add(key);
      if (grid[cy][cx] === 0) {
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) stack.push([cx + dx, cy + dy]);
      }
    }
    return [...out];
  };

  const reveal = (x, y) => {
    if (won || lost || revealed.includes(`${x},${y}`) || flags.includes(`${x},${y}`)) return;
    if (!started) setStarted(true);
    if (grid[y][x] === "M") {
      setLost(true);
      const all = [];
      for (let yy = 0; yy < 10; yy++) for (let xx = 0; xx < 10; xx++) if (grid[yy][xx] === "M") all.push(`${xx},${yy}`);
      setRevealed(all);
      playSound("error", muted);
      return;
    }
    const next = flood(revealed, x, y);
    setRevealed(next);
    let safe = 0;
    for (let yy = 0; yy < 10; yy++)
      for (let xx = 0; xx < 10; xx++) if (grid[yy][xx] !== "M" && !next.includes(`${xx},${yy}`)) safe++;
    if (safe === 0) {
      setWon(true);
      playSound("ding", muted);
    }
  };

  const flag = (x, y, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (revealed.includes(`${x},${y}`) || won || lost) return;
    playSound("menu", muted);
    setFlags((prev) => (prev.includes(`${x},${y}`) ? prev.filter((c) => c !== `${x},${y}`) : [...prev, `${x},${y}`]));
  };

  return (
    <div className="window-content minesweeper-wrap xp-scroll" style={{ position: "relative", background: "#c0c0c0" }}>
      <div className="ms-top-panel">
        <div className="ms-led">{String(Math.max(0, 15 - flags.length)).padStart(3, "0")}</div>
        <button className="ms-face-btn" onClick={reset} title="New game">
          <SmileyFace dead={lost} cool={won} />
        </button>
        <div className="ms-led">{String(time).padStart(3, "0")}</div>
      </div>
      <div className="ms-grid">
        {grid.map((row, y) =>
          row.map((cell, x) => {
            const key = `${x},${y}`;
            const rev = revealed.includes(key);
            return (
              <div
                key={key}
                className={`minesweeper-cell ${rev ? "revealed" : ""}`}
                onClick={() => reveal(x, y)}
                onContextMenu={(e) => flag(x, y, e)}
              >
                {rev ? (
                  cell === "M" ? (
                    <MineSvg s={16} />
                  ) : cell > 0 ? (
                    <span className={`ms-num-${cell}`}>{cell}</span>
                  ) : null
                ) : flags.includes(key) ? (
                  <FlagRedSvg s={14} />
                ) : null}
              </div>
            );
          })
        )}
      </div>
      <div className="ms-hintbar">Left-click reveals · Right-click flags</div>
      {(won || lost) && (
        <div className="snake-game-over">
          <SmileyFace dead={lost} cool={won} s={40} />
          <h2 style={{ fontSize: 15 }}>{won ? "You cleared the field!" : "Boom. Game over."}</h2>
          <button className="xp-button" onClick={reset}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export function SnakeBody({ snake, food, over, score, length, onReset }) {
  return (
    <div className="window-content" style={{ background: "#ece9d8" }}>
      <div className="snake-stage">
        {snake.map((seg, i) => (
          <div
            key={i}
            className={`snake-segment ${i === 0 ? "snake-head" : ""}`}
            style={{ left: `${seg.x * 5}%`, top: `${seg.y * 5}%` }}
          />
        ))}
        <div className="snake-food" style={{ left: `${food.x * 5}%`, top: `${food.y * 5}%` }} />
        {over && (
          <div className="snake-game-over">
            <h2 style={{ fontSize: 16 }}>Game Over!</h2>
            <p>Final score: {score}</p>
            <button className="xp-button" onClick={onReset}>
              Play Again
            </button>
          </div>
        )}
      </div>
      <div className="snake-statusbar">
        Arrows to steer · Score: {score} · Length: {length}
      </div>
    </div>
  );
}

const TETROMINOES = [
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

export function TetrisBody({ grid, piece, score, lines, over, onReset }) {
  return (
    <div className="window-content tetris-wrap">
      <div className="tetris-board">
        {grid.map((row, y) => (
          <div key={y} className="tetris-row">
            {row.map((cell, x) => {
              let cur = false;
              if (piece && !over) {
                cur =
                  y >= piece.pos.y &&
                  x >= piece.pos.x &&
                  y - piece.pos.y < piece.shape.length &&
                  x - piece.pos.x < piece.shape[0].length &&
                  !!piece.shape[y - piece.pos.y][x - piece.pos.x];
              }
              return <div key={x} className={`tetris-cell ${cell || cur ? "filled" : ""}`} />;
            })}
          </div>
        ))}
      </div>
      <div className="tetris-side">
        <div className="ms-panel">
          <b>Score</b>
          {score}
        </div>
        <div className="ms-panel">
          <b>Lines</b>
          {lines}
        </div>
        <div className="ms-panel" style={{ fontSize: 10 }}>
          <b>Controls</b>
          Arrows move
          <br />
          Up rotates
        </div>
        {over && (
          <>
            <div style={{ color: "#c0392b", fontWeight: "bold", textAlign: "center" }}>Game Over</div>
            <button className="xp-button" onClick={onReset}>
              Play Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const PIECE_VALS = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };
const PST_PAWN = [0, 0, 0, 0, 0, 5, 10, 0, 5, 10, 10, -20, -20, 10, 10, 5, 5, -5, -10, 0, 0, 10, 10, 0, 0, 0, 20, 20, 20, 20, 20, 0, 5, -5, -10, 0, 0, -10, -5, 5, 5, 10, 10, -20, -20, -10, 10, 5, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const PST_KNIGHT = [-50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 5, 5, 0, -20, -40, -30, 5, 10, 15, 15, 10, 5, -30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 10, 15, 15, 10, 0, -30, -40, -20, 0, 0, 0, 0, -20, -40, -50, -40, -30, -30, -30, -30, -40, -50];
const PST_KING = [20, 30, 10, 0, 0, 10, 30, 20, 20, 20, 0, 0, 0, 0, 20, 20, -10, -20, -20, -20, -20, -20, -20, -10, -20, -30, -30, -40, -40, -30, -30, -20, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30];

function initChessBoard() {
  const b = Array.from({ length: 8 }, () => Array(8).fill(null));
  const order = ["r", "n", "b", "q", "k", "b", "n", "r"];
  for (let i = 0; i < 8; i++) {
    b[0][i] = { t: order[i], c: "black" };
    b[1][i] = { t: "p", c: "black" };
    b[6][i] = { t: "p", c: "white" };
    b[7][i] = { t: order[i], c: "white" };
  }
  return b;
}

const GLYPHS = { k: 9812, q: 9813, r: 9814, b: 9815, n: 9816, p: 9817 };
const glyphFor = (piece) => String.fromCharCode(GLYPHS[piece.t] + (piece.c === "black" ? 6 : 0));

function inside(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function pseudoMoves(b, color) {
  const moves = [];
  const push = (fr, fc, tr, tc, promo) => {
    if (!inside(tr, tc)) return;
    const target = b[tr][tc];
    if (target && target.c === color) return;
    moves.push({ fr, fc, tr, tc, cap: target ? target.t : null, promo });
  };
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = b[r][c];
      if (!p || p.c !== color) continue;
      if (p.t === "p") {
        const dir = color === "white" ? -1 : 1;
        const startRow = color === "white" ? 6 : 1;
        const lastRow = color === "white" ? 0 : 7;
        if (inside(r + dir, c) && !b[r + dir][c]) {
          push(r, c, r + dir, c, r + dir === lastRow ? "q" : null);
          if (r === startRow && !b[r + 2 * dir][c]) push(r, c, r + 2 * dir, c);
        }
        for (const dc of [-1, 1]) {
          const tr = r + dir;
          const tc = c + dc;
          if (inside(tr, tc) && b[tr][tc] && b[tr][tc].c !== color) {
            push(r, c, tr, tc, tr === lastRow ? "q" : null);
          }
        }
      } else if (p.t === "n") {
        for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) push(r, c, r + dr, c + dc);
      } else if (p.t === "k") {
        for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) if (dr || dc) push(r, c, r + dr, c + dc);
      } else {
        const dirs =
          p.t === "r"
            ? [[-1, 0], [1, 0], [0, -1], [0, 1]]
            : p.t === "b"
            ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
            : [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
        for (const [dr, dc] of dirs) {
          let tr = r + dr;
          let tc = c + dc;
          while (inside(tr, tc)) {
            if (b[tr][tc]) {
              if (b[tr][tc].c !== color) push(r, c, tr, tc);
              break;
            }
            push(r, c, tr, tc);
            tr += dr;
            tc += dc;
          }
        }
      }
    }
  }
  return moves;
}

function applyMove(b, m) {
  const nb = b.map((row) => [...row]);
  const piece = { ...nb[m.fr][m.fc] };
  nb[m.fr][m.fc] = null;
  if (m.promo) piece.t = m.promo;
  nb[m.tr][m.tc] = piece;
  return nb;
}

function findKing(b, color) {
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const p = b[r][c];
    if (p && p.t === "k" && p.c === color) return [r, c];
  }
  return null;
}

function isAttacked(b, r, c, byColor) {
  return pseudoMoves(b, byColor).some((m) => m.tr === r && m.tc === c);
}

function inCheck(b, color) {
  const k = findKing(b, color);
  return k ? isAttacked(b, k[0], k[1], color === "white" ? "black" : "white") : false;
}

function legalMoves(b, color) {
  return pseudoMoves(b, color).filter((m) => !inCheck(applyMove(b, m), color));
}

function pstFor(t) {
  if (t === "p") return PST_PAWN;
  if (t === "n") return PST_KNIGHT;
  if (t === "k") return PST_KING;
  return null;
}

function evaluate(b) {
  let score = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = b[r][c];
      if (!p) continue;
      const base = PIECE_VALS[p.t];
      const pst = pstFor(p.t);
      const idx = p.c === "white" ? r * 8 + c : (7 - r) * 8 + c;
      const bonus = pst ? pst[idx] : 0;
      score += p.c === "white" ? base + bonus : -(base + bonus);
    }
  }
  return score;
}

function negamax(b, color, depth, alpha, beta) {
  if (depth === 0) {
    return color === "white" ? evaluate(b) : -evaluate(b);
  }
  const moves = legalMoves(b, color);
  if (moves.length === 0) {
    return inCheck(b, color) ? -99999 - depth : 0;
  }
  moves.sort((a, z) => (PIECE_VALS[z.cap] || 0) - (PIECE_VALS[a.cap] || 0));
  let best = -Infinity;
  for (const m of moves) {
    const score = -negamax(applyMove(b, m), color === "white" ? "black" : "white", depth - 1, -beta, -alpha);
    if (score > best) best = score;
    if (best > alpha) alpha = best;
    if (alpha >= beta) break;
  }
  return best;
}

function chooseAiMove(b, color, depth, jitter) {
  const moves = legalMoves(b, color);
  if (!moves.length) return null;
  let bestScore = -Infinity;
  let pool = [];
  for (const m of moves) {
    const score =
      -negamax(applyMove(b, m), color === "white" ? "black" : "white", depth - 1, -Infinity, Infinity) +
      (jitter ? Math.random() * jitter : 0);
    if (score > bestScore) {
      bestScore = score;
      pool = [m];
    } else if (score === bestScore) {
      pool.push(m);
    }
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

const LEVELS = {
  easy: { depth: 1, jitter: 60, label: "Ey-Ay: Rookie" },
  normal: { depth: 2, jitter: 12, label: "Ey-Ay: Tactician" },
  hard: { depth: 3, jitter: 0, label: "Ey-Ay: Grandmaster" },
};

export function ChessBody({ muted }) {
  const [board, setBoard] = useState(initChessBoard);
  const [turn, setTurn] = useState("white");
  const [playerColor, setPlayerColor] = useState("white");
  const [level, setLevel] = useState("normal");
  const [sel, setSel] = useState(null);
  const [targets, setTargets] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState(null);
  const [checkFlag, setCheckFlag] = useState(false);

  const playerColorRef = useRef(playerColor);
  playerColorRef.current = playerColor;
  const boardRef = useRef(board);
  boardRef.current = board;

  const finishCheck = useCallback((b, moverColor) => {
    const opp = moverColor === "white" ? "black" : "white";
    const oppMoves = legalMoves(b, opp);
    const checked = inCheck(b, opp);
    setCheckFlag(checked);
    if (oppMoves.length === 0) {
      setResult(checked ? (opp === playerColorRef.current ? "lose" : "win") : "draw");
      playSound(opp === playerColorRef.current ? "error" : "ding", muted);
    }
  }, [muted]);

  useEffect(() => {
    if (result || turn === playerColor) return;
    setThinking(true);
    const t = setTimeout(() => {
      const cfg = LEVELS[level];
      const m = chooseAiMove(boardRef.current, turn, cfg.depth, cfg.jitter);
      if (m) {
        const nb = applyMove(boardRef.current, m);
        setLastMove(m);
        playSound(m.cap ? "recycle" : "menu", muted);
        setBoard(nb);
        setTurn(playerColor);
        finishCheck(nb, turn);
      }
      setThinking(false);
    }, 420);
    return () => clearTimeout(t);
  }, [turn, result, playerColor, level, muted, finishCheck]);

  const clickCell = (r, c) => {
    if (result || thinking || turn !== playerColor) return;
    const piece = board[r][c];
    if (sel) {
      const hit = targets.find((t) => t.tr === r && t.tc === c);
      if (hit) {
        const nb = applyMove(board, hit);
        setBoard(nb);
        setLastMove(hit);
        playSound(hit.cap ? "recycle" : "menu", muted);
        setSel(null);
        setTargets([]);
        setTurn(turn === "white" ? "black" : "white");
        finishCheck(nb, playerColor);
        return;
      }
    }
    if (piece && piece.c === playerColor) {
      const legal = legalMoves(board, playerColor).filter((m) => m.fr === r && m.fc === c);
      setSel({ r, c });
      setTargets(legal);
    } else {
      setSel(null);
      setTargets([]);
    }
  };

  const newGame = (color = playerColor) => {
    setBoard(initChessBoard());
    setPlayerColor(color);
    playerColorRef.current = color;
    setTurn("white");
    setSel(null);
    setTargets([]);
    setLastMove(null);
    setResult(null);
    setCheckFlag(false);
    setThinking(false);
  };

  const statusText = result
    ? result === "win"
      ? "Checkmate! You beat Ey-Ay."
      : result === "lose"
      ? "Checkmate. Ey-Ay wins. Rematch?"
      : "Stalemate. It's a draw."
    : thinking
    ? "Ey-Ay is thinking..."
    : checkFlag
    ? "CHECK! Protect your king."
    : turn === playerColor
    ? "Your move."
    : "Ey-Ay to move.";

  return (
    <div className="window-content chess-shell">
      <div className="chess-topbar">
        <MetaIcon name="robot" size={16} />
        <span style={{ fontWeight: "bold", color: "#0c3290" }}>Ey-Ay Engine</span>
        <select className="xp-select" value={level} onChange={(e) => setLevel(e.target.value)}>
          {Object.entries(LEVELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>
        <span style={{ flex: 1 }} />
        <button className="xp-button" style={{ minWidth: 0, padding: "2px 8px" }} onClick={() => newGame(playerColor)}>
          New
        </button>
        <button className="xp-button" style={{ minWidth: 0, padding: "2px 8px" }} onClick={() => newGame(playerColor === "white" ? "black" : "white")}>
          Play as {playerColor === "white" ? "Black" : "White"}
        </button>
      </div>
      <div className="chess-board-area">
        <div className="chess-board">
          {board.map((row, y) =>
            row.map((piece, x) => {
              const isTarget = targets.some((t) => t.tr === y && t.tc === x);
              const isLast =
                lastMove &&
                ((lastMove.tr === y && lastMove.tc === x) || (lastMove.fr === y && lastMove.fc === x));
              return (
                <div
                  key={`${x}-${y}`}
                  className={`chess-cell ${(x + y) % 2 === 0 ? "light" : "dark"} ${
                    sel?.r === y && sel?.c === x ? "selected" : ""
                  } ${isTarget ? "target" : ""} ${isLast ? "lastmove" : ""}`}
                  onClick={() => clickCell(y, x)}
                >
                  {piece && <span className="chess-piece">{glyphFor(piece)}</span>}
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="chess-status">
        <span>{statusText}</span>
        {thinking && (
          <span className="typing-indicator" style={{ padding: 0 }}>
            <span />
            <span />
            <span />
          </span>
        )}
      </div>
      {result && (
        <div className="chess-result-overlay">
          <h2 style={{ fontSize: 15 }}>
            {result === "win" ? "Victory!" : result === "lose" ? "Defeat" : "Draw"}
          </h2>
          <button className="xp-button" onClick={() => newGame()}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export function TargetBody({ muted }) {
  const [pos, setPos] = useState({ x: 50, y: 45 });
  const [flash, setFlash] = useState(false);
  const [score, setScore] = useState(0);

  const hit = (e) => {
    e.stopPropagation();
    setScore((s) => s + 1);
    setFlash(true);
    playSound("menu", muted);
    setTimeout(() => setFlash(false), 260);
    setPos({ x: 8 + Math.random() * 84, y: 10 + Math.random() * 72 });
  };

  return (
    <div className="window-content target-stage" style={{ position: "relative" }}>
      <div className={`target-dot ${flash ? "target-hit-flash" : ""}`} style={{ left: `${pos.x}%`, top: `${pos.y}%` }} onClick={hit}>
        <svg width="52" height="52" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="24" fill="#e2352b" stroke="#7d130c" strokeWidth="2" />
          <circle cx="26" cy="26" r="17" fill="#fff" />
          <circle cx="26" cy="26" r="10" fill="#e2352b" />
          <circle cx="26" cy="26" r="4" fill="#fff" />
        </svg>
      </div>
      <div
        className="snake-statusbar"
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(255,255,255,0.78)", borderRadius: "3px 3px 0 0" }}
      >
        Click the target! Score: {score}
      </div>
    </div>
  );
}

export function CalculatorBody() {
  const [display, setDisplay] = useState("0");
  const prev = useRef("");
  const op = useRef("");
  const fresh = useRef(true);

  const press = (key) => {
    const apply = (a, o, b) => {
      if (o === "+") return a + b;
      if (o === "-") return a - b;
      if (o === "*") return a * b;
      if (o === "/") return b === 0 ? NaN : a / b;
      return b;
    };
    if (key === "C") {
      setDisplay("0");
      prev.current = "";
      op.current = "";
      fresh.current = true;
      return;
    }
    if (key === "=") {
      if (op.current && prev.current) {
        const res = apply(parseFloat(prev.current), op.current, parseFloat(display));
        setDisplay(Number.isNaN(res) ? "Error" : String(Math.round(res * 1e10) / 1e10));
        prev.current = "";
        op.current = "";
        fresh.current = true;
      }
      return;
    }
    if (["+", "-", "*", "/"].includes(key)) {
      prev.current = display;
      op.current = key;
      fresh.current = true;
      return;
    }
    if (fresh.current) {
      setDisplay(key === "." ? "0." : key);
      fresh.current = false;
    } else if (!(key === "." && display.includes("."))) {
      setDisplay(display.length < 15 ? display + key : display);
    }
  };

  const keys = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];
  return (
    <div className="window-content calculator-wrap">
      <div className="calc-display">{display}</div>
      <button className="xp-button calc-clear" onClick={() => press("C")}>
        C
      </button>
      <div className="calc-buttons">
        {keys.map((k) => (
          <button key={k} className="xp-button" onClick={() => press(k)}>
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

const DEFAULT_NOTEPAD = [
  "Welcome to RafiOS Professional!",
  "",
  "This Notepad is fully functional.",
  "",
  "Quick tour:",
  "- Double-click desktop icons to open apps",
  "- Drag windows by their title bars",
  "- Right-click the desktop for options",
  "- The Chess app runs the Ey-Ay minimax engine",
  "- XP Assistant uses Chrome's built-in Gemini Nano",
  "",
  "Hire the person who coded all of this:",
  "rafiadnan.my.id",
].join("\r\n");

export function NotepadBody() {
  const [text, setText] = useState(DEFAULT_NOTEPAD);
  return (
    <div className="notepad-shell">
      <div className="xp-menubar">
        {["File", "Edit", "Format", "View", "Help"].map((m) => (
          <span key={m} className="xp-menu-item">
            {m}
          </span>
        ))}
      </div>
      <textarea className="notepad-textarea" value={text} onChange={(e) => setText(e.target.value)} spellCheck="false" />
    </div>
  );
}

const TOOLS = [
  {
    id: "pencil",
    el: (
      <svg width="15" height="15" viewBox="0 0 24 24">
        <path d="M3 21 l2.5 -7 L17 2.5 a2.2 2.2 0 0 1 3.1 3.1 L8.5 17.2 Z" fill="#f7c94b" stroke="#8a6d00" />
      </svg>
    ),
  },
  {
    id: "eraser",
    el: (
      <svg width="15" height="15" viewBox="0 0 24 24">
        <rect x="4" y="10" width="12" height="8" rx="2" transform="rotate(-30 12 14)" fill="#f0a0c0" stroke="#a04a72" />
        <rect x="12" y="6" width="8" height="8" rx="2" transform="rotate(-30 16 10)" fill="#7ec8f0" stroke="#2a6a94" />
      </svg>
    ),
  },
  {
    id: "brush",
    el: (
      <svg width="15" height="15" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="6" fill="#5b8def" stroke="#20458f" />
      </svg>
    ),
  },
];

export function PaintBody() {
  const canvasRef = useRef(null);
  const draw = useRef({ active: false, last: null });
  const [tool, setTool] = useState("pencil");
  const [size, setSize] = useState(3);
  const [color, setColor] = useState("#000000");

  const point = (e) => {
    const c = canvasRef.current;
    const rect = c.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * c.width,
      y: ((e.clientY - rect.top) / rect.height) * c.height,
    };
  };

  const down = (e) => {
    e.preventDefault();
    draw.current = { active: true, last: point(e) };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const move = (e) => {
    if (!draw.current.active) return;
    const p = point(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? 18 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(draw.current.last.x, draw.current.last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    draw.current.last = p;
  };

  const up = () => {
    draw.current.active = false;
  };

  const clear = () => {
    const c = canvasRef.current;
    c.getContext("2d").clearRect(0, 0, c.width, c.height);
  };

  return (
    <div className="paint-shell">
      <div className="paint-tools xp-scroll">
        {TOOLS.map((t) => (
          <button key={t.id} className={`paint-tool ${tool === t.id ? "active" : ""}`} onClick={() => setTool(t.id)} title={t.id}>
            {t.el}
          </button>
        ))}
        {[2, 4, 8].map((sz) => (
          <button key={sz} className={`paint-tool ${size === sz ? "active" : ""}`} onClick={() => setSize(sz)} title={`Brush ${sz}px`}>
            <div style={{ width: sz + 2, height: sz + 2, borderRadius: "50%", background: "#333" }} />
          </button>
        ))}
        <button className="paint-tool" title="Clear canvas" onClick={clear}>
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path d="M4 7 h16 M9 7 V5 h6 v2 M7 7 l1.4 13 h7.2 L17 7" stroke="#c0392b" strokeWidth="2" fill="none" />
          </svg>
        </button>
      </div>
      <div className="paint-canvas-holder">
        <canvas
          ref={canvasRef}
          width={900}
          height={560}
          className="paint-canvas"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerLeave={up}
        />
      </div>
      <div className="paint-colors xp-scroll">
        {PALETTE.map((c) => (
          <div key={c} className={`paint-swatch ${color === c ? "active" : ""}`} style={{ background: c }} onClick={() => setColor(c)} />
        ))}
      </div>
    </div>
  );
}
