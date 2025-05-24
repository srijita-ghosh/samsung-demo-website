

// Countdown Timer
const eventDate = new Date("2025-12-02T09:00:00");
function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;
  if (diff < 0) return;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}
setInterval(updateCountdown, 1000);
updateCountdown();
  


// ===== Animated Galaxy Background =====
const canvas = document.getElementById('galaxy-bg');
const ctx = canvas.getContext('2d');
let W = window.innerWidth, H = document.querySelector('.meta-hero').offsetHeight;

// Responsive resize
function resizeGalaxy() {
  W = window.innerWidth;
  H = document.querySelector('.meta-hero').offsetHeight;
  canvas.width = W;
  canvas.height = H;
}
resizeGalaxy();
window.addEventListener('resize', resizeGalaxy);

// --- Stars ---
const stars = [];
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.2 + 0.3,
    alpha: Math.random() * 0.7 + 0.2,
    twinkle: Math.random() * 0.02 + 0.01
  });
}

// --- Planets ---
const planets = [
  // Big purple planet (left)
  { r: 60, baseX: 150, baseY: 200, color: '#a259f7', speed: 0.018, angle: 0, glow: '#a259f7cc' },
  // Green planet (right)
  { r: 38, baseX: W - 200, baseY: 120, color: '#43e97b', speed: -0.012, angle: 1, glow: '#43e97b88' },
  // Blue planet (bottom left)
  { r: 28, baseX: 350, baseY: H - 120, color: '#38f9d7', speed: 0.015, angle: 2, glow: '#38f9d7aa' }
];

// --- Animation Loop ---
function animateGalaxy() {
  ctx.clearRect(0, 0, W, H);

  // Draw stars
  for (let s of stars) {
    s.alpha += (Math.random() - 0.5) * s.twinkle;
    if (s.alpha < 0.15) s.alpha = 0.15;
    if (s.alpha > 1) s.alpha = 1;
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }

  // Draw planets (move in slow orbits)
  planets.forEach((p, i) => {
    p.angle += p.speed;
    let px = p.baseX + Math.cos(p.angle) * (30 + i * 18);
    let py = p.baseY + Math.sin(p.angle) * (18 + i * 12);

    ctx.save();
    ctx.shadowColor = p.glow;
    ctx.shadowBlur = 48;
    ctx.beginPath();
    ctx.arc(px, py, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = 0.88;
    ctx.fill();
    ctx.restore();

    // Optional: planet rings
    if (i === 1) {
      ctx.save();
      ctx.strokeStyle = "#fff6";
      ctx.globalAlpha = 0.16;
      ctx.beginPath();
      ctx.ellipse(px, py, p.r + 12, p.r + 3, 0.5, 0, Math.PI * 2);
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    }
  });

  requestAnimationFrame(animateGalaxy);
}
animateGalaxy();



window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.querySelector('.parallax-bg').style.transform = `translateY(${scrolled * 0.2}px) scale(1.05)`;
  document.querySelector('.parallax-mid').style.transform = `translateY(${scrolled * 0.4}px) scale(1.02)`;
  document.querySelector('.parallax-fg').style.transform = `translateY(${scrolled * 0.6}px)`;
});
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('preloader').style.opacity = 0;
    setTimeout(() => document.getElementById('preloader').style.display = 'none', 1000);
  }, 2200);
});

document.addEventListener('mousemove', e => {
  document.body.style.backgroundPosition = `${e.clientX/10}% ${e.clientY/10}%`;
});


function handleTilt(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = (y - centerY) / 10;
  const rotateY = (x - centerX) / -10;
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function resetTilt(e) {
  e.currentTarget.style.transform = 'rotateX(0) rotateY(0)';
}

// Initialize Swiper
var swiper = new Swiper('.mySwiper', {
  loop: true,  // Enables continuous loop mode
  autoplay: {
    delay: 3000,  // Change slide every 3 seconds
    disableOnInteraction: false,  // Autoplay doesn't stop on user interaction
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

 

document.getElementById('newArrivalsCarousel');
document.getElementById('carouselLeft').onclick = () => carousel.scrollBy({left: -320, behavior: 'smooth'});
document.getElementById('carouselRight').onclick = () => carousel.scrollBy({left: 320, behavior: 'smooth'});
// Optional: Drag to scroll
let isDown = false, startX, scrollLeft;
carousel.addEventListener('mousedown', e => {
  isDown = true; carousel.classList.add('active');
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener('mouseleave', () => isDown = false);
carousel.addEventListener('mouseup', () => isDown = false);
carousel.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});


    // Fold/Unfold Animation for Foldable Phone
    const foldBtn = document.getElementById('foldBtn');
    const foldableImg = document.getElementById('foldableImg');
    let isFolded = false;
    foldBtn.onclick = () => {
      isFolded = !isFolded;
      foldableImg.style.transition = 'transform 0.7s cubic-bezier(.77,0,.18,1)';
      foldableImg.style.transform = isFolded ? 'perspective(400px) rotateY(60deg) scaleX(0.65)' : 'perspective(400px) rotateY(0deg) scaleX(1)';
      foldBtn.textContent = isFolded ? 'Unfold' : 'Fold';
    };

    // 360° Viewer (same as before)
create360Viewer('viewerFold', 'assets/fold-{index}.jpg', 24);

// Scroll reveal for heading
document.addEventListener('DOMContentLoaded', () => {
  const heading = document.querySelector('.lux-heading');

  function handleScroll() {
    const rect = heading.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      heading.classList.add('visible');
      window.removeEventListener('scroll', handleScroll);
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger once in case it's already visible
});
    
      // Initial animation
      document.querySelectorAll('.product-card, .timeline-event, .awards-section').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s, transform 0.8s';
      });
      setTimeout(revealOnScroll, 200);
    ;

// Scroll-based reveal animation (basic)
    function revealOnScroll() {
      const reveals = document.querySelectorAll('.product-card, .timeline-event, .awards-section');
      for (const el of reveals) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.style.opacity = 1;
          el.style.transform = 'translateY(0)';
        } else {
          el.style.opacity = 0;
          el.style.transform = 'translateY(40px)';
        }
      }
    }
    document.addEventListener('scroll', revealOnScroll);
    window.onload = () => {
      // Initial animation
      document.querySelectorAll('.product-card, .timeline-event, .awards-section').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s, transform 0.8s';
      });
      setTimeout(revealOnScroll, 200);
    };

    document.getElementById('newsletterForm').onsubmit = function(e) {
  e.preventDefault();
  alert('Thank you for subscribing!');
  this.reset();
};

// Newsletter form submit
document.querySelector('.newsletter-form').onsubmit = function(e) {
  e.preventDefault();
  alert('Thank you for subscribing!');
  this.reset();
};
