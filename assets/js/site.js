const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
const menuIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`;
const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;

const themeToggle = document.querySelector(".super-navbar__theme-toggle");

function currentTheme() {
  return document.documentElement.classList.contains("theme-dark") ? "dark" : "light";
}

function renderThemeButton() {
  if (!themeToggle) return;
  themeToggle.innerHTML = currentTheme() === "dark" ? moonIcon : sunIcon;
  themeToggle.setAttribute("aria-label", `Switch to ${currentTheme() === "dark" ? "light" : "dark"} mode`);
}

function toggleTheme() {
  const nextTheme = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.classList.remove("theme-light", "theme-dark");
  document.documentElement.classList.add(`theme-${nextTheme}`);
  try {
    localStorage.setItem("color-preference", nextTheme);
  } catch (_) {}
  renderThemeButton();
}

if (themeToggle) {
  themeToggle.setAttribute("role", "button");
  themeToggle.setAttribute("tabindex", "0");
  themeToggle.addEventListener("click", toggleTheme);
  themeToggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleTheme();
    }
  });
  renderThemeButton();
}

const menuButton = document.querySelector(".super-navbar__menu-open");
const navbar = document.querySelector(".super-navbar");

function closeMenu() {
  navbar?.querySelector(".super-navbar__menu-wrapper")?.remove();
  if (menuButton) {
    menuButton.innerHTML = menuIcon;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  }
}

function openMenu() {
  if (!navbar || !menuButton || navbar.querySelector(".super-navbar__menu-wrapper")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "super-navbar__menu-wrapper enter-done";
  wrapper.innerHTML = `<div class="super-navbar__menu"><div dir="ltr" class="super-navigation-menu__items-wrapper" style="position:relative"><div data-radix-scroll-area-viewport class="super-navigation-menu__items-viewport" style="overflow:scroll"><div style="min-width:100%;display:table"><div class="super-navigation-menu__items"><a class="notion-link super-navigation-menu__item" href="/portfolio"><div class="super-navigation-menu__item-content"><p class="super-navigation-menu__item-title">Portfolio</p></div></a><a class="notion-link super-navigation-menu__item" href="/blog"><div class="super-navigation-menu__item-content"><p class="super-navigation-menu__item-title">Blog</p></div></a></div></div></div></div></div>`;
  navbar.append(wrapper);
  menuButton.innerHTML = closeIcon;
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close menu");
}

if (menuButton) {
  menuButton.setAttribute("role", "button");
  menuButton.setAttribute("tabindex", "0");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
  menuButton.addEventListener("click", () => {
    if (navbar?.querySelector(".super-navbar__menu-wrapper")) closeMenu();
    else openMenu();
  });
  menuButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      menuButton.click();
    }
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 546) closeMenu();
});
