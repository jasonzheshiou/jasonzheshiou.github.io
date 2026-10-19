/* note.js — one behaviour for the reading edition: the running head.
   The corner word says which part of the argument you are in, the way a running head does in a book.
   Text only: no motion, no layout change, and the page reads identically without this file. */
(function () {
  "use strict";
  var now = document.querySelector(".nhead .now");
  var looks = [].slice.call(document.querySelectorAll("[data-head]"));
  var links = [].slice.call(document.querySelectorAll('.nhead nav a[href^="#"]'));
  if (!now || !looks.length || !("IntersectionObserver" in window)) { return; }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) { return; }
      now.textContent = en.target.getAttribute("data-head");
      for (var i = 0; i < links.length; i++) {
        links[i].classList.toggle("on", links[i].getAttribute("href") === "#" + en.target.id);
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  looks.forEach(function (s) { io.observe(s); });
})();
