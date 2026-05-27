import React, { useState, useEffect, useMemo } from 'react';

// ============================================================
// SCHOOL DATA
// ~40 schools across tiers. Each has a pool of plausible facts.
// 3 facts drawn per appearance for replayability.
// ============================================================

const SCHOOLS = {
  // ===== IVY LEAGUE =====
  harvard: {
    name: 'Harvard',
    nickname: 'Crimson',
    location: 'Cambridge, MA',
    colors: { primary: '#A51C30', secondary: '#FFFFFF' },
    tier: 'ivy',
    facts: [
      'No athletic scholarships (Ivy League rule)',
      'Need-based aid avg: $62K/year for qualifying families',
      'Last NFL draft pick: 2021 (2 alumni currently active)',
      'Harvard Stadium capacity: 30,323 (oldest in college football)',
      'Degree consistently ranked #1-3 globally',
      'No major apparel sponsor — outfits by Nike (standard team deal)',
      '93% athlete graduation rate',
      'Strict 20-hour/week practice limit enforced',
    ],
  },
  yale: {
    name: 'Yale',
    nickname: 'Bulldogs',
    location: 'New Haven, CT',
    colors: { primary: '#0F4D92', secondary: '#FFFFFF' },
    tier: 'ivy',
    facts: [
      'No athletic scholarships offered',
      'Need-based aid covers 100% of demonstrated need',
      'Yale Bowl seats 61,446 (historic 1914 venue)',
      '1 alum currently on NFL roster',
      'Under Armour apparel contract (~$1.2M/year est.)',
      'Sterling Memorial Library access included',
      '8 Ivy League titles since 2000',
      'NESCAC-adjacent academics, varsity-level expectations',
    ],
  },
  princeton: {
    name: 'Princeton',
    nickname: 'Tigers',
    location: 'Princeton, NJ',
    colors: { primary: '#E77500', secondary: '#000000' },
    tier: 'ivy',
    facts: [
      'No athletic scholarships',
      'Need-based aid: avg $58K/year, no loans',
      'Powers Field at Princeton Stadium: 27,800 seats',
      'Nike team deal — no individual NIL infrastructure',
      'Endowment-funded facilities upgrade ($45M, 2023)',
      'Ranks #1 national university (US News, multiple years)',
      '0 first-round NFL picks in last decade',
      'Eating Club social system unique to Princeton',
    ],
  },
  dartmouth: {
    name: 'Dartmouth',
    nickname: 'Big Green',
    location: 'Hanover, NH',
    colors: { primary: '#00693E', secondary: '#FFFFFF' },
    tier: 'ivy',
    facts: [
      'No athletic scholarships (Ivy rule)',
      'Memorial Field capacity: 11,000',
      'Buddy Teevens coaching legacy — no-tackle practices',
      'Outdoor Programs Office: free skiing, hiking gear',
      'Nike apparel, modest equipment budget',
      'Winter Carnival tradition (4-day campus party)',
      '2 active NFL players (both long snappers)',
      '94% job/grad school placement within 6 months',
    ],
  },
  brown: {
    name: 'Brown',
    nickname: 'Bears',
    location: 'Providence, RI',
    colors: { primary: '#4E3629', secondary: '#FFC72C' },
    tier: 'ivy',
    facts: [
      'No athletic scholarships',
      'Open Curriculum: no required courses',
      'Brown Stadium: 20,000 capacity (built 1925)',
      'Adidas team apparel deal',
      'Federal-style brick campus, 250+ years old',
      'NFL alumni: currently 1 active player',
      'Strong consulting/finance recruiting pipeline',
      'Practice facility renovated 2022 ($18M project)',
    ],
  },
  columbia: {
    name: 'Columbia',
    nickname: 'Lions',
    location: 'New York, NY',
    colors: { primary: '#9BCBEB', secondary: '#FFFFFF' },
    tier: 'ivy',
    facts: [
      'No athletic scholarships',
      'Robert K. Kraft Field at Lawrence A. Wien Stadium',
      'NYC campus access — Manhattan internships standard',
      'Nike team deal',
      'Stadium 60-min subway ride from main campus',
      'Football historical record: notoriously below .500',
      'Need-based aid: $0 family contribution under $66K income',
      'Last bowl game: never (FCS, no bowl eligibility)',
    ],
  },
  cornell: {
    name: 'Cornell',
    nickname: 'Big Red',
    location: 'Ithaca, NY',
    colors: { primary: '#B31B1B', secondary: '#FFFFFF' },
    tier: 'ivy',
    facts: [
      'No athletic scholarships',
      'Schoellkopf Field: 21,500 capacity',
      'Engineering & hotel school pipelines',
      'Gorges and waterfalls on campus',
      'Adidas apparel partnership',
      'Brutal winters — avg 67 inches snow/year',
      '11 active NFL alumni (most in Ivy League)',
      'Cornell-NYC Tech campus access for internships',
    ],
  },
  upenn: {
    name: 'Penn',
    nickname: 'Quakers',
    location: 'Philadelphia, PA',
    colors: { primary: '#011F5B', secondary: '#990000' },
    tier: 'ivy',
    facts: [
      'No athletic scholarships',
      'Franklin Field: oldest D-I stadium still in use (1895)',
      'Wharton Business School access for athletes',
      'Nike team apparel',
      'Penn Relays hosted annually since 1895',
      '3 active NFL alumni',
      'Urban Philly campus, walkable to Center City',
      'Avg starting salary for athletes post-grad: $86K',
    ],
  },

  // ===== SEC POWERS =====
  alabama: {
    name: 'Alabama',
    nickname: 'Crimson Tide',
    location: 'Tuscaloosa, AL',
    colors: { primary: '#9E1B32', secondary: '#FFFFFF' },
    tier: 'sec',
    facts: [
      'Full scholarship + cost of attendance stipend (~$5K/yr)',
      'Bryant-Denny Stadium: 100,077 capacity',
      '18 first-round NFL picks since 2020',
      'Nike apparel deal ($3.8M/year)',
      'NIL collective: avg $200K+/year for starters',
      'Mal Moore Athletic Facility: $40M, 200K sq ft',
      'Athletic department revenue: $214M (2024)',
      '6 national championships under prior coaching staff',
    ],
  },
  georgia: {
    name: 'Georgia',
    nickname: 'Bulldogs',
    location: 'Athens, GA',
    colors: { primary: '#BA0C2F', secondary: '#000000' },
    tier: 'sec',
    facts: [
      'Full scholarship + $5,980 cost-of-attendance stipend',
      'Sanford Stadium: 92,746 seats',
      '15 NFL Draft picks in last 2 years',
      'Nike Jordan Brand exclusive school (one of 8)',
      'NIL collective Classic City avg deal: $180K',
      'Indoor practice facility: $30.2M, opened 2017',
      'Athletic dept revenue: $203M (2024)',
      'Avg degree completion: 78% for football players',
    ],
  },
  lsu: {
    name: 'LSU',
    nickname: 'Tigers',
    location: 'Baton Rouge, LA',
    colors: { primary: '#461D7C', secondary: '#FDD023' },
    tier: 'sec',
    facts: [
      'Full athletic scholarship',
      'Tiger Stadium ("Death Valley"): 102,321',
      'Nike apparel ($4.4M/year deal)',
      'NIL collective Bayou Traditions: $250K+ for stars',
      '12 first-round picks since 2020',
      'Live tiger mascot tradition (now retired)',
      'Humidity: avg 76% — adjustment period required',
      'Athletic department revenue: $199M',
    ],
  },
  florida: {
    name: 'Florida',
    nickname: 'Gators',
    location: 'Gainesville, FL',
    colors: { primary: '#0021A5', secondary: '#FA4616' },
    tier: 'sec',
    facts: [
      'Full scholarship + stipend',
      'Ben Hill Griffin Stadium ("The Swamp"): 88,548',
      'Jordan Brand school (Nike subsidiary)',
      'NIL collective Gator Collective: $190K avg',
      'No state income tax for NIL earnings',
      'Heavener Football Complex: $85M, opened 2022',
      'Original Gatorade school — sports drink royalty',
      '10 NFL Draft picks last 2 cycles',
    ],
  },
  tennessee: {
    name: 'Tennessee',
    nickname: 'Volunteers',
    location: 'Knoxville, TN',
    colors: { primary: '#FF8200', secondary: '#FFFFFF' },
    tier: 'sec',
    facts: [
      'Full scholarship + $5,400 stipend',
      'Neyland Stadium: 101,915 (largest in SEC)',
      'Nike deal ($5.1M/year, 2024 extension)',
      'NIL Spyre Sports collective: avg $220K starters',
      'No state income tax in Tennessee',
      'Vol Walk tradition: 200K+ fans on gamedays',
      '8 NFL Draft picks in last 2 years',
      'Anderson Training Center: $340M complex',
    ],
  },
  texasam: {
    name: 'Texas A&M',
    nickname: 'Aggies',
    location: 'College Station, TX',
    colors: { primary: '#500000', secondary: '#FFFFFF' },
    tier: 'sec',
    facts: [
      'Full scholarship + stipend',
      'Kyle Field: 102,733 capacity (12th Man tradition)',
      'Adidas apparel deal ($3.0M/year)',
      'NIL 12th Man+ Fund: $280K avg for top recruits',
      'No state income tax in Texas',
      'Athletic dept budget: $279M (highest in college)',
      'Bright Football Complex: $35M facility',
      '6 NFL Draft picks last 2 cycles',
    ],
  },
  auburn: {
    name: 'Auburn',
    nickname: 'Tigers',
    location: 'Auburn, AL',
    colors: { primary: '#0C2340', secondary: '#E87722' },
    tier: 'sec',
    facts: [
      'Full athletic scholarship',
      'Jordan-Hare Stadium: 88,043',
      'Under Armour apparel deal ($78M over 9 years)',
      'NIL On To Victory collective: $170K avg',
      'Toomer\'s Corner toilet paper tradition',
      'Athletic dept revenue: $172M',
      '7 NFL Draft picks last 2 cycles',
      'Woltosz Football Performance Center: $95M (2023)',
    ],
  },

  // ===== BIG TEN POWERS =====
  ohiostate: {
    name: 'Ohio State',
    nickname: 'Buckeyes',
    location: 'Columbus, OH',
    colors: { primary: '#BB0000', secondary: '#666666' },
    tier: 'b1g',
    facts: [
      'Full scholarship + $6,038 cost-of-attendance stipend',
      'Ohio Stadium ("The Horseshoe"): 102,780',
      'Nike Jordan Brand exclusive school',
      'NIL collective THE Foundation: $300K+ avg starters',
      '20 NFL Draft picks since 2020 (most in country)',
      'Woody Hayes Athletic Center: $42M facility',
      'Athletic dept revenue: $251M (2024)',
      'TBDBITL marching band — 192 members on field',
    ],
  },
  michigan: {
    name: 'Michigan',
    nickname: 'Wolverines',
    location: 'Ann Arbor, MI',
    colors: { primary: '#00274C', secondary: '#FFCB05' },
    tier: 'b1g',
    facts: [
      'Full scholarship + $4,800 stipend',
      'Michigan Stadium ("The Big House"): 107,601',
      'Jordan Brand school (Nike subsidiary)',
      'NIL Champions Circle: $220K avg',
      '12 NFL Draft picks last 2 cycles',
      'Schembechler Hall: $54M football facility',
      'Ross School of Business access',
      'Athletic dept revenue: $239M',
    ],
  },
  pennstate: {
    name: 'Penn State',
    nickname: 'Nittany Lions',
    location: 'University Park, PA',
    colors: { primary: '#041E42', secondary: '#FFFFFF' },
    tier: 'b1g',
    facts: [
      'Full athletic scholarship + stipend',
      'Beaver Stadium: 106,572 capacity',
      'Nike apparel deal ($3.5M/year)',
      'NIL Happy Valley United: $200K avg',
      'White Out games: nationally televised event',
      '9 NFL Draft picks last 2 cycles',
      'Lasch Football Building: $36M facility',
      'Smeal College of Business pipeline',
    ],
  },
  oregon: {
    name: 'Oregon',
    nickname: 'Ducks',
    location: 'Eugene, OR',
    colors: { primary: '#154733', secondary: '#FEE123' },
    tier: 'b1g',
    facts: [
      'Full scholarship + stipend',
      'Autzen Stadium: 54,000 (loudest in college football)',
      'Nike co-founder Phil Knight\'s personal alma mater',
      'Unlimited uniform combinations (literally)',
      'NIL Division Street collective: $250K avg',
      'Hatfield-Dowlin Complex: $138M football facility',
      'Marcus Mariota Sports Performance Center',
      '7 NFL Draft picks last 2 cycles',
    ],
  },
  usc: {
    name: 'USC',
    nickname: 'Trojans',
    location: 'Los Angeles, CA',
    colors: { primary: '#990000', secondary: '#FFC72C' },
    tier: 'b1g',
    facts: [
      'Full athletic scholarship',
      'LA Memorial Coliseum: 77,500',
      'Nike apparel + LA market NIL access',
      'NIL collective House of Victory: $300K+ avg',
      'Hollywood/entertainment internship pipeline',
      '8 NFL Draft picks last 2 cycles',
      'McKay Center: $70M football operations facility',
      'CA state tax rate: 9.3% — applies to NIL',
    ],
  },

  // ===== ACADEMIC ELITE NON-IVY =====
  stanford: {
    name: 'Stanford',
    nickname: 'Cardinal',
    location: 'Stanford, CA',
    colors: { primary: '#8C1515', secondary: '#FFFFFF' },
    tier: 'elite',
    facts: [
      'Full athletic scholarship offered (unlike Ivies)',
      'Stanford Stadium: 50,000 capacity',
      'Nike apparel deal ($8.2M/year)',
      'Silicon Valley internship pipeline',
      'NIL Lifetime Cardinal collective: $180K avg',
      '15+ NFL Draft picks in last 5 years',
      'Arrillaga Family Sports Center: $40M',
      '99% athlete graduation rate',
    ],
  },
  duke: {
    name: 'Duke',
    nickname: 'Blue Devils',
    location: 'Durham, NC',
    colors: { primary: '#00539B', secondary: '#FFFFFF' },
    tier: 'elite',
    facts: [
      'Full athletic scholarship',
      'Wallace Wade Stadium: 40,004',
      'Nike apparel partnership',
      'Fuqua School of Business access',
      'NIL Blue Devil Club: $140K avg',
      '3 NFL Draft picks last 2 cycles',
      'Brooks Field renovated 2024',
      '95% athlete graduation rate',
    ],
  },
  northwestern: {
    name: 'Northwestern',
    nickname: 'Wildcats',
    location: 'Evanston, IL',
    colors: { primary: '#4E2A84', secondary: '#FFFFFF' },
    tier: 'elite',
    facts: [
      'Full athletic scholarship',
      'Ryan Field: under reconstruction (47K → 35K)',
      'Under Armour apparel deal',
      'Kellogg School of Management pipeline',
      'Lakefront campus on Lake Michigan',
      'NIL Trail to Victory collective: $130K avg',
      '4 NFL Draft picks last 2 cycles',
      'Chicago internship corridor access',
    ],
  },
  vanderbilt: {
    name: 'Vanderbilt',
    nickname: 'Commodores',
    location: 'Nashville, TN',
    colors: { primary: '#000000', secondary: '#866D4B' },
    tier: 'elite',
    facts: [
      'Full athletic scholarship',
      'FirstBank Stadium: 33,663 (smallest in SEC)',
      'Nike apparel deal',
      'No state income tax in Tennessee',
      'NIL Anchor Impact collective: $110K avg',
      '2 NFL Draft picks last 2 cycles',
      'Nashville live-music scene at doorstep',
      'Owen Graduate School of Management',
    ],
  },
  notredame: {
    name: 'Notre Dame',
    nickname: 'Fighting Irish',
    location: 'South Bend, IN',
    colors: { primary: '#0C2340', secondary: '#C99700' },
    tier: 'elite',
    facts: [
      'Full athletic scholarship',
      'Notre Dame Stadium: 77,622',
      'Under Armour exclusive partnership ($90M deal)',
      'Independent — own NBC TV deal',
      'NIL Friends of the University: $170K avg',
      '7 NFL Draft picks last 2 cycles',
      'Touchdown Jesus mural — campus landmark',
      'Mendoza College of Business top-10 ranked',
    ],
  },

  // ===== MID-MAJORS / FCS / OUTSIDERS =====
  tufts: {
    name: 'Tufts',
    nickname: 'Jumbos',
    location: 'Medford, MA',
    colors: { primary: '#3E8EDE', secondary: '#52307C' },
    tier: 'd3',
    facts: [
      'No athletic scholarships (Division III)',
      'Need-based merit aid avg: $42K/year',
      'Ellis Oval capacity: 3,500',
      'NESCAC conference (academic-first)',
      'Adidas apparel — no exclusive deal',
      '0 active NFL alumni',
      'Boston/Cambridge internship access',
      '96% job placement within 6 months',
    ],
  },
  williams: {
    name: 'Williams',
    nickname: 'Ephs',
    location: 'Williamstown, MA',
    colors: { primary: '#500082', secondary: '#FFD700' },
    tier: 'd3',
    facts: [
      'No athletic scholarships (D-III)',
      'Need-blind admission, generous merit aid',
      'Weston Field capacity: 5,000',
      'Tutorial system: 2-student courses',
      'Berkshires location — rural, scenic',
      'Generic team apparel (no major sponsor)',
      '#1 liberal arts college (US News)',
      'Avg post-grad salary 10 years out: $103K',
    ],
  },
  amherst: {
    name: 'Amherst',
    nickname: 'Mammoths',
    location: 'Amherst, MA',
    colors: { primary: '#3F1F69', secondary: '#FFFFFF' },
    tier: 'd3',
    facts: [
      'No athletic scholarships (D-III)',
      'Pratt Field capacity: 3,500',
      'Open Curriculum: no requirements',
      'Five College Consortium access (Smith, Mt Holyoke, etc.)',
      'Nike team purchase — no sponsorship deal',
      '0 active NFL alumni',
      'Need-blind admissions, avg aid $63K',
      'NESCAC conference',
    ],
  },
  smu: {
    name: 'SMU',
    nickname: 'Mustangs',
    location: 'Dallas, TX',
    colors: { primary: '#0033A0', secondary: '#C8102E' },
    tier: 'g5',
    facts: [
      'Full athletic scholarship',
      'Gerald J. Ford Stadium: 32,000',
      'Nike apparel deal',
      'Dallas/Highland Park wealth — NIL collective $230K+',
      'No state income tax in Texas',
      'ACC move (2024): new conference access',
      '4 NFL Draft picks last 2 cycles',
      'Cox School of Business pipeline',
    ],
  },
  boisestate: {
    name: 'Boise State',
    nickname: 'Broncos',
    location: 'Boise, ID',
    colors: { primary: '#0033A0', secondary: '#D64309' },
    tier: 'g5',
    facts: [
      'Full athletic scholarship',
      'Albertsons Stadium: 36,387 (the famous blue turf)',
      'Nike apparel deal',
      'NIL Bronco NIL Collective: $90K avg',
      'Mountain West Conference',
      '3 NFL Draft picks last 2 cycles',
      'Bleymaier Football Complex: $22M facility',
      'Outdoor recreation: skiing, rafting 30min away',
    ],
  },
  appstate: {
    name: 'Appalachian State',
    nickname: 'Mountaineers',
    location: 'Boone, NC',
    colors: { primary: '#000000', secondary: '#FFCC00' },
    tier: 'g5',
    facts: [
      'Full athletic scholarship',
      'Kidd Brewer Stadium: 30,000 (mountain views)',
      'Sun Belt Conference',
      'Adidas apparel partnership',
      'NIL collective Yosef Club: $60K avg',
      'Blue Ridge Mountains campus setting',
      '2 NFL Draft picks last 2 cycles',
      'Elevation: 3,333 feet (training advantage)',
    ],
  },
  jacksonstate: {
    name: 'Jackson State',
    nickname: 'Tigers',
    location: 'Jackson, MS',
    colors: { primary: '#003DA5', secondary: '#FFFFFF' },
    tier: 'hbcu',
    facts: [
      'Full athletic scholarship (FCS level)',
      'Mississippi Memorial Stadium: 60,492',
      'SWAC Conference — HBCU football',
      'Nike apparel deal',
      'Sonic Boom of the South marching band',
      'NIL emerging: $40K avg for stars',
      '2 active NFL alumni',
      'Cultural significance — HBCU pipeline growing',
    ],
  },
  hampton: {
    name: 'Hampton',
    nickname: 'Pirates',
    location: 'Hampton, VA',
    colors: { primary: '#0033A0', secondary: '#FFFFFF' },
    tier: 'hbcu',
    facts: [
      'Full athletic scholarship (FCS)',
      'Armstrong Stadium: 11,000',
      'CAA Conference',
      'HBCU institution founded 1868',
      'Adidas team apparel',
      'NIL deals emerging: $30K avg',
      'Waterfront campus on Hampton River',
      '1 active NFL alum',
    ],
  },
  army: {
    name: 'Army',
    nickname: 'Black Knights',
    location: 'West Point, NY',
    colors: { primary: '#000000', secondary: '#D4BF91', tertiary: '#54585A' },
    tier: 'service',
    facts: [
      'Full tuition + stipend + military commission',
      'Michie Stadium: 38,000 (overlooks Hudson River)',
      'Nike apparel deal',
      '5-year active duty service requirement post-grad',
      'No NIL (federal employees during service)',
      '$1,278/month cadet pay',
      '2 NFL alumni currently (rare due to service)',
      'Triple option offense — unique playstyle',
    ],
  },
  navy: {
    name: 'Navy',
    nickname: 'Midshipmen',
    location: 'Annapolis, MD',
    colors: { primary: '#1F2F54', secondary: '#C5A02C' },
    tier: 'service',
    facts: [
      'Full tuition + stipend + officer commission',
      'Navy-Marine Corps Memorial Stadium: 34,000',
      'Under Armour apparel partnership',
      '5-year active duty commitment post-grad',
      'No NIL allowed during service',
      'Engineering majors required for most',
      'Annual Army-Navy Game (national TV)',
      '$1,278/month midshipman pay',
    ],
  },
  airforce: {
    name: 'Air Force',
    nickname: 'Falcons',
    location: 'Colorado Springs, CO',
    colors: { primary: '#003594', secondary: '#8A8B8C' },
    tier: 'service',
    facts: [
      'Full tuition + stipend + officer commission',
      'Falcon Stadium: 46,692 (elevation 6,621 ft)',
      'Nike apparel deal',
      '5-year active duty commitment post-grad',
      'No NIL during service',
      'Living mascot: actual falcons (3 of them)',
      'Engineering-heavy curriculum',
      'STEM degree mandatory for most',
    ],
  },
};

// ============================================================
// MATCHUP PAIRING RULES
// Generate interesting trade-off pairings
// ============================================================

const TIER_PAIRINGS = [
  ['ivy', 'sec'],
  ['ivy', 'b1g'],
  ['ivy', 'g5'],
  ['ivy', 'hbcu'],
  ['ivy', 'service'],
  ['ivy', 'd3'],
  ['elite', 'sec'],
  ['elite', 'b1g'],
  ['elite', 'd3'],
  ['elite', 'ivy'],
  ['sec', 'd3'],
  ['sec', 'service'],
  ['sec', 'hbcu'],
  ['b1g', 'd3'],
  ['b1g', 'service'],
  ['b1g', 'hbcu'],
  ['g5', 'd3'],
  ['service', 'sec'],
  ['service', 'b1g'],
  ['hbcu', 'b1g'],
];

const ALL_SCHOOLS = Object.keys(SCHOOLS);
const SCHOOLS_BY_TIER = ALL_SCHOOLS.reduce((acc, id) => {
  const tier = SCHOOLS[id].tier;
  (acc[tier] = acc[tier] || []).push(id);
  return acc;
}, {});

function generateMatchup(seenPairs) {
  let attempts = 0;
  while (attempts < 50) {
    const [tierA, tierB] = TIER_PAIRINGS[Math.floor(Math.random() * TIER_PAIRINGS.length)];
    const poolA = SCHOOLS_BY_TIER[tierA] || [];
    const poolB = SCHOOLS_BY_TIER[tierB] || [];
    if (!poolA.length || !poolB.length) { attempts++; continue; }
    const a = poolA[Math.floor(Math.random() * poolA.length)];
    const b = poolB[Math.floor(Math.random() * poolB.length)];
    if (a === b) { attempts++; continue; }
    const key = [a, b].sort().join('-vs-');
    if (seenPairs.has(key)) { attempts++; continue; }
    return { a, b, key };
  }
  // Fallback if we hit attempt limit
  const a = ALL_SCHOOLS[Math.floor(Math.random() * ALL_SCHOOLS.length)];
  let b = ALL_SCHOOLS[Math.floor(Math.random() * ALL_SCHOOLS.length)];
  while (b === a) b = ALL_SCHOOLS[Math.floor(Math.random() * ALL_SCHOOLS.length)];
  return { a, b, key: [a, b].sort().join('-vs-') };
}

function pickFacts(schoolId) {
  const facts = [...SCHOOLS[schoolId].facts];
  const picked = [];
  for (let i = 0; i < 3 && facts.length; i++) {
    const idx = Math.floor(Math.random() * facts.length);
    picked.push(facts.splice(idx, 1)[0]);
  }
  return picked;
}

// ============================================================
// COMPONENT
// ============================================================

export default function IvyOrOut() {
  const [matchup, setMatchup] = useState(null);
  const [factsA, setFactsA] = useState([]);
  const [factsB, setFactsB] = useState([]);
  const [votes, setVotes] = useState(null); // { a: n, b: n }
  const [revealed, setRevealed] = useState(false);
  const [userChoice, setUserChoice] = useState(null); // 'a' | 'b'
  const [seenPairs, setSeenPairs] = useState(() => new Set());
  const [loading, setLoading] = useState(true);

  // Load a fresh matchup + its vote counts from shared storage
  async function loadMatchup() {
    setLoading(true);
    setRevealed(false);
    setUserChoice(null);

    const m = generateMatchup(seenPairs);
    setSeenPairs(prev => new Set(prev).add(m.key));
    setMatchup(m);
    setFactsA(pickFacts(m.a));
    setFactsB(pickFacts(m.b));

    // Fetch existing vote counts
    try {
      const result = await window.storage.get(`votes:${m.key}`, true);
      if (result && result.value) {
        const parsed = JSON.parse(result.value);
        setVotes(parsed);
      } else {
        setVotes({ [m.a]: 0, [m.b]: 0 });
      }
    } catch (e) {
      setVotes({ [m.a]: 0, [m.b]: 0 });
    }
    setLoading(false);
  }

  useEffect(() => {
    loadMatchup();
    // eslint-disable-next-line
  }, []);

  async function vote(side) {
    if (revealed || !matchup) return;
    const choiceId = side === 'a' ? matchup.a : matchup.b;
    setUserChoice(side);

    // Optimistically update + write to shared storage
    const newVotes = { ...(votes || {}) };
    newVotes[matchup.a] = newVotes[matchup.a] || 0;
    newVotes[matchup.b] = newVotes[matchup.b] || 0;
    newVotes[choiceId] += 1;
    setVotes(newVotes);
    setRevealed(true);

    try {
      // Re-read latest to minimize race loss, then write
      const latest = await window.storage.get(`votes:${matchup.key}`, true);
      let merged = latest && latest.value ? JSON.parse(latest.value) : { [matchup.a]: 0, [matchup.b]: 0 };
      merged[matchup.a] = merged[matchup.a] || 0;
      merged[matchup.b] = merged[matchup.b] || 0;
      merged[choiceId] += 1;
      await window.storage.set(`votes:${matchup.key}`, JSON.stringify(merged), true);
      setVotes(merged);
    } catch (e) {
      // Optimistic value remains
    }
  }

  const schoolA = matchup ? SCHOOLS[matchup.a] : null;
  const schoolB = matchup ? SCHOOLS[matchup.b] : null;
  const totalVotes = votes ? (votes[matchup?.a] || 0) + (votes[matchup?.b] || 0) : 0;
  const pctA = totalVotes ? Math.round(((votes[matchup.a] || 0) / totalVotes) * 100) : 50;
  const pctB = 100 - pctA;

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Inline&family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&family=Special+Elite&display=swap');

        body { margin: 0; }

        .grain {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.06;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .stamp {
          font-family: 'Special Elite', monospace;
          letter-spacing: 0.08em;
        }

        .card {
          transition: transform 0.25s cubic-bezier(.2,.9,.3,1.2), box-shadow 0.25s ease;
        }
        .card.interactive:hover {
          transform: translateY(-6px) rotate(var(--tilt));
          box-shadow: 0 28px 50px rgba(0,0,0,0.35), 0 0 0 3px rgba(255,255,255,0.04);
          cursor: pointer;
        }
        .card.dimmed { opacity: 0.55; }
        .card.winner { transform: scale(1.02) rotate(var(--tilt)); }

        .bar-fill {
          height: 100%;
          transition: width 1s cubic-bezier(.2,.9,.3,1.1);
        }

        .fact-line {
          opacity: 0;
          animation: rise 0.5s forwards;
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pulse-dot {
          animation: pulse 1.4s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }

        .nextbtn {
          transition: transform 0.15s ease, background 0.2s ease;
        }
        .nextbtn:hover { transform: translateY(-2px); background: #F5E9D2; }
        .nextbtn:active { transform: translateY(0); }

        @media (max-width: 760px) {
          .matchup-row { flex-direction: column !important; }
          .vs-divider { transform: rotate(90deg); margin: 8px 0 !important; }
          .card-wrap { width: 100% !important; max-width: 100% !important; }
        }
      `}</style>

      <div className="grain"></div>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <span className="stamp" style={styles.estLabel}>EST. 2026</span>
          <h1 style={styles.title}>
            <span style={styles.titleIvy}>IVY</span>
            <span style={styles.titleOr}>or</span>
            <span style={styles.titleOut}>OUT</span>
          </h1>
          <span className="stamp" style={styles.estLabel}>VOL. I</span>
        </div>
        <div style={styles.headerRule}></div>
      </header>

      {/* MAIN */}
      <main style={styles.main}>
        {loading || !schoolA || !schoolB ? (
          <div style={styles.loadingBox}>
            <span className="pulse-dot stamp" style={{ fontSize: '14px', color: '#F5E9D2' }}>
              ◆ SHUFFLING THE DEPTH CHART ◆
            </span>
          </div>
        ) : (
          <>
            <div className="matchup-row" style={styles.matchupRow}>
              {/* CARD A */}
              <SchoolCard
                school={schoolA}
                facts={factsA}
                pct={pctA}
                votes={votes?.[matchup.a] || 0}
                revealed={revealed}
                isWinner={userChoice === 'a'}
                isLoser={revealed && userChoice !== 'a'}
                onClick={() => vote('a')}
                tilt="-1.2deg"
              />

              <div className="vs-divider" style={styles.vs}>
                <span style={styles.vsCircle}>VS</span>
              </div>

              {/* CARD B */}
              <SchoolCard
                school={schoolB}
                facts={factsB}
                pct={pctB}
                votes={votes?.[matchup.b] || 0}
                revealed={revealed}
                isWinner={userChoice === 'b'}
                isLoser={revealed && userChoice !== 'b'}
                onClick={() => vote('b')}
                tilt="1.2deg"
              />
            </div>

            {/* CTA / RESULTS BAR */}
            <div style={styles.ctaWrap}>
              {!revealed ? (
                <p className="stamp" style={styles.tapPrompt}>
                  ▸ TAP A CARD TO COMMIT &nbsp; ◂
                </p>
              ) : (
                <>
                  <p className="stamp" style={styles.resultMeta}>
                    {totalVotes.toLocaleString()} {totalVotes === 1 ? 'VOTE' : 'VOTES'} CAST ON THIS MATCHUP
                  </p>
                  <button className="nextbtn" style={styles.nextBtn} onClick={loadMatchup}>
                    NEXT MATCHUP →
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <span className="stamp" style={styles.footerText}>
          ◇ ANONYMOUS · SHARED TALLY · NO LOGIN ◇
        </span>
      </footer>
    </div>
  );
}

// ============================================================
// CARD SUB-COMPONENT
// ============================================================

function SchoolCard({ school, facts, pct, votes, revealed, isWinner, isLoser, onClick, tilt }) {
  return (
    <div
      className={`card-wrap card ${!revealed ? 'interactive' : ''} ${isLoser ? 'dimmed' : ''} ${isWinner ? 'winner' : ''}`}
      style={{
        ...styles.cardWrap,
        '--tilt': tilt,
        background: school.colors.primary,
        color: getContrastText(school.colors.primary),
        outline: isWinner ? `4px solid #F5E9D2` : 'none',
      }}
      onClick={!revealed ? onClick : undefined}
    >
      {/* Card top stripe */}
      <div style={{ ...styles.cardStripe, background: school.colors.secondary }}></div>

      <div style={styles.cardInner}>
        <div style={styles.cardHeader}>
          <span className="stamp" style={{ ...styles.cardLocation, color: school.colors.secondary }}>
            {school.location.toUpperCase()}
          </span>
        </div>

        <h2 style={styles.schoolName}>{school.name}</h2>
        <p style={{ ...styles.nickname, color: school.colors.secondary }}>
          THE {school.nickname.toUpperCase()}
        </p>

        <div style={styles.divider}></div>

        <ul style={styles.factList}>
          {facts.map((f, i) => (
            <li
              key={i}
              className="fact-line"
              style={{ ...styles.factItem, animationDelay: `${i * 0.08}s` }}
            >
              <span style={{ ...styles.factBullet, color: school.colors.secondary }}>●</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* Reveal: percentage display */}
        {revealed && (
          <div style={styles.resultBlock}>
            <div style={styles.pctRow}>
              <span className="stamp" style={styles.pctLabel}>SELECTED BY</span>
              <span style={styles.pctValue}>{pct}%</span>
            </div>
            <div style={styles.barTrack}>
              <div
                className="bar-fill"
                style={{
                  width: `${pct}%`,
                  background: school.colors.secondary,
                }}
              ></div>
            </div>
            <span className="stamp" style={styles.voteCount}>
              {votes.toLocaleString()} {votes === 1 ? 'vote' : 'votes'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// HELPERS + STYLES
// ============================================================

function getContrastText(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155 ? '#1a1a1a' : '#F5E9D2';
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0E1A2B',
    backgroundImage: `
      radial-gradient(ellipse at top, rgba(245, 233, 210, 0.04) 0%, transparent 50%),
      repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(245, 233, 210, 0.015) 35px, rgba(245, 233, 210, 0.015) 36px)
    `,
    fontFamily: "'Inter', sans-serif",
    color: '#F5E9D2',
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: '40px',
  },
  header: {
    padding: '28px 24px 8px',
    position: 'relative',
    zIndex: 2,
  },
  headerInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
    flexWrap: 'wrap',
  },
  estLabel: {
    fontSize: '11px',
    color: '#F5E9D2',
    opacity: 0.55,
    letterSpacing: '0.2em',
  },
  title: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(48px, 9vw, 96px)',
    lineHeight: '0.95',
    margin: 0,
    display: 'flex',
    alignItems: 'baseline',
    gap: '18px',
    fontWeight: 400,
  },
  titleIvy: {
    color: '#F5E9D2',
    letterSpacing: '-0.02em',
  },
  titleOr: {
    fontFamily: "'DM Serif Display', serif",
    fontStyle: 'italic',
    fontSize: '0.55em',
    color: '#C9A961',
    opacity: 0.9,
    transform: 'translateY(-4px)',
  },
  titleOut: {
    color: '#C9A961',
    letterSpacing: '-0.02em',
    fontStyle: 'italic',
  },
  headerRule: {
    height: '2px',
    background: 'linear-gradient(to right, transparent, rgba(245, 233, 210, 0.4) 20%, rgba(245, 233, 210, 0.4) 80%, transparent)',
    margin: '20px auto 0',
    maxWidth: '900px',
  },
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '20px 24px 40px',
    position: 'relative',
    zIndex: 2,
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
  },
  matchupRow: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '20px',
    margin: '20px 0 40px',
  },
  cardWrap: {
    flex: 1,
    minWidth: 0,
    borderRadius: '6px',
    boxShadow: '0 18px 36px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)',
    overflow: 'hidden',
    position: 'relative',
    maxWidth: '480px',
  },
  cardStripe: {
    height: '10px',
    width: '100%',
  },
  cardInner: {
    padding: '24px 26px 26px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '380px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
  },
  cardLocation: {
    fontSize: '11px',
    letterSpacing: '0.18em',
    opacity: 0.9,
  },
  schoolName: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(36px, 5vw, 54px)',
    margin: '0 0 4px',
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '-0.01em',
  },
  nickname: {
    fontFamily: "'Bungee Inline', cursive",
    fontSize: '13px',
    margin: '0 0 18px',
    letterSpacing: '0.1em',
    opacity: 0.92,
  },
  divider: {
    height: '1px',
    background: 'currentColor',
    opacity: 0.25,
    margin: '4px 0 18px',
  },
  factList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
  },
  factItem: {
    fontSize: '15px',
    lineHeight: 1.45,
    display: 'flex',
    gap: '10px',
    fontWeight: 500,
  },
  factBullet: {
    fontSize: '8px',
    marginTop: '6px',
    flexShrink: 0,
  },
  resultBlock: {
    marginTop: '20px',
    paddingTop: '18px',
    borderTop: '1px dashed currentColor',
    opacity: 0,
    animation: 'rise 0.4s 0.3s forwards',
  },
  pctRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '8px',
  },
  pctLabel: {
    fontSize: '10px',
    letterSpacing: '0.18em',
    opacity: 0.75,
  },
  pctValue: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '42px',
    lineHeight: 1,
    fontWeight: 400,
  },
  barTrack: {
    height: '6px',
    background: 'rgba(0,0,0,0.25)',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '6px',
  },
  voteCount: {
    fontSize: '10px',
    opacity: 0.6,
    letterSpacing: '0.1em',
  },
  vs: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    margin: '0 -4px',
  },
  vsCircle: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    background: '#C9A961',
    color: '#0E1A2B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Bungee Inline', cursive",
    fontSize: '15px',
    fontWeight: 700,
    boxShadow: '0 6px 20px rgba(201, 169, 97, 0.4), inset 0 -3px 0 rgba(0,0,0,0.15)',
    letterSpacing: '0.05em',
  },
  ctaWrap: {
    textAlign: 'center',
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
  },
  tapPrompt: {
    fontSize: '13px',
    color: '#C9A961',
    letterSpacing: '0.25em',
    margin: 0,
  },
  resultMeta: {
    fontSize: '11px',
    color: '#F5E9D2',
    opacity: 0.55,
    letterSpacing: '0.18em',
    margin: 0,
  },
  nextBtn: {
    fontFamily: "'DM Serif Display', serif",
    background: '#F5E9D2',
    color: '#0E1A2B',
    border: 'none',
    padding: '14px 36px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '4px',
    letterSpacing: '0.02em',
    boxShadow: '0 4px 0 #C9A961, 0 10px 24px rgba(0,0,0,0.3)',
    fontWeight: 400,
  },
  footer: {
    textAlign: 'center',
    padding: '24px',
    position: 'relative',
    zIndex: 2,
  },
  footerText: {
    fontSize: '10px',
    color: '#F5E9D2',
    opacity: 0.4,
    letterSpacing: '0.2em',
  },
};
