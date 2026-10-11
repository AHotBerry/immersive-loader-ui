// Background Particle Engine
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(138, 173, 244, ${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function renderParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(renderParticles);
}
renderParticles();

// Sequential Progress Controller
const progressFill = document.getElementById('progress-fill');
const percentText = document.getElementById('percent-text');
const statusText = document.getElementById('status-text');

const loadingSteps = [
  { progress: 20, message: "INITIALIZING MODULES..." },
  { progress: 45, message: "CONNECTING TO SERVERS..." },
  { progress: 70, message: "COMPILING GRAPHICS ASSETS..." },
  { progress: 90, message: "FINALIZING ENVIRONMENT..." },
  { progress: 100, message: "SYSTEM READY" }
];

let currentProgress = 0;

function updateProgress() {
  if (currentProgress < 100) {
    currentProgress += 1;
    progressFill.style.width = currentProgress + '%';
    percentText.textContent = currentProgress + '%';

    // Update status text based on milestones
    for (let step of loadingSteps) {
      if (currentProgress <= step.progress) {
        statusText.textContent = step.message;
        break;
      }
    }

    // Dynamic variable speed for realism
    let delay = Math.random() * 40 + 20;
    if (currentProgress === 45 || currentProgress === 70) {
      delay = 400; // Pause briefly at key steps
    }

    setTimeout(updateProgress, delay);
  }
}

// Start sequence after short buffer
setTimeout(updateProgress, 500);
