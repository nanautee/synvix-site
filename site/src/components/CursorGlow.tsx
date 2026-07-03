import { useRef, useEffect } from "react";

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mx = -200;
    let my = -200;
    const trails: { x: number; y: number; life: number }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      trails.push({ x: mx, y: my, life: 0 });
      if (trails.length > 40) trails.shift();
    }

    function onLeave() {
      mx = -200;
      my = -200;
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.life++;
        const alpha = Math.max(0, 1 - t.life / 30);
        const size = 20 + t.life * 2;

        const grd = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, size);
        grd.addColorStop(0, `rgba(129, 140, 248, ${alpha * 0.12})`);
        grd.addColorStop(1, "rgba(129, 140, 248, 0)");
        ctx.fillStyle = grd;
        ctx.fillRect(t.x - size, t.y - size, size * 2, size * 2);

        if (t.life >= 30) trails.splice(i, 1);
      }

      const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
      grd.addColorStop(0, "rgba(99, 102, 241, 0.08)");
      grd.addColorStop(0.5, "rgba(139, 92, 246, 0.04)");
      grd.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = grd;
      ctx.fillRect(mx - 120, my - 120, 240, 240);

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
}
