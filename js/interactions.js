window.ApologyInteractions = (() => {
  function cursorGlow() {
    const glow = document.getElementById("cursorGlow");
    if (!glow) return;

    window.addEventListener("mousemove", event => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    });
  }

  function magnetic() {
    document.querySelectorAll(".magnetic").forEach(el => {
      el.addEventListener("mousemove", event => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  function tiltCards() {
    document.querySelectorAll(".tilt-card").forEach(card => {
      card.addEventListener("mousemove", event => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 8;
        const rotateX = (0.5 - py) * 8;

        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.removeProperty("--mx");
        card.style.removeProperty("--my");
      });
    });
  }

  function letterLogic() {
    const stayButton = document.getElementById("stayButton");
    const spaceButton = document.getElementById("spaceButton");
    const spaceResponse = document.getElementById("spaceResponse");
    const letterStage = document.getElementById("letterStage");
    const envelope = document.getElementById("envelopeButton");
    const envelopeWrap = document.getElementById("envelopeWrap");
    const paper = document.getElementById("paperLetter");

    if (!stayButton || !spaceButton || !spaceResponse || !letterStage || !envelope || !paper) return;

    stayButton.addEventListener("click", () => {
      spaceResponse.classList.remove("visible");
      letterStage.classList.add("visible");
      letterStage.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    spaceButton.addEventListener("click", () => {
      letterStage.classList.remove("visible");
      envelope.classList.remove("open");
      paper.classList.remove("open");
      if (envelopeWrap) envelopeWrap.style.display = "";
      spaceResponse.classList.add("visible");
      spaceResponse.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    envelope.addEventListener("click", () => {
      envelope.classList.add("open");
      setTimeout(() => {
        if (envelopeWrap) envelopeWrap.style.display = "none";
        paper.classList.add("open");
        paper.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 680);
    });
  }

  function init() {
    cursorGlow();
    magnetic();
    tiltCards();
    letterLogic();
  }

  return { init };
})();
