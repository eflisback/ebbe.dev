import { useEffect, useRef } from "react";
import styles from "./FlowField.module.css";

class Particle {
  public effect: Effect;
  public x: number;
  public y: number;

  constructor(effect: Effect) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.x, this.y, 50, 50);
  }
}

class Effect {
  public width: number;
  public height: number;
  public particles: Particle[];
  private numberOfParticles: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.particles = [];
    this.numberOfParticles = 50;
  }

  init() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  render(context: CanvasRenderingContext2D) {
    this.particles.forEach((particle) => {
      particle.draw(context);
    });
  }
}

export default function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "red";

    const effect = new Effect(canvas.width, canvas.height);
    effect.init();
    effect.render(ctx);
    console.log(effect);
  }, []);

  return <canvas className={styles.canvas} ref={canvasRef}></canvas>;
}
