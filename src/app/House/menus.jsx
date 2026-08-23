"use client";

import { XpFlag, MetaIcon, ErrorIcon, ShutdownIcon, RestartIcon, LogOffIcon, CaptionGlyphs } from "./icons";
import { AVATAR } from "./data";

export function PowerScreen({ onStart }) {
  return (
    <div className="power-screen" onClick={onStart}>
      <div className="power-btn">
        <svg width="30" height="30" viewBox="0 0 24 24">
          <path d="M12 3 a1.6 1.6 0 0 1 1.6 1.6 v7 a1.6 1.6 0 0 1 -3.2 0 v-7 A1.6 1.6 0 0 1 12 3 Z M6.3 6.9 a1.6 1.6 0 0 1 0 2.26 a7 7 0 1 0 11.4 0 a1.6 1.6 0 1 1 2.26 -2.26 a10.2 10.2 0 1 1 -15.92 0 a1.6 1.6 0 0 1 2.26 0 Z" />
        </svg>
      </div>
      <div className="power-text">CLICK TO POWER ON</div>
    </div>
  );
}

export function BootScreen() {
  return (
    <div className="boot-screen">
      <div className="boot-logo-area">
        <div className="boot-brandline">
          <span className="boot-microsoft">Microsoft</span>
          <span className="boot-windowsxp">
            <span className="boot-win">Windows</span>
            <XpFlag size={46} />
            <span className="boot-xp">xp</span>
          </span>
        </div>
        <div className="boot-edition">Rafi Adnan Portfolio Edition</div>
        <div style={{ marginTop: 44 }} className="boot-progress-track">
          <div className="boot-progress-runner">
            <div className="boot-block" />
            <div className="boot-block" />
            <div className="boot-block" />
          </div>
        </div>
      </div>
      <div className="boot-footer">
        <span className="boot-copyright">Copyright © Rafi Adnan · Hand-built with Next.js · No templates were harmed</span>
        <span>Microsoft</span>
      </div>
    </div>
  );
}

export function ShutdownScreen() {
  return null;
}

export function StartMenu({
  leftPinned,
  leftRecent,
  rightItems,
  allPrograms,
  allProgramsOpen,
  onToggleAllPrograms,
  onLogOff,
  onTurnOff,
}) {
  return (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      <div className="sm-header">
        <img className="sm-avatar" src={AVATAR} alt="Rafi Adnan" />
        <div>
          <div className="sm-user-name">Rafi Adnan</div>
          <div className="sm-user-role">Web &amp; Game Developer</div>
        </div>
      </div>
      <div className="sm-columns">
        <div className="sm-left">
          {leftPinned.map((it) => (
            <button key={it.key} className="sm-item" onClick={it.action}>
              {it.icon}
              <span>
                <span className="sm-bold">{it.key}</span>
                {it.sub && <span className="sm-sub">{it.sub}</span>}
              </span>
            </button>
          ))}
          <div className="sm-sep-dark" />
          {leftRecent.map((it) => (
            <button key={it.key} className="sm-item" onClick={it.action}>
              {it.icon}
              <span>{it.key}</span>
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <div className="sm-allprograms-wrap">
            {allProgramsOpen && (
              <div className="allprograms-flyout xp-scroll">
                {allPrograms.map((ap, i) =>
                  ap.header ? (
                    <div
                      key={`${ap.header}-${i}`}
                      className="sm-bold"
                      style={{ padding: "4px 8px", color: "#12439e", borderTop: i ? "1px solid #e4ebf7" : "none", marginTop: i ? 3 : 0 }}
                    >
                      {ap.header}
                    </div>
                  ) : (
                    <button key={ap.key} className="sm-item" onClick={ap.action}>
                      {ap.icon}
                      <span>{ap.key}</span>
                    </button>
                  )
                )}
              </div>
            )}
            <div className="sm-allprograms" onClick={onToggleAllPrograms}>
              <MetaIcon name="folder" size={20} />
              <span>All Programs</span>
              <svg width="9" height="9" viewBox="0 0 9 9">
                <path d="M2 1 l4 3.5 L2 8" stroke="#14213d" strokeWidth="1.6" fill="none" />
              </svg>
            </div>
          </div>
        </div>
        <div className="sm-right">
          {rightItems.map((it) => (
            <button key={it.key} className="sm-item" onClick={it.action}>
              {it.icon}
              <span>{it.key}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="sm-footer">
        <button className="sm-footer-btn" onClick={onLogOff}>
          <LogOffIcon />
          Log Off
        </button>
        <button className="sm-footer-btn" onClick={onTurnOff}>
          <TurnOffGlyph />
          Turn Off Computer
        </button>
      </div>
    </div>
  );
}

function TurnOffGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="#e2352b" stroke="#7d130c" />
      <path d="M12 7 v5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M8.5 9.5 a5 5 0 1 0 7 0" stroke="#fff" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

export function ContextMenu({ x, y, items }) {
  return (
    <div
      className="context-menu"
      style={{ left: Math.min(x, (typeof window !== "undefined" ? window.innerWidth : 1200) - 190), top: Math.min(y, (typeof window !== "undefined" ? window.innerHeight : 800) - 200) }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, i) =>
        item.sep ? (
          <div key={`sep-${i}`} className="ctx-sep" />
        ) : (
          <div
            key={item.label}
            className="ctx-item"
            onClick={() => {
              item.action();
            }}
          >
            {item.label}
          </div>
        )
      )}
    </div>
  );
}

export function BalloonTip({ onClose }) {
  return (
    <div className="balloon">
      <div className="balloon-title-row">
        <MetaIcon name="robot" size={18} />
        <span className="balloon-title">Take a tour of RafiOS</span>
        <button className="balloon-close" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="balloon-body">
        <MetaIcon name="computer" size={30} />
        <span>
          Welcome! Double-click any desktop icon, drag windows around, beat the <b>Ey-Ay engine</b> at chess, or ask the AI Assistant why you should hire Rafi.
        </span>
      </div>
    </div>
  );
}

export function DialogShell({ title, children, onClose }) {
  return (
    <div className="dialog-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="xp-dialog">
        <div className="dialog-titlebar">
          <span>{title}</span>
          <button className="caption-btn close" aria-label="Close" onClick={onClose}>
            {CaptionGlyphs.close}
          </button>
        </div>
        <div className="dialog-inner">{children}</div>
      </div>
    </div>
  );
}

export function WelcomeDialog({ onClose, onProjects }) {
  return (
    <DialogShell title="Welcome to RafiOS Professional" onClose={onClose}>
      <div className="about-flag-row">
        <XpFlag size={40} />
        <div>
          <div style={{ fontWeight: "bold", fontSize: 13, color: "#0c3290" }}>Hi, I&apos;m Rafi Adnan</div>
          <div style={{ fontSize: 10, color: "#555" }}>Full-stack developer &amp; indie game dev, Indonesia</div>
        </div>
      </div>
      <div className="dialog-content-row">
        <img src={AVATAR} alt="Rafi Adnan" width={54} height={54} style={{ borderRadius: 4, border: "1px solid #0831d9", flexShrink: 0 }} />
        <p>
          This entire desktop is my portfolio: windows, wallpaper, sounds and games are all hand-built. Start with{" "}
          <b>My Projects</b>, challenge my <b>Chess AI</b>, then open the Contact tab and let&apos;s build something together.
        </p>
      </div>
      <div className="dialog-buttons">
        <button className="xp-button" onClick={onClose}>
          OK
        </button>
        <button className="xp-button" onClick={onProjects}>
          View Projects
        </button>
      </div>
    </DialogShell>
  );
}

export function AboutDialog({ onClose }) {
  return (
    <DialogShell title="About RafiOS" onClose={onClose}>
      <div className="about-flag-row">
        <XpFlag size={46} />
        <div>
          <div style={{ fontWeight: "bold", fontSize: 13 }}>
            RafiOS Professional <span style={{ fontStyle: "italic", color: "#e68b2c" }}>Portfolio</span>
          </div>
          <div style={{ fontSize: 10, color: "#555" }}>Version 2026 (Build 2600.xpclnt)</div>
        </div>
      </div>
      <div className="about-specs">
        <b>Developer:</b> Rafi Adnan
        <br />
        <b>Certified:</b> BNSP Web Developer
        <br />
        <b>Award:</b> 3rd Place, Portfolio Competition 2025
        <br />
        <b>Stack:</b> Next.js · React · Laravel · Unity
        <br />
        <b>Chess Engine:</b> Ey-Ay v1.0 (minimax + alpha-beta)
        <br />
        <b>Built-in AI:</b> Chrome Gemini Nano (on-device)
        <br />
        <b>License:</b> For hiring purposes only
      </div>
      <div className="dialog-buttons">
        <button className="xp-button" onClick={onClose}>
          OK
        </button>
      </div>
    </DialogShell>
  );
}

export function TurnOffDialog({ onClose, onStandBy, onTurnOff, onRestart }) {
  return (
    <DialogShell title="Turn Off Computer" onClose={onClose}>
      <div style={{ background: "#5a7edc", margin: "-14px -14px -12px", padding: "4px 14px 16px", borderRadius: "0 0 3px 3px" }}>
        <div style={{ textAlign: "center", color: "#fff", fontWeight: "bold", fontSize: 13, paddingTop: 6 }}>
          What do you want the computer to do?
        </div>
        <div className="turnoff-grid">
          <button className="to-btn" onClick={onStandBy}>
            <span className="to-circle standby">
              <ShutdownIcon />
            </span>
            Stand By
          </button>
          <button className="to-btn" onClick={onTurnOff}>
            <span className="to-circle off">
              <ShutdownIcon />
            </span>
            Turn Off
          </button>
          <button className="to-btn" onClick={onRestart}>
            <span className="to-circle reboot">
              <RestartIcon />
            </span>
            Restart
          </button>
        </div>
      </div>
    </DialogShell>
  );
}

export function ErrorDialogBox({ title, msg, onClose }) {
  return (
    <DialogShell title={title} onClose={onClose}>
      <div className="dialog-content-row">
        <ErrorIcon s={36} />
        <p>{msg}</p>
      </div>
      <div className="dialog-buttons">
        <button className="xp-button" onClick={onClose}>
          OK
        </button>
      </div>
    </DialogShell>
  );
}
