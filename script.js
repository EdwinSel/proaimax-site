/* ═══════════════════════════════════════════════
   ProAiMax — script.js
═══════════════════════════════════════════════ */

/* ── Navbar scroll shadow ───────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Mobile slide panel ─────────────────────── */
const nbHamburger = document.getElementById('nbHamburger');
const nbPanel     = document.getElementById('nbPanel');
const nbOverlay   = document.getElementById('nbOverlay');
const nbClose     = document.getElementById('nbClose');

function openPanel() {
  nbPanel.classList.add('open');
  nbOverlay.classList.add('show');
  document.body.classList.add('nb-open');
  nbHamburger.classList.add('open');
  nbHamburger.setAttribute('aria-expanded', 'true');
  nbPanel.setAttribute('aria-hidden', 'false');
  nbClose.focus();
}

function closePanel() {
  nbPanel.classList.remove('open');
  nbOverlay.classList.remove('show');
  document.body.classList.remove('nb-open');
  nbHamburger.classList.remove('open');
  nbHamburger.setAttribute('aria-expanded', 'false');
  nbPanel.setAttribute('aria-hidden', 'true');
  nbHamburger.focus();
}

nbHamburger.addEventListener('click', openPanel);
nbClose.addEventListener('click', closePanel);
nbOverlay.addEventListener('click', closePanel);

// Close panel when any panel link is clicked
nbPanel.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closePanel);
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nbPanel.classList.contains('open')) closePanel();
});

/* ── Logo image fallback ────────────────────── */
const nbLogoImg      = document.querySelector('.nb-logo-img');
const nbLogoFallback = document.querySelector('.nb-logo-text');
if (nbLogoImg && nbLogoFallback) {
  nbLogoImg.addEventListener('error', () => {
    nbLogoImg.style.display = 'none';
    nbLogoFallback.style.display = 'block';
  });
}

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

/* ── Active nav link highlighting ───────────── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nb-link, .nb-panel-link');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        document.querySelectorAll(`.nb-link[href="#${entry.target.id}"], .nb-panel-link[href="#${entry.target.id}"]`)
          .forEach(a => a.classList.add('active'));
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

