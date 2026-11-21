(function () {
  'use strict';

  var CATS = ['Reels', 'Promos', 'AI & Motion', 'Show Reels', 'Long Videos', 'Courses'];
  var ROLES = ['commercials', 'reels', 'AI video', 'e-learning', 'motion graphics'];
  var STRIP_IDX = [1, 6, 21, 25, 32, 36, 40, 43, 53, 55, 61, 66];

  var EXPERIENCE = [
    ['Freelance Video Editor', 'Commercial reels and social content for 30+ clients, including LOMUZ, Melitta, TOMYUM and Bab El Yaman.'],
    ['Mersat Media, Jordan', 'Promos, reels and branded content, with AI tools inside the editing workflow.'],
    ['Mazraaty Academy', '35+ online courses from raw studio recordings to final delivery, plus course promos and event coverage.'],
    ['Gate Academy', '60+ online courses with the full post-production workflow: editing, audio cleanup, visual enhancement.'],
    ['Egy Euro', 'Educational videos, podcasts and social content with one visual branding system across formats.']
  ];
  var TOOLS = [
    ['Adobe Premiere Pro', 'Main editing suite.'],
    ['After Effects', 'Motion graphics and titles.'],
    ['CapCut', 'Fast short-form turnaround.'],
    ['AI video tools', 'AI-assisted production inside real client workflows.'],
    ['Finishing', 'Color grading and audio post-production.']
  ];

  function poster(n) { return 'photos/p' + ('0' + n).slice(-2) + '.jpg'; }
  function drivePreview(id) { return 'https://drive.google.com/file/d/' + id + '/preview'; }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* stats count */
  document.getElementById('stat-count').textContent = String(VIDEOS.length);

  /* role ticker */
  var roleEl = document.getElementById('role'), ri = 0;
  setInterval(function () {
    ri = (ri + 1) % ROLES.length;
    roleEl.textContent = ROLES[ri];
    roleEl.classList.remove('swap');
    void roleEl.offsetWidth;
    roleEl.classList.add('swap');
  }, 2200);

  /* hero buttons */
  document.getElementById('btn-work').addEventListener('click', function () {
    document.getElementById('work').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  document.getElementById('btn-contact').addEventListener('click', function () {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* film strip */
  var track = document.getElementById('strip-track');
  STRIP_IDX.concat(STRIP_IDX).forEach(function (i) {
    var img = el('img');
    img.src = poster(i + 1);
    img.alt = '';
    img.loading = 'lazy';
    track.appendChild(img);
  });

  /* chips */
  var chipsEl = document.getElementById('chips');
  var current = 'all';
  function countFor(c) { return c === 'all' ? VIDEOS.length : VIDEOS.filter(function (v) { return v.cat === c; }).length; }
  ['all'].concat(CATS).forEach(function (c) {
    var b = el('button', 'chip' + (c === current ? ' on' : ''), (c === 'all' ? 'All' : c) + ' ' + countFor(c));
    b.type = 'button';
    b.dataset.cat = c;
    b.addEventListener('click', function () {
      if (current === c) return;
      current = c;
      chipsEl.querySelectorAll('.chip').forEach(function (x) { x.classList.toggle('on', x.dataset.cat === c); });
      renderGrid();
    });
    chipsEl.appendChild(b);
  });

  /* grid */
  var grid = document.getElementById('grid');
  var caption = document.getElementById('grid-caption');
  function renderGrid() {
    grid.innerHTML = '';
    var shown = [];
    VIDEOS.forEach(function (v, i) { if (current === 'all' || v.cat === current) shown.push([v, i]); });
    shown.forEach(function (pair, idx) {
      var v = pair[0], i = pair[1];
      var a = el('a', 'card');
      a.href = drivePreview(v.id);
      a.target = '_blank';
      a.rel = 'noreferrer';
      a.style.animationDelay = Math.min(idx * 35, 455) + 'ms';

      var thumb = el('span', 'thumb');
      var img = el('img');
      img.src = poster(i + 1);
      img.alt = v.title;
      img.loading = 'lazy';
      thumb.appendChild(img);
      thumb.appendChild(el('span', 'tag', v.cat));
      thumb.appendChild(el('span', 'play'));
      a.appendChild(thumb);
      a.appendChild(el('span', 'card-name', v.title));
      grid.appendChild(a);
    });
    caption.textContent = shown.length + ' of ' + VIDEOS.length + ' pieces shown. Tap a card to open its video player.';
  }
  renderGrid();

  /* rows */
  function fillRows(id, items) {
    var box = document.getElementById(id);
    items.forEach(function (it) {
      var row = el('div', 'row');
      var text = el('div', 'row-text');
      text.appendChild(el('span', 'row-name', it[0]));
      text.appendChild(el('span', 'row-detail', it[1]));
      row.appendChild(text);
      box.appendChild(row);
    });
  }
  fillRows('experience', EXPERIENCE);
  fillRows('tools', TOOLS);

  /* copy email */
  document.getElementById('btn-copy').addEventListener('click', function () {
    var btn = this;
    function done() {
      var old = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = old; }, 1500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('mmoamedadeel@gmail.com').then(done, done);
    } else {
      var t = el('textarea');
      t.value = 'mmoamedadeel@gmail.com';
      document.body.appendChild(t);
      t.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(t);
      done();
    }
  });

  /* scroll reveals */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.06 });
    revealEls.forEach(function (e) { io.observe(e); });
  } else {
    revealEls.forEach(function (e) { e.classList.add('in'); });
  }
})();
