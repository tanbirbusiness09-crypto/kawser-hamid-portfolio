"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Shared full-page Constellation Field. Draws the user-provided reference's
 * floating golden nodes and nearby linking lines using one lightweight canvas.
 * No iframe, remote CDN scripts or UI from the reference demo are embedded.
 */
export type ConstellationFieldProps = {
  mode?: "dark" | "light" | "auto";
  speed?: number;
  size?: number;
  gap?: number;
  length?: number;
  density?: number;
  strokeWidth?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

export default function ConstellationField({
  mode = "dark",
  speed = 1,
  size = 1,
  gap = 2,
  length = 1,
  density = 1,
  strokeWidth = 1,
  opacity = 1,
  hue = 0,
  saturation = 1,
  brightness = 1,
  className,
  style,
}: ConstellationFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 700px)");
    const pointer = { x: -10000, y: -10000 };
    const pointerFactor = 0.004;
    const link = 160 * clamp(length, 0.35, 2.5);
    const nodeRadius = clamp(size, 0.25, 3);
    const particleSpeed = clamp(speed, 0, 3);
    const particlesDensity = clamp(density, 0.25, 2.5);
    const lineWidth = clamp(strokeWidth, 0.25, 4);
    const spacing = clamp(gap, 0.25, 5);
    const lightMode = mode === "light" || (
      mode === "auto" && window.matchMedia("(prefers-color-scheme: light)").matches
    );
    const tone = lightMode ? "105,108,115" : "219,222,229";
    const nodes: Node[] = [];
    let width = 1;
    let height = 1;
    let raf = 0;
    let lastFrame = 0;
    let active = true;

    function initNodes() {
      nodes.length = 0;
      const count = Math.round((mobile.matches ? 32 : 76) * particlesDensity);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: (1.2 + Math.random() * 1.25) * nodeRadius,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
      if (preference.matches) draw(0, false);
    }

    function draw(now: number, update: boolean) {
      ctx!.clearRect(0, 0, width, height);
      ctx!.lineWidth = lineWidth;
      ctx!.lineCap = "round";
      const linkRadius = link / Math.sqrt(spacing / 2);
      const linkSquare = linkRadius * linkRadius;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = n.x - other.x;
          const dy = n.y - other.y;
          const sq = dx * dx + dy * dy;
          if (sq > linkSquare) continue;
          const blend = 1 - Math.sqrt(sq) / linkRadius;
          ctx!.strokeStyle = "rgba(" + tone + "," + (0.10 + 0.30 * blend).toFixed(3) + ")";
          ctx!.beginPath();
          ctx!.moveTo(n.x, n.y);
          ctx!.lineTo(other.x, other.y);
          ctx!.stroke();
        }
      }

      for (const n of nodes) {
        if (update) {
          n.x += n.vx * particleSpeed;
          n.y += n.vy * particleSpeed;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          if (dx * dx + dy * dy < 220 * 220) {
            n.x -= dx * pointerFactor;
            n.y -= dy * pointerFactor;
          }
        }
        const pulse = preference.matches ? 0.80 : 0.78 + Math.sin(now * 0.001 + n.phase) * 0.22;
        ctx!.fillStyle = "rgba(" + tone + "," + (pulse * 0.19).toFixed(3) + ")";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius * 2.8, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = "rgba(" + tone + "," + (pulse * 0.81).toFixed(3) + ")";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function frame(now: number) {
      if (!active) return;
      // Limit redraws to keep laptops, phones and background tabs responsive.
      const interval = mobile.matches ? 1000 / 24 : 1000 / 36;
      if (now - lastFrame >= interval) {
        lastFrame = now;
        draw(now, true);
      }
      raf = requestAnimationFrame(frame);
    }

    function updateAnimation() {
      cancelAnimationFrame(raf);
      active = !document.hidden && !preference.matches;
      if (active) {
        lastFrame = 0;
        raf = requestAnimationFrame(frame);
      } else {
        draw(0, false);
      }
    }

    function move(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }
    function leave() {
      pointer.x = -10000;
      pointer.y = -10000;
    }

    resize();
    updateAnimation();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", leave);
    document.addEventListener("visibilitychange", updateAnimation);
    preference.addEventListener("change", updateAnimation);
    mobile.addEventListener("change", resize);
    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", leave);
      document.removeEventListener("visibilitychange", updateAnimation);
      preference.removeEventListener("change", updateAnimation);
      mobile.removeEventListener("change", resize);
    };
  }, [mode, speed, size, gap, length, density, strokeWidth]);

  const effectiveOpacity = clamp(opacity, 0, 1);
  return (
    <div className={className} aria-hidden="true" style={{ ...style }}>
      <div className="constellation-background-base" />
      <canvas
        ref={canvasRef}
        className="constellation-background-canvas"
        style={{
          opacity: effectiveOpacity,
          filter: "hue-rotate(" + clamp(hue, -180, 180) + "deg) saturate(" +
            clamp(saturation, 0, 2) + ") brightness(" + clamp(brightness, 0.35, 1.65) + ")",
        }}
      />
      <div className="constellation-background-vignette" />
    </div>
  );
}
