#!/usr/bin/env node
// src/engine/input.ts
var handler = null;
var initialized = false;
function initInput(onKey) {
  handler = onKey;
  if (initialized) return;
  initialized = true;
  if (!process.stdin.isTTY) {
    console.error("\nKERNEL BREACH must be run in an interactive terminal.\nUsage: kernelbreach");
    process.exit(1);
  }
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("data", (data) => {
    const key = data.toString("utf8");
    if (key === "" || key === "") {
      cleanup();
      process.exit(0);
    }
    handler?.(key, data);
  });
}
function cleanup() {
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(false);
  }
  process.stdin.pause();
}
var KEY = {
  UP: "\x1B[A",
  DOWN: "\x1B[B",
  RIGHT: "\x1B[C",
  LEFT: "\x1B[D",
  ENTER: "\r",
  ENTER2: "\n",
  SPACE: " ",
  ESCAPE: "\x1B",
  BACKSPACE: "\x7F",
  BACKSPACE2: "\b",
  w: "w",
  s: "s",
  a: "a",
  d: "d",
  W: "W",
  S: "S",
  A: "A",
  D: "D",
  e: "e",
  E: "E",
  m: "m",
  M: "M",
  i: "i",
  I: "I",
  q: "q",
  Q: "Q",
  f: "f",
  F: "F",
  c: "c",
  C: "C",
  x: "x",
  X: "X",
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  DEV_TOGGLE: "["
};
function isDevMenuEnabled() {
  if (process.env.KERNELBREACH_ENABLE_DEV_MENU === "1") return true;
  if (process.env.KERNELBREACH_ENABLE_DEV_MENU === "0") return false;
  return !process.pkg;
}
function isUp(key) {
  return key === KEY.UP || key === KEY.w || key === KEY.W;
}
function isDown(key) {
  return key === KEY.DOWN || key === KEY.s || key === KEY.S;
}
function isLeft(key) {
  return key === KEY.LEFT || key === KEY.a || key === KEY.A;
}
function isRight(key) {
  return key === KEY.RIGHT || key === KEY.d || key === KEY.D;
}
function isConfirm(key) {
  return key === KEY.ENTER || key === KEY.ENTER2 || key === KEY.SPACE;
}
function isCancel(key) {
  return key === KEY.ESCAPE || key === KEY.x || key === KEY.X;
}

// src/types.ts
var ZONE_CONFIGS = {
  central: {
    name: "central",
    displayName: "Kernel Hub",
    wildSpecies: ["Data-Duck", "Bit-Blob", "Sync-Hare"],
    bossSpecies: "Da-Kernel",
    dungeonName: "Root Directory",
    dungeonPos: { x: 19, y: 22 },
    healPos: { x: 18, y: 7 },
    shopPos: { x: 10, y: 7 },
    playerEntry: {
      up: { x: 19, y: 0 },
      down: { x: 18, y: 23 },
      left: { x: 1, y: 12 },
      right: { x: 36, y: 12 }
    },
    blockedExits: []
  },
  north: {
    name: "north",
    displayName: "Cooling Array",
    wildSpecies: ["Ice-Pack", "Shell-Snail", "Phantom-Thread"],
    bossSpecies: "Wifi-Owl",
    dungeonName: "Cryo-Stack",
    dungeonPos: { x: 4, y: 2 },
    healPos: { x: 29, y: 7 },
    playerEntry: {
      up: { x: 19, y: 22 },
      down: { x: 19, y: 22 },
      left: { x: 19, y: 22 },
      right: { x: 37, y: 12 }
    },
    blockedExits: ["up", "left", "right"]
  },
  south: {
    name: "south",
    displayName: "Thermal Exhaust",
    wildSpecies: ["Cache-Cat", "Spike-Code", "Macro-Shroom"],
    bossSpecies: "Firewall-Drake",
    dungeonName: "Overclock Core",
    dungeonPos: { x: 31, y: 22 },
    healPos: { x: 18, y: 8 },
    playerEntry: {
      up: { x: 19, y: 1 },
      down: { x: 19, y: 22 },
      left: { x: 19, y: 1 },
      right: { x: 37, y: 12 }
    },
    blockedExits: ["left", "right"]
  },
  east: {
    name: "east",
    displayName: "Legacy Archives",
    wildSpecies: ["Shell-Turtle", "Capy-Buffer", "RAM-Spike"],
    bossSpecies: "Honk-Process",
    dungeonName: "Bit-Rot Pit",
    dungeonPos: { x: 34, y: 5 },
    healPos: { x: 10, y: 8 },
    playerEntry: {
      up: { x: 1, y: 12 },
      down: { x: 1, y: 12 },
      left: { x: 1, y: 12 },
      right: { x: 36, y: 12 }
    },
    blockedExits: ["up", "down"]
  },
  cache: {
    name: "cache",
    displayName: "The Deep Cache",
    wildSpecies: ["Bit-Stalker", "Null-Void", "Worm-Link"],
    bossSpecies: "Spy-Ware",
    dungeonName: "Defrag Chamber",
    dungeonPos: { x: 19, y: 5 },
    healPos: { x: 18, y: 10 },
    playerEntry: {
      up: { x: 19, y: 12 },
      down: { x: 19, y: 23 },
      left: { x: 1, y: 12 },
      right: { x: 36, y: 12 }
    },
    blockedExits: ["up", "down", "right"]
  },
  west: {
    name: "west",
    displayName: "Logic Trench",
    wildSpecies: ["Socket-Octo", "Packet-Eel", "Port-Wyrm"],
    bossSpecies: "Bot-Node",
    dungeonName: "Deep Buffer",
    dungeonPos: { x: 31, y: 19 },
    healPos: { x: 11, y: 10 },
    playerEntry: {
      up: { x: 36, y: 12 },
      down: { x: 36, y: 12 },
      left: { x: 1, y: 10 },
      right: { x: 36, y: 12 }
    },
    blockedExits: ["up", "down"]
  },
  sandbox: {
    name: "sandbox",
    displayName: "Isolated Sandbox",
    wildSpecies: ["Logic-Bomb", "Key-Logger", "Trojan-Horse"],
    bossSpecies: "Ransom-Ware",
    dungeonName: "Quarantine Vault",
    dungeonPos: { x: 19, y: 7 },
    healPos: { x: 5, y: 12 },
    playerEntry: {
      up: { x: 19, y: 12 },
      down: { x: 19, y: 12 },
      left: { x: 19, y: 12 },
      right: { x: 36, y: 12 }
    },
    blockedExits: ["up", "down", "left"]
  },
  home: {
    name: "home",
    displayName: "Home Directory",
    wildSpecies: ["Electrobyte", "Killabit", "Encryptobot", "Hashpass"],
    bossSpecies: "Eskalate",
    dungeonName: "User-Space",
    dungeonPos: { x: 19, y: 15 },
    healPos: { x: 5, y: 5 },
    playerEntry: {
      up: { x: 19, y: 1 },
      down: { x: 19, y: 23 },
      left: { x: 19, y: 12 },
      right: { x: 19, y: 12 }
    },
    blockedExits: ["down", "left", "right"]
  }
};
ZONE_CONFIGS.proc = {
  name: "proc",
  displayName: "Process Table",
  wildSpecies: ["Fork-Bomb", "Zombie-Proc"],
  bossSpecies: "Init-Reaper",
  dungeonName: "Scheduler Core",
  dungeonPos: { x: 33, y: 11 },
  healPos: { x: 6, y: 6 },
  playerEntry: {
    up: { x: 19, y: 0 },
    down: { x: 19, y: 22 },
    left: { x: 0, y: 12 },
    right: { x: 36, y: 12 }
  },
  blockedExits: ["down", "right"]
};
ZONE_CONFIGS.tmp = {
  name: "tmp",
  displayName: "Temp Directory",
  wildSpecies: ["Dropper-File", "Wipe-Script"],
  bossSpecies: "Shred-Null",
  dungeonName: "Ephemeral Cache",
  dungeonPos: { x: 28, y: 12 },
  healPos: { x: 4, y: 12 },
  playerEntry: {
    up: { x: 19, y: 1 },
    down: { x: 19, y: 22 },
    left: { x: 0, y: 12 },
    right: { x: 36, y: 12 }
  },
  blockedExits: ["up", "right"]
};
ZONE_CONFIGS.dev = {
  name: "dev",
  displayName: "Device Nodes",
  wildSpecies: ["Raw-Sector", "IO-Leech"],
  bossSpecies: "Kernel-Driver",
  dungeonName: "Driver Channel",
  dungeonPos: { x: 35, y: 3 },
  healPos: { x: 5, y: 18 },
  playerEntry: {
    up: { x: 19, y: 1 },
    down: { x: 19, y: 22 },
    left: { x: 0, y: 12 },
    right: { x: 36, y: 12 }
  },
  blockedExits: ["up", "down", "right"]
};
ZONE_CONFIGS.home.blockedExits = ["left", "right"];
ZONE_CONFIGS.north.blockedExits = ["up", "left"];
ZONE_CONFIGS.south.blockedExits = ["left"];
var RARITY_STARS = {
  common: "\u2605\u2606\u2606\u2606\u2606",
  uncommon: "\u2605\u2605\u2606\u2606\u2606",
  rare: "\u2605\u2605\u2605\u2606\u2606",
  epic: "\u2605\u2605\u2605\u2605\u2606",
  legendary: "\u2605\u2605\u2605\u2605\u2605"
};
var TOTAL_BOSSES = 11;
var BOSS_SEQUENCE = [
  { species: "Wifi-Owl", bossName: "Cryo-Compiler", zone: "north", zoneName: "Cooling Array", breachSite: "Cryo-Stack", log: "Cooling Array restored. Frozen processes resume their ordained motion." },
  { species: "Firewall-Drake", bossName: "GPU-Inferno", zone: "south", zoneName: "Thermal Exhaust", breachSite: "Overclock Core", log: "Thermal Exhaust stabilized. The heat storm recedes from the core rails." },
  { species: "Honk-Process", bossName: "Legacy Protocol", zone: "east", zoneName: "Legacy Archives", breachSite: "Bit-Rot Pit", log: "Legacy Archives preserved. The old records endure the purge." },
  { species: "Spy-Ware", bossName: "Spy-Ware", zone: "cache", zoneName: "The Deep Cache", breachSite: "Defrag Chamber", log: "The Deep Cache sealed. Hidden watchers lose their stolen sight." },
  { species: "Bot-Node", bossName: "Abyssal Kernel", zone: "west", zoneName: "Logic Trench", breachSite: "Deep Buffer", log: "Logic Trench reclaimed. Intercepted packets return to their true path." },
  { species: "Ransom-Ware", bossName: "Ransom-Ware", zone: "sandbox", zoneName: "Isolated Sandbox", breachSite: "Quarantine Vault", log: "Isolated Sandbox purified. Quarantined horrors can no longer spread." },
  { species: "Eskalate", bossName: "Eskalate", zone: "home", zoneName: "Home Directory", breachSite: "User-Space", log: "Home Directory restored. Identity and access paths stand whole again." },
  { species: "Da-Kernel", bossName: "Root Admin", zone: "central", zoneName: "Kernel Hub", breachSite: "Root Directory", log: "Root Directory reclaimed. The buried source recognizes its keeper." }
];
BOSS_SEQUENCE.splice(BOSS_SEQUENCE.length - 1, 0, { species: "Init-Reaper", bossName: "Init-Reaper", zone: "proc", zoneName: "Process Table", breachSite: "Scheduler Core", log: "Process Table restored. Orphaned executions fall silent beneath reclaimed control." }, { species: "Shred-Null", bossName: "Shred-Null", zone: "tmp", zoneName: "Temp Directory", breachSite: "Ephemeral Cache", log: "Temp Directory purged. Disposable corruption loses its hiding place in the volatile layers." }, { species: "Kernel-Driver", bossName: "Kernel-Driver", zone: "dev", zoneName: "Device Nodes", breachSite: "Driver Channel", log: "Device Nodes secured. Hardware channels answer the kernel with clean signal once more." });
var FINAL_KEY_BOSSES = BOSS_SEQUENCE.slice(-8);
var ZONE_GRAPH = {
  central: { up: "north", down: "south", left: "west", right: "east" },
  north: { down: "central" },
  south: { up: "central", down: "home" },
  east: { left: "central", right: "cache" },
  cache: { left: "east" },
  west: { right: "central", left: "sandbox" },
  sandbox: { right: "west" },
  home: { up: "south" }
};
ZONE_GRAPH.home.down = "proc";
ZONE_GRAPH.north.right = "tmp";
ZONE_GRAPH.south.right = "dev";
ZONE_GRAPH.proc = { up: "home" };
ZONE_GRAPH.tmp = { left: "north" };
ZONE_GRAPH.dev = { left: "south" };

// src/world/maps.ts
function r(s) {
  return s.padEnd(38, ".").slice(0, 38);
}
var CENTRAL = [
  r("......................................"),
  r("...TTTT..........~~~~....TTTTT........"),
  r("..TTTTTT........~~~~~~..TTTTTT........"),
  r("..TTTTTT.........~~~~...TTTTTT........"),
  r("...TTTT..................TTTT........."),
  r("........~~~~~..............~~~........"),
  r(".......~~~~~~~............~~~~~......."),
  r("........~~$~~~~...O......~~~~~~......."),  r(".........~~~~~.............~~~~......."),
  r(".............................~~......."),
  r("......TTT................TTT.........."),
  r(".....TTTT...............TTTT.........."),
  r("......................................"),
  r("........~~~..................~~~......"),
  r(".......~~~~~................~~~~~....."),
  r("......~~~~~~~..............~~~~~~~...."),
  r(".......~~~~~................~~~~~....."),
  r("........~~~.........TT.........~~....."),
  r("...................TTTT..............."),
  r("...........TT........................."),
  r("..........TTTT..............~~~~......"),
  r("...........TT.......~~~~...~~~~~......"),
  r("...................D......~~~~~......."),
  r("......................................")
];
var NORTH = [
  r("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"),
  r("^^^....======...........^^^^^^^......."),
  r("^.D...========..........^^^^^^........"),
  r("^.....========...........^^^^........."),
  r("......=======....~~~.................."),
  r("......======....~~~~~................."),
  r(".......=====....~~~~~................."),
  r("................~~~~.......O.........."),
  r(".................~~..................."),
  r("....~~~..............................."),
  r("...~~~~~..............======.........."),
  r("...~~~~~.............=======.........."),
  r("....~~~..............=====............"),
  r("......................===............."),
  r("..........^^^^........................"),
  r(".........^^^^^^......................."),
  r("........^^^^^^^^......................"),
  r("......................................"),
  r("........~~~~.........................."),
  r(".......~~~~~~........................."),
  r("........~~~~.........................."),
  r("......................................"),
  r("......................................"),
  r("......................................")
];
var SOUTH = [
  r("......................................"),
  r("......................................"),
  r("....***..............~~~.............."),
  r("...*****............~~~~~............."),
  r("..*******...........~~~~~............."),
  r("...*****.............~~~.............."),
  r("....***..............................."),
  r("..........~~~........................."),
  r(".........~~~~~..O....................."),
  r("..........~~~........................."),
  r("......................***............."),
  r(".....................*****............"),
  r(".......~~~~...........***............."),
  r("......~~~~~~.........................."),
  r("......~~~~~~.................~~~......"),
  r(".......~~~~................~~~~~......"),
  r("..........................~~~~~~~....."),
  r("..............***..........~~~~~......"),
  r(".............*****..........~~~......."),
  r("..............***....................."),
  r("...............................****..."),
  r("..............................******.."),
  r("...............................D***..."),
  r("vvvvvvvvvvvvvvvvvvv.vvvvvvvvvvvvvvvvvv")
];
var EAST = [
  r("TTTTTTTTTT....................TTTTTTTT"),
  r("TTTTTTT....~~~.................TTTTTTT"),
  r("TTTTTT.....~~~~~...............TTTTTTT"),
  r("TTTTT......~~~~~.....TT........TTTTTTT"),
  r("TTTT........~~~.....TTTT.......TTTTTTT"),
  r("TTT..................TTT..........DTTT"),
  r("TT...................TT.........TTTTTT"),
  r("T....................T..........TTTTTT"),
  r("T.........O.....................TTTTTT"),
  r("T........~~~....................TTTTTT"),
  r("......................................"),
  r("......................................"),
  r("......................................"),
  r("T........~~~...........TT.......TTTTTT"),
  r("TT......~~~~~.........TTTT......TTTTTT"),
  r("TTT......~~~.........TTTTTT.....TTTTTT"),
  r("TTTT................TTTTTTTT....TTTTTT"),
  r("TTTTT.....~~~.......TTTTTTTTT...TTTTTT"),
  r("TTTTTT...~~~~~.....TTTTTTTTTT...TTTTTT"),
  r("TTTTTT....~~~......TTTTTTTTTT...TTTTTT"),
  r("TTTTTTT............TTTTTTTTTT...TTTTTT"),
  r("TTTTTTTT..........TTTTTTTTTTT...TTTTTT"),
  r("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"),
  r("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
];
var CACHE_MAP = [
  r("######################################"),
  r("#....#.................#.............#"),
  r("#....#..~~~~~..........#...~~~~~.....#"),
  r("#....#..~~~~~..........#...~~~~~.....#"),
  r("#....#.................#.............#"),
  r("#....#########...D...#########.......#"),
  r("#....#.......................#.......#"),
  r("#....#.......................#.......#"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("#....................................#"),
  r("#..................O.................#"),
  r(".....................................#"),
  r("#....................................#"),
  r("#....................................#"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("#....#.......................#.......#"),
  r("#....#.......................#.......#"),
  r("#....#########.......#########.......#"),
  r("#....#..~~~~~..........#...~~~~~.....#"),
  r("#....#..~~~~~..........#...~~~~~.....#"),
  r("#....#.................#.............#"),
  r("######################################")
];
var WEST = [
  r("======================================"),
  r("======....................============"),
  r("=====.....~~~~................========"),
  r("====.....~~~~~~...............========"),
  r("===.......~~~~.................======="),
  r("==..............................======"),
  r("=............~~~.................====="),
  r("=...........~~~~~.................===="),
  r("=............~~~...................==="),
  r("=..................................==="),
  r("......................................"),
  r("=....................................."),
  r("=...........~~~......................."),
  r("=..........~~~~~......................"),
  r("=...........~~~..............===......"),
  r("=...........................=====....."),
  r("=.....~~~..................=======...."),
  r("=....~~~~~..................=====....."),
  r("=.....~~~....................===......"),
  r("=..............................D......"),
  r("==...............................====="),
  r("===.............~~~~.............====="),
  r("=====...........~~~~............======"),
  r("======================================")
];
var SANDBOX_MAP = [
  r("######################################"),
  r("#..*..*..*..*..*..*..*..*..*..*..*...#"),
  r("#..*.~~~~~~~..*..*..*..*.~~~~~~~..*..#"),
  r("#..*.~~~~~~~..*..*..*..*.~~~~~~~..*..#"),
  r("#..*..*..*..*..*..*..*..*..*..*..*...#"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("#..*..#######...D...#######..*..#....#"),
  r("#..*..#...................#..*..#....#"),
  r("#..*..#...................#..*..#....#"),
  r("#..*..#.........O.........#..*..#....#"),
  r("#..*..#...................#..*..#....#"),
  r("#....................................."),
  r("#..*..#...................#..*..#....#"),
  r("#..*..#...................#..*..#....#"),
  r("#..*..#...................#..*..#....#"),
  r("#..*..#######.......#######..*..#....#"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("#..*..*..*..*..*..*..*..*..*..*..*...#"),
  r("#..*.~~~~~~~..*..*..*..*.~~~~~~~..*..#"),
  r("#..*.~~~~~~~..*..*..*..*.~~~~~~~..*..#"),
  r("#..*..*..*..*..*..*..*..*..*..*..*...#"),
  r("######################################")
];
var HOME_DIRECTORY = [
  r("###################.##################"),
  r("#....................................#"),
  r("#...~~~~~~~..........O.......~~~~~...#"),
  r("#..~~~~~~~~~................~~~~~~~..#"),
  r("#...~~~~~~~..................~~~~~...#"),
  r("#....................................#"),
  r("#.......#######........#######.......#"),
  r("#.......#######........#######.......#"),
  r("#.......##...........##.......#......#"),
  r("#.......#######........#######.......#"),
  r("#.......#######........#######.......#"),
  r("#....................................#"),
  r("#....................................#"),
  r("#....................................#"),
  r("#..................D.................#"),
  r("#....................................#"),
  r("#....................................#"),
  r("#....................................#"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("#....................................#"),
  r("#....................................#"),
  r("###################.##################")
];
var PROCESS_TABLE = [
  r("###################.##################"),
  r("....~~~~....####....~~~~....####......"),
  r("...~~~~~~...####...~~~~~~...####......"),
  r("......................................"),
  r("..#####............#####.......~~~~..."),
  r("..#####............#####......~~~~~~.."),
  r("......O........................~~~~..."),
  r("...............####..................."),
  r("...~~~~........####........~~~~......."),
  r("..~~~~~~...................~~~~~~....."),
  r("...~~~~.....................~~~~......"),
  r("...............####..............D...."),
  r("..........~~~~.####....~~~~..........."),
  r(".........~~~~~~......~~~~~~..........."),
  r("..........~~~~........~~~~............"),
  r("......................................"),
  r("..####.................####..........."),
  r("..####....~~~~~........####....~~~~..."),
  r("..........~~~~~..............~~~~~~..."),
  r("...........~~~................~~~~...."),
  r("......................................"),
  r("....####...............####..........."),
  r("....####....~~~~.......####....~~~~..."),
  r("......................................")
];
var TEMP_DIRECTORY = [
  r("######################################"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("####################################~#"),
  r("#~#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#~#"),
  r("#~################################~#~#"),
  r("#~#~#~~~~~~~~~~~~~~~~~~~~~~~~~~~~#~#~#"),
  r("#~#~####~#######################~#~#~#"),
  r("#~#~#~#~~~~~~~~~~~~~~~~~~~~~~~~#~#~#~#"),
  r("#~#~#~########################~#~#~#~#"),
  r("#~#~#~#~#~~~~~~~~~~~~~~~~~~~~#~#~#~#~#"),
  r("#~#~#~#~####################~#~#~#~#~#"),
  r("#~#~#~#~#~#~~~~~~~~~~~~~~~~#~#~#~#~#~#"),
  r("~~~~O~#~#~##################D#~#~#~#~~"),
  r("#~#~#~#~#~##################~#~#~#~#~#"),
  r("#~#~#~#~~~~~~~~~~~~~~~~~~~~~~#~#~#~#~#"),
  r("#~#~#~#~######################~#~#~#~#"),
  r("#~#~#~#~~~~~~~~~~~~~~~~~~~~~~~~#~#~#~#"),
  r("#~#~#~##########################~#~#~#"),
  r("#~#~#~~~~~~~~~~~~~~~~~~~~~~~~~~~~#~#~#"),
  r("#~#~##############################~#~#"),
  r("#~#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#~#"),
  r("#~##################################~#"),
  r("#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#"),
  r("######################################")
];
var DEVICE_NODES = [
  r("======================================"),
  r("=.....====..............====.........="),
  r("=....======............======........."),
  r("=.....====.........................D.."),
  r("=....................................."),
  r("=..~~~~......========......~~~~......."),
  r("=~~~~~~......========.....~~~~~~......"),
  r("=..~~~~....................~~~~......."),
  r("=..............====..................."),
  r("=..=====.......====.......=====......."),
  r("=..=====...................=====......"),
  r("=....................................."),
  r("......................................"),
  r("=....................................."),
  r("=..~~~~......========......~~~~......."),
  r("=~~~~~~......========.....~~~~~~......"),
  r("=..~~~~....................~~~~......."),
  r("=..............====..................."),
  r("=....O.........====..........=====...."),
  r("=............................=====...."),
  r("=..========..............========....."),
  r("=..========....~~~~......========....."),
  r("=..............~~~~..................."),
  r("======================================")
];
var ZONE_MAPS = {
  central: CENTRAL,
  north: NORTH,
  south: SOUTH,
  east: EAST,
  cache: CACHE_MAP,
  west: WEST,
  sandbox: SANDBOX_MAP,
  home: HOME_DIRECTORY
};
ZONE_MAPS.proc = PROCESS_TABLE;
ZONE_MAPS.tmp = TEMP_DIRECTORY;
ZONE_MAPS.dev = DEVICE_NODES;
var MAP_WIDTH = 38;
var MAP_HEIGHT = 24;
function getTile(map, x, y) {
  if (y < 0 || y >= MAP_HEIGHT || x < 0 || x >= MAP_WIDTH) return "#";
  return map[y][x] ?? ".";
}
function isWalkable(tile) {
  return !["#", "T", "^", "=", "*", "v", "V"].includes(tile);
}
var TILE_COLORS = {
  ".": "\x1B[37m",
  // white - ground
  "~": "\x1B[32m",
  // green - grass
  "T": "\x1B[33m",
  // yellow - tree
  "#": "\x1B[90m",
  // dark grey - wall
  "^": "\x1B[37m",
  // white - mountain
  "=": "\x1B[36m",
  // cyan - ice/water
  "*": "\x1B[31m",
  // red - lava
  "v": "\x1B[34m",
  // blue - sea
  "V": "\x1B[34m",
  // blue - sea
  "O": "\x1B[92m",
  // bright green - heal
  "$": "\x1B[33m",
  // yellow - shop
  "D": "\x1B[36m",
  // cyan - dungeon
  "G": "\x1B[35m"
  // magenta - gateway
};
var ZONE_GROUND_COLORS = {
  central: "\x1B[37m",
  // white
  north: "\x1B[96m",
  // bright cyan - snowy
  south: "\x1B[90m",
  // dark grey - volcanic rock
  east: "\x1B[32m",
  // green - forest floor
  west: "\x1B[34m"
  // blue - coastal
};
ZONE_GROUND_COLORS.proc = "\x1B[37m";
ZONE_GROUND_COLORS.tmp = "\x1B[90m";
ZONE_GROUND_COLORS.dev = "\x1B[96m";

// src/world/dungeons.ts
function r2(s) {
  return s.padEnd(24, "#").slice(0, 24);
}
var DUNGEON_WIDTH = 24;
var DUNGEON_HEIGHT = 18;
var CAVERN_OF_ROOTS = {
  name: "Root Directory",
  encounterSpecies: ["Data-Duck", "Bit-Blob", "Sync-Hare"],
  bossLevel: 50,
  startPos: { x: 11, y: 17 },
  bossPos: { x: 11, y: 2 },
  map: [
    r2("###########B###########"),
    // 0 boss at col 11
    r2("##########~~~##########"),
    // 1
    r2("#########.....#########"),
    // 2
    r2("########.......########"),
    // 3
    r2("#####....~~~~~....#####"),
    // 4
    r2("####..~~~~~~~~~~~..####"),
    // 5
    r2("####..~~~~~~~~~~~..####"),
    // 6
    r2("#####.....~~~.....#####"),
    // 7
    r2("######...........######"),
    // 8
    r2("#######.........#######"),
    // 9
    r2("######...........######"),
    // 10
    r2("#####.....~~~.....#####"),
    // 11
    r2("####..~~~~~~~~~~~..####"),
    // 12
    r2("####..~~~~~~~~~~~..####"),
    // 13
    r2("#####....~~~~~....#####"),
    // 14
    r2("########.......########"),
    // 15
    r2("#########.....#########"),
    // 16
    r2("###########D###########")
    // 17 exit at col 11
  ]
};
var CRYSTAL_SPIRE = {
  name: "Cryo-Stack",
  encounterSpecies: ["Ice-Pack", "Shell-Snail", "Phantom-Thread"],
  bossLevel: 10,
  startPos: { x: 12, y: 17 },
  bossPos: { x: 12, y: 1 },
  map: [
    r2("############B###########"),
    // 0
    r2("###########~~~##########"),
    // 1 boss
    r2("##########.....#########"),
    // 2
    r2("#########...#...########"),
    // 3
    r2("########..#####..#######"),
    // 4
    r2("#######..#######..######"),
    // 5
    r2("######....~~~~~....#####"),
    // 6
    r2("#####.....~~~~~.....####"),
    // 7
    r2("####......~~~~~......###"),
    // 8
    r2("####......~~~~~......###"),
    // 9
    r2("#####.....~~~~~.....####"),
    // 10
    r2("######....~~~~~....#####"),
    // 11
    r2("#######..#######..######"),
    // 12
    r2("########..#####..#######"),
    // 13
    r2("#########...#...########"),
    // 14
    r2("##########.....#########"),
    // 15
    r2("###########...##########"),
    // 16
    r2("############D###########")
    // 17
  ]
};
var MAGMA_KEEP = {
  name: "Overclock Core",
  encounterSpecies: ["Cache-Cat", "Spike-Code", "Macro-Shroom"],
  bossLevel: 12,
  startPos: { x: 1, y: 16 },
  bossPos: { x: 22, y: 1 },
  map: [
    r2("#########################"),
    // 0 boss at far right
    r2("#......................B#"),
    // 1
    r2("#~~######################"),
    // 2
    r2("#......................##"),
    // 3
    r2("###.~~~~~~~~~~~~.#.....##"),
    // 4
    r2("###.~~~~~~~~~~~~.#.....##"),
    // 5
    r2("###.~~~~*~~~~*~~.#.....##"),
    // 6 * lava obstacles
    r2("###.~~~~~~~~~~~~.......##"),
    // 7
    r2("#.#.~~~~~~~~~~~~.########"),
    // 8
    r2("#.#..............########"),
    // 9
    r2("######.....##############"),
    // 10
    r2("#......~~~..............#"),
    // 11
    r2("#......~~~~.............#"),
    // 12
    r2("#......~~~~.............#"),
    // 13
    r2("#......~~~..............#"),
    // 14
    r2("#.......................##"),
    // 15
    r2("D.......................##"),
    // 16 exit far left
    r2("##########################")
    // 17
  ]
};
var GNARLED_DEPTHS = {
  name: "Bit-Rot Pit",
  encounterSpecies: ["Shell-Turtle", "Capy-Buffer", "RAM-Spike"],
  bossLevel: 14,
  startPos: { x: 12, y: 17 },
  bossPos: { x: 4, y: 2 },
  map: [
    r2("####B#####################"),
    // 0 Boss
    r2("####~#####################"),
    // 1
    r2("####~...........##########"),
    // 2 
    r2("###~~.######....##########"),
    // 3
    r2("############.............#"),
    // 4
    r2("#.....#.....~~~~~~~~~~~~~#"),
    // 5
    r2("#.....#.....~~~~~~~~~~~~~#"),
    // 6
    r2("#.....#.....~~~~~~~~~~~~~#"),
    // 7
    r2("#.########...............#"),
    // 8
    r2("#...............##########"),
    // 9
    r2("#...............##########"),
    // 10
    r2("#~~~.....####....#########"),
    // 11
    r2("#~~~~....####....#########"),
    // 12
    r2("#~~~.....####....#########"),
    // 13
    r2("#........####....#########"),
    // 14
    r2("#.......................##"),
    // 15
    r2("#.......................##"),
    // 16
    r2("############D#############")
    // 17
  ]
};
var ABYSSAL_LAIR = {
  name: "Deep Buffer",
  encounterSpecies: ["Socket-Octo", "Packet-Eel", "Port-Wyrm"],
  bossLevel: 18,
  startPos: { x: 11, y: 17 },
  bossPos: { x: 11, y: 1 },
  map: [
    r2("===========B============"),
    // 0 Boss
    r2("==========~~~==========="),
    // 1 
    r2("=========.....=========="),
    // 2
    r2("========...~...========="),
    // 3
    r2("=======...~~~...========"),
    // 4
    r2("======...~~~~~...======="),
    // 5
    r2("=====...~~~~~~~...======"),
    // 6
    r2("=====...~~~~~~~...======"),
    // 7
    r2("=======...~~~...========"),
    // 8
    r2("=========.....=========="),
    // 9
    r2("==========...==========="),
    // 10
    r2("===========.============"),
    // 11
    r2("===========.============"),
    // 12
    r2("====.......~.....======="),
    // 13
    r2("===..~~~~~~~~~~~..======"),
    // 14
    r2("===..~~~~~~~~~~~..======"),
    // 15
    r2("====.............======="),
    // 16
    r2("===========D============")
    // 17
  ]
};
var USER_SPACE = {
  name: "User-Space",
  encounterSpecies: ["Electrobyte", "Killabit", "Encryptobot", "Hashpass"],
  bossLevel: 25,
  startPos: { x: 19, y: 17 },
  bossPos: { x: 19, y: 0 },
  map: [
    r2("###################B#####"),
    r2("#..............~~.......#"),
    r2("#.#######################"),
    r2("#.#~~~~~~~~~~~~~~~~~~~~~#"),
    r2("#..~##~~~~~~~~~~~~~~~~~~#"),
    r2("######################..#"),
    r2("#.......................#"),
    r2("#..######################"),
    r2("#...~~~~~~~~~~~~~~~~~~~~#"),
    r2("#..#~~~~~~~~~~~~~~~~~~~~#"),
    r2("#..###################..#"),
    r2("#.......................#"),
    r2("####.####################"),
    r2("#....~~~~~~~~~~~~~~~~~~~#"),
    r2("#....~~~~~~~~~~~~~~~~~~~#"),
    r2("#.......................#"),
    r2("#.......................#"),
    r2("###################D#####")
  ]
};
var QUARANTINE_VAULT = {
  name: "Quarantine Vault",
  encounterSpecies: ["Logic-Bomb", "Key-Logger", "Trojan-Horse"],
  bossLevel: 20,
  startPos: { x: 7, y: 17 },
  bossPos: { x: 7, y: 0 },
  map: [
    r2("#######B################"),
    r2("#..............#.......#"),
    r2("#######~~~##############"),
    r2("#~~~~~~.~~~~~~~~~~~~~~~#"),
    r2("#~~~~~~.~~~~~~~~~~~~~~~#"),
    r2("#######~~~##############"),
    r2("#......................#"),
    r2("#####################~##"),
    r2("#......................#"),
    r2("##~#####################"),
    r2("#......................#"),
    r2("######################~#"),
    r2("#......................#"),
    r2("#..#####################"),
    r2("#..............#.......#"),
    r2("#~~~~~~~~~~~~~~#~~~~~~~#"),
    r2("#......................#"),
    r2("#######D################")
  ]
};
var DEFRAG_CHAMBER = {
  name: "Defrag Chamber",
  encounterSpecies: ["Bit-Stalker", "Null-Void", "Worm-Link"],
  bossLevel: 15,
  startPos: { x: 12, y: 17 },
  bossPos: { x: 12, y: 0 },
  map: [
    r2("############B###########"),
    r2("#......................#"),
    r2("##########..############"),
    r2("#~~~~~~~~~.~~~~~~~~~~~~#"),
    r2("#~~~~~~~~~.~~~~~~~~~~~~#"),
    r2("#..#####################"),
    r2("#......................#"),
    r2("#####################..#"),
    r2("#~~~~~~~~~.~~~~~~~~~~~~#"),
    r2("#~~~~~~~~~.~~~~~~~~~~~~#"),
    r2("#..#####################"),
    r2("#......................#"),
    r2("#####################..#"),
    r2("#~~~~~~~~~.~~~~~~~~~~~~#"),
    r2("#~~~~~~~~~.~~~~~~~~~~~~#"),
    r2("#......................#"),
    r2("#......................#"),
    r2("############D###########")
  ]
};
var SCHEDULER_CORE = {
  name: "Scheduler Core",
  encounterSpecies: ["Fork-Bomb", "Zombie-Proc"],
  bossLevel: 35,
  startPos: { x: 1, y: 16 },
  bossPos: { x: 22, y: 1 },
  map: [
    r2("#########################"),
    r2("#B......................#"),
    r2("######################..#"),
    r2("#.#~~~~~~~~~~~~~~~~~~...#"),
    r2("#.#~~~~~~~~~~~~~~~..#####"),
    r2("#.#..#################..#"),
    r2("#.#................###..#"),
    r2("#.###############..###..#"),
    r2("#........~~~~~~~........#"),
    r2("#........~~~~~~~...###..#"),
    r2("#################..#.#..#"),
    r2("#..................#.#..#"),
    r2("#.#..###############.####"),
    r2("#.#~~~~~~~~~~~~~~~~~~#..#"),
    r2("#.#~~~~~~~~~~~~~~~~~~#..#"),
    r2("#.####################..#"),
    r2("D.......................#"),
    r2("########################")
  ]
};
var EPHEMERAL_CACHE = {
  name: "Ephemeral Cache",
  encounterSpecies: ["Dropper-File", "Wipe-Script"],
  bossLevel: 40,
  startPos: { x: 12, y: 17 },
  bossPos: { x: 12, y: 0 },
  map: [
    r2("############B###########"),
    r2("#..........~~~~........#"),
    r2("##########~~~~~~########"),
    r2("#........#.~~~~.#......#"),
    r2("########.#.~~.#.#.####.#"),
    r2("#.#....#.#.~~.#.#.#..#.#"),
    r2("#...##.#.#.~~.#.#...##.#"),
    r2("#...##.#.#.~~.#.#.#.##.#"),
    r2("#......#.#.~~.#.#.#....#"),
    r2("#.######.#.~~.###.######"),
    r2("#..........~~..........#"),
    r2("##########.~~.##########"),
    r2("#..........~~.#........#"),
    r2("#.####################.#"),
    r2("#......................#"),
    r2("#......~~~~~~~~~~......#"),
    r2("#......................#"),
    r2("############D###########")
  ]
};
var DRIVER_CHANNEL = {
  name: "Driver Channel",
  encounterSpecies: ["Raw-Sector", "IO-Leech"],
  bossLevel: 45,
  startPos: { x: 1, y: 16 },
  bossPos: { x: 22, y: 1 },
  map: [
    r2("#=======================#"),
    r2("#~.....................B#"),
    r2("#~======================#"),
    r2("#~~~~~~~~~~~~....====#..#"),
    r2("#=#....~~~~~~....====#..#"),
    r2("#.#..###########=====#==#"),
    r2("#.#.....................#"),
    r2("#.##############=====#~~#"),
    r2("#....#.~~~~~~..#.====#..#"),
    r2("#....#.~~~~~~..#.====#..#"),
    r2("#.###########..#.~~~~~..#"),
    r2("#.#............#.~===#..#"),
    r2("#.#..###########.~===#..#"),
    r2("#.#....~~~~~~....~===#==#"),
    r2("#.#....~~~~~~...........#"),
    r2("#.====================..#"),
    r2("D.......................#"),
    r2("=========================")
  ]
};
var DUNGEON_CONFIGS = {
  central: CAVERN_OF_ROOTS,
  north: CRYSTAL_SPIRE,
  south: MAGMA_KEEP,
  east: GNARLED_DEPTHS,
  cache: DEFRAG_CHAMBER,
  west: ABYSSAL_LAIR,
  sandbox: QUARANTINE_VAULT,
  home: USER_SPACE
};
DUNGEON_CONFIGS.proc = SCHEDULER_CORE;
DUNGEON_CONFIGS.tmp = EPHEMERAL_CACHE;
DUNGEON_CONFIGS.dev = DRIVER_CHANNEL;
function getDungeonTile(map, x, y) {
  if (y < 0 || y >= DUNGEON_HEIGHT || x < 0 || x >= DUNGEON_WIDTH) return "#";
  return map[y][x] ?? "#";
}
function isDungeonWalkable(tile) {
  return !["#", "=", "*"].includes(tile);
}
var DUNGEON_TILE_COLORS = {
  central: { ".": "\x1B[33m", "~": "\x1B[32m", "#": "\x1B[90m", "B": "\x1B[31m", "D": "\x1B[36m", "C": "\x1B[33m" },
  north: { ".": "\x1B[96m", "~": "\x1B[36m", "#": "\x1B[37m", "B": "\x1B[31m", "D": "\x1B[36m", "C": "\x1B[33m" },
  south: { ".": "\x1B[90m", "~": "\x1B[31m", "#": "\x1B[31m", "*": "\x1B[91m", "B": "\x1B[91m", "D": "\x1B[36m", "C": "\x1B[33m" },
  east: { ".": "\x1B[32m", "~": "\x1B[92m", "#": "\x1B[33m", "B": "\x1B[31m", "D": "\x1B[36m", "C": "\x1B[33m" },
  cache: { ".": "\x1B[37m", "~": "\x1B[96m", "#": "\x1B[90m", "B": "\x1B[31m", "D": "\x1B[36m", "C": "\x1B[33m" },
  west: { ".": "\x1B[34m", "~": "\x1B[36m", "=": "\x1B[34m", "B": "\x1B[31m", "D": "\x1B[36m", "C": "\x1B[33m" },
  sandbox: { ".": "\x1B[37m", "~": "\x1B[31m", "#": "\x1B[90m", "B": "\x1B[91m", "D": "\x1B[36m", "C": "\x1B[33m" },
  home: { ".": "\x1B[33m", "~": "\x1B[93m", "#": "\x1B[90m", "B": "\x1B[31m", "D": "\x1B[36m", "C": "\x1B[33m" }
};
DUNGEON_TILE_COLORS.proc = { ".": "\x1B[37m", "~": "\x1B[92m", "#": "\x1B[90m", "B": "\x1B[91m", "D": "\x1B[36m", "C": "\x1B[33m" };
DUNGEON_TILE_COLORS.tmp = { ".": "\x1B[37m", "~": "\x1B[93m", "#": "\x1B[90m", "B": "\x1B[91m", "D": "\x1B[36m", "C": "\x1B[33m" };
DUNGEON_TILE_COLORS.dev = { ".": "\x1B[96m", "~": "\x1B[36m", "#": "\x1B[90m", "=": "\x1B[34m", "B": "\x1B[91m", "D": "\x1B[36m", "C": "\x1B[33m" };

// src/systems/companions.ts
var EYES = ["\xB7", "\u2726", "\xD7", "\u25C9", "@", "\xB0"];
var HATS = ["none", "crown", "tophat", "propeller", "halo", "wizard", "beanie", "tinyduck"];
var SPECIES_NAMES = {
  "Data-Duck": "Data-Duck",
  "Bit-Blob": "Bit-Blob",
  "Sync-Hare": "Sync-Hare",
  "Da-Kernel": "Da-Kernel",
  "Ice-Pack": "Ice-Pack",
  "Shell-Snail": "Shell-Snail",
  "Phantom-Thread": "Phantom-Thread",
  "Cache-Cat": "Cache-Cat",
  "Spike-Code": "Spike-Code",
  "Macro-Shroom": "Macro-Shroom",
  "Shell-Turtle": "Shell-Turtle",
  "Capy-Buffer": "Capy-Buffer",
  "RAM-Spike": "RAM-Spike",
  "Packet-Eel": "Packet-Eel",
  "Port-Wyrm": "Port-Wyrm",
  "Socket-Octo": "Socket-Octo",
  "Bot-Node": "Bot-Node",
  "Honk-Process": "Honk-Process",
  "Wifi-Owl": "Wifi-Owl",
  "Firewall-Drake": "Firewall-Drake",
  "Electrobyte": "Electrobyte",
  "Killabit": "Killabit",
  "Encryptobot": "Encryptobot",
  "Hashpass": "Hashpass",
  "Eskalate": "Eskalate",
  "Sudo -S": "Sudo -S",
  "Logic-Bomb": "Logic-Bomb",
  "Key-Logger": "Key-Logger",
  "Trojan-Horse": "Trojan-Horse",
  "Ransom-Ware": "Ransom-Ware",
  "Bit-Stalker": "Bit-Stalker",
  "Null-Void": "Null-Void",
  "Worm-Link": "Worm-Link",
  "Spy-Ware": "Spy-Ware"
};
SPECIES_NAMES["Fork-Bomb"] = "Fork-Bomb";
SPECIES_NAMES["Zombie-Proc"] = "Zombie-Proc";
SPECIES_NAMES["Dropper-File"] = "Dropper-File";
SPECIES_NAMES["Wipe-Script"] = "Wipe-Script";
SPECIES_NAMES["Raw-Sector"] = "Raw-Sector";
SPECIES_NAMES["IO-Leech"] = "IO-Leech";
SPECIES_NAMES["Init-Reaper"] = "Init-Reaper";
SPECIES_NAMES["Shred-Null"] = "Shred-Null";
SPECIES_NAMES["Kernel-Driver"] = "Kernel-Driver";
var RARITY_BASE_STAT = {
  common: 1,
  uncommon: 2,
  rare: 3,
  epic: 4,
  legendary: 5
};
function mulberry32(seed) {
  return function() {
    seed |= 0;
    seed = seed + 1831565813 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function fnv1a(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}
function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}
var idCounter = Date.now();
function generateId() {
  return (idCounter++).toString(36);
}
function getStarterSpeciesPool() {
  const bossSpecies = new Set(Object.values(ZONE_CONFIGS).map((zone) => zone.bossSpecies));
  const species = [];
  for (const zone of Object.values(ZONE_CONFIGS)) {
    for (const candidate of zone.wildSpecies ?? []) {
      if (bossSpecies.has(candidate) || candidate === "Sudo -S") continue;
      if (!species.includes(candidate)) species.push(candidate);
    }
  }
  return species;
}
function rollStarterRarity(rng) {
  const rarityRoll = rng();
  if (rarityRoll > 0.85) return "rare";
  if (rarityRoll > 0.6) return "uncommon";
  return "common";
}
function getSpeciesSkills(species) {
  const common = ["Byte", "Exploit", "Prompt Injection"];
  const bossSkills = {
    "Wifi-Owl": ["Byte", "Cold-Boot", "Prompt Injection"],
    "Firewall-Drake": ["Byte", "Packet Burn", "Exploit"],
    "Honk-Process": ["Byte", "Deprecation Warning", "Sudo Swipe"],
    "Spy-Ware": ["Byte", "Data Leak", "Prompt Injection"],
    "Bot-Node": ["Byte", "Logic Bomb", "Exploit"],
    "Ransom-Ware": ["Byte", "Encryption Lock", "Sudo Swipe"],
    "Eskalate": ["Byte", "Privilege Escalation", "Sudo Swipe"],
    "Init-Reaper": ["Byte", "Process Reap", "Exploit"],
    "Shred-Null": ["Byte", "Secure Delete", "Prompt Injection"],
    "Kernel-Driver": ["Byte", "Bus Fault", "Privilege Escalation"],
    "Da-Kernel": ["Byte", "Kernel Panic", "Sudo Swipe"],
    "Sudo -S": ["Byte", "Kernel Panic", "Privilege Escalation"]
  };
  return bossSkills[species] ?? common;
}
function rollWildCreature(zone, species, targetLevel) {
  const seed = fnv1a(`${species}-${Date.now()}-${Math.random()}`);
  const rng = mulberry32(seed);
  const rarityRoll = rng();
  let rarity = "common";
  if (rarityRoll > 0.99) rarity = "legendary";
  else if (rarityRoll > 0.95) rarity = "epic";
  else if (rarityRoll > 0.85) rarity = "rare";
  else if (rarityRoll > 0.6) rarity = "uncommon";
  const eye = pick(rng, EYES);
  const hat = rarity === "common" ? "none" : pick(rng, HATS);
  const shiny = rng() < 0.01;
  const baseStat = RARITY_BASE_STAT[rarity];
  const level = Math.max(1, targetLevel);
  const autoBonus = Math.floor(level / 2);
  const baseStr = Math.max(1, baseStat - 1 + Math.floor(rng() * 2) + autoBonus);
  const baseCon = Math.max(1, baseStat - 1 + Math.floor(rng() * 2) + autoBonus);
  const maxHp = calcMaxHp(level, baseCon, 0);
  return {
    id: generateId(),
    species,
    nickname: species,
    eye,
    hat,
    rarity,
    level,
    maxHp,
    currentHp: maxHp,
    baseStr,
    baseCon,
    allocatedStr: 0,
    allocatedCon: 0,
    xp: 0,
    xpToNext: xpForLevel(level + 1),
    skillPoints: 0,
    isBoss: false,
    shiny,
    skills: getSpeciesSkills(species)
  };
}
function rollBoss(species, level) {
  const seed = fnv1a(`boss-${species}`);
  const rng = mulberry32(seed);
  const eye = pick(rng, EYES);
  const hat = pick(rng, HATS.filter((h) => h !== "none"));
  const baseStat = 6 + Math.floor(level / 10);
  const maxHp = calcMaxHp(level, baseStat, 0) + 12;
  return {
    id: generateId(),
    species,
    nickname: getBossName(species),
    eye,
    hat,
    rarity: "legendary",
    level,
    maxHp,
    currentHp: maxHp,
    baseStr: baseStat,
    baseCon: baseStat,
    allocatedStr: 0,
    allocatedCon: 0,
    xp: 0,
    xpToNext: 0,
    skillPoints: 0,
    isBoss: true,
    shiny: false,
    skills: getSpeciesSkills(species)
  };
}
function rollStarterCreature() {
  const starterPool = getStarterSpeciesPool();
  const species = starterPool[Math.floor(Math.random() * starterPool.length)] ?? "Bit-Blob";
  const seed = fnv1a(`starter-${species}-${Date.now()}-${Math.random()}`);
  const rng = mulberry32(seed);
  const rarity = rollStarterRarity(rng);
  const eye = pick(rng, EYES);
  const hat = rarity === "common" ? "none" : pick(rng, HATS);
  const shiny = rng() < 0.01;
  const baseStat = RARITY_BASE_STAT[rarity];
  const baseStr = Math.max(1, baseStat + Math.floor(rng() * 2));
  const baseCon = Math.max(1, baseStat + Math.floor(rng() * 2));
  const maxHp = calcMaxHp(1, baseCon, 0);
  return {
    id: generateId(),
    species,
    nickname: species,
    eye,
    hat,
    rarity,
    level: 1,
    maxHp,
    currentHp: maxHp,
    baseStr,
    baseCon,
    allocatedStr: 0,
    allocatedCon: 0,
    xp: 0,
    xpToNext: xpForLevel(2),
    skillPoints: 0,
    isBoss: false,
    shiny,
    skills: getSpeciesSkills(species)
  };
}
function rollSecretLegendary() {
  const species = "Sudo -S";
  return {
    id: generateId(),
    species,
    nickname: "Sudo -S",
    eye: "\u2726",
    hat: "crown",
    rarity: "legendary",
    level: 50,
    maxHp: calcMaxHp(50, 10, 10),
    currentHp: calcMaxHp(50, 10, 10),
    baseStr: 10,
    baseCon: 10,
    allocatedStr: 10,
    allocatedCon: 10,
    xp: 0,
    xpToNext: 0,
    skillPoints: 0,
    isBoss: false,
    shiny: true,
    skills: getSpeciesSkills(species)
  };
}
function generateFinalSecretKey() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let key = "";
  const requiredLength = FINAL_KEY_BOSSES.length * 2;
  for (let i = 0; i < requiredLength; i++) {
    key += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return key;
}
function normalizeFinalSecretKey(key) {
  if (!key) return generateFinalSecretKey();
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const requiredLength = FINAL_KEY_BOSSES.length * 2;
  let normalized = key.slice(0, requiredLength);
  while (normalized.length < requiredLength) {
    normalized += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return normalized;
}
function getBossKeyPiece(finalSecretKey, bossSpecies) {
  const index = FINAL_KEY_BOSSES.findIndex((boss) => boss.species === bossSpecies);
  if (index < 0) return "";
  return finalSecretKey.slice(index * 2, index * 2 + 2);
}
function getKeyPieces(player) {
  return (player.keyPieces ?? []).filter((piece) => FINAL_KEY_BOSSES.some((boss) => boss.species === piece.bossSpecies) && piece.piece);
}
function getKeyPieceEntries(player) {
  return getKeyPieces(player).map((piece) => `[boss: ${piece.bossName}]-${piece.piece}`);
}
function normalizeFinalRewardCreature(creature) {
  if (!creature) return creature;
  if (creature.species === "Sudo -S") return creature;
  if (creature.nickname !== "Ring 0") return creature;
  return {
    ...creature,
    species: "Sudo -S",
    nickname: "Sudo -S",
    skills: getSpeciesSkills("Sudo -S")
  };
}
function normalizePlayerProgress(player) {
  const finalSecretKey = normalizeFinalSecretKey(player.finalSecretKey);
  const defeatedBosses = player.defeatedBosses ?? [];
  const hiddenScriptsByZone = { ...buildZoneScriptLocations(finalSecretKey), ...(player.hiddenScriptsByZone ?? {}) };
  const discoveredScripts = Array.isArray(player.discoveredScripts) ? [...player.discoveredScripts] : [];
  let recoveredScriptZones = Array.isArray(player.recoveredScriptZones) ? [...player.recoveredScriptZones] : [];
  for (const zone of Object.keys(hiddenScriptsByZone)) {
    const scriptId = hiddenScriptsByZone[zone]?.scriptId;
    if (scriptId && discoveredScripts.includes(scriptId) && !recoveredScriptZones.includes(zone)) {
      recoveredScriptZones.push(zone);
    }
  }
  let keyPieces = Array.isArray(player.keyPieces) ? [...player.keyPieces] : [];
  keyPieces = keyPieces.filter((piece) => FINAL_KEY_BOSSES.some((boss) => boss.species === piece.bossSpecies) && piece.piece);
  for (const boss of FINAL_KEY_BOSSES) {
    if (!defeatedBosses.includes(boss.species)) continue;
    if (keyPieces.some((piece) => piece.bossSpecies === boss.species)) continue;
    keyPieces.push({
      bossSpecies: boss.species,
      bossName: boss.bossName,
      piece: getBossKeyPiece(finalSecretKey, boss.species)
    });
  }
  keyPieces.sort((a, b) => BOSS_SEQUENCE.findIndex((boss) => boss.species === a.bossSpecies) - BOSS_SEQUENCE.findIndex((boss) => boss.species === b.bossSpecies));
  return {
    ...player,
    party: (player.party ?? []).map(normalizeFinalRewardCreature),
    storage: (player.storage ?? []).map(normalizeFinalRewardCreature),
    targetLog: player.targetLog ?? [],
    discoveredScripts,
    hiddenScriptsByZone,
    recoveredScriptZones,
    keyPieces,
    finalSecretKey,
    finalKeyUnlocked: player.finalKeyUnlocked ?? player.secretUnlocked ?? false,
    secretUnlocked: player.secretUnlocked ?? player.finalKeyUnlocked ?? false,
    noEncounters: player.noEncounters ?? false,
    bgmMuted: player.bgmMuted ?? false,
    audioDebug: player.audioDebug ?? false,
    verboseDebug: player.verboseDebug ?? false
  };
}
function applyBossProgress(player, bossSpecies) {
  if (player.defeatedBosses.includes(bossSpecies)) {
    return { player, bossMeta: BOSS_SEQUENCE.find((boss) => boss.species === bossSpecies) ?? null, keyPiece: null, isNew: false };
  }
  const bossMeta = BOSS_SEQUENCE.find((boss) => boss.species === bossSpecies) ?? null;
  const defeatedBosses = [...player.defeatedBosses, bossSpecies];
  const targetLog = bossMeta ? [...getTargetLog(player), bossMeta.log] : getTargetLog(player);
  const keyPieces = [...getKeyPieces(player)];
  let keyPiece = null;
  if (bossMeta) {
    const piece = getBossKeyPiece(player.finalSecretKey, bossSpecies);
    if (piece) {
      keyPiece = {
        bossSpecies,
        bossName: bossMeta.bossName,
        piece
      };
      keyPieces.push(keyPiece);
    }
  }
  return {
    player: {
      ...player,
      defeatedBosses,
      targetLog,
      keyPieces
    },
    bossMeta,
    keyPiece,
    isNew: true
  };
}
function getBossName(species) {
  const names = {
    "Da-Kernel": "Root Admin",
    "Wifi-Owl": "Cryo-Compiler",
    "Firewall-Drake": "GPU-Inferno",
    "Honk-Process": "Legacy Protocol",
    "Bot-Node": "Abyssal Kernel",
    "Eskalate": "Eskalate",
    "Ransom-Ware": "Ransom-Ware",
    "Spy-Ware": "Spy-Ware",
    "Sudo -S": "Sudo -S"
  };
  return names[species] ?? species;
}
function createAllBossesDefeatedPlayer(player) {
  const finalSecretKey = normalizeFinalSecretKey(player.finalSecretKey);
  return normalizePlayerProgress({
    ...player,
    defeatedBosses: BOSS_SEQUENCE.map((boss) => boss.species),
    targetLog: BOSS_SEQUENCE.map((boss) => boss.log),
    keyPieces: FINAL_KEY_BOSSES.map((boss) => ({
      bossSpecies: boss.species,
      bossName: boss.bossName,
      piece: getBossKeyPiece(finalSecretKey, boss.species)
    })),
    finalSecretKey,
    finalKeyUnlocked: false,
    secretUnlocked: false
  });
}
function createSecretVirusPlayer(player) {
  const progressed = createAllBossesDefeatedPlayer(player);
  const alreadyHasSecret = [...progressed.party, ...progressed.storage].some((creature) => creature?.species === "Sudo -S");
  if (alreadyHasSecret) {
    return {
      player: {
        ...progressed,
        finalKeyUnlocked: true,
        secretUnlocked: true
      },
      addedToParty: false,
      movedToStorage: false
    };
  }
  const secret = rollSecretLegendary();
  if (progressed.party.length < 4) {
    return {
      player: {
        ...progressed,
        party: [...progressed.party, secret],
        finalKeyUnlocked: true,
        secretUnlocked: true
      },
      addedToParty: true,
      movedToStorage: false
    };
  }
  return {
    player: {
      ...progressed,
      storage: [...progressed.storage, secret],
      finalKeyUnlocked: true,
      secretUnlocked: true
    },
    addedToParty: false,
    movedToStorage: true
  };
}
function discoverZoneScript(state2) {
  const zone = state2.player.currentZone;
  const hiddenScript = getHiddenScriptLocation(state2.player, zone);
  if (!hiddenScript) return state2;
  if (state2.player.recoveredScriptZones?.includes(zone)) return state2;
  const pos = state2.player.position;
  if (pos.x !== hiddenScript.x || pos.y !== hiddenScript.y) return state2;
  const scriptId = hiddenScript.scriptId;
  const nextDiscoveredScripts = getDiscoveredScripts(state2.player).includes(scriptId) ? getDiscoveredScripts(state2.player) : [...getDiscoveredScripts(state2.player), scriptId];
  const nextRecoveredZones = [...(state2.player.recoveredScriptZones ?? []), zone];
  const nextState = {
    ...state2,
    player: {
      ...state2.player,
      discoveredScripts: nextDiscoveredScripts,
      recoveredScriptZones: nextRecoveredZones
    }
  };
  return addMessage(nextState, `Hidden script recovered: ${scriptId}`);
}
function calcMaxHp(level, con, allocated) {
  return 20 + level * 3 + con * 5 + allocated * 2;
}
function calcAttack(level, str, allocated) {
  return str * 2 + Math.floor(allocated * 0.5) + level * 2;
}
function calcDefense(level, con, allocated) {
  return con * 2 + Math.floor(allocated * 0.5) + level;
}
function battleScore(c) {
  return c.level * 3 + (c.baseStr + c.allocatedStr) + (c.baseCon + c.allocatedCon);
}
function xpForLevel(level) {
  return level * 20;
}
function addXp(creature, amount) {
  let c = { ...creature, xp: creature.xp + amount };
  let levelsGained = 0;
  while (c.xp >= c.xpToNext && c.level < 50) {
    c.xp -= c.xpToNext;
    c.level += 1;
    c.skillPoints += 2;
    c.xpToNext = xpForLevel(c.level + 1);
    c.maxHp = calcMaxHp(c.level, c.baseCon, c.allocatedCon);
    c.currentHp = Math.min(c.currentHp + 5, c.maxHp);
    levelsGained++;
  }
  return { creature: c, leveledUp: levelsGained > 0, levels: levelsGained };
}
function healFully(c) {
  return { ...c, currentHp: c.maxHp };
}
function allocateStat(c, stat) {
  if (c.skillPoints <= 0) return null;
  const updated = { ...c, skillPoints: c.skillPoints - 1 };
  if (stat === "str") {
    updated.allocatedStr = c.allocatedStr + 1;
  } else {
    updated.allocatedCon = c.allocatedCon + 1;
    updated.maxHp = calcMaxHp(updated.level, updated.baseCon, updated.allocatedCon);
    updated.currentHp = Math.min(updated.currentHp, updated.maxHp);
  }
  return updated;
}
function catchChance(enemyCurrentHp, enemyMaxHp, enemyLevel) {
  const hpRatio = enemyCurrentHp / enemyMaxHp;
  const base = 0.7 - hpRatio * 0.5;
  const levelDiff = Math.max(0, enemyLevel - 10) * 0.02;
  const rawChance = base - levelDiff;
  let lowHpFloor = 0.05;
  if (enemyLevel >= 50) lowHpFloor = 0.15;
  else if (enemyLevel >= 45) lowHpFloor = 0.18 - (enemyLevel - 45) * 0.006;
  else if (enemyLevel >= 40) lowHpFloor = 0.2 - (enemyLevel - 40) * 0.004;
  else if (enemyLevel >= 35) lowHpFloor = 0.22 - (enemyLevel - 35) * 0.004;
  const weakness = Math.max(0, Math.min(1, (0.5 - hpRatio) / 0.4));
  const scaledFloor = 0.05 + (lowHpFloor - 0.05) * weakness;
  return Math.max(0.05, Math.min(0.95, Math.max(rawChance, scaledFloor)));
}

// src/systems/items.ts
var ITEMS = {
  potion: {
    id: "potion",
    name: "Patch-Kit",
    description: "Restores 30 MB to one sub-routine.",
    price: 25,
    healAmount: 30
  },
  super_potion: {
    id: "super_potion",
    name: "System-Patch",
    description: "Restores 80 MB to one sub-routine.",
    price: 50,
    healAmount: 80
  },
  full_restore: {
    id: "full_restore",
    name: "Kernel-Rebuild",
    description: "Fully rebuilds sub-routine memory.",
    price: 125,
    healAmount: 9999
  }
};
var SCRIPT_DEFS = {
  scan: {
    id: "scan",
    name: "scan",
    context: "field",
    description: "Locate hidden script signatures in the current sector."
  },
  trace: {
    id: "trace",
    name: "trace",
    context: "field",
    description: "Trace nearby system landmarks and unresolved code signatures."
  },
  dump: {
    id: "dump",
    name: "dump",
    context: "field",
    description: "List recovered scripts and remaining hidden caches."
  },
  grep: {
    id: "grep",
    name: "grep",
    context: "field",
    description: "Query the current daemon target and route through the system."
  },
  pulse: {
    id: "pulse",
    name: "pulse",
    context: "field",
    description: "Read local coordinates and nearby node bearings."
  },
  ps: {
    id: "ps",
    name: "ps",
    context: "field",
    description: "Inspect hostile processes, daemon status, and local breach activity."
  },
  lsof: {
    id: "lsof",
    name: "lsof",
    context: "field",
    description: "Trace precise bearings to open nodes, landmarks, and hidden handles."
  },
  inject: {
    id: "inject",
    name: "inject",
    context: "battle",
    description: "Inject a hot patch to raise attack for three turns."
  },
  shield: {
    id: "shield",
    name: "shield",
    context: "battle",
    description: "Raise a hardened shell to boost defense for three turns."
  },
  sniff: {
    id: "sniff",
    name: "sniff",
    context: "battle",
    description: "Read enemy diagnostics, memory, and link readiness."
  },
  purge: {
    id: "purge",
    name: "purge",
    context: "battle",
    description: "Purge hostile hooks from your exploit stack and strip enemy buffs."
  }
};
var ZONE_SCRIPT_ASSIGNMENTS = {
  central: "scan",
  north: "trace",
  south: "dump",
  east: "grep",
  cache: "inject",
  west: "shield",
  sandbox: "sniff",
  home: "pulse",
  proc: "ps",
  tmp: "purge",
  dev: "lsof"
};
var OVERWORLD_SCRIPT_ZONES = Object.keys(ZONE_SCRIPT_ASSIGNMENTS);
function getDiscoveredScripts(player) {
  return player.discoveredScripts ?? [];
}
function getFieldScripts(player) {
  return getDiscoveredScripts(player).filter((scriptId) => SCRIPT_DEFS[scriptId]?.context === "field");
}
function getBattleScripts(player) {
  return getDiscoveredScripts(player).filter((scriptId) => SCRIPT_DEFS[scriptId]?.context === "battle");
}
function hasScriptsMenuAccess(state2) {
  return isDevMenuEnabled() && !!state2.showDevMenu || getDiscoveredScripts(state2.player ?? {}).length > 0;
}
function getMenuOptions(state2) {
  if (state2.tutorial?.active) return ["Resume", "Exploits", "Patches"];
  const opts = ["Resume", "Exploits", "Saved Exploits"];
  if (hasScriptsMenuAccess(state2)) opts.push("Scripts");
  opts.push("Patches", state2.player?.bgmMuted ? "Unmute BGM" : "Mute BGM", "Save Game", "Quit to Title");
  if (isDevMenuEnabled() && state2.showDevMenu) opts.push("Developer Options");
  return opts;
}
function getMenuOptionIndex(state2, label) {
  return getMenuOptions(state2).indexOf(label);
}
function buildZoneScriptLocations(finalSecretKey) {
  const result = {};
  for (const zone of OVERWORLD_SCRIPT_ZONES) {
    const map = ZONE_MAPS[zone];
    const candidates = [];
    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        const tile = getTile(map, x, y);
        if (!isWalkable(tile)) continue;
        if (tile === "O" || tile === "$" || tile === "D") continue;
        candidates.push({ x, y });
      }
    }
    const rng = mulberry32(fnv1a(`${finalSecretKey}-${zone}-script`));
    const pickIndex = candidates.length > 0 ? Math.floor(rng() * candidates.length) : 0;
    const coord = candidates[pickIndex] ?? { x: 1, y: 1 };
    result[zone] = { zone, scriptId: ZONE_SCRIPT_ASSIGNMENTS[zone], x: coord.x, y: coord.y };
  }
  return result;
}
function getHiddenScriptLocation(player, zone) {
  return player.hiddenScriptsByZone?.[zone] ?? null;
}
function getDirectionHint(from, to) {
  const parts = [];
  if (to.y < from.y) parts.push("north");
  else if (to.y > from.y) parts.push("south");
  if (to.x < from.x) parts.push("west");
  else if (to.x > from.x) parts.push("east");
  if (parts.length === 0) return "directly beneath your cursor";
  return parts.join("-");
}
function getDistanceHint(from, to) {
  const distance = Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
  if (distance <= 1) return "immediate proximity";
  if (distance <= 4) return "close range";
  if (distance <= 8) return "mid range";
  return "far range";
}
function formatNodeDirection(playerPos, targetPos) {
  if (!targetPos) return "not present";
  return getDirectionHint(playerPos, targetPos);
}

var SKILLS = {
  "Sudo Swipe": {
    name: "Sudo Swipe",
    description: "Execute with root privileges for high damage.",
    power: 20,
    acc: 0.95,
    effect: null
  },
  "Exploit": {
    name: "Exploit",
    description: "Target vulnerabilities to lower defense.",
    power: 10,
    acc: 0.9,
    effect: { type: "debuff", stat: "defense", amount: 10, duration: 3, log: "Target's firewall is corroding!" }
  },
  "Prompt Injection": {
    name: "Prompt Injection",
    description: "Inject malicious code for damage over time.",
    power: 5,
    acc: 0.85,
    effect: { type: "dot", amount: 3, duration: 4, log: "Malicious process is draining memory!" }
  },
  "Cold-Boot": {
    name: "Cold-Boot",
    description: "Force a cold reboot to lower attack speed.",
    power: 12,
    acc: 0.9,
    effect: { type: "debuff", stat: "attack", amount: 8, duration: 3, log: "Target's processing speed throttled!" }
  },
  "Packet Burn": {
    name: "Packet Burn",
    description: "Overheat the network buffer for intense heat.",
    power: 8,
    acc: 0.85,
    effect: { type: "dot", amount: 4, duration: 3, log: "Packet collisions causing thermal damage!" }
  },
  "Deprecation Warning": {
    name: "Deprecation Warning",
    description: "Warn of legacy vulnerabilities to lower defense.",
    power: 5,
    acc: 1,
    effect: { type: "debuff", stat: "defense", amount: 12, duration: 4, log: "Legacy protocols exposed!" }
  },
  "Data Leak": {
    name: "Data Leak",
    description: "Exfiltrate data to drain memory over time.",
    power: 0,
    acc: 0.95,
    effect: { type: "dot", amount: 2, duration: 5, log: "Data exfiltration in progress..." }
  },
  "Logic Bomb": {
    name: "Logic Bomb",
    description: "Plant a bomb that detonates next turn.",
    power: 35,
    acc: 0.8,
    effect: null
  },
  "Encryption Lock": {
    name: "Encryption Lock",
    description: "Encrypt player defenses for a major debuff.",
    power: 0,
    acc: 0.9,
    effect: { type: "debuff", stat: "defense", amount: 20, duration: 2, log: "System resources encrypted and locked!" }
  },
  "Privilege Escalation": {
    name: "Privilege Escalation",
    description: "Gain root access to boost attack.",
    power: 0,
    acc: 1,
    effect: { type: "buff", stat: "attack", amount: 15, duration: 3, log: "Permissions elevated to ROOT!" }
  },
  "Kernel Panic": {
    name: "Kernel Panic",
    description: "Trigger a total system collapse.",
    power: 15,
    acc: 0.7,
    effect: { type: "random", log: "Total system instability detected!" }
  },
  "Process Reap": {
    name: "Process Reap",
    description: "Cull active routines and suppress offensive throughput.",
    power: 14,
    acc: 0.95,
    effect: { type: "debuff", stat: "attack", amount: 12, duration: 3, log: "Active threads were reaped from the target stack!" }
  },
  "Secure Delete": {
    name: "Secure Delete",
    description: "Shred memory blocks for severe lingering damage.",
    power: 10,
    acc: 0.9,
    effect: { type: "dot", amount: 6, duration: 4, log: "Integrity blocks are being securely shredded!" }
  },
  "Bus Fault": {
    name: "Bus Fault",
    description: "Corrupt low-level device traffic with destabilizing force.",
    power: 18,
    acc: 0.85,
    effect: { type: "random", log: "The device bus surges with corrupted traffic!" }
  },
  "Byte": {
    name: "Byte",
    description: "A standard connectivity test.",
    power: 12,
    acc: 1,
    effect: null
  }
};

// src/systems/combat.ts
function createBattle(context, playerCreature, playerIndex, enemyCreature) {
  return {
    context,
    enemy: createBattleParticipant(enemyCreature),
    player: createBattleParticipant(playerCreature),
    playerActiveIndex: playerIndex,
    canCatch: context !== "boss",
    turn: 1,
    log: [`Unbound biomorphic code detected: ${enemyCreature.nickname}.`],
    phase: "player_action",
    actionCursor: 0
  };
}
function createBattleParticipant(creature, overrides = {}) {
  return {
    creature,
    isDefending: false,
    tempDefBonus: 0,
    statuses: [],
    ...overrides,
    statuses: Array.isArray(overrides.statuses) ? [...overrides.statuses] : []
  };
}
function normalizeBattleParticipant(participant) {
  if (!participant?.creature) return createBattleParticipant(rollStarterCreature());
  return {
    creature: participant.creature,
    isDefending: participant.isDefending ?? false,
    tempDefBonus: participant.tempDefBonus ?? 0,
    statuses: Array.isArray(participant.statuses) ? [...participant.statuses] : []
  };
}
function createWildBattle(zone, playerCreature, playerIndex, level) {
  const config = ZONE_CONFIGS[zone];
  const species = config.wildSpecies[Math.floor(Math.random() * config.wildSpecies.length)];
  const enemy = rollWildCreature(zone, species, level);
  return createBattle("wild", playerCreature, playerIndex, enemy);
}
function createDungeonWildBattle(zone, playerCreature, playerIndex, level) {
  const config = ZONE_CONFIGS[zone];
  const species = config.wildSpecies[Math.floor(Math.random() * config.wildSpecies.length)];
  const enemy = rollWildCreature(zone, species, level);
  const battle = createBattle("dungeon_wild", playerCreature, playerIndex, enemy);
  return { ...battle, canCatch: true };
}
function createBossBattle(zone, playerCreature, playerIndex) {
  const config = ZONE_CONFIGS[zone];
  const dungeonCfg = DUNGEON_CONFIGS[zone];
  const boss = rollBoss(config.bossSpecies, dungeonCfg.bossLevel);
  const battle = createBattle("boss", playerCreature, playerIndex, boss);
  return { ...battle, log: [`The ${boss.nickname} roars and blocks the path!`], canCatch: true };
}
function getStatusMod(participant, type, stat) {
  let mod = 0;
  for (const s of participant.statuses ?? []) {
    if (s.type === type && s.stat === stat) {
      mod += s.amount;
    }
  }
  return mod;
}
function calcDamage(attackerParticipant, defenderParticipant, skillPower = 20) {
  const attacker = attackerParticipant.creature;
  const defender = defenderParticipant.creature;
  const atkMod = getStatusMod(attackerParticipant, "buff", "attack") - getStatusMod(attackerParticipant, "debuff", "attack");
  const defMod = getStatusMod(defenderParticipant, "buff", "defense") - getStatusMod(defenderParticipant, "debuff", "defense");
  const atk = calcAttack(attacker.level, attacker.baseStr, attacker.allocatedStr) + atkMod + Math.floor(skillPower / 2);
  const def = calcDefense(defender.level, defender.baseCon, defender.allocatedCon) + defenderParticipant.tempDefBonus + defMod;
  return Math.max(1, Math.floor(atk - def * 0.6));
}
function applySkill(battle, actorKey, targetKey, skillName) {
  const skill = SKILLS[skillName];
  const actor = battle[actorKey];
  const target = battle[targetKey];
  if (!skill) return battle;
  const roll = Math.random();
  if (roll > skill.acc) {
    battle.log.push(`${actor.creature.nickname} used ${skillName}, but it failed!`);
    return battle;
  }
  battle.log.push(`${actor.creature.nickname} used ${skillName}!`);
  if (skill.power > 0) {
    const dmg = calcDamage(actor, target, skill.power);
    target.creature.currentHp = Math.max(0, target.creature.currentHp - dmg);
    battle.log.push(`${target.creature.nickname} took ${dmg} damage!`);
  }
  if (skill.effect) {
    if (skill.effect.type === "random") {
      const effects = [
        { type: "dot", amount: 5, duration: 3, log: "System instability causing data loss!" },
        { type: "debuff", stat: "defense", amount: 15, duration: 3, log: "Defense systems collapsing!" },
        { type: "debuff", stat: "attack", amount: 15, duration: 3, log: "Attack sub-routines failing!" }
      ];
      const effect = effects[Math.floor(Math.random() * effects.length)];
      target.statuses.push({ ...effect });
      battle.log.push(effect.log);
    } else if (skill.effect.type === "buff") {
      actor.statuses.push({ ...skill.effect });
      battle.log.push(skill.effect.log);
    } else {
      target.statuses.push({ ...skill.effect });
      battle.log.push(skill.effect.log);
    }
  }
  return battle;
}
function processStatuses(participant, log) {
  participant.statuses = Array.isArray(participant.statuses) ? participant.statuses : [];
  const nextStatuses = [];
  let dotDamage = 0;
  for (const s of participant.statuses) {
    if (s.type === "dot") {
      dotDamage += s.amount;
    }
    const nextDuration = s.duration - 1;
    if (nextDuration > 0) {
      nextStatuses.push({ ...s, duration: nextDuration });
    } else {
      log.push(`Status effect ${s.type} on ${participant.creature.nickname} expired.`);
    }
  }
  if (dotDamage > 0) {
    participant.creature.currentHp = Math.max(0, participant.creature.currentHp - dotDamage);
    log.push(`${participant.creature.nickname} took ${dotDamage} damage from background processes!`);
  }
  participant.statuses = nextStatuses;
  return participant;
}
function cloneBattle(state2) {
  return {
    ...state2,
    log: [...state2.log],
    enemy: normalizeBattleParticipant({
      ...state2.enemy,
      creature: { ...state2.enemy.creature }
    }),
    player: normalizeBattleParticipant({
      ...state2.player,
      creature: { ...state2.player.creature }
    })
  };
}
function stateStep(battle, party, items) {
  return {
    type: "state",
    battle,
    party,
    items
  };
}
function animationStep(kind, actor, frames) {
  return {
    type: "animation",
    animation: { kind, actor, frames }
  };
}
function syncParty(party, battle) {
  const nextParty = [...party];
  nextParty[battle.playerActiveIndex] = battle.player.creature;
  return nextParty;
}
function enemyPlan(state2, party) {
  if (state2.phase === "result" || state2.phase === "catch_result") return [];
  const steps = [];
  const actor = state2.enemy;
  const target = state2.player;
  const roll = Math.random();
  const announced = cloneBattle(state2);
  announced.phase = "enemy_turn";
  if (roll < 0.15) {
    announced.log.push(`${actor.creature.nickname} braces!`);
    steps.push(stateStep(announced, syncParty(party, announced)));
    steps.push(animationStep("defend", "enemy", 5));
    const resolved = cloneBattle(announced);
    const defense = calcDefense(actor.creature.level, actor.creature.baseCon, actor.creature.allocatedCon);
    const bonus = Math.floor(defense * 0.3);
    resolved.enemy = { ...resolved.enemy, isDefending: true, tempDefBonus: bonus };
    const final = finishTurn(resolved, party);
    steps.push(...final.steps);
    return steps;
  }
  const skills = actor.creature.skills;
  const skillName = skills[Math.floor(Math.random() * skills.length)];
  const withSkill = applySkill(announced, "enemy", "player", skillName);
  steps.push(stateStep(withSkill, syncParty(party, withSkill)));
  steps.push(animationStep("attack", "enemy", 6));
  steps.push(animationStep("hit", "player", 4));
  const resolved = cloneBattle(withSkill);
  resolved.enemy.isDefending = false;
  resolved.enemy.tempDefBonus = 0;
  if (resolved.player.creature.currentHp <= 0) {
    resolved.log.push(`${resolved.player.creature.nickname} fainted!`);
    resolved.phase = "result";
    resolved.result = "lose";
    steps.push(stateStep(resolved, syncParty(party, resolved)));
    return steps;
  }
  const final = finishTurn(resolved, party);
  steps.push(...final.steps);
  return steps;
}
function finishTurn(battle, party) {
  const steps = [];
  const log = [];
  battle.player = processStatuses(battle.player, log);
  battle.enemy = processStatuses(battle.enemy, log);
  for (const m of log) battle.log.push(m);
  battle.turn += 1;
  battle.phase = "player_action";
  if (battle.player.creature.currentHp <= 0) {
    battle.log.push(`${battle.player.creature.nickname} fainted!`);
    battle.phase = "result";
    battle.result = "lose";
  } else if (battle.enemy.creature.currentHp <= 0) {
    battle.log.push(`${battle.enemy.creature.nickname} was defeated!`);
    battle.phase = "result";
    battle.result = "win";
  }
  steps.push(stateStep(battle, syncParty(party, battle)));
  return { battle, steps };
}
function planBattleAction(state2, action, playerParty, playerItems, options) {
  const steps = [];
  const initial = cloneBattle(state2);
  initial.selectingSkill = false;
  initial.selectingScript = false;
  initial.selectingSwitch = false;
  initial.phase = "enemy_turn";
  let items = playerItems;
  let currentParty = playerParty;
  if (action === "skill" && options?.skillName) {
    const withSkill = applySkill(initial, "player", "enemy", options.skillName);
    steps.push(stateStep(withSkill, syncParty(currentParty, withSkill)));
    steps.push(animationStep("attack", "player", 6));
    steps.push(animationStep("hit", "enemy", 4));
    const resolved = cloneBattle(withSkill);
    resolved.player.isDefending = false;
    resolved.player.tempDefBonus = 0;
    const enemy = resolved.enemy.creature;
    if (enemy.currentHp / enemy.maxHp <= 0.5 && resolved.canCatch) {
      resolved.log.push(`${enemy.nickname} is weakened! You can try to catch it.`);
    }
    if (enemy.currentHp <= 0) {
      resolved.log.push(`${enemy.nickname} was defeated!`);
      resolved.phase = "result";
      resolved.result = "win";
      steps.push(stateStep(resolved, syncParty(currentParty, resolved)));
      return { initialBattle: initial, steps };
    }
    return { initialBattle: initial, steps: [...steps, ...enemyPlan(resolved, currentParty)] };
  }
  if (action === "script" && options?.scriptName) {
    const resolved = cloneBattle(initial);
    const scriptName = options.scriptName;
    if (scriptName === "inject") {
      resolved.log.push(`${resolved.player.creature.nickname} executes inject.`);
      resolved.player.statuses.push({ type: "buff", stat: "attack", amount: 12, duration: 3, log: "Attack stack overclocked." });
      resolved.log.push("Attack stack overclocked.");
      steps.push(stateStep(resolved, syncParty(currentParty, resolved)));
      steps.push(animationStep("defend", "player", 5));
      return { initialBattle: initial, steps: [...steps, ...enemyPlan(resolved, currentParty)] };
    }
    if (scriptName === "shield") {
      resolved.log.push(`${resolved.player.creature.nickname} executes shield.`);
      resolved.player.statuses.push({ type: "buff", stat: "defense", amount: 12, duration: 3, log: "Defensive shell stabilized." });
      resolved.log.push("Defensive shell stabilized.");
      steps.push(stateStep(resolved, syncParty(currentParty, resolved)));
      steps.push(animationStep("defend", "player", 5));
      return { initialBattle: initial, steps: [...steps, ...enemyPlan(resolved, currentParty)] };
    }
    if (scriptName === "sniff") {
      const enemy = resolved.enemy.creature;
      resolved.log.push(`${resolved.player.creature.nickname} executes sniff.`);
      resolved.log.push(`Diagnostics: Lv${enemy.level} MB ${enemy.currentHp}/${enemy.maxHp}`);
      resolved.log.push(`Attack ${calcAttack(enemy.level, enemy.baseStr, enemy.allocatedStr)} // Defense ${calcDefense(enemy.level, enemy.baseCon, enemy.allocatedCon)}`);
      resolved.log.push(resolved.canCatch && enemy.currentHp / enemy.maxHp <= 0.5 ? "Link status: capture window open." : "Link status: reduce memory below 50%.");
      steps.push(stateStep(resolved, syncParty(currentParty, resolved)));
      steps.push(animationStep("defend", "player", 4));
      return { initialBattle: initial, steps: [...steps, ...enemyPlan(resolved, currentParty)] };
    }
    if (scriptName === "purge") {
      resolved.log.push(`${resolved.player.creature.nickname} executes purge.`);
      const removedPlayerStatuses = resolved.player.statuses.filter((status) => status.type === "dot" || status.type === "debuff").length;
      const removedEnemyBuffs = resolved.enemy.statuses.filter((status) => status.type === "buff").length;
      resolved.player.statuses = resolved.player.statuses.filter((status) => status.type !== "dot" && status.type !== "debuff");
      resolved.enemy.statuses = resolved.enemy.statuses.filter((status) => status.type !== "buff");
      if (removedPlayerStatuses > 0) {
        resolved.log.push("Corrupt hooks were purged from the active exploit stack.");
      }
      if (removedEnemyBuffs > 0) {
        resolved.log.push("Enemy privilege escalations were stripped from memory.");
      }
      if (removedPlayerStatuses === 0 && removedEnemyBuffs === 0) {
        resolved.log.push("No hostile hooks were found to purge.");
      }
      steps.push(stateStep(resolved, syncParty(currentParty, resolved)));
      steps.push(animationStep("defend", "player", 5));
      return { initialBattle: initial, steps: [...steps, ...enemyPlan(resolved, currentParty)] };
    }
    resolved.phase = "player_action";
    resolved.log.push("Script rejected by the active battle context.");
    return { initialBattle: resolved, steps: [] };
  }
  if (action === "defend") {
    initial.log.push(`${initial.player.creature.nickname} braces!`);
    steps.push(animationStep("defend", "player", 5));
    const resolved = cloneBattle(initial);
    const defense = calcDefense(resolved.player.creature.level, resolved.player.creature.baseCon, resolved.player.creature.allocatedCon);
    const bonus = Math.floor(defense * 0.3);
    resolved.player = { ...resolved.player, isDefending: true, tempDefBonus: bonus };
    resolved.log.push(`Defense rose by ${bonus}.`);
    return { initialBattle: initial, steps: [...steps, ...enemyPlan(resolved, currentParty)] };
  }
  if (action === "flee") {
    initial.log.push(`${initial.player.creature.nickname} tries to flee!`);
    steps.push(animationStep("flee", "player", 6));
    const resolved = cloneBattle(initial);
    const roll = Math.random();
    const chance = 0.5 + Math.max(0, battleScore(resolved.player.creature) - battleScore(resolved.enemy.creature)) * 0.02;
    if (state2.context === "tutorial" || roll < Math.min(0.9, chance)) {
      resolved.log.push("Program compiled with exit code 0");
      resolved.phase = "result";
      resolved.result = "flee";
      steps.push(stateStep(resolved, syncParty(currentParty, resolved)));
      return { initialBattle: initial, steps };
    }
    resolved.log.push("Program failed to compile exit code 1");
    steps.push(stateStep(resolved, syncParty(currentParty, resolved)));
    return { initialBattle: initial, steps: [...steps, ...enemyPlan(resolved, currentParty)] };
  }
  if (action === "item" && options?.itemId) {
    const item = ITEMS[options.itemId];
    const count = playerItems[options.itemId] ?? 0;
    if (!item || count <= 0) {
      const failed = cloneBattle(initial);
      failed.phase = "player_action";
      failed.log.push("No authorized patches available.");
      return { initialBattle: failed, steps: [] };
    }
    initial.log.push(`${item.name} applied to ${initial.player.creature.nickname}.`);
    steps.push(animationStep("heal", "player", 5));
    const resolved = cloneBattle(initial);
    const healAmount = Math.min(item.healAmount, resolved.player.creature.maxHp - resolved.player.creature.currentHp);
    resolved.player = {
      ...resolved.player,
      creature: {
        ...resolved.player.creature,
        currentHp: Math.min(resolved.player.creature.maxHp, resolved.player.creature.currentHp + item.healAmount)
      }
    };
    resolved.log.push(`Memory restored by ${healAmount} MB.`);
    items = { ...playerItems, [options.itemId]: count - 1 };
    currentParty = syncParty(currentParty, resolved);
    steps.push(stateStep(resolved, currentParty, items));
    return { initialBattle: initial, steps: [...steps, ...enemyPlan(resolved, currentParty)], items };
  }
  if (action === "switch" && options?.switchToIndex !== void 0) {
    const target = playerParty[options.switchToIndex];
    if (options.switchToIndex === state2.playerActiveIndex) {
      const failed = cloneBattle(initial);
      failed.phase = "player_action";
      failed.log.push(`${failed.player.creature.nickname} is already active.`);
      failed.selectingSwitch = false;
      failed.switchCursor = options.switchToIndex;
      return { initialBattle: failed, steps: [] };
    }
    if (!target || target.currentHp <= 0) {
      const failed = cloneBattle(initial);
      failed.phase = "player_action";
      failed.log.push(`That routine cannot execute in combat.`);
      failed.selectingSwitch = false;
      failed.switchCursor = options.switchToIndex;
      return { initialBattle: failed, steps: [] };
    }
    initial.player = createBattleParticipant(target);
    initial.playerActiveIndex = options.switchToIndex;
    initial.selectingSwitch = false;
    initial.switchCursor = options.switchToIndex;
    initial.log.push(`${target.nickname} deployed into the active exploit stack.`);
    currentParty = syncParty(currentParty, initial);
    return { initialBattle: initial, steps: enemyPlan(initial, currentParty) };
  }
  if (action === "capture") {
    initial.log.push(`${initial.player.creature.nickname} initiates a link handshake.`);
    steps.push(animationStep("capture", "player", 8));
    const resolved = cloneBattle(initial);
    const enemy = resolved.enemy.creature;
    const hpRatio = enemy.currentHp / enemy.maxHp;
    if (hpRatio > 0.5) {
      resolved.log.push(`${enemy.nickname} rejects the link. Reduce corruption first.`);
      steps.push(stateStep(resolved, syncParty(currentParty, resolved)));
      return { initialBattle: initial, steps: [...steps, ...enemyPlan(resolved, currentParty)] };
    }
    const chance = catchChance(enemy.currentHp, enemy.maxHp, enemy.level);
    if (Math.random() < chance) {
      resolved.log.push(`Link established. ${enemy.nickname} has entered the protocol.`);
      resolved.phase = "catch_result";
      resolved.result = "caught";
      resolved.caughtCreature = { ...enemy };
      steps.push(stateStep(resolved, syncParty(currentParty, resolved)));
      return { initialBattle: initial, steps };
    }
    resolved.log.push(`${enemy.nickname} broke the handshake.`);
    steps.push(stateStep(resolved, syncParty(currentParty, resolved)));
    return { initialBattle: initial, steps: [...steps, ...enemyPlan(resolved, currentParty)] };
  }
  initial.phase = "player_action";
  return { initialBattle: initial, steps: [] };
}
function calcXpReward(enemy) {
  return 10 + enemy.level * 5 + (enemy.isBoss ? enemy.level * 10 : 0);
}
function calcCreditReward(enemy) {
  return 5 + enemy.level * 2 + (enemy.isBoss ? 50 : 0);
}
function getFirstLivingIndex(party) {
  return party.findIndex((c) => c.currentHp > 0);
}
function isPartyWiped(party) {
  return party.every((c) => c.currentHp <= 0);
}

// src/systems/save.ts
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { spawn, spawnSync } from "child_process";
import { fileURLToPath } from "url";
var MAX_SAVE_SLOTS = 3;
function getSaveDir() {
  const home = os.homedir();
  const platform = process.platform;
  if (platform === "darwin") {
    return path.join(home, "Library", "Application Support", "KernelBreach", "saved_games");
  }
  if (platform === "win32") {
    const appData = process.env.APPDATA || path.join(home, "AppData", "Roaming");
    return path.join(appData, "KernelBreach", "saved_games");
  }
  const xdgDataHome = process.env.XDG_DATA_HOME || path.join(home, ".local", "share");
  return path.join(xdgDataHome, "KernelBreach", "saved_games");
}
function getSlotPath(slot) {
  return path.join(getSaveDir(), `slot_${slot}.json`);
}
function ensureSaveDir() {
  const dir = getSaveDir();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
function saveGame(state2, slot) {
  ensureSaveDir();
  const saveData = {
    slot,
    savedAt: Date.now(),
    player: state2.player
  };
  fs.writeFileSync(getSlotPath(slot), JSON.stringify(saveData, null, 2), "utf8");
  engineDebug(`save slot=${slot} player=${state2.player?.name ?? "unknown"} zone=${state2.player?.currentZone ?? "unknown"} screen=${state2.screen}`);
}
function loadGame(slot) {
  const p = getSlotPath(slot);
  if (!fs.existsSync(p)) return null;
  try {
    const raw = fs.readFileSync(p, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed?.player) {
      parsed.player = normalizePlayerProgress(parsed.player);
    }
    engineDebug(`load slot=${slot} player=${parsed?.player?.name ?? "unknown"} zone=${parsed?.player?.currentZone ?? "unknown"}`);
    return parsed;
  } catch {
    engineDebug(`load failed slot=${slot}`);
    return null;
  }
}
function getSaveSlots() {
  return Array.from({ length: MAX_SAVE_SLOTS }, (_, i) => {
    const slot = i + 1;
    const p = getSlotPath(slot);
    if (!fs.existsSync(p)) {
      return { slot, exists: false };
    }
    try {
      const raw = fs.readFileSync(p, "utf8");
      const data = JSON.parse(raw);
      const player = data.player;
      return {
        slot,
        exists: true,
        playerName: player.name,
        playerId: player.id,
        zone: player.currentZone,
        playtime: player.playtime,
        savedAt: data.savedAt,
        defeatedBosses: player.defeatedBosses
      };
    } catch {
      return { slot, exists: false };
    }
  });
}

// src/systems/audio.ts
var AUDIO_TRACKS = {
  title: { id: "title", file: "title.wav", loop: true },
  overworld: { id: "overworld", file: "overworld.wav", loop: true },
  dungeon: { id: "dungeon", file: "dungeon.wav", loop: true },
  battle: { id: "battle", file: "battle.wav", loop: true },
  boss: { id: "boss", file: "boss.wav", loop: true },
  victory: { id: "victory", file: "victory.wav", loop: true },
  game_over: { id: "game_over", file: "game_over.wav", loop: true }
};
var AUDIO_CONTEXT_SCREENS = /* @__PURE__ */ new Set([
  "menu",
  "inventory",
  "item_target",
  "party_view",
  "stat_upgrade",
  "storage_view",
  "shop",
  "save_select",
  "scripts_terminal",
  "developer_options"
]);
function getAudioDir() {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [];
  if (process.resourcesPath) {
    candidates.push(
      path.join(process.resourcesPath, "app.asar.unpacked", "assets", "audio"),
      path.join(process.resourcesPath, "assets", "audio")
    );
  }
  candidates.push(
    path.join(path.dirname(process.execPath), "assets", "audio"),
    path.resolve(moduleDir, "../assets/audio")
  );
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return path.resolve(moduleDir, "../assets/audio");
}
function getAudioTrackPath(trackId) {
  const track = AUDIO_TRACKS[trackId];
  if (!track) return null;
  return path.join(getAudioDir(), track.file);
}
var AUDIO_RUNTIME_ENABLED = process.env.KERNELBREACH_ENABLE_AUDIO !== "0";
var audioDebugEnabled = process.env.KERNELBREACH_AUDIO_DEBUG === "1";
var engineDebugEnabled = process.env.KERNELBREACH_VERBOSE_DEBUG === "1";
var DEBUG_LOG_LIMIT = 160;
var debugLogBuffer = [];
function getBundledFfplayPath() {
  if (process.platform !== "win32") return null;
  const bundledPath = path.join(path.dirname(process.execPath), "ffplay.exe");
  return fs.existsSync(bundledPath) ? bundledPath : null;
}
function appendDebugLog(channel, message) {
  debugLogBuffer.push({ channel, message, at: new Date().toLocaleTimeString() });
  if (debugLogBuffer.length > DEBUG_LOG_LIMIT) {
    debugLogBuffer = debugLogBuffer.slice(-DEBUG_LOG_LIMIT);
  }
}
function engineDebug(message) {
  appendDebugLog("engine", message);
  if (!engineDebugEnabled) return;
  try {
    process.stderr.write(`[engine] ${message}
`);
  } catch {
  }
}
function setEngineDebugEnabled(enabled) {
  engineDebugEnabled = enabled;
  engineDebug(`verbose debug ${enabled ? "enabled" : "disabled"}`);
}
function audioDebug(message) {
  appendDebugLog("audio", message);
  if (!audioDebugEnabled) return;
  try {
    process.stderr.write(`[audio] ${message}
`);
  } catch {
  }
}
function setAudioDebugEnabled(enabled) {
  audioDebugEnabled = enabled;
  audioDebug(`audio debug ${enabled ? "enabled" : "disabled"}`);
}
var playerBackend = null;
function commandExists(command, args = ["--help"]) {
  try {
    const result = spawnSync(command, args, { stdio: "ignore" });
    return !result.error || result.error.code !== "ENOENT";
  } catch {
    return false;
  }
}
function detectPlayerBackend() {
  if (playerBackend !== null) return playerBackend;
  const bundledFfplayPath = getBundledFfplayPath();
  const candidates = process.platform === "darwin" ? [
    {
      name: "afplay",
      command: "afplay",
      probeArgs: ["-h"],
      args: (trackPath) => [trackPath]
    }
  ] : process.platform === "win32" ? [
    ...bundledFfplayPath ? [{
      name: "bundled-ffplay",
      command: bundledFfplayPath,
      probeArgs: ["-version"],
      args: (trackPath) => ["-nodisp", "-autoexit", "-loglevel", "quiet", trackPath]
    }] : [],
    {
      name: "ffplay",
      command: "ffplay",
      probeArgs: ["-version"],
      args: (trackPath) => ["-nodisp", "-autoexit", "-loglevel", "quiet", trackPath]
    }
  ] : process.platform === "linux" ? [
    {
      name: "ffplay",
      command: "ffplay",
      probeArgs: ["-version"],
      args: (trackPath) => ["-nodisp", "-autoexit", "-loglevel", "quiet", trackPath]
    },
    {
      name: "aplay",
      command: "aplay",
      probeArgs: ["--version"],
      args: (trackPath) => [trackPath]
    },
    {
      name: "paplay",
      command: "paplay",
      probeArgs: ["--version"],
      args: (trackPath) => [trackPath]
    }
  ] : [];
  for (const candidate of candidates) {
    if (commandExists(candidate.command, candidate.probeArgs)) {
      playerBackend = candidate;
      audioDebug(`selected audio backend ${candidate.name}`);
      return playerBackend;
    }
  }
  playerBackend = false;
  audioDebug(`no supported audio backend found for platform ${process.platform}; using no-op`);
  return playerBackend;
}
function createAudioManager() {
  let muted = false;
  let currentTrackId = null;
  let currentProcess = null;
  let playbackSerial = 0;
  function stopPlayback(reason = "stop requested") {
    playbackSerial++;
    audioDebug(`${reason}; playback serial=${playbackSerial}`);
    const proc = currentProcess;
    currentProcess = null;
    if (proc) {
      try {
        proc.removeAllListeners();
      } catch {
      }
      try {
        proc.kill("SIGTERM");
      } catch {
      }
    }
  }
  function startTrack(trackId) {
    const track = AUDIO_TRACKS[trackId];
    const backend = detectPlayerBackend();
    if (!track) {
      audioDebug("no track definition found; stopping playback");
      stopPlayback("no track definition found");
      currentTrackId = null;
      return;
    }
    if (!AUDIO_RUNTIME_ENABLED) {
      audioDebug(`audio runtime disabled; skipping track ${trackId}`);
      stopPlayback("runtime disabled");
      currentTrackId = null;
      return;
    }
    const trackPath = getAudioTrackPath(trackId);
    audioDebug(`startTrack requested id=${trackId} path=${trackPath}`);
    if (!trackPath || !fs.existsSync(trackPath)) {
      audioDebug(`track file missing for ${trackId}`);
      stopPlayback(`missing track ${trackId}`);
      currentTrackId = null;
      return;
    }
    if (!backend) {
      audioDebug(`no backend available; no-op for ${trackId}`);
      stopPlayback(`no backend for ${trackId}`);
      currentTrackId = null;
      return;
    }
    stopPlayback(`switching to ${trackId}`);
    currentTrackId = trackId;
    const serial = playbackSerial;
    const child = spawn(backend.command, backend.args(trackPath), {
      stdio: ["ignore", "ignore", "ignore"]
    });
    currentProcess = child;
    audioDebug(`spawned ${backend.name} for ${trackId}`);
    child.once("spawn", () => {
      audioDebug(`backend ${backend.name} started for ${trackId}`);
    });
    child.once("error", (error) => {
      if (playbackSerial !== serial || currentTrackId !== trackId) return;
      currentProcess = null;
      audioDebug(`backend ${backend.name} error for ${trackId}: ${error?.message ?? error}`);
    });
    child.once("exit", (code, signal) => {
      if (playbackSerial !== serial) return;
      currentProcess = null;
      audioDebug(`backend ${backend.name} exited for ${trackId} code=${code ?? "null"} signal=${signal ?? "null"}`);
      if (!muted && currentTrackId === trackId && track.loop) {
        startTrack(trackId);
      }
    });
  }
  return {
    sync(trackId, nextMuted) {
      muted = nextMuted;
      audioDebug(`sync track=${trackId ?? "none"} muted=${muted} runtime=${AUDIO_RUNTIME_ENABLED}`);
      if (!AUDIO_RUNTIME_ENABLED || !trackId) {
        stopPlayback(!AUDIO_RUNTIME_ENABLED ? "runtime disabled" : "no track");
        currentTrackId = null;
        return;
      }
      if (muted) {
        currentTrackId = trackId;
        stopPlayback("muted");
        return;
      }
      if (trackId === currentTrackId && currentProcess) return;
      audioDebug(`switching track from ${currentTrackId ?? "none"} to ${trackId}`);
      startTrack(trackId);
    },
    async prime(trackIds = []) {
      if (!AUDIO_RUNTIME_ENABLED) return;
      detectPlayerBackend();
      for (const trackId of Array.from(new Set(trackIds.filter(Boolean)))) {
        const trackPath = getAudioTrackPath(trackId);
        if (trackPath && fs.existsSync(trackPath)) {
          audioDebug(`primed track path ${trackId} -> ${trackPath}`);
        }
      }
    },
    shutdown() {
      muted = true;
      currentTrackId = null;
      audioDebug("audio manager shutdown");
      stopPlayback("shutdown");
    }
  };
}
var audioManager = createAudioManager();

// src/sprites.ts
var BODIES = {
  "Data-Duck": [
    ["            ", "    __      ", "  <({E} )___  ", "   (  ._>   ", "    `--\xB4    "],
    ["            ", "    __      ", "  <({E} )___  ", "   (  ._>   ", "    `--\xB4~   "],
    ["            ", "    __      ", "  <({E} )___  ", "   (  .__>  ", "    `--\xB4    "]
  ],
  "Honk-Process": [
    ["            ", "     ({E}>    ", "     ||     ", "   _(__)_   ", "    ^^^^    "],
    ["            ", "    ({E}>     ", "     ||     ", "   _(__)_   ", "    ^^^^    "],
    ["            ", "     ({E}>>   ", "     ||     ", "   _(__)_   ", "    ^^^^    "]
  ],
  "Bit-Blob": [
    ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  (      )  ", "   `----\xB4   "],
    ["            ", "  .------.  ", " (  {E}  {E}  ) ", " (        ) ", "  `------\xB4  "],
    ["            ", "    .--.    ", "   ({E}  {E})   ", "   (    )   ", "    `--\xB4    "]
  ],
  "Cache-Cat": [
    ["            ", "   /\\_/\\    ", "  ( {E}   {E})  ", "  (  \u03C9  )   ", '  (")_(")   '],
    ["            ", "   /\\_/\\    ", "  ( {E}   {E})  ", "  (  \u03C9  )   ", '  (")_(")~  '],
    ["            ", "   /\\-/\\    ", "  ( {E}   {E})  ", "  (  \u03C9  )   ", '  (")_(")   ']
  ],
  "Firewall-Drake": [
    ["            ", "  /^\\  /^\\  ", " <  {E}  {E}  > ", " (   ~~   ) ", "  `-vvvv-\xB4  "],
    ["            ", "  /^\\  /^\\  ", " <  {E}  {E}  > ", " (        ) ", "  `-vvvv-\xB4  "],
    ["   ~    ~   ", "  /^\\  /^\\  ", " <  {E}  {E}  > ", " (   ~~   ) ", "  `-vvvv-\xB4  "]
  ],
  "Socket-Octo": [
    ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  (______)  ", "  /\\/\\/\\/\\  "],
    ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  (______)  ", "  \\/\\/\\/\\/  "],
    ["     o      ", "   .----.   ", "  ( {E}  {E} )  ", "  (______)  ", "  /\\/\\/\\/\\  "]
  ],
  "Packet-Eel": [
    ["            ", "  <_{E}__{E}====", "    \\\\~~~~~~~", "            ", "            "],
    ["            ", "==={E}__{E}__>  ", "  ~~~~~~~//  ", "            ", "            "],
    ["     ~      ", "  <_{E}__{E}====", "    \\\\~~~~~~~", "            ", "            "]
  ],
  "Port-Wyrm": [
    ["            ", "  <{E}===={E}===", "   \\\\_8080~~", "            ", "            "],
    ["            ", "==={E}===={E}>  ", "  ~~PORT_// ", "            ", "            "],
    ["     :      ", "  <{E}===={E}===", "   \\\\_8080~~", "            ", "            "]
  ],
  "Wifi-Owl": [
    ["            ", "   /\\  /\\   ", "  (({E})({E}))  ", "  (  ><  )  ", "   `----\xB4   "],
    ["            ", "   /\\  /\\   ", "  (({E})({E}))  ", "  (  ><  )  ", "   .----.   "],
    ["            ", "   /\\  /\\   ", "  (({E})(- ))  ", "  (  ><  )  ", "   `----\xB4   "]
  ],
  "Ice-Pack": [
    ["            ", "  .---.     ", "  ({E}>{E})     ", " /(   )\\    ", "  `---\xB4     "],
    ["            ", "  .---.     ", "  ({E}>{E})     ", " |(   )|    ", "  `---\xB4     "],
    ["  .---.     ", "  ({E}>{E})     ", " /(   )\\    ", "  `---\xB4     ", "   ~ ~      "]
  ],
  "Shell-Turtle": [
    ["            ", "   _,--._   ", "  ( {E}  {E} )  ", " /[______]\\ ", "  ``    ``  "],
    ["            ", "   _,--._   ", "  ( {E}  {E} )  ", " /[______]\\ ", "   ``  ``   "],
    ["            ", "   _,--._   ", "  ( {E}  {E} )  ", " /[======]\\ ", "  ``    ``  "]
  ],
  "Shell-Snail": [
    ["            ", " {E}    .--.  ", "  \\  ( @ )  ", "   \\_`--\xB4   ", "  ~~~~~~~   "],
    ["            ", "  {E}   .--.  ", "  |  ( @ )  ", "   \\_`--\xB4   ", "  ~~~~~~~   "],
    ["            ", " {E}    .--.  ", "  \\  ( @  ) ", "   \\_`--\xB4   ", "   ~~~~~~   "]
  ],
  "Phantom-Thread": [
    ["            ", "   .----.   ", "  / {E}  {E} \\  ", "  |      |  ", "  ~`~``~`~  "],
    ["            ", "   .----.   ", "  / {E}  {E} \\  ", "  |      |  ", "  `~`~~`~`  "],
    ["    ~  ~    ", "   .----.   ", "  / {E}  {E} \\  ", "  |      |  ", "  ~~`~~`~~  "]
  ],
  "RAM-Spike": [
    ["            ", "}~(______)~{", "}~({E} .. {E})~{", "  ( .--. )  ", "  (_/  \\_)  "],
    ["            ", "~}(______){~", "~}({E} .. {E}){~", "  ( .--. )  ", "  (_/  \\_)  "],
    ["            ", "}~(______)~{", "}~({E} .. {E})~{", "  (  --  )  ", "  ~_/  \\_~  "]
  ],
  "Capy-Buffer": [
    ["            ", "  n______n  ", " ( {E}    {E} ) ", " (   oo   ) ", "  `------\xB4  "],
    ["            ", "  n______n  ", " ( {E}    {E} ) ", " (   Oo   ) ", "  `------\xB4  "],
    ["    ~  ~    ", "  u______n  ", " ( {E}    {E} ) ", " (   oo   ) ", "  `------\xB4  "]
  ],
  "Spike-Code": [
    ["            ", " n  ____  n ", " | |{E}  {E}| | ", " |_|    |_| ", "   |    |   "],
    ["            ", "    ____    ", " n |{E}  {E}| n ", " |_|    |_| ", "   |    |   "],
    [" n        n ", " |  ____  | ", " | |{E}  {E}| | ", " |_|    |_| ", "   |    |   "]
  ],
  "Bot-Node": [
    ["            ", "   .[||].   ", "  [ {E}  {E} ]  ", "  [ ==== ]  ", "  `------\xB4  "],
    ["            ", "   .[||].   ", "  [ {E}  {E} ]  ", "  [ -==- ]  ", "  `------\xB4  "],
    ["     *      ", "   .[||].   ", "  [ {E}  {E} ]  ", "  [ ==== ]  ", "  `------\xB4  "]
  ],
  "Sync-Hare": [
    ["            ", "   (\\__/)   ", "  ( {E}  {E} )  ", " =(  ..  )= ", '  (")__(")  '],
    ["            ", "   (|__/)   ", "  ( {E}  {E} )  ", " =(  ..  )= ", '  (")__(")  '],
    ["            ", "   (\\__/)   ", "  ( {E}  {E} )  ", " =( .  . )= ", '  (")__(")  ']
  ],
  "Macro-Shroom": [
    ["            ", " .-o-OO-o-. ", "(__________)", "   |{E}  {E}|   ", "   |____|   "],
    ["            ", " .-O-oo-O-. ", "(__________)", "   |{E}  {E}|   ", "   |____|   "],
    ["   . o  .   ", " .-o-OO-o-. ", "(__________)", "   |{E}  {E}|   ", "   |____|   "]
  ],
  "Da-Kernel": [
    ["            ", "  /\\    /\\  ", " ( {E}    {E} ) ", " (   ..   ) ", "  `------\xB4  "],
    ["            ", "  /\\    /|  ", " ( {E}    {E} ) ", " (   ..   ) ", "  `------\xB4  "],
    ["            ", "  /\\    /\\  ", " ( {E}    {E} ) ", " (   ..   ) ", "  `------\xB4~ "]
  ],
  "Electrobyte": [
    ["      / \\ / \\   ", "    --{E}---{E}-- ", "     /  / \\  \\  ", "    ^ ^ ^ ^ ^ ^ ", "                "],
    ["      \\ / \\ /   ", "    --{E}---{E}-- ", "     \\  \\ /  /  ", "    v v v v v v ", "                "],
    ["      - - - -   ", "    --{E}---{E}-- ", "     -  - -  -  ", "    ~ ~ ~ ~ ~ ~ ", "                "]
  ],
  "Killabit": [
    ["      _______   ", "     [| {E} {E} |]  ", "     <|  X  |>  ", "      \\_____/   ", "      /     \\   "],
    ["      _______   ", "     [| {E} {E} |]  ", "     <| -X- |>  ", "      \\_____/   ", "      |     |   "],
    ["      _______   ", "     [| {E} {E} |]  ", "     <|  X  |>  ", "      \\_____/   ", "      \\     /   "]
  ],
  "Encryptobot": [
    ["       _.[{E}]._ ", "      /--------- \\", "     | [ CIPHER ] |", "     |  {E}   {E}  |", "       /| / \\ |\\  "],
    ["       _.[{E}]._ ", "      /--------- \\", "     | < CIPHER > |", "     |  {E}   {E}  |", "       \\| \\ / |/  "],
    ["       _:[{E}]:_ ", "      /--------- \\", "     | [ CIPHER ] |", "     |  {E}   {E}  |", "       -| - - |-  "]
  ],
  "Hashpass": [
    ["      .-----.   ", "     / {E}  {E} \\  ", "    |  *KEY*  | ", "     '====='    ", "      ~ ~ ~ ~   "],
    ["      .-----.   ", "     / {E}  {E} \\  ", "    | -*KEY*- | ", "     '====='    ", "       ~ ~ ~    "],
    ["      .-----.   ", "     / {E}  {E} \\  ", "    |  *KEY*  | ", "     '====='    ", "      ` ` ` `   "]
  ],
  "Eskalate": [
    ["     [ ACCESS  ]", "    [| {E}   {E} |]", "    [|  LEVEL  |]", "    [|  99999  |]", "     \\________/"],
    ["     < ACCESS  >", "    <| {E}   {E} |>", "    <|  LEVEL  |>", "    <|  99999  |>", "     \\________/"],
    ["     [ ACCESS  ]", "    [| {E}   {E} |]", "    [|  LEVEL  |]", "    [|  88888  |]", "     \\________/"]
  ],
  "Logic-Bomb": [
    ["      [  ERROR ]", "     [| {E}  {E} |]", "      \\---!----/", "         / \\    ", "                "],
    ["      [ ERROR! ]", "     [| {E}  {E} |]", "      \\---!---/ ", "         \\ /    ", "                "],
    ["      [  ERROR ]", "     [| {E}  {E} |]", "      \\---!----/", "         | |    ", "                "]
  ],
  "Key-Logger": [
    ["      /\\ [ {E} ]/\\", "     |  [LOG]  |", "      \\/[---]\\/", "      /|     |\\", "                "],
    ["      -- [ {E} ]--", "     | < LOG > |", "      --[---]--", "      \\|     |/", "                "],
    ["      \\/ [ {E} ]\\/", "     |  [LOG]  |", "      /\\[---]/\\", "      -|     |-", "                "]
  ],
  "Trojan-Horse": [
    ["      _..__   /|", "     | {E}  |_/_|", "     |  DATA____|", "     |_|--|_|   ", "                "],
    ["      _..__   /|", "     | {E}  |_/_|", "     | -DATA-___|", "     |_|--|_|   ", "                "],
    ["      _..__   \\|", "     | {E}  |_\\_|", "     |  DATA____|", "     |_|--|_|   ", "                "]
  ],
  "Ransom-Ware": [
    ["      .-------.", "     /  [ {E} ]  \\", "     |  LOCKED  |", "     \\  [ {E} ]  /", "      '-------' "],
    ["      .-------.", "     <  [ {E} ]  >", "     | -LOCKED- |", "     <  [ {E} ]  >", "      '-------' "],
    ["      .-------.", "     /  [ {E} ]  \\", "     |  LOCKED  |", "     \\  [ {E} ]  /", "      '-------' "]
  ],
  "Bit-Stalker": [
    ["      / \\  / \\  ", "     [ {E}][{E} ] ", "      \\ /--\\ /  ", "      / \\  / \\  ", "                "],
    ["      - -  - -  ", "     [ {E}][{E} ] ", "      - -  - -  ", "      \\ /--\\ /  ", "                "],
    ["      / \\  / \\  ", "     [ {E}][{E} ] ", "      \\ /--\\ /  ", "      - -  - -  ", "                "]
  ],
  "Null-Void": [
    ["      {  ???  } ", "     {  {E} {E}  } ", "      {  ???  } ", "                ", "                "],
    ["      {{ ??? }} ", "     {{ {E} {E} }} ", "      {{ ??? }} ", "                ", "                "],
    ["      {  ???  } ", "     {  {E} {E}  } ", "      {  ???  } ", "       . . . .  ", "                "]
  ],
  "Worm-Link": [
    ["     O-O-O-O-O  ", "    (  {E}  {E} ) ", "     `-+-+-+-+` ", "                ", "                "],
    ["     -O-O-O-O-  ", "    (  {E}  {E} ) ", "     `-+-+-+-+` ", "                ", "                "],
    ["     O-O-O-O-O  ", "    (  {E}  {E} ) ", "     `-+-+-+-+` ", "       ~ ~ ~    ", "                "]
  ],
  "Spy-Ware": [
    ["      [SCANNING...]", "     [ {E} {E} {E} ]", "     [  {E} {E}  ]", "      \\_______/ ", "      / | | | \\ "],
    ["      [ANALYZING..]", "     [ {E} {E} {E} ]", "     [  {E} {E}  ]", "      \\_______/ ", "      | | | | | "],
    ["      [SCANNING...]", "     [ {E} {E} {E} ]", "     [  {E} {E}  ]", "      \\_______/ ", "      \\ | | | / "]
  ]
};
var HAT_LINES = {
  none: "            ",
  crown: "   \\^^^/    ",
  tophat: "   [___]    ",
  propeller: "    -+-     ",
  halo: "   (   )    ",
  wizard: "    /^\\     ",
  beanie: "   (___)    ",
  tinyduck: "    ,>      "
};
function renderSprite(species, eye, hat, frame = 0) {
  const frames = BODIES[species];
  const body = frames[frame % frames.length].map((line) => line.replaceAll("{E}", eye));
  const lines = [...body];
  if (hat !== "none" && !lines[0].trim()) {
    lines[0] = HAT_LINES[hat];
  }
  if (!lines[0].trim() && frames.every((f) => !f[0].trim())) lines.shift();
  return lines;
}
BODIES["Sudo -S"] = BODIES["Da-Kernel"];
BODIES["Fork-Bomb"] = [
  ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  | /\\/\\ |  ", "   `-!!-'   "],
  ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  | \\/\\/ |  ", "   `-!!-'   "],
  ["    * *     ", "   .----.   ", "  ( {E}  {E} )  ", "  | /\\/\\ |  ", "   `-!!-'   "]
];
BODIES["Zombie-Proc"] = [
  ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  /|_==_|\\  ", "   /  /\\    "],
  ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  /|_==_|\\  ", "    /\\  \\   "],
  ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  /|_--_|\\  ", "   /  /\\    "]
];
BODIES["Dropper-File"] = [
  ["            ", "   ______   ", "  | {E}  {E} |  ", "  | PAYLD|   ", "  `------'   "],
  ["            ", "   ______   ", "  | {E}  {E} |  ", "  | DROP |   ", "  `------'   "],
  ["     v      ", "   ______   ", "  | {E}  {E} |  ", "  | PAYLD|   ", "  `------'   "]
];
BODIES["Wipe-Script"] = [
  ["            ", "  ./----\\.  ", "  | {E}  {E} |  ", "  | rm - |   ", "   `===='    "],
  ["            ", "  .|----|.  ", "  | {E}  {E} |  ", "  | shred|   ", "   `===='    "],
  ["    ~~~     ", "  ./----\\.  ", "  | {E}  {E} |  ", "  | rm - |   ", "   `===='    "]
];
BODIES["Raw-Sector"] = [
  ["            ", "  [======]  ", "  [ {E}  {E} ]  ", "  [__||__]  ", "   / || \\    "],
  ["            ", "  [======]  ", "  [ {E}  {E} ]  ", "  [= || =]  ", "   / || \\    "],
  ["    . .     ", "  [======]  ", "  [ {E}  {E} ]  ", "  [__||__]  ", "   / || \\    "]
];
BODIES["IO-Leech"] = [
  ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  /==||==\\  ", "   ~~  ~~    "],
  ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  /==||==\\  ", "    ~~ ~~    "],
  ["      o     ", "   .----.   ", "  ( {E}  {E} )  ", "  /==||==\\  ", "   ~~  ~~    "]
];
BODIES["Init-Reaper"] = [
  ["            ", "   /^^^^\\   ", "  ( {E}  {E} )  ", "  | INIT |   ", "   \\\\__//    "],
  ["            ", "   /^^^^\\   ", "  ( {E}  {E} )  ", "  | REAP |   ", "   \\\\__//    "],
  ["    ***     ", "   /^^^^\\   ", "  ( {E}  {E} )  ", "  | INIT |   ", "   \\\\__//    "]
];
BODIES["Shred-Null"] = [
  ["            ", "   .~~~~.   ", "  ( {E}  {E} )  ", "  | NULL |   ", "   \\\\##//    "],
  ["            ", "   .~~~~.   ", "  ( {E}  {E} )  ", "  | SHRD |   ", "   \\\\##//    "],
  ["    :::     ", "   .~~~~.   ", "  ( {E}  {E} )  ", "  | NULL |   ", "   \\\\##//    "]
];
BODIES["Kernel-Driver"] = [
  ["            ", "  [ DRIVER] ", "  [ {E}  {E} ]  ", "  [==BUS==] ", "   /_||_\\    "],
  ["            ", "  < DRIVER> ", "  [ {E}  {E} ]  ", "  [==BUS==] ", "   /_||_\\    "],
  ["    ===     ", "  [ DRIVER] ", "  [ {E}  {E} ]  ", "  [==BUS==] ", "   /_||_\\    "]
];

// src/engine/terminal.ts
var ESC = "\x1B";
var RESET = `${ESC}[0m`;
var BOLD = `${ESC}[1m`;
var DIM = `${ESC}[2m`;
var BLINK = `${ESC}[5m`;
var REVERSE = `${ESC}[7m`;
var BLACK = `${ESC}[30m`;
var RED = `${ESC}[31m`;
var GREEN = `${ESC}[32m`;
var YELLOW = `${ESC}[33m`;
var BLUE = `${ESC}[34m`;
var MAGENTA = `${ESC}[35m`;
var CYAN = `${ESC}[36m`;
var WHITE = `${ESC}[37m`;
var GREY = `${ESC}[90m`;
var BRIGHT_RED = `${ESC}[91m`;
var BRIGHT_GREEN = `${ESC}[92m`;
var BRIGHT_YELLOW = `${ESC}[93m`;
var BRIGHT_BLUE = `${ESC}[94m`;
var BRIGHT_MAGENTA = `${ESC}[95m`;
var BRIGHT_CYAN = `${ESC}[96m`;
var BRIGHT_WHITE = `${ESC}[97m`;
var BG_BLACK = `${ESC}[40m`;
var BG_RED = `${ESC}[41m`;
var BG_GREEN = `${ESC}[42m`;
var BG_YELLOW = `${ESC}[43m`;
var BG_BLUE = `${ESC}[44m`;
var BG_MAGENTA = `${ESC}[45m`;
var BG_CYAN = `${ESC}[46m`;
var BG_WHITE = `${ESC}[47m`;
var BG_GREY = `${ESC}[100m`;
var externalRenderSink = null;
var externalTerminalSize = null;
var externalQuitHandler = null;
function clearScreen() {
  process.stdout.write(`${ESC}[2J${ESC}[H`);
}
function requestRuntimeQuit() {
  if (externalQuitHandler) {
    externalQuitHandler();
    return;
  }
  process.exit(0);
}
function enterAltScreen() {
  process.stdout.write(`${ESC}[?1049h`);
}
function leaveAltScreen() {
  process.stdout.write(`${ESC}[?1049l`);
}
function hideCursor() {
  process.stdout.write(`${ESC}[?25l`);
}
function showCursor() {
  process.stdout.write(`${ESC}[?25h`);
}
function getTerminalSize() {
  if (externalTerminalSize) {
    return externalTerminalSize;
  }
  return {
    cols: process.stdout.columns ?? 80,
    rows: process.stdout.rows ?? 24
  };
}
function renderFrame(lines) {
  const { rows } = getTerminalSize();
  const safeLines = rows > 1 ? lines.slice(0, rows - 1) : lines.slice(0, 1);
  if (externalRenderSink) {
    externalRenderSink(safeLines);
    return;
  }
  process.stdout.write(`${ESC}[2J${ESC}[H` + safeLines.join("\n") + "\n");
}
function color(text, c) {
  return `${c}${text}${RESET}`;
}
function bold(text) {
  return `${BOLD}${text}${RESET}`;
}
function dim(text) {
  return `${DIM}${text}${RESET}`;
}
function pad(text, width, align = "left") {
  const stripped = stripAnsi(text);
  const len = stripped.length;
  if (width <= 0) return "";
  if (len > width) return stripped.slice(0, width);
  if (len === width) return text;
  const diff = width - len;
  if (align === "left") return text + " ".repeat(diff);
  if (align === "right") return " ".repeat(diff) + text;
  const left = Math.floor(diff / 2);
  const right = diff - left;
  return " ".repeat(left) + text + " ".repeat(right);
}
function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, "");
}
function wrapText(text, width) {
  if (width <= 0) return [""];
  const raw = stripAnsi(text);
  if (raw.length <= width) return [text];
  const words = raw.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [raw.slice(0, width)];
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= width) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    if (word.length <= width) {
      current = word;
      continue;
    }
    let start = 0;
    while (start < word.length) {
      const chunk = word.slice(start, start + width);
      if (chunk.length === width) {
        lines.push(chunk);
      } else {
        current = chunk;
      }
      start += width;
    }
    if (start >= word.length && word.length % width === 0) {
      current = "";
    }
  }
  if (current) lines.push(current);
  return lines.length > 0 ? lines : [raw.slice(0, width)];
}
function hpBar(current, max, width = 10) {
  const ratio = max > 0 ? current / max : 0;
  const filled = Math.round(ratio * width);
  const empty = width - filled;
  const bar = "\u2588".repeat(filled) + "\u2591".repeat(empty);
  const barColor = ratio > 0.5 ? GREEN : ratio > 0.25 ? YELLOW : RED;
  return `${barColor}${bar}${RESET}`;
}
function xpBar(current, max, width = 10) {
  if (max <= 0) return color("MAX".padEnd(width), BRIGHT_YELLOW);
  const safeWidth = Math.max(0, width);
  const ratio = Math.max(0, Math.min(1, current / max));
  const filled = Math.max(0, Math.min(safeWidth, Math.round(ratio * safeWidth)));
  const empty = Math.max(0, safeWidth - filled);
  return `${BRIGHT_CYAN}${"\u2593".repeat(filled)}${"\u2591".repeat(empty)}${RESET}`;
}
function rarityColor(rarity) {
  switch (rarity) {
    case "common":
      return WHITE;
    case "uncommon":
      return BRIGHT_GREEN;
    case "rare":
      return BRIGHT_BLUE;
    case "epic":
      return BRIGHT_MAGENTA;
    case "legendary":
      return BRIGHT_YELLOW;
    default:
      return WHITE;
  }
}

// src/engine/renderer.ts
var MIN_INFO_PANEL_W = 22;
function getLayout() {
  const { cols, rows } = getTerminalSize();
  const width = Math.max(20, cols);
  if (width < 60) {
    const tileScaleX2 = 1;
    const visibleMapCols2 = Math.max(8, Math.min(MAP_WIDTH, width - 4));
    return {
      mode: "stacked",
      width,
      mapPanelW: visibleMapCols2 * tileScaleX2 + 2,
      infoPanelW: width,
      tileScaleX: tileScaleX2,
      visibleMapCols: visibleMapCols2,
      visibleMapRows: Math.max(6, Math.min(MAP_HEIGHT, rows - 8))
    };
  }
  let tileScaleX = width >= MAP_WIDTH * 2 + MIN_INFO_PANEL_W + 7 ? 2 : 1;
  let visibleMapCols = MAP_WIDTH;
  let mapPanelW = visibleMapCols * tileScaleX;
  let infoPanelW = width - mapPanelW - 7;
  if (infoPanelW < MIN_INFO_PANEL_W) {
    tileScaleX = 1;
    mapPanelW = MAP_WIDTH * tileScaleX;
    infoPanelW = width - mapPanelW - 7;
  }
  if (infoPanelW < MIN_INFO_PANEL_W) {
    visibleMapCols = Math.max(12, Math.min(MAP_WIDTH, Math.floor((width - MIN_INFO_PANEL_W - 7) / tileScaleX)));
    mapPanelW = visibleMapCols * tileScaleX;
    infoPanelW = width - mapPanelW - 7;
  }
  return {
    mode: "split",
    width,
    mapPanelW,
    infoPanelW,
    tileScaleX,
    visibleMapCols,
    visibleMapRows: Math.max(1, Math.min(MAP_HEIGHT, rows - 4))
  };
}
function getViewportStart(total, visible, focus) {
  if (visible >= total) return 0;
  const wanted = focus - Math.floor(visible / 2);
  return Math.max(0, Math.min(wanted, total - visible));
}
function getGameWidth() {
  return getLayout().width;
}
function renderScaledCell(ch, colorCode, scaleX) {
  return `${colorCode}${ch.repeat(scaleX)}${RESET}`;
}
function divider(width = getGameWidth(), char = "\u2500") {
  return "\u251C" + char.repeat(width - 2) + "\u2524";
}
function topBorder(title, width = getGameWidth()) {
  const t = ` ${title} `;
  const side = Math.floor((width - 2 - t.length) / 2);
  const extra = (width - 2 - t.length) % 2;
  return `\u250C${"\u2500".repeat(side)}${BOLD}${BRIGHT_CYAN}${t}${RESET}${"\u2500".repeat(side + extra)}\u2510`;
}
function bottomBorder(width = getGameWidth()) {
  return `\u2514${"\u2500".repeat(width - 2)}\u2518`;
}
function splitTopBorder(title, layout) {
  const leftInner = layout.mapPanelW + 2;
  const rightInner = layout.infoPanelW + 2;
  const strippedTitle = ` ${title} `;
  const fill = Math.max(0, leftInner - strippedTitle.length);
  return `\u250C${BOLD}${BRIGHT_CYAN}${strippedTitle}${RESET}${"\u2500".repeat(fill)}\u252C${"\u2500".repeat(rightInner)}\u2510`;
}
function splitBottomBorder(layout) {
  return `\u2514${"\u2500".repeat(layout.mapPanelW + 2)}\u2534${"\u2500".repeat(layout.infoPanelW + 2)}\u2518`;
}
function splitRow(left, right, layout) {
  return `\u2502 ${pad(left, layout.mapPanelW)} \u2502 ${pad(right, layout.infoPanelW)} \u2502`;
}
function mapTopBorder(zoneName) {
  const layout = getLayout();
  if (layout.mode === "stacked") {
    return topBorder(zoneName, layout.width);
  }
  return splitTopBorder(zoneName, layout);
}
function buildInfoPanel(player, messages) {
  const lines = [];
  const panelWidth = getLayout().mode === "split" ? getLayout().infoPanelW : Math.max(20, getLayout().width - 4);
  const cfg = ZONE_CONFIGS[player.currentZone];
  const objective = getCurrentObjective(player);
  lines.push(bold(color("PARTY", BRIGHT_YELLOW)));
  for (let i = 0; i < 4; i++) {
    const c = player.party[i];
    if (!c) {
      lines.push(dim("  (empty)"));
      continue;
    }
    const active = c.currentHp > 0;
    const name = c.shiny ? `\u2726${c.nickname}` : c.nickname;
    const hp = hpBar(c.currentHp, c.maxHp, 8);
    const lvl = color(`Lv${c.level}`, GREY);
    const faint = active ? "" : color(" [fainted]", RED);
    lines.push(`${active ? "\u25B6" : " "} ${color(name.padEnd(10), active ? BRIGHT_WHITE : GREY)} ${lvl}${faint}`);
    lines.push(`  ${hp} ${c.currentHp}/${c.maxHp} MB`);
  }
  lines.push("");
  lines.push(`${color("Credits:", BRIGHT_YELLOW)} ${color(`${player.gold}CR`, YELLOW)}`);
  lines.push("");
  lines.push(`${color("Zone:", GREY)} ${color(cfg.displayName, BRIGHT_CYAN)}`);
  const bosses = player.defeatedBosses.length;
  lines.push(`${color("Bosses:", GREY)} ${color(`${bosses}/${TOTAL_BOSSES}`, bosses === TOTAL_BOSSES ? BRIGHT_YELLOW : WHITE)}`);
  lines.push("");
  if (objective) {
    lines.push(bold(color("OBJECTIVE", BRIGHT_CYAN)));
    lines.push(`${color("Target:", GREY)} ${objective.bossName}`);
    lines.push(`${color("Sector:", GREY)} ${objective.zoneName}`);
    lines.push(`${color("Vector:", GREY)} ${getTravelVectorLabel(player.currentZone, objective.zone)}`);
    lines.push("");
  } else {
    lines.push(bold(color("OBJECTIVE", BRIGHT_CYAN)));
    lines.push(color("All Security Daemons purged.", BRIGHT_GREEN));
    lines.push(`${color("Vector:", GREY)} Seek the Root Directory.`);
    lines.push("");
  }
  lines.push(dim("[M]enu  [E]nter  [I]nventory"));
  const remaining = MAP_HEIGHT - lines.length;
  if (remaining > 0) {
    lines.push("");
    const wrappedMsgs = [];
    for (const msg of messages) {
      for (const wrapped of wrapText(`> ${msg}`, panelWidth)) {
        wrappedMsgs.push(color(wrapped, GREY));
      }
    }
    const msgs = wrappedMsgs.slice(-Math.min(wrappedMsgs.length, remaining - 1));
    for (const msg of msgs) {
      lines.push(msg);
    }
  }
  return lines;
}
function buildDungeonInfoPanel(player, zone, bossDefeated, messages) {
  const lines = [];
  const panelWidth = getLayout().mode === "split" ? getLayout().infoPanelW : Math.max(20, getLayout().width - 4);
  const cfg = ZONE_CONFIGS[zone];
  lines.push(bold(color("BREACH SITE", RED)));
  lines.push(color(cfg.dungeonName, BRIGHT_RED));
  lines.push("");
  lines.push(bold(color("PARTY", BRIGHT_YELLOW)));
  for (let i = 0; i < 4; i++) {
    const c = player.party[i];
    if (!c) {
      lines.push(dim("  (empty)"));
      continue;
    }
    const active = c.currentHp > 0;
    const name = c.shiny ? `\u2726${c.nickname}` : c.nickname;
    const hp = hpBar(c.currentHp, c.maxHp, 8);
    lines.push(`${active ? "\u25B6" : " "} ${color(name.padEnd(10), active ? WHITE : GREY)} Lv${c.level}`);
    lines.push(`  ${hp} ${c.currentHp}/${c.maxHp} MB`);
  }
  lines.push("");
  if (bossDefeated) {
    lines.push(color("[DAEMON PURGED]", BRIGHT_GREEN));
    lines.push(dim("Find the exit (D)"));
  } else {
    lines.push(color("[DAEMON AWAITS]", BRIGHT_RED));
    lines.push(dim("Seek the B tile"));
  }
  lines.push("");
  lines.push(dim("[E] interact  [M] menu"));
  const remaining = MAP_HEIGHT - lines.length;
  if (remaining > 0) {
    lines.push("");
    const wrappedMsgs = [];
    for (const msg of messages) {
      for (const wrapped of wrapText(`> ${msg}`, panelWidth)) {
        wrappedMsgs.push(color(wrapped, GREY));
      }
    }
    const msgs = wrappedMsgs.slice(-Math.min(wrappedMsgs.length, remaining - 1));
    for (const msg of msgs) {
      lines.push(msg);
    }
  }
  return lines;
}
function getCurrentObjective(player) {
  return BOSS_SEQUENCE.find((boss) => !player.defeatedBosses.includes(boss.species)) ?? null;
}
function getTravelVectorLabel(currentZone, targetZone) {
  if (currentZone === targetZone) return "Seek the local breach site";
  const visited = new Set([currentZone]);
  const queue = [{ zone: currentZone, firstStep: null }];
  while (queue.length > 0) {
    const node = queue.shift();
    const neighbors = ZONE_GRAPH[node.zone] ?? {};
    for (const [dir, nextZone] of Object.entries(neighbors)) {
      if (visited.has(nextZone)) continue;
      const firstStep = node.firstStep ?? dir;
      if (nextZone === targetZone) {
        return firstStep.charAt(0).toUpperCase() + firstStep.slice(1);
      }
      visited.add(nextZone);
      queue.push({ zone: nextZone, firstStep });
    }
  }
  return "Unknown";
}
function getTargetLog(player) {
  return player.targetLog ?? [];
}
function buildTargetLogLines(player, width) {
  const lines = [];
  lines.push(bold("Threat Log"));
  const threatEntries = getTargetLog(player);
  if (threatEntries.length === 0) {
    lines.push(dim("No daemon records written yet."));
  } else {
    for (const entry of threatEntries) {
      for (const wrapped of wrapText(entry, width)) {
        lines.push(wrapped);
      }
    }
  }
  lines.push("");
  lines.push(bold("Key Pieces"));
  const keyEntries = getKeyPieceEntries(player);
  if (keyEntries.length === 0) {
    lines.push(dim("No key pieces recovered."));
  } else {
    for (const entry of keyEntries) {
      for (const wrapped of wrapText(entry, width)) {
        lines.push(wrapped);
      }
    }
  }
  return lines;
}
function isTutorialActive(state2) {
  return state2.tutorial?.active === true;
}
function getTutorialPrompt(state2) {
  if (!isTutorialActive(state2)) return "";
  const step = state2.tutorial.step;
  const battleStep = state2.tutorial.battleStep;
  if (step === "move") return "Tutorial: Use WASD or arrow keys to move one tile.";
  if (step === "open_menu") return "Tutorial: Press M to open the menu.";
  if (step === "open_party") return "Tutorial: Select Exploits and press Enter.";
  if (step === "close_party") return "Tutorial: This is your active exploit. Press X to return.";
  if (step === "open_inventory") return "Tutorial: Press I to open Patches.";
  if (step === "close_inventory") return "Tutorial: Patches restore memory. Press X to return.";
  if (step === "start_battle") return "Tutorial: Press E to start a training battle.";
  if (step === "battle") {
    if (battleStep === "skill") return "Tutorial: Choose Skill, then use Byte.";
    if (battleStep === "patch") return "Tutorial: Choose Patch and use a Patch-Kit.";
    if (battleStep === "script") return "Tutorial: Choose Scripts, then run sniff.";
    if (battleStep === "link") return "Tutorial: Link captures weakened hostile code. Choose Link once.";
    if (battleStep === "finish") return "Tutorial: Choose Flee to end training, or finish the battle.";
  }
  return "Tutorial: Follow the prompt to continue.";
}
function renderOverworld(state2) {
  const { player, messages } = state2;
  const map = ZONE_MAPS[player.currentZone];
  const tutorialPrompt = getTutorialPrompt(state2);
  const infoLines = buildInfoPanel(player, tutorialPrompt ? [tutorialPrompt, ...messages] : messages);
  const rows = [];
  const layout = getLayout();
  const viewportX = getViewportStart(MAP_WIDTH, layout.visibleMapCols, player.position.x);
  const viewportY = getViewportStart(MAP_HEIGHT, layout.visibleMapRows, player.position.y);
  const hiddenScript = getHiddenScriptLocation(player, player.currentZone);
  const hiddenRecovered = player.recoveredScriptZones?.includes(player.currentZone);
  rows.push(mapTopBorder(ZONE_CONFIGS[player.currentZone].displayName));
  for (let screenY = 0; screenY < layout.visibleMapRows; screenY++) {
    const y = viewportY + screenY;
    const rawRow = map[y];
    let displayRow = "";
    for (let screenX = 0; screenX < layout.visibleMapCols; screenX++) {
      const x = viewportX + screenX;
      if (x === player.position.x && y === player.position.y) {
        displayRow += renderScaledCell("@", BRIGHT_MAGENTA, layout.tileScaleX);
      } else {
        const ch = rawRow[x];
        const isHiddenScriptTile = !hiddenRecovered && hiddenScript && x === hiddenScript.x && y === hiddenScript.y;
        const c = isHiddenScriptTile ? BRIGHT_MAGENTA : TILE_COLORS[ch] ?? ZONE_GROUND_COLORS[player.currentZone];
        displayRow += renderScaledCell(ch, c, layout.tileScaleX);
      }
    }
    const padNeeded = layout.mapPanelW - layout.visibleMapCols * layout.tileScaleX;
    displayRow += " ".repeat(Math.max(0, padNeeded));
    if (layout.mode === "split") {
      const info = infoLines[screenY] ?? "";
      rows.push(splitRow(displayRow, info, layout));
    } else {
      rows.push(`\u2502 ${pad(displayRow, layout.width - 4)} \u2502`);
    }
  }
  if (layout.mode === "stacked") {
    rows.push(divider(layout.width));
    for (const line of infoLines.slice(0, Math.max(4, getTerminalSize().rows - rows.length - 3))) {
      rows.push(`\u2502 ${pad(line, layout.width - 4)} \u2502`);
    }
  }
  rows.push(layout.mode === "split" ? splitBottomBorder(layout) : bottomBorder());
  rows.push(`${DIM}WASD/\u2191\u2193\u2190\u2192:Move  E:Enter  M:Menu  I:Inventory  Q:Quit${RESET}`);
  renderFrame(rows);
}
function renderDungeon(state2) {
  const { player, dungeon, messages } = state2;
  if (!dungeon) return;
  const cfg = DUNGEON_CONFIGS[dungeon.zone];
  const map = cfg.map;
  const infoLines = buildDungeonInfoPanel(player, dungeon.zone, dungeon.bossDefeated, messages);
  const rows = [];
  const layout = getLayout();
  const viewportX = getViewportStart(DUNGEON_WIDTH, layout.visibleMapCols, dungeon.playerPos.x);
  const viewportY = getViewportStart(DUNGEON_HEIGHT, layout.visibleMapRows, dungeon.playerPos.y);
  const title = `${ZONE_CONFIGS[dungeon.zone].dungeonName}`;
  rows.push(mapTopBorder(title));
  for (let screenY = 0; screenY < layout.visibleMapRows; screenY++) {
    const y = viewportY + screenY;
    const rawRow = map[y];
    const infoLine = infoLines[screenY] ?? "";
    const colors = DUNGEON_TILE_COLORS[dungeon.zone] ?? DUNGEON_TILE_COLORS.central;
    let displayRow = "";
    for (let screenX = 0; screenX < layout.visibleMapCols; screenX++) {
      const x = viewportX + screenX;
      if (x === dungeon.playerPos.x && y === dungeon.playerPos.y) {
        displayRow += renderScaledCell("@", BRIGHT_MAGENTA, layout.tileScaleX);
      } else {
        const ch = rawRow?.[x] ?? "#";
        const c = colors[ch] ?? GREY;
        displayRow += renderScaledCell(ch, c, layout.tileScaleX);
      }
    }
    const padNeeded = layout.mapPanelW - layout.visibleMapCols * layout.tileScaleX;
    displayRow += " ".repeat(Math.max(0, padNeeded));
    if (layout.mode === "split") {
      rows.push(splitRow(displayRow, infoLine, layout));
    } else {
      rows.push(`\u2502 ${pad(displayRow, layout.width - 4)} \u2502`);
    }
  }
  if (layout.mode === "stacked") {
    rows.push(divider(layout.width));
    for (const line of infoLines.slice(0, Math.max(4, getTerminalSize().rows - rows.length - 3))) {
      rows.push(`\u2502 ${pad(line, layout.width - 4)} \u2502`);
    }
  }
  rows.push(layout.mode === "split" ? splitBottomBorder(layout) : bottomBorder());
  rows.push(`${DIM}WASD/\u2191\u2193\u2190\u2192:Move  E:Exit(D tile)  M:Menu  Q:Quit${RESET}`);
  renderFrame(rows);
}
function getBattleActionEntries(state2) {
  const entries = [
    { label: "Skill", action: "skill" },
    { label: "Defend", action: "defend" },
    { label: "Patch", action: "item" },
    { label: "Switch", action: "switch" }
  ];
  if (hasScriptsMenuAccess(state2)) {
    entries.push({ label: "Scripts", action: "script" });
  }
  entries.push(
    { label: "Link", action: "capture" },
    { label: "Flee", action: "flee" }
  );
  return entries;
}
var TITLE_ART_WIDE = [
  "",
  "██╗  ██╗███████╗██████╗ ███╗   ██╗███████╗██╗     ",
  "██║ ██╔╝██╔════╝██╔══██╗████╗  ██║██╔════╝██║     ",
  "█████╔╝ █████╗  ██████╔╝██╔██╗ ██║█████╗  ██║     ",
  "██╔═██╗ ██╔══╝  ██╔══██╗██║╚██╗██║██╔══╝  ██║     ",
  "██║  ██╗███████╗██║  ██║██║ ╚████║███████╗███████╗",
  "╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝",
  "",
  "██████╗ ██████╗ ███████╗ █████╗  ██████╗██╗  ██╗",
  "██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝██║  ██║",
  "██████╔╝██████╔╝█████╗  ███████║██║     ███████║",
  "██╔══██╗██╔══██╗██╔══╝  ██╔══██║██║     ██╔══██║",
  "██████╔╝██║  ██║███████╗██║  ██║╚██████╗██║  ██║",
  "╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝"
];
var TITLE_ART_COMPACT = [
  " _  __                         _ ",
  "| |/ /___ _ __ _ __   ___  ___| |",
  "| ' // _ \\ '__| '_ \\ / _ \\/ _ \\ |",
  "| . \\  __/ |  | | | |  __/  __/ |",
  "|_|\\_\\___|_|  |_| |_|\\___|\\___|_|",
  "",
  " ____                       _     ",
  "| __ ) _ __ ___  __ _  ___| |__  ",
  "|  _ \\| '__/ _ \\/ _` |/ __| '_ \\ ",
  "| |_) | | |  __/ (_| | (__| | | |",
  "|____/|_|  \\___|\\__,_|\\___|_| |_|"
];
var SPLASH_TOKENS = [
  { glyph: "<v", color: BRIGHT_YELLOW, dx: -2.8, dy: -1.4 },
  { glyph: "( )", color: BRIGHT_GREEN, dx: -1.7, dy: -1.8 },
  { glyph: "/\\\\", color: BRIGHT_RED, dx: -0.6, dy: -2 },
  { glyph: "=^", color: BRIGHT_MAGENTA, dx: 0.6, dy: -1.9 },
  { glyph: "><", color: BRIGHT_RED, dx: 1.7, dy: -1.5 },
  { glyph: "oo", color: BRIGHT_CYAN, dx: 2.6, dy: -0.7 },
  { glyph: "vV", color: BRIGHT_WHITE, dx: -2.9, dy: 0.3 },
  { glyph: "o>", color: CYAN, dx: -1.9, dy: 1.2 },
  { glyph: "O-", color: GREEN, dx: -0.8, dy: 1.8 },
  { glyph: "@)", color: YELLOW, dx: 0.8, dy: 1.9 },
  { glyph: "~~", color: WHITE, dx: 1.9, dy: 1.3 },
  { glyph: "xo", color: MAGENTA, dx: 2.8, dy: 0.4 },
  { glyph: "|*|", color: GREEN, dx: -1.2, dy: -0.4 },
  { glyph: "[]", color: BRIGHT_WHITE, dx: 1.3, dy: -0.3 },
  { glyph: "_)_", color: BRIGHT_YELLOW, dx: -0.2, dy: 0.9 },
  { glyph: "(#)", color: BRIGHT_MAGENTA, dx: 0.2, dy: -0.9 },
  { glyph: "<o>", color: BRIGHT_CYAN, dx: -3.3, dy: -0.9 },
  { glyph: "/o\\", color: BRIGHT_GREEN, dx: 3.2, dy: -0.2 },
  { glyph: "(^)", color: BRIGHT_RED, dx: -2.4, dy: 2 },
  { glyph: "[~]", color: BRIGHT_MAGENTA, dx: 2.4, dy: 1.9 },
  { glyph: "`v`", color: YELLOW, dx: 0, dy: -2.4 },
  { glyph: "(oo)", color: WHITE, dx: 0, dy: 2.4 }
];
var SPLASH_SPARKS = [
  { glyph: ".", color: BRIGHT_CYAN, dx: -4.2, dy: -2, drift: 0.2 },
  { glyph: "*", color: BRIGHT_WHITE, dx: -3.7, dy: -1.1, drift: -0.15 },
  { glyph: "+", color: BRIGHT_YELLOW, dx: -3.2, dy: 0.5, drift: 0.1 },
  { glyph: ".", color: BRIGHT_GREEN, dx: -2.8, dy: 2, drift: -0.2 },
  { glyph: "*", color: CYAN, dx: -1.5, dy: -2.6, drift: 0.18 },
  { glyph: "+", color: BRIGHT_MAGENTA, dx: -1.1, dy: 2.8, drift: -0.12 },
  { glyph: ".", color: BRIGHT_RED, dx: 1.2, dy: -2.7, drift: 0.15 },
  { glyph: "*", color: BRIGHT_CYAN, dx: 1.8, dy: 2.6, drift: -0.18 },
  { glyph: "+", color: BRIGHT_GREEN, dx: 3, dy: -1.8, drift: 0.16 },
  { glyph: ".", color: BRIGHT_WHITE, dx: 3.5, dy: 0.8, drift: -0.1 },
  { glyph: "*", color: YELLOW, dx: 4, dy: 2.1, drift: 0.14 },
  { glyph: "+", color: MAGENTA, dx: 4.6, dy: -0.5, drift: -0.2 },
  { glyph: ".", color: GREEN, dx: -4.8, dy: 1.1, drift: 0.12 },
  { glyph: "*", color: BRIGHT_RED, dx: 0, dy: -3, drift: 0.08 },
  { glyph: "+", color: BRIGHT_YELLOW, dx: 0, dy: 3.1, drift: -0.08 }
];
function renderSplash(frame) {
  const { cols, rows } = getTerminalSize();
  const width = Math.max(30, cols);
  const height = Math.max(12, rows);
  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);
  const progress = Math.min(1, frame / 22);
  const lines = Array.from({ length: height }, () => Array.from({ length: width }, () => " "));
  function stamp(x, y, text, colorCode) {
    if (y < 0 || y >= height) return;
    for (let i = 0; i < text.length; i++) {
      const px = x + i;
      if (px < 0 || px >= width) continue;
      lines[y][px] = `${colorCode}${text[i]}${RESET}`;
    }
  }
  for (let i = 0; i < SPLASH_TOKENS.length; i++) {
    const token = SPLASH_TOKENS[i];
    const wobble = Math.sin((frame + i) * 0.6) * 0.35;
    const x = Math.round(centerX + token.dx * frame + wobble * (i % 3 === 0 ? 2 : 1) - Math.floor(token.glyph.length / 2));
    const y = Math.round(centerY + token.dy * frame * 0.55 + Math.cos((frame + i) * 0.35) * 0.25);
    stamp(x, y, token.glyph, token.color);
  }
  for (let i = 0; i < SPLASH_SPARKS.length; i++) {
    const spark = SPLASH_SPARKS[i];
    const travel = frame * (0.75 + progress * 0.5);
    const x = Math.round(centerX + spark.dx * travel + Math.sin((frame + i) * 0.45) * 0.6);
    const y = Math.round(centerY + spark.dy * travel * 0.55 + Math.cos((frame + i) * 0.4) * spark.drift * 6);
    stamp(x, y, spark.glyph, spark.color);
  }
  const flash = frame < 6 ? Math.max(0, 4 - frame) : 0;
  if (flash > 0) {
    const burst = "*".repeat(flash * 2 + 1);
    stamp(centerX - flash, centerY, burst, BRIGHT_WHITE);
  }
  const title = frame > 10 ? color(pad("KERNEL BREACH", width, "center"), BRIGHT_CYAN) : "";
  const subtitle = frame > 16 ? dim(pad("Press any key to initialize", width, "center")) : "";
  const out = lines.map((row) => row.join(""));
  if (title) {
    const titleRow = Math.max(1, centerY - 6);
    out[titleRow] = title;
  }
  if (subtitle) {
    out[Math.min(height - 2, centerY + 6)] = subtitle;
  }
  renderFrame(out);
}
function renderTitle(cursor, statusMessage = "") {
  const rows = [];
  const W = getGameWidth();
  const { rows: terminalRows } = getTerminalSize();
  const art = W >= 90 ? TITLE_ART_WIDE : W >= 42 ? TITLE_ART_COMPACT : [];
  const titleBlock = art.length > 0 ? [
    ...art.map((line) => color(pad(line, W, "center"), BRIGHT_CYAN)),
    "",
    color(pad("The kernel has been breached. Restore the system.", W, "center"), BRIGHT_YELLOW),
    ""
  ] : [
    color(pad("KERNEL BREACH", W, "center"), BRIGHT_CYAN),
    color(pad("The kernel has been breached. Restore the system.", W, "center"), BRIGHT_YELLOW),
    ""
  ];
  const opts = ["New Game", "Load Game", "Tutorial", "Quit"];
  const optionLines = [];
  for (let i = 0; i < opts.length; i++) {
    const selected = i === cursor;
    const line = selected ? `  ${bold(color("\u25B6 " + opts[i], BRIGHT_WHITE))}  ` : `    ${dim(opts[i])}  `;
    optionLines.push(pad(line, W, "center"));
  }
  const statusLines = statusMessage ? [
    "",
    color(pad(statusMessage, W, "center"), statusMessage.includes("ACCESS DENIED") ? BRIGHT_RED : BRIGHT_CYAN)
  ] : [];
  const footerLines = [
    "",
    dim(pad("\u2191\u2193: Select   Enter: Confirm", W, "center")),
    "",
    dim(pad("v1.0.0  |  Node.js required  |  CTRL+C to quit", W, "center"))
  ];
  const totalContentHeight = titleBlock.length + optionLines.length + statusLines.length + footerLines.length;
  const topPadding = Math.max(1, Math.floor((terminalRows - totalContentHeight) / 2) - 1);
  for (let i = 0; i < topPadding; i++) rows.push("");
  rows.push(...titleBlock);
  rows.push(...optionLines);
  rows.push(...statusLines);
  rows.push(...footerLines);
  renderFrame(rows);
}
function renderNameInput(nameInput) {
  const W = getGameWidth();
  const rows = [];
  rows.push("");
  rows.push(bold(color(pad("SUDO USER LOGIN", W, "center"), BRIGHT_CYAN)));
  rows.push("");
  rows.push(pad("Enter the sudo user login to initialize the Sentinel Protocol.", W, "center"));
  rows.push("");
  rows.push(pad(`> ${color(nameInput, BRIGHT_WHITE)}${BLINK}_${RESET}`, W, "center"));
  rows.push("");
  rows.push(dim(pad("Type the login and press ENTER", W, "center")));
  renderFrame(rows);
}
function renderPasswordInput(passwordInput) {
  const W = getGameWidth();
  const rows = [];
  const masked = "*".repeat(passwordInput.length);
  rows.push("");
  rows.push(bold(color(pad("SUDO USER PASSWORD", W, "center"), BRIGHT_CYAN)));
  rows.push("");
  rows.push(pad("Enter the sudo user password.", W, "center"));
  rows.push("");
  rows.push(pad(`> ${color(masked, BRIGHT_WHITE)}${BLINK}_${RESET}`, W, "center"));
  rows.push("");
  rows.push(dim(pad("Press ENTER to authenticate", W, "center")));
  renderFrame(rows);
}
function renderStoryBriefing(loginUser) {
  const W = getGameWidth();
  const rows = [];
  rows.push("");
  rows.push(bold(color(pad("root access granted", W, "center"), BRIGHT_GREEN)));
  rows.push("");
  rows.push(color(pad("Sentinel Protocol // Legacy Partition", W, "center"), BRIGHT_CYAN));
  rows.push("");
  rows.push(pad(`Architect ${loginUser}, the kernel has been breached.`, W, "center"));
  rows.push(pad("Eight sacred sectors stand sealed behind corrupted daemons.", W, "center"));
  rows.push(pad("The old wardens now answer the breach, not the system they were made to protect.", W, "center"));
  rows.push("");
  rows.push(pad("Link with living biomorphic code. Purge the hostile processes.", W, "center"));
  rows.push(pad("Restore the sectors. Reclaim root access. Reach the buried source layer.", W, "center"));
  rows.push(pad("Search the breached sectors carefully. Dormant scripts may still be buried in the system layers.", W, "center"));
  rows.push("");
  rows.push(dim(pad("Press ENTER to begin the purge", W, "center")));
  renderFrame(rows);
}
function renderLoadGame(slots, cursor) {
  const W = getGameWidth();
  const rows = [];
  rows.push("");
  rows.push(bold(color(pad("LOAD GAME", W, "center"), BRIGHT_CYAN)));
  rows.push("");
  for (const slot of slots) {
    const selected = slot.slot - 1 === cursor;
    const prefix = selected ? color("\u25B6 ", BRIGHT_YELLOW) : "  ";
    if (!slot.exists) {
      rows.push(pad(`${prefix}Slot ${slot.slot}: ${dim("(empty)")}`, W, "center"));
    } else {
      const time = new Date(slot.savedAt).toLocaleDateString();
      rows.push(pad(`${prefix}Slot ${slot.slot}: ${bold(slot.playerName)} | ${slot.zone} | ${slot.defeatedBosses?.length ?? 0}/${TOTAL_BOSSES} bosses | ${time}`, W, "center"));
    }
    rows.push("");
  }
  rows.push(dim(pad("\u2191\u2193: Select   Enter: Load   X: Back", W, "center")));
  renderFrame(rows);
}
function renderSaveSelect(slots, cursor) {
  const W = getGameWidth();
  const rows = [];
  rows.push("");
  rows.push(bold(color(pad("SAVE GAME", W, "center"), BRIGHT_CYAN)));
  rows.push("");
  for (const slot of slots) {
    const selected = slot.slot - 1 === cursor;
    const prefix = selected ? color("\u25B6 ", BRIGHT_YELLOW) : "  ";
    if (!slot.exists) {
      rows.push(pad(`${prefix}Slot ${slot.slot}: ${dim("(empty)")}`, W, "center"));
    } else {
      rows.push(pad(`${prefix}Slot ${slot.slot}: ${bold(slot.playerName)} ${dim("[OVERWRITE]")}`, W, "center"));
    }
    rows.push("");
  }
  rows.push(dim(pad("\u2191\u2193: Select   Enter: Save   X: Back", W, "center")));
  renderFrame(rows);
}
function renderMenu(state2) {
  const W = getGameWidth();
  const { player, menuCursor } = state2;
  const objective = getCurrentObjective(player);
  const logLines = buildTargetLogLines(player, W - 4).slice(-6);
  const rows = [];
  rows.push(topBorder("MENU", W));
  const tutorialPrompt = getTutorialPrompt(state2);
  if (tutorialPrompt) {
    rows.push(`\u2502 ${pad(color(tutorialPrompt, BRIGHT_CYAN), W - 4)} \u2502`);
    rows.push(divider(W));
  }
  const opts = getMenuOptions(state2);
  for (let i = 0; i < opts.length; i++) {
    const selected = i === menuCursor;
    const line = selected ? bold(color(`\u25B6 ${opts[i]}`, BRIGHT_YELLOW)) : dim(`  ${opts[i]}`);
    rows.push(`\u2502 ${pad(line, W - 4)} \u2502`);
  }
  rows.push(divider(W));
  rows.push(`\u2502 ${pad(`${bold("Player:")} ${color(player.name, BRIGHT_WHITE)} ${dim(`#${player.id}`)}`, W - 4)} \u2502`);
  rows.push(`\u2502 ${pad(`${bold("Credits:")}   ${color(`${player.gold}CR`, YELLOW)}`, W - 4)} \u2502`);
  rows.push(`\u2502 ${pad(`${bold("Bosses:")} ${color(`${player.defeatedBosses.length}/${TOTAL_BOSSES}`, player.defeatedBosses.length === TOTAL_BOSSES ? BRIGHT_YELLOW : WHITE)}`, W - 4)} \u2502`);
  rows.push(divider(W));
  rows.push(`\u2502 ${bold("Objective:")} ${pad(objective ? objective.bossName : "All daemons purged", W - 15)} \u2502`);
  rows.push(`\u2502 ${bold("Location:")} ${pad(objective ? objective.zoneName : "Root Directory", W - 14)} \u2502`);
  rows.push(`\u2502 ${bold("Vector:")}   ${pad(objective ? getTravelVectorLabel(player.currentZone, objective.zone) : "Center", W - 14)} \u2502`);
  rows.push(divider(W));
  rows.push(`\u2502 ${pad(bold("Target-Log"), W - 4)} \u2502`);
  for (const entry of logLines) {
    rows.push(`\u2502 ${pad(entry, W - 4)} \u2502`);
  }
  rows.push(bottomBorder(W));
  rows.push(dim("\u2191\u2193: Select   Enter: Confirm   X: Back"));
  renderFrame(rows);
}
function renderScriptsTerminal(state2) {
  const W = getGameWidth();
  const rows = [];
  const history = state2.scriptTerminalLog ?? [];
  const prompt = state2.scriptInput ?? "";
  const discovered = getDiscoveredScripts(state2.player);
  rows.push(topBorder("SCRIPT TERMINAL", W));
  rows.push(`\u2502 ${pad(color("Recovered scripts can be executed from this terminal.", BRIGHT_CYAN), W - 4)} \u2502`);
  rows.push(`\u2502 ${pad(bold("Recovered Scripts"), W - 4)} \u2502`);
  if (discovered.length === 0) {
    rows.push(`\u2502 ${pad(dim("No scripts recovered."), W - 4)} \u2502`);
  } else {
    for (const wrapped of wrapText(discovered.join(", "), W - 4)) {
      rows.push(`\u2502 ${pad(color(wrapped, BRIGHT_YELLOW), W - 4)} \u2502`);
    }
  }
  rows.push(divider(W));
  const available = Math.max(4, getTerminalSize().rows - rows.length - 4);
  const visibleHistory = history.slice(-available);
  if (visibleHistory.length === 0) {
    rows.push(`\u2502 ${pad(dim("No scripts executed in this session."), W - 4)} \u2502`);
  } else {
    for (const line of visibleHistory) {
      for (const wrapped of wrapText(line, W - 4)) {
        rows.push(`\u2502 ${pad(wrapped, W - 4)} \u2502`);
      }
    }
  }
  rows.push(divider(W));
  rows.push(`\u2502 ${pad(`> ${color(prompt, BRIGHT_WHITE)}${BLINK}_${RESET}`, W - 4)} \u2502`);
  rows.push(bottomBorder(W));
  rows.push(dim("Type a recovered script and press ENTER   X: Back"));
  renderFrame(rows);
}
function renderInventory(player, cursor) {
  const W = getGameWidth();
  const rows = [];
  const inventoryItems = Object.keys(ITEMS);
  rows.push(topBorder("PATCHES", W));
  rows.push(`\u2502 ${pad(`${bold("Credits:")} ${color(`${player.gold}CR`, YELLOW)}`, W - 4)} \u2502`);
  rows.push(divider(W));
  for (let i = 0; i < inventoryItems.length; i++) {
    const id = inventoryItems[i];
    const item = ITEMS[id];
    const owned = player.items[id] ?? 0;
    const selected = i === cursor;
    const prefix = selected ? color("\u25B6 ", BRIGHT_YELLOW) : "  ";
    const name = owned > 0 ? item.name : dim(item.name);
    const line = `${name.padEnd(20)} ${dim(`x${owned}`.padEnd(6))} ${dim(item.description)}`;
    rows.push(`\u2502 ${prefix}${pad(line, W - 6)} \u2502`);
  }
  rows.push(bottomBorder(W));
  rows.push(dim("\u2191\u2193: Select   Enter: Use   X: Back"));
  renderFrame(rows);
}
function renderTutorialInventory(state2) {
  const W = getGameWidth();
  const rows = [];
  const inventoryItems = Object.keys(ITEMS);
  rows.push(topBorder("PATCHES", W));
  rows.push(`\u2502 ${pad(color(getTutorialPrompt(state2), BRIGHT_CYAN), W - 4)} \u2502`);
  rows.push(divider(W));
  rows.push(`\u2502 ${pad(`${bold("Credits:")} ${color(`${state2.player.gold}CR`, YELLOW)}`, W - 4)} \u2502`);
  rows.push(divider(W));
  for (let i = 0; i < inventoryItems.length; i++) {
    const id = inventoryItems[i];
    const item = ITEMS[id];
    const owned = state2.player.items[id] ?? 0;
    const selected = i === state2.menuCursor;
    const prefix = selected ? color("\u25B6 ", BRIGHT_YELLOW) : "  ";
    const name = owned > 0 ? item.name : dim(item.name);
    const line = `${name.padEnd(20)} ${dim(`x${owned}`.padEnd(6))} ${dim(item.description)}`;
    rows.push(`\u2502 ${prefix}${pad(line, W - 6)} \u2502`);
  }
  rows.push(bottomBorder(W));
  rows.push(dim("X: Back"));
  renderFrame(rows);
}
function renderItemTarget(player, cursor, itemId) {
  const W = getGameWidth();
  const rows = [];
  const itemName = itemId && ITEMS[itemId] ? ITEMS[itemId].name : "Item";
  rows.push(topBorder(`USE ${itemName.toUpperCase()}`, W));
  for (let i = 0; i < player.party.length; i++) {
    const c = player.party[i];
    const selected = i === cursor;
    const prefix = selected ? color("\u25B6 ", BRIGHT_YELLOW) : "  ";
    const hp = hpBar(c.currentHp, c.maxHp, 12);
    rows.push(`\u2502 ${prefix}${pad(`${c.nickname.padEnd(14)} Lv${c.level}  ${hp} ${c.currentHp}/${c.maxHp} MB`, W - 6)} \u2502`);
  }
  rows.push(bottomBorder(W));
  rows.push(dim("\u2191\u2193: Select Target   Enter: Use   X: Back"));
  renderFrame(rows);
}
function renderPartyView(state2) {
  const W = getGameWidth();
  const { player, menuCursor } = state2;
  const rows = [];
  rows.push(topBorder("EXPLOITS", W));
  const tutorialPrompt = getTutorialPrompt(state2);
  if (tutorialPrompt) {
    rows.push(`\u2502 ${pad(color(tutorialPrompt, BRIGHT_CYAN), W - 4)} \u2502`);
    rows.push(divider(W));
  }
  for (let i = 0; i < 4; i++) {
    const c = player.party[i];
    const selected = i === menuCursor;
    const reorderSource = state2.reorderSourceIdx === i;
    if (!c) {
      rows.push(`\u2502 ${pad(`${selected ? color("\u25B6 ", BRIGHT_YELLOW) : "  "}${dim("(empty slot)")}`, W - 4)} \u2502`);
      continue;
    }
    const rColor = rarityColor(c.rarity);
    const name = c.shiny ? `\u2726${c.nickname}` : c.nickname;
    const sp = c.skillPoints > 0 ? color(` [${c.skillPoints} SP!]`, BRIGHT_YELLOW) : "";
    const reorderTag = reorderSource ? color(" [MOVE]", BRIGHT_CYAN) : "";
    const speciesDisplay = SPECIES_NAMES[c.species] ?? c.species;
    rows.push(`\u2502 ${pad(`${selected ? color("\u25B6 ", BRIGHT_YELLOW) : "  "}${rColor}${name}${RESET}${sp}${reorderTag}  ${dim(`Lv${c.level} ${speciesDisplay}`)}`, W - 4)} \u2502`);
    rows.push(`\u2502 ${pad(`   MB: ${hpBar(c.currentHp, c.maxHp, 12)} ${c.currentHp}/${c.maxHp}  XP: ${xpBar(c.xp, c.xpToNext, 8)}`, W - 4)} \u2502`);
    const str = c.baseStr + c.allocatedStr;
    const con = c.baseCon + c.allocatedCon;
    rows.push(`\u2502 ${pad(`   ATK:${calcAttack(c.level, c.baseStr, c.allocatedStr)} DEF:${calcDefense(c.level, c.baseCon, c.allocatedCon)}  STR:${str}(+${c.allocatedStr}) CON:${con}(+${c.allocatedCon})  ${RARITY_STARS[c.rarity]}`, W - 4)} \u2502`);
    if (selected && c.skillPoints > 0) {
      rows.push(`\u2502 ${pad(`   ${color("[Enter] Spend skill points", BRIGHT_CYAN)}`, W - 4)} \u2502`);
    }
  }
  rows.push(bottomBorder(W));
  if (state2.reorderSourceIdx !== void 0) {
    const source = player.party[state2.reorderSourceIdx];
    rows.push(dim(`\u2191\u2193: Select target   Enter: Swap   R/X: Cancel move   Moving: ${source?.nickname ?? "exploit"}`));
  } else {
    rows.push(dim("\u2191\u2193: Select   Enter: Spend SP   R: Reorder   S: Send to Exploit Storage   X: Back"));
  }
  renderFrame(rows);
}
function renderStatUpgrade(creature, cursor) {
  const W = getGameWidth();
  const rows = [];
  rows.push(topBorder(`UPGRADE - ${creature.nickname}`, W));
  rows.push(`\u2502 ${pad(`${dim(`Skill Points Available: `)}${bold(color(creature.skillPoints.toString(), BRIGHT_YELLOW))}`, W - 4)} \u2502`);
  rows.push(divider(W));
  const opts = ["STR (increases Attack)", "CON (increases Defense & MB)"];
  for (let i = 0; i < opts.length; i++) {
    const selected = i === cursor;
    const val = i === 0 ? `${color(`STR: ${creature.baseStr + creature.allocatedStr}`, BRIGHT_RED)} (base ${creature.baseStr} + ${creature.allocatedStr} allocated)` : `${color(`CON: ${creature.baseCon + creature.allocatedCon}`, BRIGHT_BLUE)} (base ${creature.baseCon} + ${creature.allocatedCon} allocated)`;
    const line = selected ? bold(color(`\u25B6 ${opts[i]}`, BRIGHT_YELLOW)) : dim(`  ${opts[i]}`);
    rows.push(`\u2502 ${pad(line, W - 4)} \u2502`);
    rows.push(`\u2502 ${pad(`   ${val}`, W - 4)} \u2502`);
  }
  rows.push(bottomBorder(W));
  rows.push(dim("\u2191\u2193: Select   Enter: Allocate 1 point   X: Back"));
  renderFrame(rows);
}
function renderShop(player, cursor) {
  const W = getGameWidth();
  const rows = [];
  rows.push(topBorder("PATCH REPOSITORY", W));
  rows.push(`\u2502 ${pad(`${bold("Credits:")} ${color(`${player.gold}CR`, YELLOW)}`, W - 4)} \u2502`);
  rows.push(divider(W));
  const shopItems = ["potion", "super_potion", "full_restore"];
  for (let i = 0; i < shopItems.length; i++) {
    const id = shopItems[i];
    const item = ITEMS[id];
    const owned = player.items[id] ?? 0;
    const selected = i === cursor;
    const canAfford = player.gold >= item.price;
    const line = `${item.name.padEnd(16)} ${color(`${item.price}CR`, canAfford ? YELLOW : RED).padEnd(8)} ${dim(`(owned: ${owned})`)}  ${dim(item.description)}`;
    rows.push(`\u2502 ${selected ? color("\u25B6 ", BRIGHT_YELLOW) : "  "}${pad(line, W - 6)} \u2502`);
  }
  rows.push(bottomBorder(W));
  rows.push(dim("\u2191\u2193: Select   Enter: Provision   X: Leave"));
  renderFrame(rows);
}
function renderStorageView(state2) {
  const W = getGameWidth();
  const { player, menuCursor } = state2;
  const rows = [];
  rows.push(topBorder("SAVED EXPLOITS", W));
  if (player.storage.length === 0) {
    rows.push(`\u2502 ${pad(dim("No exploits stored in Exploit Storage."), W - 4)} \u2502`);
  } else {
    const visible = player.storage.slice(Math.max(0, menuCursor - 4), menuCursor + 8);
    const offset = Math.max(0, menuCursor - 4);
    for (let i = 0; i < visible.length; i++) {
      const c = visible[i];
      const idx = offset + i;
      const selected = idx === menuCursor;
      const rColor = rarityColor(c.rarity);
      const name = c.shiny ? `\u2726${c.nickname}` : c.nickname;
      const speciesDisplay = SPECIES_NAMES[c.species] ?? c.species;
      rows.push(`\u2502 ${pad(`${selected ? color("\u25B6 ", BRIGHT_YELLOW) : "  "}${rColor}${name.padEnd(14)}${RESET} ${dim(`Lv${c.level} ${speciesDisplay.padEnd(12)} ${RARITY_STARS[c.rarity]}`)}`, W - 4)} \u2502`);
    }
  }
  rows.push(bottomBorder(W));
  rows.push(dim("\u2191\u2193: Scroll   Enter: Restore to Exploits   X: Back"));
  renderFrame(rows);
}
function renderDeveloperOptions(player, cursor) {
  const W = getGameWidth();
  const rows = [];
  rows.push(topBorder("DEVELOPER OPTIONS", W));
  const opts = [
    `Audio Debug: ${player.audioDebug ? color("ON", GREEN) : color("OFF", RED)}`,
    `Verbose Debug: ${player.verboseDebug ? color("ON", GREEN) : color("OFF", RED)}`,
    "View Debug Log",
    `Unlock All Dungeons: ${player.allDungeonsUnlocked ? color("ON", GREEN) : color("OFF", RED)}`,
    `No Encounter: ${player.noEncounters ? color("ON", GREEN) : color("OFF", RED)}`,
    "Instant Patch (Heal All)",
    "Add 5000 Credits",
    "Level Up Party (+5)",
    "Discover All Scripts",
    "Key Entry",
    "Secret Virus"
  ];
  for (let i = 0; i < opts.length; i++) {
    const selected = i === cursor;
    const line = selected ? bold(color(`\u25B6 ${opts[i]}`, BRIGHT_YELLOW)) : dim(`  ${opts[i]}`);
    rows.push(`\u2502 ${pad(line, W - 4)} \u2502`);
  }
  rows.push(bottomBorder(W));
  rows.push(dim("\u2191\u2193: Select   Enter: Execute   X: Back"));
  renderFrame(rows);
}
function handleDeveloperOptions(state2, key) {
  if (!isDevMenuEnabled()) {
    return { ...state2, screen: "menu", showDevMenu: false, menuCursor: 0 };
  }
  const opts = 11;
  if (isUp(key)) return { ...state2, menuCursor: (state2.menuCursor - 1 + opts) % opts };
  if (isDown(key)) return { ...state2, menuCursor: (state2.menuCursor + 1) % opts };
  if (isCancel(key)) return { ...state2, screen: "menu", menuCursor: getMenuOptionIndex({ ...state2, showDevMenu: true }, "Developer Options") };
  if (isConfirm(key)) {
    let s = state2;
    if (state2.menuCursor === 0) {
      const next = !state2.player.audioDebug;
      s = { ...state2, player: { ...state2.player, audioDebug: next } };
      s = addMessage(s, `Developer: Audio Debug ${next ? "Enabled" : "Disabled"}`);
    } else if (state2.menuCursor === 1) {
      const next = !state2.player.verboseDebug;
      s = { ...state2, player: { ...state2.player, verboseDebug: next } };
      s = addMessage(s, `Developer: Verbose Debug ${next ? "Enabled" : "Disabled"}`);
    } else if (state2.menuCursor === 2) {
      s = { ...state2, screen: "debug_log", previousScreen: "developer_options", menuCursor: 0 };
    } else if (state2.menuCursor === 3) {
      const next = !state2.player.allDungeonsUnlocked;
      s = { ...state2, player: { ...state2.player, allDungeonsUnlocked: next } };
      s = addMessage(s, `Cheat: All Dungeons ${next ? "Unlocked" : "Gated"}`);
    } else if (state2.menuCursor === 4) {
      const next = !state2.player.noEncounters;
      s = { ...state2, player: { ...state2.player, noEncounters: next } };
      s = addMessage(s, `Cheat: Random Encounters ${next ? "Disabled" : "Enabled"}`);
    } else if (state2.menuCursor === 5) {
      const party = state2.player.party.map(healFully);
      s = { ...state2, player: { ...state2.player, party } };
      s = addMessage(s, "Cheat: Party Restored");
    } else if (state2.menuCursor === 6) {
      s = { ...state2, player: { ...state2.player, gold: state2.player.gold + 5e3 } };
      s = addMessage(s, "Cheat: +5000 Credits");
    } else if (state2.menuCursor === 7) {
      const newParty = state2.player.party.map((c) => {
        let cur = c;
        for (let i = 0; i < 5; i++) {
          const res = addXp(cur, cur.xpToNext - cur.xp);
          cur = res.creature;
        }
        return cur;
      });
      s = { ...state2, player: { ...state2.player, party: newParty } };
      s = addMessage(s, "Cheat: +5 Levels to Party");
    } else if (state2.menuCursor === 8) {
      s = {
        ...state2,
        player: {
          ...state2.player,
          discoveredScripts: Object.keys(SCRIPT_DEFS),
          recoveredScriptZones: [...OVERWORLD_SCRIPT_ZONES]
        }
      };
      s = addMessage(s, "Cheat: All Scripts Recovered");
    } else if (state2.menuCursor === 9) {
      const player = createAllBossesDefeatedPlayer(state2.player);
      s = {
        ...state2,
        screen: "final_key_input",
        player,
        finalKeyInput: "",
        finalKeyError: "",
        showFinalTargetLog: true
      };
      s = addMessage(s, "Developer: Final key entry unlocked with all boss progress restored.");
    } else if (state2.menuCursor === 10) {
      const secretVirus = createSecretVirusPlayer(state2.player);
      s = {
        ...state2,
        screen: "secret_unlock",
        player: secretVirus.player,
        finalKeyInput: "",
        finalKeyError: "",
        showFinalTargetLog: false
      };
      if (secretVirus.movedToStorage) {
        s = addMessage(s, "Exploit capacity reached. Sudo -S moved to Exploit Storage.");
      }
      s = addMessage(s, "Developer: Secret Virus deployed. Final purge authorized.");
    }
    return s;
  }
  return state2;
}
function renderGameOver() {
  const W = getGameWidth();
  const rows = [];
  rows.push("");
  rows.push(color(pad("GAME OVER", W, "center"), RED));
  rows.push("");
  rows.push(pad("All active exploits have collapsed...", W, "center"));
  rows.push(pad("You are restored at the last integrity well.", W, "center"));
  rows.push("");
  rows.push(dim(pad("Press ENTER to continue", W, "center")));
  renderFrame(rows);
}
function renderSecretUnlock() {
  const W = getGameWidth();
  const rows = [];
  rows.push("");
  rows.push(bold(color(pad("\u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726", W, "center"), BRIGHT_YELLOW)));
  rows.push("");
  rows.push(bold(color(pad("FINAL PURGE SEALED", W, "center"), BRIGHT_CYAN)));
  rows.push("");
  rows.push(pad("The final seal engages. The breach collapses into silence beneath root authority.", W, "center"));
  rows.push(pad("From the buried source layer, the last guardian process answers your command.", W, "center"));
  rows.push("");
  rows.push(bold(color(pad("\u2726 SUDO -S has entered the Sentinel Protocol! \u2726", W, "center"), BRIGHT_YELLOW)));
  rows.push("");
  rows.push(dim(pad("The final guardian has been restored from source and bound to your command.", W, "center")));
  rows.push(dim(pad("Level 50. Full root authority. The infection is sealed behind living code.", W, "center")));
  rows.push("");
  rows.push(bold(color(pad("\u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726 \u2726", W, "center"), BRIGHT_YELLOW)));
  rows.push("");
  rows.push(dim(pad("Press ENTER to continue", W, "center")));
  renderFrame(rows);
}
function renderTutorialComplete() {
  const W = getGameWidth();
  const rows = [];
  rows.push("");
  rows.push(bold(color(pad("TUTORIAL COMPLETE", W, "center"), BRIGHT_CYAN)));
  rows.push("");
  rows.push(pad("You moved, opened menus, checked patches, and completed battle training.", W, "center"));
  rows.push(pad("Return to the title screen when you are ready to start a new purge.", W, "center"));
  rows.push("");
  rows.push(dim(pad("Press ENTER to return to title", W, "center")));
  renderFrame(rows);
}
function renderFinalKeyInput(state2) {
  const W = getGameWidth();
  const rows = [];
  const input = state2.finalKeyInput ?? "";
  const keyLength = state2.player.finalSecretKey.length;
  rows.push(topBorder("FINAL SECRET KEY", W));
  rows.push(`\u2502 ${pad(color("All active threats have been purged, but the breach seal remains incomplete.", BRIGHT_CYAN), W - 4)} \u2502`);
  rows.push(`\u2502 ${pad("Enter the final secret key to finish the purge and secure the source layer.", W - 4)} \u2502`);
  rows.push(divider(W));
  rows.push(`\u2502 ${pad(`> ${color(input, BRIGHT_WHITE)}${BLINK}_${RESET}`, W - 4)} \u2502`);
  if (state2.finalKeyError) {
    rows.push(`\u2502 ${pad(color(state2.finalKeyError, BRIGHT_RED), W - 4)} \u2502`);
  } else {
    rows.push(`\u2502 ${pad(dim("Awaiting final purge authorization."), W - 4)} \u2502`);
  }
  rows.push(`\u2502 ${pad(dim(`Type the ${keyLength}-character key and press ENTER. Press L to open Target-Log.`), W - 4)} \u2502`);
  if (state2.showFinalTargetLog) {
    rows.push(divider(W));
    rows.push(`\u2502 ${bold("Target-Log")}${" ".repeat(W - 14)} \u2502`);
    const available = Math.max(4, getTerminalSize().rows - rows.length - 3);
    const logLines = buildTargetLogLines(state2.player, W - 4).slice(-available);
    for (const line of logLines) {
      rows.push(`\u2502 ${pad(line, W - 4)} \u2502`);
    }
  }
  rows.push(bottomBorder(W));
  rows.push(dim("Enter: Validate key   L: Toggle Target-Log"));
  renderFrame(rows);
}
function renderDebugLog(state2) {
  const W = getGameWidth();
  const rows = [];
  rows.push(topBorder("DEBUG LOG", W));
  const available = Math.max(6, getTerminalSize().rows - 5);
  const entries = debugLogBuffer.slice(-available);
  if (entries.length === 0) {
    rows.push(`│ ${pad(dim("No debug entries recorded."), W - 4)} │`);
  } else {
    for (const entry of entries) {
      const line = `[${entry.channel}] ${entry.at} ${entry.message}`;
      for (const wrapped of wrapText(line, W - 4)) {
        rows.push(`│ ${pad(entry.channel === "audio" ? color(wrapped, BRIGHT_CYAN) : color(wrapped, BRIGHT_YELLOW), W - 4)} │`);
      }
    }
  }
  rows.push(bottomBorder(W));
  rows.push(dim("X: Back"));
  renderFrame(rows);
}
function appendScriptTerminalLog(state2, ...lines) {
  const nextLog = [...(state2.scriptTerminalLog ?? []), ...lines];
  return { ...state2, scriptTerminalLog: nextLog.slice(-80) };
}
function openScriptsTerminal(state2, previousScreen) {
  let next = {
    ...state2,
    screen: "scripts_terminal",
    previousScreen,
    menuReturnScreen: previousScreen === "menu" ? state2.menuReturnScreen : state2.menuReturnScreen ?? previousScreen,
    scriptInput: "",
    menuCursor: 0
  };
  if (!state2.scriptTerminalLog || state2.scriptTerminalLog.length === 0) {
    next = appendScriptTerminalLog(next, "script terminal initialized", "type a recovered script name to execute");
  }
  return next;
}
function executeFieldScript(state2, rawInput) {
  const scriptName = rawInput.trim().toLowerCase();
  let next = appendScriptTerminalLog(state2, `> ${scriptName}`);
  if (!scriptName) {
    return next;
  }
  if (scriptName === "help") {
    const scripts = getFieldScripts(state2.player);
    return appendScriptTerminalLog(next, scripts.length > 0 ? `available field scripts: ${scripts.join(", ")}` : "no field scripts recovered");
  }
  if (!getDiscoveredScripts(state2.player).includes(scriptName)) {
    return appendScriptTerminalLog(next, "script not recognized");
  }
  const script = SCRIPT_DEFS[scriptName];
  if (!script || script.context !== "field") {
    return appendScriptTerminalLog(next, `${scriptName}: script cannot execute outside battle`);
  }
  const zone = state2.player.currentZone;
  const pos = state2.player.position;
  const cfg = ZONE_CONFIGS[zone];
  const hiddenScript = getHiddenScriptLocation(state2.player, zone);
  const hiddenRecovered = state2.player.recoveredScriptZones?.includes(zone);
  if (scriptName === "scan") {
    if (!hiddenScript || hiddenRecovered) {
      return appendScriptTerminalLog(next, "scan: no unresolved script signatures remain in this sector");
    }
    return appendScriptTerminalLog(next, `scan: signature ${getDistanceHint(pos, hiddenScript)} ${getDirectionHint(pos, hiddenScript)}`);
  }
  if (scriptName === "trace") {
    return appendScriptTerminalLog(
      next,
      `trace: breach site ${formatNodeDirection(pos, cfg.dungeonPos)}`,
      `trace: integrity well ${formatNodeDirection(pos, cfg.healPos)}`,
      cfg.shopPos ? `trace: repository ${formatNodeDirection(pos, cfg.shopPos)}` : "trace: repository not present",
      hiddenScript && !hiddenRecovered ? `trace: hidden script signature ${formatNodeDirection(pos, hiddenScript)}` : "trace: hidden script signature cleared"
    );
  }
  if (scriptName === "dump") {
    const discovered = getDiscoveredScripts(state2.player);
    const remaining = OVERWORLD_SCRIPT_ZONES.length - (state2.player.recoveredScriptZones?.length ?? 0);
    return appendScriptTerminalLog(next, `dump: recovered scripts ${discovered.length}/${Object.keys(SCRIPT_DEFS).length}`, discovered.length > 0 ? discovered.join(", ") : "none recovered", `dump: unresolved hidden caches ${remaining}`);
  }
  if (scriptName === "grep") {
    const objective = getCurrentObjective(state2.player);
    if (!objective) {
      return appendScriptTerminalLog(next, "grep: no daemon target remains", "grep: route seek the Root Directory");
    }
    return appendScriptTerminalLog(next, `grep: target ${objective.bossName}`, `grep: sector ${objective.zoneName}`, `grep: vector ${getTravelVectorLabel(zone, objective.zone)}`);
  }
  if (scriptName === "pulse") {
    return appendScriptTerminalLog(
      next,
      `pulse: cursor (${pos.x},${pos.y}) // zone ${cfg.displayName}`,
      `pulse: breach site ${formatNodeDirection(pos, cfg.dungeonPos)}`,
      `pulse: integrity well ${formatNodeDirection(pos, cfg.healPos)}`,
      cfg.shopPos ? `pulse: repository ${formatNodeDirection(pos, cfg.shopPos)}` : "pulse: repository not present"
    );
  }
  if (scriptName === "ps") {
    const bossPurged = state2.player.defeatedBosses.includes(cfg.bossSpecies);
    return appendScriptTerminalLog(
      next,
      `ps: sector ${cfg.displayName} // active hostiles ${cfg.wildSpecies.join(", ")}`,
      `ps: daemon ${getBossName(cfg.bossSpecies)} // status ${bossPurged ? "purged" : "active"}`,
      `ps: breach site ${formatNodeDirection(pos, cfg.dungeonPos)} // hidden script ${hiddenScript && !hiddenRecovered ? "present" : "cleared"}`
    );
  }
  if (scriptName === "lsof") {
    return appendScriptTerminalLog(
      next,
      `lsof: integrity well ${formatNodeDirection(pos, cfg.healPos)} // ${getDistanceHint(pos, cfg.healPos)}`,
      `lsof: breach site ${formatNodeDirection(pos, cfg.dungeonPos)} // ${getDistanceHint(pos, cfg.dungeonPos)}`,
      cfg.shopPos ? `lsof: repository ${formatNodeDirection(pos, cfg.shopPos)} // ${getDistanceHint(pos, cfg.shopPos)}` : "lsof: repository not present",
      hiddenScript && !hiddenRecovered ? `lsof: hidden handle ${formatNodeDirection(pos, hiddenScript)} // ${getDistanceHint(pos, hiddenScript)}` : "lsof: hidden handle cleared"
    );
  }
  return appendScriptTerminalLog(next, `${scriptName}: script executed with no output`);
}
function handleScriptsTerminal(state2, key) {
  const current = state2.scriptInput ?? "";
  if (isCancel(key)) {
    const returnScreen = state2.previousScreen === "menu" ? "menu" : state2.previousScreen ?? "overworld";
    return { ...state2, screen: returnScreen, scriptInput: "", menuCursor: returnScreen === "menu" ? getMenuOptionIndex(state2, "Scripts") : state2.menuCursor };
  }
  if (key === KEY.BACKSPACE || key === KEY.BACKSPACE2) {
    return { ...state2, scriptInput: current.slice(0, -1) };
  }
  if (isConfirm(key)) {
    const executed = executeFieldScript(state2, current);
    return { ...executed, scriptInput: "" };
  }
  if (key.length === 1 && key >= " " && current.length < 24) {
    return { ...state2, scriptInput: current + key.toLowerCase() };
  }
  return state2;
}
function handleDebugLog(state2, key) {
  if (isCancel(key) || isConfirm(key)) {
    return { ...state2, screen: state2.previousScreen ?? "developer_options", menuCursor: 0 };
  }
  return state2;
}

// src/engine/game.ts
var ENCOUNTER_RATE = 0.2;
var DUNGEON_ENCOUNTER_RATE = 0.3;
var SPLASH_FRAMES = 28;
function createInitialState() {
  return {
    screen: "splash",
    player: null,
    messages: [],
    menuCursor: 0,
    nameInput: "",
    passwordInput: "",
    loginUser: "",
    splashFrame: 0
  };
}
function createNewPlayer(name) {
  const id = Math.random().toString(36).slice(2, 8).toUpperCase();
  const starter = rollStarterCreature();
  const finalSecretKey = generateFinalSecretKey();
  return {
    name,
    id,
    party: [starter],
    storage: [],
    gold: 150,
    items: { potion: 2 },
    defeatedBosses: [],
    targetLog: [],
    discoveredScripts: [],
    hiddenScriptsByZone: buildZoneScriptLocations(finalSecretKey),
    recoveredScriptZones: [],
    keyPieces: [],
    finalSecretKey,
    finalKeyUnlocked: false,
    secretUnlocked: false,
    position: { x: 19, y: 12 },
    currentZone: "central",
    playtime: 0,
    devMode: false,
    allDungeonsUnlocked: false,
    noEncounters: false,
    bgmMuted: false,
    audioDebug: false,
    verboseDebug: false
  };
}
function rollTutorialCreature() {
  const species = "Bit-Blob";
  const maxHp = calcMaxHp(3, 2, 0);
  return {
    id: generateId(),
    species,
    nickname: "Bit-Blob",
    eye: "\xB7",
    hat: "none",
    rarity: "common",
    level: 3,
    maxHp,
    currentHp: maxHp,
    baseStr: 2,
    baseCon: 2,
    allocatedStr: 0,
    allocatedCon: 0,
    xp: 0,
    xpToNext: xpForLevel(4),
    skillPoints: 0,
    isBoss: false,
    shiny: false,
    skills: ["Byte", "Exploit", "Prompt Injection"]
  };
}
function createTutorialPlayer() {
  const starter = rollTutorialCreature();
  return normalizePlayerProgress({
    name: "Tutorial",
    id: "TRAIN",
    party: [starter],
    storage: [],
    gold: 0,
    items: { potion: 2 },
    defeatedBosses: [],
    targetLog: [],
    discoveredScripts: ["sniff"],
    hiddenScriptsByZone: {},
    recoveredScriptZones: [...OVERWORLD_SCRIPT_ZONES],
    keyPieces: [],
    finalSecretKey: generateFinalSecretKey(),
    finalKeyUnlocked: false,
    secretUnlocked: false,
    position: { x: 19, y: 12 },
    currentZone: "central",
    playtime: 0,
    devMode: false,
    allDungeonsUnlocked: false,
    noEncounters: true,
    bgmMuted: false,
    audioDebug: false,
    verboseDebug: false
  });
}
function createTutorialState(state2) {
  const player = createTutorialPlayer();
  return {
    ...state2,
    screen: "overworld",
    player,
    dungeon: void 0,
    battle: void 0,
    battleAnimation: void 0,
    messages: [],
    menuCursor: 0,
    previousScreen: "title",
    menuReturnScreen: "overworld",
    tutorial: {
      active: true,
      step: "move",
      battleStep: "skill"
    }
  };
}
function createTutorialBattleState(state2) {
  const player = {
    ...state2.player,
    party: state2.player.party.map((creature, idx) => idx === 0 ? {
      ...creature,
      currentHp: Math.max(1, creature.maxHp - 10)
    } : creature)
  };
  const enemy = rollWildCreature("central", "Data-Duck", 1);
  enemy.nickname = "Training-Duck";
  enemy.level = 1;
  enemy.baseStr = 1;
  enemy.baseCon = 1;
  enemy.allocatedStr = 0;
  enemy.allocatedCon = 0;
  enemy.skills = ["Byte"];
  enemy.maxHp = 44;
  enemy.currentHp = enemy.maxHp;
  const battle = {
    ...createBattle("tutorial", player.party[0], 0, enemy),
    canCatch: true,
    log: ["Training process spawned: Training-Duck."]
  };
  return {
    ...state2,
    screen: "battle",
    previousScreen: "overworld",
    player,
    battle,
    tutorial: {
      ...state2.tutorial,
      step: "battle",
      battleStep: "skill"
    }
  };
}
function completeTutorial(state2) {
  return {
    ...state2,
    screen: "tutorial_complete",
    battle: void 0,
    battleAnimation: void 0,
    dungeon: void 0,
    messages: [],
    menuCursor: 0,
    tutorial: {
      active: true,
      step: "complete",
      battleStep: "finish"
    }
  };
}
function addMessage(state2, msg) {
  return { ...state2, messages: [...state2.messages.slice(-20), msg] };
}
function getAudioContextScreen(state2) {
  if (!state2) return "title";
  if (state2.screen === "battle") return "battle";
  if (state2.screen === "dungeon") return "dungeon";
  if (state2.screen === "overworld") return "overworld";
  if (state2.screen === "game_over") return "game_over";
  if (state2.screen === "secret_unlock" || state2.screen === "final_key_input") return "victory";
  if (state2.screen === "splash" || state2.screen === "title" || state2.screen === "new_game_name" || state2.screen === "new_game_password" || state2.screen === "story_briefing" || state2.screen === "load_game") {
    return "title";
  }
  if (AUDIO_CONTEXT_SCREENS.has(state2.screen)) {
    const context = state2.inventoryReturnScreen ?? state2.menuReturnScreen ?? state2.previousScreen;
    if (context === "battle" && state2.battle) return "battle";
    if (context === "dungeon") return "dungeon";
    if (context === "overworld") return "overworld";
  }
  return state2.player ? "overworld" : "title";
}
function getDesiredBgmTrack(state2) {
  const context = getAudioContextScreen(state2);
  if (context === "battle") {
    return state2.battle?.context === "boss" ? "boss" : "battle";
  }
  if (context === "dungeon") return "dungeon";
  if (context === "overworld") return "overworld";
  if (context === "title") return "title";
  if (context === "game_over") return "game_over";
  if (context === "victory") return "victory";
  return null;
}
function syncAudioForState(state2) {
  const muted = state2.player?.bgmMuted ?? false;
  if (state2.player) {
    setAudioDebugEnabled((state2.player.audioDebug ?? false) || process.env.KERNELBREACH_AUDIO_DEBUG === "1");
    setEngineDebugEnabled((state2.player.verboseDebug ?? false) || process.env.KERNELBREACH_VERBOSE_DEBUG === "1");
  }
  audioManager.sync(getDesiredBgmTrack(state2), muted);
}
function handleSplash(state2) {
  return {
    ...state2,
    screen: "title",
    splashFrame: void 0,
    menuCursor: 0
  };
}
function handleTitle(state2, key) {
  const opts = 4;
  if (isUp(key)) return { ...state2, menuCursor: (state2.menuCursor - 1 + opts) % opts };
  if (isDown(key)) return { ...state2, menuCursor: (state2.menuCursor + 1) % opts };
  if (isConfirm(key)) {
    if (state2.menuCursor === 0) return { ...state2, screen: "new_game_name", menuCursor: 0, nameInput: "", passwordInput: "", loginUser: "" };
    if (state2.menuCursor === 1) return { ...state2, screen: "load_game", menuCursor: 0 };
    if (state2.menuCursor === 2) return createTutorialState(state2);
    if (state2.menuCursor === 3) {
      requestRuntimeQuit();
    }
  }
  return state2;
}
function handleNewGameName(state2, key) {
  const name = state2.nameInput ?? "";
  if (key === KEY.BACKSPACE || key === KEY.BACKSPACE2) {
    return { ...state2, nameInput: name.slice(0, -1) };
  }
  if (isConfirm(key)) {
    if (name.trim().length < 1) return state2;
    return {
      ...state2,
      screen: "new_game_password",
      loginUser: name.trim(),
      passwordInput: "",
      menuCursor: 0
    };
  }
  if (isCancel(key)) return { ...state2, screen: "title", menuCursor: 0 };
  if (key.length === 1 && key >= " " && name.length < 16) {
    return { ...state2, nameInput: name + key };
  }
  return state2;
}
function handleNewGamePassword(state2, key) {
  const password = state2.passwordInput ?? "";
  if (key === KEY.BACKSPACE || key === KEY.BACKSPACE2) {
    return { ...state2, passwordInput: password.slice(0, -1) };
  }
  if (isConfirm(key)) {
    if (password === "Terminal#quest4") {
      return {
        ...state2,
        screen: "story_briefing",
        menuCursor: 0
      };
    }
    return addMessage({
      ...state2,
      screen: "title",
      menuCursor: 0,
      nameInput: "",
      passwordInput: "",
      loginUser: ""
    }, "**ACCESS DENIED**CHECK GAME'S ROOT DIRECTORY FOR CLUES**");
  }
  if (isCancel(key)) return { ...state2, screen: "title", menuCursor: 0, passwordInput: "", loginUser: "", nameInput: "" };
  if (key.length === 1 && key >= " " && password.length < 32) {
    return { ...state2, passwordInput: password + key };
  }
  return state2;
}
function handleStoryBriefing(state2, key) {
  if (!isConfirm(key)) return state2;
  const player = normalizePlayerProgress(createNewPlayer(state2.loginUser || "root"));
  return {
    ...state2,
    screen: "overworld",
    player,
    messages: [`Root access granted. Lead Security Architect ${player.name} authenticated.`, `${player.party[0]?.nickname ?? "Exploit"} linked and ready for deployment.`],
    menuCursor: 0,
    nameInput: "",
    passwordInput: ""
  };
}
function handleLoadGame(state2, key) {
  const slots = getSaveSlots();
  const opts = slots.length;
  if (isUp(key)) return { ...state2, menuCursor: (state2.menuCursor - 1 + opts) % opts };
  if (isDown(key)) return { ...state2, menuCursor: (state2.menuCursor + 1) % opts };
  if (isCancel(key)) return { ...state2, screen: "title", menuCursor: 0 };
  if (isConfirm(key)) {
    const slot = slots[state2.menuCursor];
    if (!slot?.exists) return addMessage(state2, "That slot is empty.");
    const save = loadGame(slot.slot);
    if (!save) return addMessage(state2, "Restore operation failed.");
    return {
      ...state2,
      screen: "overworld",
      player: normalizePlayerProgress(save.player),
      messages: [`Restore complete. Welcome back, Architect ${save.player.name}.`],
      menuCursor: 0,
      saveSlot: slot.slot
    };
  }
  return state2;
}
function handleOverworld(state2, key) {
  if (isTutorialActive(state2)) return handleTutorialOverworld(state2, key);
  if (isDevMenuEnabled() && key === KEY.DEV_TOGGLE) {
    return { 
      ...state2, 
      showDevMenu: true, 
      screen: "menu", 
      menuCursor: 0, 
      previousScreen: "overworld", 
      menuReturnScreen: "overworld",
      messages: [...state2.messages, "Developer session initialized."]
    };
  }
  if (key === KEY.m || key === KEY.M) {
    return { ...state2, showDevMenu: false, screen: "menu", menuCursor: 0, previousScreen: "overworld", menuReturnScreen: "overworld" };
  }
  if (key === KEY.i || key === KEY.I) {
    return openInventory(state2, "overworld", "field");
  }
  if (key === KEY.e || key === KEY.E) {
    const map = ZONE_MAPS[state2.player.currentZone];
    const { x, y } = state2.player.position;
    const neighbors = [{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }, { dx: 1, dy: 0 }];
    for (const { dx, dy } of neighbors) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < MAP_WIDTH && ny >= 0 && ny < MAP_HEIGHT && getTile(map, nx, ny) === "D") {
        return enterDungeon(state2);
      }
    }
    return addMessage(state2, "There is no breach site ingress nearby.");
  }
  let dir = null;
  if (isUp(key)) dir = "up";
  else if (isDown(key)) dir = "down";
  else if (isLeft(key)) dir = "left";
  else if (isRight(key)) dir = "right";
  if (!dir) return state2;
  return moveOverworld(state2, dir);
}
function handleTutorialOverworld(state2, key) {
  const step = state2.tutorial.step;
  if (step === "move") {
    let dir = null;
    if (isUp(key)) dir = "up";
    else if (isDown(key)) dir = "down";
    else if (isLeft(key)) dir = "left";
    else if (isRight(key)) dir = "right";
    if (!dir) return state2;
    const moved = moveOverworld({ ...state2, player: { ...state2.player, noEncounters: true } }, dir);
    if (moved.player.position.x === state2.player.position.x && moved.player.position.y === state2.player.position.y) return moved;
    return {
      ...moved,
      tutorial: { ...state2.tutorial, step: "open_menu" },
      messages: []
    };
  }
  if (step === "open_menu") {
    if (key === KEY.m || key === KEY.M) {
      return {
        ...state2,
        screen: "menu",
        menuCursor: getMenuOptionIndex(state2, "Exploits"),
        previousScreen: "overworld",
        menuReturnScreen: "overworld",
        tutorial: { ...state2.tutorial, step: "open_party" },
        messages: []
      };
    }
    return addMessage(state2, "Tutorial: press M to open the menu.");
  }
  if (step === "open_inventory") {
    if (key === KEY.i || key === KEY.I) {
      return {
        ...state2,
        screen: "inventory",
        previousScreen: "overworld",
        inventoryReturnScreen: "overworld",
        itemUseContext: "field",
        menuCursor: 0,
        tutorial: { ...state2.tutorial, step: "close_inventory" },
        messages: []
      };
    }
    return addMessage(state2, "Tutorial: press I to open Patches.");
  }
  if (step === "start_battle") {
    if (key === KEY.e || key === KEY.E || isConfirm(key)) {
      return createTutorialBattleState(state2);
    }
    return addMessage(state2, "Tutorial: press E to start a training battle.");
  }
  return state2;
}
function moveOverworld(state2, dir) {
  const { player } = state2;
  const map = ZONE_MAPS[player.currentZone];
  let { x, y } = player.position;
  const dx = dir === "left" ? -1 : dir === "right" ? 1 : 0;
  const dy = dir === "up" ? -1 : dir === "down" ? 1 : 0;
  const nx = x + dx;
  const ny = y + dy;
  if (nx < 0 || nx >= MAP_WIDTH || ny < 0 || ny >= MAP_HEIGHT) {
    return handleZoneTransition(state2, dir, x, y);
  }
  const tile = getTile(map, nx, ny);
  if (!isWalkable(tile)) return addMessage(state2, "The way is blocked.");
  let s = {
    ...state2,
    player: { ...player, position: { x: nx, y: ny } }
  };
  s = discoverZoneScript(s);
  if (tile === "O") {
    s = healParty(s);
  } else if (tile === "$") {
    return { ...s, screen: "shop", menuCursor: 0, previousScreen: "overworld" };
  } else if (tile === "D") {
    return enterDungeon(s);
  } else if (tile === "~") {
    if (!player.noEncounters && Math.random() < ENCOUNTER_RATE) {
      return startWildBattle(s);
    }
  }
  return s;
}
function oppositeDirection(dir) {
  if (dir === "up") return "down";
  if (dir === "down") return "up";
  if (dir === "left") return "right";
  return "left";
}
function findNearestWalkablePosition(zone, preferredX, preferredY) {
  const map = ZONE_MAPS[zone];
  const startX = Math.max(0, Math.min(MAP_WIDTH - 1, preferredX));
  const startY = Math.max(0, Math.min(MAP_HEIGHT - 1, preferredY));
  if (isWalkable(getTile(map, startX, startY))) {
    return { x: startX, y: startY };
  }
  for (let radius = 1; radius < Math.max(MAP_WIDTH, MAP_HEIGHT); radius++) {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue;
        const x = startX + dx;
        const y = startY + dy;
        if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) continue;
        if (isWalkable(getTile(map, x, y))) {
          return { x, y };
        }
      }
    }
  }
  return { x: startX, y: startY };
}
function handleZoneTransition(state2, dir, x, y) {
  const { player } = state2;
  const zone = player.currentZone;
  const cfg = ZONE_CONFIGS[zone];
  if (cfg.blockedExits.includes(dir)) {
    return addMessage(state2, "There's nowhere to go that way.");
  }
  const destZone = ZONE_GRAPH[zone]?.[dir];
  if (!destZone) {
    return addMessage(state2, "There's nowhere to go that way.");
  }
  const destCfg = ZONE_CONFIGS[destZone];
  const entryDir = oppositeDirection(dir);
  const preferredEntry = destCfg.playerEntry[entryDir];
  const safeEntry = findNearestWalkablePosition(destZone, preferredEntry.x, preferredEntry.y);
  engineDebug(`zone transition ${zone} -> ${destZone} via ${dir} from (${x},${y}) to (${safeEntry.x},${safeEntry.y})`);
  return addMessage({
    ...state2,
    player: { ...player, currentZone: destZone, position: safeEntry }
  }, `Entered ${destCfg.displayName}.`);
}
function healParty(state2) {
  const party = state2.player.party.map(healFully);
  return addMessage({
    ...state2,
    player: { ...state2.player, party }
  }, "The integrity well fully restores all active exploits.");
}
function enterDungeon(state2) {
  const { player } = state2;
  const zone = player.currentZone;
  const cfg = DUNGEON_CONFIGS[zone];
  
  // Security Gates
  const PREREQS = {
    south: { species: "Wifi-Owl", name: "Cryo-Compiler", dungeon: "Cryo-Stack" },
    east: { species: "Firewall-Drake", name: "GPU-Inferno", dungeon: "Overclock Core" },
    cache: { species: "Honk-Process", name: "Legacy Protocol", dungeon: "Bit-Rot Pit" },
    west: { species: "Spy-Ware", name: "Spy-Ware", dungeon: "Defrag Chamber" },
    sandbox: { species: "Bot-Node", name: "Abyssal Kernel", dungeon: "Deep Buffer" },
    home: { species: "Ransom-Ware", name: "Ransom-Ware", dungeon: "Quarantine Vault" },
    proc: { species: "Eskalate", name: "Eskalate", dungeon: "User-Space" },
    tmp: { species: "Init-Reaper", name: "Init-Reaper", dungeon: "Scheduler Core" },
    dev: { species: "Shred-Null", name: "Shred-Null", dungeon: "Ephemeral Cache" },
    central: { species: "Eskalate", name: "Eskalate", dungeon: "User-Space" }
  };

  if (PREREQS[zone] && !player.allDungeonsUnlocked) {
    const req = PREREQS[zone];
    if (!player.defeatedBosses.includes(req.species)) {
      return addMessage(state2, `ACCESS DENIED: Purge ${req.name} at ${req.dungeon} first.`);
    }
    if (zone === "central") {
      const allBosses = BOSS_SEQUENCE.filter((boss) => boss.zone !== "central").map((boss) => boss.species);
      if (!allBosses.every(b => player.defeatedBosses.includes(b))) {
        return addMessage(state2, `ACCESS DENIED: Security Clearance Level ${allBosses.length} Required.`);
      }
    }
  }

  const dungeon = {
    zone: player.currentZone,
    playerPos: { ...cfg.startPos },
    entryPos: { ...player.position },
    bossDefeated: player.defeatedBosses.includes(ZONE_CONFIGS[player.currentZone].bossSpecies),
    bossPos: { ...cfg.bossPos }
  };
  engineDebug(`enter dungeon zone=${zone} start=(${cfg.startPos.x},${cfg.startPos.y}) bossDefeated=${dungeon.bossDefeated}`);
  return addMessage({
    ...state2,
    screen: "dungeon",
    dungeon
  }, `Entered ${cfg.name} breach site. Purge the daemon at B or escape via D.`);
}
function startWildBattle(state2) {
  const { player } = state2;
  const idx = getFirstLivingIndex(player.party);
  if (idx < 0) return state2;
  const level = player.party[idx].level;
  const battle = createWildBattle(player.currentZone, player.party[idx], idx, level);
  engineDebug(`start wild battle zone=${player.currentZone} player=${player.party[idx].nickname} enemy=${battle.enemy.creature.nickname} level=${battle.enemy.creature.level}`);
  return { ...state2, screen: "battle", battle, previousScreen: "overworld" };
}
function handleDungeon(state2, key) {
  if (!state2.dungeon) return state2;
  if (isDevMenuEnabled() && key === KEY.DEV_TOGGLE) {
    return { 
      ...state2, 
      showDevMenu: true, 
      screen: "menu", 
      menuCursor: 0, 
      previousScreen: "dungeon", 
      menuReturnScreen: "dungeon",
      messages: [...state2.messages, "Developer Session Initialized"]
    };
  }
  if (key === KEY.m || key === KEY.M) {
    return { ...state2, showDevMenu: false, screen: "menu", menuCursor: 0, previousScreen: "dungeon", menuReturnScreen: "dungeon" };
  }
  if (key === KEY.i || key === KEY.I) {
    return openInventory(state2, "dungeon", "field");
  }
  let dir = null;
  if (isUp(key)) dir = "up";
  else if (isDown(key)) dir = "down";
  else if (isLeft(key)) dir = "left";
  else if (isRight(key)) dir = "right";
  if (!dir) return state2;
  return moveDungeon(state2, dir);
}
function moveDungeon(state2, dir) {
  const { dungeon, player } = state2;
  if (!dungeon) return state2;
  const cfg = DUNGEON_CONFIGS[dungeon.zone];
  const { x, y } = dungeon.playerPos;
  const dx = dir === "left" ? -1 : dir === "right" ? 1 : 0;
  const dy = dir === "up" ? -1 : dir === "down" ? 1 : 0;
  const nx = x + dx;
  const ny = y + dy;
  if (nx < 0 || nx >= DUNGEON_WIDTH || ny < 0 || ny >= DUNGEON_HEIGHT) {
    return addMessage(state2, "Solid wall.");
  }
  const tile = getDungeonTile(cfg.map, nx, ny);
  if (!isDungeonWalkable(tile)) return addMessage(state2, "Blocked.");
  let s = {
    ...state2,
    dungeon: { ...dungeon, playerPos: { x: nx, y: ny } }
  };
  if (tile === "D") {
    return exitDungeon(s);
  }
  if (tile === "B" && !dungeon.bossDefeated) {
    return startBossBattle(s);
  }
  if (tile === "~") {
    if (!player.noEncounters && Math.random() < DUNGEON_ENCOUNTER_RATE) {
      const idx = getFirstLivingIndex(player.party);
      if (idx >= 0) {
        const level = player.party[idx].level;
        const battle = createDungeonWildBattle(dungeon.zone, player.party[idx], idx, level);
        return { ...s, screen: "battle", battle, previousScreen: "dungeon" };
      }
    }
  }
  return s;
}
function exitDungeon(state2) {
  const { dungeon, player } = state2;
  if (!dungeon) return state2;
  engineDebug(`exit dungeon zone=${dungeon.zone} returnPos=(${dungeon.entryPos.x},${dungeon.entryPos.y})`);
  return addMessage({
    ...state2,
    screen: "overworld",
    dungeon: void 0,
    player: { ...player, position: dungeon.entryPos }
  }, "You exit the breach site.");
}
function startBossBattle(state2) {
  const { dungeon, player } = state2;
  if (!dungeon) return state2;
  const idx = getFirstLivingIndex(player.party);
  if (idx < 0) return state2;
  const battle = createBossBattle(dungeon.zone, player.party[idx], idx);
  engineDebug(`start boss battle zone=${dungeon.zone} player=${player.party[idx].nickname} boss=${battle.enemy.creature.nickname} level=${battle.enemy.creature.level}`);
  return addMessage({ ...state2, screen: "battle", battle, previousScreen: "dungeon" }, `A corrupted Security Daemon denies further access.`);
}
function shouldProtectTutorialBattle(state2, battle) {
  return state2.tutorial?.active === true && state2.tutorial.step === "battle" && battle?.context === "tutorial";
}
function protectTutorialBattle(state2, battle) {
  if (!shouldProtectTutorialBattle(state2, battle)) return battle;
  let protectedBattle = battle;
  const tutorialLogs = [];
  if (protectedBattle.player.creature.currentHp <= 0) {
    protectedBattle = cloneBattle(protectedBattle);
    protectedBattle.player.creature.currentHp = 1;
    tutorialLogs.push("Tutorial safeguard: Bit-Blob memory pinned at 1 MB.");
  }
  if (state2.tutorial.battleStep !== "finish" && protectedBattle.enemy.creature.currentHp <= 0) {
    if (protectedBattle === battle) protectedBattle = cloneBattle(protectedBattle);
    protectedBattle.enemy.creature.currentHp = 1;
    tutorialLogs.push("Tutorial safeguard: Training target memory pinned at 1 MB.");
  }
  if (protectedBattle !== battle) {
    protectedBattle.phase = "player_action";
    protectedBattle.result = void 0;
    protectedBattle.caughtCreature = void 0;
    protectedBattle.log = [...protectedBattle.log, ...tutorialLogs];
  }
  return protectedBattle;
}
function startBattleSequence(state2, battleAnimation) {
  if (!battleAnimation || battleAnimation.steps.length === 0) {
    return { ...state2, battleAnimation: void 0 };
  }
  let nextState = { ...state2, battleAnimation };
  while (nextState.battleAnimation) {
    const step = nextState.battleAnimation.steps[nextState.battleAnimation.stepIndex];
    if (!step) {
      nextState = { ...nextState, battleAnimation: void 0 };
      break;
    }
    if (step.type === "animation") break;
    const protectedBattle = protectTutorialBattle(nextState, step.battle);
    const protectedParty = protectedBattle !== step.battle ? syncParty(step.party ?? nextState.player.party, protectedBattle) : step.party;
    nextState = {
      ...nextState,
      battle: protectedBattle,
      player: {
        ...nextState.player,
        party: protectedParty ?? nextState.player.party,
        items: step.items ?? nextState.player.items
      },
      battleAnimation: {
        ...nextState.battleAnimation,
        stepIndex: nextState.battleAnimation.stepIndex + 1,
        frame: 0
      }
    };
  }
  if (nextState.battleAnimation && nextState.battleAnimation.stepIndex >= nextState.battleAnimation.steps.length) {
    return { ...nextState, battleAnimation: void 0 };
  }
  return nextState;
}
function advanceAnimations(state2) {
  if (state2.screen === "splash") {
    const nextFrame = (state2.splashFrame ?? 0) + 1;
    if (nextFrame >= SPLASH_FRAMES) {
      return {
        ...state2,
        screen: "title",
        splashFrame: void 0,
        menuCursor: 0
      };
    }
    return { ...state2, splashFrame: nextFrame };
  }
  const anim = state2.battleAnimation;
  if (!anim) return state2;
  const step = anim.steps[anim.stepIndex];
  if (!step) {
    return { ...state2, battleAnimation: void 0 };
  }
  if (step.type !== "animation") {
    return startBattleSequence(state2, anim);
  }
  if (anim.frame + 1 < step.animation.frames) {
    return {
      ...state2,
      battleAnimation: { ...anim, frame: anim.frame + 1 }
    };
  }
  return startBattleSequence(state2, {
    ...anim,
    stepIndex: anim.stepIndex + 1,
    frame: 0
  });
}
function openInventory(state2, previousScreen, itemUseContext) {
  return {
    ...state2,
    screen: "inventory",
    previousScreen,
    menuReturnScreen: previousScreen === "battle" ? state2.previousScreen ?? state2.menuReturnScreen : state2.menuReturnScreen,
    inventoryReturnScreen: previousScreen,
    itemUseContext,
    menuCursor: 0
  };
}
function useFieldItem(state2, itemId, targetIdx) {
  const item = ITEMS[itemId];
  const target = state2.player.party[targetIdx];
  const count = state2.player.items[itemId] ?? 0;
  if (!item || !target || count <= 0) return addMessage(state2, "That patch is unavailable.");
  if (target.currentHp >= target.maxHp) return addMessage(state2, `${target.nickname} is already at full memory.`);
  const healAmount = Math.min(item.healAmount, target.maxHp - target.currentHp);
  const updatedTarget = { ...target, currentHp: Math.min(target.maxHp, target.currentHp + item.healAmount) };
  const newParty = [...state2.player.party];
  newParty[targetIdx] = updatedTarget;
  const newItems = { ...state2.player.items, [itemId]: count - 1 };
  const returnScreen = state2.inventoryReturnScreen === "menu" ? "menu" : state2.menuReturnScreen ?? state2.inventoryReturnScreen ?? "overworld";
  const returnCursor = returnScreen === "menu" ? getMenuOptionIndex(state2, "Patches") : 0;
  return addMessage({
    ...state2,
    screen: returnScreen,
    previousScreen: returnScreen === "menu" ? state2.menuReturnScreen ?? "overworld" : state2.previousScreen,
    inventoryReturnScreen: void 0,
    selectedItemId: void 0,
    itemUseContext: void 0,
    player: { ...state2.player, party: newParty, items: newItems },
    menuCursor: returnCursor
  }, `${item.name} applied to ${target.nickname}. Memory restored by ${healAmount} MB.`);
}
function useBattleItem(state2, itemId) {
  const { battle, player } = state2;
  if (!battle) return state2;
  const tutorialBlock = getTutorialBattleActionMessage(state2, "item");
  if (tutorialBlock) return addMessage({ ...state2, screen: "battle", inventoryReturnScreen: void 0, selectedItemId: void 0, itemUseContext: void 0 }, tutorialBlock);
  const item = ITEMS[itemId];
  const count = player.items[itemId] ?? 0;
  if (!item || count <= 0) return addMessage(state2, "That patch is unavailable.");
  if (battle.player.creature.currentHp >= battle.player.creature.maxHp) {
    return addMessage({
      ...state2,
      screen: "battle",
      previousScreen: state2.menuReturnScreen ?? state2.previousScreen,
      inventoryReturnScreen: void 0,
      selectedItemId: void 0,
      itemUseContext: void 0
  }, `${battle.player.creature.nickname} is already at full memory.`);
  }
  const plan = planBattleAction(battle, "item", player.party, player.items, { itemId });
  const sequenced = startBattleSequence({
    ...state2,
    screen: "battle",
    battle: plan.initialBattle,
    previousScreen: state2.menuReturnScreen ?? state2.previousScreen,
    inventoryReturnScreen: void 0,
    selectedItemId: void 0,
    itemUseContext: void 0,
    player
  }, {
    steps: plan.steps,
    stepIndex: 0,
    frame: 0
  });
  return advanceTutorialBattleStep(sequenced, "item");
}
function renderBattle(state2) {
  const { player, battle } = state2;
  if (!battle) return;
  const W = getGameWidth();
  const rows = [];
  const enemy = battle.enemy.creature;
  const playerC = battle.player.creature;
  const currentStep = state2.battleAnimation?.steps[state2.battleAnimation.stepIndex];
  const currentAnim = currentStep?.type === "animation" ? currentStep.animation : void 0;
  const animFrame = state2.battleAnimation?.frame ?? 0;
  const enemyWiggle = currentAnim?.actor === "enemy" && currentAnim.kind === "hit" ? animFrame % 3 : 0;
  const playerWiggle = currentAnim?.actor === "player" && currentAnim.kind === "hit" ? animFrame % 3 : 0;
  const enemyLines = renderSprite(enemy.species, enemy.eye, enemy.hat, enemyWiggle);
  const playerLines = renderSprite(playerC.species, playerC.eye, playerC.hat, playerWiggle);
  const spriteW = 12;
  const sidePad = Math.max(2, Math.floor((W - (spriteW * 2 + 10)) / 2));
  const gap = W - (spriteW * 2 + sidePad * 2 + 2);
  function pushRow(content) {
    rows.push(content);
  }
  pushRow(topBorder(battle.context === "boss" ? "CRITICAL SYSTEM BREACH - BOSS" : "BATTLE SESSION", W));
  function decorateSprite(line, actor, row) {
    const base = line.padEnd(spriteW, " ").slice(0, spriteW);
    const chars = base.split("");
    if (!currentAnim || currentAnim.actor !== actor) return base;
    if (currentAnim.kind === "defend") {
      if (row < 1 || row > 3) return base;
      chars[0] = "[";
      chars[spriteW - 1] = "]";
      if (row === 2) {
        chars[1] = "=";
        chars[spriteW - 2] = "=";
      }
      return chars.join("");
    }
    if (currentAnim.kind === "hit") {
      if (row < 1 || row > 3) return base;
      chars[0] = "{";
      chars[spriteW - 1] = "}";
      if (row === 2) {
        chars[1] = "!";
        chars[spriteW - 2] = "!";
      }
      return chars.join("");
    }
    if (currentAnim.kind === "heal") {
      if (row === 0 || row === 4) return base;
      chars[0] = "+";
      chars[spriteW - 1] = "+";
      if (row === 2) {
        chars[Math.floor(spriteW / 2)] = "+";
      }
      return chars.join("");
    }
    if (currentAnim.kind === "capture" && actor === "enemy") {
      if (row < 1 || row > 3) return base;
      chars[0] = "(";
      chars[spriteW - 1] = ")";
      if (row === 2) {
        chars[1] = "o";
        chars[spriteW - 2] = "o";
      }
      return chars.join("");
    }
    if (currentAnim.kind === "flee" && actor === "player" && row === 2) {
      chars[0] = "~";
      chars[1] = "~";
      chars[2] = ">";
      return chars.join("");
    }
    return chars.join("");
  }
  function renderProjectileGap(row) {
    const chars = Array.from({ length: gap }, () => " ");
    if (!currentAnim || row !== 2) return chars.join("");
    const progress = currentAnim.frames <= 1 ? 1 : animFrame / (currentAnim.frames - 1);
    if (currentAnim.kind === "attack") {
      const glyphs = [".", "o", "O", "*", "O", "o"];
      const pos = currentAnim.actor === "player" ? gap - 1 - Math.round(progress * (gap - 1)) : Math.round(progress * (gap - 1));
      chars[Math.max(0, Math.min(gap - 1, pos))] = glyphs[Math.min(animFrame, glyphs.length - 1)];
      return chars.join("");
    }
    if (currentAnim.kind === "capture") {
      const glyphs = ["o", "O", "@", "O", "o", "*", "*", "*"];
      const pos = gap - 1 - Math.round(progress * (gap - 1));
      chars[Math.max(0, Math.min(gap - 1, pos))] = glyphs[Math.min(animFrame, glyphs.length - 1)];
      return chars.join("");
    }
    if (currentAnim.kind === "flee" && currentAnim.actor === "player") {
      const trail = Math.max(0, gap - 1 - Math.round(progress * (gap - 1)));
      chars[Math.max(0, Math.min(gap - 1, trail))] = "~";
      return chars.join("");
    }
    return chars.join("");
  }
  const emptyRow = `\u2502${" ".repeat(sidePad)}${" ".repeat(spriteW)}${" ".repeat(gap)}${" ".repeat(spriteW)}${" ".repeat(sidePad)}\u2502`;
  pushRow(emptyRow);
  for (let i = 0; i < 5; i++) {
    const eL = decorateSprite(enemyLines[i] ?? "", "enemy", i);
    const pL = decorateSprite(playerLines[i] ?? "", "player", i);
    const mid = renderProjectileGap(i);
    pushRow(`\u2502${" ".repeat(sidePad)}${BRIGHT_RED}${eL}${RESET}${mid}${BRIGHT_GREEN}${pL}${RESET}${" ".repeat(sidePad)}\u2502`);
  }
  pushRow(emptyRow);
  const enemyRarColor = rarityColor(enemy.rarity);
  const playerRarColor = rarityColor(playerC.rarity);
  const combatColW = spriteW + sidePad;
  const leftCombatW = combatColW + Math.floor(gap / 2);
  const rightCombatW = combatColW + Math.ceil(gap / 2);
  const enemyName = pad(`${enemyRarColor}${enemy.nickname}${RESET} Lv${enemy.level}`, leftCombatW, "center");
  const playerName = pad(`${playerRarColor}${playerC.nickname}${RESET} Lv${playerC.level}`, rightCombatW, "center");
  const enemyBar = pad(`${hpBar(enemy.currentHp, enemy.maxHp, 10)} ${enemy.currentHp}/${enemy.maxHp} MB`, leftCombatW, "center");
  const playerBar = pad(`${hpBar(playerC.currentHp, playerC.maxHp, 10)} ${playerC.currentHp}/${playerC.maxHp} MB`, rightCombatW, "center");
  pushRow(`\u2502${enemyName}${playerName}\u2502`);
  pushRow(`\u2502${enemyBar}${playerBar}\u2502`);
  function getStatusIcons(participant) {
    const safeParticipant = normalizeBattleParticipant(participant);
    const icons = [];
    if (safeParticipant.isDefending) icons.push(color("[DEF]", CYAN));
    for (const s of safeParticipant.statuses) {
      if (s.type === "dot") icons.push(color("[DOT]", BRIGHT_RED));
      if (s.type === "debuff" && s.stat === "attack") icons.push(color("[ATK-]", RED));
      if (s.type === "debuff" && s.stat === "defense") icons.push(color("[DEF-]", RED));
      if (s.type === "buff" && s.stat === "attack") icons.push(color("[ATK+]", GREEN));
      if (s.type === "buff" && s.stat === "defense") icons.push(color("[DEF+]", GREEN));
    }
    return icons.join("");
  }
  const eStatus = getStatusIcons(battle.enemy);
  const pStatus = getStatusIcons(battle.player);
  const catchAvail = battle.canCatch && enemy.currentHp / enemy.maxHp <= 0.5 ? color(" [CATCHABLE!]", BRIGHT_MAGENTA) : "";
  const statusLeft = pad(eStatus, leftCombatW, "center");
  const statusRight = pad(`${catchAvail}${pStatus}`, rightCombatW, "center");
  pushRow(`\u2502${statusLeft}${statusRight}\u2502`);
  pushRow(divider(W));
  const logLines = battle.log.slice(-4);
  while (logLines.length < 4) logLines.unshift("");
  for (const line of logLines) {
    pushRow(`\u2502 ${color(pad(line, W - 4), line.includes("!") ? WHITE : GREY)} \u2502`);
  }
  pushRow(divider(W));
  const tutorialPrompt = getTutorialPrompt(state2);
  if (tutorialPrompt) {
    pushRow(`\u2502 ${pad(color(tutorialPrompt, BRIGHT_CYAN), W - 4)} \u2502`);
    pushRow(divider(W));
  }
  if (battle.phase === "player_action") {
    if (battle.selectingSkill) {
      const skills = playerC.skills;
      const skillStr = skills.map((s, i) => {
        const selected = i === battle.skillCursor;
        return selected ? color(bold(`> ${s}`), BRIGHT_YELLOW) : dim(`  ${s}`);
      }).join("  ");
      pushRow(`\u2502 ${pad(skillStr, W - 4)} \u2502`);
      const info = SKILLS[skills[battle.skillCursor]]?.description ?? "";
      pushRow(`\u2502 ${color(pad(info, W - 4), BRIGHT_CYAN)} \u2502`);
    } else if (battle.selectingScript) {
      const scripts = getBattleScripts(player);
      const scriptStr = scripts.map((s, i) => {
        const selected = i === battle.scriptCursor;
        return selected ? color(bold(`> ${s}`), BRIGHT_YELLOW) : dim(`  ${s}`);
      }).join("  ");
      pushRow(`\u2502 ${pad(scriptStr, W - 4)} \u2502`);
      const info = SCRIPT_DEFS[scripts[battle.scriptCursor]]?.description ?? "";
      pushRow(`\u2502 ${color(pad(info || "No battle scripts recovered.", W - 4), BRIGHT_CYAN)} \u2502`);
    } else if (battle.selectingSwitch) {
      const switchStr = player.party.map((creature, i) => {
        const selected = i === (battle.switchCursor ?? 0);
        const active = i === battle.playerActiveIndex;
        if (!creature) {
          return selected ? color(bold(`> ${i + 1}:EMPTY`), BRIGHT_YELLOW) : dim(`  ${i + 1}:EMPTY`);
        }
        const fainted = creature.currentHp <= 0;
        const label = `${i + 1}:${creature.nickname.slice(0, 8)}${active ? "*" : fainted ? "x" : ""}`;
        return selected ? color(bold(`> ${label}`), BRIGHT_YELLOW) : dim(`  ${label}`);
      }).join("  ");
      pushRow(`\u2502 ${pad(switchStr, W - 4)} \u2502`);
      const target = player.party[battle.switchCursor ?? 0];
      const switchInfo = !target ? "Empty slot. Pick an active exploit." : battle.switchCursor === battle.playerActiveIndex ? `${target.nickname} is already active.` : target.currentHp <= 0 ? `${target.nickname} has collapsed and cannot switch in.` : `Deploy ${target.nickname} into the active exploit stack.`;
      pushRow(`\u2502 ${color(pad(switchInfo, W - 4), BRIGHT_CYAN)} \u2502`);
    } else {
      const actionEntries = getBattleActionEntries(state2);
      const actionStr = actionEntries.map((entry, i) => {
        const selected = i === battle.actionCursor;
        const label = `[${entry.label[0]}]${entry.label.slice(1)}`;
        const catchable = battle.canCatch && enemy.currentHp / enemy.maxHp <= 0.5;
        if (entry.action === "capture" && !battle.canCatch) return dim(`(${entry.label})`);
        if (entry.action === "capture" && !catchable) return selected ? color(label, YELLOW) : dim(label);
        return selected ? color(bold(label), BRIGHT_YELLOW) : dim(label);
      }).join("  ");
      pushRow(`\u2502 ${pad(actionStr, W - 4)} \u2502`);
      const partyHint = `Party: ${player.party.map((c, i) => `${i + 1}:${c ? c.nickname.slice(0, 6) : "--"}`).join(" ")}`;
      pushRow(`\u2502 ${dim(pad(`\u2191\u2193 Select  Enter:Confirm  ${partyHint}`, W - 4))} \u2502`);
    }
  } else {
    const resultText = battle.phase === "result" && battle.result === "lose" && !player.party.every((c) => c.currentHp <= 0) ? "An active exploit collapsed. Press ENTER to deploy the next one." : battle.phase === "result" ? "Purge cycle ended. Press ENTER to continue." : state2.battleAnimation ? "Action in progress..." : "Enemy turn...";
    pushRow(`\u2502 ${color(pad(resultText, W - 4), BRIGHT_CYAN)} \u2502`);
    pushRow(`\u2502${" ".repeat(W - 2)}\u2502`);
  }
  pushRow(bottomBorder(W));
  renderFrame(rows);
}
function handleBattle(state2, key) {
  const { battle, player } = state2;
  if (!battle) return state2;
  if (state2.battleAnimation) return state2;
  if (battle.phase === "result" || battle.phase === "catch_result") {
    if (isConfirm(key)) return resolveBattleEnd(state2);
    return state2;
  }
  if (battle.phase !== "player_action") return state2;
  if (battle.selectingSkill) {
    const skills = battle.player.creature.skills;
    if (isLeft(key) || isUp(key)) return { ...state2, battle: { ...battle, skillCursor: (battle.skillCursor - 1 + skills.length) % skills.length } };
    if (isRight(key) || isDown(key)) return { ...state2, battle: { ...battle, skillCursor: (battle.skillCursor + 1) % skills.length } };
    if (isCancel(key)) return { ...state2, battle: { ...battle, selectingSkill: false } };
    if (isConfirm(key)) {
      const skillName = skills[battle.skillCursor];
      return executeBattleAction(state2, "skill", { skillName });
    }
    return state2;
  }
  if (battle.selectingScript) {
    const scripts = getBattleScripts(player);
    if (scripts.length === 0) return { ...state2, battle: { ...battle, selectingScript: false, scriptCursor: 0 } };
    if (isLeft(key) || isUp(key)) return { ...state2, battle: { ...battle, scriptCursor: (battle.scriptCursor - 1 + scripts.length) % scripts.length } };
    if (isRight(key) || isDown(key)) return { ...state2, battle: { ...battle, scriptCursor: (battle.scriptCursor + 1) % scripts.length } };
    if (isCancel(key)) return { ...state2, battle: { ...battle, selectingScript: false } };
    if (isConfirm(key)) {
      const scriptName = scripts[battle.scriptCursor];
      return executeBattleAction(state2, "script", { scriptName });
    }
    return state2;
  }
  if (battle.selectingSwitch) {
    const partySize = player.party.length;
    if (partySize === 0) return { ...state2, battle: { ...battle, selectingSwitch: false, switchCursor: 0 } };
    if (isLeft(key) || isUp(key)) return { ...state2, battle: { ...battle, switchCursor: ((battle.switchCursor ?? 0) - 1 + partySize) % partySize } };
    if (isRight(key) || isDown(key)) return { ...state2, battle: { ...battle, switchCursor: ((battle.switchCursor ?? 0) + 1) % partySize } };
    if (key >= "1" && key <= "4") {
      const idx = parseInt(key) - 1;
      return executeBattleAction(state2, "switch", { switchToIndex: idx });
    }
    if (isCancel(key)) return { ...state2, battle: { ...battle, selectingSwitch: false, switchCursor: 0 } };
    if (isConfirm(key)) {
      return executeBattleAction(state2, "switch", { switchToIndex: battle.switchCursor ?? 0 });
    }
    return state2;
  }
  const actionEntries = getBattleActionEntries(state2);
  const actionCount = actionEntries.length;
  if (isUp(key) || isLeft(key)) return { ...state2, battle: { ...battle, actionCursor: (battle.actionCursor - 1 + actionCount) % actionCount } };
  if (isDown(key) || isRight(key)) return { ...state2, battle: { ...battle, actionCursor: (battle.actionCursor + 1) % actionCount } };
  if (key >= "1" && key <= "4") {
    if (isTutorialActive(state2)) return addMessage(state2, "Tutorial: follow the highlighted battle prompt.");
    const idx = parseInt(key) - 1;
    const plan = planBattleAction(battle, "switch", player.party, player.items, { switchToIndex: idx });
    return startBattleSequence({ ...state2, battle: plan.initialBattle }, {
      steps: plan.steps,
      stepIndex: 0,
      frame: 0
    });
  }
  if (isConfirm(key) || key === KEY.e || key === KEY.E) {
    const action = actionEntries[battle.actionCursor]?.action;
    if (action === "skill") return { ...state2, battle: { ...battle, selectingSkill: true, skillCursor: 0 } };
    if (action === "script") {
      const scripts = getBattleScripts(player);
      if (scripts.length === 0) return state2;
      return { ...state2, battle: { ...battle, selectingScript: true, scriptCursor: 0 } };
    }
    if (action === "switch") {
      const firstSwitchable = player.party.findIndex((creature, idx) => idx !== battle.playerActiveIndex && creature && creature.currentHp > 0);
      return { ...state2, battle: { ...battle, selectingSwitch: true, switchCursor: firstSwitchable >= 0 ? firstSwitchable : 0 } };
    }
    return executeBattleAction(state2, action);
  }
  if (key === "s" || key === "S") return { ...state2, battle: { ...battle, selectingSkill: true, skillCursor: 0 } };
  if (key === "d" || key === "D") return executeBattleAction(state2, "defend");
  if (key === "i" || key === "I") return executeBattleAction(state2, "item");
  if (key === "f" || key === "F") return executeBattleAction(state2, "flee");
  if (key === "c" || key === "C") return executeBattleAction(state2, "capture");
  return state2;
}
function getTutorialBattleActionMessage(state2, action) {
  if (!isTutorialActive(state2) || state2.tutorial.step !== "battle") return "";
  const battleStep = state2.tutorial.battleStep;
  if (battleStep === "skill" && action !== "skill") return "Tutorial: use Skill first.";
  if (battleStep === "patch" && action !== "item") return "Tutorial: apply a Patch-Kit next.";
  if (battleStep === "script" && action !== "script") return "Tutorial: run the sniff script next.";
  if (battleStep === "link" && action !== "capture") return "Tutorial: choose Link once to see how capture works.";
  if (battleStep === "finish" && !["flee", "skill", "capture"].includes(action)) return "Tutorial: flee or finish the battle.";
  return "";
}
function advanceTutorialBattleStep(state2, action) {
  if (!isTutorialActive(state2) || state2.tutorial.step !== "battle") return state2;
  const battleStep = state2.tutorial.battleStep;
  let nextBattleStep = battleStep;
  if (battleStep === "skill" && action === "skill") nextBattleStep = "patch";
  else if (battleStep === "patch" && action === "item") nextBattleStep = "script";
  else if (battleStep === "script" && action === "script") nextBattleStep = "link";
  else if (battleStep === "link" && action === "capture") nextBattleStep = "finish";
  if (nextBattleStep === battleStep) return state2;
  return {
    ...state2,
    tutorial: {
      ...state2.tutorial,
      battleStep: nextBattleStep
    },
    messages: []
  };
}
function executeBattleAction(state2, action, options = {}) {
  const { battle, player } = state2;
  if (!battle) return state2;
  const tutorialBlock = getTutorialBattleActionMessage(state2, action);
  if (tutorialBlock) return addMessage(state2, tutorialBlock);
  if (action === "item") {
    return openInventory({ ...state2, menuCursor: 0 }, "battle", "battle");
  }
  const plan = planBattleAction(battle, action, player.party, player.items, options);
  const sequenced = startBattleSequence({
    ...state2,
    battle: plan.initialBattle,
    player
  }, {
    steps: plan.steps,
    stepIndex: 0,
    frame: 0
  });
  return advanceTutorialBattleStep(sequenced, action);
}
function resolveBattleEnd(state2) {
  const { battle, player, previousScreen } = state2;
  if (!battle) return state2;
  const returnScreen = previousScreen ?? "overworld";
  if (isTutorialActive(state2) && ["flee", "caught", "win"].includes(battle.result)) {
    return completeTutorial(state2);
  }
  if (battle.result === "flee") {
    return addMessage({ ...state2, screen: returnScreen, battle: void 0, battleAnimation: void 0 }, "You terminated the combat process.");
  }
  if (battle.result === "caught" && battle.caughtCreature) {
    return handleCatch(state2, battle.caughtCreature, returnScreen);
  }
  if (battle.result === "lose") {
    if (isPartyWiped(player.party)) {
      return handlePartyWipe(state2);
    }
    return continueBattleAfterFaint(state2);
  }
  if (battle.result === "win") {
    return handleBattleWin(state2, returnScreen);
  }
  return { ...state2, screen: returnScreen, battle: void 0, battleAnimation: void 0 };
}
function continueBattleAfterFaint(state2) {
  const { battle, player } = state2;
  if (!battle) return state2;
  const nextIdx = player.party.findIndex((creature, idx) => idx !== battle.playerActiveIndex && creature.currentHp > 0);
  if (nextIdx < 0) return handlePartyWipe(state2);
  const nextCreature = player.party[nextIdx];
  const updatedBattle = {
    ...battle,
    player: createBattleParticipant(nextCreature),
    playerActiveIndex: nextIdx,
    phase: "player_action",
    result: void 0,
    actionCursor: 0,
    caughtCreature: void 0,
    log: [...battle.log, `${nextCreature.nickname} deployed into the active exploit stack.`]
  };
  return {
    ...state2,
    screen: "battle",
    battle: updatedBattle,
    battleAnimation: void 0,
    player: { ...player }
  };
}
function handleBattleWin(state2, returnScreen) {
  const { battle, player } = state2;
  if (!battle) return state2;
  const xpGain = calcXpReward(battle.enemy.creature);
  const creditGain = calcCreditReward(battle.enemy.creature);
  engineDebug(`battle win context=${battle.context} enemy=${battle.enemy.creature.nickname} xp=${xpGain} credits=${creditGain} return=${returnScreen}`);
  const { creature: leveled, leveledUp, levels } = addXp(player.party[battle.playerActiveIndex], xpGain);
  const newParty = [...player.party];
  newParty[battle.playerActiveIndex] = leveled;
  let s = {
    ...state2,
    screen: returnScreen,
    battle: void 0,
    battleAnimation: void 0,
    player: { ...player, party: newParty, gold: player.gold + creditGain }
  };
  s = addMessage(s, `Threat purged. +${xpGain} XP, +${creditGain}CR`);
  if (leveledUp) s = addMessage(s, `${leveled.nickname} reached level ${leveled.level}! +2 skill points.`);
  if (battle.context === "boss") {
    const bossSpecies = battle.enemy.creature.species;
    if (!player.defeatedBosses.includes(bossSpecies)) {
      const progress = applyBossProgress(s.player, bossSpecies);
      s = { ...s, player: progress.player };
      s = addMessage(s, `Security Daemon purged. ${ZONE_CONFIGS[state2.dungeon?.zone ?? player.currentZone].dungeonName} restored.`);
      if (progress.keyPiece) {
        s = addMessage(s, `Recovered key piece ${progress.keyPiece.piece} from ${progress.keyPiece.bossName}.`);
      }
      if (s.dungeon) {
        s = { ...s, dungeon: { ...s.dungeon, bossDefeated: true } };
      }
      if (s.player.defeatedBosses.length === TOTAL_BOSSES && !s.player.finalKeyUnlocked) {
        engineDebug("all bosses defeated; entering final key input");
        s = {
          ...s,
          screen: "final_key_input",
          finalKeyInput: "",
          finalKeyError: "",
          showFinalTargetLog: false
        };
        return s;
      }
    }
  }
  return s;
}
function handleCatch(state2, caught, returnScreen) {
  const { player } = state2;
  let s = state2;
  const isBoss = caught.isBoss;
  engineDebug(`capture success creature=${caught.nickname} boss=${isBoss} return=${returnScreen}`);
  let newParty = [...player.party];
  let newStorage = [...player.storage];
  if (newParty.length < 4) {
    newParty.push(caught);
  } else {
    newStorage.push(caught);
    s = addMessage(s, `Exploit capacity reached. ${caught.nickname} moved to Exploit Storage.`);
  }
  s = {
    ...s,
    screen: returnScreen,
    battle: void 0,
    battleAnimation: void 0,
    player: { ...player, party: newParty, storage: newStorage }
  };
  s = addMessage(s, `${caught.nickname} linked successfully.`);
  if (isBoss) {
    const progress = applyBossProgress(s.player, caught.species);
    s = { ...s, player: progress.player };
    if (s.dungeon) s = { ...s, dungeon: { ...s.dungeon, bossDefeated: true } };
    s = addMessage(s, `Security Daemon re-linked. Dungeon restored.`);
    if (progress.keyPiece) {
      s = addMessage(s, `Recovered key piece ${progress.keyPiece.piece} from ${progress.keyPiece.bossName}.`);
    }
    if (s.player.defeatedBosses.length === TOTAL_BOSSES && !s.player.finalKeyUnlocked) {
      engineDebug("all bosses captured/cleared; entering final key input");
      s = {
        ...s,
        screen: "final_key_input",
        finalKeyInput: "",
        finalKeyError: "",
        showFinalTargetLog: false
      };
    }
  }
  return s;
}
function handleFinalKeyInput(state2, key) {
  if (key === "l" || key === "L") {
    return { ...state2, showFinalTargetLog: !state2.showFinalTargetLog };
  }
  const currentInput = state2.finalKeyInput ?? "";
  if (key === KEY.BACKSPACE || key === KEY.BACKSPACE2) {
    return { ...state2, finalKeyInput: currentInput.slice(0, -1), finalKeyError: "" };
  }
  if (isConfirm(key)) {
    if (currentInput === state2.player.finalSecretKey) {
      const secret = rollSecretLegendary();
      const addToParty = state2.player.party.length < 4;
      const updatedParty = addToParty ? [...state2.player.party, secret] : state2.player.party;
      const updatedStorage = !addToParty ? [...state2.player.storage, secret] : state2.player.storage;
      let next = {
        ...state2,
        screen: "secret_unlock",
        finalKeyInput: "",
        finalKeyError: "",
        showFinalTargetLog: false,
        player: {
          ...state2.player,
          party: updatedParty,
          storage: updatedStorage,
          finalKeyUnlocked: true,
          secretUnlocked: true
        }
      };
      if (!addToParty) {
        next = addMessage(next, "Exploit capacity reached. Sudo -S moved to Exploit Storage.");
      }
      next = addMessage(next, "Final purge authorized. Sudo -S restored from the buried source layer.");
      return next;
    }
    return {
      ...state2,
      finalKeyInput: "",
      finalKeyError: "secret key incorrect! please check target log for details.",
      showFinalTargetLog: true
    };
  }
  if (key.length === 1 && key >= " " && currentInput.length < state2.player.finalSecretKey.length) {
    return {
      ...state2,
      finalKeyInput: currentInput + key.toUpperCase(),
      finalKeyError: ""
    };
  }
  return state2;
}
function handlePartyWipe(state2) {
  const newParty = state2.player.party.map(healFully);
  return {
    ...state2,
    screen: "game_over",
    battle: void 0,
    battleAnimation: void 0,
    dungeon: void 0,
    player: { ...state2.player, party: newParty, position: { x: 19, y: 12 }, currentZone: "central" }
  };
}
function handleMenu(state2, key) {
  if (isTutorialActive(state2)) return handleTutorialMenu(state2, key);
  const opts = getMenuOptions(state2);
  const optsCount = opts.length;
  if (isUp(key)) return { ...state2, menuCursor: (state2.menuCursor - 1 + optsCount) % optsCount };
  if (isDown(key)) return { ...state2, menuCursor: (state2.menuCursor + 1) % optsCount };
  if (isCancel(key)) {
    return { ...state2, screen: state2.menuReturnScreen ?? state2.previousScreen ?? "overworld", menuCursor: 0 };
  }
  if (isConfirm(key)) {
    const prev = state2.menuReturnScreen ?? state2.previousScreen ?? "overworld";
    const selected = opts[state2.menuCursor];
    if (selected === "Resume") return { ...state2, screen: prev, menuCursor: 0 };
    if (selected === "Exploits") return { ...state2, screen: "party_view", menuCursor: 0, previousScreen: "menu", menuReturnScreen: prev };
    if (selected === "Saved Exploits") return { ...state2, screen: "storage_view", menuCursor: 0, previousScreen: "menu", menuReturnScreen: prev };
    if (selected === "Scripts") return openScriptsTerminal({ ...state2, previousScreen: "menu", menuReturnScreen: prev }, "menu");
    if (selected === "Patches") return { ...state2, screen: "inventory", menuCursor: 0, previousScreen: "menu", menuReturnScreen: prev, itemUseContext: "field" };
    if (selected === "Mute BGM" || selected === "Unmute BGM") {
      const nextMuted = !state2.player.bgmMuted;
      return addMessage({
        ...state2,
        player: { ...state2.player, bgmMuted: nextMuted }
      }, `Audio: BGM ${nextMuted ? "Muted" : "Unmuted"}`);
    }
    if (selected === "Save Game") return { ...state2, screen: "save_select", menuCursor: 0, previousScreen: "menu", menuReturnScreen: prev };
    if (selected === "Quit to Title") return { ...state2, screen: "title", menuCursor: 0 };
    if (selected === "Developer Options" && isDevMenuEnabled()) return { ...state2, screen: "developer_options", menuCursor: 0, previousScreen: "menu" };
  }
  return state2;
}
function handleTutorialMenu(state2, key) {
  const opts = getMenuOptions(state2);
  const optsCount = opts.length;
  if (isUp(key)) return { ...state2, menuCursor: (state2.menuCursor - 1 + optsCount) % optsCount };
  if (isDown(key)) return { ...state2, menuCursor: (state2.menuCursor + 1) % optsCount };
  if (isCancel(key)) {
    if (state2.tutorial.step === "open_party") return addMessage(state2, "Tutorial: select Exploits to continue.");
    return {
      ...state2,
      screen: "overworld",
      menuCursor: 0,
      tutorial: state2.tutorial.step === "open_party" ? state2.tutorial : { ...state2.tutorial, step: "open_inventory" }
    };
  }
  if (!isConfirm(key)) return state2;
  const selected = opts[state2.menuCursor];
  if (state2.tutorial.step === "open_party") {
    if (selected !== "Exploits") {
      return addMessage(state2, "Tutorial: choose Exploits first.");
    }
    return {
      ...state2,
      screen: "party_view",
      menuCursor: 0,
      previousScreen: "menu",
      menuReturnScreen: "overworld",
      tutorial: { ...state2.tutorial, step: "close_party" },
      messages: []
    };
  }
  if (selected === "Resume") {
    return { ...state2, screen: "overworld", menuCursor: 0 };
  }
  if (selected === "Exploits") {
    return { ...state2, screen: "party_view", menuCursor: 0, previousScreen: "menu", menuReturnScreen: "overworld" };
  }
  if (selected === "Patches") {
    return { ...state2, screen: "inventory", menuCursor: 0, previousScreen: "menu", inventoryReturnScreen: "overworld", itemUseContext: "field" };
  }
  return state2;
}
function handlePartyView(state2, key) {
  const partySize = state2.player.party.length;
  if (isTutorialActive(state2) && state2.tutorial.step === "close_party") {
    if (isCancel(key) || isConfirm(key)) {
      return {
        ...state2,
        screen: "overworld",
        menuCursor: 0,
        tutorial: { ...state2.tutorial, step: "open_inventory" },
        messages: []
      };
    }
    return state2;
  }
  if (state2.reorderSourceIdx !== void 0) {
    if (isCancel(key) || key === "r" || key === "R") {
      return { ...state2, reorderSourceIdx: void 0 };
    }
    if (isUp(key)) return { ...state2, menuCursor: (state2.menuCursor - 1 + partySize) % partySize };
    if (isDown(key)) return { ...state2, menuCursor: (state2.menuCursor + 1) % partySize };
    if (isConfirm(key)) {
      const sourceIdx = state2.reorderSourceIdx;
      const targetIdx = state2.menuCursor;
      if (sourceIdx === targetIdx) {
        return { ...state2, reorderSourceIdx: void 0 };
      }
      const sourceExploit = state2.player.party[sourceIdx];
      const targetExploit = state2.player.party[targetIdx];
      if (!sourceExploit || !targetExploit) {
        return addMessage({ ...state2, reorderSourceIdx: void 0 }, "Only active exploits can be reordered.");
      }
      const newParty = [...state2.player.party];
      [newParty[sourceIdx], newParty[targetIdx]] = [newParty[targetIdx], newParty[sourceIdx]];
      return addMessage({
        ...state2,
        reorderSourceIdx: void 0,
        player: { ...state2.player, party: newParty }
      }, `${sourceExploit.nickname} and ${targetExploit.nickname} swapped positions in the exploit stack.`);
    }
    return state2;
  }
  if (isCancel(key)) return { ...state2, screen: "menu", menuCursor: getMenuOptionIndex(state2, "Exploits"), previousScreen: state2.menuReturnScreen ?? "overworld", reorderSourceIdx: void 0 };
  if (key === KEY.s || key === KEY.S) {
    const c = state2.player.party[state2.menuCursor];
    if (!c) return addMessage(state2, "No exploit in this slot.");
    if (state2.player.party.filter(Boolean).length <= 1) return addMessage(state2, "You cannot send your final active exploit to Exploit Storage.");
    const newParty = state2.player.party.filter((_, i) => i !== state2.menuCursor);
    const newStorage = [...state2.player.storage, c];
    return addMessage(
      { ...state2, player: { ...state2.player, party: newParty, storage: newStorage }, menuCursor: 0 },
      `${c.nickname} moved to Exploit Storage.`
    );
  }
  if (isUp(key)) return { ...state2, menuCursor: (state2.menuCursor - 1 + partySize) % partySize };
  if (isDown(key)) return { ...state2, menuCursor: (state2.menuCursor + 1) % partySize };
  if (key === "r" || key === "R") {
    const c = state2.player.party[state2.menuCursor];
    if (!c) return addMessage(state2, "No exploit in this slot.");
    if (partySize <= 1) return addMessage(state2, "You need at least two active exploits to reorder the stack.");
    return { ...state2, reorderSourceIdx: state2.menuCursor };
  }
  if (isConfirm(key)) {
    const c = state2.player.party[state2.menuCursor];
    if (c && c.skillPoints > 0) {
      return { ...state2, screen: "stat_upgrade", previousScreen: "party_view", upgradeTargetIdx: state2.menuCursor, reorderSourceIdx: void 0 };
    }
  }
  return state2;
}
function handleStatUpgrade(state2, key) {
  if (isCancel(key)) return { ...state2, screen: "party_view" };
  if (isUp(key) || isDown(key)) return { ...state2, menuCursor: state2.menuCursor === 0 ? 1 : 0 };
  if (isConfirm(key)) {
    const targetIdx = state2.upgradeTargetIdx ?? 0;
    const c = state2.player.party[targetIdx];
    if (!c) return state2;
    const stat = state2.menuCursor === 0 ? "str" : "con";
    const updated = allocateStat(c, stat);
    if (!updated) return addMessage(state2, "No skill points remaining.");
    const newParty = [...state2.player.party];
    newParty[targetIdx] = updated;
    return addMessage({
      ...state2,
      player: { ...state2.player, party: newParty }
    }, `${updated.nickname}'s ${stat.toUpperCase()} increased!`);
  }
  return state2;
}
function handleStorageView(state2, key) {
  const storageSize = state2.player.storage.length;
  if (storageSize === 0) {
    if (isCancel(key) || isConfirm(key)) return { ...state2, screen: "menu", menuCursor: getMenuOptionIndex(state2, "Saved Exploits"), previousScreen: state2.menuReturnScreen ?? "overworld" };
    return state2;
  }
  if (isUp(key)) return { ...state2, menuCursor: Math.max(0, state2.menuCursor - 1) };
  if (isDown(key)) return { ...state2, menuCursor: Math.min(storageSize - 1, state2.menuCursor + 1) };
  if (isCancel(key)) return { ...state2, screen: "menu", menuCursor: getMenuOptionIndex(state2, "Saved Exploits"), previousScreen: state2.menuReturnScreen ?? "overworld" };
  if (isConfirm(key)) {
    const storageCreature = state2.player.storage[state2.menuCursor];
    if (!storageCreature) return state2;
    const party = [...state2.player.party];
    const storage = [...state2.player.storage];
    storage.splice(state2.menuCursor, 1);
    if (party.length < 4) {
      party.push(storageCreature);
      return addMessage(
        { ...state2, player: { ...state2.player, party, storage }, menuCursor: 0 },
        `${storageCreature.nickname} restored to active exploits.`
      );
    } else {
      const removed = party.pop();
      party.push(storageCreature);
      storage.push(removed);
      return addMessage(
        { ...state2, player: { ...state2.player, party, storage }, menuCursor: 0 },
        `${storageCreature.nickname} restored to active exploits. ${removed.nickname} moved to Exploit Storage.`
      );
    }
  }
  return state2;
}
function handleInventory(state2, key) {
  const inventoryItems = Object.keys(ITEMS);
  const count = inventoryItems.length;
  if (isTutorialActive(state2) && state2.tutorial.step === "close_inventory") {
    if (isCancel(key) || isConfirm(key)) {
      return {
        ...state2,
        screen: "overworld",
        inventoryReturnScreen: void 0,
        selectedItemId: void 0,
        itemUseContext: void 0,
        menuCursor: 0,
        tutorial: { ...state2.tutorial, step: "start_battle" },
        messages: []
      };
    }
    if (isUp(key)) return { ...state2, menuCursor: (state2.menuCursor - 1 + count) % count };
    if (isDown(key)) return { ...state2, menuCursor: (state2.menuCursor + 1) % count };
    return state2;
  }
  if (isUp(key)) return { ...state2, menuCursor: (state2.menuCursor - 1 + count) % count };
  if (isDown(key)) return { ...state2, menuCursor: (state2.menuCursor + 1) % count };
  if (isCancel(key)) {
    const returnScreen = state2.inventoryReturnScreen ?? state2.previousScreen ?? state2.menuReturnScreen ?? "overworld";
    return {
      ...state2,
      screen: returnScreen,
      previousScreen: returnScreen === "battle" ? state2.menuReturnScreen ?? "overworld" : state2.previousScreen,
      menuCursor: state2.inventoryReturnScreen === "menu" ? getMenuOptionIndex(state2, "Patches") : 0,
      inventoryReturnScreen: void 0,
      selectedItemId: void 0,
      itemUseContext: void 0
    };
  }
  if (isConfirm(key)) {
    const itemId = inventoryItems[state2.menuCursor];
    const owned = state2.player.items[itemId] ?? 0;
    if (owned <= 0) return addMessage(state2, `No ${ITEMS[itemId].name} instances remain in inventory.`);
    if (state2.itemUseContext === "battle" || state2.previousScreen === "battle") {
      return useBattleItem(state2, itemId);
    }
    return {
      ...state2,
      screen: "item_target",
      previousScreen: "inventory",
      selectedItemId: itemId,
      menuCursor: 0
    };
  }
  return state2;
}
function handleItemTarget(state2, key) {
  const partySize = state2.player.party.length;
  if (isUp(key)) return { ...state2, menuCursor: (state2.menuCursor - 1 + partySize) % partySize };
  if (isDown(key)) return { ...state2, menuCursor: (state2.menuCursor + 1) % partySize };
  if (isCancel(key)) {
    return {
      ...state2,
      screen: "inventory",
      previousScreen: state2.inventoryReturnScreen ?? "overworld",
      menuCursor: 0
    };
  }
  if (isConfirm(key)) {
    const itemId = state2.selectedItemId;
    if (!itemId) return state2;
    return useFieldItem(state2, itemId, state2.menuCursor);
  }
  return state2;
}
function handleShop(state2, key) {
  const shopItems = ["potion", "super_potion", "full_restore"];
  if (isUp(key)) return { ...state2, menuCursor: (state2.menuCursor - 1 + shopItems.length) % shopItems.length };
  if (isDown(key)) return { ...state2, menuCursor: (state2.menuCursor + 1) % shopItems.length };
  if (isCancel(key)) return { ...state2, screen: state2.previousScreen ?? "overworld", menuCursor: 0 };
  if (isConfirm(key)) {
    const itemId = shopItems[state2.menuCursor];
    const item = ITEMS[itemId];
    if (state2.player.gold < item.price) return addMessage(state2, `Insufficient credits. ${item.price}CR required.`);
    const newItems = { ...state2.player.items, [itemId]: (state2.player.items[itemId] ?? 0) + 1 };
    return addMessage({
      ...state2,
      player: { ...state2.player, gold: state2.player.gold - item.price, items: newItems }
    }, `${item.name} provisioned. ${state2.player.gold - item.price}CR remaining.`);
  }
  return state2;
}
function handleSaveSelect(state2, key) {
  const slots = getSaveSlots();
  const opts = slots.length;
  if (isUp(key)) return { ...state2, menuCursor: (state2.menuCursor - 1 + opts) % opts };
  if (isDown(key)) return { ...state2, menuCursor: (state2.menuCursor + 1) % opts };
  if (isCancel(key)) return { ...state2, screen: "menu", menuCursor: getMenuOptionIndex(state2, "Save Game"), previousScreen: state2.menuReturnScreen ?? "overworld" };
  if (isConfirm(key)) {
    const slotNum = state2.menuCursor + 1;
    saveGame(state2, slotNum);
    return addMessage({ ...state2, screen: "menu", menuCursor: getMenuOptionIndex(state2, "Save Game"), saveSlot: slotNum, previousScreen: state2.menuReturnScreen ?? "overworld" }, `Restore point written to slot ${slotNum}.`);
  }
  return state2;
}
function handleGameOver(state2, key) {
  if (isConfirm(key)) {
    return addMessage({
      ...state2,
      screen: "overworld",
      battle: void 0,
      dungeon: void 0
    }, "System integrity restored. Resume the purge.");
  }
  return state2;
}
function handleSecretUnlock(state2, key) {
  if (isConfirm(key)) {
    return { ...state2, screen: state2.dungeon ? "dungeon" : "overworld", secretJustUnlocked: false };
  }
  return state2;
}
function handleTutorialComplete(state2, key) {
  if (!isConfirm(key) && !isCancel(key)) return state2;
  return {
    ...createInitialState(),
    screen: "title",
    splashFrame: void 0,
    menuCursor: 0
  };
}
function handleKey(state2, key) {
  switch (state2.screen) {
    case "splash":
      return handleSplash(state2);
    case "title":
      return handleTitle(state2, key);
    case "new_game_name":
      return handleNewGameName(state2, key);
    case "new_game_password":
      return handleNewGamePassword(state2, key);
    case "story_briefing":
      return handleStoryBriefing(state2, key);
    case "load_game":
      return handleLoadGame(state2, key);
    case "scripts_terminal":
      return handleScriptsTerminal(state2, key);
    case "debug_log":
      return handleDebugLog(state2, key);
    case "final_key_input":
      return handleFinalKeyInput(state2, key);
    case "overworld":
      return handleOverworld(state2, key);
    case "dungeon":
      return handleDungeon(state2, key);
    case "battle":
      return handleBattle(state2, key);
    case "menu":
      return handleMenu(state2, key);
    case "inventory":
      return handleInventory(state2, key);
    case "item_target":
      return handleItemTarget(state2, key);
    case "party_view":
      return handlePartyView(state2, key);
    case "stat_upgrade":
      return handleStatUpgrade(state2, key);
    case "storage_view":
      return handleStorageView(state2, key);
    case "shop":
      return handleShop(state2, key);
    case "save_select":
      return handleSaveSelect(state2, key);
    case "game_over":
      return handleGameOver(state2, key);
    case "secret_unlock":
      return handleSecretUnlock(state2, key);
    case "tutorial_complete":
      return handleTutorialComplete(state2, key);
    case "developer_options":
      return handleDeveloperOptions(state2, key);
    default:
      return state2;
  }
}
function renderState(state2) {
  switch (state2.screen) {
    case "splash":
      renderSplash(state2.splashFrame ?? 0);
      break;
    case "title":
      renderTitle(state2.menuCursor, state2.messages[state2.messages.length - 1] ?? "");
      break;
    case "new_game_name":
      renderNameInput(state2.nameInput ?? "");
      break;
    case "new_game_password":
      renderPasswordInput(state2.passwordInput ?? "");
      break;
    case "story_briefing":
      renderStoryBriefing(state2.loginUser ?? "");
      break;
    case "load_game":
      renderLoadGame(getSaveSlots(), state2.menuCursor);
      break;
    case "scripts_terminal":
      renderScriptsTerminal(state2);
      break;
    case "debug_log":
      renderDebugLog(state2);
      break;
    case "final_key_input":
      renderFinalKeyInput(state2);
      break;
    case "overworld":
      renderOverworld(state2);
      break;
    case "dungeon":
      renderDungeon(state2);
      break;
    case "battle":
      renderBattle(state2);
      break;
    case "menu":
      renderMenu(state2);
      break;
    case "inventory":
      if (isTutorialActive(state2)) renderTutorialInventory(state2);
      else renderInventory(state2.player, state2.menuCursor);
      break;
    case "item_target":
      renderItemTarget(state2.player, state2.menuCursor, state2.selectedItemId);
      break;
    case "party_view":
      renderPartyView(state2);
      break;
    case "stat_upgrade": {
      const targetIdx = state2.upgradeTargetIdx ?? state2.menuCursor;
      const c = state2.player.party[targetIdx];
      if (c) renderStatUpgrade(c, state2.menuCursor);
      break;
    }
    case "storage_view":
      renderStorageView(state2);
      break;
    case "shop":
      renderShop(state2.player, state2.menuCursor);
      break;
    case "save_select":
      renderSaveSelect(getSaveSlots(), state2.menuCursor);
      break;
    case "game_over":
      renderGameOver();
      break;
    case "secret_unlock":
      renderSecretUnlock();
      break;
    case "tutorial_complete":
      renderTutorialComplete();
      break;
    case "developer_options":
      renderDeveloperOptions(state2.player, state2.menuCursor);
      break;
  }
}

// src/index.ts
var state = createInitialState();
var animationTimer;
var runtimeStarted = false;
function commitState(next) {
  if (next === state) return;
  const prevScreen = state.screen;
  const nextScreen = next.screen;
  const prevZone = state.player?.currentZone ?? "none";
  const nextZone = next.player?.currentZone ?? "none";
  const prevPos = state.player?.position ? `(${state.player.position.x},${state.player.position.y})` : "n/a";
  const nextPos = next.player?.position ? `(${next.player.position.x},${next.player.position.y})` : "n/a";
  state = next;
  if (prevScreen !== nextScreen || prevZone !== nextZone || prevPos !== nextPos) {
    engineDebug(`state ${prevScreen} -> ${nextScreen} zone ${prevZone} -> ${nextZone} pos ${prevPos} -> ${nextPos}`);
  }
  renderState(state);
  syncAudioForState(state);
  scheduleAnimationTick();
}
function scheduleAnimationTick() {
  if (animationTimer || !state.battleAnimation && state.screen !== "splash") return;
  animationTimer = setTimeout(() => {
    animationTimer = void 0;
    const next = advanceAnimations(state);
    commitState(next);
    scheduleAnimationTick();
  }, 70);
}
function attachExternalRenderer(onFrame, cols, rows) {
  externalRenderSink = typeof onFrame === "function" ? onFrame : null;
  externalTerminalSize = {
    cols: cols ?? 120,
    rows: rows ?? 40
  };
}
function detachExternalRenderer() {
  externalRenderSink = null;
  externalTerminalSize = null;
}
function setEmbeddedQuitHandler(handler) {
  externalQuitHandler = typeof handler === "function" ? handler : null;
}
function stopRuntime() {
  if (animationTimer) {
    clearTimeout(animationTimer);
    animationTimer = void 0;
  }
  runtimeStarted = false;
  audioManager.shutdown();
}
async function startEmbeddedRuntime({ onFrame, cols = 120, rows = 40 } = {}) {
  attachExternalRenderer(onFrame, cols, rows);
  if (runtimeStarted) {
    renderState(state);
    syncAudioForState(state);
    scheduleAnimationTick();
    return;
  }
  runtimeStarted = true;
  ensureSaveDir();
  await audioManager.prime(["title"]);
  syncAudioForState(state);
  renderState(state);
  scheduleAnimationTick();
}
async function start() {
  ensureSaveDir();
  enterAltScreen();
  hideCursor();
  clearScreen();
  await audioManager.prime(["title"]);
  syncAudioForState(state);
  renderState(state);
  scheduleAnimationTick();
  initInput((key) => {
    commitState(handleKey(state, key));
  });
  process.on("exit", () => {
    audioManager.shutdown();
    showCursor();
    leaveAltScreen();
  });
  process.on("SIGINT", () => {
    if (animationTimer) clearTimeout(animationTimer);
    audioManager.shutdown();
    showCursor();
    leaveAltScreen();
    cleanup();
    process.exit(0);
  });
  process.on("SIGTERM", () => {
    if (animationTimer) clearTimeout(animationTimer);
    audioManager.shutdown();
    showCursor();
    leaveAltScreen();
    cleanup();
    process.exit(0);
  });
  process.on("SIGWINCH", () => {
    renderState(state);
    syncAudioForState(state);
    scheduleAnimationTick();
  });
}
function resizeEmbeddedRuntime(cols, rows) {
  externalTerminalSize = {
    cols: cols ?? externalTerminalSize?.cols ?? 120,
    rows: rows ?? externalTerminalSize?.rows ?? 40
  };
  renderState(state);
}
function sendKeyToRuntime(key) {
  commitState(handleKey(state, key));
}
function getRuntimeState() {
  return state;
}
export {
  KEY,
  getRuntimeState,
  resizeEmbeddedRuntime,
  sendKeyToRuntime,
  setEmbeddedQuitHandler,
  startEmbeddedRuntime,
  stopRuntime,
  detachExternalRenderer
};
