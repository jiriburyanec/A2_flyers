'use strict';

/* ---------- Utilities ---------- */

const $ = (sel, root = document) => root.querySelector(sel);

function el(tag, props, ...kids) {
  const n = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      // CSSOM assignment is allowed by the CSP, unlike a style attribute.
      else if (k === 'style') n.style.cssText = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? '' : v);
    }
  }
  for (const c of kids.flat(Infinity)) {
    if (c == null || c === false) continue;
    n.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return n;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const sample = (arr, n) => shuffle(arr).slice(0, n);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

const norm = s => String(s).toLowerCase()
  .replace(/[’‘`]/g, '\'')
  .replace(/[.,!?;:"]/g, '')
  .replace(/\s+/g, ' ')
  .trim();
const stripArticle = s => s.replace(/^(a|an|the|some)\s+/, '');

function isCorrect(value, answers) {
  const v = norm(value);
  if (!v) return false;
  return answers.some(a => {
    const n = norm(a);
    return v === n || stripArticle(v) === stripArticle(n);
  });
}

// Marks an input/select as right or wrong and shows the correct answer next to it.
function feedback(node, ok, correct) {
  node.classList.remove('ok', 'bad');
  node.classList.add(ok ? 'ok' : 'bad');
  if (node._hint) node._hint.remove();
  node._hint = null;
  if (!ok && correct) {
    node._hint = el('span', { class: 'hint' }, '✔ ' + correct);
    node.after(node._hint);
  }
}

function gapText(paragraphs, makeGap) {
  return paragraphs.map(text => {
    const p = el('p', { class: 'gaptext' });
    text.split(/(\{\d+\})/).forEach(part => {
      const m = part.match(/^\{(\d+)\}$/);
      p.append(m ? makeGap(Number(m[1])) : part);
    });
    return p;
  });
}

const filled = text => el('span', { class: 'filled' }, text);
const input = (size = 12) => el('input', { type: 'text', class: 'gap', size, autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
const LETTERS = 'ABCDEFGH';

function selectEl(options, placeholder = '—') {
  return el('select', { class: 'gap' }, el('option', { value: '' }, placeholder), options.map(o => el('option', { value: o }, o)));
}

/* ---------- Progress storage ---------- */

const STORE_KEY = 'flyers-progress-v1';
const Store = {
  load() {
    try {
      const d = JSON.parse(localStorage.getItem(STORE_KEY));
      if (d && d.results && d.words) return d;
    } catch { /* corrupted storage – start fresh */ }
    return { results: {}, words: {} };
  },
  save(d) { localStorage.setItem(STORE_KEY, JSON.stringify(d)); },
  record(id, score, max) {
    const d = this.load();
    const r = d.results[id] || { best: 0, attempts: 0 };
    r.attempts++;
    r.last = score;
    r.max = max;
    r.best = Math.max(r.best, score);
    r.date = new Date().toISOString();
    d.results[id] = r;
    this.save(d);
  },
  setWord(en, known) {
    const d = this.load();
    d.words[en] = known;
    this.save(d);
  },
  reset() { localStorage.removeItem(STORE_KEY); }
};

/* ---------- Speech: text-to-speech + recognition ---------- */

const TTS = {
  voices: [],
  supported: 'speechSynthesis' in window,
  init() {
    if (!this.supported) return;
    const load = () => { this.voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)); };
    load();
    speechSynthesis.addEventListener('voiceschanged', load);
  },
  pool() {
    const gb = this.voices.filter(v => /en[-_]GB/i.test(v.lang));
    return gb.length ? gb : this.voices;
  },
  voiceFor(who) {
    const pool = this.pool();
    const female = pool.filter(v => /female|woman|zira|hazel|susan|libby|sonia|maisie|serena|kate|fiona|samantha|emma|amy/i.test(v.name));
    const male = pool.filter(v => !female.includes(v) && /male|george|ryan|daniel|thomas|david|mark|oliver|arthur|brian|guy/i.test(v.name));
    const wantFemale = who === 'woman' || who === 'girl';
    const list = wantFemale ? female : (who === 'narrator' ? pool : male);
    return list[0] || pool[0] || null;
  },
  utter(text, who = 'narrator', rate = 0.9) {
    const u = new SpeechSynthesisUtterance(text);
    const v = this.voiceFor(who);
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-GB';
    u.rate = rate;
    u.pitch = { man: 0.85, woman: 1.1, boy: 1.35, girl: 1.5, narrator: 1 }[who] || 1;
    return u;
  },
  say(text, who, rate) {
    if (!this.supported) return;
    speechSynthesis.cancel();
    speechSynthesis.speak(this.utter(text, who, rate));
  },
  play(lines, times = 1, rate = 0.9, onDone) {
    if (!this.supported) return;
    speechSynthesis.cancel();
    const queue = [];
    for (let t = 0; t < times; t++) {
      if (t > 0) queue.push(this.utter('Now listen again.', 'narrator', rate));
      lines.forEach(l => queue.push(this.utter(l.text, l.who, rate)));
    }
    if (onDone && queue.length) queue[queue.length - 1].onend = onDone;
    queue.forEach(u => speechSynthesis.speak(u));
  },
  stop() { if (this.supported) speechSynthesis.cancel(); }
};

function speakBtn(text, who = 'narrator', label = '🔊') {
  return el('button', { class: 'btn small', type: 'button', title: 'Přehrát', onclick: () => TTS.say(text, who) }, label);
}

function player(script) {
  if (!TTS.supported) {
    return el('div', { class: 'notice' }, 'Tento prohlížeč neumí přehrávat řeč. Použij Chrome, Edge nebo Safari.');
  }
  const speed = el('select', { class: 'speed', title: 'Rychlost' },
    el('option', { value: '0.75' }, 'pomalu'),
    el('option', { value: '0.9', selected: true }, 'normálně'),
    el('option', { value: '1' }, 'rychle'));
  const status = el('span', { class: 'status' });
  const run = times => {
    status.textContent = '🔈 hraje…';
    TTS.play(script, times, Number(speed.value), () => { status.textContent = ''; });
  };
  const transcript = el('details', { class: 'transcript' },
    el('summary', null, 'Přepis nahrávky (až po cvičení!)'),
    script.map(l => el('p', null, el('b', null, l.who + ': '), l.text)));
  return el('div', { class: 'player' },
    el('button', { class: 'btn primary', type: 'button', onclick: () => run(2) }, '▶ Přehrát 2× (jako u zkoušky)'),
    el('button', { class: 'btn', type: 'button', onclick: () => run(1) }, '▶ 1×'),
    el('button', { class: 'btn', type: 'button', onclick: () => { TTS.stop(); status.textContent = ''; } }, '■ Stop'),
    speed, status, transcript);
}

function micButton() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return el('span', { class: 'muted small' }, '(nahrávání odpovědi funguje v Chrome/Edge)');
  const out = el('span', { class: 'said' });
  const btn = el('button', { class: 'btn small', type: 'button' }, '🎤 Odpovědět');
  btn.addEventListener('click', () => {
    const rec = new SR();
    rec.lang = 'en-GB';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    btn.disabled = true;
    out.textContent = 'poslouchám…';
    rec.onresult = e => { out.textContent = '„' + e.results[0][0].transcript + '“'; };
    rec.onerror = e => { out.textContent = e.error === 'not-allowed' ? 'Mikrofon není povolen.' : 'Nerozuměl jsem, zkus to znovu.'; };
    rec.onend = () => { btn.disabled = false; if (out.textContent === 'poslouchám…') out.textContent = ''; };
    rec.start();
  });
  return el('span', { class: 'mic' }, btn, out);
}

function revealBtn(content, label = 'Ukázat vzor') {
  const box = el('div', { class: 'reveal', hidden: true }, content);
  const btn = el('button', { class: 'btn small', type: 'button', onclick: () => { box.hidden = !box.hidden; } }, label);
  return [btn, box];
}

/* ---------- Shields (estimate) ---------- */

function shields(score, max) {
  const p = max ? score / max : 0;
  return p >= 0.9 ? 5 : p >= 0.75 ? 4 : p >= 0.6 ? 3 : p >= 0.4 ? 2 : 1;
}
function scoreView(score, max) {
  const s = shields(score, max);
  const pct = max ? Math.round(score / max * 100) : 0;
  const msg = pct >= 90 ? 'Výborně!' : pct >= 75 ? 'Moc dobře!' : pct >= 60 ? 'Dobře, ještě trochu procvičit.' : 'Zkus to znovu – zvládneš to!';
  return el('div', null,
    el('div', { class: 'score' }, `${score} / ${max} (${pct} %)`),
    el('div', { class: 'shields', title: 'Orientační odhad štítů' }, '🛡️'.repeat(s) + '▫️'.repeat(5 - s)),
    el('div', null, msg));
}

/* ---------- Reading & Writing renderers ---------- */

function renderRW1() {
  const pool = sample(VOCAB.flatMap(t => t.words), 15);
  const asked = pool.slice(0, 10);
  const box = el('div', { class: 'wordbox' }, shuffle(pool).map(w => el('span', null, w.en)));
  const inputs = asked.map(() => input(14));
  const list = el('ol', { class: 'qlist' }, asked.map((w, i) => el('li', null, el('span', null, w.def + ' '), inputs[i])));
  return {
    node: el('div', null, box, list),
    check() {
      let score = 0;
      asked.forEach((w, i) => {
        const ok = isCorrect(inputs[i].value, [w.en]);
        if (ok) score++;
        feedback(inputs[i], ok, w.en);
      });
      return { score, max: asked.length };
    }
  };
}

function renderRW2(set) {
  const opts = shuffle([set.example.a, ...set.items.map(i => i.a), ...set.distractors]);
  const letterOf = text => LETTERS[opts.indexOf(text)];
  const options = el('div', { class: 'optlist' }, opts.map((o, i) => el('div', null, el('b', null, LETTERS[i] + '  '), o)));
  const sels = set.items.map(() => selectEl(LETTERS.slice(0, opts.length).split('')));
  const dialog = el('div', { class: 'dialogue' },
    el('p', { class: 'muted' }, set.intro),
    el('div', { class: 'line' }, el('b', null, set.speakerA + ': '), set.example.q),
    el('div', { class: 'line b' }, el('b', null, set.speakerB + ': '), filled(letterOf(set.example.a)), el('span', { class: 'muted' }, ' (example)')),
    set.items.map((it, i) => [
      el('div', { class: 'line' }, el('b', null, `${i + 1}. ${set.speakerA}: `), it.q),
      el('div', { class: 'line b' }, el('b', null, set.speakerB + ': '), sels[i])
    ]));
  return {
    node: el('div', { class: 'two-col' }, dialog, options),
    check() {
      let score = 0;
      set.items.forEach((it, i) => {
        const ok = sels[i].value === letterOf(it.a);
        if (ok) score++;
        feedback(sels[i], ok, letterOf(it.a));
      });
      return { score, max: set.items.length };
    }
  };
}

function renderRW3(set) {
  const inputs = {};
  const box = el('div', { class: 'wordbox' }, shuffle(set.box).map(w => el('span', null, w)));
  const paras = gapText(set.text, n => {
    if (n === 0) return filled(set.answers[0]);
    inputs[n] = input(11);
    return el('span', null, el('sup', null, n), inputs[n]);
  });
  const name = 'title-' + Math.random().toString(36).slice(2);
  const radios = set.titles.map((t, i) => el('label', { class: 'radio' }, el('input', { type: 'radio', name, value: i }), ' ' + t));
  return {
    node: el('div', null, box, paras, el('p', null, el('b', null, '6. Now choose the best name for the story. Tick one box.')), el('div', { class: 'radios' }, radios)),
    check() {
      let score = 0;
      for (const [n, inp] of Object.entries(inputs)) {
        const ok = isCorrect(inp.value, [set.answers[n]]);
        if (ok) score++;
        feedback(inp, ok, set.answers[n]);
      }
      const chosen = radios.find(r => r.firstChild.checked);
      radios.forEach((r, i) => { r.classList.remove('bad'); r.classList.toggle('ok', i === set.titleAnswer); });
      if (chosen && Number(chosen.firstChild.value) === set.titleAnswer) score++;
      else if (chosen) chosen.classList.add('bad');
      return { score, max: Object.keys(inputs).length + 1 };
    }
  };
}

function renderRW4(set) {
  const sels = {};
  const paras = gapText(set.text, n => {
    if (n === 0) return filled(set.gaps[0][0]);
    sels[n] = selectEl(shuffle(set.gaps[n]));
    return el('span', null, el('sup', null, n), sels[n]);
  });
  return {
    node: el('div', null, el('h3', null, set.title), paras),
    check() {
      let score = 0;
      for (const [n, s] of Object.entries(sels)) {
        const ok = s.value === set.gaps[n][0];
        if (ok) score++;
        feedback(s, ok, set.gaps[n][0]);
      }
      return { score, max: Object.keys(sels).length };
    }
  };
}

function sentenceWithGap(text, gap) {
  const [a, b] = text.split('___');
  return el('span', null, a, gap, b || '');
}

function renderRW5(set) {
  const inputs = set.items.map(() => input(18));
  return {
    node: el('div', null,
      el('h3', null, set.title),
      el('div', { class: 'story' }, set.story.map(p => el('p', null, p))),
      el('p', null, el('i', null, 'Example: '), sentenceWithGap(set.example.s, filled(set.example.a))),
      el('ol', { class: 'qlist' }, set.items.map((it, i) => el('li', null, sentenceWithGap(it.s, inputs[i]))))),
    check() {
      let score = 0;
      set.items.forEach((it, i) => {
        const ok = isCorrect(inputs[i].value, it.a) && norm(inputs[i].value).split(' ').length <= 4;
        if (ok) score++;
        feedback(inputs[i], ok, it.a[0]);
      });
      return { score, max: set.items.length };
    }
  };
}

function renderRW6(set) {
  const inputs = {};
  const paras = gapText(set.text, n => {
    if (n === 0) return filled(set.example);
    inputs[n] = input(9);
    return el('span', null, el('sup', null, n), inputs[n]);
  });
  return {
    node: el('div', { class: 'letter' }, paras),
    check() {
      let score = 0;
      for (const [n, inp] of Object.entries(inputs)) {
        const answers = set.answers[n - 1];
        const ok = answers.some(a => norm(a) === norm(inp.value));
        if (ok) score++;
        feedback(inp, ok, answers.join(' / '));
      }
      return { score, max: Object.keys(inputs).length };
    }
  };
}

function renderRW7(set) {
  const area = el('textarea', { rows: 6, placeholder: 'Write your story here… (20 or more words)', spellcheck: 'false' });
  const counter = el('span', { class: 'counter' }, '0 slov');
  const count = () => (area.value.trim().match(/\S+/g) || []).length;
  area.addEventListener('input', () => {
    const c = count();
    counter.textContent = `${c} slov`;
    counter.classList.toggle('ok', c >= 20);
  });
  const checklist = el('ul', { class: 'checklist' },
    ['Mám aspoň 20 slov.', 'Napsal(a) jsem něco o všech třech obrázcích.', 'Používám minulý čas (went, saw, was…).', 'Spojuji věty: and, but, then, because, when.', 'Zkontroloval(a) jsem pravopis a velká písmena.']
      .map(t => el('li', null, el('label', null, el('input', { type: 'checkbox' }), ' ' + t))));
  const selfScore = el('select', null,
    el('option', { value: '' }, '— ohodnoť (rodič/učitel) —'),
    el('option', { value: '5' }, '5 – 20+ slov, celý příběh, jen drobné chyby'),
    el('option', { value: '4' }, '4 – celý příběh, pár chyb'),
    el('option', { value: '3' }, '3 – 2 obrázky nebo více chyb'),
    el('option', { value: '2' }, '2 – krátké, hodně chyb'),
    el('option', { value: '1' }, '1 – jen pár slov'),
    el('option', { value: '0' }, '0 – nic / mimo téma'));
  const [btn, box] = revealBtn(el('p', null, set.model), 'Ukázat vzorový příběh');
  return {
    node: el('div', null,
      el('div', { class: 'panels' }, set.pictures.map((p, i) => el('div', { class: 'panel', title: p.hint }, el('div', { class: 'num' }, i + 1), el('div', { class: 'emoji' }, p.emoji)))),
      el('details', { class: 'muted' }, el('summary', null, 'Nevíš, co je na obrázcích? (nápověda česky)'), el('ol', null, set.pictures.map(p => el('li', null, p.hint)))),
      area, el('div', null, counter), checklist,
      el('div', { class: 'row' }, btn), box,
      el('p', null, el('b', null, 'Hodnocení: '), selfScore)),
    check() {
      const v = selfScore.value === '' ? 0 : Number(selfScore.value);
      selfScore.classList.toggle('bad', selfScore.value === '');
      if (count() < 20) counter.classList.add('bad');
      return { score: v, max: 5 };
    }
  };
}

/* ---------- Listening renderers ---------- */

function cardsGrid(cards) {
  return el('div', { class: 'cards' }, cards.map(c => el('div', { class: 'card' }, el('div', { class: 'letter-tag' }, c.id), el('div', { class: 'emoji' }, c.emoji))));
}

function renderMatch(set) {
  const ids = set.cards.map(c => c.id);
  const rows = set.names.filter(n => n !== set.example.name).map(name => ({ name, sel: selectEl(ids) }));
  return {
    node: el('div', null, player(set.script), cardsGrid(set.cards),
      el('div', { class: 'names' },
        el('div', { class: 'namerow' }, el('b', null, set.example.name), ' → ', filled(set.example.card), el('span', { class: 'muted' }, ' (example)')),
        rows.map(r => el('div', { class: 'namerow' }, el('b', null, r.name), ' → ', r.sel)))),
    check() {
      let score = 0;
      rows.forEach(r => {
        const correct = set.answers[r.name];
        if (correct) {
          const ok = r.sel.value === correct;
          if (ok) score++;
          feedback(r.sel, ok, correct);
        } else {
          feedback(r.sel, r.sel.value === '', 'nikdo (bez čáry)');
        }
      });
      return { score, max: Object.keys(set.answers).length };
    }
  };
}

function renderL2(set) {
  const inputs = set.fields.map(() => input(14));
  return {
    node: el('div', null, player(set.script),
      el('div', { class: 'form' },
        el('h3', null, set.formTitle),
        el('div', { class: 'formrow' }, el('span', null, set.example.label + ':'), filled(set.example.a)),
        set.fields.map((f, i) => el('div', { class: 'formrow' }, el('span', null, `${i + 1}. ${f.label}:`), inputs[i])))),
    check() {
      let score = 0;
      set.fields.forEach((f, i) => {
        const ok = isCorrect(inputs[i].value, f.a);
        if (ok) score++;
        feedback(inputs[i], ok, f.a[0]);
      });
      return { score, max: set.fields.length };
    }
  };
}

function renderL4(set) {
  const nums = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  const full = set.items.flatMap((it, i) => [{ who: 'narrator', text: `${nums[i]}. ${it.q}` }, ...it.script]);
  const chosen = set.items.map(() => null);
  const groups = set.items.map((it, qi) => {
    const btns = it.options.map((o, oi) => el('button', {
      class: 'choice', type: 'button',
      onclick: () => { chosen[qi] = oi; btns.forEach((b, bi) => b.classList.toggle('sel', bi === oi)); }
    }, el('span', { class: 'letter-tag' }, 'ABC'[oi]), el('span', { class: 'emoji' }, o)));
    return btns;
  });
  return {
    node: el('div', null, player(full),
      set.items.map((it, qi) => el('div', { class: 'mcq' },
        el('div', { class: 'q' }, el('b', null, `${qi + 1}. `), it.q, ' ', el('button', { class: 'btn small', type: 'button', onclick: () => TTS.play(it.script, 1, 0.9) }, '🔊 jen tuto')),
        el('div', { class: 'choices' }, groups[qi])))),
    check() {
      let score = 0;
      set.items.forEach((it, qi) => {
        groups[qi].forEach((b, bi) => {
          b.classList.remove('ok', 'bad');
          if (bi === it.a) b.classList.add('ok');
          else if (bi === chosen[qi]) b.classList.add('bad');
        });
        if (chosen[qi] === it.a) score++;
      });
      return { score, max: set.items.length };
    }
  };
}

const COLOURS = { red: '#f87171', blue: '#60a5fa', green: '#4ade80', yellow: '#fde047', brown: '#b45309', purple: '#c084fc', orange: '#fb923c', pink: '#f9a8d4', grey: '#9ca3af', black: '#374151' };

function renderL5(set) {
  const objIds = set.objects.map(o => o.id);
  const cards = {};
  const grid = el('div', { class: 'cards' }, set.objects.map(o => {
    cards[o.id] = { node: el('div', { class: 'card' }, el('div', { class: 'emoji' }, o.emoji), el('div', { class: 'cardlabel' })) };
    return cards[o.id].node;
  }));
  const paint = () => {
    Object.values(cards).forEach(c => { c.node.style.background = ''; c.node.lastChild.textContent = ''; });
    const apply = (obj, value) => {
      const c = cards[obj];
      if (!c || !value) return;
      const v = norm(value);
      if (COLOURS[v]) c.node.style.background = COLOURS[v];
      else c.node.lastChild.textContent = value.toUpperCase();
    };
    apply(set.example.object, set.example.value);
    rows.forEach(r => apply(r.obj.value, r.val.value));
  };
  const rows = set.tasks.map(() => {
    const obj = selectEl(objIds, '— co? —');
    const val = input(10);
    val.setAttribute('placeholder', 'barva / slovo');
    obj.addEventListener('change', paint);
    val.addEventListener('input', paint);
    return { obj, val };
  });
  const node = el('div', null, player(set.script), grid,
    el('p', { class: 'muted small' }, 'Barvy: ' + set.colours.join(', ')),
    el('div', { class: 'names' },
      el('div', { class: 'namerow' }, el('i', null, 'Example: '), filled(set.example.object), ' → ', filled(set.example.value)),
      rows.map((r, i) => el('div', { class: 'namerow' }, el('b', null, `${i + 1}.`), r.obj, ' → ', r.val))));
  paint();
  return {
    node,
    check() {
      const remaining = set.tasks.slice();
      let score = 0;
      rows.forEach(r => {
        const idx = remaining.findIndex(t => t.object === r.obj.value && norm(t.value) === norm(r.val.value));
        const ok = idx >= 0;
        if (ok) { score++; remaining.splice(idx, 1); }
        r.obj.classList.remove('ok', 'bad');
        r.obj.classList.add(ok ? 'ok' : 'bad');
        feedback(r.val, ok, null);
      });
      if (remaining.length) {
        const hint = el('p', { class: 'hint block' }, 'Správně mělo být: ' + set.tasks.map(t => `${t.object} → ${t.value}`).join(', '));
        if (node._hint) node._hint.remove();
        node._hint = hint;
        node.append(hint);
      }
      return { score, max: set.tasks.length };
    }
  };
}

/* ---------- Parts catalogue ---------- */

const PARTS = {
  l1: { paper: 'L', label: 'Listening Part 1', name: 'Jména a lidé', cz: 'Velký obrázek s lidmi. Poslouchej rozhovor a přiřaď jména ke správným osobám (5 otázek).', en: 'Listen and draw lines. There is one example.', sets: L1, render: renderMatch },
  l2: { paper: 'L', label: 'Listening Part 2', name: 'Doplň formulář', cz: 'Poslouchej rozhovor a doplň do formuláře slovo nebo číslo. Pozor na hláskování! (5 otázek)', en: 'Listen and write. There is one example.', sets: L2, render: renderL2 },
  l3: { paper: 'L', label: 'Listening Part 3', name: 'Přiřazování obrázků', cz: 'Vlevo jsou lidé, vpravo obrázky s písmeny. Poslouchej a ke každé osobě napiš písmeno (5 otázek).', en: 'Listen and write a letter in each box. There is one example.', sets: L3, render: renderMatch },
  l4: { paper: 'L', label: 'Listening Part 4', name: 'Vyber obrázek', cz: 'Pět krátkých rozhovorů. U každého vyber správný obrázek A, B nebo C (5 otázek).', en: 'Listen and tick the box. There is one example.', sets: L4, render: renderL4 },
  l5: { paper: 'L', label: 'Listening Part 5', name: 'Vybarvi a napiš', cz: 'Poslouchej pokyny: 3× něco vybarvi a 2× něco napiš do obrázku (5 otázek).', en: 'Listen and colour and write. There is one example.', sets: L5, render: renderL5 },
  rw1: { paper: 'RW', label: 'Reading & Writing Part 1', name: 'Definice', cz: '15 slov a 10 definic. Ke každé definici napiš správné slovo – pozor na pravopis! (Při každém spuštění nová slova.)', en: 'Look and read. Choose the correct words and write them on the lines.', sets: [{ title: 'Náhodná slova' }], render: renderRW1 },
  rw2: { paper: 'RW', label: 'Reading & Writing Part 2', name: 'Dialog A–H', cz: 'Rozhovor: vyber ke každé otázce správnou odpověď (písmeno A–H). Dvě odpovědi navíc nepasují (5 otázek).', en: 'Read the text and choose the best answer. Write a letter (A–H) for each answer.', sets: RW2, render: renderRW2 },
  rw3: { paper: 'RW', label: 'Reading & Writing Part 3', name: 'Příběh se slovy', cz: 'Doplň do příběhu slova z rámečku a vyber nejlepší název (6 otázek).', en: 'Read the story. Choose a word from the box. Write the correct word next to numbers 1–5.', sets: RW3, render: renderRW3 },
  rw4: { paper: 'RW', label: 'Reading & Writing Part 4', name: 'Gramatika v textu', cz: 'Naučný text. U každé mezery vyber jedno ze tří slov (10 otázek).', en: 'Read the text. Choose the right words and write them on the lines.', sets: RW4, render: renderRW4 },
  rw5: { paper: 'RW', label: 'Reading & Writing Part 5', name: 'Dokonči věty', cz: 'Přečti příběh a doplň věty jedním až čtyřmi slovy (7 otázek).', en: 'Look at the pictures and read the story. Write some words to complete the sentences. You can use 1, 2, 3 or 4 words.', sets: RW5, render: renderRW5 },
  rw6: { paper: 'RW', label: 'Reading & Writing Part 6', name: 'Dopis / deník', cz: 'Doplň do textu chybějící slovo – bez nabídky slov (5 otázek).', en: 'Read the letter and write the missing words. Write one word on each line.', sets: RW6, render: renderRW6 },
  rw7: { paper: 'RW', label: 'Reading & Writing Part 7', name: 'Napiš příběh', cz: 'Podívej se na 3 obrázky a napiš příběh – aspoň 20 slov.', en: 'Look at the three pictures. Write about this story. Write 20 or more words.', sets: RW7, render: renderRW7 }
};

/* ---------- Views ---------- */

function exerciseShell(id, part, set, ex) {
  const result = el('div', { class: 'result', hidden: true });
  return el('section', { class: 'exercise' },
    el('p', { class: 'crumbs' }, el('a', { href: part.paper === 'L' ? '#/listening' : '#/rw' }, '← zpět'), ' · ', part.label),
    el('h2', null, part.name + (set.title ? ' – ' + set.title : '')),
    el('p', { class: 'instr en' }, part.en),
    el('p', { class: 'instr cz' }, part.cz),
    set.instr ? el('p', { class: 'instr cz' }, set.instr) : null,
    ex.node,
    el('div', { class: 'actions' },
      el('button', { class: 'btn primary', type: 'button', onclick: () => {
        const { score, max } = ex.check();
        Store.record(id, score, max);
        result.hidden = false;
        result.replaceChildren(scoreView(score, max));
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } }, '✔ Zkontrolovat'),
      el('button', { class: 'btn', type: 'button', onclick: route }, '↻ Znovu')),
    result);
}

function viewExercise(key, idx) {
  const part = PARTS[key];
  const i = Number(idx) || 0;
  if (!part || !part.sets[i]) return viewNotFound();
  const set = part.sets[i];
  return exerciseShell(`${key}-${i}`, part, set, part.render(set));
}

function partList(paper, title, intro) {
  return el('section', null,
    el('h2', null, title),
    el('p', null, intro),
    el('div', { class: 'grid' }, Object.entries(PARTS).filter(([, p]) => p.paper === paper).map(([key, p]) =>
      el('div', { class: 'tile' },
        el('h3', null, p.label),
        el('p', null, el('b', null, p.name)),
        el('p', { class: 'small' }, p.cz),
        el('div', { class: 'row' }, p.sets.map((s, i) => el('a', { class: 'btn', href: `#/ex/${key}/${i}` }, s.title || `Sada ${i + 1}`)))))));
}

const viewRW = () => partList('RW', 'Reading & Writing (40 minut, 7 částí, 44 otázek)', 'Ve všech částech se hodnotí i pravopis. Vyber si část, kterou chceš procvičit:');
const viewListening = () => partList('L', 'Listening (cca 25 minut, 5 částí, 25 otázek)', 'Každou nahrávku uslyšíš dvakrát. Nahrávky čte syntetický hlas prohlížeče – zapni si zvuk.');

function fromTemplate(id) {
  return $('#' + id).content.cloneNode(true);
}

function viewHome() {
  const frag = fromTemplate('tpl-home');
  const d = Store.load();
  const known = Object.values(d.words).filter(Boolean).length;
  const total = VOCAB.reduce((s, t) => s + t.words.length, 0);
  const done = Object.keys(d.results).length;
  $('[data-stat="words"]', frag).textContent = `${known} / ${total}`;
  $('[data-stat="done"]', frag).textContent = String(done);
  return frag;
}

const viewInfo = () => fromTemplate('tpl-info');

/* Vocabulary */

function viewVocab() {
  const d = Store.load();
  return el('section', null,
    el('h2', null, 'Slovíčka'),
    el('p', null, 'Slovíčka podle témat z oficiálního seznamu slov pro A2 Flyers (výběr). Procvičuj kartičky, překlad, diktát a definice.'),
    el('div', { class: 'grid' }, VOCAB.map(t => {
      const known = t.words.filter(w => d.words[w.en]).length;
      return el('a', { class: 'tile link', href: `#/vocab/${t.id}/cards` },
        el('div', { class: 'big' }, t.icon),
        el('h3', null, t.name),
        el('p', null, t.cz),
        el('div', { class: 'bar' }, el('span', { style: `width:${Math.round(known / t.words.length * 100)}%` })),
        el('p', { class: 'small' }, `Umím ${known} / ${t.words.length}`));
    })));
}

function viewVocabTopic(topicId, mode = 'cards') {
  const topic = VOCAB.find(t => t.id === topicId);
  if (!topic) return viewNotFound();
  const modes = { cards: 'Kartičky', translate: 'Překlad CZ → EN', dictation: 'Diktát', define: 'Definice' };
  if (!modes[mode]) mode = 'cards';
  const tabs = el('nav', { class: 'tabs' }, Object.entries(modes).map(([k, v]) => el('a', { href: `#/vocab/${topic.id}/${k}`, class: k === mode ? 'active' : null }, v)));
  const body = mode === 'cards' ? flashcards(topic) : wordQuiz(topic, mode);
  return el('section', null,
    el('p', { class: 'crumbs' }, el('a', { href: '#/vocab' }, '← všechna témata')),
    el('h2', null, `${topic.icon} ${topic.name} – ${topic.cz}`), tabs, body);
}

function flashcards(topic) {
  const words = shuffle(topic.words);
  let i = 0;
  const front = el('div', { class: 'fc-front' });
  const back = el('div', { class: 'fc-back' });
  const card = el('div', { class: 'flashcard', tabindex: 0, title: 'Klikni pro otočení' }, front, back);
  const pos = el('span', { class: 'muted' });
  const show = () => {
    const w = words[i];
    card.classList.remove('flipped');
    front.replaceChildren(el('div', { class: 'word' }, w.en));
    back.replaceChildren(el('div', { class: 'word' }, w.cz), el('div', { class: 'def' }, w.def));
    pos.textContent = `${i + 1} / ${words.length}`;
  };
  const next = () => { i = (i + 1) % words.length; show(); };
  card.addEventListener('click', () => card.classList.toggle('flipped'));
  card.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); card.classList.toggle('flipped'); } });
  show();
  return el('div', { class: 'fc-wrap' }, card,
    el('div', { class: 'row center' },
      el('button', { class: 'btn', type: 'button', onclick: () => TTS.say(words[i].en) }, '🔊 Poslechnout'),
      el('button', { class: 'btn bad', type: 'button', onclick: () => { Store.setWord(words[i].en, false); next(); } }, '✗ Ještě neumím'),
      el('button', { class: 'btn good', type: 'button', onclick: () => { Store.setWord(words[i].en, true); next(); } }, '✓ Umím'),
      pos));
}

function wordQuiz(topic, mode) {
  const words = sample(topic.words, Math.min(10, topic.words.length));
  const inputs = words.map(() => input(16));
  const prompt = w => mode === 'translate' ? el('span', null, w.cz)
    : mode === 'dictation' ? speakBtn(w.en, 'narrator', '🔊 přehrát slovo')
      : el('span', null, w.def);
  const intro = { translate: 'Napiš anglicky:', dictation: 'Poslechni si slovo a napiš ho správně:', define: 'Přečti definici a napiš slovo:' }[mode];
  const result = el('div', { class: 'result', hidden: true });
  return el('div', null,
    el('p', null, intro),
    el('ol', { class: 'qlist' }, words.map((w, i) => el('li', null, prompt(w), ' ', inputs[i]))),
    el('div', { class: 'actions' },
      el('button', { class: 'btn primary', type: 'button', onclick: () => {
        let score = 0;
        words.forEach((w, i) => {
          const ok = isCorrect(inputs[i].value, [w.en]);
          if (ok) { score++; Store.setWord(w.en, true); }
          feedback(inputs[i], ok, w.en);
        });
        Store.record(`vocab-${topic.id}-${mode}`, score, words.length);
        result.hidden = false;
        result.replaceChildren(scoreView(score, words.length));
      } }, '✔ Zkontrolovat'),
      el('button', { class: 'btn', type: 'button', onclick: route }, '↻ Nová slova')),
    result);
}

/* Speaking */

const SPEAKING = {
  1: { label: 'Speaking Part 1', name: 'Najdi rozdíly', cz: 'Examiner popisuje svůj obrázek. Tvůj je trochu jiný – řekni celou větou, co je u tebe jinak.', sets: SP1 },
  2: { label: 'Speaking Part 2', name: 'Výměna informací', cz: 'Examiner se ptá na tvou kartičku, pak se ty ptáš jeho. Procvičuješ odpovědi i tvorbu otázek.', sets: SP2 },
  3: { label: 'Speaking Part 3', name: 'Příběh v obrázcích', cz: 'Pět obrázků tvoří příběh. Examiner začne, ty pokračuješ u obrázků 2–5.', sets: SP3 },
  4: { label: 'Speaking Part 4', name: 'Otázky o mně', cz: 'Examiner se ptá na tebe: škola, rodina, koníčky, prázdniny, narozeniny…', sets: [{ title: 'Náhodné otázky' }] }
};

function viewSpeakingList() {
  return el('section', null,
    el('h2', null, 'Speaking (7–9 minut, 4 části)'),
    el('p', null, 'Ústní zkouška probíhá s examinerem (u digitální verze s animovanou postavou). Otázky ti přečte hlas prohlížeče; odpověz nahlas. V Chrome/Edge můžeš odpověď nahrát a zobrazit, co počítač slyšel.'),
    el('div', { class: 'notice' }, '💡 Tipy: odpovídej celými větami, přidej detail navíc (because…, and…). Když nerozumíš, řekni: „Sorry, can you say that again, please?“'),
    el('div', { class: 'grid' }, Object.entries(SPEAKING).map(([k, p]) =>
      el('div', { class: 'tile' },
        el('h3', null, p.label), el('p', null, el('b', null, p.name)), el('p', { class: 'small' }, p.cz),
        el('div', { class: 'row' }, p.sets.map((s, i) => el('a', { class: 'btn', href: `#/sp/${k}/${i}` }, s.title || `Sada ${i + 1}`)))))));
}

function viewSpeaking(part, idx) {
  const meta = SPEAKING[part];
  const i = Number(idx) || 0;
  if (!meta || !meta.sets[i]) return viewNotFound();
  const set = meta.sets[i];
  let body;
  if (part === '1') {
    body = el('div', null,
      el('h3', null, 'Tvůj obrázek'),
      el('div', { class: 'cards' }, set.items.map(it => el('div', { class: 'card wide' }, el('div', { class: 'emoji' }, it.mine)))),
      el('ol', { class: 'qlist' }, set.items.map(it => {
        const [btn, box] = revealBtn(el('p', null, it.model));
        return el('li', null, el('div', { class: 'row' }, speakBtn(it.examiner, 'woman', '🔊 Examiner'), micButton(), btn), box);
      })));
  } else if (part === '2') {
    body = el('div', null,
      el('div', { class: 'infocard' }, el('h3', null, set.myCard.title),
        el('table', null, set.myCard.rows.map(([k, v]) => el('tr', null, el('th', null, k), el('td', null, v))))),
      el('h3', null, 'A) Examiner se ptá tebe'),
      el('ol', { class: 'qlist' }, set.examinerAsks.map(it => {
        const [btn, box] = revealBtn(el('p', null, it.a));
        return el('li', null, el('div', { class: 'row' }, speakBtn(it.q, 'woman', '🔊 Otázka'), micButton(), btn), box);
      })),
      el('h3', null, 'B) Ty se ptáš examinera: ' + set.otherTitle),
      el('ol', { class: 'qlist' }, set.youAsk.map(it => {
        const [btn, box] = revealBtn(el('p', null, el('b', null, 'Otázka: '), it.q, ' ', speakBtn(it.a, 'woman', '🔊 odpověď examinera')), 'Ukázat správnou otázku');
        return el('li', null, el('div', { class: 'row' }, el('b', null, it.prompt), micButton(), btn), box);
      })));
  } else if (part === '3') {
    body = el('div', null,
      el('div', { class: 'panels five' }, set.panels.map((p, n) => el('div', { class: 'panel' }, el('div', { class: 'num' }, n + 1), el('div', { class: 'emoji' }, p.emoji)))),
      el('ol', { class: 'qlist' }, set.panels.map((p, n) => {
        if (n === 0) return el('li', null, el('div', { class: 'row' }, speakBtn(p.text, 'woman', '🔊 Examiner začíná'), el('span', null, p.text)));
        const [btn, box] = revealBtn(el('p', null, p.text));
        return el('li', null, el('div', { class: 'row' }, el('span', null, `Obrázek ${n + 1}`), micButton(), btn), box);
      })),
      el('p', { class: 'muted small' }, 'Tip: používej přítomný průběhový čas (is flying, are eating) a spojky then, but, so.'));
  } else {
    const qs = sample(SP4, 6);
    body = el('ol', { class: 'qlist' }, qs.map(it => {
      const [btn, box] = revealBtn(el('p', null, it.model), 'Ukázat vzorovou odpověď');
      return el('li', null, el('div', { class: 'row' }, speakBtn(it.q, 'woman', '🔊'), el('span', null, it.q)), el('div', { class: 'row' }, micButton(), btn), box);
    }));
  }
  return el('section', { class: 'exercise' },
    el('p', { class: 'crumbs' }, el('a', { href: '#/speaking' }, '← zpět'), ' · ', meta.label),
    el('h2', null, meta.name + (set.title ? ' – ' + set.title : '')),
    el('p', { class: 'instr cz' }, set.instr || meta.cz),
    body,
    part === '4' ? el('div', { class: 'actions' }, el('button', { class: 'btn', type: 'button', onclick: route }, '↻ Jiné otázky')) : null);
}

/* Grammar */

function viewGrammar() {
  return el('section', null,
    el('h2', null, 'Gramatika pro A2 Flyers'),
    el('p', null, 'Krátké vysvětlení česky a rychlý test ke každému tématu.'),
    GRAMMAR.map((g, gi) => {
      const groups = g.quiz.map((q, qi) => {
        const name = `g${gi}-${qi}`;
        const opts = shuffle(q.o);
        return { q, labels: opts.map(o => el('label', { class: 'radio' }, el('input', { type: 'radio', name, value: o }), ' ' + o)) };
      });
      const result = el('div', { class: 'result', hidden: true });
      return el('details', { class: 'grammar' },
        el('summary', null, g.title),
        el('p', null, g.cz),
        el('ul', null, g.examples.map(e => el('li', null, e, ' ', speakBtn(e)))),
        el('ol', { class: 'qlist' }, groups.map(gr => el('li', null, el('div', null, gr.q.q), el('div', { class: 'radios' }, gr.labels)))),
        el('button', { class: 'btn primary', type: 'button', onclick: () => {
          let score = 0;
          groups.forEach(gr => gr.labels.forEach(l => {
            const inp = l.firstChild;
            const right = inp.value === gr.q.o[0];
            l.classList.remove('ok', 'bad');
            if (right) l.classList.add('ok');
            if (inp.checked && right) score++;
            if (inp.checked && !right) l.classList.add('bad');
          }));
          Store.record(`grammar-${gi}`, score, groups.length);
          result.hidden = false;
          result.replaceChildren(scoreView(score, groups.length));
        } }, '✔ Zkontrolovat'),
        result);
    }));
}

/* Mock test */

function viewMock(started) {
  if (!started) {
    return el('section', null,
      el('h2', null, 'Zkušební test'),
      el('p', null, 'Test složený z náhodných sad: nejprve Listening (5 částí, cca 25 min), pak Reading & Writing (7 částí, 40 min). Stejně jako u skutečné zkoušky jde poslech jako první.'),
      el('ul', null,
        el('li', null, 'Připrav si sluchátka nebo zapni zvuk.'),
        el('li', null, 'Časomíra běží 65 minut – po vypršení můžeš dokončit, ale zkus to stihnout.'),
        el('li', null, 'Part 7 (psaní) ohodnotí rodič/učitel podle vzorové odpovědi.'),
        el('li', null, 'Speaking se procvičuje zvlášť v sekci Speaking.')),
      el('a', { class: 'btn primary big', href: '#/mock/start' }, '▶ Začít test'));
  }
  const build = keys => keys.map(k => {
    const part = PARTS[k];
    const ex = part.render(pick(part.sets));
    return { ex, node: el('div', { class: 'mock-part' }, el('h3', null, part.label), el('p', { class: 'instr en' }, part.en), el('p', { class: 'instr cz' }, part.cz), ex.node) };
  });
  const L = build(['l1', 'l2', 'l3', 'l4', 'l5']);
  const RW = build(['rw1', 'rw2', 'rw3', 'rw4', 'rw5', 'rw6', 'rw7']);

  let left = 65 * 60;
  const clock = el('span', { class: 'clock' });
  const tick = () => {
    const m = Math.floor(Math.abs(left) / 60), s = Math.abs(left) % 60;
    clock.textContent = (left < 0 ? '+' : '') + `${m}:${String(s).padStart(2, '0')}`;
    clock.classList.toggle('bad', left < 0);
    left--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  cleanups.push(() => clearInterval(timer));

  const result = el('div', { class: 'result', hidden: true });
  const sum = parts => parts.reduce((a, p) => { const r = p.ex.check(); return { score: a.score + r.score, max: a.max + r.max }; }, { score: 0, max: 0 });
  const submit = el('button', { class: 'btn primary big', type: 'button', onclick: () => {
    clearInterval(timer);
    const l = sum(L), rw = sum(RW);
    Store.record('mock-L', l.score, l.max);
    Store.record('mock-RW', rw.score, rw.max);
    const total = shields(l.score, l.max) + shields(rw.score, rw.max);
    result.hidden = false;
    result.replaceChildren(
      el('h3', null, 'Výsledek zkušebního testu'),
      el('h4', null, 'Listening'), scoreView(l.score, l.max),
      el('h4', null, 'Reading & Writing'), scoreView(rw.score, rw.max),
      el('p', null, `Celkem ${total} z 10 štítů (bez Speakingu). `, el('span', { class: 'muted' }, 'Odhad je orientační – Cambridge přesné převodní tabulky nezveřejňuje.')));
    result.scrollIntoView({ behavior: 'smooth' });
  } }, '✔ Odevzdat a vyhodnotit');

  return el('section', { class: 'exercise' },
    el('div', { class: 'sticky' }, el('b', null, 'Zkušební test'), ' ⏱ ', clock),
    el('h2', null, '🎧 Paper 1: Listening'), L.map(p => p.node),
    el('h2', null, '📖 Paper 2: Reading & Writing'), RW.map(p => p.node),
    el('div', { class: 'actions' }, submit), result);
}

/* Progress */

function labelFor(id) {
  if (id === 'mock-L') return 'Zkušební test – Listening';
  if (id === 'mock-RW') return 'Zkušební test – Reading & Writing';
  let m = id.match(/^(l\d|rw\d)-(\d+)$/);
  if (m && PARTS[m[1]]) { const p = PARTS[m[1]]; return `${p.label}: ${p.name} – ${p.sets[m[2]]?.title || 'Sada ' + (Number(m[2]) + 1)}`; }
  m = id.match(/^vocab-(\w+)-(\w+)$/);
  if (m) { const t = VOCAB.find(v => v.id === m[1]); return `Slovíčka: ${t ? t.cz : m[1]} (${m[2]})`; }
  m = id.match(/^grammar-(\d+)$/);
  if (m && GRAMMAR[m[1]]) return `Gramatika: ${GRAMMAR[m[1]].title}`;
  return id;
}

function viewProgress() {
  const d = Store.load();
  const entries = Object.entries(d.results).sort((a, b) => (b[1].date || '').localeCompare(a[1].date || ''));
  const known = Object.values(d.words).filter(Boolean).length;
  return el('section', null,
    el('h2', null, 'Můj pokrok'),
    el('p', null, `Naučená slovíčka: ${known}. Výsledky se ukládají jen v tomto prohlížeči.`),
    entries.length ? el('table', { class: 'progress' },
      el('tr', null, el('th', null, 'Cvičení'), el('th', null, 'Poslední'), el('th', null, 'Nejlepší'), el('th', null, 'Pokusů'), el('th', null, 'Štíty')),
      entries.map(([id, r]) => el('tr', null,
        el('td', null, labelFor(id)),
        el('td', null, `${r.last}/${r.max}`),
        el('td', null, `${r.best}/${r.max}`),
        el('td', null, r.attempts),
        el('td', null, '🛡️'.repeat(shields(r.best, r.max))))))
      : el('p', { class: 'muted' }, 'Zatím žádné výsledky. Pusť se do cvičení!'),
    el('button', { class: 'btn bad', type: 'button', onclick: () => {
      if (confirm('Opravdu smazat všechny výsledky a naučená slovíčka?')) { Store.reset(); route(); }
    } }, 'Smazat pokrok'));
}

function viewNotFound() {
  return el('section', null, el('h2', null, 'Stránka nenalezena'), el('a', { href: '#/' }, 'Zpět domů'));
}

/* ---------- Router ---------- */

let cleanups = [];

function route() {
  cleanups.forEach(f => f());
  cleanups = [];
  TTS.stop();
  const [page = '', ...args] = location.hash.replace(/^#\/?/, '').split('/');
  const views = {
    '': viewHome,
    info: viewInfo,
    vocab: () => args[0] ? viewVocabTopic(args[0], args[1]) : viewVocab(),
    rw: viewRW,
    listening: viewListening,
    speaking: viewSpeakingList,
    sp: () => viewSpeaking(args[0], args[1]),
    ex: () => viewExercise(args[0], args[1]),
    grammar: viewGrammar,
    mock: () => viewMock(args[0] === 'start'),
    progress: viewProgress
  };
  const view = (Object.prototype.hasOwnProperty.call(views, page) ? views[page] : viewNotFound)();
  $('#app').replaceChildren(view);
  const section = { ex: args[0]?.startsWith('l') ? 'listening' : 'rw', sp: 'speaking' }[page] || page;
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#/' + section));
  window.scrollTo(0, 0);
}

TTS.init();
window.addEventListener('hashchange', route);
route();
