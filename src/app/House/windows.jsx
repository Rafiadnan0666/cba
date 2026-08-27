"use client";

import { AVATAR, PROJECTS } from "./data";

const SKILLS_WEB = [
  ["React / Next.js", 90],
  ["TypeScript / JavaScript", 88],
  ["Laravel / CodeIgniter / PHP", 85],
  ["SvelteKit", 78],
  ["Supabase / MySQL / MongoDB", 82],
  ["Tailwind CSS", 92],
];

const SKILLS_GAME = [
  ["Unity / C#", 88],
  ["Shader Graph", 70],
  ["NavMesh AI", 82],
  ["Procedural Generation", 75],
];

const SKILLS_TOOLS = [
  ["Git / GitHub", 90],
  ["Vercel / Netlify", 85],
  ["Figma", 65],
];

export function ProfileContent({ tab, setTab }) {
  return (
    <>
      <div className="profile-header">
        <div className="profile-header-bg" />
        <div className="profile-header-content">
          <div className="profile-avatar-frame">
            <img className="profile-avatar" src={AVATAR} alt="Rafi Adnan" />
          </div>
          <div>
            <h2 className="profile-name">Rafi Adnan</h2>
            <div className="profile-title-p">Full-stack Web Developer · Indie Game Developer</div>
            <div className="profile-badges">
              <span className="profile-badge">BNSP Certified</span>
              <span className="profile-badge">3rd Place · Portfolio Competition 2025</span>
              <span className="profile-badge">Indonesia</span>
            </div>
          </div>
        </div>
      </div>

      <div className="xp-tabs">
        {[
          ["about", "About"],
          ["skills", "Skills"],
          ["contact", "Contact"],
          ["music", "Music"],
        ].map(([id, label]) => (
          <button key={id} className={`xp-tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="profile-tab-content xp-scroll">
        {tab === "about" && (
          <>
            <fieldset className="xp-fieldset">
              <legend>About Me</legend>
              <p className="about-para">
                I build things people actually enjoy using: production web platforms by day, Unity chaos by
                night. From real-time collaboration tools to on-device AI accessibility apps, I ship complete
                products: clean architecture, thoughtful UX, zero excuses. Currently obsessed with browser-native
                AI and making the web feel like 2003 again.
              </p>
            </fieldset>
            <fieldset className="xp-fieldset">
              <legend>Career Highlights</legend>
              <ul className="xp-list">
                <li><b>BNSP Certified Web Developer</b>: national professional certification</li>
                <li><b>3rd Place</b>: Portfolio Competition 2025</li>
                <li><b>Web Developer Intern</b>: YBM PLN (Feb to Jul 2024)</li>
                <li><b>9 games published</b> on itch.io as Gregrsea 975</li>
                <li><b>40+ repositories</b> across web, mobile and game dev</li>
              </ul>
            </fieldset>
            <fieldset className="xp-fieldset">
              <legend>Featured Work</legend>
              <ul className="xp-list">
                <li><b>ClrBlind</b>: on-device AI accessibility (try the live demo!)</li>
                <li><b>Tabwise</b>: collaborative research platform with AI insights</li>
                <li><b>Disaster Tracker</b>: live seismic monitoring dashboard</li>
              </ul>
            </fieldset>
          </>
        )}

        {tab === "skills" && (
          <>
            {[
              ["Web Development", SKILLS_WEB],
              ["Game Development", SKILLS_GAME],
              ["Tools & Others", SKILLS_TOOLS],
            ].map(([title, rows]) => (
              <fieldset key={title} className="xp-fieldset">
                <legend>{title}</legend>
                {rows.map(([label, pct]) => (
                  <div key={label} className="skill-bar">
                    <span className="skill-label">{label}</span>
                    <div className="skill-track">
                      <div className="skill-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </fieldset>
            ))}
          </>
        )}

        {tab === "contact" && (
          <>
            <fieldset className="xp-fieldset">
              <legend>Get In Touch</legend>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="#e8ebef" stroke="#5a6572" /><path d="M3 6 l9 7 l9 -7" stroke="#2f6fd0" strokeWidth="1.8" fill="none" /></svg>
                <a href="mailto:fn234561@gmail.com" className="contact-link">fn234561@gmail.com</a>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2f8fe0" stroke="#1b5fa8" /><path d="M2.5 12 h19 M12 2 a15 15 0 0 1 0 20 M12 2 a15 15 0 0 0 0 20" stroke="#dff0ff" fill="none" /></svg>
                <a href="https://rafiadnan.my.id" target="_blank" rel="noopener noreferrer" className="contact-link">rafiadnan.my.id</a>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 1.5 a10.5 10.5 0 0 0 -3.3 20.5 c.5 .1 .7 -.2 .7 -.5 v-1.8 c-2.9 .6 -3.5 -1.4 -3.5 -1.4 c-.5 -1.2 -1.2 -1.5 -1.2 -1.5 c-1 -.7 .1 -.7 .1 -.7 c1.1 .1 1.7 1.1 1.7 1.1 c1 1.7 2.6 1.2 3.2 .9 c.1 -.7 .4 -1.2 .7 -1.5 c-2.3 -.3 -4.8 -1.2 -4.8 -5.2 c0 -1.2 .4 -2.1 1.1 -2.9 c-.1 -.3 -.5 -1.4 .1 -2.9 c0 0 .9 -.3 3 1.1 a10 10 0 0 1 5.4 0 c2.1 -1.4 3 -1.1 3 -1.1 c.6 1.5 .2 2.6 .1 2.9 c.7 .8 1.1 1.7 1.1 2.9 c0 4 -2.5 4.9 -4.8 5.2 c.4 .3 .7 1 .7 2 v3 c0 .3 .2 .6 .7 .5 A10.5 10.5 0 0 0 12 1.5 Z" fill="#24292f" /></svg>
                <a href="https://github.com/Rafiadnan0666" target="_blank" rel="noopener noreferrer" className="contact-link">github.com/Rafiadnan0666</a>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24"><rect x="1" y="6" width="22" height="13" rx="3" fill="#fa5c5c" stroke="#c22" /><text x="12" y="15.5" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">itch</text></svg>
                <a href="https://gregrsea-975.itch.io" target="_blank" rel="noopener noreferrer" className="contact-link">gregrsea-975.itch.io</a>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#29abe2" stroke="#147ba9" /><path d="M12 2 v20 M2 12 h20 M5 5 q7 4 14 0 M5 19 q7 -4 14 0" stroke="#dff0ff" fill="none" /></svg>
                <a href="https://www.linkedin.com/in/rafi-adnan-a52141274/" target="_blank" rel="noopener noreferrer" className="contact-link">linkedin.com/in/rafi-adnan-a52141274</a>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2" fill="#0ea5e9" stroke="#0369a1" /><path d="M7 10 l5 5 7 -7" stroke="#fff" strokeWidth="2" fill="none" /></svg>
                <a href="https://fastwork.id/user/gregrsea/web-development-41322905?source=seller-center_my-service_share-link" target="_blank" rel="noopener noreferrer" className="contact-link">fastwork.id/gregrsea</a>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2" fill="#1dbf73" stroke="#0d8a4f" /><path d="M12 3 v18 M3 12 h18" stroke="#fff" strokeWidth="2" /></svg>
                <a href="https://www.fiverr.com/s/1EA3XQ6" target="_blank" rel="noopener noreferrer" className="contact-link">fiverr.com/s/1EA3XQ6</a>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e1306c" stroke="#c13584" /><path d="M12 5 c-2.5 0 -4.5 1.2 -4.5 3.5 0 2 1.5 3.5 4.5 3.5 2.5 0 4.5 -1.2 4.5 -3.5 0 -2.3 -2 -3.5 -4.5 -3.5 z" fill="#feda75" /><circle cx="16.5" cy="7.5" r="1.5" fill="#e1306c" /></svg>
                <a href="https://www.instagram.com/gregrsea_ninesevenfive/" target="_blank" rel="noopener noreferrer" className="contact-link">instagram.com/gregrsea_ninesevenfive</a>
              </div>
            </fieldset>
            <fieldset className="xp-fieldset">
              <legend>Support My Work</legend>
              <div className="kofi-row">
                <a href="https://ko-fi.com/Q5Q81DS5SA" target="_blank" rel="noopener noreferrer">
                  <img src="https://storage.ko-fi.com/cdn/kofi6.png?v=6" alt="Buy Me a Coffee at ko-fi.com" height="34" />
                </a>
              </div>
            </fieldset>
          </>
        )}

        {tab === "music" && (
          <>
            <fieldset className="xp-fieldset">
              <legend>My Music</legend>
              <p className="about-para">
                I also produce electronic and dubstep music. Check out my track &quot;Joy Theme&quot; on Spotify.
              </p>
            </fieldset>
            <iframe
              src="https://open.spotify.com/embed/artist/2PYunjmmYVDbsSudTPSwyv?utm_source=generator"
              width="100%"
              height="200"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify artist embed"
              className="spotify-embed"
            />
          </>
        )}
      </div>
    </>
  );
}

export function ProjectsContent() {
  const openExternal = (url) => window.open(url, "_blank", "noopener,noreferrer");
  return (
    <div className="explorer-split">
      <aside className="explorer-side xp-scroll">
        <div className="side-panel">
          <div className="side-panel-head">File and Folder Tasks</div>
          <div className="side-panel-body">
            <button className="side-link" onClick={() => openExternal("https://github.com/Rafiadnan0666")}>
              <svg width="15" height="15" viewBox="0 0 48 48"><path d="M4 10 h14 l4 5 h22 v25 a2 2 0 0 1 -2 2 H6 a2 2 0 0 1 -2 -2 Z" fill="#f7c94b" stroke="#c98a10" /></svg>
              Visit my GitHub
            </button>
            <button className="side-link" onClick={() => openExternal("https://rafiadnan.my.id")}>
              <svg width="15" height="15" viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="#2f8fe0" stroke="#1b5fa8" /></svg>
              Open my website
            </button>
            <button className="side-link" onClick={() => openExternal("https://gregrsea-975.itch.io")}>
              <svg width="15" height="15" viewBox="0 0 48 48"><rect x="6" y="12" width="36" height="24" rx="6" fill="#4a5568" stroke="#2b3446" /></svg>
              Play my games
            </button>
          </div>
        </div>
        <div className="side-panel">
          <div className="side-panel-head">Other Places</div>
          <div className="side-panel-body">
            <button className="side-link" onClick={() => openExternal("https://www.linkedin.com/in/rafi-adnan")}>LinkedIn profile</button>
            <button className="side-link" onClick={() => openExternal("https://ko-fi.com/Q5Q81DS5SA")}>Ko-fi page</button>
          </div>
        </div>
        <div className="side-panel">
          <div className="side-panel-head">Details</div>
          <div className="side-panel-body">
            <p className="side-detail">
              <b>{PROJECTS.length} projects</b><br />
              Rafi Adnan<br />
              Web &amp; Game Developer<br />
              Indonesia<br />
              <br />
              Stack: React, Laravel,<br />
              SvelteKit, Unity<br />
              Status: <b style={{ color: "#1d9e34" }}>Open to work</b>
            </p>
          </div>
        </div>
      </aside>

      <div className="explorer-main">
        <div className="xp-menubar">
          {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((m) => (
            <span key={m} className="xp-menu-item">{m}</span>
          ))}
        </div>
        <div className="addressbar">
          <span style={{ fontSize: 11 }}>Address</span>
          <div className="addr-box">
            <svg width="13" height="13" viewBox="0 0 48 48"><path d="M4 10 h14 l4 5 h22 v25 a2 2 0 0 1 -2 2 H6 a2 2 0 0 1 -2 -2 Z" fill="#f7c94b" stroke="#c98a10" /></svg>
            <span>C:\Documents and Settings\Rafi\My Projects</span>
          </div>
          <button className="go-btn" onClick={() => openExternal("https://github.com/Rafiadnan0666")}>Go</button>
        </div>
        <div className="projects-scroll xp-scroll">
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <div key={p.title} className="project-card">
                <div className="project-image-container">
                  <img src={p.img} alt={p.title} loading="lazy" />
                  {p.live && <span className="project-live-dot">LIVE DEMO</span>}
                </div>
                <div className="project-info">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="proj-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="proj-tag">{t}</span>
                    ))}
                  </div>
                  <div className="project-links-row">
                    {p.live && (
                      <a className="project-link" href={p.live} target="_blank" rel="noopener noreferrer">Live Site</a>
                    )}
                    <a className="project-link" href={p.repo} target="_blank" rel="noopener noreferrer">Source Code</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
