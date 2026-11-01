/* The brand opening: played every time the front page loads, from a file on this site.
   No analytics, no third party, and it never stands between a visitor and the page.
   The film carries sound and the film is played with it: the video is asked to start audible, and
   only falls back to a silent start if the browser refuses, in which case the first touch of the
   page brings the sound up. The control stays either way, so it can also be turned off. */
(() => {
  const el = document.getElementById("eco-intro");
  if (!el) return;
  const mode = new URLSearchParams(location.search).get("intro");
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finish = () => {
    el.classList.add("out");
    document.documentElement.classList.remove("intro-on");
    const main = document.getElementById("main");
    if (main) main.removeAttribute("inert");
    setTimeout(() => el.remove(), 800);
  };

  // asked not to play, or the visitor has asked for less motion: the page, immediately
  if (mode === "off" || reduce) {
    el.remove();
    document.documentElement.classList.remove("intro-on");
    return;
  }

  document.documentElement.classList.add("intro-on");
  const main = document.getElementById("main");
  if (main) main.setAttribute("inert", "");

  const v = el.querySelector("video");
  v.poster = "/assets/brand-intro-poster.png";
  v.src = "/assets/brand-intro.mp4";
  v.load();
  v.muted = false;
  const silent = () => {
    v.muted = true;
    const retry = v.play();
    if (retry && retry.catch) retry.catch(() => { /* autoplay refused entirely: the poster stands */ });
    label();
  };
  const first = v.play();
  if (first && first.catch) first.catch(silent); else label();

  // the sound, offered rather than imposed: a control of its own, and the first touch of the page
  const sound = document.createElement("button");
  sound.type = "button";
  sound.className = "intro-sound";
  el.appendChild(sound);
  const tell = () => sound.setAttribute("aria-pressed", v.muted ? "false" : "true");
  function label() {
    sound.textContent = v.muted ? "Turn the sound on" : "Turn the sound off";
    tell();
  }
  const unmute = () => {
    if (v.ended || !v.muted) return;
    v.muted = false;
    const go = v.play();
    if (go && go.catch) go.catch(() => {});
    label();
  };
  sound.addEventListener("click", () => {
    if (v.muted) { unmute(); } else { v.muted = true; label(); }
  });
  const firstTouch = (e) => {
    if (e.target && e.target.closest && (e.target.closest(".intro-skip") || e.target.closest(".intro-sound"))) return;
    unmute();
  };
  window.addEventListener("pointerdown", firstTouch, { once: true });
  window.addEventListener("keydown", firstTouch, { once: true });

  // a guard so nobody is ever locked behind the opening, whatever the browser does with the file
  const guard = setTimeout(finish, 16000);
  v.addEventListener("ended", () => { clearTimeout(guard); finish(); });
  v.addEventListener("error", () => { clearTimeout(guard); finish(); });
  el.querySelector(".intro-skip").addEventListener("click", () => { clearTimeout(guard); finish(); });
  el.querySelector(".intro-skip").focus({ preventScroll: true });
})();
