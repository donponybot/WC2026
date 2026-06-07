// Pre-built WC2026 squads with formations and positions
// Position codes: GK, RB, CB, LB, CDM, CM, CAM, RM, LM, RW, LW, ST, CF
// Will be overridden by live API data once tournament starts

export const SQUADS = {
  // ── GROUP A ──────────────────────────────────────────────────────
  "Mexico": {
    formation: "4-3-3",
    coach: "Javier Aguirre",
    players: [
      { name: "Ochoa",       pos: "GK",  no: 1  },
      { name: "Sánchez",     pos: "RB",  no: 2  },
      { name: "Montes",      pos: "CB",  no: 3  },
      { name: "Moreno",      pos: "CB",  no: 4  },
      { name: "Gallardo",    pos: "LB",  no: 23 },
      { name: "Álvarez",     pos: "CM",  no: 14 },
      { name: "Herrera",     pos: "CDM", no: 16 },
      { name: "Antuna",      pos: "CM",  no: 11 },
      { name: "Lozano",      pos: "RW",  no: 7  },
      { name: "Jiménez",     pos: "ST",  no: 9  },
      { name: "Vega",        pos: "LW",  no: 17 },
    ]
  },
  "South Africa": {
    formation: "4-4-2",
    coach: "Hugo Broos",
    players: [
      { name: "Williams",    pos: "GK",  no: 1  },
      { name: "Mudau",       pos: "RB",  no: 2  },
      { name: "Mobbie",      pos: "CB",  no: 5  },
      { name: "Sesane",      pos: "CB",  no: 6  },
      { name: "Hlatshwayo",  pos: "LB",  no: 3  },
      { name: "Dolly",       pos: "RM",  no: 11 },
      { name: "Zwane",       pos: "CM",  no: 8  },
      { name: "Mokoena",     pos: "CM",  no: 10 },
      { name: "Tau",         pos: "LM",  no: 7  },
      { name: "Foster",      pos: "ST",  no: 9  },
      { name: "Erasmus",     pos: "ST",  no: 17 },
    ]
  },
  "South Korea": {
    formation: "4-3-3",
    coach: "Hong Myung-bo",
    players: [
      { name: "Seung-gyu",   pos: "GK",  no: 1  },
      { name: "Moon-hwan",   pos: "RB",  no: 2  },
      { name: "Min-jae",     pos: "CB",  no: 4  },
      { name: "Young-gwon",  pos: "CB",  no: 19 },
      { name: "Jin-su",      pos: "LB",  no: 3  },
      { name: "In-beom",     pos: "CM",  no: 8  },
      { name: "Woo-young",   pos: "CDM", no: 16 },
      { name: "Sung-yueng",  pos: "CM",  no: 10 },
      { name: "Heung-min",   pos: "RW",  no: 7  },
      { name: "Gue-sung",    pos: "ST",  no: 9  },
      { name: "Chang-hoon",  pos: "LW",  no: 11 },
    ]
  },
  "Czechia": {
    formation: "4-2-3-1",
    coach: "Ivan Hašek",
    players: [
      { name: "Staněk",      pos: "GK",  no: 1  },
      { name: "Coufal",      pos: "RB",  no: 2  },
      { name: "Hranáč",      pos: "CB",  no: 4  },
      { name: "Čelůstka",    pos: "CB",  no: 5  },
      { name: "Kadeřábek",   pos: "LB",  no: 3  },
      { name: "Souček",      pos: "CDM", no: 6  },
      { name: "Havel",       pos: "CDM", no: 8  },
      { name: "Jankto",      pos: "CAM", no: 10 },
      { name: "Chytil",      pos: "RW",  no: 7  },
      { name: "Schick",      pos: "ST",  no: 9  },
      { name: "Hložek",      pos: "LW",  no: 11 },
    ]
  },
  // ── GROUP B ──────────────────────────────────────────────────────
  "Canada": {
    formation: "4-3-3",
    coach: "Jesse Marsch",
    players: [
      { name: "Crepeau",     pos: "GK",  no: 1  },
      { name: "Johnston",    pos: "RB",  no: 2  },
      { name: "Miller",      pos: "CB",  no: 4  },
      { name: "Vitória",     pos: "CB",  no: 5  },
      { name: "Laryea",      pos: "LB",  no: 3  },
      { name: "Hutchinson",  pos: "CDM", no: 13 },
      { name: "Osorio",      pos: "CM",  no: 8  },
      { name: "Eustáquio",   pos: "CM",  no: 7  },
      { name: "Davies",      pos: "LW",  no: 11 },
      { name: "David",       pos: "ST",  no: 9  },
      { name: "Buchanan",    pos: "RW",  no: 22 },
    ]
  },
  "Bosnia & Herzegovina": {
    formation: "4-3-3",
    coach: "Sergej Barbarez",
    players: [
      { name: "Pirić",       pos: "GK",  no: 1  },
      { name: "Gazibegović", pos: "RB",  no: 2  },
      { name: "Šunjić",      pos: "CB",  no: 5  },
      { name: "Kovačević",   pos: "CB",  no: 4  },
      { name: "Kolašinac",   pos: "LB",  no: 3  },
      { name: "Pjanić",      pos: "CM",  no: 8  },
      { name: "Hadžić",      pos: "CDM", no: 6  },
      { name: "Lulić",       pos: "CM",  no: 10 },
      { name: "Gojak",       pos: "RW",  no: 7  },
      { name: "Džeko",       pos: "ST",  no: 9  },
      { name: "Hajradinović",pos: "LW",  no: 11 },
    ]
  },
  "Qatar": {
    formation: "4-3-3",
    coach: "Tin Đuričić",
    players: [
      { name: "Al-Sheeb",    pos: "GK",  no: 1  },
      { name: "Pedro Miguel",pos: "RB",  no: 2  },
      { name: "Al-Rawi",     pos: "CB",  no: 5  },
      { name: "Khoukhi",     pos: "CB",  no: 4  },
      { name: "Homam",       pos: "LB",  no: 17 },
      { name: "Al-Haydos",   pos: "CM",  no: 10 },
      { name: "Al-Ahrak",    pos: "CDM", no: 6  },
      { name: "Boudiaf",     pos: "CM",  no: 8  },
      { name: "Afif",        pos: "LW",  no: 11 },
      { name: "Al-Moez",     pos: "ST",  no: 19 },
      { name: "Muntari",     pos: "RW",  no: 9  },
    ]
  },
  "Switzerland": {
    formation: "4-3-3",
    coach: "Murat Yakin",
    players: [
      { name: "Sommer",      pos: "GK",  no: 1  },
      { name: "Widmer",      pos: "RB",  no: 2  },
      { name: "Elvedi",      pos: "CB",  no: 5  },
      { name: "Akanji",      pos: "CB",  no: 4  },
      { name: "Rodriguez",   pos: "LB",  no: 13 },
      { name: "Freuler",     pos: "CM",  no: 8  },
      { name: "Xhaka",       pos: "CDM", no: 10 },
      { name: "Sow",         pos: "CM",  no: 6  },
      { name: "Shaqiri",     pos: "RW",  no: 23 },
      { name: "Embolo",      pos: "ST",  no: 7  },
      { name: "Vargas",      pos: "LW",  no: 11 },
    ]
  },
  // ── GROUP C ──────────────────────────────────────────────────────
  "Brazil": {
    formation: "4-3-3",
    coach: "Dorival Júnior",
    players: [
      { name: "Alisson",     pos: "GK",  no: 1  },
      { name: "Danilo",      pos: "RB",  no: 2  },
      { name: "Militão",     pos: "CB",  no: 3  },
      { name: "Marquinhos",  pos: "CB",  no: 4  },
      { name: "Guilherme",   pos: "LB",  no: 6  },
      { name: "Bruno G.",    pos: "CDM", no: 5  },
      { name: "Paquetá",     pos: "CM",  no: 8  },
      { name: "Rodrygo",     pos: "CM",  no: 11 },
      { name: "Raphinha",    pos: "RW",  no: 10 },
      { name: "Endrick",     pos: "ST",  no: 9  },
      { name: "Vinicius Jr", pos: "LW",  no: 7  },
    ]
  },
  "Morocco": {
    formation: "4-3-3",
    coach: "Walid Regragui",
    players: [
      { name: "Bounou",      pos: "GK",  no: 1  },
      { name: "Hakimi",      pos: "RB",  no: 2  },
      { name: "Saïss",       pos: "CB",  no: 5  },
      { name: "Aguerd",      pos: "CB",  no: 6  },
      { name: "Mazraoui",    pos: "LB",  no: 3  },
      { name: "Ounahi",      pos: "CM",  no: 8  },
      { name: "Amrabat",     pos: "CDM", no: 4  },
      { name: "Ziyech",      pos: "CM",  no: 7  },
      { name: "En-Nesyri",   pos: "ST",  no: 9  },
      { name: "Boufal",      pos: "LW",  no: 11 },
      { name: "Ezzalzouli",  pos: "RW",  no: 17 },
    ]
  },
  "Haiti": {
    formation: "4-4-2",
    coach: "Marc Collat",
    players: [
      { name: "Vito",        pos: "GK",  no: 1  },
      { name: "Rosier",      pos: "RB",  no: 2  },
      { name: "Borgella",    pos: "CB",  no: 5  },
      { name: "Vorbe",       pos: "CB",  no: 4  },
      { name: "Edermarque",  pos: "LB",  no: 3  },
      { name: "Désiré",      pos: "RM",  no: 7  },
      { name: "Metayer",     pos: "CM",  no: 8  },
      { name: "Angella",     pos: "CM",  no: 6  },
      { name: "Celestin",    pos: "LM",  no: 11 },
      { name: "Pierrot",     pos: "ST",  no: 9  },
      { name: "Francoeur",   pos: "ST",  no: 17 },
    ]
  },
  "Scotland": {
    formation: "4-3-3",
    coach: "Steve Clarke",
    players: [
      { name: "Gordon",      pos: "GK",  no: 1  },
      { name: "Patterson",   pos: "RB",  no: 2  },
      { name: "Hanley",      pos: "CB",  no: 5  },
      { name: "Hendry",      pos: "CB",  no: 6  },
      { name: "Robertson",   pos: "LB",  no: 3  },
      { name: "McGregor",    pos: "CM",  no: 8  },
      { name: "Gilmour",     pos: "CDM", no: 4  },
      { name: "McLean",      pos: "CM",  no: 10 },
      { name: "Christie",    pos: "RW",  no: 7  },
      { name: "Adams",       pos: "ST",  no: 9  },
      { name: "McGinn",      pos: "LW",  no: 11 },
    ]
  },
  // ── GROUP D ──────────────────────────────────────────────────────
  "USA": {
    formation: "4-3-3",
    coach: "Mauricio Pochettino",
    players: [
      { name: "Turner",      pos: "GK",  no: 1  },
      { name: "Dest",        pos: "RB",  no: 2  },
      { name: "Richards",    pos: "CB",  no: 4  },
      { name: "Zimmerman",   pos: "CB",  no: 5  },
      { name: "Robinson",    pos: "LB",  no: 3  },
      { name: "McKennie",    pos: "CM",  no: 8  },
      { name: "Adams",       pos: "CDM", no: 4  },
      { name: "Musah",       pos: "CM",  no: 6  },
      { name: "Pulisic",     pos: "RW",  no: 10 },
      { name: "Folarin",     pos: "ST",  no: 9  },
      { name: "Weah",        pos: "LW",  no: 21 },
    ]
  },
  "Paraguay": {
    formation: "4-3-3",
    coach: "Gustavo Alfaro",
    players: [
      { name: "Silva",       pos: "GK",  no: 1  },
      { name: "Arzamendia",  pos: "RB",  no: 2  },
      { name: "Alonso",      pos: "CB",  no: 5  },
      { name: "Balbuena",    pos: "CB",  no: 4  },
      { name: "Espinoza",    pos: "LB",  no: 3  },
      { name: "Villasanti",  pos: "CDM", no: 8  },
      { name: "Cubas",       pos: "CM",  no: 6  },
      { name: "Gómez",       pos: "CM",  no: 10 },
      { name: "Almirón",     pos: "RW",  no: 7  },
      { name: "Sanabria",    pos: "ST",  no: 9  },
      { name: "Enciso",      pos: "LW",  no: 11 },
    ]
  },
  "Australia": {
    formation: "4-3-3",
    coach: "Tony Popovic",
    players: [
      { name: "Ryan",        pos: "GK",  no: 1  },
      { name: "Degenek",     pos: "RB",  no: 2  },
      { name: "Rowles",      pos: "CB",  no: 4  },
      { name: "Souttar",     pos: "CB",  no: 5  },
      { name: "Behich",      pos: "LB",  no: 3  },
      { name: "Irvine",      pos: "CM",  no: 8  },
      { name: "Mooy",        pos: "CDM", no: 13 },
      { name: "Hrustic",     pos: "CM",  no: 10 },
      { name: "Leckie",      pos: "RW",  no: 7  },
      { name: "Duke",        pos: "ST",  no: 9  },
      { name: "Mabil",       pos: "LW",  no: 11 },
    ]
  },
  "Türkiye": {
    formation: "4-2-3-1",
    coach: "Vincenzo Montella",
    players: [
      { name: "Çakır",       pos: "GK",  no: 1  },
      { name: "Müldür",      pos: "RB",  no: 2  },
      { name: "Demiral",     pos: "CB",  no: 3  },
      { name: "Ayhan",       pos: "CB",  no: 4  },
      { name: "Kadıoğlu",    pos: "LB",  no: 18 },
      { name: "Özcan",       pos: "CDM", no: 6  },
      { name: "Yüksek",      pos: "CDM", no: 8  },
      { name: "Güler",       pos: "CAM", no: 10 },
      { name: "Yazıcı",      pos: "RW",  no: 11 },
      { name: "Yılmaz",      pos: "ST",  no: 9  },
      { name: "Aktürkoğlu",  pos: "LW",  no: 17 },
    ]
  },
  // ── GROUP E ──────────────────────────────────────────────────────
  "Germany": {
    formation: "4-2-3-1",
    coach: "Julian Nagelsmann",
    players: [
      { name: "Neuer",       pos: "GK",  no: 1  },
      { name: "Kimmich",     pos: "RB",  no: 6  },
      { name: "Rüdiger",     pos: "CB",  no: 2  },
      { name: "Tah",         pos: "CB",  no: 4  },
      { name: "Raum",        pos: "LB",  no: 3  },
      { name: "Andrich",     pos: "CDM", no: 23 },
      { name: "Kroos",       pos: "CDM", no: 8  },
      { name: "Musiala",     pos: "CAM", no: 10 },
      { name: "Sané",        pos: "RW",  no: 19 },
      { name: "Havertz",     pos: "ST",  no: 7  },
      { name: "Wirtz",       pos: "LW",  no: 17 },
    ]
  },
  "Ivory Coast": {
    formation: "4-3-3",
    coach: "Emerse Faé",
    players: [
      { name: "Sangaré",     pos: "GK",  no: 1  },
      { name: "Aurier",      pos: "RB",  no: 2  },
      { name: "Bailly",      pos: "CB",  no: 3  },
      { name: "Deli",        pos: "CB",  no: 5  },
      { name: "Konan",       pos: "LB",  no: 18 },
      { name: "Sangaré",     pos: "CDM", no: 4  },
      { name: "Kessié",      pos: "CM",  no: 8  },
      { name: "Zaha",        pos: "CM",  no: 17 },
      { name: "Pépé",        pos: "RW",  no: 7  },
      { name: "Haller",      pos: "ST",  no: 9  },
      { name: "Gradel",      pos: "LW",  no: 11 },
    ]
  },
  "Ecuador": {
    formation: "4-3-3",
    coach: "Sebastián Beccacece",
    players: [
      { name: "Galíndez",    pos: "GK",  no: 1  },
      { name: "Preciado",    pos: "RB",  no: 2  },
      { name: "Hincapié",    pos: "CB",  no: 4  },
      { name: "Arboleda",    pos: "CB",  no: 3  },
      { name: "Estupiñán",   pos: "LB",  no: 17 },
      { name: "Franco",      pos: "CDM", no: 8  },
      { name: "Gruezo",      pos: "CM",  no: 5  },
      { name: "Caicedo",     pos: "CM",  no: 6  },
      { name: "Plata",       pos: "RW",  no: 7  },
      { name: "Valencia",    pos: "ST",  no: 13 },
      { name: "Ibarra",      pos: "LW",  no: 11 },
    ]
  },
  "Curaçao": {
    formation: "4-4-2",
    coach: "Remko Bicentini",
    players: [
      { name: "Virginie",    pos: "GK",  no: 1  },
      { name: "Felida",      pos: "RB",  no: 2  },
      { name: "Emeran",      pos: "CB",  no: 5  },
      { name: "Martha",      pos: "CB",  no: 4  },
      { name: "Sulvaran",    pos: "LB",  no: 3  },
      { name: "Claasens",    pos: "RM",  no: 7  },
      { name: "Cijntje",     pos: "CM",  no: 8  },
      { name: "Frederiks",   pos: "CM",  no: 6  },
      { name: "Doran",       pos: "LM",  no: 11 },
      { name: "Mijnals",     pos: "ST",  no: 9  },
      { name: "Marchena",    pos: "ST",  no: 10 },
    ]
  },
  // ── GROUP F ──────────────────────────────────────────────────────
  "Netherlands": {
    formation: "4-3-3",
    coach: "Ronald Koeman",
    players: [
      { name: "Flekken",     pos: "GK",  no: 1  },
      { name: "Dumfries",    pos: "RB",  no: 22 },
      { name: "De Ligt",     pos: "CB",  no: 4  },
      { name: "Van Dijk",    pos: "CB",  no: 3  },
      { name: "Blind",       pos: "LB",  no: 5  },
      { name: "De Jong",     pos: "CM",  no: 21 },
      { name: "Schouten",    pos: "CDM", no: 6  },
      { name: "Koopmeiners", pos: "CM",  no: 8  },
      { name: "Bergwijn",    pos: "RW",  no: 7  },
      { name: "Depay",       pos: "ST",  no: 10 },
      { name: "Gakpo",       pos: "LW",  no: 11 },
    ]
  },
  "Japan": {
    formation: "4-3-3",
    coach: "Hajime Moriyasu",
    players: [
      { name: "Gonda",       pos: "GK",  no: 1  },
      { name: "Yamane",      pos: "RB",  no: 2  },
      { name: "Itakura",     pos: "CB",  no: 4  },
      { name: "Yoshida",     pos: "CB",  no: 22 },
      { name: "Nagatomo",    pos: "LB",  no: 5  },
      { name: "Endo",        pos: "CDM", no: 6  },
      { name: "Kamada",      pos: "CM",  no: 10 },
      { name: "Morita",      pos: "CM",  no: 8  },
      { name: "Doan",        pos: "RW",  no: 7  },
      { name: "Ueda",        pos: "ST",  no: 9  },
      { name: "Minamino",    pos: "LW",  no: 11 },
    ]
  },
  "Sweden": {
    formation: "4-3-3",
    coach: "Jon Dahl Tomasson",
    players: [
      { name: "Olsen",       pos: "GK",  no: 1  },
      { name: "Lustig",      pos: "RB",  no: 2  },
      { name: "Lindelöf",    pos: "CB",  no: 4  },
      { name: "Danielson",   pos: "CB",  no: 5  },
      { name: "Augustinsson",pos: "LB",  no: 3  },
      { name: "Svanberg",    pos: "CDM", no: 8  },
      { name: "Claesson",    pos: "CM",  no: 6  },
      { name: "Olsson",      pos: "CM",  no: 11 },
      { name: "Kulusevski",  pos: "RW",  no: 17 },
      { name: "Gyökeres",    pos: "ST",  no: 9  },
      { name: "Isak",        pos: "LW",  no: 10 },
    ]
  },
  "Tunisia": {
    formation: "4-3-3",
    coach: "Jalel Kadri",
    players: [
      { name: "Dahmen",      pos: "GK",  no: 1  },
      { name: "Bronn",       pos: "RB",  no: 2  },
      { name: "Talbi",       pos: "CB",  no: 5  },
      { name: "Meriah",      pos: "CB",  no: 4  },
      { name: "Abdi",        pos: "LB",  no: 3  },
      { name: "Laidouni",    pos: "CDM", no: 6  },
      { name: "Skhiri",      pos: "CM",  no: 8  },
      { name: "Ben Amor",    pos: "CM",  no: 10 },
      { name: "Slimane",     pos: "RW",  no: 7  },
      { name: "Jebali",      pos: "ST",  no: 9  },
      { name: "Msakni",      pos: "LW",  no: 11 },
    ]
  },
  // ── GROUP G ──────────────────────────────────────────────────────
  "Belgium": {
    formation: "4-3-3",
    coach: "Domenico Tedesco",
    players: [
      { name: "Casteels",    pos: "GK",  no: 1  },
      { name: "Castagne",    pos: "RB",  no: 2  },
      { name: "Faes",        pos: "CB",  no: 3  },
      { name: "Vertonghen",  pos: "CB",  no: 5  },
      { name: "Theate",      pos: "LB",  no: 23 },
      { name: "Witsel",      pos: "CDM", no: 6  },
      { name: "Onana",       pos: "CM",  no: 8  },
      { name: "De Bruyne",   pos: "CAM", no: 7  },
      { name: "Doku",        pos: "RW",  no: 11 },
      { name: "Lukaku",      pos: "ST",  no: 9  },
      { name: "Trossard",    pos: "LW",  no: 19 },
    ]
  },
  "Egypt": {
    formation: "4-2-3-1",
    coach: "Hossam Hassan",
    players: [
      { name: "El-Shenawy",  pos: "GK",  no: 1  },
      { name: "Kamal",       pos: "RB",  no: 2  },
      { name: "Hegazi",      pos: "CB",  no: 5  },
      { name: "Abdelmonem",  pos: "CB",  no: 4  },
      { name: "El-Wensh",    pos: "LB",  no: 3  },
      { name: "Elneny",      pos: "CDM", no: 8  },
      { name: "Hamdi",       pos: "CDM", no: 6  },
      { name: "Salah",       pos: "CAM", no: 10 },
      { name: "Trezeguet",   pos: "RW",  no: 11 },
      { name: "Mostafa",     pos: "ST",  no: 9  },
      { name: "Marmoush",    pos: "LW",  no: 7  },
    ]
  },
  "Iran": {
    formation: "4-3-3",
    coach: "Amir Ghalenoei",
    players: [
      { name: "Beiranvand",  pos: "GK",  no: 1  },
      { name: "Moharrami",   pos: "RB",  no: 2  },
      { name: "Pouraliganji",pos: "CB",  no: 5  },
      { name: "Hosseini",    pos: "CB",  no: 4  },
      { name: "Mohammadi",   pos: "LB",  no: 3  },
      { name: "Nourollahi",  pos: "CDM", no: 6  },
      { name: "Hajsafi",     pos: "CM",  no: 8  },
      { name: "Karimi",      pos: "CM",  no: 10 },
      { name: "Jahanbakhsh", pos: "RW",  no: 7  },
      { name: "Taremi",      pos: "ST",  no: 9  },
      { name: "Ansarifard",  pos: "LW",  no: 11 },
    ]
  },
  "New Zealand": {
    formation: "4-4-2",
    coach: "Darren Bazeley",
    players: [
      { name: "Sail",        pos: "GK",  no: 1  },
      { name: "Woud",        pos: "RB",  no: 2  },
      { name: "Boxall",      pos: "CB",  no: 5  },
      { name: "Payne",       pos: "CB",  no: 4  },
      { name: "Edge",        pos: "LB",  no: 3  },
      { name: "Cacace",      pos: "RM",  no: 7  },
      { name: "McGlinchey",  pos: "CM",  no: 8  },
      { name: "Bell",        pos: "CM",  no: 6  },
      { name: "Waine",       pos: "LM",  no: 11 },
      { name: "Wood",        pos: "ST",  no: 9  },
      { name: "Garbett",     pos: "ST",  no: 10 },
    ]
  },
  // ── GROUP H ──────────────────────────────────────────────────────
  "Spain": {
    formation: "4-3-3",
    coach: "Luis de la Fuente",
    players: [
      { name: "Unai Simón",  pos: "GK",  no: 1  },
      { name: "Carvajal",    pos: "RB",  no: 2  },
      { name: "Le Normand",  pos: "CB",  no: 4  },
      { name: "Laporte",     pos: "CB",  no: 14 },
      { name: "Cucurella",   pos: "LB",  no: 3  },
      { name: "Rodri",       pos: "CDM", no: 16 },
      { name: "Pedri",       pos: "CM",  no: 8  },
      { name: "Fabián",      pos: "CM",  no: 12 },
      { name: "Yamal",       pos: "RW",  no: 19 },
      { name: "Morata",      pos: "ST",  no: 7  },
      { name: "Williams N.", pos: "LW",  no: 17 },
    ]
  },
  "Uruguay": {
    formation: "4-3-3",
    coach: "Marcelo Bielsa",
    players: [
      { name: "Rochet",      pos: "GK",  no: 1  },
      { name: "Nández",      pos: "RB",  no: 2  },
      { name: "Giménez",     pos: "CB",  no: 3  },
      { name: "Godín",       pos: "CB",  no: 4  },
      { name: "Olivera",     pos: "LB",  no: 22 },
      { name: "Bentancur",   pos: "CM",  no: 8  },
      { name: "Torreira",    pos: "CDM", no: 6  },
      { name: "Valverde",    pos: "CM",  no: 14 },
      { name: "De Arrascaeta",pos:"RW",  no: 7  },
      { name: "Núñez",       pos: "ST",  no: 9  },
      { name: "Suárez",      pos: "LW",  no: 9  },
    ]
  },
  "Saudi Arabia": {
    formation: "4-3-3",
    coach: "Roberto Mancini",
    players: [
      { name: "Al-Owais",    pos: "GK",  no: 1  },
      { name: "Al-Ghannam",  pos: "RB",  no: 2  },
      { name: "Al-Amri",     pos: "CB",  no: 5  },
      { name: "Tambakti",    pos: "CB",  no: 4  },
      { name: "Al-Shahrani", pos: "LB",  no: 3  },
      { name: "Al-Malki",    pos: "CDM", no: 8  },
      { name: "Kanno",       pos: "CM",  no: 6  },
      { name: "Al-Dawsari",  pos: "CM",  no: 10 },
      { name: "Al-Buraikan", pos: "RW",  no: 7  },
      { name: "Al-Shehri",   pos: "ST",  no: 9  },
      { name: "Bahebri",     pos: "LW",  no: 11 },
    ]
  },
  "Cape Verde": {
    formation: "4-3-3",
    coach: "Bubista",
    players: [
      { name: "Vozinha",     pos: "GK",  no: 1  },
      { name: "Stopira",     pos: "RB",  no: 2  },
      { name: "Semedo",      pos: "CB",  no: 5  },
      { name: "Fali",        pos: "CB",  no: 4  },
      { name: "Filho",       pos: "LB",  no: 3  },
      { name: "Tavares",     pos: "CDM", no: 6  },
      { name: "Lopes",       pos: "CM",  no: 8  },
      { name: "Andrade",     pos: "CM",  no: 10 },
      { name: "Jamiro",      pos: "RW",  no: 7  },
      { name: "Carlinhos",   pos: "ST",  no: 9  },
      { name: "Ryan M.",     pos: "LW",  no: 11 },
    ]
  },
  // ── GROUP I ──────────────────────────────────────────────────────
  "France": {
    formation: "4-3-3",
    coach: "Didier Deschamps",
    players: [
      { name: "Maignan",     pos: "GK",  no: 16 },
      { name: "Kounde",      pos: "RB",  no: 5  },
      { name: "Upamecano",   pos: "CB",  no: 4  },
      { name: "Saliba",      pos: "CB",  no: 17 },
      { name: "T. Hernandez",pos: "LB",  no: 22 },
      { name: "Camavinga",   pos: "CM",  no: 14 },
      { name: "Tchouameni",  pos: "CDM", no: 8  },
      { name: "Rabiot",      pos: "CM",  no: 18 },
      { name: "Dembélé",     pos: "RW",  no: 11 },
      { name: "Mbappé",      pos: "ST",  no: 10 },
      { name: "Thuram",      pos: "LW",  no: 9  },
    ]
  },
  "Senegal": {
    formation: "4-3-3",
    coach: "Aliou Cissé",
    players: [
      { name: "Mendy",       pos: "GK",  no: 1  },
      { name: "Sabaly",      pos: "RB",  no: 2  },
      { name: "Koulibaly",   pos: "CB",  no: 5  },
      { name: "Diallo",      pos: "CB",  no: 4  },
      { name: "Jakobs",      pos: "LB",  no: 3  },
      { name: "Nampalys",    pos: "CDM", no: 6  },
      { name: "Gueye",       pos: "CM",  no: 8  },
      { name: "Kouyaté",     pos: "CM",  no: 10 },
      { name: "Sarr",        pos: "RW",  no: 7  },
      { name: "Dia",         pos: "ST",  no: 9  },
      { name: "Mané",        pos: "LW",  no: 11 },
    ]
  },
  "Norway": {
    formation: "4-3-3",
    coach: "Ståle Solbakken",
    players: [
      { name: "Nyland",      pos: "GK",  no: 1  },
      { name: "Pedersen",    pos: "RB",  no: 2  },
      { name: "Ajer",        pos: "CB",  no: 5  },
      { name: "Østigård",    pos: "CB",  no: 4  },
      { name: "Meling",      pos: "LB",  no: 3  },
      { name: "Berg",        pos: "CDM", no: 8  },
      { name: "Thorsby",     pos: "CM",  no: 6  },
      { name: "Sørloth",     pos: "CM",  no: 17 },
      { name: "Ødegaard",    pos: "CAM", no: 10 },
      { name: "Haaland",     pos: "ST",  no: 9  },
      { name: "Elyounoussi", pos: "LW",  no: 11 },
    ]
  },
  "Iraq": {
    formation: "4-3-3",
    coach: "Jesús Casas",
    players: [
      { name: "Doham",       pos: "GK",  no: 1  },
      { name: "Adnan",       pos: "RB",  no: 2  },
      { name: "Safa",        pos: "CB",  no: 5  },
      { name: "Jassim",      pos: "CB",  no: 4  },
      { name: "Karrar",      pos: "LB",  no: 3  },
      { name: "Saad",        pos: "CDM", no: 6  },
      { name: "Mahdi",       pos: "CM",  no: 8  },
      { name: "Ibrahim",     pos: "CM",  no: 10 },
      { name: "Ameen",       pos: "RW",  no: 7  },
      { name: "Mohanad",     pos: "ST",  no: 9  },
      { name: "Alaa",        pos: "LW",  no: 11 },
    ]
  },
  // ── GROUP J ──────────────────────────────────────────────────────
  "Argentina": {
    formation: "4-3-3",
    coach: "Lionel Scaloni",
    players: [
      { name: "E. Martínez", pos: "GK",  no: 23 },
      { name: "Molina",      pos: "RB",  no: 26 },
      { name: "Romero",      pos: "CB",  no: 13 },
      { name: "Otamendi",    pos: "CB",  no: 19 },
      { name: "Acuña",       pos: "LB",  no: 8  },
      { name: "De Paul",     pos: "CM",  no: 7  },
      { name: "Mac Allister", pos:"CDM", no: 5  },
      { name: "Enzo Fern.",  pos: "CM",  no: 24 },
      { name: "Di María",    pos: "RW",  no: 11 },
      { name: "Messi",       pos: "RW",  no: 10 },
      { name: "Álvarez J.",  pos: "ST",  no: 9  },
    ]
  },
  "Algeria": {
    formation: "4-3-3",
    coach: "Vladimir Petkovic",
    players: [
      { name: "Mbolhi",      pos: "GK",  no: 1  },
      { name: "Atal",        pos: "RB",  no: 2  },
      { name: "Mandi",       pos: "CB",  no: 5  },
      { name: "Benlamri",    pos: "CB",  no: 4  },
      { name: "Tahrat",      pos: "LB",  no: 3  },
      { name: "Bennacer",    pos: "CDM", no: 8  },
      { name: "Bensebaini",  pos: "CM",  no: 6  },
      { name: "Guedioura",   pos: "CM",  no: 10 },
      { name: "Belaïli",     pos: "RW",  no: 7  },
      { name: "Slimani",     pos: "ST",  no: 9  },
      { name: "Mahrez",      pos: "LW",  no: 11 },
    ]
  },
  "Austria": {
    formation: "4-3-3",
    coach: "Ralf Rangnick",
    players: [
      { name: "Pentz",       pos: "GK",  no: 1  },
      { name: "Trimmel",     pos: "RB",  no: 2  },
      { name: "Lienhart",    pos: "CB",  no: 4  },
      { name: "Posch",       pos: "CB",  no: 5  },
      { name: "Wöber",       pos: "LB",  no: 3  },
      { name: "Seiwald",     pos: "CDM", no: 8  },
      { name: "Laimer",      pos: "CM",  no: 6  },
      { name: "Sabitzer",    pos: "CM",  no: 10 },
      { name: "Baumgartner", pos: "RW",  no: 7  },
      { name: "Gregoritsch", pos: "ST",  no: 9  },
      { name: "Arnautovic",  pos: "LW",  no: 11 },
    ]
  },
  "Jordan": {
    formation: "4-4-2",
    coach: "Hussein Ammouta",
    players: [
      { name: "Shafi",       pos: "GK",  no: 1  },
      { name: "Al-Rawabdeh", pos: "RB",  no: 2  },
      { name: "Nasib",       pos: "CB",  no: 5  },
      { name: "Khreis",      pos: "CB",  no: 4  },
      { name: "Bsoul",       pos: "LB",  no: 3  },
      { name: "Naimat",      pos: "RM",  no: 7  },
      { name: "Tamari",      pos: "CM",  no: 8  },
      { name: "Musa",        pos: "CM",  no: 6  },
      { name: "Hasan",       pos: "LM",  no: 11 },
      { name: "Al-Dameq",    pos: "ST",  no: 9  },
      { name: "Bani Attiah", pos: "ST",  no: 10 },
    ]
  },
  // ── GROUP K ──────────────────────────────────────────────────────
  "Portugal": {
    formation: "4-3-3",
    coach: "Roberto Martínez",
    players: [
      { name: "Costa",       pos: "GK",  no: 1  },
      { name: "Cancelo",     pos: "RB",  no: 20 },
      { name: "Inácio",      pos: "CB",  no: 4  },
      { name: "Dias",        pos: "CB",  no: 6  },
      { name: "Mendes N.",   pos: "LB",  no: 19 },
      { name: "Palhinha",    pos: "CDM", no: 26 },
      { name: "Vitinha",     pos: "CM",  no: 16 },
      { name: "Bruno F.",    pos: "CM",  no: 8  },
      { name: "Silva B.",    pos: "RW",  no: 11 },
      { name: "Ronaldo",     pos: "ST",  no: 7  },
      { name: "Leão",        pos: "LW",  no: 22 },
    ]
  },
  "Colombia": {
    formation: "4-3-3",
    coach: "Néstor Lorenzo",
    players: [
      { name: "Vargas",      pos: "GK",  no: 1  },
      { name: "Muñoz",       pos: "RB",  no: 2  },
      { name: "Lucumí",      pos: "CB",  no: 3  },
      { name: "Sánchez",     pos: "CB",  no: 4  },
      { name: "Mojica",      pos: "LB",  no: 23 },
      { name: "Lerma",       pos: "CDM", no: 8  },
      { name: "Uribe",       pos: "CM",  no: 6  },
      { name: "Díaz L.",     pos: "CM",  no: 10 },
      { name: "Cuadrado",    pos: "RW",  no: 11 },
      { name: "Borré",       pos: "ST",  no: 9  },
      { name: "Díaz L.D.",   pos: "LW",  no: 7  },
    ]
  },
  "Congo DR": {
    formation: "4-3-3",
    coach: "Sébastien Desabre",
    players: [
      { name: "Kiassumbua",  pos: "GK",  no: 1  },
      { name: "Mukiele",     pos: "RB",  no: 2  },
      { name: "Mbemba",      pos: "CB",  no: 5  },
      { name: "Kayembe",     pos: "CB",  no: 4  },
      { name: "Bolasie",     pos: "LB",  no: 3  },
      { name: "Tshiembe",    pos: "CDM", no: 6  },
      { name: "Lopy",        pos: "CM",  no: 8  },
      { name: "Kakuta",      pos: "CM",  no: 10 },
      { name: "Bakambu",     pos: "RW",  no: 7  },
      { name: "Bongonda",    pos: "ST",  no: 9  },
      { name: "Mbokani",     pos: "LW",  no: 11 },
    ]
  },
  "Uzbekistan": {
    formation: "4-3-3",
    coach: "Srecko Katanec",
    players: [
      { name: "Nesterov",    pos: "GK",  no: 1  },
      { name: "Yusupov",     pos: "RB",  no: 2  },
      { name: "Ashurmatov",  pos: "CB",  no: 5  },
      { name: "Kholmatov",   pos: "CB",  no: 4  },
      { name: "Masharipov",  pos: "LB",  no: 3  },
      { name: "Tursunov",    pos: "CDM", no: 6  },
      { name: "Shomurodov",  pos: "CM",  no: 9  },
      { name: "Hamrobekov",  pos: "CM",  no: 8  },
      { name: "Alijonov",    pos: "RW",  no: 7  },
      { name: "Ergashev",    pos: "ST",  no: 11 },
      { name: "Djeparov",    pos: "LW",  no: 10 },
    ]
  },
  // ── GROUP L ──────────────────────────────────────────────────────
  "England": {
    formation: "4-3-3",
    coach: "Thomas Tuchel",
    players: [
      { name: "Pickford",    pos: "GK",  no: 1  },
      { name: "Alexander-A.",pos: "RB",  no: 2  },
      { name: "Stones",      pos: "CB",  no: 5  },
      { name: "Guehi",       pos: "CB",  no: 6  },
      { name: "Trippier",    pos: "LB",  no: 3  },
      { name: "Bellingham",  pos: "CM",  no: 22 },
      { name: "Rice",        pos: "CDM", no: 4  },
      { name: "Mainoo",      pos: "CM",  no: 26 },
      { name: "Saka",        pos: "RW",  no: 7  },
      { name: "Kane",        pos: "ST",  no: 9  },
      { name: "Foden",       pos: "LW",  no: 11 },
    ]
  },
  "Croatia": {
    formation: "4-3-3",
    coach: "Zlatko Dalić",
    players: [
      { name: "Livaković",   pos: "GK",  no: 1  },
      { name: "Juranović",   pos: "RB",  no: 2  },
      { name: "Šutalo",      pos: "CB",  no: 5  },
      { name: "Gvardiol",    pos: "CB",  no: 24 },
      { name: "Barisic",     pos: "LB",  no: 3  },
      { name: "Modrić",      pos: "CM",  no: 10 },
      { name: "Brozović",    pos: "CDM", no: 11 },
      { name: "Kovačić",     pos: "CM",  no: 8  },
      { name: "Brekalo",     pos: "RW",  no: 7  },
      { name: "Kramarić",    pos: "ST",  no: 9  },
      { name: "Ivanušec",    pos: "LW",  no: 17 },
    ]
  },
  "Ghana": {
    formation: "4-3-3",
    coach: "Otto Addo",
    players: [
      { name: "Ati-Zigi",    pos: "GK",  no: 1  },
      { name: "Lamptey",     pos: "RB",  no: 2  },
      { name: "Amartey",     pos: "CB",  no: 5  },
      { name: "Djiku",       pos: "CB",  no: 4  },
      { name: "Mensah",      pos: "LB",  no: 3  },
      { name: "Partey",      pos: "CDM", no: 8  },
      { name: "Samed",       pos: "CM",  no: 6  },
      { name: "Kudus",       pos: "CM",  no: 10 },
      { name: "Ayew A.",     pos: "RW",  no: 7  },
      { name: "Ayew J.",     pos: "ST",  no: 9  },
      { name: "Williams",    pos: "LW",  no: 11 },
    ]
  },
  "Panama": {
    formation: "4-4-2",
    coach: "Thomas Christiansen",
    players: [
      { name: "Mosquera",    pos: "GK",  no: 1  },
      { name: "Miller",      pos: "RB",  no: 2  },
      { name: "Davis",       pos: "CB",  no: 5  },
      { name: "Escobar",     pos: "CB",  no: 4  },
      { name: "Murillo",     pos: "LB",  no: 3  },
      { name: "Godoy",       pos: "RM",  no: 7  },
      { name: "Gómez",       pos: "CM",  no: 8  },
      { name: "Carrasquilla",pos: "CM",  no: 6  },
      { name: "Quintero",    pos: "LM",  no: 11 },
      { name: "Fajardo",     pos: "ST",  no: 9  },
      { name: "Córdoba",     pos: "ST",  no: 10 },
    ]
  },
};

// Formation layouts — defines where each position sits on the pitch (x%, y%)
// x: 0=left, 100=right  y: 0=top(attack), 100=bottom(GK end)
export const FORMATION_LAYOUTS = {
  "4-3-3": {
    GK:  { x: 50, y: 90 },
    RB:  { x: 82, y: 74 }, CB:  { x: 62, y: 74 },
    CB2: { x: 38, y: 74 }, LB:  { x: 18, y: 74 },
    CM:  { x: 72, y: 52 }, CDM: { x: 50, y: 55 }, CM2: { x: 28, y: 52 },
    RW:  { x: 80, y: 22 }, ST:  { x: 50, y: 18 }, LW:  { x: 20, y: 22 },
    // CAM variant
    CAM: { x: 50, y: 38 },
    RM:  { x: 80, y: 38 }, LM:  { x: 20, y: 38 },
  },
  "4-2-3-1": {
    GK:  { x: 50, y: 90 },
    RB:  { x: 82, y: 74 }, CB:  { x: 62, y: 74 },
    CB2: { x: 38, y: 74 }, LB:  { x: 18, y: 74 },
    CDM: { x: 62, y: 58 }, CDM2:{ x: 38, y: 58 },
    RW:  { x: 78, y: 38 }, CAM: { x: 50, y: 38 }, LW:  { x: 22, y: 38 },
    ST:  { x: 50, y: 18 },
  },
  "4-4-2": {
    GK:  { x: 50, y: 90 },
    RB:  { x: 82, y: 74 }, CB:  { x: 62, y: 74 },
    CB2: { x: 38, y: 74 }, LB:  { x: 18, y: 74 },
    RM:  { x: 82, y: 50 }, CM:  { x: 62, y: 50 },
    CM2: { x: 38, y: 50 }, LM:  { x: 18, y: 50 },
    ST:  { x: 65, y: 18 }, ST2: { x: 35, y: 18 },
  },
};

// Map player position codes to formation slot keys
export function assignPositionSlots(players, formation) {
  const layout = FORMATION_LAYOUTS[formation] || FORMATION_LAYOUTS["4-3-3"];
  const usedSlots = new Set();
  const result = [];

  // Slot priority per position code
  const slotPriority = {
    GK:  ['GK'],
    RB:  ['RB'],
    CB:  ['CB', 'CB2'],
    LB:  ['LB'],
    CDM: ['CDM', 'CDM2'],
    CM:  ['CM', 'CM2'],
    CAM: ['CAM'],
    RM:  ['RM'],
    LM:  ['LM'],
    RW:  ['RW'],
    LW:  ['LW'],
    ST:  ['ST', 'ST2'],
    CF:  ['ST', 'CAM'],
  };

  for (const player of players) {
    const slots = slotPriority[player.pos] || ['CM'];
    let assigned = null;
    for (const slot of slots) {
      if (layout[slot] && !usedSlots.has(slot)) {
        assigned = slot;
        usedSlots.add(slot);
        break;
      }
    }
    // Fallback: find any unused slot
    if (!assigned) {
      for (const slot of Object.keys(layout)) {
        if (!usedSlots.has(slot)) {
          assigned = slot;
          usedSlots.add(slot);
          break;
        }
      }
    }
    result.push({ ...player, slot: assigned, coords: layout[assigned] || { x: 50, y: 50 } });
  }

  return result;
}
