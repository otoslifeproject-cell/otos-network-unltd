/* ============================================================================
   OTOS CONTINUITY — MICROSITE
   One script. Progressive enhancement only: every page is complete without it.
   Respects prefers-reduced-motion.
   ========================================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------- routes panel + scrim */
  var toggle = document.querySelector('[data-routes-toggle]');
  var panel = document.getElementById('routes-panel');
  var scrim = null;

  function setPanel(open) {
    if (!panel) return;
    panel.classList.toggle('open', open);
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (!scrim) {
      scrim = document.createElement('div');
      scrim.className = 'scrim';
      scrim.addEventListener('click', function () { setPanel(false); });
      document.body.appendChild(scrim);
    }
    scrim.classList.toggle('on', open);
  }

  if (toggle && panel) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      setPanel(!panel.classList.contains('open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setPanel(false);
    });
  }

  /* --------------------------------------------------------- reading bar */
  var bar = document.querySelector('.progress');
  var totop = document.querySelector('.totop');
  var ticking = false;

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var y = window.scrollY || doc.scrollTop;
    if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    if (totop) totop.classList.toggle('on', y > window.innerHeight * 1.2);
    ticking = false;
  }

  if (bar || totop) {
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  if (totop) {
    totop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------- rail index: mark position */
  var indexLinks = [].slice.call(document.querySelectorAll('.rail-index a[href^="#"]'));

  if (indexLinks.length && 'IntersectionObserver' in window) {
    var targets = indexLinks
      .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
      .filter(Boolean);

    var mark = function (id) {
      indexLinks.forEach(function (a) {
        a.setAttribute('data-active', a.getAttribute('href') === '#' + id ? 'true' : 'false');
      });
    };

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) mark(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------------------------------------------------- scroll reveal */
  var reveal = document.querySelectorAll('.rv');

  if (reduced || !('IntersectionObserver' in window)) {
    for (var i = 0; i < reveal.length; i++) reveal[i].classList.add('in');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  for (var j = 0; j < reveal.length; j++) io.observe(reveal[j]);
})();
