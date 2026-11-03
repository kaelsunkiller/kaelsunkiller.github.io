(() => {
 'use strict';
 const D = window.SITE_DATA, P = window.SITE_PROFILE, page = document.body.dataset.page;
 const params = new URLSearchParams(location.search);
 const stored = (() => { try { return localStorage.getItem('ly-language'); } catch { return null; } })();
 let lang = ['en', 'zh'].includes(params.get('lang')) ? params.get('lang') : ['en', 'zh'].includes(stored) ? stored : 'en';

 const UI = {
  en: {research: 'Research', portfolio: 'Portfolio', systems: 'Systems', publications: 'Publications', background: 'Background', contact: 'Contact', menu: 'Menu',
   email: 'Email me', researchTitle: 'Research directions',
   workTitle: 'Selected projects', systemsTitle: 'Systems & demos', pubsTitle: 'Publications', published: 'Published', review: 'Under review & in preparation',
   bgTitle: 'Background', education: 'Education', engineering: 'Engineering', grants: 'Funded projects', service: 'Academic service', honors: 'Honors',
   beyond: 'Beyond research', readnote: 'Read the note', next: 'Research outlook', talk: 'Get in touch', allWork: 'All work', more: 'Full portfolio',
   details: 'Method, contribution & evidence', question: 'Research question', method: 'Method', contribution: 'My contribution', evidence: 'Evidence', figs: 'figures',
   portfolioLabel: 'Research portfolio · 2021–2026', portfolioTitle: 'From visual evidence to clinical understanding', talks: 'Talks', talksTitle: 'Talks',
   recording: 'SS-ACL · ACM MM 2025 presentation', play: 'Play', cached: 'Cached-mode recording', gallery: 'View screenshots', paper: 'Paper', code: 'Code',
   footnote: 'Numbers are as reported in each paper or the dissertation, under that work’s own settings. Original figures keep the language of the source manuscripts.',
   updated: 'Updated October 2026', top: 'Back to top', close: 'Close', prev: 'Previous', next2: 'Next', skip: 'Skip to content', certificate: 'IEEE SMC 2026 reviewer certificate', count: 'projects'},
  zh: {research: '研究', portfolio: '作品集', systems: '系统', publications: '论文', background: '经历', contact: '联系', menu: '菜单',
   email: '发邮件', researchTitle: '研究方向',
   workTitle: '代表项目', systemsTitle: '系统与演示', pubsTitle: '论文', published: '已发表', review: '审稿中与准备中',
   bgTitle: '教育与经历', education: '教育经历', engineering: '工程能力', grants: '参与项目', service: '学术服务', honors: '荣誉',
   beyond: '研究之外', readnote: '读这篇小记', next: '未来方向', talk: '欢迎联系', allWork: '全部工作', more: '完整作品集',
   details: '方法、贡献与实验依据', question: '研究问题', method: '方法思路', contribution: '个人贡献', evidence: '实验依据', figs: '张图',
   portfolioLabel: '研究作品集 · 2021—2026', portfolioTitle: '从视觉证据到临床理解', talks: '报告', talksTitle: '学术报告',
   recording: 'SS-ACL · ACM MM 2025 研究展示', play: '播放', cached: '缓存模式录屏', gallery: '查看截图', paper: '论文', code: '代码',
   footnote: '数值均引自对应论文或博士论文，以原文实验设置为准。原始图表保留源稿件语言。',
   updated: '更新于 2026 年 10 月', top: '返回顶部', close: '关闭', prev: '上一张', next2: '下一张', skip: '跳转到正文', certificate: 'IEEE SMC 2026 审稿证书', count: '项工作'}
 };

 const e = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
 const t = v => v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v;
 const marks = s => e(s).replace(/\[\[(.+?)\]\]/g, '<mark>$1</mark>');
 const im = n => 'assets/images/' + n, vid = n => 'assets/videos/' + n;
 const q = (k = '') => `?lang=${lang}${k}`;
 const home = page === 'home' ? '' : `index.html${q()}`;
 const ext = (label, url, cls = '') => `<a class="${cls}" href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(label)}<span class="arr">↗</span></a>`;
 const project = id => D.research.find(p => p.id === id);
 const short = id => P.short[id] || t(project(id).name);
 const ground = (inner, tag = '') => `<span class="ground"${tag ? ` data-tag="${e(tag)}"` : ''}>${inner}<i class="scan" aria-hidden="true"></i></span>`;
 const chars = s => [...s].map((c, i) => `<i style="--i:${i}">${c === ' ' ? '&nbsp;' : e(c)}</i>`).join('');
 const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
 const label = (n, s) => `<p class="label"><span>${n}</span>${e(s)}</p>`;
 const zoom = (file, caption, group, inner) => `<button class="zoom" data-src="${e(im(file))}" data-caption="${e(caption)}" data-group="${e(group)}" aria-label="${e(caption)}">${inner}</button>`;
 const year = p => (t(p.status).match(/20\d\d/) || [''])[0];

 function topbar() {
  const u = UI[lang], h = home || '';
  const items = [['research', `${h}#research`], ['portfolio', `portfolio.html${q()}`], ['systems', page === 'portfolio' ? '#systems' : `${h}#systems`], ['publications', `${h}#publications`], ['background', `${h}#background`], ['contact', '#contact']];
  const name = t(D.name), other = lang === 'en' ? D.name.zh : D.name.en;
  return `<header class="topbar"><div class="wrap topbar-inner">
   <a class="wordmark" href="index.html${q()}">${ground('<span class="wm-dot"></span>')}<span class="wm-name">${e(name)}</span><span class="wm-alt">${e(other)}</span></a>
   <nav class="nav" id="nav" aria-label="Primary">${items.map(([k, href]) => `<a href="${href}" data-nav="${k}" class="${(k === 'portfolio' && page === 'portfolio') ? 'active' : ''}">${u[k]}</a>`).join('')}</nav>
   <div class="tools"><button class="lang" data-lang-toggle aria-label="${lang === 'en' ? '切换到中文' : 'Switch to English'}"><span class="${lang === 'en' ? 'on' : ''}">EN</span><span class="${lang === 'zh' ? 'on' : ''}">中</span></button>
   <button class="menu" aria-expanded="false" aria-controls="nav">${u.menu}</button></div></div><span class="progress" aria-hidden="true"></span></header>`;
 }

 const sect = (id, n, lbl, title, body, cls = '') => `<section class="section reveal ${cls}" id="${id}"><div class="wrap"><header class="sec-head">${label(n, lbl)}${title ? `<h2>${e(title)}</h2>` : ''}</header><div class="sec-body">${body}</div></div></section>`;

 function proof() {
  return `<div class="proof">${P.proof.map(x => `<div><strong>${e(t(x.k))}</strong><span>${e(t(x.v))}</span></div>`).join('')}</div>`;
 }

 function pillars(asFilter) {
  const u = UI[lang];
  return `<div class="pillars ${asFilter ? 'as-filter' : ''}">${P.pillars.map(p => {
   const chips = p.projects.map(id => asFilter ? `<a href="#${id}">${e(short(id))}</a>` : `<a href="portfolio.html${q()}#${id}">${e(short(id))}</a>`).join('')
    + (p.demos || []).map(id => `<a class="demo-chip" href="${page === 'portfolio' ? '' : `portfolio.html${q()}`}#${id}">${e(t(P.short[id]))}</a>`).join('');
   const head = `<span class="pn">${p.n}</span><h3>${e(t(p.name))}</h3><p>${e(t(p.desc))}</p>`;
   return `<div class="pillar" data-pillar="${p.id}">${asFilter ? `<button class="pillar-btn" data-filter="${p.id}" aria-pressed="false">${head}</button>` : head}<div class="chips">${chips}</div></div>`;
  }).join('')}</div>${asFilter ? `<div class="filter-bar"><button data-filter="all" aria-pressed="true">${u.allWork}</button><span class="filter-count" aria-live="polite"></span></div>` : ''}`;
 }

 function cover(p, group) {
  const f = p.figures[0];
  if (!f) return ground(`<div class="diagram"><span>${lang === 'en' ? '5 imaging modalities' : '5 类影像模态'}</span><i></i><span>${lang === 'en' ? 'Information decomposition' : '信息分解'}</span><i></i><span>${lang === 'en' ? '21 clinical tasks' : '21 项临床任务'}</span></div>`, P.tag[p.id]);
  return zoom(f.file, t(f.caption), group || p.id, ground(`<img loading="lazy" src="${im(f.file)}" alt="${e(t(f.caption))}">`, P.tag[p.id]));
 }

 function workCard(id) {
  const p = project(id), u = UI[lang];
  return `<article class="card">${cover(p, 'work-' + id)}<p class="meta">${e(t(p.status))}</p><h3><a href="portfolio.html${q()}#${id}">${e(t(p.name))}</a></h3><p class="headline">${e(t(P.headline[id]))}</p><a class="more-link" href="portfolio.html${q()}#${id}">${u.details}<span class="arr">→</span></a></article>`;
 }

 function systemCard(d) {
  const u = UI[lang], stack = (P.stack[d.id] || []).map(s => `<span>${e(s)}</span>`).join('');
  const media = d.video
   ? `<button class="poster" data-video="${e(vid(d.video))}" data-poster="${e(im(d.cover))}" data-caption="${e(t(d.name))}" aria-label="${u.play}: ${e(t(d.name))}">${ground(`<img loading="lazy" src="${im(d.cover)}" alt="">`, t(d.mode))}<span class="play" aria-hidden="true"></span></button>`
   : zoom(d.cover, t(d.name), 'sys-' + d.id, ground(`<img loading="lazy" src="${im(d.cover)}" alt="${e(t(d.name))}">`, t(d.mode)));
  const extra = d.id === 'visionscope'
   ? `<button class="text-btn" data-video="${vid('visionscope-cached-demo.mp4')}" data-poster="${im('visionscope-01-home.png')}" data-caption="${e(u.cached)}">${u.cached}<span class="arr">→</span></button>`
   : d.gallery.length ? `${d.gallery.map(f => `<button class="hidden-zoom" data-src="${e(im(f))}" data-caption="${e(t(d.name))}" data-group="sys-${d.id}" tabindex="-1" aria-hidden="true"></button>`).join('')}<button class="text-btn" data-open-group="sys-${d.id}">${u.gallery} (${d.gallery.length + 1})<span class="arr">→</span></button>` : '';
  return `<article class="card system" id="${d.id}">${media}<h3>${e(t(d.name))}</h3><p>${e(t(d.summary))}</p><div class="stack">${stack}</div>${extra}</article>`;
 }

 function pubRow(p) {
  const u = UI[lang];
  const authors = (p.authors || '').replace('Longzhen Yang', '<b>Longzhen Yang</b>');
  const links = p.links.map(l => ext(t(l.label), l.url)).join('');
  return `<li class="pub"><span class="pub-year">${year(p) || '—'}</span><div><a class="pub-title" href="portfolio.html${q()}#${p.id}">${e(t(p.title))}</a>${authors ? `<p class="pub-authors">${authors}</p>` : ''}<p class="pub-venue">${e(t(p.status))}<span class="role">${e(t(p.role))}</span></p>${links ? `<p class="pub-links">${links}</p>` : ''}</div></li>`;
 }

 function homePage() {
  const u = UI[lang], name = t(D.name), other = lang === 'en' ? D.name.zh : D.name.en;
  const hero = `<section class="hero field"><div class="wrap">
   <div class="hero-id"><div class="hero-portrait">${zoom('portrait-headshot.jpg', name, 'portrait', ground(`<img src="${im('portrait-headshot.jpg')}" alt="${e(name)}">`, 'researcher · 0.99'))}</div>
   <div><p class="label">${e(t(P.eyebrow))}</p><h1 class="name" aria-label="${e(name)}"><span class="chars" aria-hidden="true">${chars(name)}</span><span class="alt">${e(other)}</span></h1></div></div>
   <div class="hero-grid"><p class="lead">${marks(t(P.identity))}</p>
   <div class="hero-side"><p class="hero-body">${e(t(P.hero))}</p><p class="status"><i aria-hidden="true"></i>${e(t(P.availability))}</p>
   <div class="cta"><a class="btn primary" href="mailto:${D.email}">${u.email}</a>${ext('Google Scholar', D.scholar, 'btn')}${ext('GitHub', D.github, 'btn')}</div></div></div>
   ${proof()}</div></section>`;
  const published = ['ssacl', 'midol', 'radlas', 'xmid', 'vat'], pending = ['sfm', 'gmvlp', 'snot'];
  const bg = `<div class="bg-grid">
   <div><h3>${u.education}</h3><ul class="plain">${D.education.map(x => `<li><span class="date">${e(x.date)}</span><strong>${e(t(x.name))}</strong><span>${e(t(x.degree))}</span>${t(x.detail) ? `<small>${e(t(x.detail))}</small>` : ''}</li>`).join('')}</ul></div>
   <div><h3>${u.engineering}</h3><ul class="plain">${D.skills.map(x => `<li><strong>${e(t(x)[0])}</strong><span>${e(t(x)[1])}</span></li>`).join('')}</ul></div>
   <div><h3>${u.grants}</h3><ul class="plain">${D.projects_grants.map(x => `<li><strong>${e(t(x)[0])}</strong><span>${e(t(x)[1])}</span></li>`).join('')}</ul></div>
  </div><div class="bg-grid two">
   <div><h3>${u.honors}</h3><ul class="plain honors">${P.honors.map(h => `<li>${e(t(h))}</li>`).join('')}</ul></div>
   <div class="service"><div><h3>${u.service}</h3><p>${e(t(P.service))}</p></div>${zoom('reviewer-smc2026.png', u.certificate, 'cert', ground(`<img loading="lazy" src="${im('reviewer-smc2026.png')}" alt="${e(u.certificate)}">`))}</div>
  </div>`;
  const beyond = `<div class="beyond">
   <figure>${zoom('personal-swimming.jpg', lang === 'en' ? 'Swimming and training' : '游泳与运动', 'beyond', `<img loading="lazy" src="${im('personal-swimming.jpg')}" alt="">`)}<figcaption>${e(t(P.personal))}</figcaption></figure>
   <a class="note-card" href="journal.html${q()}"><img loading="lazy" src="${im(D.journal.photo)}" alt=""><span class="meta">${u.beyond}</span><strong>${e(t(D.journal.title))}</strong><span>${e(t(D.journal.excerpt))}</span><span class="more-link">${u.readnote}<span class="arr">→</span></span></a>
  </div>`;
  return hero
   + sect('research', '01', '/ 06', u.researchTitle, pillars(false))
   + sect('work', '02', '/ 06', u.workTitle, `<div class="cards three">${['ssacl', 'sfm', 'snot'].map(workCard).join('')}</div><a class="more-link big" href="portfolio.html${q()}">${u.more}<span class="arr">→</span></a>`)
   + sect('systems', '03', '/ 06', u.systemsTitle, `<div class="cards three">${D.demos.map(systemCard).join('')}</div>`)
   + sect('publications', '04', '/ 06', u.pubsTitle, `<div class="pubs"><h3>${u.published}</h3><ol>${published.map(id => pubRow(project(id))).join('')}</ol><h3>${u.review}</h3><ol>${pending.map(id => pubRow(project(id))).join('')}</ol></div>`)
   + sect('background', '05', '/ 06', u.bgTitle, bg)
   + sect('beyond', '06', '/ 06', u.beyond, beyond);
 }

 function projectRow(p) {
  const u = UI[lang], pillar = P.pillars.find(x => x.projects.includes(p.id));
  const blocks = [['question', 'problem'], ['method', 'method'], ['contribution', 'contribution'], ['evidence', 'evidence']].map(([k, f]) => `<div><h4>${u[k]}</h4><p>${e(t(p[f]))}</p></div>`).join('');
  const thumbs = p.figures.length ? `<div class="thumbs">${p.figures.map((f, i) => zoom(f.file, t(f.caption), p.id, `<img loading="lazy" src="${im(f.file)}" alt=""><span>Fig. ${i + 1} — ${e(t(f.caption))}</span>`)).join('')}</div>` : '';
  const links = p.links.map(l => ext(t(l.label), l.url)).join('');
  return `<article class="project reveal" id="${p.id}" data-pillar="${pillar ? pillar.id : ''}">
   <div class="project-media">${cover(p)}</div>
   <div class="project-body"><p class="meta">${pillar ? `<span class="pn">${pillar.n}</span>` : ''}${e(t(p.status))}</p><h3>${e(t(p.name))}</h3><p class="role">${e(t(p.role))}</p>
   <p class="headline">${e(t(P.headline[p.id]))}</p><p class="summary">${e(t(p.summary))}</p>${links ? `<p class="pub-links">${links}</p>` : ''}
   <details class="more"><summary>${u.details}${p.figures.length ? ` · ${p.figures.length} ${u.figs}` : ''}</summary><div class="blocks">${blocks}</div>${thumbs}</details></div>
  </article>`;
 }

 function portfolioPage() {
  const u = UI[lang], ordered = P.pillars.flatMap(x => x.projects).map(project);
  const talks = [{file: 'ssacl-presentation.mp4', poster: 'ssacl-talk-poster.jpg', title: u.recording}];
  if (D.liveTalk) talks.push({file: D.liveTalk.file, poster: D.liveTalk.poster, title: t(D.liveTalk.title)});
  return `<section class="hero compact field"><div class="wrap"><p class="label">${e(u.portfolioLabel)}</p><h1>${e(u.portfolioTitle)}</h1><p class="lead">${e(t(P.dissertation))}</p>${pillars(true)}</div></section>
   <section class="section" id="projects"><div class="wrap">${ordered.map(projectRow).join('')}<p class="footnote">${e(u.footnote)}</p></div></section>
   ${sect('systems', '01', '/ 02', u.systemsTitle, `<div class="cards three">${D.demos.map(systemCard).join('')}</div>`)}
   ${sect('talks', '02', '/ 02', u.talksTitle, `<div class="cards two">${talks.map(x => `<article class="card system"><button class="poster" data-video="${vid(x.file)}" data-poster="${im(x.poster)}" data-caption="${e(x.title)}" aria-label="${u.play}: ${e(x.title)}">${ground(`<img loading="lazy" src="${im(x.poster)}" alt="">`)}<span class="play" aria-hidden="true"></span></button><h3>${e(x.title)}</h3></article>`).join('')}</div>`)}`;
 }

 function journalPage() {
  const u = UI[lang], j = D.journal;
  return `<article class="journal wrap narrow field"><p class="label">${e(u.beyond)}</p><h1>${e(t(j.title))}</h1><p class="lead">${e(t(j.subtitle))}</p>
   <figure>${zoom(j.photo, t(j.caption), 'journal', `<img src="${im(j.photo)}" alt="${e(t(j.caption))}">`)}<figcaption>${e(t(j.caption))}</figcaption></figure>
   <div class="prose">${t(j.paragraphs).map(p => `<p>${e(p)}</p>`).join('')}</div><p><a class="more-link" href="index.html${q('#beyond')}"><span class="arr back">←</span>${u.beyond}</a></p></article>`;
 }

 function footer() {
  const u = UI[lang];
  return `<footer class="contact reveal" id="contact"><div class="wrap"><div class="contact-grid"><div>${label('—', u.next)}<p class="outlook">${e(t(P.outlook))}</p></div>
   <div><p class="talk">${u.talk}</p><a class="mail" href="mailto:${D.email}">${D.email}</a><p class="contact-links">${ext('Google Scholar', D.scholar)}${ext('GitHub', D.github)}</p></div></div>
   <div class="footline"><span>© 2026 ${e(t(D.name))} · ${u.updated}</span><a href="#top">${u.top} ↑</a></div></div></footer>`;
 }

 // Viewer: one dialog for image galleries and videos; the video element only exists while the dialog is open.
 const viewer = document.getElementById('viewer');
 let gallery = [], index = 0;
 function showImage() {
  const item = gallery[index];
  viewer.querySelector('.viewer-stage').innerHTML = `<img src="${e(item.src)}" alt="${e(item.caption)}">`;
  viewer.querySelector('.viewer-caption').textContent = item.caption;
  viewer.querySelector('.viewer-count').textContent = gallery.length > 1 ? `${index + 1} / ${gallery.length}` : '';
  viewer.classList.toggle('single', gallery.length < 2);
 }
 function openGroup(group, start) {
  gallery = [...document.querySelectorAll(`[data-group="${CSS.escape(group)}"]`)].map(b => ({src: b.dataset.src, caption: b.dataset.caption}));
  index = Math.max(0, start ?? 0); viewer.classList.remove('is-video'); showImage(); viewer.showModal();
 }
 function openVideo(src, poster, caption) {
  gallery = []; viewer.classList.add('is-video', 'single');
  viewer.querySelector('.viewer-stage').innerHTML = `<video controls autoplay playsinline controlslist="nodownload" preload="metadata" poster="${e(poster)}"><source src="${e(src)}" type="video/mp4"></video>`;
  viewer.querySelector('.viewer-caption').textContent = caption; viewer.querySelector('.viewer-count').textContent = '';
  viewer.showModal();
 }
 function step(d) { if (gallery.length > 1) { index = (index + d + gallery.length) % gallery.length; showImage(); } }
 viewer.addEventListener('close', () => { viewer.querySelector('.viewer-stage').innerHTML = ''; });
 viewer.addEventListener('click', ev => { if (ev.target === viewer || ev.target.classList.contains('viewer-stage')) viewer.close(); });
 viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
 viewer.querySelector('.viewer-prev').addEventListener('click', () => step(-1));
 viewer.querySelector('.viewer-next').addEventListener('click', () => step(1));
 viewer.addEventListener('keydown', ev => { if (ev.key === 'ArrowLeft') step(-1); if (ev.key === 'ArrowRight') step(1); });

 function bind() {
  const u = UI[lang];
  document.querySelector('[data-lang-toggle]').addEventListener('click', () => {
   const scroll = window.scrollY; lang = lang === 'en' ? 'zh' : 'en';
   try { localStorage.setItem('ly-language', lang); } catch {}
   const url = new URL(location); url.searchParams.set('lang', lang); history.replaceState(null, '', url);
   render(); window.scrollTo(0, scroll);
  });
  const menu = document.querySelector('.menu'), nav = document.getElementById('nav');
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }));
  document.querySelectorAll('.zoom').forEach(b => b.addEventListener('click', () => {
   const members = [...document.querySelectorAll(`[data-group="${CSS.escape(b.dataset.group)}"]`)];
   openGroup(b.dataset.group, members.indexOf(b));
  }));
  document.querySelectorAll('[data-open-group]').forEach(b => b.addEventListener('click', () => openGroup(b.dataset.openGroup, 0)));
  document.querySelectorAll('[data-video]').forEach(b => b.addEventListener('click', () => openVideo(b.dataset.video, b.dataset.poster, b.dataset.caption)));
  const count = document.querySelector('.filter-count');
  const applyFilter = key => {
   document.querySelectorAll('[data-filter]').forEach(n => n.setAttribute('aria-pressed', String(n.dataset.filter === key)));
   const rows = [...document.querySelectorAll('.project')];
   rows.forEach(r => { r.hidden = key !== 'all' && r.dataset.pillar !== key; });
   const shown = rows.filter(r => !r.hidden);
   if (count) count.textContent = `${shown.length} ${u.count}`;
   if (motion && filtered) shown.forEach((r, i) => { r.classList.remove('enter'); void r.offsetWidth; r.style.setProperty('--i', i); r.classList.add('enter', 'in'); });
   filtered = true;
  };
  let filtered = false;
  document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => applyFilter(b.getAttribute('aria-pressed') === 'true' && b.dataset.filter !== 'all' ? 'all' : b.dataset.filter)));
  if (count) applyFilter('all');
  document.querySelectorAll('.pillars.as-filter .chips a').forEach(a => a.addEventListener('click', () => applyFilter('all')));
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
   const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), {rootMargin: '0px 0px -8% 0px'});
   reveals.forEach(r => io.observe(r));
  } else reveals.forEach(r => r.classList.add('in'));
  // Children of these groups enter one after another once their section is revealed.
  document.querySelectorAll('.proof, .pillars, .cards, .pubs ol, .bg-grid, .chips, .stack, .blocks, .thumbs, .prose, .plain').forEach(g => {
   g.classList.add('stagger'); [...g.children].forEach((c, i) => c.style.setProperty('--i', i));
  });
  document.querySelectorAll('.hero mark').forEach((m, i) => m.style.setProperty('--i', i));
  if (motion) {
   document.querySelectorAll('.proof strong').forEach(el => {
    const target = Number(el.textContent.replace(/,/g, ''));
    if (!/^[\d,]+$/.test(el.textContent) || !target) return;
    const t0 = performance.now() + 500, dur = 1600;
    const tick = now => { const p = Math.min(1, Math.max(0, (now - t0) / dur)), v = Math.round(target * (1 - Math.pow(1 - p, 3))); el.textContent = v.toLocaleString('en-US'); if (p < 1) requestAnimationFrame(tick); };
    el.textContent = '0'; requestAnimationFrame(tick);
   });
   // Attention field: the dot grid behind hero areas brightens around the pointer.
   document.querySelectorAll('.field').forEach(f => {
    let queued = false, x = 0, y = 0;
    f.addEventListener('pointermove', ev => {
     const r = f.getBoundingClientRect(); x = ev.clientX - r.left; y = ev.clientY - r.top;
     if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; f.style.setProperty('--mx', x + 'px'); f.style.setProperty('--my', y + 'px'); }); }
    });
   });
  }
 }

 // Reading progress on every page; on the home page, the last section whose top has passed 40% of the viewport is current.
 let spyQueued = false;
 function spy() {
  spyQueued = false;
  const max = document.documentElement.scrollHeight - innerHeight, bar = document.querySelector('.progress');
  if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
  if (page !== 'home') return;
  const line = innerHeight * .4, atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
  let current = '';
  document.querySelectorAll('main section[id], footer[id]').forEach(s => { if (s.getBoundingClientRect().top <= line) current = s.id; });
  if (atEnd) current = 'contact';
  document.querySelectorAll('[data-nav]').forEach(l => l.classList.toggle('active', l.dataset.nav === current));
 }
 addEventListener('scroll', () => { if (!spyQueued) { spyQueued = true; requestAnimationFrame(spy); } }, {passive: true});

 function revealHash() {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (!target) return;
  if (target.matches('.project')) { target.hidden = false; const d = target.querySelector('details'); if (d) d.open = true; }
  target.classList.add('in');
  requestAnimationFrame(() => target.scrollIntoView());
 }

 function render() {
  const u = UI[lang];
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.body.className = lang;
  const name = t(D.name);
  document.title = page === 'home' ? `${name} · ${lang === 'en' ? 'Medical Vision–Language AI' : '医学视觉语言智能'}` : `${page === 'journal' ? t(D.journal.title) : u.portfolio} · ${name}`;
  document.querySelector('.skip').textContent = u.skip;
  viewer.querySelector('.viewer-close').setAttribute('aria-label', u.close);
  viewer.querySelector('.viewer-prev').setAttribute('aria-label', u.prev);
  viewer.querySelector('.viewer-next').setAttribute('aria-label', u.next2);
  document.getElementById('app').innerHTML = `${topbar()}<main id="main">${page === 'home' ? homePage() : page === 'journal' ? journalPage() : portfolioPage()}</main>${footer()}`;
  bind(); spy();
 }

 render(); revealHash(); window.addEventListener('hashchange', revealHash);
})();
