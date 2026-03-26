/* ═══════════════════════════════════════════════
   SOWETO MUSLIM SHURA COUNCIL — main.js
═══════════════════════════════════════════════ */

/* ── NAV: hamburger + active link ── */
(function () {
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
  }
  // highlight current page link
  const path = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
})();

/* ── SCROLL REVEAL ── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 75);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
})();

/* ── COUNT UP ── */
(function () {
  const nums = document.querySelectorAll('.stats-band__num[data-target]');
  if (!nums.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target, target = +el.dataset.target, dur = 1600, start = performance.now();
        const suffix = target >= 18 ? (target === 18 ? '' : '+') : '+';
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(ease * target).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  nums.forEach(n => io.observe(n));
})();

/* ── HADITH ENGINE ── */
(function () {
  const ahadith = [
    { arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ", text: "Actions are judged only by intentions — every person shall have what they intended.", source: "Sahih al-Bukhari 1 · Sahih Muslim 1907" },
    { arabic: "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا", text: "A believer to another believer is like a building whose different parts reinforce each other.", source: "Sahih al-Bukhari 481 · Sahih Muslim 2585" },
    { arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ", text: "None of you truly believes until he loves for his brother what he loves for himself.", source: "Sahih al-Bukhari 13 · Sahih Muslim 45" },
    { arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ", text: "The best among you are those who learn the Quran and teach it to others.", source: "Sahih al-Bukhari 5027" },
    { arabic: "إِنَّ اللَّهَ رَفِيقٌ يُحِبُّ الرِّفْقَ", text: "Verily, Allah is gentle and He loves gentleness in all matters.", source: "Sahih al-Bukhari 6927 · Sahih Muslim 2165" },
    { arabic: "الدِّينُ النَّصِيحَةُ", text: "The religion is sincere advice — for Allah, His Book, His Messenger, and for the Muslims.", source: "Sahih Muslim 55" },
    { arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ جَارَهُ", text: "Whoever believes in Allah and the Last Day, let him honour his neighbour.", source: "Sahih al-Bukhari 6019" },
    { arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ", text: "The best of people are those who bring the most benefit to others.", source: "Silsilah al-Sahihah 426" },
    { arabic: "ابْتَسَامَتُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ", text: "Your smile in the face of your brother is an act of charity.", source: "Jami' al-Tirmidhi 1956" },
    { arabic: "أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ", text: "The most beloved deeds to Allah are those done consistently, even if they are small.", source: "Sahih al-Bukhari 6465 · Sahih Muslim 783" },
    { arabic: "الطُّهُورُ شَطْرُ الإِيمَانِ", text: "Cleanliness is half of faith.", source: "Sahih Muslim 223" },
    { arabic: "يَسِّرُوا وَلَا تُعَسِّرُوا", text: "Make things easy for people, and do not make them difficult.", source: "Sahih al-Bukhari 69" }
  ];

  let current = -1, shown = 0;
  function next() { let n; do { n = Math.floor(Math.random() * ahadith.length); } while (n === current && ahadith.length > 1); return n; }

  function showHadith(ids, idx, animate) {
    const h = ahadith[idx];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const set = () => {
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id.includes('Arabic') || id.includes('arabic')) el.textContent = h.arabic;
        else if (id.includes('Source') || id.includes('source')) el.textContent = h.source;
        else el.textContent = '\u201C' + h.text + '\u201D';
      });
      shown++; current = idx;
      const cEl = document.getElementById('hCounter') || document.getElementById('sCounter');
      if (cEl) cEl.textContent = shown + ' of ' + ahadith.length + ' ahadith';
    };
    if (animate) {
      els.forEach(el => el.classList.add('fading'));
      setTimeout(() => { set(); els.forEach(el => el.classList.remove('fading')); }, 420);
    } else { set(); }
  }

  // Hero hadith
  const hRefresh = document.getElementById('hRefresh');
  if (hRefresh) {
    hRefresh.addEventListener('click', () => showHadith(['hArabic', 'hText', 'hSource'], next(), true));
    showHadith(['hArabic', 'hText', 'hSource'], next(), false);
  }
  // Sidebar hadith (blog)
  const sRefresh = document.getElementById('sRefresh');
  if (sRefresh) {
    sRefresh.addEventListener('click', () => showHadith(['sArabic', 'sText', 'sSource'], next(), true));
    showHadith(['sArabic', 'sText', 'sSource'], next(), false);
  }
})();
