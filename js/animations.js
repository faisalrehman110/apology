window.ApologyAnimations = (() => {
  function reveal() {
    const items = document.querySelectorAll(".reveal, .timeline-card");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    items.forEach(item => observer.observe(item));
  }

  function timelineProgress() {
    const line = document.getElementById("timelineProgress");
    const timeline = document.querySelector(".timeline");
    if (!line || !timeline) return;

    const update = () => {
      const rect = timeline.getBoundingClientRect();
      const start = window.innerHeight * 0.76;
      const end = -rect.height * 0.12;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      line.style.height = `${progress * 100}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function activeNav() {
    const file = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".site-nav a").forEach(link => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === file || (file === "" && href === "index.html"));
    });
  }

  function init() {
    reveal();
    timelineProgress();
    activeNav();
  }

  return { init };
})();
