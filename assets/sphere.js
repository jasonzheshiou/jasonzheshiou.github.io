/*
 * The ecosystem drawing. Own code, no libraries, nothing loaded from anywhere else.
 *
 * One root is one [data-duo] element: it holds the discs, the lines, the identifiers and the
 * note line, and lights them together. A page may split the same ecosystem into several roots
 * — the drawing in one column, the project cards in another — and give them the same
 * data-group, and pulling on either end pulls on both.
 *
 * Everything that changes behaviour is opt-in by attribute, so the reading edition's front page
 * keeps its quiet version and only the pages that ask get the extra machinery:
 *
 *   data-counts="name:4:2|other:0:1"   a lit disc states its numbers
 *   data-pin="on"                      click holds a disc lit; click again opens the repository
 *   data-group="eco"                   roots with the same group light together
 */
(() => {
  const LINKS = new Map();   // group -> the paint functions of every root in it
  const TOUCH = window.matchMedia ? window.matchMedia("(hover: none)") : { matches: false };

  // Anything in the prose can light the drawing: an element carrying data-light="Repo_Name"
  // behaves like a disc for the reader's mouse, which lets a sentence or a door drive the shape.
  function lightGroup(group, id) {
    (LINKS.get(group) || []).forEach((paint) => paint(id));
  }

  document.querySelectorAll("[data-duo]").forEach((root) => {
    const cap = root.querySelector("[data-caption]");
    const idle = cap ? cap.innerHTML : "";
    const svg = root.querySelector("svg");
    const glow = root.querySelector("[data-glow]");
    const nodes = [...root.querySelectorAll("[data-node]")];
    const edges = [...root.querySelectorAll("[data-edge]")];
    const labels = [...root.querySelectorAll("[data-lab]")];
    const group = root.dataset.group || null;
    const counts = {};
    if (root.dataset.counts) {
      root.dataset.counts.split("|").forEach((pair) => {
        const bits = pair.split(":");
        counts[bits[0]] = [bits[1], bits[2]];
      });
    }

    // which repositories a repository names, straight off the drawn lines
    const out = {};
    edges.forEach((e) => {
      const [a, b] = e.dataset.edge.split(" ");
      (out[a] = out[a] || []).push(b);
    });

    let lit = null;
    let pinned = null;

    function paint(id) {
      lit = id || null;
      root.classList.toggle("lit-mode", !!lit);
      nodes.forEach((n) => {
        const k = n.dataset.node;
        const far = !!lit && k !== lit && (out[lit] || []).includes(k);
        n.classList.toggle("lit", !!lit && (k === lit || far));
        n.classList.toggle("far", far);
      });
      labels.forEach((l) => l.classList.toggle("on", !!lit && l.dataset.lab === lit));
      edges.forEach((e) => e.classList.toggle("lit", !!lit && e.dataset.edge.split(" ")[0] === lit));
      if (!cap) return;
      if (!lit) { cap.innerHTML = idle; return; }
      const src = nodes.find((n) => n.dataset.node === lit);
      cap.innerHTML = (src && src.dataset.note) ||
        "<i>Nothing here is named by another repository. That is a result, not a gap in the drawing.</i>";
      if (counts[lit]) {
        cap.innerHTML += ` <span class="cnt">&middot; named by ${counts[lit][0]} of the others` +
          ` &middot; names ${counts[lit][1]}</span>`;
      }
    }

    function show(id) {
      if (lit === id) return;
      paint(id);
      if (group) LINKS.get(group).forEach((fn) => fn(id));
    }
    function clear() {
      if (!lit) return;
      paint(pinned);
      if (group) LINKS.get(group).forEach((fn) => fn(pinned));
    }

    if (group) LINKS.set(group, [...(LINKS.get(group) || []), (id) => paint(id)]);

    nodes.forEach((n) => {
      const id = n.dataset.node;
      n.addEventListener("mouseenter", () => show(id));
      n.addEventListener("focus", () => show(id));
      n.addEventListener("mouseleave", clear);
      n.addEventListener("blur", clear);
    });

    // the pointer lights the area it moves over, slightly
    if (glow && svg && typeof svg.createSVGPoint === "function") {
      const pt = svg.createSVGPoint();
      svg.addEventListener("pointermove", (e) => {
        const m = svg.getScreenCTM();
        if (!m) return;
        pt.x = e.clientX;
        pt.y = e.clientY;
        const p = pt.matrixTransform(m.inverse());
        glow.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
        glow.style.opacity = "1";
      });
      svg.addEventListener("pointerleave", () => (glow.style.opacity = "0"));
    }

    // a phone has no hover: tap once to light and name, tap the same disc again to open it
    if (TOUCH.matches) {
      nodes.filter((n) => n.closest("svg")).forEach((n) => {
        const id = n.dataset.node;
        let armed = false;
        n.addEventListener("click", (e) => {
          if (armed) { armed = false; return; }
          e.preventDefault();
          show(id);
          armed = true;
        });
      });
    } else if (root.dataset.pin === "on") {
      // on a mouse, a click holds a disc lit while it is being read; the next click opens it
      nodes.filter((n) => n.closest("svg")).forEach((n) => {
        const id = n.dataset.node;
        n.addEventListener("click", (e) => {
          if (pinned === id) { pinned = null; return; }
          e.preventDefault();
          pinned = id;
          show(id);
        });
      });
    }

    // on a phone the drawing is cropped to the sphere: the identifier ring is the widest thing in
    // it, so the ring goes and the names come through the note line under the drawing instead
    if (svg && window.matchMedia) {
      const full = svg.getAttribute("viewBox");
      const mq = window.matchMedia("(max-width:700px)");
      const crop = svg.getAttribute("data-crop") || "336 26 448 500";
      const set = () => svg.setAttribute("viewBox", mq.matches ? crop : full);
      set();
      mq.addEventListener ? mq.addEventListener("change", set) : mq.addListener(set);
    }

    // held states, for review without a mouse
    if (glow && svg) {
      const g = new URLSearchParams(location.search).get("glow");
      if (g) {
        const [x, y] = g.split(",").map(Number);
        glow.setAttribute("transform", `translate(${x} ${y})`);
        glow.style.opacity = "1";
      }
    }
    const held = new URLSearchParams(location.search).get("lit");
    if (held && nodes.some((n) => n.dataset.node === held)) show(held);
  });
  document.querySelectorAll("[data-light]").forEach((el) => {
    const group = el.dataset.lightGroup || "eco";
    const id = el.dataset.light.split(",")[0];
    const on = () => lightGroup(group, id);
    const off = () => lightGroup(group, null);
    el.addEventListener("mouseenter", on);
    el.addEventListener("focus", on);
    el.addEventListener("mouseleave", off);
    el.addEventListener("blur", off);
  });
})();
