/* ═══════════════════════════════════════════════
   ProAiMax — script.js
═══════════════════════════════════════════════ */

/* ── Navbar scroll shadow ───────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Mobile hamburger ───────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('mobile-open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('mobile-open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* ── Back-to-top button ─────────────────────── */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Scroll-reveal (Intersection Observer) ──── */
const revealTargets = [
  // Single elements
  ...document.querySelectorAll(
    '.reveal, .fade-in-left, .fade-in-right'
  ),
];

const staggerParents = [
  ...document.querySelectorAll('.stagger-reveal, .stagger-fade'),
];

// Observe single elements
const singleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        singleObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

revealTargets.forEach(el => singleObserver.observe(el));

// Observe stagger parents — animate children with delay
const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 130);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

staggerParents.forEach(el => staggerObserver.observe(el));

/* ── ROI rows stagger + progress bars ────────── */
const roiRows = document.querySelectorAll('.roi-row.stagger-roi');

const roiObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      roiRows.forEach((row, i) => {
        setTimeout(() => {
          row.classList.add('visible');
          row.querySelectorAll('.roi-bar-fill').forEach(bar => {
            bar.style.width = (bar.dataset.width || 0) + '%';
          });
        }, i * 150);
      });
      roiObserver.disconnect();
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

const roiBody = document.querySelector('.roi-body');
if (roiBody) roiObserver.observe(roiBody);

/* ── Pain Points stats counter ──────────────── */
const ppStatNums = document.querySelectorAll('.pp-stat-num[data-count]');

if (ppStatNums.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const end    = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const dur    = 1400;
        const step   = Math.max(1, Math.ceil(end / (dur / 16)));
        let cur = 0;
        const tick = () => {
          cur = Math.min(cur + step, end);
          el.textContent = cur + suffix;
          if (cur < end) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  ppStatNums.forEach(el => counterObserver.observe(el));
}

/* ── Smooth active nav highlighting ─────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => activeObserver.observe(s));

/* ── Proof section — play button ────────────── */
const prPlayBtn = document.querySelector('.pr-play-btn');
if (prPlayBtn) {
  prPlayBtn.addEventListener('click', () => {
    // Replace href with your video URL or YouTube embed link
    window.location.href = '#';
  });
}

