(function () {
  "use strict";

  var STORAGE_KEY = "cv-theme";
  var root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark" || theme === "light") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function currentTheme() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { stored = null; }
    if (stored === "dark" || stored === "light") return stored;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  // initial paint (before DOMContentLoaded to avoid FOUC flash)
  applyTheme(currentTheme());

  document.addEventListener("DOMContentLoaded", function () {
    var toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* noop */ }
      });
    }

    // any element that should trigger print
    var printers = document.querySelectorAll("#print-btn, #print-btn-2, [data-print]");
    printers.forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        window.print();
      });
    });
  });
})();
