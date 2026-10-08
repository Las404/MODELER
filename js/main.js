/* ════════════════════════════════════════════════════════════
   MODELER — main.js
   인트로 · 라우팅/화면 전환 · 반전세계 진입(균열·파쇄) · 카드 · 모달
   관계도(포스 레이아웃) · 판정 시뮬레이터 · 파티클
   ════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const D = window.MODELER;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const body = document.body;
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  /* 탭이 가려져 애니메이션 타임라인이 멈춰도 전환이 끝나도록 상한을 둔다 */
  const finished = (anim, ms) => Promise.race([anim.finished.catch(() => {}), sleep(ms)]);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* 브라우저 저장소: 실패해도 페이지는 정상 동작 */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('modeler.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('modeler.' + k, JSON.stringify(v)); } catch (e) {} }
  };
  const sess = {
    get(k) { try { return sessionStorage.getItem('modeler.' + k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem('modeler.' + k, v); } catch (e) {} }
  };

  /* ════════════════════ 언어 ════════════════════
     한국어 원문은 index.html · data.js 에 있고, 다른 언어는 js/lang/*.js 가 덮어쓴다 */
  const WANT = window.MODELER_LANG || 'ko';
  const LX = WANT !== 'ko' && window.MODELER_L10N && window.MODELER_L10N.code === WANT ? window.MODELER_L10N : null;
  const LANG = LX ? WANT : 'ko';
  const LD = (LX && LX.data) || {};

  /* 스크립트가 만드는 문구 — 한국어 기본값 (번역 파일 ui 에 같은 키가 있으면 그쪽을 씀) */
  const KO = {
    'site.title': 'MODELER — 모델러 기록',
    'ticker.real': '상황실', 'ticker.reverse': '反轉 감지',
    'warp.world': '세계관', 'warp.modelers': '일반 세계 — 東京', 'warp.gate': '반전세계 경계', 'warp.relations': '관계도',
    'card.aria': '{name} 기록 열람', 'card.forced': '강제 이식', 'card.seal': '해방 보유',
    'stat.factions': '세력', 'stat.modelers': '기록된 모델러', 'stat.releases': '해방 보유자', 'stat.cats': '모델 분류',
    'cat.ex': '예) {ex}', 'cat.count': '현실 기록 {n}명 ›',
    'lock.release': '■■■ ■■ · 무스펠 — 기록 봉인',
    'ladder.EX': '규격 외 · EX / SSS', 'ladder.EXd': '신의 영역. 세계를 멸망시킬 수 있는 수준',
    'ladder.S': '국가 권력급', 'ladder.Sd': '단독으로 군대 · 도시 파괴',
    'ladder.A': '최정예', 'ladder.Ad': '대형 모르포스 대응, 사건의 핵심 주력',
    'ladder.B': '숙련된 전문가', 'ladder.Bd': '중급 모르포스 안정적 공략',
    'ladder.C': '숙련된 전문가', 'ladder.Cd': '중급 모르포스 안정적 공략',
    'ladder.D': '초보', 'ladder.Dd': '하급 모르포스 상대',
    'ladder.E': '초보', 'ladder.Ed': '하급 모르포스 상대',
    'ladder.F': '각성 직후', 'ladder.Fd': '일반인보다 조금 나은 수준',
    'ladder.line': '해방 가능선',
    'fac.sealed': '기록 봉인', 'fac.goReverse': '반전세계에서 열람 ›', 'fac.goMembers': '구성원 {n}명 보기 ›',
    'cls.done': '열람 기록이 남았습니다 — 내부감찰 통보됨',
    'cls.toast': '오리하라 쿄: "아아, 괜찮습니다. ……다만 방금 그 문서, 한 번 더."',
    'hz.who': '{g} 지정 인물 — {names}', 'hz.whoLocked': '{g} 지정 인물 {n}명 — 반전세계 진입 후 열람 가능',
    'grade.doom': '종말급', 'grade.cata': '재앙급', 'grade.haz': '재해급',
    'roe.on': '사살 허가 · 생포 원칙 해제', 'roe.off': '생포 우선',
    'jd.scan': '측정 중……', 'jd.docTitle': '등급 판정서', 'jd.name': '성명', 'jd.model': '모델', 'jd.remark': '비고',
    'jd.mg': '모델 격', 'jd.hg': '보유자 등급', 'jd.dg': '재해 등급', 'jd.signer': '— 등급 판정관 후지사키 레이카',
    'jd.selfRemark': '판정관 본인. 자기 판정은 규정상 불가.',
    'jd.selfQuote': '……제1조 4항. 판정관은 자신을 판정하지 않습니다. 다음 분.',
    'jd.knownLocked': '기록 봉인 — 열람 권한 없음', 'jd.known': '이미 등록된 모델러. 소속: {f}',
    'jd.knownQuote': '……이미 기록이 있습니다. 중복 측정은 받지 않습니다. 다음 분.',
    'jd.unstableQuote': '……측정 불가. 제6조 1항에 따라 판정 보류. 이의는 받지 않습니다.',
    'jd.quote': '……측정 종료. {clause}에 따라 {g}. 이의 있으십니까. 없으면 다음 분.',
    'jd.clause': '제{a}조 {b}항', 'jd.clause7': '제7조', 'jd.pending': '보류',
    'jd.rUnstable': '통제 불가. 등록만 하고 배치 보류. (카라스 사무소 명함이 동봉되어 있다)',
    'jd.rEX': '규격 외. 상층부 즉시 보고. 오라클이 이미 알고 있을 가능성 높음.',
    'jd.rS': '해방 가능선 도달. 판테온 즉시 스카우트 대상.',
    'jd.rA': '최정예 후보. 판테온 · 카라스 스카우트 경쟁 예상.',
    'jd.rRaw': '격 {mg}에 보유자 {g}. 미완성 재능 — 성장 여지 큼.',
    'jd.rBC': '숙련 전문가 과정 배치 권장.',
    'jd.rLow': '기초 훈련 과정 배치. 하급 모르포스 대응부터.',
    'jd.empty': '이름을 입력해 주십시오. — 후지사키',
    'tab.all': '전체', 'tab.oracle': '오라클 · 경계',
    'bn.allEn': 'ALL MODELERS · 現實', 'bn.allName': '현실의 모든 모델러',
    'bn.allMotto': '균열 토벌 · 조직 생활 · 등급 상승. 그리고 아무도 모르는 이면.',
    'bn.allDesc': '판테온, 카라스 사무소, 무소속, 오라클. 현실과 경계에 기록된 모든 모델러를 한 번에 봅니다. 무스펠은 반전세계에서만 열람할 수 있습니다.',
    'bn.base': '거점 · {b}', 'bn.count': '인원', 'bn.top': '최고 등급', 'bn.rel': '해방 보유', 'chip.all': '전체 분류',
    'cm.lockName': '■■■ · 무스펠', 'cm.lockText': '반전세계 진입 후 열람 가능', 'cm.alt': '{name} 일러스트', 'cm.close': '닫기',
    'cm.myth': '{myth} 신화', 'cm.gradeH': '보유자 등급', 'cm.gradeD': '재해 등급', 'cm.faction': '소속', 'cm.age': '나이', 'cm.sex': '성별',
    'cm.speech': '말투 — {s}', 'cm.secP': 'PERSONALITY · 성격', 'cm.secA': 'APPEARANCE · 외형', 'cm.secI': 'ITEMS · 소지품',
    'cm.secR': 'RELEASE · 해방', 'cm.secB': 'RECORD · 배경', 'cm.secRel': 'RELATIONS · 관계', 'cm.open': '▸ 영역 전개',
    'cm.locked': '반전세계 진입 후 열람 가능한 기록입니다.',
    'age': '{n}세', 'sex.여': '여', 'sex.남': '남',
    'dm.ownerLocked': '解放 · ■■■ ■■ · 무스펠 — 보유자 기록 봉인', 'dm.owner': '解放 · {name} · MODEL: {model}',
    'dm.end': '영역 지속 한계 — 해방 종료. 이후 1주간 출력 30%.',
    'gate.hold': '길게 누르기', 'gate.entered': '반전세계 진입 — 무스펠 기록이 해제되었습니다.',
    'tb.ok': '시도 #{n} — 성공 · {model} ({name})', 'tb.lost': '시도 #{n} — 인간성 상실', 'tb.dead': '시도 #{n} — 사망',
    'tb.lgDead': '사망', 'tb.lgLost': '인간성 상실', 'tb.lgOk': '성공 1',
    'rg.sealed': '기록 봉인', 'rg.hintFull': '노드를 선택하세요. 드래그로 위치를 옮길 수 있습니다.', 'rg.faction': '세력',
    'rg.sealedNeed': '기록 봉인 — 반전세계 진입 필요', 'rg.open': '기록 열람 ›',
    'pal.muspel': '무스펠', 'pal.sealed': '기록 봉인', 'pal.none': '검색 결과가 없습니다.',
    'rs.g.pantheon': '판테온 내부', 'rs.g.karasu': '카라스 사무소 내부', 'rs.g.free': '무소속끼리', 'rs.g.oracle': '오라클 내부', 'rs.g.muspel': '무스펠 내부',
    'rs.cross': '세력을 넘는 관계', 'rs.count': '{n}건', 'rs.none': '찾는 관계가 없습니다.', 'rs.relN': '관계 {n}',
    'toc.top': '처음', 'cm.count': '{i} / {n}',
    'hud.secret': '기밀 보기', 'secret.hide': '기밀 숨기기',
    'secret.on': '기밀 열람 — 비밀 설정과 무스펠 기록이 공개됩니다.',
    'secret.off': '기밀을 다시 봉인했습니다.',
    'secret.offKept': '기밀 보기를 껐습니다. 반전세계에 들어간 기록이 있어 무스펠 기록은 계속 보입니다.',
    'mu.g.all': '전체', 'mu.g.main': '메인 타이틀', 'mu.g.chapter': '장 타이틀', 'mu.g.battle': '전투곡', 'mu.g.release': '해방',
    'mu.theme': '{name} 테마', 'mu.releaseOf': '{name} · 해방 「{rel}」',
    'mu.soon': '음원 준비 중', 'mu.count': '{n}곡', 'mu.empty': '찾는 곡이 없습니다.', 'mu.err': '이 곡을 불러오지 못했습니다.',
    'mu.rep.all': '전체 반복', 'mu.rep.one': '한 곡 반복', 'mu.rep.off': '반복 끔',
    'mu.shuffleOn': '셔플 켜짐', 'mu.shuffleOff': '셔플 꺼짐',
    'mu.play': '재생', 'mu.pause': '일시정지',
    'mu.playTheme': '테마곡 재생', 'mu.playRelease': '해방곡 재생',
    'dm.replay': '컷씬 다시 보기', 'cut.aria': '해방 컷씬',
    'mu.select': '선택', 'mu.cancel': '취소', 'mu.addTo': '플레이리스트에 담기', 'mu.newPh': '플레이리스트 이름', 'mu.create': '새로 만들기',
    'mu.newList': '새 플레이리스트', 'mu.selCount': '{n}곡 선택됨', 'mu.myLists': '내 플레이리스트',
    'mu.added': '「{name}」에 {n}곡을 담았습니다.', 'mu.removed': '「{name}」에서 뺐습니다.', 'mu.created': '「{name}」 플레이리스트를 만들었습니다.',
    'mu.rename': '이름 변경', 'mu.delete': '삭제', 'mu.renamePrompt': '플레이리스트의 새 이름', 'mu.delConfirm': '「{name}」 플레이리스트를 삭제할까요?',
    'mu.listEmpty': '아직 담긴 곡이 없습니다. 「전체」 탭에서 곡 옆의 ＋ 를 눌러 담아 보세요.', 'mu.removeFrom': '이 플레이리스트에서 빼기',
    'mu.noLists': '아직 만든 플레이리스트가 없습니다. 아래에서 새로 만들어 보세요.', 'mu.defaultName': '내 플레이리스트 {n}'
  };
  const UI = Object.assign({}, KO, (LX && LX.ui) || {});
  const T = (key, vars) => {
    let s = UI[key] != null ? UI[key] : key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
    return s;
  };

  /* 데이터 번역 덮어쓰기 (원래 한국어 이름은 판정 시뮬레이터 비교용으로 남김) */
  const byIdKoAge = {};
  D.CHARACTERS.forEach(c => { c.nameKo = c.name; c.model.local = c.model.ko; byIdKoAge[c.id] = c.age; });
  if (LX) {
    Object.entries(LD.factions || {}).forEach(([id, f]) => Object.assign(D.FACTIONS[id], f));
    D.CHARACTERS.forEach(c => {
      const t = (LD.chars || {})[c.id];
      if (!t) return;
      ['name', 'role', 'age', 'look', 'persona', 'speech', 'quote', 'bg'].forEach(k => { if (t[k] != null) c[k] = t[k]; });
      if (t.model) c.model.local = t.model;
      if (t.items) c.items = c.items.map((it, i) => Object.assign({}, it, t.items[i] || {}));
      if (t.release && c.release) Object.assign(c.release, t.release);
    });
    (LD.relations || []).forEach((label, i) => { if (D.RELATIONS[i] && label) D.RELATIONS[i].label = label; });
    D.MODEL_CATS.forEach(m => Object.assign(m, (LD.cats || {})[m.id] || {}));
    if (LD.ticker) D.TICKER = LD.ticker;
  }
  const catName = id => ((LD.cats || {})[id] || {}).name || id;
  const mythName = m => (LD.myths || {})[m] || m;
  const vacantName = n => (LD.vacant || {})[n] || n;

  const CHARS = D.CHARACTERS;
  const byId = Object.fromEntries(CHARS.map(c => [c.id, c]));
  const FC = { pantheon: '217,181,106', karasu: '255,122,69', free: '94,211,170', oracle: '176,150,255', muspel: '255,51,75' };
  const hexRgb = h => { const n = parseInt(h.slice(1), 16); return `${n >> 16 & 255},${n >> 8 & 255},${n & 255}`; };
  const ageText = a => /^\d+$/.test(a) ? T('age', { n: a }) : (LANG === 'ko' && /\d$/.test(a) ? a + '세' : a);
  const sexText = s => T('sex.' + s);
  const thumb = id => `assets/char/thumb/${id}.jpg`;
  const full = id => `assets/char/full/${id}.jpg`;
  const gradeInfo = g => D.GRADE_INFO[g] || { label: g, tier: 'd', kind: 'holder' };
  const GRADE_KEY = { '종말급': 'grade.doom', '재앙급': 'grade.cata', '재해급': 'grade.haz' };
  const gradeName = g => GRADE_KEY[g] ? T(GRADE_KEY[g]) : g;

  /* 무스펠 기록은 반전세계에 한 번 들어가거나(unlocked), 상단 「기밀 보기」를 켜면(secretMode) 열린다 */
  let unlocked = store.get('unlocked', false);
  let secretMode = store.get('secret', false);
  const secretsOpen = () => unlocked || secretMode;
  const isLocked = c => c && c.faction === 'muspel' && !secretsOpen();

  /* 괄호 안 구분자는 무시하고 나누기 (한국어 쉼표 · 일본어/중국어 「、」「，」) */
  function splitTop(s) {
    const out = []; let depth = 0, cur = '';
    for (const ch of s) {
      if (ch === '(' || ch === '（') depth++;
      if (ch === ')' || ch === '）') depth--;
      if ((ch === ',' || ch === '、' || ch === '，') && depth === 0) { if (cur.trim()) out.push(cur.trim()); cur = ''; } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }

  /* 정적인 문구 번역 (data-i18n · data-i18n-html · data-i18n-attr) */
  if (LX) {
    const ui = LX.ui || {};
    $$('[data-i18n]').forEach(el => { const v = ui[el.dataset.i18n]; if (v != null) el.textContent = v; });
    $$('[data-i18n-html]').forEach(el => { const v = ui[el.dataset.i18nHtml]; if (v != null) el.innerHTML = v; });
    $$('[data-i18n-attr]').forEach(el => el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      if (ui[key] != null) el.setAttribute(attr, ui[key]);
    }));
    const desc = document.querySelector('meta[name="description"]');
    if (desc && ui['meta.desc']) desc.setAttribute('content', ui['meta.desc']);
  }
  document.title = T('site.title');
  $('#holdText').textContent = T('gate.hold');
  $('#roeState').textContent = T('roe.off');
  document.documentElement.style.setProperty('--ladder-line', `'${T('ladder.line').replace(/'/g, '')} ─────'`);

  /* ════════════════════ 파티클 (에테르 / 잿불) ════════════════════ */
  const FX = (() => {
    const cv = $('#fx'), cx = cv.getContext('2d');
    let W = 0, H = 0, parts = [], mode = 'main', running = true;
    const COL = { b: '160,210,255', g: '235,205,140', r: '255,60,72', o: '255,150,80', a: '150,130,130' };
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn(p, init) {
      const rev = mode === 'reverse';
      const ash = rev && Math.random() < .3;
      p.x = Math.random() * W;
      p.y = init ? Math.random() * H : (ash ? -10 : H + 10);
      p.r = rev ? Math.random() * 2 + .6 : Math.random() * 1.5 + .4;
      p.vx = (Math.random() - .5) * (rev ? .7 : .2);
      p.vy = ash ? Math.random() * .6 + .3 : -(Math.random() * (rev ? 1.2 : .35) + (rev ? .3 : .08));
      p.a = Math.random() * .6 + .2;
      p.t = Math.random() * 6.28;
      p.c = ash ? 'a' : rev ? (Math.random() < .8 ? 'r' : 'o') : (Math.random() < .7 ? 'b' : 'g');
      return p;
    }
    function populate() {
      const n = REDUCE ? 0 : Math.round(clamp(W * H / 16000, 30, 110));
      parts = Array.from({ length: n }, () => spawn({}, true));
    }
    function frame() {
      if (running) {
        cx.clearRect(0, 0, W, H);
        for (const p of parts) {
          p.t += .02;
          p.x += p.vx + Math.sin(p.t) * .18;
          p.y += p.vy;
          if (p.y < -20 || p.y > H + 20 || p.x < -20 || p.x > W + 20) spawn(p, false);
          const a = p.a * (.55 + .45 * Math.sin(p.t * 2));
          cx.fillStyle = `rgba(${COL[p.c]},${a * .16})`;
          cx.beginPath(); cx.arc(p.x, p.y, p.r * 3.4, 0, 6.283); cx.fill();
          cx.fillStyle = `rgba(${COL[p.c]},${a})`;
          cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283); cx.fill();
        }
      }
      requestAnimationFrame(frame);
    }
    resize(); populate(); requestAnimationFrame(frame);
    addEventListener('resize', () => { resize(); populate(); });
    document.addEventListener('visibilitychange', () => { running = !document.hidden; });
    return { setMode(m) { if (m === mode) return; mode = m; populate(); } };
  })();

  /* ════════════════════ 배경 · 티커 · 토스트 ════════════════════ */
  function setBg(name) { $$('.bg').forEach(b => b.classList.toggle('is-on', b.dataset.bg === name)); }

  const Ticker = (() => {
    let cur = '';
    return {
      set(mode) {
        if (mode === cur) return; cur = mode;
        const items = D.TICKER[mode].map(t => `<span>${esc(t).replace(/^\[(.+?)\]/, '<b>[$1]</b>')}</span>`).join('');
        $('#tickerRun').innerHTML = items + items;
        $('#tickerLabel').textContent = T('ticker.' + mode);
      }
    };
  })();

  let toastTimer;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('is-on'), 2600);
  }

  addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--dim', clamp(scrollY / (innerHeight * 1.1), 0, 1).toFixed(3));
  }, { passive: true });

  /* ════════════════════ 리빌 (스크롤 등장) ════════════════════ */
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('in');
      io.unobserve(el);
      if (el.id === 'heroStats') countUp(el);
      /* 등장 후에는 지연값을 지워 호버 반응이 늦지 않게 */
      if (el.style.transitionDelay) setTimeout(() => { el.style.transitionDelay = ''; }, 1400);
    });
  }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });
  const revealScan = () => { if (!body.classList.contains('is-intro')) $$('.reveal:not(.in)').forEach(el => io.observe(el)); };

  function countUp(root) {
    $$('b[data-n]', root).forEach(b => {
      const n = +b.dataset.n, t0 = performance.now();
      const step = t => { const k = clamp((t - t0) / 1200, 0, 1); b.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }

  /* ════════════════════ 라우터 · 화면 전환 ════════════════════ */
  const VIEWS = ['world', 'modelers', 'gate', 'reverse', 'relations'];
  const LABEL = {
    world:     ['ARCHIVE', '世界觀', T('warp.world')],
    modelers:  ['TRANSFER', '現實', T('warp.modelers')],
    gate:      ['WARNING', '境界', T('warp.gate')],
    relations: ['ARCHIVE', '關係', T('warp.relations')]
  };
  let current = null, busy = false;
  const onEnter = {}, onLeave = {};

  function worldFor(view) {
    if (view === 'reverse') return 'reverse';
    if (view === 'relations') return body.dataset.world === 'reverse' ? 'reverse' : 'real';
    return view === 'world' ? 'main' : 'real';
  }

  function show(view, world, push = true) {
    if (current && onLeave[current]) onLeave[current]();
    $$('.view').forEach(v => { v.hidden = v.dataset.view !== view; });
    body.dataset.view = view;
    body.dataset.world = world;
    setBg(world === 'reverse' ? 'reverse' : world === 'main' ? 'main' : 'real');
    FX.setMode(world === 'reverse' ? 'reverse' : 'main');
    Ticker.set(world === 'reverse' ? 'reverse' : 'real');
    $('#hudWorld span').textContent = world === 'reverse' ? '反轉' : '現實';
    $$('#hudNav a').forEach(a => a.classList.toggle('is-active', a.dataset.go === view || (view === 'gate' && a.dataset.go === 'reverse')));
    $('#hud').classList.remove('is-menu');
    window.scrollTo(0, 0);
    const el = $('#v-' + view);
    el.classList.remove('is-entering'); void el.offsetWidth; el.classList.add('is-entering');
    current = view;
    if (push && location.hash.slice(1) !== view) history.pushState(null, '', '#' + view);
    if (onEnter[view]) onEnter[view]();
    Toc.build(view);
    $('#progress i').style.transform = 'scaleX(0)';
    $('#toTop').classList.remove('is-on');
    revealScan();
  }

  async function go(view, opts = {}) {
    if (!VIEWS.includes(view)) view = 'world';
    if (view === 'reverse' && current !== 'reverse') view = 'gate';
    if (view === current || busy) return;
    const world = worldFor(view);
    if (opts.instant) { show(view, world, !opts.pop); return; }
    busy = true;
    try {
      if (body.dataset.world === 'reverse' && world !== 'reverse') await returnTransition(view, world, opts);
      else await shutter(view, world, opts);
    } finally { busy = false; }
  }

  async function shutter(view, world, opts) {
    const w = $('#warp'), l = LABEL[view] || LABEL.world;
    $('#warpKicker').textContent = l[0]; $('#warpTitle').textContent = l[1]; $('#warpSub').textContent = l[2];
    w.classList.remove('is-off'); w.classList.add('is-on');
    await sleep(REDUCE ? 50 : 820);
    w.classList.add('is-label');
    await sleep(REDUCE ? 50 : 620);
    show(view, world, !opts.pop);
    w.classList.remove('is-label');
    await sleep(160);
    w.classList.add('is-off'); w.classList.remove('is-on');
    await sleep(REDUCE ? 50 : 860);
    w.classList.remove('is-off');
  }

  /* 반전세계 → 현실: 붉은 섬광 후 원래 하늘로 */
  async function returnTransition(view, world, opts) {
    const f = $('#flash');
    f.classList.add('is-red');
    await finished(f.animate([{ opacity: 0 }, { opacity: 1 }], { duration: REDUCE ? 50 : 420, easing: 'ease-in', fill: 'forwards' }), 700);
    show(view, world, !opts.pop);
    f.classList.remove('is-red');
    $('#app').classList.add('shake');
    setTimeout(() => $('#app').classList.remove('shake'), 520);
    await finished(f.animate([{ opacity: 1 }, { opacity: 0 }], { duration: REDUCE ? 50 : 1100, easing: 'ease-out', fill: 'forwards' }), 1400);
    f.getAnimations().forEach(a => a.cancel());
  }

  addEventListener('popstate', () => go(location.hash.slice(1) || 'world', { pop: true }));

  /* ════════════════════ 인트로 ════════════════════ */
  const Intro = (() => {
    const el = $('#intro');
    let timers = [], clockT, finished = false;
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    function clock() {
      const t0 = Date.now();
      clockT = setInterval(() => {
        const s = Math.floor((Date.now() - t0) / 10);
        $('#introClock').textContent = `${String(Math.floor(s / 6000)).padStart(2, '0')}:${String(Math.floor(s / 100) % 60).padStart(2, '0')}:${String(s % 100).padStart(2, '0')}`;
      }, 40);
    }
    function decode(node, text, dur = 1100) {
      const glyphs = '神格主反轉ΩΔΣ#%&@01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const t0 = performance.now();
      const step = t => {
        const k = clamp((t - t0) / dur, 0, 1), n = Math.floor(k * text.length);
        node.textContent = text.slice(0, n) + [...text.slice(n)].map(() => glyphs[Math.random() * glyphs.length | 0]).join('');
        if (k < 1) requestAnimationFrame(step); else node.textContent = text;
      };
      requestAnimationFrame(step);
    }
    function play() {
      finished = false;
      el.hidden = false;
      el.className = 'intro';
      body.classList.add('is-intro');
      $$('.intro__line', el).forEach(l => l.classList.remove('on'));
      clock();
      const lines = $$('.intro__line', el);
      at(250, () => el.classList.add('p1'));
      at(1500, () => lines[0].classList.add('on'));
      at(3100, () => { lines[0].classList.remove('on'); lines[1].classList.add('on'); });
      at(4700, () => { lines[1].classList.remove('on'); lines[2].classList.add('on'); });
      at(6400, () => lines[2].classList.remove('on'));
      at(6800, () => { el.classList.add('p3'); });
      at(7900, () => { el.classList.add('p4'); decode($('.intro__logo', el), 'MODELER'); });
    }
    function finish() {
      if (finished) return; finished = true;
      timers.forEach(clearTimeout); timers = [];
      clearInterval(clockT);
      sess.set('intro', '1');
      el.classList.add('p1', 'p3', 'p4', 'is-out');
      body.classList.remove('is-intro');
      setTimeout(revealScan, 450);
      setTimeout(() => { el.hidden = true; }, 1300);
    }
    $('#introEnter').addEventListener('click', finish);
    $('#introSkip').addEventListener('click', finish);
    el.addEventListener('keydown', e => { if (e.key === 'Escape') finish(); });
    return {
      start(force) {
        if (!force && sess.get('intro')) { el.hidden = true; body.classList.remove('is-intro'); revealScan(); return; }
        play();
      }
    };
  })();

  /* ════════════════════ 카드 ════════════════════ */
  function gbadge(g) {
    const i = gradeInfo(g);
    return `<span class="gbadge" data-tier="${i.tier}" title="${esc(g)}"><span>${esc(i.label)}</span></span>`;
  }

  function cardHTML(c, i) {
    const f = D.FACTIONS[c.faction], info = gradeInfo(c.grade);
    const q = c.quote.length > 52 ? c.quote.slice(0, 50) + '…' : c.quote;
    return `
      <button class="mcard" type="button" data-char="${c.id}" data-tier="${info.tier}" style="--acc:${c.accent};--d:${i}" aria-label="${esc(T('card.aria', { name: c.name }))}">
        <span class="mcard__clip">
          <img class="mcard__img" src="${thumb(c.id)}" alt="" loading="lazy" decoding="async">
          <span class="mcard__shade"></span><span class="mcard__holo"></span><span class="mcard__glare"></span>
        </span>
        <span class="mcard__frame"></span>
        <span class="mcard__top"><span class="mcard__sig" title="${esc(f.name)}"><svg><use href="#sig-${c.faction}"/></svg></span>${gbadge(c.grade)}</span>
        ${c.model.forced ? `<span class="mcard__forced">${T('card.forced')}</span>` : ''}
        <span class="mcard__info">
          <span class="mcard__model">MODEL: ${esc(c.model.en)}</span>
          <span class="mcard__name">${esc(c.name)}</span>
          <span class="mcard__meta">${esc(c.role)}<i></i>${esc(ageText(c.age))}<i></i>${esc(sexText(c.sex))}</span>
          <span class="mcard__quote">“${esc(q)}”</span>
        </span>
        ${c.release ? `<span class="mcard__seal" title="${T('card.seal')}">解</span>` : ''}
      </button>`;
  }

  /* 카드 기울기 (마우스 전용) */
  document.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || REDUCE) return;
    const card = e.target.closest('.mcard');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    card.classList.add('is-tilting');
    card.style.setProperty('--ry', ((px - .5) * 16).toFixed(2) + 'deg');
    card.style.setProperty('--rx', ((.5 - py) * 14).toFixed(2) + 'deg');
    card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
    card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
  });
  document.addEventListener('pointerout', e => {
    const card = e.target.closest && e.target.closest('.mcard');
    if (!card || card.contains(e.relatedTarget)) return;
    card.classList.remove('is-tilting');
    card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg');
  });

  /* ════════════════════ 세계관 페이지 ════════════════════ */
  function renderWorld() {
    const releasers = CHARS.filter(c => c.release);
    $('#heroStats').innerHTML = [
      [Object.keys(D.FACTIONS).length, T('stat.factions')], [CHARS.length, T('stat.modelers')], [releasers.length, T('stat.releases')], [D.MODEL_CATS.length, T('stat.cats')]
    ].map(([n, l]) => `<div><b data-n="${n}">0</b><span>${l}</span></div>`).join('');

    /* 모델 분류 */
    $('#catGrid').innerHTML = D.MODEL_CATS.map((m, i) => {
      const n = CHARS.filter(c => c.model.cat === m.id && c.faction !== 'muspel').length;
      return `<button class="cat reveal" type="button" data-cat="${m.id}" style="transition-delay:${i * 60}ms">
        <span class="cat__hanja">${m.hanja}</span>
        <span class="cat__en">${m.en}</span>
        <span class="cat__name">${catName(m.id)}</span>
        <span class="cat__desc">${m.desc}</span>
        <span class="cat__ex">${T('cat.ex', { ex: m.ex })}</span>
        <span class="cat__count">${T('cat.count', { n })}</span>
      </button>`;
    }).join('');
    $('#catGrid').onclick = e => {
      const b = e.target.closest('[data-cat]'); if (!b) return;
      M.state.faction = 'all'; M.state.cat = b.dataset.cat; M.state.q = '';
      if (current === 'modelers') M.render(); else go('modelers');
    };

    renderReleases();
    renderLadder();
    renderFactions();
  }

  function renderReleases() {
    const order = ['amagi', 'tendo', 'hayase', 'konoe', 'ashiya', 'kuga', 'hiiragi', 'kuroiwa'];
    $('#releaseGrid').innerHTML = order.map((id, i) => {
      const c = byId[id], lock = isLocked(c);
      return `<button class="rcard reveal${lock ? ' is-locked' : ''}" type="button" data-release="${id}" style="--rc:${hexRgb(c.accent)};transition-delay:${(i % 4) * 70}ms">
        <img src="assets/release/${id}.jpg" alt="" loading="lazy">
        <span class="rcard__hanja">${c.release.hanja}</span>
        <span class="rcard__body">
          <span class="rcard__name">${c.release.name}</span>
          <span class="rcard__owner">${lock ? T('lock.release') : `${esc(c.name)} · ${D.FACTIONS[c.faction].name}`}</span>
        </span>
      </button>`;
    }).join('');
    revealScan();
  }

  const LADDER = [['EX', 'ex'], ['S', 's'], ['A', 'a'], ['B', 'b'], ['C', 'c'], ['D', 'd'], ['E', 'd'], ['F', 'f']];
  const TIER_COL = { ex: '#ffd36b', s: '#f2c86b', a: '#b892ff', b: '#5fd3c6', c: '#86d68f', d: '#9aa6b8', f: '#6c778d' };
  function renderLadder() {
    $('#ladder').innerHTML = LADDER.map(([g, t]) => {
      const who = CHARS.filter(c => c.grade === g);
      return `<li class="${g === 'S' ? 'is-line' : ''}" style="--gc:${TIER_COL[t]}" title="${esc(who.map(c => c.name).join(', '))}">
        <span class="ladder__g">${g}</span>
        <span class="ladder__d"><b>${T('ladder.' + g)}</b>${T('ladder.' + g + 'd')}</span>
        <span class="ladder__n">${who.map(() => '<i></i>').join('')}</span>
      </li>`;
    }).join('');
  }

  function renderFactions() {
    const order = ['pantheon', 'karasu', 'free', 'oracle', 'muspel'];
    $('#factionGrid').innerHTML = order.map((id, i) => {
      const f = D.FACTIONS[id], mem = CHARS.filter(c => c.faction === id), lock = id === 'muspel' && !secretsOpen();
      return `<article class="fcard reveal" style="--fc:${FC[id]};transition-delay:${(i % 3) * 80}ms">
        <div class="fcard__img" style="background-image:url('${f.img}')"><span class="fcard__sig"><svg><use href="#sig-${id}"/></svg></span></div>
        <div class="fcard__body">
          <span class="fcard__en">${f.en}</span>
          <h3 class="fcard__name">${f.name}</h3>
          <span class="fcard__type">${f.type} · ${f.base}</span>
          <p class="fcard__motto">“${f.motto}”</p>
          <p class="fcard__desc">${f.desc}</p>
          <div class="fcard__foot">
            <span class="avatars${lock ? ' is-locked' : ''}">${mem.map(c => `<span style="background-image:url('${thumb(c.id)}')" title="${lock ? T('fac.sealed') : esc(c.name)}"></span>`).join('')}</span>
            <button class="fcard__go" type="button" data-faction="${id}">${lock ? T('fac.goReverse') : T('fac.goMembers', { n: mem.length })}</button>
          </div>
        </div>
      </article>`;
    }).join('');
    revealScan();
  }
  $('#factionGrid').addEventListener('click', e => {
    const b = e.target.closest('[data-faction]'); if (!b) return;
    const id = b.dataset.faction;
    if (id === 'muspel' && !secretsOpen()) { go('reverse'); return; }
    M.state.faction = id; M.state.cat = 'all'; M.state.q = '';
    if (current === 'modelers') M.render(); else go('modelers');
  });

  /* 해방 카드 → 영역 */
  document.addEventListener('click', e => {
    const r = e.target.closest('[data-release]');
    if (r) Domain.open(byId[r.dataset.release], e);
  });

  /* 표면 / 이면 */
  const duality = $('#duality');
  const flip = () => { duality.classList.toggle('is-flipped'); };
  duality.addEventListener('click', flip);
  duality.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });

  /* 기밀 해제 */
  $('#declassify').addEventListener('click', e => {
    const box = $('#classified');
    if (box.classList.contains('is-open')) return;
    box.classList.add('is-open');
    e.currentTarget.textContent = T('cls.done');
    e.currentTarget.disabled = true;
    setTimeout(() => toast(T('cls.toast')), 900);
  });

  /* 재해 등급 행 */
  $('#hazard').addEventListener('click', e => {
    const row = e.target.closest('.hazard__row'); if (!row) return;
    $$('.hazard__row').forEach(r => r.classList.toggle('is-on', r === row && !r.classList.contains('is-on')));
    const g = { doom: '종말급', cata: '재앙급', haz: '재해급' }[row.dataset.h];
    const who = CHARS.filter(c => c.grade === g);
    toast(secretsOpen() ? T('hz.who', { g: gradeName(g), names: who.map(c => c.name).join(', ') }) : T('hz.whoLocked', { g: gradeName(g), n: who.length }));
  });

  /* 교전 규칙 스위치 */
  $('#roeToggle').addEventListener('click', e => {
    const t = e.currentTarget, on = t.getAttribute('aria-checked') !== 'true';
    t.setAttribute('aria-checked', String(on));
    $('#roeCard').classList.toggle('is-on', on);
    $('#roeState').textContent = on ? T('roe.on') : T('roe.off');
    $$('.hazard__row').forEach(r => r.classList.toggle('is-on', on && r.dataset.h === 'cata'));
    if (on) { $('#roeCard').classList.add('shake'); setTimeout(() => $('#roeCard').classList.remove('shake'), 520); }
  });

  /* 세 겹의 세계: 마우스 시차 */
  const layers = $('#layers');
  layers.addEventListener('pointermove', e => {
    const r = layers.getBoundingClientRect();
    layers.style.setProperty('--tx', (((e.clientX - r.left) / r.width - .5) * 14).toFixed(1) + 'deg');
    layers.style.setProperty('--ty', (((e.clientY - r.top) / r.height - .5) * -10).toFixed(1) + 'deg');
  });
  layers.addEventListener('pointerleave', () => { layers.style.setProperty('--tx', '0deg'); layers.style.setProperty('--ty', '0deg'); });

  /* ════════════════════ 등급 판정 시뮬레이터 ════════════════════ */
  const Judge = (() => {
    const fnv = s => { let h = 2166136261; for (const ch of s) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
    const rngOf = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const W = [['F', 17], ['E', 22], ['D', 22], ['C', 18], ['B', 11.5], ['A', 6.5], ['S', 2.6], ['EX', .4]];
    const CLAUSE = { F: [1, 1], E: [1, 3], D: [2, 1], C: [2, 4], B: [3, 2], A: [4, 1], S: [5, 1] };
    const clause = g => CLAUSE[g] ? T('jd.clause', { a: CLAUSE[g][0], b: CLAUSE[g][1] }) : T('jd.clause7');
    const MG = { '주신': ['S', 'EX'], '신격': ['A', 'S'], '반신': ['A', 'S'], '영웅': ['B', 'A'], '신기': ['A', 'S'], '괴수': ['B', 'S'], '환수': ['A', 'S'] };
    const ORDER = ['F', 'E', 'D', 'C', 'B', 'A', 'S', 'EX'];
    function pick(r, list) { const tot = list.reduce((a, b) => a + b[1], 0); let x = r() * tot; for (const [k, w] of list) { if ((x -= w) <= 0) return k; } return list[0][0]; }
    function measure(name) {
      const key = name.replace(/[\s·・]/g, '').toLowerCase();
      const known = CHARS.find(c => [c.name, c.nameKo].some(n => n.replace(/[\s·・]/g, '').toLowerCase() === key));
      const r = rngOf(fnv(name.trim()));
      const serial = String(fnv(name) % 100000).padStart(5, '0');
      if (known) return { known, serial };
      const [model, cat, myth] = D.VACANT_MODELS[Math.floor(r() * D.VACANT_MODELS.length)];
      const g = pick(r, W);
      const mg = MG[cat][r() < .5 ? 0 : 1];
      const unstable = r() < .045;
      let remark;
      if (unstable) remark = T('jd.rUnstable');
      else if (g === 'EX') remark = T('jd.rEX');
      else if (g === 'S') remark = T('jd.rS');
      else if (g === 'A') remark = T('jd.rA');
      else if (ORDER.indexOf(mg) - ORDER.indexOf(g) >= 3) remark = T('jd.rRaw', { mg, g });
      else if (g === 'B' || g === 'C') remark = T('jd.rBC');
      else remark = T('jd.rLow');
      return { model: vacantName(model), cat: catName(cat), myth: mythName(myth), g: unstable ? T('jd.pending') : g, mg, remark, unstable, serial };
    }
    function render(name) {
      const paper = $('#judgePaper');
      paper.innerHTML = `<div class="judge__empty is-scan"><svg><use href="#sig-pantheon"/></svg><p>${T('jd.scan')}</p></div>`;
      const row = (k, v) => `<div class="doc__row"><span>${T(k)}</span><b>${v}</b></div>`;
      setTimeout(() => {
        const m = measure(name);
        let rows, grades, quote;
        if (m.known) {
          const c = m.known;
          if (c.id === 'fujisaki') {
            rows = row('jd.name', esc(c.name)) + row('jd.remark', T('jd.selfRemark'));
            grades = `<div><small>${T('jd.mg')}</small><b>—</b></div><div><small>${T('jd.hg')}</small><b>—</b></div>`;
            quote = T('jd.selfQuote');
          } else {
            const lock = isLocked(c);
            rows = row('jd.name', esc(c.name))
              + row('jd.model', `${esc(c.model.local)} <small>(${catName(c.model.cat)}/${mythName(c.model.myth)})</small>`)
              + row('jd.remark', lock ? T('jd.knownLocked') : T('jd.known', { f: D.FACTIONS[c.faction].name }));
            grades = `<div><small>${T('jd.mg')}</small><b>${lock ? '■' : '—'}</b></div><div><small>${gradeInfo(c.grade).kind === 'disaster' ? T('jd.dg') : T('jd.hg')}</small><b>${lock ? '■' : esc(gradeName(c.grade))}</b></div>`;
            quote = T('jd.knownQuote');
          }
        } else {
          rows = row('jd.name', esc(name))
            + row('jd.model', `${esc(m.model)} <small>(${m.cat}/${m.myth})</small>`)
            + row('jd.remark', m.remark);
          grades = `<div><small>${T('jd.mg')}</small><b>${m.mg}</b></div><div><small>${T('jd.hg')}</small><b>${m.g}</b></div>`;
          quote = m.unstable ? T('jd.unstableQuote') : T('jd.quote', { clause: clause(m.g), g: m.g });
        }
        paper.innerHTML = `<div class="doc">
          <div class="doc__head"><b>${T('jd.docTitle')}</b><span>PANTHEON · No.${m.serial}</span></div>
          ${rows}
          <div class="doc__grades">${grades}</div>
          <p class="doc__quote">“${quote}”<small>${T('jd.signer')}</small></p>
          <div class="doc__stamp">判定<small>PANTHEON</small></div>
        </div>`;
      }, 1200);
    }
    $('#judgeForm').addEventListener('submit', e => {
      e.preventDefault();
      const v = $('#judgeName').value.trim();
      if (!v) { $('#judgeName').focus(); toast(T('jd.empty')); return; }
      render(v);
    });
  })();

  /* ════════════════════ 모델러 페이지 ════════════════════ */
  const M = (() => {
    const state = { faction: 'pantheon', cat: 'all', q: '', sort: 'default' };
    let list = [];
    /* 기밀이 열려 있으면 무스펠 탭도 현실 페이지에서 바로 볼 수 있다 */
    const tabIds = () => secretsOpen() ? ['pantheon', 'karasu', 'free', 'oracle', 'muspel', 'all'] : ['pantheon', 'karasu', 'free', 'oracle', 'all'];
    const visible = c => secretsOpen() || c.faction !== 'muspel';
    function tabs() {
      if (!tabIds().includes(state.faction)) state.faction = 'pantheon';
      $('#ftabs').innerHTML = tabIds().map(id => {
        const f = D.FACTIONS[id];
        const n = id === 'all' ? CHARS.filter(visible).length : CHARS.filter(c => c.faction === id).length;
        const sig = id === 'all' ? 'sig-border' : 'sig-' + id;
        const name = id === 'all' ? T('tab.all') : id === 'oracle' ? T('tab.oracle') : f.name;
        const rgb = id === 'all' ? '121,195,255' : FC[id];
        return `<button class="ftab${state.faction === id ? ' is-active' : ''}" type="button" role="tab" aria-selected="${state.faction === id}" data-tab="${id}" style="--fc:${rgb}"><svg><use href="#${sig}"/></svg>${name}<small>${n}</small></button>`;
      }).join('');
    }
    function banner() {
      const id = state.faction, b = $('#fbanner');
      if (id === 'all') {
        b.style.setProperty('--fc', '121,195,255');
        b.innerHTML = `<div class="fbanner__img" style="background-image:url('assets/bg/real.jpg')"><svg class="fbanner__sig"><use href="#sig-border"/></svg></div>
          <div class="fbanner__body"><span class="fbanner__en">${T('bn.allEn')}</span><h3 class="fbanner__name">${T('bn.allName')}</h3>
          <p class="fbanner__motto">“${T('bn.allMotto')}”</p>
          <p class="fbanner__desc">${T('bn.allDesc')}</p>${stats(CHARS.filter(visible))}</div>`;
        return;
      }
      const f = D.FACTIONS[id], mem = CHARS.filter(c => c.faction === id);
      b.style.setProperty('--fc', FC[id]);
      b.innerHTML = `<div class="fbanner__img" style="background-image:url('${f.img}')"><svg class="fbanner__sig"><use href="#sig-${id}"/></svg></div>
        <div class="fbanner__body">
          <span class="fbanner__en">${f.en}</span>
          <h3 class="fbanner__name">${f.name}</h3>
          <div class="fbanner__meta"><span>${f.type}</span><span>${T('bn.base', { b: f.base })}</span></div>
          <p class="fbanner__motto">“${f.motto}”</p>
          <p class="fbanner__desc">${f.desc}</p>
          <div class="tags">${f.tags.map(t => `<span>${t}</span>`).join('')}</div>
          ${stats(mem)}
        </div>`;
    }
    function stats(mem) {
      const top = mem.slice().sort((a, b) => D.GRADE_RANK[b.grade] - D.GRADE_RANK[a.grade])[0];
      return `<div class="fbanner__stats">
        <div><b>${mem.length}</b><span>${T('bn.count')}</span></div>
        <div><b>${top ? top.grade : '-'}</b><span>${T('bn.top')}</span></div>
        <div><b>${mem.filter(c => c.release).length}</b><span>${T('bn.rel')}</span></div>
      </div>`;
    }
    function chips() {
      const cats = ['all', ...D.MODEL_CATS.map(m => m.id)];
      $('#catChips').innerHTML = cats.map(c => `<button class="chip${state.cat === c ? ' is-on' : ''}" type="button" data-c="${c}">${c === 'all' ? T('chip.all') : catName(c)}</button>`).join('');
    }
    function filtered() {
      const q = state.q.trim().toLowerCase();
      let l = CHARS.filter(c => visible(c) && (state.faction === 'all' || c.faction === state.faction));
      if (state.cat !== 'all') l = l.filter(c => c.model.cat === state.cat);
      if (q) l = l.filter(c => [c.name, c.nameKo, c.model.local, c.model.ko, c.model.en, c.role, mythName(c.model.myth), catName(c.model.cat), D.FACTIONS[c.faction].name, ...c.persona].join(' ').toLowerCase().includes(q));
      const age = c => { const ko = byIdKoAge[c.id], n = parseInt(ko.replace(/\D+/g, ''), 10); return isNaN(n) || /불명/.test(ko) ? 999 : n; };
      if (state.sort === 'grade') l.sort((a, b) => D.GRADE_RANK[b.grade] - D.GRADE_RANK[a.grade]);
      if (state.sort === 'name') l.sort((a, b) => a.name.localeCompare(b.name, LANG === 'zh' ? 'zh-Hant' : LANG));
      if (state.sort === 'age') l.sort((a, b) => age(b) - age(a));
      return l;
    }
    function grid() {
      list = filtered();
      $('#realCards').innerHTML = list.map(cardHTML).join('');
      $('#realEmpty').hidden = list.length > 0;
    }
    function render() {
      tabs(); banner(); chips(); grid();
      $('#qInput').value = state.q; $('#sortSel').value = state.sort;
    }
    $('#ftabs').addEventListener('click', e => {
      const t = e.target.closest('[data-tab]'); if (!t || t.dataset.tab === state.faction) return;
      state.faction = t.dataset.tab;
      tabs(); banner(); grid();
    });
    $('#catChips').addEventListener('click', e => {
      const c = e.target.closest('[data-c]'); if (!c) return;
      state.cat = c.dataset.c; chips(); grid();
    });
    let qT;
    $('#qInput').addEventListener('input', e => { clearTimeout(qT); qT = setTimeout(() => { state.q = e.target.value; grid(); }, 140); });
    $('#sortSel').addEventListener('change', e => { state.sort = e.target.value; grid(); });
    $('#btnRandom').addEventListener('click', () => {
      if (!list.length) return;
      const c = list[Math.floor(Math.random() * list.length)];
      Modal.open(c.id, list.map(x => x.id));
    });
    return { state, render, get ids() { return list.map(c => c.id); } };
  })();
  onEnter.modelers = () => M.render();

  /* 카드 클릭 → 상세 */
  document.addEventListener('click', e => {
    const card = e.target.closest('[data-char]');
    if (!card || card.closest('#cmodal')) return;
    e.preventDefault();
    const id = card.dataset.char;
    let ctx;
    if (card.closest('#realCards')) ctx = M.ids;
    else if (card.closest('#muspelCards')) ctx = CHARS.filter(c => c.faction === 'muspel').map(c => c.id);
    Modal.open(id, ctx);
  });

  /* ════════════════════ 캐릭터 상세 모달 ════════════════════ */
  const Modal = (() => {
    const root = $('#cmodal'), panel = $('#cmPanel');
    let ctx = [], idx = 0, lastFocus = null;
    function relsOf(id) {
      return D.RELATIONS.filter(r => r.a === id || r.b === id).map(r => {
        const other = r.a === id ? r.b : r.a;
        const arrow = r.dir === '<>' ? '↔' : (r.a === id ? '→' : '←');
        return { other, arrow, label: r.label };
      });
    }
    function relHTML(rel) {
      if (rel.other.startsWith('f:')) {
        const f = D.FACTIONS[rel.other.slice(2)];
        return `<div class="cm__rel"><span class="cm__relhub" style="color:rgb(${FC[f.id]})"><svg><use href="#sig-${f.id}"/></svg></span><span><b>${f.name}<em>${rel.arrow}</em></b><span>${esc(rel.label)}</span></span></div>`;
      }
      const o = byId[rel.other], lock = isLocked(o);
      return `<button class="cm__rel${lock ? ' is-locked' : ''}" type="button" data-rel="${o.id}">
        <img src="${thumb(o.id)}" alt="" loading="lazy">
        <span><b>${lock ? T('cm.lockName') : esc(o.name)}<em>${rel.arrow}</em></b><span>${lock ? T('cm.lockText') : esc(rel.label)}</span></span>
      </button>`;
    }
    function html(c) {
      const f = D.FACTIONS[c.faction], gi = gradeInfo(c.grade);
      const rels = relsOf(c.id);
      return `
        <div class="cm__portrait">
          <img src="${full(c.id)}" alt="${esc(T('cm.alt', { name: c.name }))}">
          <span class="cm__flabel"><svg><use href="#sig-${c.faction}"/></svg>${f.name}</span>
          <span class="cm__wm${gi.kind === 'disaster' ? ' is-kanji' : ''}">${esc(gi.label)}</span>
        </div>
        <div class="cm__content">
          <button class="cm__close" type="button" data-close aria-label="${T('cm.close')}"><svg><use href="#i-close"/></svg></button>
          <p class="cm__eyebrow">${f.en} · ${esc(c.role)}${ctx.length > 1 ? `<span class="cm__count">${T('cm.count', { i: idx + 1, n: ctx.length })}</span>` : ''}</p>
          <h2 class="cm__name" id="cmName">${esc(c.name)}</h2>
          <div class="cm__model"><code>MODEL: ${esc(c.model.en)}</code><span>${esc(c.model.local)}</span><span>${catName(c.model.cat)}</span><span>${T('cm.myth', { myth: mythName(c.model.myth) })}</span>${c.model.forced ? `<span class="is-forced">${T('card.forced')}</span>` : ''}</div>
          <div class="cm__stats">
            <div><small>${gi.kind === 'disaster' ? T('cm.gradeD') : T('cm.gradeH')}</small><b>${esc(gradeName(c.grade))}</b></div>
            <div><small>${T('cm.faction')}</small><b>${f.name}</b></div>
            <div><small>${T('cm.age')}</small><b>${esc(ageText(c.age))}</b></div>
            <div><small>${T('cm.sex')}</small><b>${esc(sexText(c.sex))}</b></div>
          </div>
          <blockquote class="cm__quote"><p>“${esc(c.quote)}”</p><small>${esc(T('cm.speech', { s: c.speech }))}</small></blockquote>
          ${Music.has('t-' + c.id) ? `<button class="cm__theme${Music.cur === 't-' + c.id ? ' is-cur' : ''}" type="button" data-play="t-${c.id}"><svg><use href="#i-music"/></svg><span><small>${T('mu.playTheme')}</small><b>${esc(Music.titleOf('t-' + c.id))}</b></span><i class="eq" aria-hidden="true"><b></b><b></b><b></b></i></button>` : ''}
          <section class="cm__sec"><h4>${T('cm.secP')}</h4><div class="cm__chips cm__chips--persona">${c.persona.map(p => `<span>${esc(p)}</span>`).join('')}</div></section>
          <section class="cm__sec"><h4>${T('cm.secA')}</h4><div class="cm__chips">${splitTop(c.look).map(p => `<span>${esc(p)}</span>`).join('')}</div></section>
          <section class="cm__sec"><h4>${T('cm.secI')}</h4><div class="cm__items">${c.items.map(it => `<div class="cm__item${it.core ? ' is-core' : ''}"><b>${esc(it.n)}</b>${it.d ? `<p>${esc(it.d)}</p>` : ''}</div>`).join('')}</div></section>
          ${c.release ? `<section class="cm__sec"><h4>${T('cm.secR')}</h4>
            <button class="cm__release" type="button" data-release="${c.id}" style="background-image:url('assets/release/${c.id}.jpg')">
              <span class="cm__release-in"><small>解放 · ${c.release.hanja}</small><b>「${esc(c.release.name)}」<span>${c.release.hanja}</span></b><p>${esc(c.release.desc)}</p><em>${T('cm.open')}</em></span>
            </button>
            ${Music.has('r-' + c.id) ? `<button class="cm__theme cm__theme--rel${Music.cur === 'r-' + c.id ? ' is-cur' : ''}" type="button" data-play="r-${c.id}"><svg><use href="#i-music"/></svg><span><small>${T('mu.playRelease')}</small><b>${esc(Music.titleOf('r-' + c.id))}</b></span><i class="eq" aria-hidden="true"><b></b><b></b><b></b></i></button>` : ''}</section>` : ''}
          <section class="cm__sec"><h4>${T('cm.secB')}</h4><p>${esc(c.bg)}</p></section>
          ${rels.length ? `<section class="cm__sec"><h4>${T('cm.secRel')}</h4><div class="cm__rels">${rels.map(relHTML).join('')}</div></section>` : ''}
        </div>`;
    }
    function paint(dir) {
      const c = byId[ctx[idx]];
      panel.style.setProperty('--acc', c.accent);
      panel.innerHTML = html(c);
      panel.scrollTop = 0;
      if (dir) {
        panel.style.setProperty('--sx', dir > 0 ? '40px' : '-40px');
        panel.classList.remove('is-swap'); void panel.offsetWidth; panel.classList.add('is-swap');
      }
      const multi = ctx.length > 1;
      $('#cmPrev').hidden = !multi; $('#cmNext').hidden = !multi;
    }
    function open(id, list) {
      const c = byId[id];
      if (!c) return;
      if (isLocked(c)) { toast(T('cm.locked')); return; }
      ctx = (list && list.includes(id) ? list : CHARS.filter(x => x.faction === c.faction).map(x => x.id)).filter(x => !isLocked(byId[x]));
      idx = ctx.indexOf(id);
      const wasOpen = !root.hidden;
      if (!wasOpen) lastFocus = document.activeElement;
      root.hidden = false;
      body.classList.add('is-locked');
      paint(wasOpen ? 1 : 0);
      if (!wasOpen) { panel.style.animation = 'none'; void panel.offsetWidth; panel.style.animation = ''; }
      $('.cm__close', panel).focus({ preventScroll: true });
    }
    function close() {
      if (root.hidden) return;
      root.hidden = true;
      body.classList.remove('is-locked');
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    function step(d) { if (ctx.length < 2) return; idx = (idx + d + ctx.length) % ctx.length; paint(d); }
    root.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) { close(); return; }
      const rel = e.target.closest('[data-rel]');
      if (rel) {
        const o = byId[rel.dataset.rel];
        if (isLocked(o)) { toast(T('cm.locked')); return; }
        if (!ctx.includes(o.id)) { ctx = CHARS.filter(x => x.faction === o.faction && !isLocked(x)).map(x => x.id); }
        idx = ctx.indexOf(o.id); paint(1);
      }
    });
    $('#cmPrev').addEventListener('click', () => step(-1));
    $('#cmNext').addEventListener('click', () => step(1));
    /* 모바일 스와이프 */
    let sx = null;
    panel.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    panel.addEventListener('touchend', e => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 70) step(dx < 0 ? 1 : -1);
    });
    return { open, close, step, get isOpen() { return !root.hidden; } };
  })();

  /* ════════════════════ 해방 컷씬 ════════════════════
     흐름: 레터박스 → 캐릭터 등장 → 대사 1 → 섬광 · 「解放」 → 영역이 펼쳐지며 해방명 → 대사 2 → 영역 화면
     화면을 누르면 대사가 바로 다 나오거나 다음 단계로, SKIP / Esc 로 건너뛰기 */
  const CUT_CONF = {
    amagi:   { fx: 'rays',   from: 'bottom' },
    tendo:   { fx: 'storm',  from: 'right' },
    ashiya:  { fx: 'mirror', from: 'fade' },
    kuga:    { fx: 'chain',  from: 'left' },
    hiiragi: { fx: 'frost',  from: 'fade' },
    kuroiwa: { fx: 'fog',    from: 'dark' },
    hayase:  { fx: 'walls',  from: 'left' },
    konoe:   { fx: 'runes',  from: 'top' }
  };
  const Cut = (() => {
    const root = $('#cut'), cv = $('#cutFx'), cx = cv.getContext('2d');
    let token = 0, raf = null, W = 0, H = 0, power = .25, kind = '', col = '255,255,255';
    let parts = [], slashes = [], rings = [], bolt = 0, eclipse = 0, t0 = 0;
    let waker = null, typing = null, finishCb = null;

    /* ── 기다림 · 타자기 (누르면 앞당겨짐) ── */
    const pause = ms => new Promise(res => {
      const done = () => { clearTimeout(t); if (waker === done) waker = null; res(); };
      const t = setTimeout(done, REDUCE ? Math.min(ms, 300) : ms);
      waker = done;
    });
    function type(el, text, tk) {
      return new Promise(res => {
        let i = 0; el.textContent = '';
        const fin = () => { clearInterval(iv); typing = null; el.textContent = text; res(); };
        const iv = setInterval(() => {
          if (tk !== token) { clearInterval(iv); typing = null; res(); return; }
          el.textContent = text.slice(0, ++i);
          if (i >= text.length) fin();
        }, 36);
        typing = fin;
      });
    }

    /* ── 효과 캔버스 ── */
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const rnd = (a, b) => a + Math.random() * (b - a);
    function seed() {
      parts = []; slashes = []; rings = []; bolt = 0; eclipse = 0;
      const n = { rays: 60, storm: 220, mirror: 46, chain: 40, frost: 140, fog: 70, walls: 90, runes: 34 }[kind] || 60;
      for (let i = 0; i < n; i++) parts.push({ x: rnd(0, W), y: rnd(0, H), s: rnd(.4, 1.4), r: rnd(0, 6.28), v: rnd(.3, 1), k: Math.random() });
    }
    function burst() {
      rings.push({ r: 0, a: 1 });
      if (kind === 'storm') { bolt = 1; for (let i = 0; i < 8; i++) slashes.push({ y: H * (.12 + i * .1) + rnd(-20, 20), d: Math.random() < .5 ? 1 : -1, p: -i * .08 }); }
      if (kind === 'chain') for (let i = 0; i < 26; i++) parts.push({ x: W / 2, y: H * .45, s: rnd(.8, 1.8), r: rnd(0, 6.28), v: rnd(4, 11), k: 2, a: rnd(0, 6.28) });
      if (kind === 'walls') for (let i = 0; i < 9; i++) slashes.push({ x: (i + .5) / 9 * W, w: W / 9 * rnd(.5, .85), h: rnd(.35, .7) * H, p: -i * .05 });
    }
    function draw(t) {
      const dt = (t - t0) / 1000; t0 = t;
      cx.clearRect(0, 0, W, H);
      const P = power, c = col;
      if (kind === 'rays') {
        cx.save(); cx.translate(W / 2, -H * .08); cx.rotate(t / 9000);
        for (let i = 0; i < 16; i++) {
          cx.rotate(Math.PI * 2 / 16);
          const g = cx.createLinearGradient(0, 0, 0, H * 1.4);
          g.addColorStop(0, `rgba(${c},${.32 * P})`); g.addColorStop(1, `rgba(${c},0)`);
          cx.fillStyle = g; cx.beginPath(); cx.moveTo(0, 0); cx.lineTo(-W * .05, H * 1.4); cx.lineTo(W * .05, H * 1.4); cx.fill();
        }
        cx.restore();
        parts.forEach(p => { p.y -= p.v * (.4 + P); if (p.y < -10) { p.y = H + 10; p.x = rnd(0, W); } cx.fillStyle = `rgba(${c},${.8 * p.k})`; cx.beginPath(); cx.arc(p.x, p.y, p.s * 1.6, 0, 6.28); cx.fill(); });
      } else if (kind === 'storm') {
        cx.strokeStyle = `rgba(190,205,255,${.25 + .25 * P})`; cx.lineWidth = 1;
        cx.beginPath();
        parts.forEach(p => { p.y += 18 * p.v + 6; p.x -= 6 * p.v; if (p.y > H) { p.y = -20; p.x = rnd(0, W * 1.2); } cx.moveTo(p.x, p.y); cx.lineTo(p.x + 7, p.y - 22); });
        cx.stroke();
        if (Math.random() < .004 + .02 * P) bolt = 1;
        if (bolt > 0) {
          cx.fillStyle = `rgba(220,230,255,${bolt * .35})`; cx.fillRect(0, 0, W, H);
          cx.strokeStyle = `rgba(255,255,255,${bolt})`; cx.lineWidth = 2.5; cx.beginPath();
          let x = rnd(W * .2, W * .8), y = 0; cx.moveTo(x, y);
          while (y < H * .7) { x += rnd(-40, 40); y += rnd(20, 60); cx.lineTo(x, y); }
          cx.stroke(); bolt = Math.max(0, bolt - dt * 4);
        }
        slashes.forEach(s => {
          s.p = Math.min(1.4, s.p + dt * 2.2); if (s.p <= 0) return;
          const k = Math.min(1, s.p), fade = s.p > 1 ? 1 - (s.p - 1) / .4 : 1;
          cx.strokeStyle = `rgba(${c},${fade})`; cx.lineWidth = 3; cx.shadowColor = `rgb(${c})`; cx.shadowBlur = 18;
          cx.beginPath(); const x0 = s.d > 0 ? -50 : W + 50; cx.moveTo(x0, s.y + 60); cx.lineTo(x0 + s.d * (W + 100) * k, s.y + 60 - 120 * k); cx.stroke(); cx.shadowBlur = 0;
        });
      } else if (kind === 'mirror') {
        parts.forEach(p => {
          p.r += .004 + .01 * P; p.y -= .2 * p.v; if (p.y < -40) { p.y = H + 40; p.x = rnd(0, W); }
          const s = 14 + p.s * 26;
          cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
          const g = cx.createLinearGradient(-s, -s, s, s); g.addColorStop(0, `rgba(160,255,200,${.35 * (.4 + P)})`); g.addColorStop(1, `rgba(20,120,70,${.15 * (.4 + P)})`);
          cx.fillStyle = g; cx.strokeStyle = `rgba(190,255,220,${.5 * (.4 + P)})`;
          cx.beginPath(); cx.moveTo(0, -s); cx.lineTo(s * .6, 0); cx.lineTo(0, s * .8); cx.lineTo(-s * .5, s * .1); cx.closePath(); cx.fill(); cx.stroke();
          cx.restore();
        });
      } else if (kind === 'chain') {
        eclipse = Math.min(1, eclipse + dt * .25 * (P > .5 ? 3 : 1));
        const mx = W * .74, my = H * .24, mr = Math.min(W, H) * .11;
        cx.fillStyle = `rgba(${c},.9)`; cx.shadowColor = `rgb(${c})`; cx.shadowBlur = 40; cx.beginPath(); cx.arc(mx, my, mr, 0, 6.28); cx.fill(); cx.shadowBlur = 0;
        cx.fillStyle = '#050304'; cx.beginPath(); cx.arc(mx + mr * 2.1 * (1 - eclipse), my - mr * .1 * (1 - eclipse), mr * 1.02, 0, 6.28); cx.fill();
        parts.forEach(p => {
          if (p.k === 2) {
            p.x += Math.cos(p.a) * p.v; p.y += Math.sin(p.a) * p.v + 1; p.v *= .985; p.r += .08;
            cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.strokeStyle = 'rgba(200,200,210,.9)'; cx.lineWidth = 3;
            cx.beginPath(); cx.ellipse(0, 0, 9 * p.s, 5 * p.s, 0, 0, 6.28); cx.stroke(); cx.restore();
          } else {
            p.y -= .3 * p.v; p.x += Math.sin(t / 900 + p.r) * .3; if (p.y < 0) p.y = H;
            cx.fillStyle = `rgba(180,170,160,${.35 * p.k})`; cx.fillRect(p.x, p.y, 2, 2);
          }
        });
      } else if (kind === 'frost') {
        parts.forEach(p => {
          p.y += .5 + p.v * (.6 + P); p.x += Math.sin(t / 1200 + p.r) * .5; if (p.y > H + 10) { p.y = -10; p.x = rnd(0, W); }
          cx.fillStyle = `rgba(230,240,255,${.5 + .4 * p.k})`; cx.beginPath(); cx.arc(p.x, p.y, p.s * 2.2, 0, 6.28); cx.fill();
        });
      } else if (kind === 'fog') {
        parts.forEach((p, i) => {
          if (i % 3) {
            p.y -= .25 * p.v; p.x += Math.sin(t / 3000 + p.r) * .25; if (p.y < -120) { p.y = H + 120; p.x = rnd(0, W); }
            const r = 60 + p.s * 90, g = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
            g.addColorStop(0, `rgba(225,215,240,${.07 + .06 * P})`); g.addColorStop(1, 'rgba(225,215,240,0)');
            cx.fillStyle = g; cx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
          } else {
            p.y -= .5 * p.v; if (p.y < -10) { p.y = H + 10; p.x = rnd(0, W); }
            cx.fillStyle = `rgba(200,20,45,${.65 + .3 * P})`; cx.beginPath(); cx.ellipse(p.x, p.y, 3.2 * p.s, 4.2 * p.s, p.r, 0, 6.28); cx.fill();
            cx.fillStyle = 'rgba(255,190,200,.7)'; cx.beginPath(); cx.arc(p.x - p.s, p.y - p.s * 1.4, p.s * .9, 0, 6.28); cx.fill();
          }
        });
      } else if (kind === 'walls') {
        cx.strokeStyle = `rgba(${c},${.18 + .3 * P})`; cx.lineWidth = 1.5; cx.beginPath();
        parts.forEach(p => {
          p.v += .012 * (1 + 3 * P); if (p.v > 1) { p.v = 0; p.r = rnd(0, 6.28); }
          const R = Math.hypot(W, H) * .6, r1 = R * (1 - p.v), r2 = r1 * .82;
          cx.moveTo(W / 2 + Math.cos(p.r) * r1, H / 2 + Math.sin(p.r) * r1); cx.lineTo(W / 2 + Math.cos(p.r) * r2, H / 2 + Math.sin(p.r) * r2);
        });
        cx.stroke();
        slashes.forEach(s => {
          s.p = Math.min(1, s.p + dt * 1.4); if (s.p <= 0) return;
          const h = s.h * (1 - Math.pow(1 - s.p, 3));
          cx.fillStyle = 'rgba(30,22,16,.92)'; cx.fillRect(s.x - s.w / 2, H - h, s.w, h);
          cx.fillStyle = `rgba(${c},.55)`; cx.fillRect(s.x - s.w / 2, H - h, s.w, 3);
          for (let k = 0; k < 4; k++) cx.fillRect(s.x - s.w / 2 + k * s.w / 4, H - h - 8, s.w / 8, 8);
        });
      } else if (kind === 'runes') {
        const R = Math.min(W, H) * .36, gl = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
        cx.save(); cx.translate(W / 2, H * .5);
        [1, .78, .56].forEach((k, j) => {
          cx.rotate((j % 2 ? -1 : 1) * t / (7000 - j * 1200));
          cx.strokeStyle = `rgba(${c},${.35 + .4 * P})`; cx.lineWidth = j ? 1 : 2; cx.beginPath(); cx.arc(0, 0, R * k, 0, 6.28); cx.stroke();
          cx.fillStyle = `rgba(${c},${.5 + .45 * P})`; cx.font = `${Math.round(R * .09)}px serif`; cx.textAlign = 'center';
          const n = 24 - j * 6;
          for (let i = 0; i < n; i++) { cx.save(); cx.rotate(i / n * 6.28); cx.fillText(gl[(i + j * 5) % gl.length], 0, -R * k + R * .07); cx.restore(); }
        });
        cx.restore();
        parts.forEach(p => {
          p.y += .6 + p.v; p.r += .01; p.x += Math.sin(t / 1500 + p.k * 6) * .6; if (p.y > H + 30) { p.y = -30; p.x = rnd(0, W); }
          cx.save(); cx.translate(p.x, p.y); cx.rotate(Math.sin(p.r) * .8); cx.fillStyle = 'rgba(8,8,12,.85)';
          cx.beginPath(); cx.ellipse(0, 0, 4 * p.s, 15 * p.s, 0, 0, 6.28); cx.fill(); cx.restore();
        });
      }
      rings.forEach(r => {
        r.r += dt * Math.max(W, H) * 1.1; r.a -= dt * 1.1;
        if (r.a > 0) { cx.strokeStyle = `rgba(${c},${r.a})`; cx.lineWidth = 6 * r.a; cx.beginPath(); cx.arc(W / 2, H / 2, r.r, 0, 6.28); cx.stroke(); }
      });
      raf = requestAnimationFrame(draw);
    }

    /* ── 진행 ── */
    function end() {
      token++;
      cancelAnimationFrame(raf); raf = null;
      if (typing) typing = null;
      waker = null;
      root.hidden = true; root.className = 'cut';
      body.classList.remove('is-cut');
      if (!Modal.isOpen && !Music.isOpen) body.classList.remove('is-locked');
    }
    function finish() { if (!finishCb) return; const cb = finishCb; finishCb = null; end(); cb(); }
    async function run(c) {
      const tk = ++token, conf = CUT_CONF[c.id] || { fx: 'rays', from: 'fade' };
      const lines = c.release.lines || [];
      kind = conf.fx; col = hexRgb(c.accent); power = .25;
      root.dataset.fx = conf.fx; root.dataset.from = conf.from;
      root.style.setProperty('--cc', c.accent);
      $('#cutBg').style.backgroundImage = `url('assets/release/${c.id}.jpg')`;
      $('#cutImg').src = `assets/cutin/${c.id}.webp`;
      $('#cutClones').innerHTML = conf.fx === 'mirror' ? `<img src="assets/cutin/${c.id}.webp" alt="">`.repeat(4) : '';
      $('#cutWho').textContent = c.name;
      $('#cutText').textContent = '';
      $('#cutHanja').textContent = c.release.hanja;
      $('#cutRel').textContent = `「${c.release.name}」`;
      root.className = 'cut'; root.hidden = false; void root.offsetWidth;
      body.classList.add('is-locked', 'is-cut');
      resize(); seed(); t0 = performance.now();
      cancelAnimationFrame(raf); raf = requestAnimationFrame(draw);
      const at = cls => { if (tk === token) root.classList.add(cls); };
      const alive = () => tk === token;

      at('p1'); await pause(450); if (!alive()) return;
      at('p2'); await pause(800); if (!alive()) return;
      at('p-line');
      if (lines[0]) { await type($('#cutText'), lines[0], tk); if (!alive()) return; await pause(1300); if (!alive()) return; }
      at('p3'); power = 1; burst(); await pause(1150); if (!alive()) return;
      at('p4'); $('#cutText').textContent = '';
      await pause(500); if (!alive()) return;
      if (lines[1]) { await type($('#cutText'), lines[1], tk); if (!alive()) return; }
      await pause(1800); if (!alive()) return;
      at('p-out'); await new Promise(r => setTimeout(r, 650));
      if (alive()) finish();
    }
    root.addEventListener('click', e => {
      if (e.target.closest('#cutSkip')) { finish(); return; }
      if (typing) typing(); else if (waker) waker();
    });
    addEventListener('resize', () => { if (!root.hidden) resize(); });
    return {
      play(c) { return new Promise(res => { finishCb = res; run(c); }); },
      skip: finish,
      has: c => !!(c && c.release && CUT_CONF[c.id]),
      get isOpen() { return !root.hidden; }
    };
  })();

  /* ════════════════════ 해방 영역 ════════════════════ */
  const Domain = (() => {
    const root = $('#domain');
    let timer = null, cur = null, closing = null;
    /* 해방 카드를 누르면: 컷씬(봉인되지 않은 캐릭터만) → 영역 화면 */
    function open(c, e, opts = {}) {
      if (!c || !c.release) return;
      if (!opts.noCut && Cut.has(c) && !isLocked(c)) {
        const x = e && e.clientX, y = e && e.clientY;
        Cut.play(c).then(() => show(c, x ? { clientX: x, clientY: y } : null));
        return;
      }
      show(c, e);
    }
    function show(c, e) {
      clearTimeout(closing);
      cur = c;
      const lock = isLocked(c);
      const x = e && e.clientX ? e.clientX : innerWidth / 2, y = e && e.clientY ? e.clientY : innerHeight / 2;
      root.style.setProperty('--x', x + 'px'); root.style.setProperty('--y', y + 'px');
      root.style.setProperty('--dc', c.accent);
      $('#dmImg').style.backgroundImage = `url('assets/release/${c.id}.jpg')`;
      $('#dmHanja').textContent = c.release.hanja;
      $('#dmOwner').textContent = lock ? T('dm.ownerLocked') : T('dm.owner', { name: c.name, model: c.model.local });
      $('#dmName').textContent = `「${c.release.name}」`;
      $('#dmDesc').textContent = c.release.desc;
      $('#dmChar').hidden = lock;
      $('#dmReplay').hidden = lock || !Cut.has(c);
      const mb = $('#dmMusic');
      mb.hidden = !Music.has('r-' + c.id);
      mb.dataset.play = 'r-' + c.id;
      root.hidden = false; void root.offsetWidth;
      root.classList.add('is-open');
      body.classList.add('is-locked');
      let left = 300;
      const paintT = () => { $('#dmTimer').textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`; };
      paintT();
      clearInterval(timer);
      timer = setInterval(() => { left--; paintT(); if (left <= 0) { close(); toast(T('dm.end')); } }, 1000);
    }
    function close() {
      if (root.hidden) return;
      clearInterval(timer);
      root.classList.remove('is-open');
      if (!Modal.isOpen) body.classList.remove('is-locked');
      closing = setTimeout(() => { root.hidden = true; }, 1100);
    }
    root.addEventListener('click', e => { if (e.target.closest('[data-close]')) close(); });
    $('#dmChar').addEventListener('click', () => { const c = cur; close(); setTimeout(() => Modal.open(c.id), 300); });
    $('#dmReplay').addEventListener('click', () => { const c = cur; clearInterval(timer); root.classList.remove('is-open'); root.hidden = true; Cut.play(c).then(() => show(c, null)); });
    return { open, close, get isOpen() { return !root.hidden && root.classList.contains('is-open'); } };
  })();

  /* ════════════════════ 게이트: 반전세계 진입 ════════════════════ */
  const Gate = (() => {
    const btn = $('#holdBtn'), fill = $('#holdFill'), txt = $('#holdText'), svg = $('#gateCracks');
    const warpMap = $('#warpMap'), warpNoise = $('#warpNoise');
    const C = 339.3, DUR = 2300;
    let p = 0, holding = false, raf = null, last = 0, done = false, cracks = [];
    const SVGNS = 'http://www.w3.org/2000/svg';

    function genCracks() {
      svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      svg.innerHTML = '';
      cracks = [];
      const cx = 500, cy = 500, N = 16;
      const add = (d, start, red) => {
        const path = document.createElementNS(SVGNS, 'path');
        path.setAttribute('d', d);
        if (red) path.classList.add('is-red');
        svg.appendChild(path);
        const len = path.getTotalLength();
        path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
        cracks.push({ path, len, start });
      };
      for (let i = 0; i < N; i++) {
        const ang = (i / N) * Math.PI * 2 + Math.random() * .3;
        const segs = 6 + (Math.random() * 4 | 0), reach = 420 + Math.random() * 380;
        let d = `M${cx} ${cy}`;
        for (let s = 1; s <= segs; s++) {
          const r = reach * s / segs, a = ang + (Math.random() - .5) * .32;
          const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
          d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
          if (s > 1 && s < segs && Math.random() < .35) {
            const ba = a + (Math.random() < .5 ? -1 : 1) * (.45 + Math.random() * .5), bl = 50 + Math.random() * 120;
            add(`M${x.toFixed(1)} ${y.toFixed(1)} L${(x + Math.cos(ba) * bl).toFixed(1)} ${(y + Math.sin(ba) * bl).toFixed(1)}`, .35 + s / segs * .4, false);
          }
        }
        add(d, i / N * .25, i % 4 === 0);
      }
      /* 중심부 고리형 금 */
      let ring = '';
      for (let k = 0; k <= 12; k++) { const a = k / 12 * Math.PI * 2, r = 60 + Math.random() * 20; ring += `${k ? 'L' : 'M'}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)} `; }
      add(ring, .55, true);
    }

    function update() {
      fill.style.strokeDashoffset = (C * (1 - p)).toFixed(1);
      txt.textContent = p > .01 ? Math.round(p * 100) + '%' : T('gate.hold');
      const e = p * p;
      warpMap.setAttribute('scale', (e * 95).toFixed(1));
      warpNoise.setAttribute('baseFrequency', `${(.01 + Math.random() * .004).toFixed(4)} ${(.03 + e * .05).toFixed(4)}`);
      body.style.setProperty('--hp', p.toFixed(3));
      const s = e * 12;
      const tr = p > 0 ? `translate(${((Math.random() - .5) * s).toFixed(1)}px, ${((Math.random() - .5) * s).toFixed(1)}px)` : '';
      $('.stage').style.transform = tr;
      $('#v-gate').style.transform = tr;
      for (const c of cracks) {
        const k = clamp((p - c.start) / .45, 0, 1);
        c.path.style.strokeDashoffset = (c.len * (1 - k)).toFixed(1);
      }
    }

    function loop(t) {
      const dt = Math.min(50, t - (last || t)); last = t;
      if (done) return;
      p = holding ? Math.min(1, p + dt / DUR) : Math.max(0, p - dt / (DUR * .45));
      update();
      if (p >= 1) { trigger(); return; }
      if (p <= 0 && !holding) { stop(); return; }
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      cancelAnimationFrame(raf); raf = null; last = 0;
      body.classList.remove('is-holding');
      $('.stage').style.transform = ''; $('#v-gate').style.transform = '';
      warpMap.setAttribute('scale', '0');
    }
    function down(e) {
      if (done || current !== 'gate') return;
      if (e) e.preventDefault();
      if (holding) return;
      holding = true;
      btn.classList.add('is-down');
      body.classList.add('is-holding');
      cancelAnimationFrame(raf); last = 0; raf = requestAnimationFrame(loop);
    }
    function up() { holding = false; btn.classList.remove('is-down'); }

    async function trigger() {
      done = true; holding = false; busy = true;
      cancelAnimationFrame(raf); raf = null;

      /* 1) 현재 화면을 파편으로 복제 */
      const sh = $('#shatter');
      const bgCss = "radial-gradient(ellipse at center, rgba(40,2,6,.5), rgba(2,1,3,.94) 70%), url('assets/bg/real.jpg')";
      const cols = innerWidth < 700 ? 5 : 8, rows = innerWidth < 700 ? 7 : 5;
      const pts = [];
      for (let r = 0; r <= rows; r++) {
        pts[r] = [];
        for (let c = 0; c <= cols; c++) {
          const edge = r === 0 || c === 0 || r === rows || c === cols;
          pts[r][c] = [c / cols * 100 + (edge ? 0 : (Math.random() - .5) * 70 / cols), r / rows * 100 + (edge ? 0 : (Math.random() - .5) * 70 / rows)];
        }
      }
      const frag = document.createDocumentFragment(), shards = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const a = pts[r][c], b = pts[r][c + 1], d = pts[r + 1][c], e = pts[r + 1][c + 1];
        const tris = Math.random() < .5 ? [[a, b, e], [a, e, d]] : [[a, b, d], [b, e, d]];
        for (const t of tris) {
          const el = document.createElement('div');
          el.className = 'shard';
          el.style.backgroundImage = bgCss;
          el.style.clipPath = `polygon(${t.map(q => `${q[0].toFixed(2)}% ${q[1].toFixed(2)}%`).join(',')})`;
          const gx = (t[0][0] + t[1][0] + t[2][0]) / 3, gy = (t[0][1] + t[1][1] + t[2][1]) / 3;
          el.style.transformOrigin = `${gx}% ${gy}%`;
          frag.appendChild(el); shards.push({ el, gx, gy });
        }
      }
      sh.appendChild(frag);

      /* 2) 아래쪽은 이미 반전세계로 */
      body.classList.remove('is-holding');
      $('.stage').style.transform = ''; $('#v-gate').style.transform = '';
      warpMap.setAttribute('scale', '0');
      setUnlocked();
      show('reverse', 'reverse');

      /* 3) 섬광 + 파편 비산 */
      const f = $('#flash'); f.classList.add('is-red');
      f.animate([{ opacity: .95 }, { opacity: 0 }], { duration: 900, easing: 'ease-out' }).onfinish = () => f.classList.remove('is-red');
      $('#app').classList.add('shake');
      setTimeout(() => $('#app').classList.remove('shake'), 520);
      const anims = shards.map(({ el, gx, gy }) => {
        const dx = gx - 50, dy = gy - 50, dist = Math.hypot(dx, dy) || 1;
        const pow = 30 + Math.random() * 50;
        const tx = dx / dist * pow * (innerWidth / 100) * .9, ty = dy / dist * pow * (innerHeight / 100) * .6 + 260 + Math.random() * 400;
        const rot = `rotateX(${(Math.random() - .5) * 220}deg) rotateY(${(Math.random() - .5) * 220}deg) rotateZ(${(Math.random() - .5) * 160}deg)`;
        return el.animate([
          { transform: 'translate3d(0,0,0)', opacity: 1 },
          { transform: `translate3d(${tx * .12}px, ${ty * .04}px, ${60 + Math.random() * 120}px) ${rot.replace(/(-?\d+\.?\d*)deg/g, (m, n) => (n * .15).toFixed(1) + 'deg')}`, opacity: 1, offset: .18 },
          { transform: `translate3d(${tx}px, ${ty}px, ${-200 + Math.random() * 400}px) ${rot} scale(.7)`, opacity: 0 }
        ], { duration: REDUCE ? 200 : 1300 + Math.random() * 700, delay: REDUCE ? 0 : dist * 5, easing: 'cubic-bezier(.25,.6,.35,1)', fill: 'forwards' });
      });
      await Promise.race([Promise.all(anims.map(a => a.finished.catch(() => {}))), sleep(2800)]);
      sh.innerHTML = '';
      reset();
      busy = false;
      toast(T('gate.entered'));
    }

    function reset() {
      p = 0; done = false; holding = false; last = 0;
      fill.style.strokeDashoffset = C; txt.textContent = T('gate.hold');
      genCracks();
    }

    btn.addEventListener('pointerdown', e => { try { btn.setPointerCapture(e.pointerId); } catch (err) {} down(e); });
    btn.addEventListener('pointerup', up);
    btn.addEventListener('pointercancel', up);
    btn.addEventListener('lostpointercapture', up);
    btn.addEventListener('contextmenu', e => e.preventDefault());
    addEventListener('keydown', e => {
      if (current !== 'gate' || e.repeat || Music.isOpen || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
      if (e.code === 'Space' || (e.key === 'Enter' && document.activeElement === btn)) down(e);
    });
    addEventListener('keyup', e => { if (e.code === 'Space' || e.key === 'Enter') up(); });

    return { reset, leave() { up(); if (raf) stop(); } };
  })();
  onEnter.gate = () => Gate.reset();
  onLeave.gate = () => Gate.leave();

  function setUnlocked() {
    if (unlocked) return;
    unlocked = true;
    store.set('unlocked', true);
    applyLocks();
  }

  /* 봉인 상태가 바뀌면 봉인 표시가 들어간 곳을 전부 다시 그린다 */
  function applyLocks() {
    renderReleases(); renderFactions();
    Rel.refresh();
    RelSum.render();
    if (current === 'modelers') M.render();
    if (typeof Music !== 'undefined') Music.refresh();
    $('#classified').classList.toggle('is-open', secretMode);
    if (secretMode) { const b = $('#declassify'); b.textContent = T('cls.done'); b.disabled = true; }
    const btn = $('#btnSecret');
    btn.setAttribute('aria-pressed', String(secretMode));
    btn.classList.toggle('is-on', secretMode);
    $('use', btn).setAttribute('href', secretMode ? '#i-eye' : '#i-lock');
    const label = secretMode ? T('secret.hide') : T('hud.secret');
    btn.setAttribute('title', label); btn.setAttribute('aria-label', label);
  }

  /* 상단 「기밀 보기」: 반전세계에 들어가지 않아도 비밀 설정과 무스펠 카드를 연다 */
  $('#btnSecret').addEventListener('click', () => {
    secretMode = !secretMode;
    store.set('secret', secretMode);
    applyLocks();
    toast(secretMode ? T('secret.on') : (unlocked ? T('secret.offKept') : T('secret.off')));
  });

  /* ════════════════════ 반전세계 페이지 ════════════════════ */
  const R = (() => {
    let built = false, ledgerT = null, coordT = null;
    function build() {
      const mus = CHARS.filter(c => c.faction === 'muspel');
      $('#muspelCount').textContent = mus.length;
      $('#muspelCards').innerHTML = mus.map(cardHTML).join('');

      /* 금기 기술: 시도 기록 점 */
      const N = innerWidth < 560 ? 196 : 260, ok = Math.floor(N * .66);
      let dots = '';
      for (let i = 0; i < N; i++) {
        if (i === ok) dots += `<i class="is-ok" data-char="kuga" title="${esc(T('tb.ok', { n: i + 1, model: byId.kuga.model.local, name: byId.kuga.name }))}"></i>`;
        else { const lost = (i * 7919 % 100) < 62; dots += `<i class="${lost ? 'is-lost' : ''}" title="${T(lost ? 'tb.lost' : 'tb.dead', { n: i + 1 })}"></i>`; }
      }
      $('#taboo').innerHTML = dots + `<div class="taboo__legend"><span>${T('tb.lgDead')}</span><span>${T('tb.lgLost')}</span><span>${T('tb.lgOk')}</span></div>`;

      growth(4);
      built = true;
    }
    function growth(n) {
      const svg = $('#growthChart'), W = Math.max(300, Math.round(svg.clientWidth) || 600), H = 220, P = 14, max = Math.pow(2, 12);
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      const X = k => P + (k - 1) / 11 * (W - P * 2), Y = v => H - P - (v / max) * (H - P * 2);
      let line = '', area = `M${X(1)} ${H - P}`;
      for (let k = 1; k <= 12; k++) { const v = Math.pow(2, k); line += `${k === 1 ? 'M' : 'L'}${X(k).toFixed(1)} ${Y(v).toFixed(1)} `; if (k <= n) area += ` L${X(k).toFixed(1)} ${Y(v).toFixed(1)}`; }
      area += ` L${X(n)} ${H - P} Z`;
      let grid = '';
      for (let i = 0; i <= 4; i++) grid += `<line class="g-grid" x1="${P}" x2="${W - P}" y1="${P + i * (H - P * 2) / 4}" y2="${P + i * (H - P * 2) / 4}"/>`;
      svg.innerHTML = `<defs><linearGradient id="gGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff3b4e" stop-opacity=".55"/><stop offset="1" stop-color="#ff3b4e" stop-opacity="0"/></linearGradient></defs>
        ${grid}<path class="g-area" d="${area}"/><path class="g-line" d="${line}" opacity=".35"/>
        <path class="g-line" d="${line.split(' ').slice(0, n * 2).join(' ')}"/>
        <circle class="g-dot" cx="${X(n)}" cy="${Y(Math.pow(2, n))}" r="6"/>`;
      $('#growthN').textContent = n;
      $('#growthX').textContent = '×' + Math.pow(2, n).toLocaleString();
    }
    $('#growthRange').addEventListener('input', e => growth(+e.target.value));
    function enter() {
      if (!built) build();
      clearInterval(ledgerT);
      ledgerT = setInterval(() => {
        const n = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        $('#ledgerNum').textContent = n[0] + ',' + n.slice(1);
      }, 90);
      const lines = () => {
        const r = () => (Math.random() * 90).toFixed(4);
        return `<div>${r()}°N ${r()}°E <mark>████</mark> R-${String(Math.random() * 99 | 0).padStart(2, '0')} ── <mark>██████</mark> ▸ ${r()}</div>`;
      };
      const box = $('#coords'); box.innerHTML = Array.from({ length: 7 }, lines).join('');
      clearInterval(coordT);
      coordT = setInterval(() => { box.insertAdjacentHTML('beforeend', lines()); if (box.children.length > 7) box.firstElementChild.remove(); }, 650);
    }
    function leave() { clearInterval(ledgerT); clearInterval(coordT); }
    return { enter, leave };
  })();
  onEnter.reverse = () => R.enter();
  onLeave.reverse = () => R.leave();

  /* ════════════════════ 관계도 ════════════════════ */
  const Rel = (() => {
    const svg = $('#relSvg'), stage = $('#relStage'), panel = $('#relPanel');
    const NS = 'http://www.w3.org/2000/svg';
    const ANCHOR = { pantheon: [.27, .32], karasu: [.73, .3], free: [.27, .74], oracle: [.52, .52], muspel: [.75, .74] };
    let W = 800, H = 600, nodes = [], edges = [], raf = null, alpha = 1, sel = null, built = false;
    const hidden = new Set();
    const mk = (tag, attrs = {}) => { const el = document.createElementNS(NS, tag); for (const k in attrs) el.setAttribute(k, attrs[k]); return el; };

    function build() {
      svg.innerHTML = '';
      W = stage.clientWidth; H = stage.clientHeight;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      const defs = mk('defs');
      defs.innerHTML = `<clipPath id="nclip"><circle r="21"/></clipPath>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="rgba(200,215,240,.6)"/></marker>
        <marker id="arrHi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--accent)"/></marker>`;
      svg.appendChild(defs);
      const gE = mk('g'), gL = mk('g'), gN = mk('g');
      svg.append(gE, gL, gN);

      nodes = CHARS.map(c => ({ id: c.id, c, f: c.faction, r: 22 }));
      nodes.push({ id: 'f:pantheon', hub: true, f: 'pantheon', r: 30 }, { id: 'f:oracle', hub: true, f: 'oracle', r: 30 });
      nodes.forEach(n => {
        const [ax, ay] = ANCHOR[n.f];
        n.x = ax * W + (Math.random() - .5) * 120; n.y = ay * H + (Math.random() - .5) * 120; n.vx = 0; n.vy = 0;
        const g = mk('g', { class: 'r-node' + (n.hub ? ' is-hub' : ''), 'data-id': n.id, tabindex: '0' });
        if (n.hub) {
          g.appendChild(mk('circle', { r: n.r, fill: 'rgba(8,10,18,.9)' }));
          const u = mk('use', { href: `#sig-${n.f}`, x: -16, y: -16, width: 32, height: 32 });
          u.style.color = `rgb(${FC[n.f]})`; g.appendChild(u);
          g.appendChild(mk('circle', { class: 'r-ring', r: n.r, stroke: `rgb(${FC[n.f]})` }));
          const t = mk('text', { y: n.r + 16 }); t.textContent = D.FACTIONS[n.f].name; g.appendChild(t);
        } else {
          g.appendChild(mk('circle', { r: n.r, fill: '#0a0e18' }));
          g.appendChild(mk('image', { class: 'r-img', href: thumb(n.id), x: -21, y: -21, width: 42, height: 42, 'clip-path': 'url(#nclip)', preserveAspectRatio: 'xMidYMin slice' }));
          g.appendChild(mk('circle', { class: 'r-ring', r: n.r, stroke: `rgb(${FC[n.f]})` }));
          g.appendChild(mk('text', { y: n.r + 15 }));
        }
        n.el = g; gN.appendChild(g);
      });
      const byN = Object.fromEntries(nodes.map(n => [n.id, n]));
      edges = D.RELATIONS.map(r => {
        const e = { a: byN[r.a], b: byN[r.b], dir: r.dir, label: r.label };
        e.el = mk('path', { class: 'r-edge', 'marker-end': 'url(#arr)' });
        if (r.dir === '<>') e.el.setAttribute('marker-start', 'url(#arr)');
        e.lab = mk('text', { class: 'r-edge-label', 'text-anchor': 'middle' });
        gE.appendChild(e.el); gL.appendChild(e.lab);
        return e;
      });
      refresh();
      bind();
      built = true;
    }

    /* 봉인 상태 반영 */
    function refresh() {
      if (!nodes.length) return;
      nodes.forEach(n => {
        if (n.hub) return;
        const lock = isLocked(n.c);
        $('text', n.el).textContent = lock ? '■■■' : n.c.name;
        $('.r-img', n.el).style.filter = lock ? 'blur(3px) grayscale(1) brightness(.4)' : '';
      });
      edges.forEach(e => { e.lab.textContent = (isLocked(e.a.c) || isLocked(e.b.c)) ? T('rg.sealed') : e.label.length > 22 ? e.label.slice(0, 21) + '…' : e.label; });
      legend();
      if (sel) select(sel);
    }

    function legend() {
      const ids = ['pantheon', 'karasu', 'free', 'oracle', 'muspel'];
      $('#relLegend').innerHTML = ids.map(id => `<button type="button" class="${hidden.has(id) ? 'is-off' : ''}" data-lf="${id}" style="--fc:${FC[id]}"><i></i>${D.FACTIONS[id].name}</button>`).join('');
    }

    function tick() {
      const k = alpha;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (hidden.has(a.f)) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (hidden.has(b.f)) continue;
          let dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy || 1;
          const min = a.r + b.r + 34;
          const f = (2400 / d2) * k;
          const d = Math.sqrt(d2);
          dx /= d; dy /= d;
          let push = f;
          if (d < min) push += (min - d) * .5;
          a.vx -= dx * push; a.vy -= dy * push; b.vx += dx * push; b.vy += dy * push;
        }
      }
      for (const e of edges) {
        if (hidden.has(e.a.f) || hidden.has(e.b.f)) continue;
        const dx = e.b.x - e.a.x, dy = e.b.y - e.a.y, d = Math.hypot(dx, dy) || 1;
        const f = (d - 150) * .012 * k;
        e.a.vx += dx / d * f; e.a.vy += dy / d * f; e.b.vx -= dx / d * f; e.b.vy -= dy / d * f;
      }
      for (const n of nodes) {
        const [ax, ay] = ANCHOR[n.f];
        n.vx += (ax * W - n.x) * .012 * k; n.vy += (ay * H - n.y) * .012 * k;
        if (n.fixed) { n.vx = n.vy = 0; continue; }
        n.vx *= .82; n.vy *= .82;
        n.x = clamp(n.x + n.vx, n.r + 6, W - n.r - 6);
        n.y = clamp(n.y + n.vy, n.r + 6, H - n.r - 24);
      }
      alpha = Math.max(.02, alpha * .992);
    }

    function draw() {
      for (const n of nodes) {
        n.el.setAttribute('transform', `translate(${n.x.toFixed(1)},${n.y.toFixed(1)})`);
        n.el.style.display = hidden.has(n.f) ? 'none' : '';
      }
      for (const e of edges) {
        const hide = hidden.has(e.a.f) || hidden.has(e.b.f);
        e.el.style.display = e.lab.style.display = hide ? 'none' : '';
        if (hide) continue;
        const dx = e.b.x - e.a.x, dy = e.b.y - e.a.y, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
        const x1 = e.a.x + ux * (e.a.r + 3), y1 = e.a.y + uy * (e.a.r + 3), x2 = e.b.x - ux * (e.b.r + 3), y2 = e.b.y - uy * (e.b.r + 3);
        const mx = (x1 + x2) / 2 - uy * 18, my = (y1 + y2) / 2 + ux * 18;
        e.el.setAttribute('d', `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
        e.lab.setAttribute('x', ((x1 + x2) / 2 - uy * 12).toFixed(1));
        e.lab.setAttribute('y', ((y1 + y2) / 2 + ux * 12).toFixed(1));
      }
    }

    function loop() { tick(); draw(); raf = requestAnimationFrame(loop); }

    function select(id) {
      sel = id;
      const nb = new Set([id]);
      edges.forEach(e => {
        const on = id && (e.a.id === id || e.b.id === id);
        if (on) { nb.add(e.a.id); nb.add(e.b.id); }
        e.el.classList.toggle('is-hi', !!on); e.el.classList.toggle('is-dim', !!id && !on);
        e.el.setAttribute('marker-end', on ? 'url(#arrHi)' : 'url(#arr)');
        if (e.dir === '<>') e.el.setAttribute('marker-start', on ? 'url(#arrHi)' : 'url(#arr)');
        e.lab.classList.toggle('is-on', !!on);
      });
      nodes.forEach(n => { n.el.classList.toggle('is-dim', !!id && !nb.has(n.id)); n.el.classList.toggle('is-hi', n.id === id); });
      paintPanel(id);
    }

    function paintPanel(id) {
      if (!id) { panel.innerHTML = `<p class="rel__hint">${T('rg.hintFull')}</p>`; return; }
      const rels = D.RELATIONS.filter(r => r.a === id || r.b === id);
      const nameOf = x => x.startsWith('f:') ? D.FACTIONS[x.slice(2)].name : isLocked(byId[x]) ? '■■■' : byId[x].name;
      let head;
      if (id.startsWith('f:')) {
        const f = D.FACTIONS[id.slice(2)];
        head = `<div class="rp__head"><span class="cm__relhub" style="width:64px;height:64px;border-radius:14px;color:rgb(${FC[f.id]})"><svg><use href="#sig-${f.id}"/></svg></span><div><b>${f.name}</b><span>${f.en} · ${T('rg.faction')}</span></div></div>`;
      } else {
        const c = byId[id], lock = isLocked(c);
        head = `<div class="rp__head"><img src="${thumb(c.id)}" alt="" style="${lock ? 'filter:blur(4px) grayscale(1)' : ''}"><div><b>${lock ? '■■■' : esc(c.name)}</b><span>${D.FACTIONS[c.faction].name} · ${lock ? T('rg.sealed') : 'MODEL: ' + esc(c.model.local)}</span></div></div>`;
      }
      panel.innerHTML = head + `<ul class="rp__list">${rels.map(r => {
        const other = r.a === id ? r.b : r.a, arrow = r.dir === '<>' ? '↔' : (r.a === id ? '→' : '←');
        const lk = (!other.startsWith('f:') && isLocked(byId[other])) || (!id.startsWith('f:') && isLocked(byId[id]));
        return `<li data-pick="${other}"><b>${esc(nameOf(id))}</b><em>${arrow}</em><b>${esc(nameOf(other))}</b><br>${lk ? T('rg.sealedNeed') : esc(r.label)}</li>`;
      }).join('')}</ul>` + (!id.startsWith('f:') && !isLocked(byId[id]) ? `<button class="btn-ghost" type="button" data-char="${id}">${T('rg.open')}</button>` : '');
    }

    function bind() {
      let drag = null, moved = false, lastTap = 0, lastId = null;
      const pt = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; };
      svg.addEventListener('pointerdown', e => {
        const g = e.target.closest('.r-node');
        if (!g) { select(null); return; }
        const n = nodes.find(x => x.id === g.dataset.id);
        drag = n; moved = false; n.fixed = true;
        try { svg.setPointerCapture(e.pointerId); } catch (err) {}
        svg.classList.add('is-drag');
        alpha = Math.max(alpha, .5);
      });
      svg.addEventListener('pointermove', e => {
        if (!drag) return;
        const [x, y] = pt(e);
        if (Math.hypot(x - drag.x, y - drag.y) > 3) moved = true;
        drag.x = x; drag.y = y;
      });
      const end = () => {
        if (!drag) return;
        const n = drag; drag = null; n.fixed = false; svg.classList.remove('is-drag');
        if (!moved) {
          const now = Date.now();
          if (lastId === n.id && now - lastTap < 380 && !n.hub) Modal.open(n.id);
          lastTap = now; lastId = n.id;
          select(n.id);
        }
      };
      svg.addEventListener('pointerup', end);
      svg.addEventListener('pointercancel', end);
      svg.addEventListener('keydown', e => { const g = e.target.closest('.r-node'); if (g && e.key === 'Enter') select(g.dataset.id); });
      panel.addEventListener('click', e => { const li = e.target.closest('[data-pick]'); if (li) { select(li.dataset.pick); } });
      $('#relLegend').addEventListener('click', e => {
        const b = e.target.closest('[data-lf]'); if (!b) return;
        const id = b.dataset.lf;
        hidden.has(id) ? hidden.delete(id) : hidden.add(id);
        alpha = .8; legend();
      });
      addEventListener('resize', () => {
        if (current !== 'relations') return;
        W = stage.clientWidth; H = stage.clientHeight; svg.setAttribute('viewBox', `0 0 ${W} ${H}`); alpha = .7;
      });
    }

    /* 배치 초기화: 숨긴 세력을 되살리고 노드를 소속 위치 근처로 다시 흩뿌린다 */
    function reset() {
      hidden.clear();
      nodes.forEach(n => { const [ax, ay] = ANCHOR[n.f]; n.x = ax * W + (Math.random() - .5) * 120; n.y = ay * H + (Math.random() - .5) * 120; n.vx = n.vy = 0; });
      alpha = 1; legend(); select(null);
    }
    $('#relReset').addEventListener('click', () => { if (built) reset(); });

    return {
      enter() {
        if (!built) build();
        else { W = stage.clientWidth; H = stage.clientHeight; svg.setAttribute('viewBox', `0 0 ${W} ${H}`); }
        alpha = 1; paintPanel(sel);
        cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
      },
      leave() { cancelAnimationFrame(raf); raf = null; },
      /* 총정리에서 고른 관계를 그래프에서 강조하고 그래프로 스크롤 */
      focus(id) {
        if (!built) return;
        const n = nodes.find(x => x.id === id);
        if (n && hidden.has(n.f)) { hidden.delete(n.f); legend(); }
        alpha = Math.max(alpha, .4);
        select(id);
        stage.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'center' });
      },
      refresh
    };
  })();
  onEnter.relations = () => { Rel.enter(); RelSum.render(); };
  onLeave.relations = () => Rel.leave();

  /* ════════════════════ 관계 총정리 ════════════════════ */
  const RelSum = (() => {
    const box = $('#rsBody');
    let mode = 'group', q = '';
    const facOf = id => id.startsWith('f:') ? id.slice(2) : byId[id].faction;
    const lockedId = id => !id.startsWith('f:') && isLocked(byId[id]);
    const nameOf = id => id.startsWith('f:') ? D.FACTIONS[id.slice(2)].name : lockedId(id) ? '■■■' : byId[id].name;
    const face = id => id.startsWith('f:')
      ? `<span class="rs__hub" style="color:rgb(${FC[id.slice(2)]})"><svg><use href="#sig-${id.slice(2)}"/></svg></span>`
      : `<img src="${thumb(id)}" alt="" loading="lazy"${lockedId(id) ? ' class="is-locked"' : ''}>`;
    const who = id => id.startsWith('f:')
      ? `<span class="rs__who" style="--fc:${FC[facOf(id)]}">${face(id)}<b>${esc(nameOf(id))}</b></span>`
      : `<button type="button" class="rs__who" data-rs-char="${id}" style="--fc:${FC[facOf(id)]}">${face(id)}<b>${esc(nameOf(id))}</b></button>`;
    const labelOf = r => (lockedId(r.a) || lockedId(r.b)) ? T('rg.sealedNeed') : esc(r.label);
    const hay = id => id.startsWith('f:') ? D.FACTIONS[id.slice(2)].name : lockedId(id) ? '' : `${byId[id].name} ${byId[id].nameKo}`;
    const match = r => !q || `${hay(r.a)} ${hay(r.b)} ${(lockedId(r.a) || lockedId(r.b)) ? '' : r.label}`.toLowerCase().includes(q);
    const row = r => `<li class="rs__row" data-rs-pick="${r.a}">${who(r.a)}<span class="rs__arrow">${r.dir === '<>' ? '↔' : '→'}</span>${who(r.b)}<p class="rs__label">${labelOf(r)}</p></li>`;

    function byGroup() {
      const groups = { pantheon: [], karasu: [], free: [], oracle: [], muspel: [], cross: [] };
      D.RELATIONS.filter(match).forEach(r => { const a = facOf(r.a), b = facOf(r.b); groups[a === b ? a : 'cross'].push(r); });
      return Object.entries(groups).filter(([, l]) => l.length).map(([g, l]) => `
        <div class="rs__group" style="--fc:${FC[g] || '121,195,255'}">
          <h4 class="rs__gh">${g === 'cross' ? `<svg><use href="#sig-border"/></svg>${T('rs.cross')}` : `<svg><use href="#sig-${g}"/></svg>${T('rs.g.' + g)}`}<small>${T('rs.count', { n: l.length })}</small></h4>
          <ul class="rs__list">${l.map(row).join('')}</ul>
        </div>`).join('');
    }
    function byPerson() {
      const people = CHARS.map(c => ({ c, rels: D.RELATIONS.filter(r => (r.a === c.id || r.b === c.id) && match(r)) }))
        .filter(p => p.rels.length).sort((a, b) => b.rels.length - a.rels.length);
      return `<div class="rs__people">${people.map(({ c, rels }) => `
        <article class="rs__person" style="--fc:${FC[c.faction]}">
          <header data-rs-pick="${c.id}">${who(c.id)}<small>${D.FACTIONS[c.faction].name} · ${T('rs.relN', { n: rels.length })}</small></header>
          <ul>${rels.map(r => {
            const other = r.a === c.id ? r.b : r.a, arrow = r.dir === '<>' ? '↔' : (r.a === c.id ? '→' : '←');
            return `<li data-rs-pick="${c.id}"><em>${arrow}</em>${who(other)}<p class="rs__label">${labelOf(r)}</p></li>`;
          }).join('')}</ul>
        </article>`).join('')}</div>`;
    }
    function render() {
      const html = mode === 'group' ? byGroup() : byPerson();
      box.innerHTML = html.trim() ? html : `<p class="empty">${T('rs.none')}</p>`;
    }
    let qT;
    $('#rsInput').addEventListener('input', e => { clearTimeout(qT); qT = setTimeout(() => { q = e.target.value.trim().toLowerCase(); render(); }, 120); });
    $('.rsum__mode').addEventListener('click', e => {
      const b = e.target.closest('[data-mode]'); if (!b || b.dataset.mode === mode) return;
      mode = b.dataset.mode;
      $$('.rsum__mode button').forEach(x => x.classList.toggle('is-on', x === b));
      render();
    });
    box.addEventListener('click', e => {
      const ch = e.target.closest('[data-rs-char]');
      if (ch) { Modal.open(ch.dataset.rsChar); return; }
      const pick = e.target.closest('[data-rs-pick]');
      if (pick) Rel.focus(pick.dataset.rsPick);
    });
    return { render };
  })();

  /* ════════════════════ 편의 기능: 읽기 진행 · 목차 · 맨 위로 ════════════════════ */
  const Toc = (() => {
    const nav = $('#toc');
    let spy = null;
    function build(view) {
      if (spy) spy.disconnect();
      nav.innerHTML = '';
      if (view !== 'world' && view !== 'reverse') { nav.hidden = true; return; }
      const root = $('#v-' + view);
      const secs = $$(':scope > .hero, :scope > .rhero, :scope > section.block', root);
      secs.forEach((s, i) => { if (!s.id) s.id = `${view}-s${i}`; });
      nav.innerHTML = secs.map((s, i) => {
        const t = $('.block__title', s);
        const label = t ? t.childNodes[0].textContent.trim() : T('toc.top');
        return `<a href="#${s.id}" data-toc="${s.id}"><i></i><span>${esc(label)}</span><b>${String(i).padStart(2, '0')}</b></a>`;
      }).join('');
      nav.hidden = false;
      spy = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) $$('a', nav).forEach(a => a.classList.toggle('is-on', a.dataset.toc === e.target.id));
      }), { rootMargin: '-40% 0px -55% 0px' });
      secs.forEach(s => spy.observe(s));
    }
    nav.addEventListener('click', e => {
      const a = e.target.closest('[data-toc]'); if (!a) return;
      e.preventDefault();
      document.getElementById(a.dataset.toc).scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'start' });
    });
    return { build };
  })();

  const progressBar = $('#progress i'), toTop = $('#toTop');
  addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? clamp(scrollY / max, 0, 1) : 0})`;
    toTop.classList.toggle('is-on', scrollY > innerHeight * .9);
  }, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: REDUCE ? 'auto' : 'smooth' }));

  /* ════════════════════ 검색 팔레트 ════════════════════ */
  const Palette = (() => {
    const root = $('#palette'), input = $('#palInput'), ul = $('#palList');
    let items = [], selI = 0;
    function render() {
      const q = input.value.trim().toLowerCase();
      items = CHARS.filter(c => {
        if (!q) return true;
        const lock = isLocked(c);
        const hay = lock ? `muspel ${T('pal.muspel')} ${D.FACTIONS[c.faction].name}` : [c.name, c.nameKo, c.model.local, c.model.ko, c.model.en, c.role, D.FACTIONS[c.faction].name, catName(c.model.cat), mythName(c.model.myth)].join(' ');
        return hay.toLowerCase().includes(q);
      });
      selI = clamp(selI, 0, Math.max(0, items.length - 1));
      ul.innerHTML = items.length ? items.map((c, i) => {
        const lock = isLocked(c);
        return `<li class="${i === selI ? 'is-sel' : ''}${lock ? ' is-locked' : ''}" data-i="${i}" role="option" aria-selected="${i === selI}">
          <img src="${thumb(c.id)}" alt="">
          <div><b>${lock ? '■■■' : esc(c.name)}</b><span>${D.FACTIONS[c.faction].name} · ${lock ? T('pal.sealed') : esc(c.model.local)}</span></div>
          <em>${lock ? '🔒' : esc(c.grade)}</em></li>`;
      }).join('') : `<li class="palette__empty">${T('pal.none')}</li>`;
      const s = $('.is-sel', ul); if (s) s.scrollIntoView({ block: 'nearest' });
    }
    function open() { root.hidden = false; input.value = ''; selI = 0; render(); setTimeout(() => input.focus(), 30); }
    function close() { root.hidden = true; }
    function choose(i) { const c = items[i]; if (!c) return; close(); Modal.open(c.id); }
    input.addEventListener('input', () => { selI = 0; render(); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); selI = Math.min(items.length - 1, selI + 1); render(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); selI = Math.max(0, selI - 1); render(); }
      if (e.key === 'Enter') { e.preventDefault(); choose(selI); }
    });
    ul.addEventListener('click', e => { const li = e.target.closest('[data-i]'); if (li) choose(+li.dataset.i); });
    root.addEventListener('click', e => { if (e.target.closest('[data-close]')) close(); });
    return { open, close, get isOpen() { return !root.hidden; } };
  })();

  /* ════════════════════ 음악 플레이어 ════════════════════
     하나의 <audio> 를 사이트 전체가 공유 → 페이지를 옮겨도, 화면이 꺼져도 계속 재생.
     처음에는 멈춘 상태. 셔플 · 반복 · 볼륨 · 마지막 곡 · 내 플레이리스트는 브라우저에 기억 */
  const Music = (() => {
    const MU = D.MUSIC, audio = $('#audio'), root = $('#music');
    const tracks = MU.tracks.map(t => Object.assign({}, t, { playable: t.audio !== false }));
    const byTid = Object.fromEntries(tracks.map(t => [t.id, t]));
    const FACTION_G = ['pantheon', 'karasu', 'muspel', 'free', 'oracle'];
    let cur = store.get('m.track', 'main');
    if (!byTid[cur] || !byTid[cur].playable) cur = 'main';
    let shuffle = store.get('m.shuffle', true), repeat = store.get('m.repeat', 'all');
    let vol = store.get('m.vol', .7), muted = store.get('m.muted', false);
    let base = [], order = [], filter = 'all', q = '', loadedId = null, seeking = false;
    let advancing = false, resumeWhenVisible = false;

    /* 내 플레이리스트: [{ id, name, ids: [곡 id…] }] */
    let lists = store.get('m.lists', []).filter(l => l && l.id && Array.isArray(l.ids));
    const saveLists = () => store.set('m.lists', lists);
    const listOf = id => lists.find(l => l.id === id);
    let selecting = false, picked = new Set(), sheetIds = [];

    const groupName = g => FACTION_G.includes(g) ? D.FACTIONS[g].name : T('mu.g.' + g);
    const isTheme = t => t.char && t.g !== 'release';
    const fmt = s => (isFinite(s) && s > 0) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00';
    const subLocal = t => ((LD.music || {})[t.id]) || t.sub || '';
    const titleOf = t => `${MU.artist} - ${t.title}` + (isTheme(t) ? ` ( ${T('mu.theme', { name: byId[t.char].name })} )` : '');
    const subOf = t => {
      if (t.g === 'release') return T('mu.releaseOf', { name: byId[t.char].name, rel: byId[t.char].release.name });
      if (t.g === 'battle') return `${groupName('battle')} · ${subLocal(t)}`;
      if (isTheme(t)) return `${groupName(t.g)} · ${byId[t.char].role}`;
      return groupName(t.g);
    };
    const coverOf = t => `assets/cover/${t.id}.jpg`;
    const hay = t => [t.title, titleOf(t), subOf(t), t.char ? byId[t.char].nameKo : '', groupName(t.g)].join(' ').toLowerCase();

    /* ── 재생 순서 ── */
    function setBase(list) {
      base = list.filter(t => t.playable).map(t => t.id);
      if (!base.length) base = tracks.filter(t => t.playable).map(t => t.id);
      buildOrder();
    }
    function buildOrder() {
      order = base.slice();
      if (shuffle) {
        for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
        const k = order.indexOf(cur);
        if (k > 0) { order.splice(k, 1); order.unshift(cur); }
      }
    }
    function step(d, auto) {
      if (!order.length) setBase(tracks);
      let i = order.indexOf(cur);
      if (i < 0) i = 0;
      let n = i + d;
      if (n >= order.length) {
        if (auto && repeat === 'off') { audio.pause(); audio.currentTime = 0; return; }
        if (shuffle) { buildOrder(); n = order[0] === cur && order.length > 1 ? 1 : 0; } else n = 0;
      }
      if (n < 0) n = order.length - 1;
      play(order[n]);
    }

    /* ── 재생 ── */
    function load(id) {
      const t = byTid[id];
      if (!t || !t.playable) return false;
      cur = id; store.set('m.track', id);
      if (loadedId !== id) {
        audio.preload = 'auto';
        audio.src = `assets/audio/${id}.mp3`;
        audio.load();
        loadedId = id;
      }
      advancing = false;
      paint();
      return true;
    }
    function play(id) {
      if (id && !load(id)) { toast(T('mu.soon')); return; }
      if (!loadedId) load(cur);
      audio.loop = repeat === 'one';
      const p = audio.play();
      if (p && p.catch) p.catch(() => {
        /* 화면이 꺼진 상태에서 브라우저가 재생을 막으면, 화면이 다시 켜질 때 이어서 재생 */
        if (document.hidden) resumeWhenVisible = true;
      });
    }
    function toggle() { if (audio.paused) play(); else audio.pause(); }
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && resumeWhenVisible) { resumeWhenVisible = false; play(); }
    });

    /* ── 화면 ── */
    function paint() {
      const t = byTid[cur];
      $$('[data-m-title]').forEach(e => { e.textContent = titleOf(t); });
      $$('[data-m-sub]').forEach(e => { e.textContent = subOf(t); });
      $$('[data-m-cover]').forEach(e => { e.src = coverOf(t); e.alt = t.title; });
      $('#mGroup').textContent = groupName(t.g).toUpperCase();
      $('#mBg').style.backgroundImage = `url('${coverOf(t)}')`;
      const ch = $('#mChar');
      ch.hidden = !t.char || isLocked(byId[t.char]);
      ch.dataset.char = t.char || '';
      $$('[data-m-dur]').forEach(e => { e.textContent = fmt(audio.duration || t.dur); });
      $$('.mt').forEach(li => li.classList.toggle('is-cur', li.dataset.tid === cur));
      $$('[data-play]').forEach(b => b.classList.toggle('is-cur', b.dataset.play === cur));
      media(t);
    }
    function paintState() {
      const on = !audio.paused;
      body.classList.toggle('is-playing', on);
      $$('[data-m="play"]').forEach(b => { $('use', b).setAttribute('href', on ? '#i-pause' : '#i-play'); const l = on ? T('mu.pause') : T('mu.play'); b.setAttribute('aria-label', l); b.setAttribute('title', l); });
      $$('[data-m="shuffle"]').forEach(b => { b.setAttribute('aria-pressed', String(shuffle)); b.classList.toggle('is-on', shuffle); });
      $$('[data-m="repeat"]').forEach(b => {
        b.classList.toggle('is-on', repeat !== 'off');
        $('use', b).setAttribute('href', repeat === 'one' ? '#i-repeat1' : '#i-repeat');
        b.setAttribute('title', T('mu.rep.' + repeat));
      });
      $$('[data-m="mute"]').forEach(b => { $('use', b).setAttribute('href', muted || vol === 0 ? '#i-mute' : '#i-vol'); });
      $$('[data-m-vol]').forEach(r => { r.value = Math.round((muted ? 0 : vol) * 100); r.style.setProperty('--p', r.value + '%'); });
      if ('mediaSession' in navigator) { try { navigator.mediaSession.playbackState = on ? 'playing' : 'paused'; } catch (e) {} }
    }
    function paintTime() {
      const d = audio.duration || byTid[cur].dur || 0, c = audio.currentTime || 0;
      if (!seeking) $$('[data-m-seek]').forEach(r => { r.value = d ? Math.round(c / d * 1000) : 0; r.style.setProperty('--p', (d ? c / d * 100 : 0) + '%'); });
      $$('[data-m-cur]').forEach(e => { e.textContent = fmt(c); });
      $$('[data-m-dur]').forEach(e => { e.textContent = fmt(d); });
    }

    /* ── 잠금화면 · 알림창 제어 (백그라운드 재생) ── */
    let posT = 0;
    function media(t) {
      if (!('mediaSession' in navigator)) return;
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: titleOf(t), artist: MU.artist, album: MU.album,
          artwork: [{ src: new URL(coverOf(t), location.href).href, sizes: '512x512', type: 'image/jpeg' }]
        });
      } catch (e) {}
    }
    if ('mediaSession' in navigator) {
      const ms = navigator.mediaSession, set = (a, f) => { try { ms.setActionHandler(a, f); } catch (e) {} };
      set('play', () => play()); set('pause', () => audio.pause());
      set('previoustrack', () => step(-1)); set('nexttrack', () => step(1));
      set('seekto', d => { if (d.seekTime != null) audio.currentTime = d.seekTime; });
      set('seekbackward', d => { audio.currentTime = Math.max(0, audio.currentTime - (d.seekOffset || 10)); });
      set('seekforward', d => { audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + (d.seekOffset || 10)); });
    }

    /* ── 목록 ── */
    function filtered() {
      let l;
      if (filter.startsWith('u:')) { const pl = listOf(filter.slice(2)); l = pl ? pl.ids.map(id => byTid[id]).filter(Boolean) : []; }
      else l = filter === 'all' ? tracks : tracks.filter(t => t.g === filter);
      if (q) l = l.filter(t => hay(t).includes(q));
      return l;
    }
    function renderTabs() {
      if (filter.startsWith('u:') && !listOf(filter.slice(2))) filter = 'all';
      const gs = ['all', ...MU.groups];
      $('#mTabs').innerHTML = gs.map(g => {
        const n = g === 'all' ? tracks.length : tracks.filter(t => t.g === g).length;
        return `<button type="button" role="tab" aria-selected="${filter === g}" class="${filter === g ? 'is-on' : ''}" data-mg="${g}">${g === 'all' ? T('mu.g.all') : groupName(g)}<small>${n}</small></button>`;
      }).join('')
        + `<span class="music__tabs-sep" aria-hidden="true"></span>`
        + lists.map(l => `<button type="button" role="tab" aria-selected="${filter === 'u:' + l.id}" class="is-user${filter === 'u:' + l.id ? ' is-on' : ''}" data-mg="u:${l.id}">★ ${esc(l.name)}<small>${l.ids.length}</small></button>`).join('')
        + `<button type="button" class="is-new" data-mnew>＋ ${T('mu.newList')}</button>`;
    }
    function renderListHead() {
      const box = $('#mListHead');
      if (!filter.startsWith('u:')) { box.hidden = true; box.innerHTML = ''; return; }
      const pl = listOf(filter.slice(2));
      box.hidden = false;
      box.innerHTML = `<div><p class="eyebrow">${T('mu.myLists')}</p><h3>${esc(pl.name)}</h3><small>${T('mu.count', { n: pl.ids.length })}</small></div>
        <div class="music__lh-btns">
          <button type="button" class="btn-ghost" data-mlist="rename">${T('mu.rename')}</button>
          <button type="button" class="btn-ghost is-danger" data-mlist="delete">${T('mu.delete')}</button>
        </div>`;
    }
    function renderList() {
      const l = filtered(), user = filter.startsWith('u:');
      const inAny = new Set(lists.flatMap(x => x.ids));
      let html = '', lastG = null, n = 0;
      l.forEach(t => {
        if (filter === 'all' && !q && t.g !== lastG) { html += `<li class="mt__head">${groupName(t.g)}</li>`; lastG = t.g; }
        n++;
        const side = selecting
          ? `<span class="mt__check${picked.has(t.id) ? ' is-on' : ''}" aria-hidden="true"></span>`
          : user
            ? `<button type="button" class="mt__btn" data-mdel="${t.id}" aria-label="${T('mu.removeFrom')}" title="${T('mu.removeFrom')}">−</button>`
            : `<button type="button" class="mt__btn${inAny.has(t.id) ? ' is-in' : ''}" data-madd="${t.id}" aria-label="${T('mu.addTo')}" title="${T('mu.addTo')}">${inAny.has(t.id) ? '✓' : '＋'}</button>`;
        html += `<li class="mt${t.id === cur ? ' is-cur' : ''}${t.playable ? '' : ' is-off'}${selecting && picked.has(t.id) ? ' is-picked' : ''}" data-tid="${t.id}" tabindex="0" role="button" aria-label="${esc(titleOf(t))}">
          <span class="mt__no">${String(n).padStart(2, '0')}</span>
          <span class="mt__art"><img src="${coverOf(t)}" alt="" loading="lazy"><i class="eq" aria-hidden="true"><b></b><b></b><b></b></i></span>
          <span class="mt__text"><b>${esc(titleOf(t))}</b><small>${esc(subOf(t))}</small></span>
          <span class="mt__dur">${t.playable ? fmt(t.dur) : T('mu.soon')}</span>
          ${side}
        </li>`;
      });
      $('#mTracks').innerHTML = html || `<li class="empty">${user && !q ? T('mu.listEmpty') : T('mu.empty')}</li>`;
      $('#mCount').textContent = T('mu.count', { n: tracks.filter(t => t.playable).length });
      renderListHead();
      paintSelect();
    }

    /* ── 선택 모드 · 담기 ── */
    function paintSelect() {
      root.classList.toggle('is-selecting', selecting);
      $('#mSelBtn').classList.toggle('is-on', selecting);
      $('#mSelBar').hidden = !selecting;
      $('#mSelCount').textContent = T('mu.selCount', { n: picked.size });
      $('#mSelAdd').disabled = !picked.size;
    }
    function setSelecting(on) { selecting = on; picked.clear(); renderList(); }
    function openSheet(ids) {
      sheetIds = ids;
      const sh = $('#mSheet');
      $('#mSheetList').innerHTML = lists.length
        ? lists.map(l => { const all = ids.every(id => l.ids.includes(id)); return `<li><button type="button" data-msheet="${l.id}" class="${all ? 'is-in' : ''}"><b>★ ${esc(l.name)}</b><small>${T('mu.count', { n: l.ids.length })}</small><i>${all ? '✓' : '＋'}</i></button></li>`; }).join('')
        : `<li class="empty">${T('mu.noLists')}</li>`;
      $('#mSheetName').value = '';
      $('#mSheetName').placeholder = T('mu.defaultName', { n: lists.length + 1 });
      sh.hidden = false; void sh.offsetWidth; sh.classList.add('is-open');
    }
    function closeSheet() { const sh = $('#mSheet'); sh.classList.remove('is-open'); setTimeout(() => { sh.hidden = true; }, 250); }
    function addTo(listId, ids) {
      const l = listOf(listId); if (!l) return;
      const before = l.ids.length;
      ids.forEach(id => { if (!l.ids.includes(id)) l.ids.push(id); });
      saveLists();
      toast(T('mu.added', { name: l.name, n: l.ids.length - before }));
    }
    function createList(name, ids) {
      const l = { id: 'p' + Date.now().toString(36), name: name || T('mu.defaultName', { n: lists.length + 1 }), ids: ids.filter(id => byTid[id]) };
      lists.push(l); saveLists();
      toast(T('mu.created', { name: l.name }));
      return l;
    }

    /* ── 열기 · 닫기 ── */
    let closeT;
    function open() {
      clearTimeout(closeT);
      renderTabs(); renderList(); paint(); paintState(); paintTime();
      root.hidden = false; void root.offsetWidth;
      root.classList.add('is-open');
      body.classList.add('is-locked', 'is-music');
      /* 지금 곡이 보이도록 목록만 스크롤 (scrollIntoView 는 겹쳐진 창 전체를 밀어버림).
         모바일은 창 전체가 하나로 스크롤되므로 커버가 먼저 보이게 맨 위에서 시작 */
      root.scrollTop = 0;
      const list = $('#mTracks'), main = $('.music__main', root), c = $('.mt.is-cur', root);
      main.scrollTop = 0;
      if (c && getComputedStyle(list).overflowY === 'auto') {
        list.scrollTop += c.getBoundingClientRect().top - list.getBoundingClientRect().top - list.clientHeight / 2 + c.offsetHeight / 2;
      }
      $('[data-m="close"]', root).focus({ preventScroll: true });
    }
    function close() {
      if (root.hidden) return;
      if (selecting) setSelecting(false);
      if (!$('#mSheet').hidden) closeSheet();
      root.classList.remove('is-open');
      body.classList.remove('is-music');
      if (!Modal.isOpen && !Domain.isOpen) body.classList.remove('is-locked');
      closeT = setTimeout(() => { root.hidden = true; }, 420);
    }

    /* ── 입력 ── */
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-m]');
      if (b) {
        const a = b.dataset.m;
        if (a === 'play') toggle();
        else if (a === 'next') step(1);
        else if (a === 'prev') { if (audio.currentTime > 3) audio.currentTime = 0; else step(-1); }
        else if (a === 'shuffle') { shuffle = !shuffle; store.set('m.shuffle', shuffle); buildOrder(); paintState(); toast(shuffle ? T('mu.shuffleOn') : T('mu.shuffleOff')); }
        else if (a === 'repeat') { repeat = { all: 'one', one: 'off', off: 'all' }[repeat]; store.set('m.repeat', repeat); audio.loop = repeat === 'one'; paintState(); toast(T('mu.rep.' + repeat)); }
        else if (a === 'mute') {
          if (vol === 0) { vol = .5; muted = false; } else muted = !muted;
          audio.muted = muted; audio.volume = vol;
          store.set('m.muted', muted); store.set('m.vol', vol);
          paintState();
        }
        else if (a === 'open') { if ($('#hud').classList.contains('is-menu')) $('#hud').classList.remove('is-menu'); open(); }
        else if (a === 'close') close();
        else if (a === 'shuffleAll') {
          shuffle = true; store.set('m.shuffle', true);
          const l = filtered().filter(t => t.playable);
          if (!l.length) return;
          cur = l[Math.floor(Math.random() * l.length)].id;
          setBase(l); play(cur); paintState();
        }
        return;
      }
      const p = e.target.closest('[data-play]');
      if (p) {
        e.preventDefault(); e.stopPropagation();
        const id = p.dataset.play;
        if (id === cur && !audio.paused) audio.pause();
        else { if (!base.includes(id)) setBase(tracks); play(id); }
      }
    }, true);

    $('#mTracks').addEventListener('click', e => {
      const add = e.target.closest('[data-madd]');
      if (add) { e.stopPropagation(); openSheet([add.dataset.madd]); return; }
      const del = e.target.closest('[data-mdel]');
      if (del) {
        e.stopPropagation();
        const l = listOf(filter.slice(2));
        if (l) { l.ids = l.ids.filter(id => id !== del.dataset.mdel); saveLists(); toast(T('mu.removed', { name: l.name })); renderTabs(); renderList(); }
        return;
      }
      const li = e.target.closest('.mt'); if (!li) return;
      const t = byTid[li.dataset.tid];
      if (selecting) {
        if (!t.playable) return;
        picked.has(t.id) ? picked.delete(t.id) : picked.add(t.id);
        li.classList.toggle('is-picked', picked.has(t.id));
        const ck = $('.mt__check', li); if (ck) ck.classList.toggle('is-on', picked.has(t.id));
        paintSelect();
        return;
      }
      if (!t.playable) { toast(T('mu.soon')); return; }
      if (t.id === cur && loadedId) { toggle(); return; }
      cur = t.id; setBase(filtered()); play(t.id);
    });
    $('#mTracks').addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.classList.contains('mt')) e.target.click(); });
    $('#mTabs').addEventListener('click', e => {
      if (e.target.closest('[data-mnew]')) { openSheet(selecting ? [...picked] : []); return; }
      const b = e.target.closest('[data-mg]'); if (!b) return;
      filter = b.dataset.mg; renderTabs(); renderList(); $('#mTracks').scrollTop = 0;
    });
    $('#mListHead').addEventListener('click', e => {
      const b = e.target.closest('[data-mlist]'); if (!b) return;
      const l = listOf(filter.slice(2)); if (!l) return;
      if (b.dataset.mlist === 'rename') {
        const name = (window.prompt(T('mu.renamePrompt'), l.name) || '').trim();
        if (name) { l.name = name.slice(0, 30); saveLists(); renderTabs(); renderListHead(); }
      } else if (b.dataset.mlist === 'delete') {
        if (window.confirm(T('mu.delConfirm', { name: l.name }))) { lists = lists.filter(x => x !== l); saveLists(); filter = 'all'; renderTabs(); renderList(); }
      }
    });
    $('#mSelBtn').addEventListener('click', () => setSelecting(!selecting));
    $('#mSelCancel').addEventListener('click', () => setSelecting(false));
    $('#mSelAdd').addEventListener('click', () => { if (picked.size) openSheet([...picked]); });
    $('#mSheet').addEventListener('click', e => {
      if (e.target.closest('[data-msheet-close]')) { closeSheet(); return; }
      const b = e.target.closest('[data-msheet]');
      if (b) {
        if (!sheetIds.length) { filter = 'u:' + b.dataset.msheet; closeSheet(); renderTabs(); renderList(); return; }
        addTo(b.dataset.msheet, sheetIds); closeSheet();
        if (selecting) setSelecting(false); else { renderTabs(); renderList(); }
      }
    });
    $('#mSheetForm').addEventListener('submit', e => {
      e.preventDefault();
      const l = createList($('#mSheetName').value.trim().slice(0, 30), sheetIds);
      closeSheet();
      selecting = false; picked.clear();
      filter = 'u:' + l.id; renderTabs(); renderList();
    });
    let qT;
    $('#mSearch').addEventListener('input', e => { clearTimeout(qT); qT = setTimeout(() => { q = e.target.value.trim().toLowerCase(); renderList(); }, 120); });
    $('#mChar').addEventListener('click', e => { const id = e.currentTarget.dataset.char; if (!id) return; close(); setTimeout(() => Modal.open(id), 250); });

    $$('[data-m-seek]').forEach(r => {
      r.addEventListener('input', () => { seeking = true; r.style.setProperty('--p', r.value / 10 + '%'); const d = audio.duration || byTid[cur].dur; $$('[data-m-cur]').forEach(e => { e.textContent = fmt(r.value / 1000 * d); }); });
      r.addEventListener('change', () => {
        seeking = false;
        if (!loadedId) load(cur);
        const d = audio.duration || byTid[cur].dur;
        if (d) audio.currentTime = r.value / 1000 * d;
      });
    });
    $$('[data-m-vol]').forEach(r => r.addEventListener('input', () => {
      vol = r.value / 100; muted = vol === 0 ? muted : false;
      audio.volume = vol; audio.muted = muted;
      store.set('m.vol', vol); store.set('m.muted', muted);
      paintState();
    }));

    audio.addEventListener('play', paintState);
    audio.addEventListener('pause', paintState);
    audio.addEventListener('loadedmetadata', paintTime);
    audio.addEventListener('timeupdate', () => {
      paintTime();
      const now = performance.now();
      if ('mediaSession' in navigator && navigator.mediaSession.setPositionState && audio.duration && now - posT > 1000) {
        posT = now;
        try { navigator.mediaSession.setPositionState({ duration: audio.duration, playbackRate: audio.playbackRate, position: Math.min(audio.currentTime, audio.duration) }); } catch (e) {}
      }
      /* 연속 재생: 곡이 완전히 끝나 '정지' 상태가 되기 직전에 다음 곡으로 넘긴다.
         모바일은 화면이 꺼진 뒤 한 번 멈춘 오디오를 다시 켜지 못하게 막는 경우가 있어서,
         재생이 끊기지 않은 채로 곡을 바꿔야 백그라운드에서도 이어진다 */
      if (!advancing && repeat !== 'one' && !audio.paused && audio.duration && audio.duration - audio.currentTime < .3) {
        advancing = true;
        step(1, true);
      }
    });
    audio.addEventListener('ended', () => { if (repeat === 'one') { audio.currentTime = 0; play(); } else if (!advancing) { advancing = true; step(1, true); } });
    audio.addEventListener('error', () => { if (loadedId) toast(T('mu.err')); });

    /* 아이폰 Safari 는 스크립트로 볼륨을 못 바꾼다 → 볼륨 바 대신 기기 버튼 사용 */
    audio.volume = .5;
    if (Math.abs(audio.volume - .5) > .01) body.classList.add('no-vol');
    audio.volume = vol; audio.muted = muted;

    setBase(tracks);
    paint(); paintState(); paintTime();

    return {
      open, close, toggle,
      get isOpen() { return !root.hidden && root.classList.contains('is-open'); },
      get sheetOpen() { return !$('#mSheet').hidden; },
      closeSheet,
      has: id => !!(byTid[id] && byTid[id].playable),
      get cur() { return cur; },
      titleOf: id => byTid[id] ? titleOf(byTid[id]) : '',
      refresh() { paint(); if (!root.hidden) { renderTabs(); renderList(); } }
    };
  })();

  /* ════════════════════ 전역 입력 ════════════════════ */
  document.addEventListener('click', e => {
    const g = e.target.closest('[data-go]');
    if (g) {
      e.preventDefault();
      if (Modal.isOpen) Modal.close();
      go(g.dataset.go);
    }
  });

  addEventListener('keydown', e => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); Palette.isOpen ? Palette.close() : Palette.open(); return; }
    if (e.key === '/' && !typing && !Palette.isOpen) { e.preventDefault(); Palette.open(); return; }
    if (Music.isOpen && !typing && e.code === 'Space') { e.preventDefault(); Music.toggle(); return; }
    if (e.key === 'Escape') {
      if (Palette.isOpen) Palette.close();
      else if (Cut.isOpen) Cut.skip();
      else if (Music.isOpen) { if (Music.sheetOpen) Music.closeSheet(); else Music.close(); }
      else if (Domain.isOpen) Domain.close();
      else if (Modal.isOpen) Modal.close();
      else $('#hud').classList.remove('is-menu');
      return;
    }
    if (Modal.isOpen && !Domain.isOpen && !typing) {
      if (e.key === 'ArrowLeft') Modal.step(-1);
      if (e.key === 'ArrowRight') Modal.step(1);
    }
  });

  $('#btnSearch').addEventListener('click', () => Palette.open());
  $('#btnMenu').addEventListener('click', () => $('#hud').classList.toggle('is-menu'));
  /* 인트로로 돌아가기 (상단 버튼 · 푸터) */
  const replayIntro = () => {
    if (Palette.isOpen) Palette.close();
    if (Domain.isOpen) Domain.close();
    if (Modal.isOpen) Modal.close();
    $('#hud').classList.remove('is-menu');
    window.scrollTo(0, 0);
    Intro.start(true);
  };
  $('#replayIntro').addEventListener('click', replayIntro);
  $('#btnIntro').addEventListener('click', replayIntro);

  /* 언어 고르기: 선택을 저장하고 같은 화면으로 다시 읽는다 */
  (() => {
    const box = $('#lang'), btn = $('#langBtn'), menu = $('#langMenu');
    const CODES = { ko: 'KO', en: 'EN', ja: 'JA', zh: '繁中' };
    $('#langCur').textContent = CODES[LANG];
    $$('[data-lang]', menu).forEach(b => b.setAttribute('aria-checked', String(b.dataset.lang === LANG)));
    const set = open => { box.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', e => { e.stopPropagation(); set(!box.classList.contains('is-open')); });
    document.addEventListener('click', e => { if (!box.contains(e.target)) set(false); });
    addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
    menu.addEventListener('click', e => {
      const b = e.target.closest('[data-lang]');
      if (!b) return;
      if (b.dataset.lang === LANG) { set(false); return; }
      try { localStorage.setItem('modeler.lang', b.dataset.lang); } catch (err) {}
      /* 주소에 ?lang= 이 있으면 지워서 다시 읽고, 없으면 그냥 새로고침 (해시만 같은 주소로 바꾸면 다시 읽지 않음) */
      const u = new URL(location.href);
      if (u.searchParams.has('lang')) { u.searchParams.delete('lang'); location.replace(u.href); }
      else location.reload();
    });
  })();

  /* ════════════════════ 시작 ════════════════════ */
  renderWorld();
  applyLocks();
  let start = location.hash.slice(1);
  if (!VIEWS.includes(start)) start = 'world';
  /* 이미 반전세계에 들어간 적이 있으면(언어를 바꿔 다시 읽은 경우 등) 그대로 반전세계에서 시작 */
  if (start === 'reverse' && !unlocked) start = 'gate';
  show(start, worldFor(start), false);
  history.replaceState(null, '', '#' + start);
  Intro.start(false);
})();
