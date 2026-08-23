const cache = {};

export function playSound(name, muted) {
  if (muted || typeof window === "undefined") return;
  try {
    if (!cache[name]) cache[name] = new Audio(`/xp/sounds/${name}.mp3`);
    const a = cache[name];
    a.currentTime = 0;
    a.volume = name === "startup" || name === "shutdown" ? 0.5 : 0.35;
    a.play().catch(() => {});
  } catch (e) {}
}
