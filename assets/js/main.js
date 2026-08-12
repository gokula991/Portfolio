/* =========================================================
   Gokula Chandra Kulala — Portfolio
   Shared interactions: cursor spotlight, nav, tabs, reveal
   ========================================================= */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isFinePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------------- Cursor spotlight ---------------- */
  function initSpotlight() {
    if (!isFinePointer) return;

    var glow = document.createElement("div");
    glow.className = "spotlight-glow";
    var ring = document.createElement("div");
    ring.className = "spotlight-ring";
    document.body.appendChild(glow);
    document.body.appendChild(ring);

    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var glowX = targetX, glowY = targetY;
    var ringX = targetX, ringY = targetY;
    var active = false;

    window.addEventListener("mousemove", function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        active = true;
        glow.classList.add("is-active");
        ring.classList.add("is-active");
      }
    }, { passive: true });

    document.addEventListener("mouseleave", function () {
      active = false;
      glow.classList.remove("is-active");
      ring.classList.remove("is-active");
    });

    var hoverTargets = "a, button, .card, .tab-btn, input, textarea";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest && e.target.closest(hoverTargets)) {
        ring.classList.add("is-hover");
      }
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest(hoverTargets)) {
        ring.classList.remove("is-hover");
      }
    });

    function tick() {
      var glowEase = prefersReducedMotion ? 1 : 0.14;
      var ringEase = prefersReducedMotion ? 1 : 0.32;

      glowX += (targetX - glowX) * glowEase;
      glowY += (targetY - glowY) * glowEase;
      ringX += (targetX - ringX) * ringEase;
      ringY += (targetY - ringY) * ringEase;

      glow.style.transform = "translate(" + glowX + "px," + glowY + "px)";
      ring.style.transform = "translate(" + ringX + "px," + ringY + "px)";

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- Mobile nav toggle ---------------- */
  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Active nav link ---------------- */
  function markActiveNav() {
    var here = window.location.pathname.replace(/\/index\.html$/, "/");
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      var linkPath = a.pathname.replace(/\/index\.html$/, "/");
      if (linkPath === here) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------------- Tabs (Projects page) ---------------- */
  function initTabs() {
    var tabs = document.querySelectorAll(".tab-btn");
    if (!tabs.length) return;
    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        tabs.forEach(function (b) { b.setAttribute("aria-selected", "false"); });
        btn.setAttribute("aria-selected", "true");
        document.querySelectorAll(".tab-panel").forEach(function (p) {
          p.classList.remove("is-active");
        });
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        if (panel) panel.classList.add("is-active");
      });
    });
  }

  /* ---------------- Copy LinkedIn URL (Contact page) ---------------- */
  function initCopyButton() {
    var btn = document.querySelector("[data-copy]");
    if (!btn) return;
    var feedback = document.querySelector("[data-copy-feedback]");
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(text).then(function () {
        if (feedback) {
          feedback.classList.add("show");
          feedback.textContent = "Copied ✓";
          setTimeout(function () { feedback.classList.remove("show"); }, 1800);
        }
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { obs.observe(el); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSpotlight();
    initNavToggle();
    markActiveNav();
    initTabs();
    initCopyButton();
    initReveal();
  });
})();
