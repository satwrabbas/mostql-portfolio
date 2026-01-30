/* eslint-disable react-hooks/unsupported-syntax */
"use client";
import React, { useEffect, useRef } from "react";

export default function WaterRippleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const gap = 30;
    const mouse = { x: -1000, y: -1000, radius: 150 };

    class Particle {
      x: number;
      y: number;
      px: number;
      py: number;
      vx: number;
      vy: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.px = x;
        this.py = y;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        const dx = mouse.x - this.px;
        const dy = mouse.y - this.py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          const tx = this.px - Math.cos(angle) * force * 20;
          const ty = this.py - Math.sin(angle) * force * 20;

          this.vx += (tx - this.px) * 0.2;
          this.vy += (ty - this.py) * 0.2;
        }

        this.vx += (this.x - this.px) * 0.05;
        this.vy += (this.y - this.py) * 0.05;

        this.vx *= 0.9;
        this.vy *= 0.9;

        this.px += this.vx;
        this.py += this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.px, this.py, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(148, 163, 184, 0.3)";
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
          particles.push(new Particle(x, y));
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    init();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-9999"
    />
  );
}
