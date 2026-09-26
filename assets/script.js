(function () {
  "use strict";

  var ROLE_STORAGE_KEY = "cv-role";
  var THEME_STORAGE_KEY = "cv-theme";
  var root = document.documentElement;
  var roleNames = ["overall", "techlead", "staff", "ai"];

  var roles = {
    overall: {
      subtitle: "Backend Tech Lead & Software Architect",
      headline: "13+ yrs high-load / high-throughput systems | 7,000 req/sec | stats core live 10+ yrs | System Design | Distributed Systems | Microservices | ClickHouse | AWS | AI-augmented development",
      title: "Vladimir Golubev — Backend Tech Lead & Software Architect",
      shareTitle: "Vladimir Golubev — Backend Tech Lead & Software Architect",
      description: "Backend Tech Lead & Software Architect — 13+ yrs high-load / high-throughput systems (7,000 req/sec, a stats core live 10+ yrs). System Design, Distributed Systems, Microservices, ClickHouse, AWS, AI-augmented development. Remote-first, Novi Sad, Serbia.",
      openTo: "Tech Lead / Backend Tech Lead / Software Architect / Solutions Architect / Staff Engineer / Principal Engineer / Backend Lead / Engineering Lead",
      pinned: ["System Design", "Software Architecture", "Technical Leadership"],
      skillOrder: ["roles", "leadership", "architecture", "runtime", "data", "cloud", "domains", "quality", "ai", "frontend", "languages"],
      allSkills: ["Backend Development", "PHP", "Laravel", "Microservices", "Distributed Systems", "Team Leadership", "Mentoring", "High-Load Systems", "Scalability", "Performance Optimization", "API Design", "REST APIs", "ClickHouse", "AWS", "Docker", "Terraform", "Redis", "MariaDB", "PostgreSQL", "MySQL", "MongoDB", "Couchbase", "DynamoDB", "OpenSearch", "NoSQL", "Database Design", "Payment Gateway Integration", "Release Management", "Incident Recovery", "Code Review", "CI/CD", "PHPUnit", "BDD / Behat", "Test Automation", "Vue.js", "Linux", "AI-Augmented Development", "Agentic AI", "LLM Tooling", "OpenHands SDK", "LLM fine-tuning", "Local LLM setup", "Python pipelines", "Python (beginner)"],
      pdfPath: "pdf/Vladimir_Golubev_Overall.pdf",
      pdfFilename: "Vladimir_Golubev_Overall.pdf"
    },
    techlead: {
      subtitle: "Backend Tech Lead",
      headline: "Team leadership | mentoring | code review | architectural sign-off | release management | system design | backend architecture",
      title: "Vladimir Golubev — Backend Tech Lead",
      shareTitle: "Vladimir Golubev — Backend Tech Lead",
      description: "Backend Tech Lead focused on team leadership, mentoring, code review, architectural sign-off, release management and system design across high-load backend platforms.",
      openTo: "Backend Tech Lead / Technical Lead / Engineering Lead / Software Architect / Solutions Architect",
      pinned: ["Technical Leadership", "Software Architecture", "System Design"],
      skillOrder: ["leadership", "architecture", "roles", "cloud", "runtime", "data", "quality", "domains", "ai", "frontend", "languages"],
      allSkills: ["Technical Leadership", "Team Leadership", "Mentoring", "Code Review", "Architectural Sign-off", "Release Management", "Incident Recovery", "Software Architecture", "System Design", "Distributed Systems", "Microservices", "High-Load Systems", "API Design", "PHP", "Laravel", "AWS", "Docker", "Terraform", "Technical Documentation", "AI-Augmented Development"],
      pdfPath: "pdf/Vladimir_Golubev_Tech_Lead.pdf",
      pdfFilename: "Vladimir_Golubev_Tech_Lead.pdf"
    },
    staff: {
      subtitle: "Staff / Senior Backend Engineer",
      headline: "13+ yrs backend engineering | 7,000 req/sec | stats core live 10+ yrs | payment gateways | microservices | MongoDB | PostgreSQL | AWS",
      title: "Vladimir Golubev — Staff Backend Engineer",
      shareTitle: "Vladimir Golubev — Staff / Senior Backend Engineer",
      description: "Staff / Senior Backend Engineer with 13+ years of hands-on backend delivery: high-throughput APIs, long-lived analytics systems, payment gateways, microservices and production optimisation.",
      openTo: "Staff Engineer / Senior Backend Engineer / Backend Tech Lead / Software Architect / Principal Engineer",
      pinned: ["System Design", "High-Load Systems", "Backend Engineering"],
      skillOrder: ["architecture", "runtime", "data", "cloud", "domains", "quality", "leadership", "roles", "ai", "frontend", "languages"],
      allSkills: ["Backend Development", "PHP", "Laravel", "System Design", "Software Architecture", "Microservices", "Distributed Systems", "High-Load Systems", "7,000 req/sec", "Scalability", "Performance Optimization", "API Design", "ClickHouse", "AWS", "Docker", "Terraform", "Redis", "MariaDB", "PostgreSQL", "MySQL", "MongoDB", "Couchbase", "DynamoDB", "OpenSearch", "Payment Gateway Integration", "Release Management", "Incident Recovery", "Code Review", "CI/CD", "PHPUnit", "BDD / Behat", "Test Automation", "Vue.js", "Linux", "AI-Augmented Development", "OpenHands SDK", "Python (beginner)"],
      pdfPath: "pdf/Vladimir_Golubev_Staff_Engineer.pdf",
      pdfFilename: "Vladimir_Golubev_Staff_Engineer.pdf"
    },
    ai: {
      subtitle: "AI Engineer / AI-Augmented Engineer",
      headline: "AI agents | full-cycle product delivery | OpenHands SDK | Claude Code | local LLMs | Python pipelines | backend architecture",
      title: "Vladimir Golubev — AI Engineer",
      shareTitle: "Vladimir Golubev — AI Engineer / AI-Augmented Engineer",
      description: "AI Engineer / AI-Augmented Engineer building agentic pipelines, tool workflows and full-cycle web products on a production backend engineering foundation.",
      openTo: "AI Engineer / AI-Augmented Engineer / Backend Tech Lead / Software Architect",
      pinned: ["AI Engineering", "Agentic AI", "System Design"],
      skillOrder: ["ai", "architecture", "runtime", "roles", "cloud", "data", "quality", "leadership", "languages"],
      allSkills: ["AI-Augmented Development", "AI Engineering", "Agentic AI", "Agents Framework", "Claude Code", "AI process automation", "Full-Cycle Product Delivery", "OpenHands SDK", "LLM fine-tuning", "Local LLM setup: OpenHands SDK + LM Studio", "Python pipelines", "Python (beginner)", "System Design", "Software Architecture", "Backend Development", "Microservices", "Distributed Systems", "PHP", "Laravel", "AWS", "Docker", "ClickHouse"],
      pdfPath: "pdf/Vladimir_Golubev_AI_Engineer.pdf",
      pdfFilename: "Vladimir_Golubev_AI_Engineer.pdf"
    }
  };

  function isRole(value) {
    return roleNames.indexOf(value) !== -1;
  }

  function storedRole() {
    try {
      return localStorage.getItem(ROLE_STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function initialRole() {
    var queryRole = null;
    try {
      queryRole = new URLSearchParams(window.location.search).get("role");
    } catch (e) {
      queryRole = null;
    }
    if (isRole(queryRole)) return queryRole;
    if (isRole(storedRole())) return storedRole();
    return "overall";
  }

  var activeRole = initialRole();

  function applyRoleClass(role) {
    roleNames.forEach(function (name) {
      root.classList.remove("role-" + name);
    });
    root.classList.add("role-" + role);
    root.setAttribute("data-role", role);
    window.__cvRole = role;
  }

  // Apply before the body is parsed so role-filtered content does not flash.
  applyRoleClass(activeRole);

  function applyTheme(theme) {
    if (theme === "dark" || theme === "light") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function currentTheme() {
    var stored = null;
    try { stored = localStorage.getItem(THEME_STORAGE_KEY); } catch (e) { stored = null; }
    if (stored === "dark" || stored === "light") return stored;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  applyTheme(currentTheme());

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function setMeta(id, value) {
    var element = document.getElementById(id);
    if (element) element.setAttribute("content", value);
  }

  function renderPinned(config) {
    var container = document.getElementById("pinned-chips");
    if (!container) return;
    container.textContent = "";
    config.pinned.forEach(function (skill) {
      var chip = document.createElement("span");
      chip.textContent = skill;
      container.appendChild(chip);
    });
  }

  function renderAllSkills(config) {
    var container = document.getElementById("all-skills-list");
    if (!container) return;
    container.textContent = "";
    config.allSkills.forEach(function (skill) {
      var chip = document.createElement("span");
      chip.textContent = skill;
      container.appendChild(chip);
    });
  }

  function reorderSkillGroups(config) {
    var stack = document.querySelector(".stack");
    if (!stack) return;
    var groups = {};
    stack.querySelectorAll(".stack-group[data-skill-group]").forEach(function (group) {
      groups[group.getAttribute("data-skill-group")] = group;
    });
    config.skillOrder.forEach(function (name) {
      if (groups[name]) stack.appendChild(groups[name]);
    });
  }

  function updateDownloadLinks(config) {
    document.querySelectorAll("[data-cv-download]").forEach(function (link) {
      link.setAttribute("href", config.pdfPath);
      link.setAttribute("data-active-pdf", config.pdfPath);
      link.setAttribute("data-download-filename", config.pdfFilename);
      if (link.tagName === "A") link.setAttribute("download", config.pdfFilename);
    });
  }

  function updateRoleUi(role) {
    var config = roles[role];
    setText("hero-subtitle", config.subtitle);
    setText("hero-headline", config.headline);
    setText("open-to-roles", config.openTo);
    setMeta("meta-description", config.description);
    setMeta("og-title", config.shareTitle);
    setMeta("og-description", config.description);
    setMeta("twitter-title", config.shareTitle);
    setMeta("twitter-description", config.description);
    document.title = config.title;

    document.querySelectorAll(".role-tab").forEach(function (button) {
      var selected = button.getAttribute("data-role") === role;
      button.setAttribute("aria-selected", String(selected));
    });
    var select = document.getElementById("role-select");
    if (select) select.value = role;

    renderPinned(config);
    renderAllSkills(config);
    reorderSkillGroups(config);
    updateDownloadLinks(config);
  }

  function updateUrl(role) {
    try {
      var url = new URL(window.location.href);
      if (role === "overall") {
        url.searchParams.delete("role");
      } else {
        url.searchParams.set("role", role);
      }
      window.history.replaceState({}, "", url.href);
    } catch (e) {
      // file:// and older browsers can still use the local state fallback.
    }
  }

  function setRole(role) {
    if (!isRole(role)) return;
    activeRole = role;
    applyRoleClass(role);
    try { localStorage.setItem(ROLE_STORAGE_KEY, role); } catch (e) { /* noop */ }
    updateUrl(role);
    updateRoleUi(role);
  }

  function printOrDownload(event) {
    event.preventDefault();
    var config = roles[activeRole];
    var trigger = event.currentTarget;
    if (!config.pdfPath || typeof window.fetch !== "function") {
      window.print();
      return;
    }

    if (trigger) trigger.setAttribute("aria-busy", "true");
    window.fetch(config.pdfPath, { cache: "no-store" })
      .then(function (response) {
        var contentType = response.headers.get("content-type") || "";
        if (!response.ok || contentType.indexOf("application/pdf") === -1) {
          throw new Error("PDF is unavailable");
        }
        return response.blob();
      })
      .then(function (blob) {
        var objectUrl = window.URL.createObjectURL(blob);
        var download = document.createElement("a");
        download.href = objectUrl;
        download.download = config.pdfFilename;
        download.hidden = true;
        document.body.appendChild(download);
        download.click();
        download.remove();
        window.setTimeout(function () {
          window.URL.revokeObjectURL(objectUrl);
        }, 1000);
      })
      .catch(function () {
        window.print();
      })
      .finally(function () {
        if (trigger) trigger.removeAttribute("aria-busy");
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateRoleUi(activeRole);

    document.querySelectorAll(".role-tab").forEach(function (button) {
      button.addEventListener("click", function () {
        setRole(button.getAttribute("data-role"));
      });
    });

    var select = document.getElementById("role-select");
    if (select) {
      select.addEventListener("change", function () {
        setRole(select.value);
      });
    }

    var toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch (e) { /* noop */ }
      });
    }

    document.querySelectorAll("[data-cv-download]").forEach(function (link) {
      link.addEventListener("click", printOrDownload);
    });
  });
})();
