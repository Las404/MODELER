/* ════════════════════════════════════════════════════════════
   MODELER — English
   · 원본(한국어)은 index.html · js/data.js 입니다. 이 파일은 그 번역본입니다.
   · ui: 화면 문구 / data: 세력 · 캐릭터 · 관계 등 데이터 번역
   ════════════════════════════════════════════════════════════ */
window.MODELER_L10N = {
  code: 'en',

  ui: {
    'site.title': 'MODELER — The Modeler Archive',
    'meta.desc': 'A modern age where those who carry the legacy of myth stand against the beasts leaking from the far side of the world, and against those who would end humanity.',

    /* 인트로 */
    'intro.aria': 'Intro',
    'intro.l1': 'Myth never ended.',
    'intro.l2': 'It dwells within human bodies,',
    'intro.l3': 'and seeps out from the far side of the world.',
    'intro.sub': 'Records of Those Who Inherited Myth',
    'intro.enter': 'Open the Archive',

    /* 상단 */
    'hud.home': 'Back to the lore', 'hud.nav': 'Main menu',
    'nav.world': 'Lore', 'nav.modelers': 'Modelers', 'nav.reverse': 'Reverse World', 'nav.relations': 'Relations',
    'hud.intro': 'Back to intro', 'hud.search': 'Search modelers (Ctrl+K)', 'hud.menu': 'Menu',
    'ticker.real': 'OPS ROOM', 'ticker.reverse': 'REVERSAL',

    /* 히어로 */
    'hero.t1': 'Those who carry the legacy of myth',
    'hero.t2': 'stand against the beasts leaking from the far side of the world',
    'hero.t3': 'and those who would end humanity — <em>in the modern age.</em>',
    'hero.lead': 'Day to day, it is a story of rift suppression, organizational life, and climbing the ranks.<br>But beyond the sky hangs a storm cloud called <strong>Ragnarök</strong>.',

    /* 표면 / 이면 */
    'dual.aria': 'Flip between surface and underside',
    'dual.fEye': 'SURFACE',
    'dual.fTitle': 'Heroes <span>vs</span> Villains',
    'dual.fText': 'Modelers join the Pantheon, seal rifts, climb the grades, and grow within the organization. The enemy is clear: Muspell, who would end humanity.',
    'dual.fHint': 'Tap to flip ↻',
    'dual.bEye': 'UNDERSIDE',
    'dual.bTitle': '"The Pantheon <em>created</em> its own enemy."',
    'dual.bText': 'Only a handful at the very top of each faction know the truth. Most modelers run the field every day knowing nothing.',
    'dual.bHint': 'Tap again to cover ↻',

    /* 시그니처 룰 */
    'rule.title': 'The One Rule of This World',
    'rule.quote': 'When a model holder dies,<br>that model vanishes from the world <em>for decades</em>.',
    'rule.text': 'One model per person — and each exists only once in the world. When a holder dies, the model manifests in a random person of the next generation, born after the death. From that moment until the next holder grows up and awakens: a gap of decades. This is called a <strong>"Vacant Model."</strong>',
    'vac.alive': 'Holder alive', 'vac.void': 'Vacant · decades', 'vac.next': 'Next gen awakens',
    'vac.m1': '<b>✕</b> Holder dies', 'vac.m2': '<b>✦</b> Manifests in a random newborn', 'vac.m3': '<b>◎</b> Awakening · Pantheon grading',
    'der.no1': 'COROLLARY 1', 'der.t1': 'Capture-First Principle',
    'der.p1': 'Killing an enemy erases their power from the world for decades. So the Pantheon\'s rule is to <strong>subdue and detain</strong>.',
    'der.no2': 'COROLLARY 2', 'der.t2': 'Asymmetric Combat',
    'der.p2': 'Muspell wants humanity wiped out. A vacant model means a permanent loss of defensive power — in other words, a <strong>gain</strong>. One side cannot kill. The other kills freely.',
    'der.no3': 'COROLLARY 3', 'der.t3': 'The Vacancy List Becomes a Commodity',
    'der.p3': 'Which models are empty right now? That is the <strong>Oracle</strong>\'s best-selling product.',
    'rule.note': '※ Models pass on at random, so bloodline inheritance is impossible. There are no clans or noble houses in this world.',

    /* 모델 */
    'model.title': 'Models — The Nature of the Power',
    'model.text': 'A mythic being manifested in an individual. Written as <code class="tag-model">MODEL: Excalibur</code>. One who holds a model is a <strong>Modeler</strong>; one who abuses a model for crime is a <strong class="t-danger">Breaker</strong>.',
    'model.f1': '<b>Innate</b>Cannot be acquired or transferred later in life. The sole exception is a forbidden technique.',
    'model.f2': '<b>One each</b>Each exists only once in the world. No duplicates.',
    'model.f3': '<b>Output</b>On average: Supreme God › Deity › Demigod. But individual skill can reverse it.',
    'model.f4': '<b>No hiding</b>Use the power even a little and it shows.',
    'model.f5': '<b>Rank ≠ Grade</b>"Model Rank" and "Holder Grade" are written separately. An unfinished talent like "Rank S, Holder E" is possible.',
    'aether.title': 'Aether',
    'aether.text': 'The energy that drives a model. Its total is fixed at birth.',
    'aether.total': 'Total', 'aether.fixed': 'FIXED', 'aether.eff': 'Efficiency', 'aether.rec': 'Recovery', 'aether.comp': 'Compression', 'aether.train': 'TRAIN ↑',
    'aether.foot': 'It recovers naturally over time. Spend all of it and you cannot use your model until it returns. That is a model\'s <strong>only price</strong>.',
    'model.cats': 'Model Classes',

    /* 해방 */
    'rel.title': 'Release <small>解放</small>',
    'rel.text': 'An ultimate technique with a name unique to each holder. A Release breaks past the 100% cap of one\'s power — a <strong>limit break</strong>. Requirement: <strong>Grade S or above</strong>. So few can do it that it forms the world\'s true class line.',
    'rel.k1': 'DOMAIN', 'rel.v1': 'The surroundings warp to follow the model\'s myth. It is a space cut off from reality, and everything inside it is real.',
    'rel.k2': 'WHO IS INSIDE', 'rel.v2': 'Civilians are excluded. Only model holders can be trapped or trap others.',
    'rel.k3': 'VARIANTS', 'rel.v3': 'Some domains force a one-on-one duel, depending on the model.',
    'rel.k4': 'DEBUFFS', 'rel.v4': 'Those trapped suffer penalties based on the owner\'s myth — guaranteed lightning strikes, slowing, and more.',
    'rel.k5': 'DURATION', 'rel.v5': 'Until stamina runs out. Usually about 5 minutes.',
    'rel.k6': 'CLASH', 'rel.v6': 'When two release at once, the stronger takes control. If evenly matched, both releases fail.',
    'rel.k7': 'BREAKING', 'rel.v7': 'With an overwhelming gap, the domain itself can be shattered.',
    'rel.k8': 'IF BROKEN', 'rel.v8': 'The caster\'s limit-break value is halved, all debuffs lift, and the backdrop vanishes.',
    'rel.k9': 'AFTERMATH', 'rel.v9': 'Output drops to 30% for one week afterward. The bigger the breakthrough, the worse it gets.',
    'rel.callout': 'A Release does not guarantee victory — it <em>raises the stakes</em>. If it breaks, the one who opened it is worse off.',
    'rel.gallery': 'Recorded Releases',

    /* 등급 */
    'grade.title': 'Grading System',
    'grade.holder': 'Holder Grade <small>Pantheon testing · mandatory for all, including the unaffiliated</small>',
    'grade.oracleNote': 'The Oracle runs its own unofficial grades internally, based on Pantheon data and holder testimony.',
    'grade.hazard': 'Disaster Grade <small>Shared by Morphos and hostile ability users · declared by the ops room</small>',
    'grade.doom': 'Apocalypse-class', 'hz.doomD': 'Threat to humanity\'s survival. Ragnarök triggered, or an equivalent event', 'hz.doomR': 'All organizations mobilized · civilians and unaffiliated conscripted',
    'grade.cata': 'Catastrophe-class', 'hz.cataD': 'Destruction on the scale of a city or larger', 'hz.cataR': 'Grade S deployed · wide-area evacuation · <b>Capture-First lifted</b>',
    'grade.haz': 'Disaster-class', 'hz.hazD': 'District-level damage · civilian casualties', 'hz.hazR': 'Squads formed under an A-grade commander · perimeter sealed',
    'roe.label': 'Rules of engagement —', 'roe.btn': 'Declare Catastrophe',
    'roe.on': 'Lethal force authorized · Capture-First lifted', 'roe.off': 'Capture first',
    'grade.note': 'Anything smaller is not declared and is handled as routine suppression. Individuals can also be permanently designated ("Catastrophe-designated person"). <br><strong>"Catastrophe declared" = "You may kill."</strong> A grade is a switch that changes the rules of engagement.',

    /* 판정 시뮬레이터 */
    'judge.eye': 'SIMULATOR · GRADING ROOM',
    'judge.title': 'What is your model?',
    'judge.text': 'Enter a name and the Pantheon\'s grading officer will measure you. The same name always gets the same result.',
    'judge.ph': 'Enter a name', 'judge.name': 'Name', 'judge.go': 'Begin',
    'judge.wait': 'Awaiting certificate',

    /* 세력 */
    'fac.title': 'Factions — Home Ground of the Cast',
    'fac.text': 'Relations between factions are cooperation, friction, and trade. Not everything is war. Only one is clearly hostile: <strong class="t-danger">Muspell</strong>.',

    /* 라그나로크 · 이면 */
    'rag.title': 'The Looming Threat — Ragnarök',
    'rag.text': 'A ritual to exterminate humanity, driven by Muspell. It forcibly links the Reverse World and reality and unleashes Morphos everywhere at once. <strong>Once triggered, it cannot be undone.</strong>',
    'rag.souls': 'human souls',
    'rag.key': 'the soul of one flagship-class mythic model holder<br><small>Any mythology · must be taken alive</small>',
    'rag.end': 'Ragnarök',
    'rag.f1': '<b>Raids grow frequent</b>Muspell\'s city raids are soul-gathering. The slaughter is not the goal — it is the means.',
    'rag.f2': '<b>Flagship holders disappear</b>The Pantheon must protect every flagship holder of every mythology: a losing defensive position.',
    'rag.f3': '<b>A number is counted</b>In a ledger somewhere, one more number is written down today.',
    'cls.eye': 'CLASSIFIED · Pantheon internal document · clearance S and above',
    'cls.title': 'The Underside — The Pantheon\'s Past',
    'cls.body': 'The Pantheon, <span class="redact">thirty years ago</span>, carried out <span class="redact">inhumane experiments on model holders</span>, and <span class="redact">covered them up</span>. Many of Muspell\'s officers are <span class="redact">those very victims</span>. Even within the Pantheon, <span class="redact">only a handful</span> know.',
    'cls.btn': 'Request declassification',
    'cls.done': 'Your access was logged — Internal Affairs notified',
    'cls.toast': 'Kyo Orihara: "Ah, that\'s quite all right. ……Only, that document you just opened — once more, please."',

    /* 지리 */
    'geo.title': 'A World in Three Layers',
    'geo.aria': 'Diagram of reality, the boundary, and the Reverse World',
    'geo.real': '現實 · Reality — Japan',
    'geo.pinPantheon': 'Pantheon HQ<small>Tokyo</small>',
    'geo.pinKarasu': 'Karasu Office<small>Tokyo outskirts</small>',
    'geo.pinRift': 'Rifts<small>Random, nationwide</small>',
    'geo.border': '境界 · The Boundary',
    'geo.pinOracle': 'Oracle<small>Unreachable</small>',
    'geo.reverse': '反轉 · Reverse World',
    'geo.pinMuspel': 'Muspell<small>Base</small>',
    'geo.text': 'The stage is modern Japan, with real place names, centered on Tokyo. Black rifts open at random anywhere in the country, and major cities keep standing response teams.',
    'gl.t1': 'Modeler', 'gl.d1': 'One who holds a model.',
    'gl.t2': 'Breaker', 'gl.d2': 'One who abuses a model for crime.',
    'gl.t3': 'Vacant Model', 'gl.d3': 'A model left empty after its holder dies, until the next holder awakens.',
    'gl.t4': 'Rift', 'gl.d4': 'A black tear that opens at random in reality. Morphos come out through it.',
    'gl.t5': 'Morphos', 'gl.d5': 'Beasts given form by dreams, emotion, fear, and the monsters of myth.', 'gl.d5link': 'Reverse World records ›',
    'gl.t6': 'Capture-First', 'gl.d6': 'The Pantheon\'s rule of engagement: subdue and detain, never kill.',
    'next.title': 'Modelers of the Real World',
    'next.text': 'The Pantheon, the Karasu Office, the unaffiliated — and the Oracle on the boundary.',
    'next.btn': 'Open the modeler records',

    /* 모델러 페이지 */
    'mod.eye': '現實 · Ordinary World <span>—</span> TOKYO',
    'mod.title': 'Modeler Records',
    'mod.lead': 'Modelers who live with their feet in reality. Pick an affiliation and tap a card to read the record.',
    'mod.tabs': 'Affiliation', 'mod.ph': 'Search name · model · role', 'mod.searchAria': 'Search',
    'mod.catAria': 'Filter by model class', 'mod.sortAria': 'Sort',
    'mod.sDefault': 'Default order', 'mod.sGrade': 'Highest grade', 'mod.sName': 'By name', 'mod.sAge': 'Oldest first',
    'mod.random': 'Random modeler', 'mod.empty': 'No modelers match these conditions.',
    'cta.title': 'Beyond this lies the <em>Reverse World</em>.',
    'cta.text': 'A blood-red sky with not a single person in it. Home of Muspell and the Morphos.',
    'cta.btn': 'Head for the rift',

    /* 게이트 */
    'gate.aria': 'Entering the Reverse World',
    'gate.warn': 'No entry for ordinary people.<br>Even model holders cannot cross by ordinary means.',
    'gate.holdAria': 'Press and hold to enter the Reverse World',
    'gate.tip': 'Lay your hand on the rift and <b>press and hold</b> · <kbd>Space</kbd>',
    'gate.back': '‹ Return to reality',
    'gate.hold': 'Press & hold',
    'gate.entered': 'Entered the Reverse World — Muspell records unsealed.',

    /* 반전세계 */
    'rv.lead': 'The land and buildings are almost identical to the real Japan.<br>Except <strong>there is not a single person.</strong> And the sky is blood red.',
    'rv.s1': 'Residents', 'rv.s2': 'Morphos', 'rv.s3': 'Muspell members',
    'rv.title': 'The Reverse World <small>反轉世界</small>',
    'rv.f1': '<b>Terrain</b>Land and buildings almost identical to the real Japan.',
    'rv.f2': '<b>People</b>Not a single person.',
    'rv.f3': '<b>Sky</b>Always blood red.',
    'rv.f4': '<b>Entry</b>Ordinary people cannot enter. Even model holders cannot cross by ordinary means.',
    'rv.f5': '<b>Boundary</b>The Oracle sits on the border with reality.',
    'rv.secEye': 'TOP SECRET · MUSPELL\'S HIGHEST SECRET',
    'rv.secTitle': 'Coordinates of the Small Rifts',
    'rv.secText': 'Only Muspell knows where the small rifts are — rifts known to no one else. It is the root reason the Pantheon cannot pursue them.',
    'mo.title': 'Morphos',
    'mo.tag': 'Black rift · sighting record',
    'mo.text1': 'Beasts given form by dreams, emotion, fear, the monsters of myth, and legend. They live in the Reverse World and appear whenever a <strong>black rift</strong> opens at random in reality.',
    'mo.c1': 'Wolf-type', 'mo.c2': 'Dragon-type', 'mo.c3': 'Shapes of fear', 'mo.c4': 'Legends reborn',
    'mo.text2': 'Where they appear cannot be predicted. That is why the Oracle\'s <strong>sighting forecasts</strong> sell for so much.',
    'mo.gEye': 'The more there are, the faster they multiply',
    'mo.gN': 'Unchecked Morphos', 'mo.gX': 'appearance rate',
    'mo.gNote': 'The reason constant suppression is essential — and the basis on which Ragnarök stands.',
    'mu.title': 'Muspell',
    'mu.motto': '"No one stopped it."',
    'mu.text': 'The faction driving the extermination ritual Ragnarök. Those disillusioned with the world, and victims of the Pantheon\'s experiments. They have no qualms about killing.',
    'mu.t1': 'Base · Reverse World', 'mu.t2': 'Unrestricted killing', 'mu.t3': 'Many former test subjects',
    'lg.eye': 'ELJUDNIR LEDGER',
    'lg.title': 'Sacrifice Tally',
    'lg.note': 'The count is written only in Miyuki Hiiragi\'s ledger. No outside access.',
    'lg.slot': 'Flagship-class holder', 'lg.none': 'NOT SECURED',
    'lg.target': 'TARGET', 'lg.ex': 'Excalibur', 'lg.exWho': 'Rei Asagiri · Karasu', 'lg.ac': 'Achilles', 'lg.acWho': 'Takeru Hayase · Unaffiliated',
    'lg.note2': 'Officer in charge — Yu Kuroiwa. Any mythology · must be taken alive.',
    'tb.title': 'Forbidden Technique — Forced Model Transplant',
    'tb.text1': 'Developed by Muspell: the <strong>sole exception</strong> to acquiring a model after birth. The success rate is vanishingly low; most die or lose their humanity.',
    'tb.text2': 'There is exactly one success: <a class="t-link" href="#" data-char="kuga">"Kuga"</a> — the result of artificially manifesting the then-vacant Fenrir.',
    'tb.aria': 'Records of transplant attempts',
    'mm.title': 'Members of Muspell',
    'mm.text': 'Muspell members are recorded not by holder grade but by the <strong>disaster grade</strong> the Pantheon has assigned them.',
    'ret.title': 'Return to Reality',
    'ret.text': 'Close the rift, and go back beneath the sky where people live.',
    'ret.btn': 'Return to reality',

    /* 관계도 */
    'rg.lead': 'Drag nodes around and tap one to see its relations. Double-tap to open the record.',
    'rg.aria': 'Character relationship graph',
    'rg.hint': 'Select a node.',
    'rg.hintFull': 'Select a node. Drag to move it around.',
    'rg.sealed': 'Record sealed', 'rg.faction': 'Faction', 'rg.sealedNeed': 'Record sealed — enter the Reverse World', 'rg.open': 'Open record ›',

    'foot.intro': 'Replay intro', 'foot.search': 'Ctrl + K to search',
    'cm.prev': 'Previous modeler', 'cm.next': 'Next modeler',
    'dm.time': 'Domain time', 'dm.char': 'Holder record', 'dm.close': 'Dispel domain',
    'hud.secret': 'Classified view', 'secret.hide': 'Hide classified', 'hud.music': 'Playlist mode',
    'secret.on': 'Classified view on — secret lore and Muspell records revealed.',
    'secret.off': 'Classified records sealed again.',
    'secret.offKept': 'Classified view off. You have entered the Reverse World, so Muspell records stay visible.',
    'mu.player': 'Music player', 'mu.seek': 'Seek', 'mu.shuffle': 'Shuffle', 'mu.prev': 'Previous', 'mu.next': 'Next', 'mu.repeat': 'Repeat',
    'mu.mute': 'Mute', 'mu.vol': 'Volume', 'mu.close': 'Back to the site', 'mu.queue': 'Playlist', 'mu.ph': 'Search songs · characters',
    'mu.shuffleAll': 'Shuffle play', 'mu.charRec': 'View character record',
    'mu.g.all': 'All', 'mu.g.main': 'Main Title', 'mu.g.chapter': 'Chapter Titles', 'mu.g.battle': 'Battle', 'mu.g.release': 'Releases',
    'mu.theme': '{name} Theme', 'mu.releaseOf': '{name} · Release "{rel}"',
    'mu.soon': 'Coming soon', 'mu.count': '{n} tracks', 'mu.empty': 'No matching songs.', 'mu.err': 'Could not load this song.',
    'mu.rep.all': 'Repeat all', 'mu.rep.one': 'Repeat one', 'mu.rep.off': 'Repeat off',
    'mu.shuffleOn': 'Shuffle on', 'mu.shuffleOff': 'Shuffle off', 'mu.play': 'Play', 'mu.pause': 'Pause',
    'mu.playTheme': 'Play theme', 'mu.playRelease': 'Play release theme',
    'dm.replay': 'Replay cutscene', 'cut.aria': 'Release cutscene',
    'mu.select': 'Select', 'mu.cancel': 'Cancel', 'mu.addTo': 'Add to playlist', 'mu.newPh': 'Playlist name', 'mu.create': 'Create new',
    'mu.newList': 'New playlist', 'mu.selCount': '{n} selected', 'mu.myLists': 'My playlist',
    'mu.added': 'Added {n} to “{name}”.', 'mu.removed': 'Removed from “{name}”.', 'mu.created': 'Created playlist “{name}”.',
    'mu.rename': 'Rename', 'mu.delete': 'Delete', 'mu.renamePrompt': 'New playlist name', 'mu.delConfirm': 'Delete the playlist “{name}”?',
    'mu.listEmpty': 'No songs yet. In the “All” tab, tap ＋ next to a song to add it.', 'mu.removeFrom': 'Remove from this playlist',
    'mu.noLists': 'You have no playlists yet. Create one below.', 'mu.defaultName': 'My playlist {n}',
    'pal.ph': 'Search modeler · model · faction',
    'rg.reset': 'Reset layout',
    'rs.title': 'All Relations at a Glance',
    'rs.lead': 'Every relationship, sorted by affiliation. Tap a name to open the record; tap a row to find it in the graph above.',
    'rs.ph': 'Find by name or relation', 'rs.modeAria': 'View mode', 'rs.byGroup': 'By faction', 'rs.byPerson': 'By person',
    'rs.g.pantheon': 'Within the Pantheon', 'rs.g.karasu': 'Within the Karasu Office', 'rs.g.free': 'Among the unaffiliated', 'rs.g.oracle': 'Within the Oracle', 'rs.g.muspel': 'Within Muspell',
    'rs.cross': 'Across factions', 'rs.count': '{n}', 'rs.none': 'No matching relations.', 'rs.relN': '{n} relations',
    'toc.label': 'Contents', 'toc.top': 'Top', 'ui.top': 'Back to top', 'cm.count': '{i} / {n}',

    /* 스크립트 문구 */
    'warp.world': 'Lore', 'warp.modelers': 'Ordinary World — 東京', 'warp.gate': 'Edge of the Reverse World', 'warp.relations': 'Relations',
    'card.aria': 'Open the record of {name}', 'card.forced': 'FORCED', 'card.seal': 'Has a Release',
    'stat.factions': 'Factions', 'stat.modelers': 'Modelers on record', 'stat.releases': 'Release holders', 'stat.cats': 'Model classes',
    'cat.ex': 'e.g. {ex}', 'cat.count': '{n} on record ›',
    'lock.release': '■■■ ■■ · Muspell — record sealed',
    'ladder.EX': 'Off the scale · EX / SSS', 'ladder.EXd': 'The realm of gods. Enough to end the world',
    'ladder.S': 'National power', 'ladder.Sd': 'Can destroy an army or a city alone',
    'ladder.A': 'Elite', 'ladder.Ad': 'Handles large Morphos; the core of any incident',
    'ladder.B': 'Seasoned expert', 'ladder.Bd': 'Reliably defeats mid-tier Morphos',
    'ladder.C': 'Seasoned expert', 'ladder.Cd': 'Reliably defeats mid-tier Morphos',
    'ladder.D': 'Novice', 'ladder.Dd': 'Takes on low-tier Morphos',
    'ladder.E': 'Novice', 'ladder.Ed': 'Takes on low-tier Morphos',
    'ladder.F': 'Just awakened', 'ladder.Fd': 'Only slightly better than an ordinary person',
    'ladder.line': 'RELEASE LINE',
    'fac.sealed': 'Record sealed', 'fac.goReverse': 'View in the Reverse World ›', 'fac.goMembers': 'See all {n} members ›',
    'hz.who': '{g} designated — {names}', 'hz.whoLocked': '{g} designated: {n} — visible after entering the Reverse World',
    'jd.scan': 'Measuring……', 'jd.docTitle': 'GRADING CERTIFICATE', 'jd.name': 'Name', 'jd.model': 'Model', 'jd.remark': 'Remarks',
    'jd.mg': 'Model Rank', 'jd.hg': 'Holder Grade', 'jd.dg': 'Disaster Grade', 'jd.signer': '— Grading Officer Reika Fujisaki',
    'jd.selfRemark': 'The grading officer herself. Self-grading is prohibited.',
    'jd.selfQuote': '……Article 1, Clause 4. A grading officer does not grade herself. Next.',
    'jd.knownLocked': 'Record sealed — no access', 'jd.known': 'Already registered. Affiliation: {f}',
    'jd.knownQuote': '……A record already exists. Duplicate measurements are not accepted. Next.',
    'jd.unstableQuote': '……Unmeasurable. Grading withheld under Article 6, Clause 1. No objections accepted.',
    'jd.quote': '……Measurement complete. {g}, under {clause}. Any objections? If not, next.',
    'jd.clause': 'Article {a}, Clause {b}', 'jd.clause7': 'Article 7', 'jd.pending': 'HOLD',
    'jd.rUnstable': 'Uncontrollable. Registered only; assignment withheld. (A Karasu Office business card is enclosed.)',
    'jd.rEX': 'Off the scale. Report to leadership immediately. The Oracle very likely knows already.',
    'jd.rS': 'Release line reached. Immediate Pantheon scouting target.',
    'jd.rA': 'Elite candidate. Expect a scouting war between the Pantheon and Karasu.',
    'jd.rRaw': 'Rank {mg}, Holder {g}. Unfinished talent — lots of room to grow.',
    'jd.rBC': 'Recommended for the expert training track.',
    'jd.rLow': 'Assigned to basic training. Start with low-tier Morphos.',
    'jd.empty': 'Please enter a name. — Fujisaki',
    'tab.all': 'All', 'tab.oracle': 'Oracle · Boundary',
    'bn.allEn': 'ALL MODELERS · 現實', 'bn.allName': 'Every Modeler in Reality',
    'bn.allMotto': 'Rift suppression, organizational life, climbing the ranks. And an underside no one knows.',
    'bn.allDesc': 'The Pantheon, the Karasu Office, the unaffiliated, and the Oracle — every modeler on record in reality and on the boundary, at once. Muspell can only be viewed in the Reverse World.',
    'bn.base': 'Base · {b}', 'bn.count': 'Members', 'bn.top': 'Top grade', 'bn.rel': 'Releases', 'chip.all': 'All classes',
    'cm.lockName': '■■■ · Muspell', 'cm.lockText': 'Visible after entering the Reverse World', 'cm.alt': 'Illustration of {name}', 'cm.close': 'Close',
    'cm.myth': '{myth} myth', 'cm.gradeH': 'Holder Grade', 'cm.gradeD': 'Disaster Grade', 'cm.faction': 'Affiliation', 'cm.age': 'Age', 'cm.sex': 'Sex',
    'cm.speech': 'Speech — {s}', 'cm.secP': 'PERSONALITY', 'cm.secA': 'APPEARANCE', 'cm.secI': 'ITEMS',
    'cm.secR': 'RELEASE', 'cm.secB': 'RECORD', 'cm.secRel': 'RELATIONS', 'cm.open': '▸ Expand domain',
    'cm.locked': 'This record becomes visible after entering the Reverse World.',
    'age': '{n}', 'sex.여': 'Female', 'sex.남': 'Male',
    'dm.ownerLocked': '解放 · ■■■ ■■ · Muspell — holder record sealed', 'dm.owner': '解放 · {name} · MODEL: {model}',
    'dm.end': 'Domain limit reached — Release ends. Output at 30% for the next week.',
    'tb.ok': 'Attempt #{n} — success · {model} ({name})', 'tb.lost': 'Attempt #{n} — lost humanity', 'tb.dead': 'Attempt #{n} — died',
    'tb.lgDead': 'Died', 'tb.lgLost': 'Lost humanity', 'tb.lgOk': '1 success',
    'pal.muspel': 'Muspell', 'pal.sealed': 'Record sealed', 'pal.none': 'No results.'
  },

  data: {
    factions: {
      pantheon: {
        name: 'Pantheon', type: 'Largest state-sanctioned association', base: 'Tokyo · HQ',
        motto: 'We do not kill. That is how we protect.',
        desc: 'The largest state-sanctioned association, in charge of directing suppression, registration, training, and deployment. Enormous, but bureaucratic. Since a dead holder\'s power vanishes for decades, it holds to the "Capture-First Principle": subdue and detain.',
        tags: ['Suppression command', 'Registration · grading', 'Training · deployment', 'Capture-First']
      },
      karasu: {
        name: 'Karasu Office', type: 'Private organization', base: 'Tokyo outskirts',
        motto: 'We may be broke, but we never abandon anyone.',
        desc: 'A private outfit covering the association\'s blind spots. Always short on funds and intel, with a high casualty rate. Yet thanks to a director who can read paths, its survival rate beats the Pantheon\'s own squads. The underdog.',
        tags: ['Association blind spots', 'Short on funds · intel', 'High casualties', 'Underdog']
      },
      free: {
        name: 'Unaffiliated', type: 'Individuals without an organization', base: 'All over Japan',
        motto: 'We belong to no one. But no one escapes grading.',
        desc: 'Individual modelers who belong to no organization. Free — but Pantheon testing and grading are mandatory for all. Wanderers, local guardians, contractors, ex-Pantheon: every one has a story.',
        tags: ['Independent', 'Pantheon testing mandatory', 'Mixed reputations']
      },
      oracle: {
        name: 'Oracle', type: 'Fully neutral information broker', base: 'The boundary between reality and the Reverse World',
        motto: 'Nothing is free. For either side, the same price.',
        desc: 'A fully neutral broker that sells to the Pantheon and Muspell at the same price. Its base is the boundary space between reality and the Reverse World, which no one can reach. Contact always comes from their side. Two things make the Oracle untouchable: its leader is overwhelmingly strong, and it is physically unreachable.',
        tags: ['Fully neutral', 'Sells the vacancy list', 'Rift forecasts', 'Unreachable']
      },
      muspel: {
        name: 'Muspell', type: 'Faction driving Ragnarök', base: 'Reverse World',
        motto: 'No one stopped it.',
        desc: 'The faction driving the extermination ritual "Ragnarök." Made up of those disillusioned with the world and victims of the Pantheon\'s experiments. They kill without hesitation, and see a vacant model as a permanent loss of defensive power — a gain.',
        tags: ['Goal: end humanity', 'Unrestricted killing', 'Many ex-test subjects', 'Reverse World base']
      }
    },

    cats: {
      '주신': { name: 'Supreme God', desc: 'The highest god of each mythology.', ex: 'Amaterasu · Odin · Zeus' },
      '신격': { name: 'Deity', desc: 'An ordinary god.', ex: 'Ares · Thor · Anubis' },
      '반신': { name: 'Demigod', desc: 'One who carries a god\'s blood.', ex: 'Heracles · Achilles' },
      '영웅': { name: 'Hero', desc: 'A human remembered in legend without divinity.', ex: 'Sun Wukong · Joan of Arc · Pandora' },
      '신기': { name: 'Divine Artifact', desc: 'A weapon or treasure of myth.', ex: 'Excalibur · Gungnir · Mjölnir' },
      '괴수': { name: 'Beast', desc: 'A monster of myth.', ex: 'Fenrir · Medusa · Sphinx' },
      '환수': { name: 'Sacred Beast', desc: 'A spirit creature with divinity.', ex: 'White Tiger · Yatagarasu · Phoenix' }
    },

    myths: {
      '일본': 'Japanese', '그리스': 'Greek', '북유럽': 'Norse', '이집트': 'Egyptian', '켈트': 'Celtic', '인도': 'Hindu',
      '중국': 'Chinese', '프랑스': 'French', '메소포타미아': 'Mesopotamian', '영국': 'English', '성유물': 'Holy relic', '유럽': 'European', '동아시아': 'East Asian'
    },

    vacant: {
      '제우스': 'Zeus', '라': 'Ra', '이자나기': 'Izanagi', '브라흐마': 'Brahma', '옥황상제': 'Jade Emperor',
      '츠쿠요미': 'Tsukuyomi', '포세이돈': 'Poseidon', '헤카테': 'Hecate', '발드르': 'Baldr', '티르': 'Tyr',
      '세트': 'Set', '이시스': 'Isis', '가네샤': 'Ganesha', '하치만': 'Hachiman', '디오니소스': 'Dionysus', '프레이': 'Freyr',
      '페르세우스': 'Perseus', '쿠 훌린': 'Cú Chulainn', '길가메시': 'Gilgamesh', '테세우스': 'Theseus', '카르나': 'Karna',
      '아서 왕': 'King Arthur', '지크프리트': 'Siegfried', '미나모토노 요시츠네': 'Minamoto no Yoshitsune', '관우': 'Guan Yu', '오디세우스': 'Odysseus', '로빈 후드': 'Robin Hood',
      '쿠사나기노츠루기': 'Kusanagi no Tsurugi', '게이 볼그': 'Gáe Bolg', '롱기누스의 창': 'Spear of Longinus', '금강저': 'Vajra', '드라우프니르': 'Draupnir',
      '히드라': 'Hydra', '케르베로스': 'Cerberus', '요르문간드': 'Jörmungandr', '미노타우로스': 'Minotaur', '키마이라': 'Chimera', '바실리스크': 'Basilisk',
      '피닉스': 'Phoenix', '청룡': 'Azure Dragon', '주작': 'Vermilion Bird', '현무': 'Black Tortoise', '기린': 'Qilin', '구미호': 'Nine-tailed Fox', '슬레이프니르': 'Sleipnir'
    },

    music: { b1: 'Rift Suppression', b2: 'Muspell Raid', b3: 'Catastrophe Declared' },

    ticker: {
      real: [
        '[OPS] District 4, one rift. Small…… no, correction. Medium. Send three.',
        '[OPS] Oh, and it\'s raining there right now. Don\'t slip, any of you.',
        '[NOTICE] Regular grading in session — mandatory for all modelers, including the unaffiliated.',
        '[SUPPRESSION] Shinjuku 3-chome rift closed. Target subdued and detained. Capture-First upheld.',
        '[ALERT] Black rift reading at Yokohama port. Disaster-class declaration under review.',
        '[PERSONNEL] Jin Kurosawa declines HQ promotion (3rd time).',
        '[INFIRMARY] Kyoya Tendo admitted. Chief medic\'s note: "Again?"',
        '[ORACLE] Rumor says the vacancy list has been updated.',
        '[TRAINING] Last one out: Hinata Shinohara. Again today.'
      ],
      reverse: [
        '[反轉] Population 0. Sky — blood red. Outside Pantheon ops room coverage.',
        '[LEDGER] Sacrifice tally in progress. Access: Miyuki Hiiragi.',
        '[TARGETS] Flagship-class holders — Excalibur · Achilles.',
        '[RAID] One, two, three…… huh, already over?',
        '[TABOO] Forced model transplant — 1 success. The rest were never recorded.',
        '[RIFTS] Coordinates of the small rifts known only to Muspell — top secret.',
        '[RAGNARÖK] 10,000 humans + 1 flagship. Irreversible once triggered.'
      ]
    },

    relations: [
      'Surveillance · pursuit',
      'Her grading officer. Keeps worrying about her',
      'The squad hit by the delayed alert. Jin never blames her — which makes it worse',
      'Mutual contempt; cooperate when needed',
      'Former mentor. The one person Tendo can\'t talk back to',
      'Most frequent infirmary visitor. The one Yukino gets serious with',
      'Former comrades. One left, one stayed. No contact since',
      'Graded his entrance exam a failure, three times',
      'Graded her "uncontrollable"',
      'Recruitment attempts. Excalibur is a sacrifice candidate — "for her protection"',
      'Recruited personally',
      'Recruited personally',
      'Recruited personally. Three years of persuading',
      'Recruited personally',
      'Director and deputy. Trust each other, clash on methods',
      'Stands beside her when the blindfold comes off. Follows her most',
      'Vanguard and rear guard. Few words, perfect timing',
      'The surgeon of the forced transplant. Kuga follows only him and calls him "Toki"',
      'The lone dissenter. He holds something that keeps her from leaving',
      'Her handler when she goes berserk. Chisa obeys, but finds her boring',
      'Flagship-class acquisition target. Officer in charge of the abduction',
      'Flagship-class acquisition target. Officer in charge of the abduction',
      'Classified as a "specimen." Exempt from Capture-First',
      'Left after the cover-up of a comrade\'s death. That comrade was one of Kurosawa\'s men',
      'No contact. Jin remembers the anniversary of that death',
      'See each other as rivals. Bando leads the record',
      'Jurisdiction friction. Tolerated because her casualty rate is low',
      'Rumored contact (unconfirmed)',
      'Subcontracts odd jobs',
      'The voices and the prophecies overlap. They have not met yet',
      'The only one who can believe her prophecies'
    ],

    chars: {
      amagi: {
        name: 'Shizuri Amagi', role: 'Director-General', model: 'Amaterasu',
        look: 'Tall, black hair in a low bun, gold sun hairpin, center part, two loose strands falling forward, golden eyes, rimless glasses, white haori with a gold sun pattern (draped over the shoulders), ivory pantsuit, a white glove on the left hand only, octagonal mirror pendant, black loafers',
        persona: ['Polite', 'Expressionless', 'Strict utilitarian', 'Shoulders responsibility alone', 'Never apologizes'],
        speech: 'Slow, formal speech; calls the listener "you there"; long pauses mid-sentence',
        quote: '……Enough. I\'ll hear it tomorrow. Numbers first. How many?',
        items: [
          { n: 'Yata no Kagami', d: 'An octagonal bronze mirror. Fires light, or reflects an opponent\'s ability back at them.' },
          { n: 'Gold-nibbed fountain pen' }, { n: 'Leather notebook filled with nothing but names' }, { n: 'Gold pocket watch' }
        ],
        release: { name: 'Opening of the Heavenly Rock Door', lines: ['……I have already seen every shadow you cast.', 'Release — “Opening of the Heavenly Rock Door.” Under this light, nothing can hide.'], desc: 'A pitch-black cave. Light pours through the gap in a stone door. Anyone touched by the light has their shadow erased: stealth, ambush, and evasion become impossible, and every action is exposed in advance.' },
        bg: 'Thirty years ago, her name was on the approval line of the experiment plan — a direct party to the cover-up. She is also the one who copies out the list of victims by hand every year. Though she could earn a higher grade, she keeps herself locked at S and refuses re-evaluation.'
      },
      kurosawa: {
        name: 'Jin Kurosawa', role: 'Field Commander', model: 'Ares',
        look: 'Tall, short black wolf cut, two bronze streaks on the right side, heavy dark circles, scar through the left eyebrow, red eyes, bronze helmet tattoo on the back of the neck, dark-red stand-collar combat uniform, bronze pauldron on the left shoulder, khaki military coat, black fingerless gloves, combat boots',
        persona: ['Blunt', 'Skips explanations', 'Never sends his people in alone', 'Neglects his own body', 'Holds no grudges'],
        speech: 'Short, curt commands; cuts sentences off; no titles, just "hey"; never says the same thing twice',
        quote: 'Hey. Don\'t step out front. ……Didn\'t hear me? Back.',
        items: [
          { n: 'Bronze Spear', d: 'Collapses into three sections. Returns when thrown.' },
          { n: 'Dented Zippo lighter' }, { n: 'Laminated card with eleven names on it' }
        ],
        bg: 'He has lost eleven subordinates in seven years and remembers the date each one died. He has turned down promotion three times — at HQ, he couldn\'t go into the field.'
      },
      shinohara: {
        name: 'Hinata Shinohara', role: 'Rookie', model: 'Thor',
        look: 'Average height, long red hair in a high ponytail (brightening to orange at the tips), side-swept bangs, sharp reddish-brown eyes (lightning-shaped flashes in the irises in combat), small scar under the left eye, black sleeveless combat top, short red cape over the shoulders, silver rune-engraved leather belt, iron gauntlets up to the elbows, black combat pants, knee guards, black combat boots',
        persona: ['Too cheerful', 'Fearless', 'Can\'t stand losing', 'Worries about others first', 'Cries alone'],
        speech: 'Fast, casual speech; lots of exclamations; gushes, then cuts herself off and shifts tone; refers to herself by name',
        quote: 'Whoa, I get to go?! ……Wait, hold on — what about you, senpai? We\'re not leaving you alone, right? Hinata\'ll take point. I\'m counting on you to cover the back.',
        items: [
          { n: 'Mjölnir', d: 'A short-handled war hammer. Always returns when thrown, and every downward strike brings lightning with it.' },
          { n: 'Megingjörð', d: 'Belt of strength. Doubles her strength while worn.' },
          { n: 'Járngreipr', d: 'Iron gauntlets.' },
          { n: 'A stack of energy bars' }
        ],
        bg: 'Highest entrance-exam score in history. Sent into a Disaster-class suppression in her first month, she brought down a large specimen on her own. Everyone calls her the next S-grade, but she doesn\'t believe it — she\'s always the last one left in the training hall.'
      },
      fujisaki: {
        name: 'Reika Fujisaki', role: 'Grading Officer', model: 'Athena',
        look: 'Average height, ash-gray high ponytail, face-framing side locks, gray sanpaku eyes, expressionless, navy double-breasted uniform (olive branch embroidered on the left shoulder), white shirt with navy ribbon tie, tight below-the-knee skirt, round medal engraved with a woman\'s face and snakes, black stockings, low-heeled pumps, a small gray owl perched on her shoulder',
        persona: ['By the book', 'Inflexible', 'Looks out for people behind the scenes', 'Can\'t lie', 'Owns her judgments'],
        speech: 'Dry, formal speech; article numbers and figures first; no emotional words; addresses people as "Mr./Ms. ○○"',
        quote: '……Measurement complete. Article 3, Clause 2: B. Any objections? If not, next.',
        items: [
          { n: 'Aegis', d: 'A medal in normal times; unfolds into a round shield. Freezes anyone who faces it head-on for a few seconds.' },
          { n: 'Short javelin' }, { n: 'Rulebook bristling with sticky notes' }, { n: 'Stopped wristwatch' }
        ],
        bg: 'Her combat power is B-grade, yet not one of her rulings has ever been overturned. Of the two watches she wears, one belonged to a rookie she once graded F — a keepsake of the dead.'
      },
      tendo: {
        name: 'Kyoya Tendo', role: 'Front-line Ace', model: 'Susanoo',
        look: 'Tall, long black hair in a low ponytail (tied carelessly with a single cord), bangs falling over the face, dark reddish-brown sanpaku eyes, eight-forked serpent-scale scar from the nape to the left collarbone, black combat jacket tied around the waist, black tank top, storm-cloud tattoo on the back, bandaged arms, red sash, zori sandals',
        persona: ['Arrogant', 'Loves a fight', 'Soft on the weak', 'Ignores discipline', 'Holds grudges forever'],
        speech: 'Rough, casual speech; starts with a scoff; calls people "you lot"; if he turns polite, he\'s angry',
        quote: 'Hah. Capture again? ……Whatever. You lot just sit back and watch. I\'ll handle it.',
        items: [
          { n: 'Totsuka no Tsurugi', d: 'A straight sword broken halfway down the blade. Can split a single cut on its target into as many as eight.' },
          { n: 'Battle-record notebook' }, { n: 'A lighter he keeps getting confiscated and stealing back' }
        ],
        release: { name: 'Eight-Forked Serpent God', lines: ['Hah. Capture, whatever — it’s a pain.', 'Release — “Eight-Forked Serpent God.” All eight ways out, sealed. Got anywhere to run?'], desc: 'A storm-lashed riverbank. The shadow of an eight-headed serpent covers the sky. All eight escape routes are sealed, and his every slash splits into eight that strike at once.' },
        bg: 'Many Catastrophe-class kills — and the most disciplinary actions in the company. Suspended several times for publicly criticizing the Capture-First Principle. He and Amagi despise each other, yet join hands when it matters.'
      },
      nikaido: {
        name: 'Aoi Nikaido', role: 'Ops Room Controller', model: 'Hermes',
        look: 'Average height, navy-tinged black bob, only the right side of the bangs reaching the jawline, sky-blue inner color, pale sky-blue eyes, dark circles, silver headset with white wing ornaments on both sides, oversized gray knit cardigan, white shirt, black slacks, ID lanyard, white sneakers with white feathers at the ankles',
        persona: ['Cynical', 'Sleep-deprived', 'Breaks tension with jokes', 'Actually worries the most', 'Fear of the field'],
        speech: 'Radio style; coordinates and figures first, feelings muttered to herself; corrects herself; tacks on an afterthought',
        quote: 'District 4, one rift. Small…… no, correction. Medium. Send three. Oh, and it\'s raining there right now. Don\'t slip, any of you.',
        items: [
          { n: 'Caduceus', d: 'A herald\'s staff wound with two snakes. Delivers words at any distance and discerns whether words are true.' },
          { n: 'Talaria', d: 'Winged sandals. Short-range teleportation.' },
          { n: 'Energy drink cans' }, { n: 'A blanket draped over her chair' }
        ],
        bg: 'With the herald\'s power, she is first to detect and relay rift readings nationwide. Ever since an alert went out a few seconds late and caused heavy losses, she has been terrified of going into the field.'
      },
      mizushima: {
        name: 'Yukino Mizushima', role: 'Chief Medic', model: 'Apollo',
        look: 'Average height, blonde low side tail (over the left shoulder), long sheer bangs, droopy eyes, golden eyes, a dried laurel wreath resting on her head, bandages wrapping the entire left arm down to the back of the hand, unbuttoned white coat, light-green scrubs, stethoscope, white Crocs',
        persona: ['Languid', 'Sharp only with patients', 'Won\'t accept refusals of treatment', 'Ignores her own wounds', 'Black humor'],
        speech: 'Drawling polite speech; half-hearted "uh-huh"s; cuts off sharply only for what matters',
        quote: 'Yes, yes~ lie down over there. Ah~ I can see bone. ……It doesn\'t hurt, you say? Then we can skip the anesthetic.',
        items: [
          { n: 'Silver Bow', d: 'Shoots light. Those it hits either heal — or rot from the inside. Medicine and plague from the same bow.' },
          { n: 'Small lyre', d: 'Plucks its strings to diagnose a person\'s aether by sound.' },
          { n: 'Coat pockets full of candy' }, { n: 'An unopened pack of cigarettes' }
        ],
        bg: 'Healing models are so rare that the entire Pantheon depends on her alone. She heals by moving others\' wounds onto her own body, and her left arm is already beyond recovery.'
      },
      orihara: {
        name: 'Kyo Orihara', role: 'Internal Affairs Inspector', model: 'Anubis',
        look: 'Tall, headless, an Anubis helm floating above rising black smoke, black three-piece suit, gold jackal-head tie pin, black shirt and black tie, black leather gloves, gold watch with an ankh motif, black briefcase, oxford shoes',
        persona: ['Courteous', 'Unreadable', 'Relentless', 'Keeps his distance', 'Works alone'],
        speech: 'Smooth, polite speech; interrogates with a smile; repeats your words back down to the syllable; says "it\'s fine," then doesn\'t let go',
        quote: 'Ah, that\'s quite all right. Take your time. ……Only — that part where you said you "don\'t know." Once more, please.',
        items: [
          { n: 'Scales of the Heart', d: 'A person\'s lies and sins pile up as real weight; past a certain point, they cannot move.' },
          { n: 'Was Scepter', d: 'Replays the last memories held by a corpse or a belonging.' },
          { n: 'Dog-eared case files' }, { n: 'Small voice recorder' }
        ],
        bg: 'On the surface, he investigates rule violations. In truth, he is digging alone into the full story of the experiments thirty years ago. The more thoroughly a death record was buried, the more clearly he sees it. The person Amagi watches most warily.'
      },

      karasuma: {
        name: 'Soji Karasuma', role: 'Director', model: 'Yatagarasu',
        look: 'Tall, medium-length black hair half-tied at the nape, long bangs covering the eyes, red eyes (slit pupils), three silver feather-shaped piercings in the left ear, black feather pattern spreading from the nape across the back, worn black shirt (sleeves rolled up), grease-stained khaki work apron, black cargo pants, boots with worn-down soles',
        persona: ['Lackadaisical', 'Good with money', 'Never abandons anyone', 'Quick to grumble', 'Makes the big calls alone'],
        speech: 'Loose polite speech; sighs first; deflects with jokes about money; drops the politeness entirely when he gets serious',
        quote: 'Haah…… If we take this, maybe this month\'s rent gets paid. Hey, you all heard that? We\'re going.',
        items: [
          { n: 'Yatagarasu', d: 'A black three-legged crow. Released, it finds paths through places no one can see.' },
          { n: 'Folding knife' }, { n: 'Ring of office keys' }, { n: 'Envelope of unpaid bills' }
        ],
        bg: 'Originally Pantheon, he was disciplined for violating Capture-First and walked out. Thanks to his path-reading power, the office\'s survival rate beats the Pantheon\'s squads. He spends half of the income on staff hazard pay, so he himself is always broke.'
      },
      bando: {
        name: 'Tsuyoshi Bando', role: 'Top Fighter', model: 'Heracles',
        look: 'Huge build, short brown crew cut, thick eyebrows, square jaw, amber eyes, bandage on the left cheekbone, lion-pelt pattern tattoos on both arms and back, sleeveless gray hoodie, tawny fur draped over the shoulders, leather wrist guards, black sweatpants, sandals on bare feet',
        persona: ['Honest to a fault', 'Simple', 'Crybaby', 'Always keeps his promises', 'Leaves all the thinking to others'],
        speech: 'Loud, casual speech; asks again when words get difficult; feelings come before words; addresses people as "Mr./Ms. ○○," carefully',
        quote: 'Uh, so, I just smash that thing, right? ……Don\'t make it complicated. I won\'t get it.',
        items: [
          { n: 'Hide of the Nemean Lion', d: 'No attack works on whatever part of him it covers.' },
          { n: 'Oak club', d: 'Too heavy to carry around; usually propped up at the office.' },
          { n: 'Protein supplements' }, { n: 'A wallet with a photo of his nephew' }
        ],
        bg: 'A-grade on raw strength alone. He turned down every Pantheon scout: "I like the people here better." He failed the Pantheon entrance exam three times, and tears up whenever it comes up.'
      },
      fushimi: {
        name: 'Akane Fushimi', role: 'Accounts & Supply', model: 'Inari',
        look: 'Short, light-blonde twin tails (red ties), thick straight bangs, round orange eyes, fox ears on both sides of her head, two tails, white shrine-maiden robe and red hakama, orange fox-patterned haori, small bell necklace, white tabi and red geta',
        persona: ['Shameless charm', 'Business-savvy', 'Lies like breathing', 'Secretly a scaredy-cat', 'Truly cares for people'],
        speech: 'Bubbly, casual speech; calls people "○○-chan"; refers to herself in the third person as "Akane"; ends with a laugh',
        quote: 'Ehehe, leave it to Akane~ ……Huh? Pay up front? Obviously up front. No tabs.',
        items: [
          { n: 'Key of Inari', d: 'Stick it into the air and turn it to open a storage space. Limited capacity.' },
          { n: 'Bag of fried tofu' }, { n: 'Office ledger' }, { n: 'Bundle of talismans' }
        ],
        bg: 'Weak in combat, but irreplaceable for supply, retrieval, and escape. The only reason the office hasn\'t gone under is, in practice, her ledger. Her ears and tails appeared after she manifested, so she always wears a hood around civilians.'
      },
      tsukioka: {
        name: 'Ran Tsukioka', role: 'Sniper', model: 'Artemis',
        look: 'Tall, silver high ponytail (down to the waist), side-swept bangs, silver-gray eyes, crescent-moon silver mark on the forehead, dark-green hooded short cape, black tight bodysuit, leather thigh holster, hunting boots laced below the knee',
        persona: ['Taciturn', 'Prefers being alone', 'Quick hands', 'Gentle only with animals', 'Even quieter around men'],
        speech: 'Short, polite speech; only the words needed; often answers with a nod; counts before she fires',
        quote: '……West. Two. Firing. Cover your ears.',
        items: [
          { n: 'Silver Bow', d: 'Draws moonlight into arrows. The darker it is, the greater the range and power — and a target once aimed at is never lost, even behind cover.' },
          { n: 'Hunting dagger' }, { n: 'Leashes for the office\'s three dogs' }
        ],
        bg: 'A night specialist called "A-grade after dark." She used to hunt alone in the mountains, unaffiliated, until Karasuma spent three years persuading her to join. Every dog at the office is one she picked up in the field.'
      },
      kuzuhara: {
        name: 'Mio Kuzuhara', role: 'Combatant', model: 'Medusa',
        look: 'Average height, long dark-green hair (the tips move faintly), three small green snakes in her hair, black cloth blindfold over the eyes, golden slit pupils beneath it, scale pattern on the neck, black turtleneck, olive military shirt (unbuttoned), black cargo pants, combat boots',
        persona: ['Timid', 'Avoids eye contact', 'Self-loathing', 'Unexpectedly sharp-tongued', 'Loyal to the end once she trusts'],
        speech: 'Barely audible polite speech; trails off; apologizes first; suddenly crisp when angry',
        quote: 'Ah, s-sorry. I…… I can\'t really see ahead. No, I can\'t take it off. I really, really can\'t.',
        items: [
          { n: 'Gorgon\'s Blindfold', d: 'Remove it and anyone who meets her eyes freezes for seconds to tens of seconds. She can\'t control it, so accidents freezing her own allies are common.' },
          { n: 'Spare blindfold' }, { n: 'White cane' }, { n: 'Snake food container' }
        ],
        bg: 'Rated "uncontrollable" in Pantheon testing, no one would take her — only the Karasu Office did. She lives blindfolded, so outside of combat she relies on her colleagues for almost everything.'
      },
      asagiri: {
        name: 'Rei Asagiri', role: 'Deputy Director (de facto)', model: 'Excalibur',
        look: 'Tall, platinum-blonde low ponytail, bangs swept back, blue eyes, slash scar at the corner of the left eye, deep navy long coat over a black turtleneck, silver epaulettes, scabbard on the left hip, black leather gloves, knee-high riding boots',
        persona: ['Upright', 'Courteous', 'Inflexible', 'Holds herself to high standards', 'Can\'t accept praise'],
        speech: 'Crisp polite speech; finishes every sentence; never makes excuses; addresses people by title; admits her own mistakes out loud',
        quote: 'That was my error in judgment. Next time I\'ll go in first. Director, please watch my back.',
        items: [
          { n: 'Excalibur', d: 'Drawn, a white light extends from the blade. It cuts what is thought uncuttable (aether barriers, the immaterial parts of Morphos). Sheathed, it is an ordinary two-handed sword.' },
          { n: 'Whetstone and maintenance kit' }, { n: 'Emergency contact card for every staff member' }
        ],
        bg: 'Rated A-grade by the Pantheon, she refused to join anyway. Excalibur is a flagship-class divine artifact and thus a candidate sacrifice for Ragnarök, so the Pantheon still hasn\'t given up on recruiting her. Her real reason for staying private, she has told no one.'
      },

      ashiya: {
        name: 'Toki Ashiya', role: 'Ringleader', age: 'Unknown (looks early 30s)', model: 'Loki',
        look: 'Tall, medium-length black hair with a red tint (tucked behind one ear), green eyes with upturned corners, an ever-present smile, stitch scars running from both corners of the lips to the jaw, black long coat over a red shirt, loose black tie, silver rings on every finger, black slacks, glossy black shoes',
        persona: ['Jovial', 'Says everything like a joke', 'Relentless while pretending not to be', 'Feels nothing', 'Doesn\'t believe his own words'],
        speech: 'Light polite speech; mocks while flattering; turns questions into jokes; smiles most at the things that matter',
        quote: 'Ahh, good question. Really, a very good question. But you see — what would you do with the answer?',
        items: [
          { n: 'Tongue of Laufey', d: 'Makes one thing he has said aloud come true. Once a day. Not even he can undo it.' },
          { n: 'The leather cord that once sewed his mouth shut' }, { n: 'Silver dagger' }
        ],
        release: { name: 'Myriad Transformations', lines: ['Ahh, now it’s finally getting fun.', 'Release — “Myriad Transformations.” Now then — which one of us is the real me?'], desc: 'A space of green emerald on every side. Light reflects off every facet, layering countless images. Within it, Ashiya can become anything he can imagine — a person, a beast, an object, even someone standing right there. Every reflection looks like him, so no one can tell which one is real.' },
        bg: 'The architect of Ragnarök. Records say he was a test subject at a Pantheon facility; he neither confirms nor denies it. The marks around his mouth came from the experiments — made "so he couldn\'t speak." He took in every member himself, and they are the only people he never lies to.'
      },
      kuga: {
        name: 'Kuga', role: 'Test Subject', age: 'Est. 25', model: 'Fenrir',
        look: 'Huge build, ash-gray long hair tangled in every direction, bangs covering half his face, golden beast eyes, pointed ear tips, mouth torn to below the ears with bared fangs, broken chain collar around the neck, bandages wrapped around his bare upper body, remnants of shackles on both wrists and ankles, torn gray pants, barefoot',
        persona: ['Barely speaks', 'Closer to a beast', 'Numb to pain', 'Obeys only Ashiya', 'Reacts to the smell of blood'],
        speech: 'Single words; never finishes a sentence; growls mixed in; no first person; calls only Ashiya "Toki"',
        quote: '……Toki. Hungry. That. Can. Eat?',
        items: [
          { n: 'His Own Body', d: 'He cannot hold belongings. His body itself is his manifestation.' },
          { n: 'Remnants of Gleipnir', d: 'A broken chain. If it comes fully undone, he goes from Catastrophe-class to Apocalypse-class.' }
        ],
        release: { name: 'Chainbreak', lines: ['……Toki. Chains. Break.', '……“Chainbreak.” Everything. Eat.'], desc: 'A wasteland where the moon has been swallowed. The domain opens with the sound of chains snapping. Everything inside is fated to be devoured: all healing, regeneration, and recovery are nullified.' },
        bg: 'The only success of a forced model transplant — the result of artificially manifesting the then-vacant Fenrir. No real name, no record of origin, no memory of life before the transplant. The Pantheon classifies him as a "specimen" and exempts him from the Capture-First Principle.'
      },
      hiiragi: {
        name: 'Miyuki Hiiragi', role: 'Officer · Soul Collection', model: 'Hel',
        look: 'Average height, two-toned hair (white on the right, black on the left) in a single braid, the right side of her face a pale beauty and the left discolored purple with livor mortis, right eye sky blue, left eye a cloudy white, off-white long dress with a black fur collar, black lace glove covering her entire left arm, barefoot',
        persona: ['Calm', 'Treats death as routine', 'No sympathy', 'Keeps her manners', 'Finds the living curious'],
        speech: 'Quiet polite speech; mentions your lifespan or condition first; no emotional swings',
        quote: 'Your left lung is nearly empty. ……Ah, you didn\'t know? Then sit. Standing makes it faster.',
        items: [
          { n: 'Gate of Niflheim', d: 'Whatever she touches is treated as "already dead" and slowly stops functioning. Not instant death — a slow halt.' },
          { n: 'Withered bouquet' }, { n: 'Black book filled with a register of the dead' }
        ],
        release: { name: 'Éljúðnir', lines: ['Your heart is beating rather fast. ……It will stop soon.', 'Release — “Éljúðnir.” Welcome, guest. To leave, you will need my permission.'], desc: 'The interior of a vast frost-covered mansion. The dead sit at a long table. Anyone who enters is registered as a "guest," and may leave only with her permission.' },
        bg: 'The tally of Ragnarök\'s ten thousand sacrifices is written in her ledger. Records list her as the only subject at a Pantheon facility to "come back after being declared dead," and the left half of her body is still as dead as it was then.'
      },
      kuroiwa: {
        name: 'Yu Kuroiwa', role: 'Officer · Infiltration / Acquisition', model: 'Hades',
        look: 'Tall, long black hair swept fully back and tied, broad forehead, deep purple eyes, heavy shadows under the eyes, black helmet-shaped headband, black velvet long coat, charcoal dress shirt, obsidian ring, black leather gloves, heeled long boots',
        persona: ['Taciturn', 'Keeps her promises', 'Suppresses her feelings', 'Doesn\'t treat subordinates as subordinates', 'Shows respect even to enemies'],
        speech: 'Low, slow polite speech; short sentences; often says "promise" and "contract"; always says your name correctly',
        quote: '……On those terms, I accept. I keep my promises. I hope you will too.',
        items: [
          { n: 'Kynee', d: 'Unfold the headband into a helmet and she vanishes. Invisible even to aether detection — not even the Pantheon ops room can track her.' },
          { n: 'Obsidian key' }, { n: 'A single pomegranate' }
        ],
        release: { name: 'Pomegranate Pact', lines: ['……Let us make a contract. You will be the one to strike first.', 'Release — “Pomegranate Pact.” Debts are always repaid.'], desc: 'Underground where no light reaches: a pale field of asphodel. Every attack or use of power inside piles up a "debt," and past a certain point you cannot leave even after the domain closes.' },
        bg: 'Officer in charge of the plan to abduct flagship-class holders. The only member of Muspell who openly opposes Ashiya\'s methods. She does not agree with exterminating humanity — yet, for some reason, she cannot leave.'
      },
      akazawa: {
        name: 'Chisa Akazawa', role: 'Raid Executor', model: 'Kali',
        look: 'Short, jet-black hair let loose (past the waist), a red third-eye mark drawn vertically on the forehead, red eyes, a habit of grinning with her tongue out, skull bead necklace, dark-red halter top (midriff bare), red cloth wrapped around the waist, layers of gold bangles on both arms, barefoot with ankle bells',
        persona: ['Always hyped', 'Impulsive', 'Loves destruction', 'Can\'t stand boredom', 'Weak to praise'],
        speech: 'Sing-song, drawn-out casual speech; counts during fights; says exactly how she feels; calls people "you"',
        quote: 'One, two, three…… huh, already over? Bo-ring~ Is there more? Seriously, that\'s it?',
        items: [
          { n: 'Six Blades', d: 'Six arms appear layered in the air, each gripping a blade. The number of simultaneous strikes rises with her excitement.' },
          { n: 'Skull bead necklace', d: 'Grows by one for every person she brings down.' },
          { n: 'Candy' }
        ],
        bg: 'Muspell\'s youngest. Most of the incidents with the greatest damage were her doing. A last-generation test subject of the Pantheon facilities, she is recorded as a case where emotion-suppression treatment failed and instead sent her impulses out of control.'
      },
      todo: {
        name: 'Nozomi Todo', role: 'Officer', model: 'Pandora',
        look: 'Average height, light flaxen wavy long hair in a loose braid, gentle face, pale green eyes, glasses, beige knit cardigan, white blouse, long flared skirt, small key necklace, low-heeled shoes, a small wooden box always held in both hands',
        persona: ['Kind', 'Apologetic', 'Takes care of others', 'Unshakable convictions', 'Never doubts her own actions'],
        speech: 'Warm polite speech; begins by worrying about you; says cruel things gently',
        quote: 'That must have hurt so much. It\'s all right now. It\'ll be over soon. Really, it will.',
        items: [
          { n: 'Pandora\'s Box', d: 'Opening it releases a calamity. Even she doesn\'t know what will come out, and a calamity once released cannot be undone. One thing still remains at the bottom.' },
          { n: 'Box key necklace' }, { n: 'Handkerchief' }
        ],
        bg: 'The only member with no connection to the Pantheon\'s experiments. A civilian, she lost her entire family to a Morphos attack and went to Muspell on her own feet. Her one reason: "No one stopped it." Her kindness is not an act — which makes her all the more dangerous.'
      },

      saruwatari: {
        name: 'Go Saruwatari', role: 'Drifter', model: 'Sun Wukong',
        look: 'Average height, short chestnut hair sticking out every which way, a round gold circlet above his head, mischievous golden eyes, fangs, a brown tail hanging down his back, yellow sleeveless Chinese shirt, red cloth over the shoulders, wrist bandages, wide black pants, black kung-fu shoes',
        persona: ['Goofy', 'Can\'t admit defeat', 'Oblivious', 'Loyal', 'Hates authority'],
        speech: 'Boastful casual speech; brags; calls people "old man / sis"; changes the subject the moment he loses; refers to himself as "yours truly"',
        quote: 'Hah! That\'s a piece of cake for yours truly. Huh? Wait a sec, isn\'t that kinda big? Was it always that big?',
        items: [
          { n: 'Ruyi Jingu Bang', d: 'Normally the size of a needle tucked behind his ear. Changes length and weight at will; its maximum length scales with his aether.' },
          { n: 'Golden Headband', d: 'The gold circlet. If he overuses aether, it tightens and forces him to stop. He can\'t remove it by will.' },
          { n: 'Peach candy' }
        ],
        bg: 'Rated A-grade in Pantheon testing, he registered but refused to join. Infamous for vanishing mid-mission or brawling with clients. The gold circlet has been on him since he awakened, and even he doesn\'t know who put it there.'
      },
      hayase: {
        name: 'Takeru Hayase', role: 'Ex-Pantheon', model: 'Achilles',
        look: 'Tall, short blonde hair swept back, sharp features, deep blue eyes, scar above the left eyebrow, a red cord wrapped around the right ankle, black combat suit reinforced with a bronze breastplate, dark red cape over the shoulders, forearm and shin guards, leather sandal-style combat shoes',
        persona: ['Proud', 'Quick to anger', 'Never looks back once he turns away', 'Strict about promises', 'Soft only on friends'],
        speech: 'Decisive casual speech; gets shorter when heated; uses full names; hates excuses with a passion',
        quote: 'Enough. I\'ll hear the explanation later. Move. I\'m going.',
        items: [
          { n: 'Spear of Peleus', d: 'A wound it makes can only be healed by the same spear.' },
          { n: 'Shield of Hephaestus' },
          { n: 'Red cord on the right ankle', d: 'Hides his one weakness. He has told no one.' }
        ],
        release: { name: 'Thrice-Round Pursuit', lines: ['I don’t need an explanation. Move.', 'Release — “Thrice-Round Pursuit.” Go on, run. I’ll catch you within three laps.'], desc: 'A battlefield ringed by enormous walls. Inside, no one can run from him — he always catches up. Nor can he be wounded at all. The right ankle alone is the exception, and inside the domain, that weakness is visible to his opponent too.' },
        bg: 'The only unaffiliated S-grade, and capable of Release. The person the Pantheon tries hardest to recruit. He was once Pantheon, but quit when the organization covered up a comrade\'s death — and still won\'t say that comrade\'s name.'
      },
      shirasaki: {
        name: 'Rin Shirasaki', role: 'Local Guardian', model: 'White Tiger',
        look: 'Tall, long white hair tied high and hanging down, white tiger ears on both sides of her head, white tail with black stripes, blue eyes, sharp fangs, white fur from the backs of her hands to her elbows, short white haori with black stripes, upper body wrapped in sarashi, white hakama, white leg wraps, barefoot',
        persona: ['Upright', 'Never avoids a fight', 'Can\'t stand lies', 'Hides her loneliness', 'Weak to children'],
        speech: 'Plain casual speech; no frills; feelings come out as actions; calls people "you"',
        quote: '……Stand back. From here on, this is my territory. Get the wounded out first.',
        items: [
          { n: 'Claws of the White Tiger', d: 'Her nails lengthen to slice through steel, and wind-cutting slashes fly out in layers.' },
          { n: 'Broken compass tablet' }, { n: 'Pouch of salt' }
        ],
        bg: 'Holder of the model of the Guardian of the West, one of the Four Symbols. She stays in one region and handles every Morphos there alone. She had jurisdiction disputes with the Pantheon, but her district\'s casualty rate is lower than the Pantheon average, so they look the other way. Of the four, she is currently the only one manifested.'
      },
      fujimiya: {
        name: 'Kaoru Fujimiya', role: 'Freelancer', model: 'Freyja',
        look: 'Tall, dark-blonde loose wavy long hair, side part, violet eyes, gold eyeliner, golden necklace, black dress with a deep open back, hawk-feather cloak over the shoulders, long black gloves, high-heeled boots',
        persona: ['Unhurried', 'Sees right through people', 'Uses seduction as a tool', 'Strict about money', 'Careless about her own affairs'],
        speech: 'Easygoing polite speech that slips into casual; calls people "darling"; answers questions with questions; laughs first',
        quote: 'Hehe…… Darling, you weren\'t hoping to hear that for free, were you? Sit. Let\'s settle the price, then talk.',
        items: [
          { n: 'Brísingamen', d: 'A golden necklace. Anyone who sees the wearer finds it hard to stay hostile. Useless against a strong will.' },
          { n: 'Hawk-feather cloak', d: 'Brief flight.' },
          { n: 'A wad of large checks' }
        ],
        bg: 'Takes only high-paying jobs. Rumor says she\'ll take work from the Pantheon, private clients — even Muspell — as long as the money is right, but it\'s never been confirmed. Known more for negotiation and brokering than combat, and suspected to be one of the Oracle\'s contacts.'
      },
      kisaragi: {
        name: 'Nene Kisaragi', role: 'Contractor', model: 'Bastet',
        look: 'Very short, black short bob with gold inner color, short bangs, black cat ears on her head, golden slit pupils, Egyptian-style black eyeliner, black tail, gold necklace, black cropped hoodie, shorts, thigh-high socks, white sneakers',
        persona: ['Selfish', 'Moody', 'Cutesy', 'Easily scared', 'Territorial'],
        speech: 'Whiny casual speech; drags out her words; clings to people calling them "Mr./Ms. ○○~"; runs the moment things turn bad; refers to herself as "Nene"',
        quote: 'Ehh~ don\'t wanna~ Nene doesn\'t do that kinda thing~ ……Huh? You\'re paying? I\'ll do it. Right now.',
        items: [
          { n: 'Claws of Bastet', d: 'Golden claws. The wounds they make never heal.' },
          { n: 'Sistrum', d: 'Shaking it makes nearby Morphos lose their sense of direction for a while.' },
          { n: 'Canned cat treats' }
        ],
        bg: 'A small-time contractor working the downtown districts. Low grade, but specialized in escape and disruption, so her survival rate is high. Stray cats keep gathering around her, which gives her hideouts away fast, so she moves often.'
      },
      seido: {
        name: 'Asuka Seido', role: 'Registered only', model: 'Joan of Arc',
        look: 'Short, black bob tucked behind the ears, short straight bangs, dark brown eyes, small silver cross necklace, white shirt and black vest, silver-white breastplate and pauldrons over them, black pleated skirt, black knee socks, black shoes tied with white ribbons',
        persona: ['Upright', 'Doesn\'t listen to others', 'Fearless', 'Neglects herself', 'Mutters alone at night'],
        speech: 'Precise polite speech; confident assertions; cites the "voices" she hears as her reason; goes quiet when contradicted',
        quote: '……This way. I\'m certain. No, I have no proof. I just — heard it.',
        items: [
          { n: 'Banner of the Maid', d: 'Where she plants it, her allies\' fear and pain are suppressed. She herself gets no benefit.' },
          { n: 'Short-hilted sword' }, { n: 'A well-worn prayer book' }
        ],
        bg: 'Ever since she awakened a year ago, she has chased rifts alone, saying she "hears voices." The Pantheon classified her as mentally unstable, registered her, and gives her no missions. And yet rifts have opened at the very spots she pointed to — eleven times so far.'
      },

      konoe: {
        name: 'Genshin Konoe', role: 'Leader', age: 'Unknown', model: 'Odin',
        look: 'Tall, short gray-white hair swept back, right eye deep blue and left eye under a black eyepatch, a neat and youthful look, a long dark coat over a modern black suit, two black ravens perched on his shoulders',
        persona: ['Detached', 'Takes no side', 'Speaks as if he knows everything', 'Cold in bargaining', 'Endlessly curious'],
        speech: 'Slow, old-fashioned formal speech',
        quote: '……Curious about the answer? Very well. But nothing is free. What will you offer, guest?',
        items: [
          { n: 'Waters of Mímir', d: 'Each sip brings one piece of information from somewhere in the world — at the cost of one memory. His left eye was a price already paid.' },
          { n: 'Gungnir', d: 'Sealed in the form of a rune staff.' },
          { n: 'Huginn and Muninn', d: 'Two ravens. They circle the world and bring back information.' }
        ],
        release: { name: 'Nine Nights on the Hanging Tree', lines: ['……The price has already been paid. A memory or so.', 'Release — “Nine Nights on the Hanging Tree.” Your next move, guest, has already been read.'], desc: 'A gray world where a giant ash tree stands. Everything inside is read by him — next move, memories, weaknesses. In exchange, each time the domain ends, he loses one of his own memories.' },
        bg: 'He dwells in the boundary space, and no one can go to him. Contact always comes from his side — the one reason the Oracle has never been breached. The Pantheon and Muspell both buy from him, and he sells to both at the same price.'
      },
      fumizuki: {
        name: 'Akira Fumizuki', role: 'Archivist', model: 'Thoth',
        look: 'Tall, black hair neatly combed back, narrow eyes, deep green eyes, a long-beaked ibis mask pushed up onto his forehead, gold-embroidered shawl over a black robe, ankh pendant, papyrus scrolls and a reed pen, black leather gloves, sandals',
        persona: ['Perfectionist', 'Obsessed with records', 'Converts emotions into numbers', 'Courteous', 'Can\'t stand errors'],
        speech: 'Precise formal speech; always attaches dates and figures; rephrases himself; corrects others\' mistakes; refers to himself as "this one"',
        quote: 'Correction. That incident was not on March 11th but March 13th, 2:40 a.m. This one\'s records contain no errors.',
        items: [
          { n: 'Book of Thoth', d: 'What he writes is fixed as fact; what he erases fades from existence. He can only record what he has seen or confirmed himself.' },
          { n: 'Reed pen' }, { n: 'Bundles of papyrus scrolls' }
        ],
        bg: 'Every transaction and every faction\'s movements are written in his books. He keeps the original records of the Pantheon\'s buried experiments and has announced he will sell them for the right price — but the price is so absurd that no one has bought them yet.'
      },
      urabe: {
        name: 'Shizuka Urabe', role: 'Prophet', model: 'Cassandra',
        look: 'Average height, long straight pale-lavender hair, center part, unfocused light-violet eyes, heavy shadows under the eyes, white cloth covering her mouth, white ancient-style draped dress, thin veil over the shoulders, red threads wound around both wrists, barefoot',
        persona: ['Resigned', 'Has given up on speaking', 'Easily frightened', 'Still worries about others', 'Cries if someone believes her'],
        speech: 'Small, halting polite speech; stops herself mid-sentence; often says "it doesn\'t matter anyway"; speaks in the future tense',
        quote: '……In three days, that place will collapse. Ah, no — never mind. It\'s fine. You won\'t believe me…… anyway.',
        items: [
          { n: 'Curse of Apollo', d: 'Her prophecies always come true, but no one who hears them can believe them. Even if they try, they can\'t.' },
          { n: 'Dozens of notebooks of written prophecies' }, { n: 'Red thread on her wrists' }
        ],
        bg: 'Her prophecies are 100% accurate. But since no one can believe them, the Oracle keeps her words only as "records," not "information." Konoe took her in for one reason: he alone can believe her. So she speaks only to him.'
      },
      misaki: {
        name: 'Nao Misaki', role: 'Gatekeeper', model: 'Sphinx',
        look: 'Tall, long black hair cut straight in Egyptian style, blunt bangs, golden eyes, black eyeliner, a pair of golden feathered wings spread behind her head, gold necklace and bracelets, deep navy draped dress, gold belt, barefoot with gold anklets',
        persona: ['Playful', 'Never answers directly', 'Tests people', 'Hates boredom', 'Generous to those who lose'],
        speech: 'Leisurely polite speech; always answers with a question; weaves in riddles; praises correct answers',
        quote: 'You need an answer? Then first, one for you. Four in the morning, two at noon, three at night. Now — what is it?',
        items: [
          { n: 'Riddle of the Sphinx', d: 'Fail to answer her question and you cannot move from the spot; answer it and she must give you one truth.' },
          { n: 'Gold hourglass' }, { n: 'Deck of riddle cards' }
        ],
        bg: 'To trade with the Oracle, you must first pass her riddle. She also sets the prices, measuring through her questions how desperate a client is. Only three senior Pantheon officials have ever passed.'
      }
    }
  }
};
