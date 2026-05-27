const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  header?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-label", "Abrir menu");
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

menuToggle?.addEventListener("click", () => {
  const willOpen = !header.classList.contains("is-open");
  document.body.classList.toggle("menu-open", willOpen);
  header.classList.toggle("is-open", willOpen);
  menuToggle.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) closeMenu();
});

window.addEventListener("load", () => {
  window.lucide?.createIcons();
});
