/*
 * A view switch, so the two layouts can be compared on either device.
 *
 * On a wide screen the mobile view is the honest thing: the page is loaded again in a frame that
 * is a phone's width. On a phone the switch does the opposite and asks for a desktop viewport,
 * which is what a browser's own "request desktop site" does. The choice is remembered.
 * The states can also be asked for directly:
 *      /about.html?as=phone        opens the page already framed as a phone
 *      /about.html?view=phone      is the framed page itself, and carries no switch
 */
(() => {
  const q = new URLSearchParams(location.search);
  if (q.get("view")) return;                                   // this is the framed copy
  const narrow = window.matchMedia && window.matchMedia("(max-width: 899px)").matches;
  const meta = document.querySelector('meta[name="viewport"]');
  const WIDE = 1440;

  if (narrow) {
    // on a phone there is nothing to frame: the switch changes the viewport the page is laid out in
    if (!meta) return;
    const KEY = "jason-ou-phone-view";
    const home = meta.getAttribute("content");
    let mode = "phone";
    try { mode = localStorage.getItem(KEY) || "phone"; } catch (e) { /* this visit only */ }
    if (q.get("as")) mode = q.get("as");

    const bar = document.createElement("div");
    bar.className = "viewbar";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Change the width this page is laid out in");
    [["phone", "Phone"], ["wide", "Desktop 1440"]].forEach(([key, label]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.addEventListener("click", () => { mode = key; try { localStorage.setItem(KEY, mode); } catch (e) {} apply(); });
      bar.appendChild(b);
    });
    document.body.appendChild(bar);

    function apply() {
      const wide = mode === "wide";
      meta.setAttribute("content", wide ? "width=" + WIDE : home);
      bar.querySelectorAll("button").forEach((b, i) =>
        b.setAttribute("aria-pressed", String((i === 1) === wide)));
    }
    apply();
    window.addEventListener("resize", () => { if (mode === "wide") apply(); });
    return;
  }

  const KEY = "jason-ou-view";
  const SIZES = [["desktop", "Full width", 0, 0], ["phone", "iPhone · 390", 390, 844],
                 ["phoneL", "Max · 430", 430, 932], ["tablet", "Tablet · 768", 768, 1024]];
  let mode = q.get("as") || "";
  try { mode = mode || localStorage.getItem(KEY) || "desktop"; } catch (e) { mode = mode || "desktop"; }
  if (!SIZES.some((s) => s[0] === mode)) mode = "desktop";

  const bar = document.createElement("div");
  bar.className = "viewbar";
  bar.setAttribute("role", "group");
  bar.setAttribute("aria-label", "Preview this page at a different width");
  SIZES.forEach(([key, label]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.dataset.mode = key;
    b.addEventListener("click", () => set(key));
    bar.appendChild(b);
  });
  document.body.appendChild(bar);

  function src(which) {
    const keep = new URLSearchParams(location.search);
    keep.delete("as"); keep.delete("view"); keep.delete("intro");
    keep.set("view", which); keep.set("intro", "off");         // the opening film is for real arrivals
    return location.pathname + "?" + keep.toString();
  }

  function paint() {
    bar.querySelectorAll("button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    const old = document.getElementById("view-stage");
    if (old) old.remove();
    if (mode === "desktop") { document.documentElement.removeAttribute("data-view"); return; }

    const [, label, w, h] = SIZES.find((s) => s[0] === mode);
    const fit = Math.min(1, (window.innerHeight - 176) / h);
    document.documentElement.setAttribute("data-view", mode);

    const el = document.createElement("div");
    el.id = "view-stage";
    el.innerHTML = '<div class="chrome"><span>' + label + " &times; " + h + " px</span>" +
      '<button type="button" class="out">Back to full width &nbsp;<kbd>esc</kbd></button></div>' +
      '<div class="phone"><iframe title="' + label + ' preview of this page" src="' + src(mode) + '"></iframe></div>';
    el.style.setProperty("--fit", fit.toFixed(3));
    document.body.appendChild(el);
    // the frame is sized to what it will occupy, so the caption above it stays on screen;
    // only the page inside is scaled, which leaves the layout box where a phone's would be
    const phone = el.querySelector(".phone"), view = el.querySelector("iframe");
    phone.style.width = Math.round(w * fit) + "px";
    phone.style.height = Math.round(h * fit) + "px";
    view.style.width = w + "px";
    view.style.height = h + "px";
    view.style.transform = "scale(" + fit.toFixed(3) + ")";
    el.querySelector(".out").addEventListener("click", () => set("desktop"));
  }

  function set(next) {
    mode = next;
    try { localStorage.setItem(KEY, mode); } catch (e) { /* private mode: this visit only */ }
    paint();
  }

  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && mode !== "desktop") set("desktop"); });
  window.addEventListener("resize", () => { if (mode !== "desktop") paint(); });
  paint();
})();
