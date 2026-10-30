import React, { useEffect, useRef } from 'react';

interface ProjectionCanvas3DProps {
  accentColor: string;
  secondaryGlow: string;
  scrollProgress: number;
}

interface DustMote {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  if (isNaN(num)) return [212, 175, 55];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export const ProjectionCanvas3D: React.FC<ProjectionCanvas3DProps> = ({
  accentColor,
  secondaryGlow,
  scrollProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const colorRef = useRef({ accent: hexToRgb(accentColor), secondary: hexToRgb(secondaryGlow) });
  const targetColorRef = useRef({ accent: hexToRgb(accentColor), secondary: hexToRgb(secondaryGlow) });
  const mouseRef = useRef({ x: 0.5, y: 0.3 });
  const progressRef = useRef(scrollProgress);

  useEffect(() => {
    targetColorRef.current = {
      accent: hexToRgb(accentColor),
      secondary: hexToRgb(secondaryGlow),
    };
  }, [accentColor, secondaryGlow]);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / Math.max(1, width),
        y: e.clientY / Math.max(1, height),
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Create 65 silver-halide dust motes suspended in the projector beam
    const motes: DustMote[] = Array.from({ length: 65 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: 0.2 + Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.08 - Math.random() * 0.22,
      radius: 0.7 + Math.random() * 1.8,
      alpha: 0.15 + Math.random() * 0.55,
    }));

    let time = 0;

    const render = () => {
      time += 0.012;
      // Smoothly interpolate era RGB color temperature
      const curr = colorRef.current;
      const tgt = targetColorRef.current;
      for (let i = 0; i < 3; i++) {
        curr.accent[i] += (tgt.accent[i] - curr.accent[i]) * 0.04;
        curr.secondary[i] += (tgt.secondary[i] - curr.secondary[i]) * 0.04;
      }

      const [r1, g1, b1] = curr.accent.map(Math.round);
      const [r2, g2, b2] = curr.secondary.map(Math.round);

      ctx.clearRect(0, 0, width, height);

      // Projector source origin (top-center with subtle mouse parallax)
      const srcX = width * (0.5 + (mouseRef.current.x - 0.5) * 0.08);
      const srcY = -40;

      // Volumetric Projector Beam Cone
      const beamGrad = ctx.createRadialGradient(
        srcX,
        srcY,
        10,
        srcX + (mouseRef.current.x - 0.5) * 180,
        height * 0.55,
        Math.max(width, height) * 0.85
      );
      beamGrad.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, 0.16)`);
      beamGrad.addColorStop(0.45, `rgba(${r2}, ${g2}, ${b2}, 0.06)`);
      beamGrad.addColorStop(1, 'rgba(10, 10, 12, 0)');

      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Anamorphic Light Rays
      for (let ray = -2; ray <= 2; ray++) {
        const angleSpread = ray * 0.18 + Math.sin(time + ray) * 0.02;
        const endX = srcX + Math.sin(angleSpread) * width * 0.9;
        const rayGrad = ctx.createLinearGradient(srcX, srcY, endX, height);
        rayGrad.addColorStop(0, `rgba(244, 240, 234, 0.045)`);
        rayGrad.addColorStop(0.5, `rgba(${r1}, ${g1}, ${b1}, 0.02)`);
        rayGrad.addColorStop(1, 'rgba(10, 10, 12, 0)');

        ctx.beginPath();
        ctx.moveTo(srcX - 18, srcY);
        ctx.lineTo(srcX + 18, srcY);
        ctx.lineTo(endX + 130, height);
        ctx.lineTo(endX - 130, height);
        ctx.closePath();
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }

      // Draw & update floating celluloid dust motes
      for (const m of motes) {
        m.x += m.vx + (mouseRef.current.x - 0.5) * 0.15 * m.z;
        m.y += m.vy;

        if (m.y < -10) {
          m.y = height + 10;
          m.x = Math.random() * width;
        }
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        const twinkle = 0.65 + 0.35 * Math.sin(time * 2.5 + m.x * 0.05);
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius * m.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r1}, ${g1}, ${b1}, ${(m.alpha * twinkle).toFixed(3)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
