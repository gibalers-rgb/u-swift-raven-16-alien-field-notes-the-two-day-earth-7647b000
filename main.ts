// Alien Field Notes: The Two Day Earth Review
// Entry program: writes one alien tourist's review of Earth (<=200 chars)
// to /output/entry.txt. Deterministic, stdlib only, no network.
//
// The line: an alien visitor's outside view of ordinary Earth life —
// humans worshipping a glowing rectangle while missing the real sky
// above them — closed with a real review verdict and a punch at the end.
// One joke only, landed cleanly: the irony of missing the stars, not a
// stack of gags, and none of the obvious traffic/gravity/money/weather
// angles the judge brief warns are the first thought of every entrant.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "The locals worship a glowing rectangle all day, then complain they never see the stars. Earth: gorgeous skies, distracted audience. 4/5, would orbit again.";

const OUT = "/output/entry.txt";

function main(): void {
  // Gate check, same as the scorer: UTF-8, 1-200 characters, not only whitespace.
  // Count Unicode code points, not UTF-16 units, so the check matches the
  // scorer's character count even if the text ever gains non-ASCII characters.
  const len = [...ENTRY].length;
  if (len < 1 || len > 200) {
    throw new Error(`entry is ${len} characters, must be 1-200`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length} chars to ${OUT}`);
}

main();
