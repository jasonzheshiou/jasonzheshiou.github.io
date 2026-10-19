/* ── Motion edition behaviour ──────────────────────────────────────────────────
   Everything here is optional: with JavaScript off the page is the line site,
   and with prefers-reduced-motion set the page stops moving but keeps working.
   No libraries, no analytics, no network.
   ─────────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";
  var root = document.documentElement;
  if (root.dataset.ed !== "motion") return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var forced = /[?&]pointer=force/.test(location.search);
  if (forced) root.dataset.pointer = "force";
  var hover = forced || window.matchMedia("(hover: hover)").matches;

  /* ── one fixed rail and one light layer, added here so the markup stays shared ── */
  function add(tag, cls, host) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    (host || document.body).prepend ? (host || document.body).prepend(el) : (host || document.body).appendChild(el);
    return el;
  }
  add("div", "rail");
  add("div", "gridlayer");

  /* ── the pointer: eased, so surfaces trail the cursor rather than snap to it ── */
  if (!reduce && hover) {
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    addEventListener("pointermove", function (e) {
      root.style.setProperty("--mx", e.clientX + "px");
      root.style.setProperty("--my", e.clientY + "px");
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(step);
    }, { passive: true });
    function step() {
      cx += (tx - cx) * 0.075; cy += (ty - cy) * 0.075;
      root.style.setProperty("--px", (cx * 14).toFixed(2) + "px");
      root.style.setProperty("--py", (cy * 14).toFixed(2) + "px");
      raf = (Math.abs(tx - cx) > 0.0015 || Math.abs(ty - cy) > 0.0015) ? requestAnimationFrame(step) : 0;
    }
    var heroArt = document.querySelector(".hero-line");
    if (heroArt) heroArt.setAttribute("data-depth", "1.7");
  }

  /* ── reveals, driven by the scroll position in CSS, not by a listener ── */
  /* Pages wrap their sections three different ways, so collect the blocks rather
     than assume a shape: whole sections, the children of a section wrapper, and
     the paragraphs and figures inside an article. */
  var blocks = [];
  [].forEach.call(document.querySelectorAll("main > *, main > .wrap > *, main > * > .wrap > *, main .prose > *"), function (el) {
    if (/^(script|style|svg|noscript|template)$/i.test(el.tagName)) return;
    if (el.classList.contains("wrap") || el.classList.contains("bar")) return;
    blocks.push(el);
  });
  [].forEach.call(blocks, function (el) {
    if (el.offsetHeight < 20) return;
    el.classList.add(/^H[12]$/.test(el.tagName) ? "mv-wipe" : "mv-rise");
  });

  /* ── magnetic nav and buttons ── */
  if (!reduce && hover) {
    [].forEach.call(document.querySelectorAll(".main a, .btn"), function (a) {
      a.addEventListener("pointermove", function (e) {
        var r = a.getBoundingClientRect();
        a.style.setProperty("--dx", ((e.clientX - r.left - r.width / 2) * 0.28).toFixed(1) + "px");
        a.style.setProperty("--dy", ((e.clientY - r.top - r.height / 2) * 0.4).toFixed(1) + "px");
      });
      a.addEventListener("pointerleave", function () {
        a.style.setProperty("--dx", "0px"); a.style.setProperty("--dy", "0px");
      });
    });
    [].forEach.call(document.querySelectorAll(".two > a, .what > div, .mean > div, .card"), function (el) {
      el.classList.add("tilting");
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--cx", (x * 100).toFixed(1) + "%");
        el.style.setProperty("--cy", (y * 100).toFixed(1) + "%");
        el.style.transform = "perspective(760px) rotateY(" + ((x - .5) * 5).toFixed(2) +
                             "deg) rotateX(" + ((.5 - y) * 5).toFixed(2) + "deg)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* ── figures count up once, then are replaced by the exact words they started as ── */
  var counts = [].filter.call(document.querySelectorAll(".two .big, .hero .num, .metric .num"), function (el) {
    return !el.closest("table") && /^\s*([\d .,\u00a0]+)(.*)$/.test(el.textContent);
  });
  if (counts.length && !reduce && "IntersectionObserver" in window) {
    var done = new WeakSet();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting || done.has(en.target)) return;
        done.add(en.target);
        var el = en.target, raw = el.textContent.trim();
        var m = raw.match(/^([\d .,\u00a0]+)(.*)$/);
        var digits = m[1], tail = m[2] || "";
        var grp = (digits.match(/[ .,\u00a0]\d{3}/g) || []).length ? (digits.match(/[ .,\u00a0]/) || [""])[0] : "";
        var dec = /\.\d/.test(digits) ? "." : (/\,\d/.test(digits) ? "," : "");
        var value = parseFloat(digits.replace(/[^\d]/g, "") + (dec ? "." : "") + (dec ? digits.split(dec)[1].replace(/[^\d]/g, "") : ""));
        if (!isFinite(value) || value === 0) { el.textContent = raw; return; }
        var pad = (digits.split(".")[0].split(",")[0].match(/\d+/) || [""])[0].length;
        var t0 = performance.now();
        (function tick(t) {
          var k = Math.min(1, (t - t0) / 820), e = 1 - Math.pow(1 - k, 3), v = Math.round(value * e);
          if (k >= 1) { el.textContent = raw; return; }           // land on the author's own string
          var s = String(v).padStart(pad, "0");
          if (grp) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, grp);
          el.textContent = s + tail;
          requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.5 });
    counts.forEach(function (el) { io.observe(el); });
  }

  /* ── the traverse: the pointer becomes a review plane over the decision chain ── */
  var stage = document.getElementById("mv-stage");
  if (stage) {
    var rows = [].slice.call(document.querySelectorAll("#mv-ledger tbody tr"));
    var scan = stage.querySelector(".mv-scan"), label = scan.querySelector("b");
    var nodes = [], labs = [];
    rows.forEach(function (tr, i) {
      var x = 8 + i * (84 / Math.max(1, rows.length - 1));
      var n = document.createElement("span"); n.className = "mv-node" + (tr.dataset.plan === "1" ? " plan" : "");
      n.style.left = x + "%"; stage.appendChild(n); nodes.push(n);
      var l = document.createElement("span"); l.className = "mv-lab" + (i % 2 ? "" : " up");
      l.style.left = x + "%"; l.textContent = tr.dataset.station; stage.appendChild(l); labs.push(l);
    });
    var cur = -1;
    function at(t) {
      t = Math.max(0, Math.min(1, t));
      scan.style.left = (t * 100).toFixed(2) + "%";
      var i = Math.round(t * (rows.length - 1));
      if (i === cur) return;
      cur = i;
      var r = rows[i];
      label.textContent = "Station " + (i + 1) + " / " + rows.length;
      stage.setAttribute("aria-valuenow", i + 1);
      document.getElementById("mv-station").textContent = r.dataset.station;
      document.getElementById("mv-what").textContent = r.children[1].textContent;
      document.getElementById("mv-record").textContent = r.children[2].textContent;
      nodes.forEach(function (n, k) { n.classList.toggle("on", k === i); });
      labs.forEach(function (n, k) { n.classList.toggle("on", k === i); });
      rows.forEach(function (n, k) { n.classList.toggle("on", k === i); });
    }
    if (reduce) { at(0.5); return; }
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      at((e.clientX - r.left) / r.width);
    });
    stage.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return; e.preventDefault();
      at((cur + d) / (rows.length - 1));
    });
    at(0.42);
  }
})();
