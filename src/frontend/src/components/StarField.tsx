import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleOffset: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
    };

    const generateStars = () => {
      const count = 250;
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (time: number) => {
      timeRef.current = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        const twinkle = Math.sin(time * star.speed * 100 + star.twinkleOffset);
        const alpha = star.opacity * (0.5 + 0.5 * twinkle);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Add cyan tint to some stars
        if (Math.random() < 0.002) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.2})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
