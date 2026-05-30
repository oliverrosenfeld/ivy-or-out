import React, { useState, useEffect } from 'react';
 
// ============================================================
// SCHOOL DATA — 60 schools across Ivy, NESCAC, Big Ten, ACC, + extras
// Each has { primary, secondary } colors used for the card gradient
// ============================================================
 
const SCHOOLS = {
  // ===== IVY LEAGUE (8) =====
  harvard: {
    name: 'Harvard', nickname: 'Crimson', location: 'Cambridge, MA',
    conf: 'Ivy League', colors: { primary: '#A51C30', secondary: '#1A0508' },
    logo: 'https://logos-world.net/wp-content/uploads/2020/06/Harvard-Crimson-symbol.jpg',
    facts: [
      'No athletic scholarships (Ivy League rule)',
      'Need-based aid avg: $62K/year for qualifying families',
      'Last NFL draft pick: 2021 (2 alumni currently active)',
      'Harvard Stadium capacity: 30,323 (oldest in college football)',
      'Degree consistently ranked #1-3 globally',
      'Standard Nike team deal — no major sponsorship',
      '93% athlete graduation rate',
      'Strict 20-hour/week practice limit enforced',
    ],
  },
  yale: {
    name: 'Yale', nickname: 'Bulldogs', location: 'New Haven, CT',
    conf: 'Ivy League', colors: { primary: '#0F4D92', secondary: '#FFD100' },
    logo: 'https://content.sportslogos.net/logos/35/920/full/6341_yale_bulldogs-alternate-0.png',
    facts: [
      'No athletic scholarships offered',
      'Need-based aid covers 100% of demonstrated need',
      'Yale Bowl seats 61,446 (historic 1914 venue)',
      '1 alum currently on NFL roster',
      'Under Armour contract (~$1.2M/year est.)',
      '8 Ivy League titles since 2000',
      'Strong consulting/finance recruiting pipeline',
      'Sterling Memorial Library access',
    ],
  },
  princeton: {
    name: 'Princeton', nickname: 'Tigers', location: 'Princeton, NJ',
    conf: 'Ivy League', colors: { primary: '#E77500', secondary: '#000000' },
    logo: 'https://i.pinimg.com/originals/5e/fd/75/5efd75ee65540d14525d8261049febb4.jpg',
    facts: [
      'No athletic scholarships',
      'Need-based aid: avg $58K/year, no loans',
      'Princeton Stadium: 27,800 seats',
      'Nike team deal — no individual NIL infrastructure',
      'Endowment-funded facilities upgrade ($45M, 2023)',
      'Ranks #1 national university (US News)',
      '0 first-round NFL picks in last decade',
      'Eating Club social system',
    ],
  },
  dartmouth: {
    name: 'Dartmouth', nickname: 'Big Green', location: 'Hanover, NH',
    conf: 'Ivy League', colors: { primary: '#00693E', secondary: '#003820' },
    logo: 'https://content.sportslogos.net/logos/31/653/full/dartmouth_big_green_logo_primary_dark_2019_sportslogosnet-2326.png',
    facts: [
      'No athletic scholarships (Ivy rule)',
      'Memorial Field capacity: 11,000',
      'No-tackle practice innovation legacy',
      'Outdoor Programs: free skiing, hiking gear',
      'Nike apparel, modest equipment budget',
      'Winter Carnival tradition',
      '2 active NFL players (both long snappers)',
      '94% job/grad placement within 6 months',
    ],
  },
  brown: {
    name: 'Brown', nickname: 'Bears', location: 'Providence, RI',
    conf: 'Ivy League', colors: { primary: '#4E3629', secondary: '#FFC72C' },
    logo: 'https://content.sportslogos.net/logos/30/623/full/brown_bears_logo_alt_on_dark_2022_sportslogosnet-2133.png',
    facts: [
      'No athletic scholarships',
      'Open Curriculum: no required courses',
      'Brown Stadium: 20,000 capacity (built 1925)',
      'Adidas team apparel deal',
      'Federal-style brick campus, 250+ years old',
      '1 active NFL alum',
      'Strong consulting pipeline',
      'Practice facility renovated 2022 ($18M)',
    ],
  },
  columbia: {
    name: 'Columbia', nickname: 'Lions', location: 'New York, NY',
    conf: 'Ivy League', colors: { primary: '#75AADB', secondary: '#003DA5' },
    logo: 'https://i.pinimg.com/originals/10/2f/46/102f46a4bc38fd38fc36e6fd48d2b8a6.jpg',
    facts: [
      'No athletic scholarships',
      'Kraft Field at Lawrence A. Wien Stadium',
      'NYC campus — Manhattan internships standard',
      'Nike team deal',
      'Stadium 60-min subway ride from main campus',
      'Football historically below .500',
      '$0 family contribution under $66K income',
      'FCS, no bowl eligibility',
    ],
  },
  cornell: {
    name: 'Cornell', nickname: 'Big Red', location: 'Ithaca, NY',
    conf: 'Ivy League', colors: { primary: '#B31B1B', secondary: '#222222' },
    logo: 'https://i.pinimg.com/originals/bc/1e/1b/bc1e1b3d33d1df5233810f6ca229d514.jpg',
    facts: [
      'No athletic scholarships',
      'Schoellkopf Field: 21,500 capacity',
      'Engineering & hotel school pipelines',
      'Gorges and waterfalls on campus',
      'Adidas apparel partnership',
      'Brutal winters — avg 67 inches snow/year',
      '11 active NFL alumni (most in Ivy League)',
      'Cornell-NYC Tech campus access',
    ],
  },
  upenn: {
    name: 'Penn', nickname: 'Quakers', location: 'Philadelphia, PA',
    conf: 'Ivy League', colors: { primary: '#011F5B', secondary: '#990000' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Penn_Quakers_logo.svg/330px-Penn_Quakers_logo.svg.png',
    facts: [
      'No athletic scholarships',
      'Franklin Field: oldest D-I stadium in use (1895)',
      'Wharton Business School access',
      'Nike team apparel',
      'Penn Relays hosted annually since 1895',
      '3 active NFL alumni',
      'Urban Philly campus',
      'Avg starting salary for athletes: $86K',
    ],
  },
 
  // ===== NESCAC (11) =====
  tufts: {
    name: 'Tufts', nickname: 'Jumbos', location: 'Medford, MA',
    conf: 'NESCAC', colors: { primary: '#3E8EDE', secondary: '#52307C' },
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tufts_Jumbos_logo.svg/330px-Tufts_Jumbos_logo.svg.png',
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
    name: 'Williams', nickname: 'Ephs', location: 'Williamstown, MA',
    conf: 'NESCAC', colors: { primary: '#500082', secondary: '#FFD700' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Williams_athletics_wmark.png',
    facts: [
      'No athletic scholarships (D-III)',
      'Need-blind admission, generous merit aid',
      'Weston Field capacity: 5,000',
      'Tutorial system: 2-student courses',
      'Berkshires location — rural, scenic',
      'Generic team apparel (no major sponsor)',
      '#1 liberal arts college (US News)',
      'Avg salary 10 yrs out: $103K',
    ],
  },
  amherst: {
    name: 'Amherst', nickname: 'Mammoths', location: 'Amherst, MA',
    conf: 'NESCAC', colors: { primary: '#3F1F69', secondary: '#FFFFFF' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Amherst_Mammoths_wordmark.png/330px-Amherst_Mammoths_wordmark.png',
    facts: [
      'No athletic scholarships (D-III)',
      'Pratt Field capacity: 3,500',
      'Open Curriculum: no requirements',
      'Five College Consortium access',
      'Nike team purchase — no sponsorship',
      '0 active NFL alumni',
      'Need-blind admissions, avg aid $63K',
      'Top-3 liberal arts ranking',
    ],
  },
  bowdoin: {
    name: 'Bowdoin', nickname: 'Polar Bears', location: 'Brunswick, ME',
    conf: 'NESCAC', colors: { primary: '#231F20', secondary: '#FFFFFF' },
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Bowdoin_Polar_Bears_Logo.svg/330px-Bowdoin_Polar_Bears_Logo.svg.png',
    facts: [
      'No athletic scholarships (D-III)',
      'Whittier Field capacity: 5,000',
      'Need-blind admissions',
      'Coastal Maine campus',
      'Generic team apparel',
      '0 active NFL alumni',
      'Avg aid package: $58K',
      'Top-5 liberal arts college',
    ],
  },
  bates: {
    name: 'Bates', nickname: 'Bobcats', location: 'Lewiston, ME',
    conf: 'NESCAC', colors: { primary: '#881C1C', secondary: '#3A1010' },
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Bates_Bobcats_logo.svg/500px-Bates_Bobcats_logo.svg.png',
    facts: [
      'No athletic scholarships (D-III)',
      'Garcelon Field capacity: 4,500',
      'No fraternities or sororities',
      'Lewiston-Auburn metro setting',
      'Adidas team apparel',
      '0 active NFL alumni',
      'Need-blind admissions',
      'Senior thesis required for all majors',
    ],
  },
  colby: {
    name: 'Colby', nickname: 'Mules', location: 'Waterville, ME',
    conf: 'NESCAC', colors: { primary: '#002F6C', secondary: '#A6A6A6' },
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Colby_Mules_logo.svg/500px-Colby_Mules_logo.svg.png',
    facts: [
      'No athletic scholarships (D-III)',
      'Seaverns Field capacity: 4,000',
      'Davis Connects program — paid internships',
      'Central Maine campus, lakeside',
      'Nike team apparel',
      '0 active NFL alumni',
      'No-loan financial aid policy',
      'Avg aid package: $55K',
    ],
  },
  middlebury: {
    name: 'Middlebury', nickname: 'Panthers', location: 'Middlebury, VT',
    conf: 'NESCAC', colors: { primary: '#003594', secondary: '#FFFFFF' },
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Middlebury_Panthers_logo.svg/500px-Middlebury_Panthers_logo.svg.png',
    facts: [
      'No athletic scholarships (D-III)',
      'Youngman Field capacity: 4,500',
      'Top language program in the country',
      'Green Mountains setting',
      'Nike team apparel',
      '0 active NFL alumni',
      'Snow Bowl ski resort owned by college',
      'Avg aid package: $57K',
    ],
  },
  trinity: {
    name: 'Trinity', nickname: 'Bantams', location: 'Hartford, CT',
    conf: 'NESCAC', colors: { primary: '#005A9C', secondary: '#FFD200' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Trinity_conn_athletics_monogram.png/250px-Trinity_conn_athletics_monogram.png',
    facts: [
      'No athletic scholarships (D-III)',
      'Jessee/Miller Field capacity: 3,500',
      'Greek life dominant (~25%)',
      'Hartford urban setting',
      'Adidas team apparel',
      '0 active NFL alumni',
      'Strong consulting/finance pipeline',
      'NESCAC title in 2022',
    ],
  },
  hamilton: {
    name: 'Hamilton', nickname: 'Continentals', location: 'Clinton, NY',
    conf: 'NESCAC', colors: { primary: '#00558C', secondary: '#9BBDCC' },
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Hamilton_Tiger-Cats_logo.svg/250px-Hamilton_Tiger-Cats_logo.svg.png',
    facts: [
      'No athletic scholarships (D-III)',
      'Steuben Field capacity: 2,500',
      'Open Curriculum — no general ed reqs',
      'Rural Central NY setting',
      'Nike team apparel',
      '0 active NFL alumni',
      'Strong writing program tradition',
      'Avg aid package: $52K',
    ],
  },
  wesleyan: {
    name: 'Wesleyan', nickname: 'Cardinals', location: 'Middletown, CT',
    conf: 'NESCAC', colors: { primary: '#A50034', secondary: '#000000' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Wesleyan_cardinals_mark.png',
    facts: [
      'No athletic scholarships (D-III)',
      'Andrus Field capacity: 5,000',
      'Open curriculum, arts-focused',
      'Middletown, between Hartford and New Haven',
      'Adidas team apparel',
      '0 active NFL alumni',
      'Bill Belichick alma mater',
      'Strong film/media program',
    ],
  },
  conncoll: {
    name: 'Conn College', nickname: 'Camels', location: 'New London, CT',
    conf: 'NESCAC', colors: { primary: '#003F6F', secondary: '#9CB7D0' },
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Formal_Seal_of_Connecticut_College%2C_New_London%2C_CT%2C_USA.svg/330px-Formal_Seal_of_Connecticut_College%2C_New_London%2C_CT%2C_USA.svg.png',
    facts: [
      'No athletic scholarships (D-III)',
      'Silfen Field capacity: 1,500',
      'No-loan financial aid policy',
      'Coastal Connecticut campus',
      'Adidas team apparel',
      '0 active NFL alumni',
      'Pairs with Coast Guard Academy locally',
      'NESCAC smallest football program',
    ],
  },
 
  // ===== BIG TEN (18) =====
  michigan: {
    name: 'Michigan', nickname: 'Wolverines', location: 'Ann Arbor, MI',
    conf: 'Big Ten', colors: { primary: '#00274C', secondary: '#FFCB05' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/330px-Michigan_Wolverines_logo.svg.png',
    facts: [
      'Full scholarship + $4,800 stipend',
      'Michigan Stadium ("The Big House"): 107,601',
      'Jordan Brand school',
      'NIL Champions Circle: $220K avg',
      '12 NFL Draft picks last 2 cycles',
      'Schembechler Hall: $54M football facility',
      'Ross School of Business access',
      'Athletic dept revenue: $239M',
    ],
  },
  ohiostate: {
    name: 'Ohio State', nickname: 'Buckeyes', location: 'Columbus, OH',
    conf: 'Big Ten', colors: { primary: '#BB0000', secondary: '#666666' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ohio_State_Buckeyes_logo.svg/500px-Ohio_State_Buckeyes_logo.svg.png',
    facts: [
      'Full scholarship + $6,038 stipend',
      'Ohio Stadium ("The Horseshoe"): 102,780',
      'Nike Jordan Brand exclusive school',
      'NIL THE Foundation: $300K+ avg starters',
      '20 NFL Draft picks since 2020 (most in country)',
      'Woody Hayes Athletic Center: $42M',
      'Athletic dept revenue: $251M',
      'TBDBITL marching band',
    ],
  },
  pennstate: {
    name: 'Penn State', nickname: 'Nittany Lions', location: 'University Park, PA',
    conf: 'Big Ten', colors: { primary: '#041E42', secondary: '#FFFFFF' },
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Penn_State_Nittany_Lions_logo.svg/500px-Penn_State_Nittany_Lions_logo.svg.png',
    facts: [
      'Full athletic scholarship + stipend',
      'Beaver Stadium: 106,572 capacity',
      'Nike apparel deal ($3.5M/year)',
      'NIL Happy Valley United: $200K avg',
      'White Out games: nationally televised',
      '9 NFL Draft picks last 2 cycles',
      'Lasch Football Building: $36M',
      'Smeal College of Business pipeline',
    ],
  },
  usc: {
    name: 'USC', nickname: 'Trojans', location: 'Los Angeles, CA',
    conf: 'Big Ten', colors: { primary: '#990000', secondary: '#FFC72C' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/USC_Trojans_logo.svg/250px-USC_Trojans_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'LA Memorial Coliseum: 77,500',
      'Nike apparel + LA market NIL access',
      'NIL House of Victory: $300K+ avg',
      'Hollywood internship pipeline',
      '8 NFL Draft picks last 2 cycles',
      'McKay Center: $70M football ops',
      'CA state tax: 9.3% on NIL',
    ],
  },
  oregon: {
    name: 'Oregon', nickname: 'Ducks', location: 'Eugene, OR',
    conf: 'Big Ten', colors: { primary: '#154733', secondary: '#FEE123' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Oregon_Ducks_logo.svg/330px-Oregon_Ducks_logo.svg.png',
    facts: [
      'Full scholarship + stipend',
      'Autzen Stadium: 54,000 (loudest in CFB)',
      "Phil Knight's alma mater (Nike co-founder)",
      'Unlimited uniform combinations',
      'NIL Division Street: $250K avg',
      'Hatfield-Dowlin Complex: $138M',
      'Marcus Mariota Sports Performance Center',
      '7 NFL Draft picks last 2 cycles',
    ],
  },
  ucla: {
    name: 'UCLA', nickname: 'Bruins', location: 'Los Angeles, CA',
    conf: 'Big Ten', colors: { primary: '#2774AE', secondary: '#FFD100' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/UCLA_Bruins_primary_logo.svg/500px-UCLA_Bruins_primary_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Rose Bowl: 88,565 capacity (off-campus)',
      'Jordan Brand school',
      'NIL Champions: $140K avg',
      'Westwood LA campus',
      '6 NFL Draft picks last 2 cycles',
      'Wasserman Football Center: $65M',
      'CA state tax: 9.3% on NIL',
    ],
  },
  washington: {
    name: 'Washington', nickname: 'Huskies', location: 'Seattle, WA',
    conf: 'Big Ten', colors: { primary: '#4B2E83', secondary: '#B7A57A' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Washington_Huskies_logo.svg/500px-Washington_Huskies_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Husky Stadium: 70,138 (Lake Washington views)',
      'Adidas apparel deal',
      'NIL Montlake Futures: $180K avg',
      'No state income tax in Washington',
      '7 NFL Draft picks last 2 cycles',
      'Husky Stadium Football Operations: $280M',
      'Amazon/Microsoft internship pipeline',
    ],
  },
  wisconsin: {
    name: 'Wisconsin', nickname: 'Badgers', location: 'Madison, WI',
    conf: 'Big Ten', colors: { primary: '#C5050C', secondary: '#FFFFFF' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Wisconsin_Badgers_logo.svg/330px-Wisconsin_Badgers_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Camp Randall Stadium: 80,321',
      'Under Armour deal',
      'NIL VC Connect: $130K avg',
      "Jump Around tradition (3rd quarter)",
      '5 NFL Draft picks last 2 cycles',
      'McClain Athletic Facility renovation: $285M',
      'Madison college-town atmosphere',
    ],
  },
  iowa: {
    name: 'Iowa', nickname: 'Hawkeyes', location: 'Iowa City, IA',
    conf: 'Big Ten', colors: { primary: '#FFCD00', secondary: '#000000' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Iowa_Hawkeyes_wordmark.svg/330px-Iowa_Hawkeyes_wordmark.svg.png',
    facts: [
      'Full athletic scholarship',
      'Kinnick Stadium: 69,250',
      'Nike deal',
      'NIL Swarm Collective: $90K avg',
      'Pink visitor locker room (psychological edge)',
      '4 NFL Draft picks last 2 cycles',
      'Hansen Football Performance Center: $55M',
      "Wave to children's hospital tradition",
    ],
  },
  minnesota: {
    name: 'Minnesota', nickname: 'Golden Gophers', location: 'Minneapolis, MN',
    conf: 'Big Ten', colors: { primary: '#7A0019', secondary: '#FFCC33' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Minnesota_Golden_Gophers_logo.svg/500px-Minnesota_Golden_Gophers_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Huntington Bank Stadium: 50,805',
      'Nike apparel deal',
      'NIL Dinkytown Athletes: $100K avg',
      'Twin Cities metro internship access',
      '3 NFL Draft picks last 2 cycles',
      'Athletes Village complex: $166M',
      "Paul Bunyan's Axe rivalry with Wisconsin",
    ],
  },
  nebraska: {
    name: 'Nebraska', nickname: 'Cornhuskers', location: 'Lincoln, NE',
    conf: 'Big Ten', colors: { primary: '#E41C38', secondary: '#FFFFFF' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nebraska_Cornhuskers_logo.svg/330px-Nebraska_Cornhuskers_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Memorial Stadium: 85,458 (375 consecutive sellouts)',
      'Adidas apparel deal',
      'NIL 1890 Initiative: $120K avg',
      'Sellout streak: longest in college football',
      '2 NFL Draft picks last 2 cycles',
      'Hawks Championship Center: $60M',
      'Tunnel walk tradition',
    ],
  },
  northwestern: {
    name: 'Northwestern', nickname: 'Wildcats', location: 'Evanston, IL',
    conf: 'Big Ten', colors: { primary: '#4E2A84', secondary: '#A89BBE' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Northwestern_Wildcats_logo.svg/330px-Northwestern_Wildcats_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Ryan Field: under reconstruction (47K → 35K)',
      'Under Armour apparel deal',
      'Kellogg School of Management pipeline',
      'Lakefront campus on Lake Michigan',
      'NIL Trail to Victory: $130K avg',
      '4 NFL Draft picks last 2 cycles',
      'Chicago internship corridor access',
    ],
  },
  illinois: {
    name: 'Illinois', nickname: 'Fighting Illini', location: 'Champaign, IL',
    conf: 'Big Ten', colors: { primary: '#13294B', secondary: '#E84A27' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Illinois_Fighting_Illini_logo.svg/500px-Illinois_Fighting_Illini_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Memorial Stadium: 60,670',
      'Nike apparel deal',
      'NIL ICON: $95K avg',
      'Gies College of Business access',
      '3 NFL Draft picks last 2 cycles',
      'Smith Football Center: $80M',
      'Red Grange historical legacy',
    ],
  },
  indiana: {
    name: 'Indiana', nickname: 'Hoosiers', location: 'Bloomington, IN',
    conf: 'Big Ten', colors: { primary: '#990000', secondary: '#EEEDEB' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Indiana_Hoosiers_logo.svg/960px-Indiana_Hoosiers_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Memorial Stadium: 52,929',
      'Adidas apparel deal',
      'NIL Hoosiers For Good: $80K avg',
      'Basketball-first culture',
      '2 NFL Draft picks last 2 cycles',
      'Excellence Academy: $40M football facility',
      'Kelley School of Business access',
    ],
  },
  maryland: {
    name: 'Maryland', nickname: 'Terrapins', location: 'College Park, MD',
    conf: 'Big Ten', colors: { primary: '#E03A3E', secondary: '#FFD520' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Maryland_Terps_logo.png/330px-Maryland_Terps_logo.png',
    facts: [
      'Full athletic scholarship',
      'SECU Stadium: 51,802',
      'Under Armour HQ school (founder Kevin Plank attended)',
      'NIL Turtle NIL Collective: $110K avg',
      'DC-metro internship pipeline',
      '4 NFL Draft picks last 2 cycles',
      'Jones-Hill House: $196M football facility',
      'Wackiest helmets in CFB (flag pattern)',
    ],
  },
  michiganstate: {
    name: 'Michigan State', nickname: 'Spartans', location: 'East Lansing, MI',
    conf: 'Big Ten', colors: { primary: '#18453B', secondary: '#FFFFFF' },
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Michigan_State_Athletics_logo.svg/330px-Michigan_State_Athletics_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Spartan Stadium: 75,005',
      'Nike apparel deal',
      'NIL Spartan Dawgs 4 Life: $100K avg',
      'Broad College of Business pipeline',
      '3 NFL Draft picks last 2 cycles',
      'Skandalaris Football Center: $24M',
      'Paul Bunyan Trophy vs Michigan',
    ],
  },
  purdue: {
    name: 'Purdue', nickname: 'Boilermakers', location: 'West Lafayette, IN',
    conf: 'Big Ten', colors: { primary: '#CEB888', secondary: '#000000' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Purdue_Boilermakers_logo.svg/960px-Purdue_Boilermakers_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Ross-Ade Stadium: 57,236',
      'Nike apparel deal',
      'NIL Boilermaker Alliance: $90K avg',
      'Top engineering school in CFB',
      '3 NFL Draft picks last 2 cycles',
      'Football Performance Complex: $65M (2017)',
      '"Cradle of Quarterbacks" tradition',
    ],
  },
  rutgers: {
    name: 'Rutgers', nickname: 'Scarlet Knights', location: 'Piscataway, NJ',
    conf: 'Big Ten', colors: { primary: '#CC0033', secondary: '#5F6062' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Rutgers_Scarlet_Knights_logo.svg/330px-Rutgers_Scarlet_Knights_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'SHI Stadium: 52,454',
      'Adidas apparel deal',
      'NIL Knights of the Raritan: $85K avg',
      'Birthplace of college football (1869)',
      '3 NFL Draft picks last 2 cycles',
      'Hale Center: $40M football facility',
      'NYC metro internship access',
    ],
  },
 
  // ===== ACC (17) =====
  clemson: {
    name: 'Clemson', nickname: 'Tigers', location: 'Clemson, SC',
    conf: 'ACC', colors: { primary: '#F66733', secondary: '#522D80' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Clemson_Tigers_logo.svg/330px-Clemson_Tigers_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Memorial Stadium ("Death Valley"): 81,500',
      'Nike apparel deal ($3.0M/year)',
      'NIL TigerImpact: $200K avg',
      "Howard's Rock pre-game tradition",
      '10 NFL Draft picks last 2 cycles',
      'Allen N. Reeves Football Complex: $55M',
      '2 national championships (2016, 2018)',
    ],
  },
  fsu: {
    name: 'Florida State', nickname: 'Seminoles', location: 'Tallahassee, FL',
    conf: 'ACC', colors: { primary: '#782F40', secondary: '#CEB888' },
    facts: [
      'Full athletic scholarship',
      'Doak Campbell Stadium: 79,560',
      'Nike apparel deal',
      'NIL Rising Spear: $190K avg',
      'No state income tax in Florida',
      '8 NFL Draft picks last 2 cycles',
      'Albert J. Dunlap Football Complex: $40M',
      'Chief Osceola spear-planting tradition',
    ],
  },
  miami: {
    name: 'Miami', nickname: 'Hurricanes', location: 'Coral Gables, FL',
    conf: 'ACC', colors: { primary: '#F47321', secondary: '#005030' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Miami_Hurricanes_logo.svg/330px-Miami_Hurricanes_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Hard Rock Stadium: 65,326 (off-campus, Dolphins share)',
      'Adidas apparel deal',
      'NIL John Ruiz Lifewallet collective: $250K+ avg',
      'No state income tax in Florida',
      '6 NFL Draft picks last 2 cycles',
      'Carol Soffer Football Complex: $30M (2018)',
      'Turnover chain tradition',
    ],
  },
  ncstate: {
    name: 'NC State', nickname: 'Wolfpack', location: 'Raleigh, NC',
    conf: 'ACC', colors: { primary: '#CC0000', secondary: '#000000' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/North_Carolina_State_University_Athletic_logo.svg/250px-North_Carolina_State_University_Athletic_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Carter-Finley Stadium: 57,583',
      'Adidas apparel deal',
      'NIL One Pack: $120K avg',
      'Research Triangle internship access',
      '4 NFL Draft picks last 2 cycles',
      'Murphy Football Center: $25M',
      'Engineering pipeline rivals Purdue',
    ],
  },
  unc: {
    name: 'North Carolina', nickname: 'Tar Heels', location: 'Chapel Hill, NC',
    conf: 'ACC', colors: { primary: '#7BAFD4', secondary: '#FFFFFF' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/North_Carolina_Tar_Heels_logo.svg/330px-North_Carolina_Tar_Heels_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Kenan Memorial Stadium: 50,500',
      'Jordan Brand school (Michael Jordan alma mater)',
      'NIL Heels4Life: $150K avg',
      'Kenan-Flagler Business School pipeline',
      '5 NFL Draft picks last 2 cycles',
      'Kenan Football Center: $39M',
      'Research Triangle internship access',
    ],
  },
  duke: {
    name: 'Duke', nickname: 'Blue Devils', location: 'Durham, NC',
    conf: 'ACC', colors: { primary: '#00539B', secondary: '#012169' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Duke_Athletics_logo.svg/250px-Duke_Athletics_logo.svg.png',
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
  virginia: {
    name: 'Virginia', nickname: 'Cavaliers', location: 'Charlottesville, VA',
    conf: 'ACC', colors: { primary: '#232D4B', secondary: '#F84C1E' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Virginia_Cavaliers_wordmark.svg/500px-Virginia_Cavaliers_wordmark.svg.png',
    facts: [
      'Full athletic scholarship',
      'Scott Stadium: 61,500',
      'Nike apparel deal',
      'NIL Cav Futures: $110K avg',
      'McIntire School of Commerce pipeline',
      '3 NFL Draft picks last 2 cycles',
      'McCue Center football facility',
      'Thomas Jefferson-designed campus',
    ],
  },
  virginiatech: {
    name: 'Virginia Tech', nickname: 'Hokies', location: 'Blacksburg, VA',
    conf: 'ACC', colors: { primary: '#630031', secondary: '#CF4420' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Virginia_Tech_Hokies_logo.svg/500px-Virginia_Tech_Hokies_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Lane Stadium: 65,632 (Enter Sandman entrance)',
      'Nike apparel deal',
      'NIL Triumph: $130K avg',
      'Pamplin College of Business pipeline',
      '4 NFL Draft picks last 2 cycles',
      'Beamer-Lawson Indoor Practice Facility',
      'Engineering powerhouse',
    ],
  },
  pitt: {
    name: 'Pittsburgh', nickname: 'Panthers', location: 'Pittsburgh, PA',
    conf: 'ACC', colors: { primary: '#003594', secondary: '#FFB81C' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Pitt_Panthers_wordmark.svg/500px-Pitt_Panthers_wordmark.svg.png',
    facts: [
      'Full athletic scholarship',
      'Acrisure Stadium: 68,400 (shared with Steelers)',
      'Nike apparel deal',
      'NIL Alliance 412: $115K avg',
      'Steelers facility access for training',
      '5 NFL Draft picks last 2 cycles',
      'Duratz Athletic Complex: $30M',
      'Pittsburgh tech corridor',
    ],
  },
  louisville: {
    name: 'Louisville', nickname: 'Cardinals', location: 'Louisville, KY',
    conf: 'ACC', colors: { primary: '#AD0000', secondary: '#000000' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Louisville_Wordmark_%282023%29.svg/500px-Louisville_Wordmark_%282023%29.svg.png',
    facts: [
      'Full athletic scholarship',
      'L&N Federal Credit Union Stadium: 60,800',
      'Adidas apparel deal',
      'NIL 502Circle: $125K avg',
      'Bourbon trail proximity',
      '4 NFL Draft picks last 2 cycles',
      'Howard Schnellenberger Football Complex',
      'Lamar Jackson Heisman legacy',
    ],
  },
  syracuse: {
    name: 'Syracuse', nickname: 'Orange', location: 'Syracuse, NY',
    conf: 'ACC', colors: { primary: '#F76900', secondary: '#000E54' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Syracuse_Orange_logo.svg/250px-Syracuse_Orange_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'JMA Wireless Dome: 49,250',
      'Nike apparel deal',
      'NIL Athlete Advocates: $90K avg',
      'Newhouse School pipeline (sports media)',
      '3 NFL Draft picks last 2 cycles',
      'Ensley Athletic Center: $24M',
      'Avg 124 inches of snow per year',
    ],
  },
  bostoncollege: {
    name: 'Boston College', nickname: 'Eagles', location: 'Chestnut Hill, MA',
    conf: 'ACC', colors: { primary: '#8A1538', secondary: '#B89D5E' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Boston_College_Eagles_wordmark.svg/500px-Boston_College_Eagles_wordmark.svg.png',
    facts: [
      'Full athletic scholarship',
      'Alumni Stadium: 44,500',
      'Under Armour apparel deal',
      'NIL Friends of the Heights: $100K avg',
      'Carroll School of Management pipeline',
      '3 NFL Draft picks last 2 cycles',
      'Fish Field House: $30M facility',
      'Only Catholic Power 4 school in Northeast',
    ],
  },
  wakeforest: {
    name: 'Wake Forest', nickname: 'Demon Deacons', location: 'Winston-Salem, NC',
    conf: 'ACC', colors: { primary: '#9E7E38', secondary: '#000000' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Wake_Forest_University_Athletic_logo.svg/330px-Wake_Forest_University_Athletic_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Allegacy Federal Credit Union Stadium: 31,500',
      'Nike apparel deal',
      'NIL DEACS NIL Club: $95K avg',
      'Smallest Power 4 school by enrollment',
      '3 NFL Draft picks last 2 cycles',
      'McCreary Field House: $26M',
      'Strong finance/consulting pipeline',
    ],
  },
  gatech: {
    name: 'Georgia Tech', nickname: 'Yellow Jackets', location: 'Atlanta, GA',
    conf: 'ACC', colors: { primary: '#B3A369', secondary: '#003057' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Georgia_Tech_Yellow_Jackets_logo.svg/330px-Georgia_Tech_Yellow_Jackets_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Bobby Dodd Stadium: 55,000',
      'Adidas apparel deal',
      'NIL Tech Way Collective: $110K avg',
      'Top-5 engineering school in the country',
      '4 NFL Draft picks last 2 cycles',
      'Bobby Dodd Stadium renovations: $115M',
      'Atlanta corporate internship pipeline',
    ],
  },
  smu: {
    name: 'SMU', nickname: 'Mustangs', location: 'Dallas, TX',
    conf: 'ACC', colors: { primary: '#0033A0', secondary: '#C8102E' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/SMU_Mustang_logo.svg/330px-SMU_Mustang_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'Gerald J. Ford Stadium: 32,000',
      'Nike apparel deal',
      'Dallas/Highland Park wealth — NIL $230K+',
      'No state income tax in Texas',
      'ACC move (2024)',
      '4 NFL Draft picks last 2 cycles',
      'Cox School of Business pipeline',
    ],
  },
  stanford: {
    name: 'Stanford', nickname: 'Cardinal', location: 'Stanford, CA',
    conf: 'ACC', colors: { primary: '#8C1515', secondary: '#2E2D29' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/250px-Stanford_Cardinal_logo.svg.png',
    facts: [
      'Full athletic scholarship (unlike Ivies)',
      'Stanford Stadium: 50,000 capacity',
      'Nike apparel deal ($8.2M/year)',
      'Silicon Valley internship pipeline',
      'NIL Lifetime Cardinal: $180K avg',
      '15+ NFL Draft picks in last 5 years',
      'Arrillaga Family Sports Center: $40M',
      '99% athlete graduation rate',
    ],
  },
  cal: {
    name: 'California', nickname: 'Golden Bears', location: 'Berkeley, CA',
    conf: 'ACC', colors: { primary: '#003262', secondary: '#FDB515' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/California_Golden_Bears_logo.svg/250px-California_Golden_Bears_logo.svg.png',
    facts: [
      'Full athletic scholarship',
      'California Memorial Stadium: 51,892',
      'Under Armour apparel deal',
      'NIL California Legends: $130K avg',
      'Bay Area tech internship pipeline',
      '3 NFL Draft picks last 2 cycles',
      'Simpson Center for Student-Athlete High Performance',
      'CA state tax: 9.3% on NIL',
    ],
  },
 
  // ===== INDEPENDENTS / EXTRAS (6) =====
  notredame: {
    name: 'Notre Dame', nickname: 'Fighting Irish', location: 'South Bend, IN',
    conf: 'Independent', colors: { primary: '#0C2340', secondary: '#C99700' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Nd_athletics_gold_logo_2015.svg/330px-Nd_athletics_gold_logo_2015.svg.png',
    facts: [
      'Full athletic scholarship',
      'Notre Dame Stadium: 77,622',
      'Under Armour exclusive partnership ($90M deal)',
      'Independent — own NBC TV deal',
      'NIL Friends of the University: $170K avg',
      '7 NFL Draft picks last 2 cycles',
      'Touchdown Jesus mural — campus landmark',
      'Mendoza College of Business top-10',
    ],
  },
  army: {
    name: 'Army', nickname: 'Black Knights', location: 'West Point, NY',
    conf: 'Service Academy', colors: { primary: '#000000', secondary: '#D4BF91' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Army_West_Point_logo.svg/330px-Army_West_Point_logo.svg.png',
    facts: [
      'Full tuition + stipend + military commission',
      'Michie Stadium: 38,000 (overlooks Hudson)',
      'Nike apparel deal',
      '5-year active duty service requirement',
      'No NIL (federal employees)',
      '$1,278/month cadet pay',
      '2 NFL alumni currently',
      'Triple option offense — unique playstyle',
    ],
  },
  navy: {
    name: 'Navy', nickname: 'Midshipmen', location: 'Annapolis, MD',
    conf: 'Service Academy', colors: { primary: '#1F2F54', secondary: '#C5A02C' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Navy_Athletics_logo.svg/250px-Navy_Athletics_logo.svg.png',
    facts: [
      'Full tuition + stipend + officer commission',
      'Navy-Marine Corps Memorial Stadium: 34,000',
      'Under Armour apparel partnership',
      '5-year active duty commitment',
      'No NIL allowed during service',
      'Engineering majors required for most',
      'Annual Army-Navy Game (national TV)',
      '$1,278/month midshipman pay',
    ],
  },
  airforce: {
    name: 'Air Force', nickname: 'Falcons', location: 'Colorado Springs, CO',
    conf: 'Service Academy', colors: { primary: '#003594', secondary: '#8A8B8C' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Air_Force_Falcons_logo.svg/250px-Air_Force_Falcons_logo.svg.png',
    facts: [
      'Full tuition + stipend + officer commission',
      'Falcon Stadium: 46,692 (elevation 6,621 ft)',
      'Nike apparel deal',
      '5-year active duty commitment',
      'No NIL during service',
      'Living mascot: actual falcons (3 of them)',
      'Engineering-heavy curriculum',
      'STEM degree mandatory for most',
    ],
  },
  jacksonstate: {
    name: 'Jackson State', nickname: 'Tigers', location: 'Jackson, MS',
    conf: 'SWAC', colors: { primary: '#003DA5', secondary: '#FFFFFF' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Jackson_State_athletics_logo.svg/330px-Jackson_State_athletics_logo.svg.png',
    facts: [
      'Full athletic scholarship (FCS level)',
      'Mississippi Memorial Stadium: 60,492',
      'SWAC Conference — HBCU football',
      'Nike apparel deal',
      'Sonic Boom of the South marching band',
      'NIL emerging: $40K avg for stars',
      '2 active NFL alumni',
      'HBCU pipeline growing nationally',
    ],
  },
  howard: {
    name: 'Howard', nickname: 'Bison', location: 'Washington, DC',
    conf: 'MEAC', colors: { primary: '#003A63', secondary: '#E51937' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Howard_Bison_wordmark.svg/500px-Howard_Bison_wordmark.svg.png',
    facts: [
      'Full athletic scholarship (FCS)',
      'Greene Stadium: 9,000',
      'MEAC Conference — HBCU football',
      'Under Armour apparel deal',
      'DC-metro internship pipeline',
      'NIL emerging: $35K avg',
      '1 active NFL alum',
      'HBCU founded 1867',
    ],
  },
};
 
// ============================================================
// SPONSOR LOGOS — detected from school's facts
// ============================================================
 
const SPONSORS = {
  nike: {
    name: 'Nike',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/500px-Logo_NIKE.svg.png',
  },
  jordan: {
    name: 'Jordan Brand',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/500px-Jumpman_logo.svg.png',
  },
  adidas: {
    name: 'Adidas',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Adidas_2022_logo.svg/500px-Adidas_2022_logo.svg.png',
  },
  underarmour: {
    name: 'Under Armour',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Under_armour_logo.svg/330px-Under_armour_logo.svg.png',
  },
};
 
// Detect the school's apparel sponsor by scanning all of its facts.
// Jordan checked before Nike (since "Jordan Brand school" implies both, Jordan wins).
function detectSponsor(school) {
  const allText = school.facts.join(' ').toLowerCase();
  if (allText.includes('jordan')) return SPONSORS.jordan;
  if (allText.includes('under armour')) return SPONSORS.underarmour;
  if (allText.includes('adidas')) return SPONSORS.adidas;
  if (allText.includes('nike')) return SPONSORS.nike;
  return null;
}
 
// ============================================================
// MATCHUP PAIRING — favors cross-conference matchups
// ============================================================
 
const CONF_PAIRINGS = [
  ['Ivy League', 'Big Ten'], ['Ivy League', 'ACC'], ['Ivy League', 'NESCAC'],
  ['Ivy League', 'Service Academy'], ['Ivy League', 'Independent'],
  ['NESCAC', 'Big Ten'], ['NESCAC', 'ACC'], ['NESCAC', 'Service Academy'],
  ['NESCAC', 'Independent'], ['NESCAC', 'SWAC'], ['NESCAC', 'MEAC'],
  ['Big Ten', 'ACC'], ['Big Ten', 'Service Academy'], ['Big Ten', 'Independent'],
  ['Big Ten', 'SWAC'], ['Big Ten', 'MEAC'],
  ['ACC', 'Service Academy'], ['ACC', 'Independent'], ['ACC', 'SWAC'],
  ['Service Academy', 'Independent'],
];
 
const ALL_SCHOOLS = Object.keys(SCHOOLS);
const SCHOOLS_BY_CONF = ALL_SCHOOLS.reduce((acc, id) => {
  const conf = SCHOOLS[id].conf;
  (acc[conf] = acc[conf] || []).push(id);
  return acc;
}, {});
 
function generateMatchup(seenPairs) {
  let attempts = 0;
  while (attempts < 80) {
    const [confA, confB] = CONF_PAIRINGS[Math.floor(Math.random() * CONF_PAIRINGS.length)];
    const poolA = SCHOOLS_BY_CONF[confA] || [];
    const poolB = SCHOOLS_BY_CONF[confB] || [];
    if (!poolA.length || !poolB.length) { attempts++; continue; }
    const a = poolA[Math.floor(Math.random() * poolA.length)];
    const b = poolB[Math.floor(Math.random() * poolB.length)];
    if (a === b) { attempts++; continue; }
    const key = [a, b].sort().join('-vs-');
    if (seenPairs.has(key)) { attempts++; continue; }
    return { a, b, key };
  }
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
  const [votes, setVotes] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [seenPairs, setSeenPairs] = useState(() => new Set());
  const [loading, setLoading] = useState(true);
 
  async function loadMatchup() {
    setLoading(true);
    setRevealed(false);
    setUserChoice(null);
 
    const m = generateMatchup(seenPairs);
    setSeenPairs(prev => new Set(prev).add(m.key));
    setMatchup(m);
    setFactsA(pickFacts(m.a));
    setFactsB(pickFacts(m.b));
 
    try {
      const result = await window.storage.get(`votes:${m.key}`, true);
      if (result && result.value) {
        setVotes(JSON.parse(result.value));
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
 
    const newVotes = { ...(votes || {}) };
    newVotes[matchup.a] = newVotes[matchup.a] || 0;
    newVotes[matchup.b] = newVotes[matchup.b] || 0;
    newVotes[choiceId] += 1;
    setVotes(newVotes);
    setRevealed(true);
 
    try {
      const latest = await window.storage.get(`votes:${matchup.key}`, true);
      let merged = latest && latest.value ? JSON.parse(latest.value) : { [matchup.a]: 0, [matchup.b]: 0 };
      merged[matchup.a] = merged[matchup.a] || 0;
      merged[matchup.b] = merged[matchup.b] || 0;
      merged[choiceId] += 1;
      await window.storage.set(`votes:${matchup.key}`, JSON.stringify(merged), true);
      setVotes(merged);
    } catch (e) {}
  }
 
  const schoolA = matchup ? SCHOOLS[matchup.a] : null;
  const schoolB = matchup ? SCHOOLS[matchup.b] : null;
  const totalVotes = votes ? (votes[matchup?.a] || 0) + (votes[matchup?.b] || 0) : 0;
  const pctA = totalVotes ? Math.round(((votes[matchup.a] || 0) / totalVotes) * 100) : 50;
  const pctB = 100 - pctA;
 
  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&display=swap');
 
        * { box-sizing: border-box; }
        body { margin: 0; background: #000; }
 
        .card {
          transition: transform 0.25s ease, opacity 0.35s ease, box-shadow 0.25s ease;
          position: relative;
        }
        .card.interactive { cursor: pointer; }
        .card.interactive:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.15);
        }
        .card.winner {
          box-shadow: 0 0 0 2px #FFFFFF, 0 12px 32px rgba(0,0,0,0.6) !important;
        }
        .card.loser { opacity: 0.4; }
 
        .fact-row {
          opacity: 0;
          animation: fadeIn 0.35s forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
 
        .reveal { opacity: 0; animation: fadeIn 0.4s 0.2s forwards; }
 
        .bar-fill {
          width: 0%;
          animation: barFill 0.9s 0.3s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes barFill {
          from { width: 0%; }
          to { width: var(--target-width); }
        }
 
        .next-btn:hover { background: #FFFFFF; color: #000; }
        .next-btn:active { transform: translateY(1px); }
 
        @media (max-width: 760px) {
          .matchup-row { flex-direction: column !important; gap: 14px !important; }
          .vs { padding: 4px 0 !important; }
          .card { max-width: 100% !important; }
        }
 
        .marquee-track {
          display: inline-flex;
          align-items: center;
          will-change: transform;
        }
        .marquee-left {
          animation: marqueeLeft linear infinite;
        }
        .marquee-right {
          animation: marqueeRight linear infinite;
        }
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
 
      <MarqueeBackground />
 
      <header style={styles.header}>
        <h1 style={styles.title}>Ivy or Out</h1>
        <p style={styles.subtitle}>Where would you play?</p>
      </header>
 
      <main style={styles.main}>
        {loading || !schoolA || !schoolB ? (
          <div style={styles.loadingBox}>
            <span style={styles.loadingText}>Loading matchup…</span>
          </div>
        ) : (
          <>
            <div className="matchup-row" style={styles.matchupRow}>
              <SchoolCard
                school={schoolA}
                facts={factsA}
                pct={pctA}
                votes={votes?.[matchup.a] || 0}
                revealed={revealed}
                isWinner={userChoice === 'a'}
                isLoser={revealed && userChoice !== 'a'}
                onClick={() => vote('a')}
              />
              <div className="vs" style={styles.vs}>vs</div>
              <SchoolCard
                school={schoolB}
                facts={factsB}
                pct={pctB}
                votes={votes?.[matchup.b] || 0}
                revealed={revealed}
                isWinner={userChoice === 'b'}
                isLoser={revealed && userChoice !== 'b'}
                onClick={() => vote('b')}
              />
            </div>
 
            <div style={styles.ctaWrap}>
              {!revealed ? (
                <p style={styles.tapPrompt}>Tap a card to pick</p>
              ) : (
                <div className="reveal" style={styles.resultsCta}>
                  <p style={styles.resultMeta}>
                    {totalVotes.toLocaleString()} {totalVotes === 1 ? 'vote' : 'votes'}
                  </p>
                  <button className="next-btn" style={styles.nextBtn} onClick={loadMatchup}>
                    Next matchup
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
 
// ============================================================
// MARQUEE BACKGROUND — scrolling school names, outlined dark blue
// ============================================================
 
function MarqueeBackground() {
  const names = Object.values(SCHOOLS).map(s => s.name.toUpperCase());
  // Shuffle + duplicate so each row looks different and scrolls seamlessly
  const makeRow = (seed) => {
    const arr = [...names].sort(() => Math.sin(seed * 9999) - 0.5);
    return [...arr, ...arr]; // duplicate for seamless loop
  };
  const rows = [
    { items: makeRow(1), dir: 'left', duration: 120 },
    { items: makeRow(2), dir: 'right', duration: 140 },
    { items: makeRow(3), dir: 'left', duration: 160 },
    { items: makeRow(4), dir: 'right', duration: 130 },
    { items: makeRow(5), dir: 'left', duration: 150 },
    { items: makeRow(6), dir: 'right', duration: 170 },
  ];
  return (
    <div style={styles.marqueeBg} aria-hidden="true">
      {rows.map((row, i) => (
        <div key={i} style={styles.marqueeRow}>
          <div
            className={`marquee-track marquee-${row.dir}`}
            style={{ animationDuration: `${row.duration}s` }}
          >
            {row.items.map((name, j) => (
              <span key={j} style={styles.marqueeWord}>{name}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
 
// ============================================================
// CARD — gradient background using school's primary + secondary colors
// ============================================================
 
function SchoolCard({ school, facts, pct, votes, revealed, isWinner, isLoser, onClick }) {
  const { primary } = school.colors;
 
  const textColor = getContrastText(primary);
  const mutedText = textColor === '#FFFFFF' ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.68)';
  const subtleText = textColor === '#FFFFFF' ? 'rgba(255,255,255,0.58)' : 'rgba(0,0,0,0.48)';
  const dividerColor = textColor === '#FFFFFF' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.18)';
  const barTrackColor = textColor === '#FFFFFF' ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.32)';
  const factTextColor = textColor === '#FFFFFF' ? 'rgba(255,255,255,0.96)' : 'rgba(0,0,0,0.92)';
 
  const sponsor = detectSponsor(school);
 
  return (
    <div
      className={`card ${!revealed ? 'interactive' : ''} ${isWinner ? 'winner' : ''} ${isLoser ? 'loser' : ''}`}
      style={{
        ...styles.card,
        background: primary,
        color: textColor,
      }}
      onClick={!revealed ? onClick : undefined}
    >
      <div style={styles.cardInner}>
        {sponsor && (
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            style={{
              position: 'absolute',
              right: '16px',
              bottom: '90px',
              height: '40px',
              maxWidth: '70px',
              objectFit: 'contain',
              opacity: 0.75,
              filter: textColor === '#FFFFFF' ? 'brightness(0) invert(1)' : 'brightness(0)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
        <span style={{ ...styles.confTag, color: subtleText, borderColor: dividerColor }}>
          {school.conf}
        </span>
        <div style={styles.headerRow}>
          {school.logo && (
            <img
              src={school.logo}
              alt={`${school.name} logo`}
              style={styles.logo}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          <div style={styles.headerText}>
            <h2 style={{ ...styles.schoolName, color: textColor }}>{school.name}</h2>
            <p style={{ ...styles.nickname, color: mutedText }}>
              {school.nickname} · {school.location}
            </p>
          </div>
        </div>
 
        <div style={{ ...styles.divider, background: dividerColor }}></div>
 
        <ul style={styles.factList}>
          {facts.map((f, i) => (
            <li
              key={i}
              className="fact-row"
              style={{ ...styles.factItem, animationDelay: `${i * 0.06}s` }}
            >
              <span style={{ ...styles.factDot, background: subtleText }}></span>
              <span style={{ ...styles.factText, color: factTextColor }}>{f}</span>
            </li>
          ))}
        </ul>
 
        {revealed && (
          <div className="reveal" style={{ ...styles.resultBlock, borderTopColor: dividerColor }}>
            <div style={styles.resultRow}>
              <span style={{ ...styles.resultPct, color: textColor }}>{pct}%</span>
              <span style={{ ...styles.resultVotes, color: mutedText }}>
                {votes.toLocaleString()} {votes === 1 ? 'vote' : 'votes'}
              </span>
            </div>
            <div style={{ ...styles.barTrack, background: barTrackColor }}>
              <div
                className="bar-fill"
                style={{ ...styles.barFill, background: textColor, '--target-width': `${pct}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
// ============================================================
// HELPER — pick white or black text based on background brightness
// ============================================================
 
function getContrastText(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 165 ? '#0A0A0A' : '#FFFFFF';
}
 
function blendColors(hex1, hex2, ratio) {
  const c1 = hex1.replace('#', '');
  const c2 = hex2.replace('#', '');
  const r = Math.round(parseInt(c1.substring(0, 2), 16) * (1 - ratio) + parseInt(c2.substring(0, 2), 16) * ratio);
  const g = Math.round(parseInt(c1.substring(2, 4), 16) * (1 - ratio) + parseInt(c2.substring(2, 4), 16) * ratio);
  const b = Math.round(parseInt(c1.substring(4, 6), 16) * (1 - ratio) + parseInt(c2.substring(4, 6), 16) * ratio);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
 
// ============================================================
// STYLES
// ============================================================
 
const styles = {
  page: {
    minHeight: '100vh',
    background: '#000000',
    fontFamily: "'Geist', -apple-system, system-ui, sans-serif",
    color: '#FFFFFF',
    paddingBottom: '60px',
    position: 'relative',
    overflow: 'hidden',
  },
  marqueeBg: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    overflow: 'hidden',
    zIndex: 0,
  },
  marqueeRow: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  marqueeWord: {
    fontFamily: "'Geist', -apple-system, system-ui, sans-serif",
    fontSize: 'clamp(48px, 7vw, 96px)',
    fontWeight: 900,
    letterSpacing: '-0.03em',
    color: 'transparent',
    WebkitTextStroke: '1.5px #1E3A8A',
    opacity: 0.5,
    marginRight: '60px',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  header: {
    textAlign: 'center',
    padding: '56px 24px 28px',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: 'clamp(40px, 6vw, 56px)',
    fontWeight: 800,
    margin: 0,
    letterSpacing: '-0.035em',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: '15px',
    margin: '10px 0 0',
    color: 'rgba(255,255,255,0.5)',
    fontWeight: 400,
  },
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '20px 24px 40px',
    position: 'relative',
    zIndex: 1,
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '420px',
  },
  loadingText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 500,
  },
  matchupRow: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '20px',
    margin: '16px 0 32px',
  },
  card: {
    flex: 1,
    minWidth: 0,
    maxWidth: '480px',
    borderRadius: '14px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
    position: 'relative',
  },
  cardInner: {
    padding: '26px 24px 26px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: '380px',
  },
  confTag: {
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    border: '1px solid',
    padding: '3px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    alignSelf: 'flex-start',
    marginBottom: '12px',
  },
  schoolName: {
    fontSize: '28px',
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  logo: {
    width: '112px',
    height: '112px',
    objectFit: 'contain',
    flexShrink: 0,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  nickname: {
    fontSize: '13px',
    margin: '6px 0 0',
    fontWeight: 500,
  },
  divider: {
    height: '1px',
    margin: '20px 0 18px',
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
    display: 'flex',
    gap: '11px',
    alignItems: 'flex-start',
  },
  factDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    marginTop: '8px',
    flexShrink: 0,
  },
  factText: {
    fontSize: '14.5px',
    lineHeight: 1.45,
    fontWeight: 400,
  },
  resultBlock: {
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid',
  },
  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '12px',
  },
  resultPct: {
    fontSize: '36px',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    lineHeight: 1,
  },
  resultVotes: {
    fontSize: '12px',
    fontWeight: 500,
  },
  barTrack: {
    height: '5px',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: '3px',
  },
  vs: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '13px',
    color: 'rgba(255,255,255,0.35)',
    fontWeight: 600,
    fontStyle: 'italic',
    padding: '0 4px',
  },
  ctaWrap: {
    textAlign: 'center',
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    minHeight: '60px',
    justifyContent: 'center',
  },
  tapPrompt: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
    fontWeight: 500,
  },
  resultsCta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
  },
  resultMeta: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.45)',
    margin: 0,
    fontWeight: 500,
  },
  nextBtn: {
    background: 'transparent',
    color: '#FFFFFF',
    border: '1px solid rgba(255,255,255,0.4)',
    padding: '11px 26px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background 0.15s ease, color 0.15s ease, transform 0.1s ease',
    fontFamily: 'inherit',
  },
};
