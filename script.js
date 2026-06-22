const themeBtn = document.getElementById("themeBtn");

const icons = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 10.5 12 4l9 6.5"/><path d="M5.5 9.5V20h13V9.5"/><path d="M9 20v-6h6v6"/></svg>',
  report: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 3.5h10v17H7z"/><path d="M9.5 8h5"/><path d="M9.5 12h5"/><path d="M9.5 16h3"/></svg>',
  members: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M16.5 20a4.5 4.5 0 0 0-9 0"/><circle cx="12" cy="8" r="3.5"/><path d="M19 18.5c.7-1 1-2 1-3.2a4.3 4.3 0 0 0-3-4.1"/><path d="M5 18.5c-.7-1-1-2-1-3.2a4.3 4.3 0 0 1 3-4.1"/></svg>',
  entry: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 20h16"/><path d="M7 16.5V20"/><path d="M12 12.5V20"/><path d="M17 8.5V20"/><path d="M5.5 4.5h3l1 2h5l1-2h3"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5v-3l-2.1-.8a6.8 6.8 0 0 0-.8-1.9l1-2-2.1-2.1-2 1a6.8 6.8 0 0 0-1.9-.8L11.5 4h-3L7.7 6a6.8 6.8 0 0 0-1.9.8l-2-1-2.1 2.1 1 2a6.8 6.8 0 0 0-.8 1.9L2 10.5v3l2.1.8a6.8 6.8 0 0 0 .8 1.9l-1 2 2.1 2.1 2-1a6.8 6.8 0 0 0 1.9.8L8.5 22h3l.8-2.1a6.8 6.8 0 0 0 1.9-.8l2 1 2.1-2.1-1-2a6.8 6.8 0 0 0 .8-1.9z"/></svg>',
  theme: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 12.2A8.5 8.5 0 1 1 11.8 3 7 7 0 0 0 21 12.2Z"/></svg>'
};

const applyIcons = () => {
  document.querySelectorAll(".bottom-nav-item").forEach((link) => {
    const text = link.textContent.trim();
    const key =
      text === "Home" ? "home" :
      text === "Report" ? "report" :
      text === "Members" ? "members" :
      text === "Entry" ? "entry" :
      text === "Settings" ? "settings" : null;

    if (key && !link.querySelector("svg")) {
      link.innerHTML = `<span class="icon">${icons[key]}</span><span>${text}</span>`;
    }
  });

  if (themeBtn && !themeBtn.querySelector("svg")) {
    themeBtn.innerHTML = `${icons.theme}<span>Toggle Theme</span>`;
  }
};

const applyTheme = (isDark) => {
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem("fic-theme", isDark ? "dark" : "light");
};

const savedTheme = localStorage.getItem("fic-theme");
applyTheme(savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);

applyIcons();

themeBtn?.addEventListener("click", () => {
  applyTheme(!document.documentElement.classList.contains("dark"));
});
