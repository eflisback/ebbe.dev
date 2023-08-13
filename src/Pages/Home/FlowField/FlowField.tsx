import { useEffect, useRef } from "react";
import styles from "./FlowField.module.css";

class Particle {
  public effect: Effect;
  public x: number;
  public y: number;
  private speedX: number;
  private speedY: number;
  private speedModifier: number;
  private history: { x: number; y: number }[];
  private maxLenght: number;
  private angle: number;
  private timer: number;
  private colors: string[];
  private color: string;

  constructor(effect: Effect) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.speedX = 0;
    this.speedY = 0;
    this.speedModifier = Math.floor(Math.random() * 2 + 1);
    this.history = [{ x: this.x, y: this.y }];
    this.maxLenght = Math.floor(Math.random() * 300 + 10);
    this.angle = 0;
    this.timer = this.maxLenght * 2;
    this.colors = ["#34ebe8", "#24ed4c", "#f562e6"];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 0; i < this.history.length; i++) {
      context.lineTo(this.history[i].x, this.history[i].y);
    }
    context.strokeStyle = this.color;
    context.stroke();
  }
  update() {
    this.timer--;
    if (this.timer >= 1) {
      const x = Math.floor(this.x / this.effect.cellSize);
      const y = Math.floor(this.y / this.effect.cellSize);
      const index = y * this.effect.columns + x;
      this.angle = this.effect.flowField[index];

      this.speedX = Math.cos(this.angle);
      this.speedY = Math.sin(this.angle);
      this.x += this.speedX * this.speedModifier;
      this.y += this.speedY * this.speedModifier;

      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > this.maxLenght) {
        this.history.shift();
      }
    } else if (this.history.length > 1) {
      this.history.shift();
    } else {
      this.reset();
    }
  }
  reset() {
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.history = [{ x: this.x, y: this.y }];
    this.timer = this.maxLenght * 2;
  }
}

class Effect {
  public width: number;
  public height: number;
  public particles: Particle[];
  private numberOfParticles: number;
  public rows: number;
  public columns: number;
  public cellSize: number;
  public flowField: number[];
  private curve: number;
  private zoom: number;

  constructor(
    width: number,
    height: number,
    context: CanvasRenderingContext2D
  ) {
    this.width = width;
    this.height = height;
    this.particles = [];
    this.numberOfParticles = 100;
    this.cellSize = 20;
    this.rows = 0;
    this.columns = 0;
    this.flowField = [];
    this.curve = 0.3;
    this.zoom = 0.13;
    this.init(context);
  }
  drawText(context: CanvasRenderingContext2D) {
    context.font = "350px Impact";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("ebbe.dev", this.width * 0.5, this.height * 0.5);
  }
  init(context: CanvasRenderingContext2D) {
    // Flow field
    this.rows = Math.floor(this.height / this.cellSize);
    this.columns = Math.floor(this.width / this.cellSize);
    this.flowField = [];

    this.drawText(context);

    const pixels: ImageData = context.getImageData(
      0,
      0,
      this.width,
      this.height
    );

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        const angle =
          (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
        this.flowField.push(angle);
      }
    }

    this.particles = [];
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  render(context: CanvasRenderingContext2D) {
    this.drawText(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
}

function animate(context: CanvasRenderingContext2D, effect: Effect) {
  context.fillStyle = "rgba(0, 0, 0, 1)";
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  effect.render(context);
  requestAnimationFrame(() => animate(context, effect));
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

    const effect = new Effect(canvas.width, canvas.height, ctx);
    effect.render(ctx);
    animate(ctx, effect);
  }, []);

  return <canvas className={styles.canvas} ref={canvasRef}></canvas>;
}
