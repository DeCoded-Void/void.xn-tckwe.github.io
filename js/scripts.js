const gameContainer = document.getElementById('game-container');
const numParticles = window.innerHeight > window.innerWidth ? 150 : 300;
const uniqueParticleUrl = './assets/voidGibulous.png';
let uniqueParticle;
let bgMusic;

// Helper function to create particles
function createParticle(url, unique = false) {
    const img = document.createElement('img');
    img.src = url;
    img.className = 'particle';
    img.style.position = 'fixed';
    img.style.pointerEvents = unique ? 'auto' : 'none';
    const particleSize = (window.innerHeight * 0.05);
    img.style.height = particleSize + 'px';
    img.style.width = particleSize + 'px';
    img.style.zIndex = unique ? '1' : '2';
  
    // Calculate the initial position accounting for the particle's width
    img.style.left = Math.random() * (window.innerWidth - particleSize) + 'px';
    img.style.top = Math.random() * (window.innerHeight - particleSize) + 'px';
  
    return img;
  }
  

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


// Initialize particles
function initParticles() {
    // Initialize unique particle
    uniqueParticle = createParticle(uniqueParticleUrl, true);
    uniqueParticle.dataset.dx = (Math.random() * 4 - 2);
    uniqueParticle.dataset.dy = (Math.random() * 4 - 2);
    uniqueParticle.addEventListener('click', () => {
      victory();
    });
    gameContainer.appendChild(uniqueParticle);
  
    for (let i = 0; i < numParticles; i++) {
      const particleUrl = './assets/voidPixel.png';
      const particle = createParticle(particleUrl);
      particle.dataset.dx = (Math.random() * 4 - 2);
      particle.dataset.dy = (Math.random() * 4 - 2);
      gameContainer.appendChild(particle);
    }
  
    // Start moving particles
    moveParticles();
  }
  
  // DVD Screensaver effect
  function moveParticles() {
    const particles = document.querySelectorAll('.particle');
  
    particles.forEach(particle => {
      if (particle === uniqueParticle && particle.dataset.clicked === 'true') {
        return;
      }
  
      const dx = parseFloat(particle.dataset.dx);
      const dy = parseFloat(particle.dataset.dy);
      let x = parseFloat(particle.style.left);
      let y = parseFloat(particle.style.top);
  
      x += dx;
      y += dy;
  
      if (x < 0 || x + parseFloat(particle.style.width) > window.innerWidth) {
        particle.dataset.dx = -dx;
        x += -2 * dx;
      }
  
      if (y < 0 || y + parseFloat(particle.style.height) > window.innerHeight) {
        particle.dataset.dy = -dy;
        y += -2 * dy;
      }
  
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
    });
  
    requestAnimationFrame(moveParticles);
  }
  

// Victory function
function victory() {
  const victorySound = new Audio('./assets/victory.wav');
  victorySound.play();
  uniqueParticle.dataset.clicked = 'true';

  const particles = document.getElementsByClassName('particle');
  for (let particle of particles) {
    if (particle === uniqueParticle) {
      continue;
    }
    particle.style.transition = 'opacity 1s';
    particle.style.opacity = 0;
}
setTimeout(() => {
window.location.href = 'https://www.decodedvoid.com';
}, 4000);
}

// Initialize the game
initParticles();
