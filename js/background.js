window.ApologyBackground = (() => {
  const canvas = document.getElementById("motionCanvas");
  if (!canvas) return { init() {} };

  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;
  let ratio = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];
  let mouse = { x: -9999, y: -9999 };

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * ratio);
    canvas.height = Math.floor(h * ratio);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    createParticles();
  }

  function createParticles() {
    const count = Math.min(120, Math.max(48, Math.floor(w / 14)));
    particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      base: Math.random() * Math.PI * 2,
      radius: Math.random() * 1.8 + 0.45,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      opacity: Math.random() * 0.42 + 0.12,
      hue: i % 3
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "rgba(255, 159, 189, 0.035)");
    bg.addColorStop(0.5, "rgba(154, 130, 255, 0.024)");
    bg.addColorStop(1, "rgba(242, 211, 151, 0.035)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    for (const p of particles) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 145) {
        const force = (145 - dist) / 145;
        p.x += (dx / (dist || 1)) * force * 1.25;
        p.y += (dy / (dist || 1)) * force * 1.25;
      }

      p.base += 0.008;
      p.x += p.vx + Math.cos(p.base) * 0.08;
      p.y += p.vy + Math.sin(p.base) * 0.08;

      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;

      const color = p.hue === 0 ? "255, 232, 239" : p.hue === 1 ? "255, 231, 183" : "221, 215, 255";
      ctx.beginPath();
      ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    connectParticles();
    requestAnimationFrame(draw);
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 116) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 218, 230, ${0.085 * (1 - distance / 116)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  function bindMouse() {
    window.addEventListener("mousemove", event => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener("mouseleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  }

  function init() {
    resize();
    bindMouse();
    draw();
    window.addEventListener("resize", resize);
  }

  return { init };
})();
