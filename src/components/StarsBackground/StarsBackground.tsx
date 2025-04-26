import React, { useEffect, useRef } from 'react';
import './StarsBackground.css';

const StarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // **Star Class with Softer Trails**
    class Star {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
      trailLength: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.2 + 0.4; // Reduced brightness
        this.opacity = Math.random() * 0.7 + 0.3; // Softer glow
        this.speed = Math.random() * 0.12 + 0.05; // Slower movement
        this.trailLength = Math.random() * 18 + 10;
      }

      update(canvas: HTMLCanvasElement) {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = -this.trailLength;
          this.x = Math.random() * canvas.width;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // **Soft Trail with Gentle Fade**
        const trailGradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y - this.trailLength);
        trailGradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.4})`);
        trailGradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = this.radius * 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.trailLength);
        ctx.stroke();

        // **Star Core**
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // **Nebula Class - Balanced Navy-Purple Tone**
    class Nebula {
      x: number;
      y: number;
      radius: number;
      opacity: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 280 + 200; // Moderate spread
        this.opacity = Math.random() * 0.3 + 0.2; // Balanced visibility
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(80, 60, 190, ${this.opacity})`); // Blending purple & navy blue
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // **Initialize Elements**
    const stars: Star[] = Array.from({ length: Math.floor(canvas.width * canvas.height / 2800) }, () => new Star(canvas.width, canvas.height));
    const nebulae: Nebula[] = Array.from({ length: Math.floor(canvas.width / 150) }, () => new Nebula(canvas.width, canvas.height));

    const animate = () => {
      ctx.fillStyle = '#0a0815';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nebulae.forEach(nebula => nebula.draw(ctx));
      stars.forEach(star => {
        star.update(canvas);
        star.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="stars-background" />;
};

export default StarsBackground;
