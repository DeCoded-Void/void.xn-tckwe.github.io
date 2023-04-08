const gameContainer = document.getElementById('game-container');
gameContainer.width = window.innerWidth;
gameContainer.height = window.innerHeight;
const ctx = gameContainer.getContext('2d');
const numParticles = window.innerHeight > window.innerWidth ? 150 : 300;
const uniqueParticleUrl = './assets/voidGibulous.png';
const particleUrl = './assets/voidPixel.png';
let particles = [];
let uniqueParticle;
let bgMusic;

// Helper function to create particles
function createParticle(url, unique = false) {
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight - 50);

  const particle = {
    x: x,
    y: y,
    dx: (Math.random() * 4 - 2),
    dy: (Math.random() * 4 - 2),
    img: new Image(),
    unique: unique,
  };

  particle.img.src = url;
  return particle;
}

// Initialize particles
function initParticles() {
  // Initialize unique particle
  uniqueParticle = createParticle(uniqueParticleUrl, true);
  particles.push(uniqueParticle);

  for (let i = 0; i < numParticles; i++) {
    const particle = createParticle(particleUrl);
    particles.push(particle);
  }

  // Start moving particles
  moveParticles();
}

// DVD Screensaver effect
function moveParticles() {
  ctx.clearRect(0, 0, gameContainer.width, gameContainer.height);

  particles.forEach(particle => {
    if (!particle.clicked) {
      particle.x += particle.dx;
      particle.y += particle.dy;

      if (particle.x < 0 || particle.x + 50 > window.innerWidth) {
        particle.dx = -particle.dx;
      }

      if (particle.y < 0 || particle.y + 50 > window.innerHeight) {
        particle.dy = -particle.dy;
      }
    }

    if (!particle.fadeOut || particle.alpha > 0) {
      ctx.globalAlpha = particle.alpha;
      ctx.drawImage(particle.img, particle.x, particle.y, 50, 50);
      ctx.globalAlpha = 1;
    }

    if (particle.fadeOut && particle.alpha > 0) {
      particle.alpha -= 0.01;
    }
  });

  requestAnimationFrame(moveParticles);
}

gameContainer.addEventListener('click', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  const uniqueX = uniqueParticle.x;
  const uniqueY = uniqueParticle.y;

  if (
    x >= uniqueX && x <= uniqueX + 50 &&
    y >= uniqueY && y <= uniqueY + 50
  ) {
    victory();
  }
});

// Victory function
function victory() {
  const victorySound = new Audio('./assets/victory.wav');
  victorySound.play();
  uniqueParticle.clicked = true;

  particles.forEach(particle => {
    if (particle === uniqueParticle) {
      return;
    }

    particle.dx = 0;
    particle.dy = 0;
    particle.fadeOut = true;
    particle.alpha = 1;
  });

  setTimeout(() => {
    window.location.href = 'https://www.decodedvoid.com';
  }, 4000);
}
// Start Background Music
function startBackgroundMusic() {
if (bgMusic) {
return;
}
bgMusic = new Audio('https://fi.zophar.net/soundfiles/nintendo-ds-2sf/super-mario-64-ds/04%20BGM%20%2304%20%5BNCS_BGM_CASINO%5D.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;
bgMusic.play();
document.removeEventListener('mousedown', startBackgroundMusic);
document.removeEventListener('keydown', startBackgroundMusic);
}

document.addEventListener('mousedown', startBackgroundMusic);
document.addEventListener('keydown', startBackgroundMusic);

// Initialize the game
initParticles();
