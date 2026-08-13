// ========== Mobile Menu ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ========== Header Scroll Effect ==========
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========== Scroll Reveal Animations (Intersection Observer) ==========
const revealOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve after reveal for performance
      // revealObserver.unobserve(entry.target);
    }
  });
}, revealOptions);

// Observe all elements that should animate on scroll
document.querySelectorAll(
  '.service-card, .gallery-item, .stat, .about-visual, .contact-item, .map-container, .section-header'
).forEach(el => {
  revealObserver.observe(el);
});

// ========== Active Nav Link on Scroll ==========
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
});

// ========== Smooth color transitions for theme changes ==========
// Theme is handled purely by CSS prefers-color-scheme media query.
// No JS needed — it automatically follows the user's device setting.

// ========== Cursor Glow (soft light that follows the mouse) ==========
(function () {
  // Skip on touch devices (phones/tablets)
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let isVisible = false;

  // Smooth lag-follow animation
  function animate() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.left = currentX + 'px';
    glow.style.top  = currentY + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      isVisible = true;
      glow.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    glow.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    glow.style.opacity = '1';
  });
})();

// ========== Supabase Contact Form ==========
const SUPABASE_URL = 'https://sitrzzaussterjshhacw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdHJ6emF1c3N0ZXJqc2hoYWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1Mzk0OTksImV4cCI6MjEwMjExNTQ5OX0.Gf8u4LFYMCVvyazDqs0XNi6hntDSmhvnUX3_IbLlsjU';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !message) {
      formStatus.textContent = 'Please fill all fields.';
      formStatus.className = 'form-status error';
      return;
    }

    // Show loading
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display = 'none';
    submitBtn.querySelector('.btn-loading').style.display = 'inline';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const { data, error } = await supabaseClient
        .from('contact_messages')
        .insert([{ name, phone, message }]);

      if (error) throw error;

      formStatus.textContent = 'Message sent successfully! We will contact you soon.';
      formStatus.className = 'form-status success';
      contactForm.reset();
    } catch (err) {
      console.error(err);
      formStatus.textContent = 'Something went wrong. Please try WhatsApp instead.';
      formStatus.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').style.display = 'inline';
      submitBtn.querySelector('.btn-loading').style.display = 'none';
    }
  });
}


// force-visible: ensure content appears even if observer is slow
setTimeout(function () {
  document.querySelectorAll('.service-card, .gallery-item, .stat, .about-visual, .contact-item, .map-container, .section-header').forEach(function (el) {
    el.classList.add('visible');
  });
}, 2000);
