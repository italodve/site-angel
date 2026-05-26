const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const serviceCards = document.querySelectorAll("[data-service-card]");
const serviceSelect = document.querySelector("[data-service-select]");
const periodSelect = document.querySelector("[data-period-select]");
const summaryService = document.querySelector("[data-summary-service]");
const summaryPrice = document.querySelector("[data-summary-price]");
const summaryTime = document.querySelector("[data-summary-time]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  header?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-label", "Abrir menu");
};

const updateBooking = () => {
  if (!serviceSelect) return;

  const option = serviceSelect.selectedOptions[0];
  const service = option.value;
  const price = option.dataset.price || "";
  const time = option.dataset.time || "";

  summaryService.textContent = service;
  summaryPrice.textContent = price;
  summaryTime.textContent = `${time} · ${periodSelect.value}`;

  serviceCards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.service === service);
  });
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

serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    serviceSelect.value = card.dataset.service;
    updateBooking();
    document.querySelector("#agenda")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

serviceSelect?.addEventListener("change", updateBooking);
periodSelect?.addEventListener("change", updateBooking);
updateBooking();

window.addEventListener("load", () => {
  window.lucide?.createIcons();
});
