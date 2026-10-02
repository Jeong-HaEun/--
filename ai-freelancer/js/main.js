// ===== 네비게이션 활성화 =====
function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ===== 햄버거 메뉴 =====
function initHamburger() {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-links');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

// ===== 스크롤 페이드인 =====
function initFadeIn() {
  const items = document.querySelectorAll('.fade-in');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => obs.observe(el));
}

// ===== 스킬바 애니메이션 =====
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}

// ===== 카운터 애니메이션 =====
function animateCount(el, target, suffix) {
  let cur = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    cur += step;
    if (cur >= target) { cur = target; clearInterval(timer); }
    el.textContent = Math.floor(cur) + suffix;
  }, 20);
}
function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.target);
        const suffix = e.target.dataset.suffix || '';
        animateCount(e.target, target, suffix);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

// ===== 포트폴리오 필터 =====
function initFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.style.display = '';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 250);
        }
      });
    });
  });
}

// ===== FAQ 아코디언 =====
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.faq-q').forEach(b => { b.classList.remove('open'); b.nextElementSibling.classList.remove('open'); });
      if (!isOpen) { btn.classList.add('open'); answer.classList.add('open'); }
    });
  });
}

// ===== 문의 폼 =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = '전송 중...';
    btn.disabled = true;
    setTimeout(() => {
      form.style.display = 'none';
      document.getElementById('successMsg').style.display = 'block';
    }, 1400);
  });
}

// ===== 초기화 =====
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initHamburger();
  initFadeIn();
  initSkillBars();
  initCounters();
  initFilter();
  initFAQ();
  initContactForm();
});
