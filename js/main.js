window.addEventListener("DOMContentLoaded", () => {
  window.ApologyBackground.init();
  window.ApologyAnimations.init();
  window.ApologyInteractions.init();

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 450);
});
