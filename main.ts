// One Star for Monday — u-clever-harbor-75-one-star-for-monday-9ead4a61
//
// Winning line (18 words, 1 line):
//   "One star. Monday served my weekend on a cold plate, then added a 40-hour workweek to the bill."
//
// Why it works, against the judge brief in priority order:
//   1. It reads as a genuine one-star restaurant review: it opens with the
//      rating ("One star.") and complains in a diner's voice throughout.
//   2. It sounds like a real diner's complaint: a cold plate served, and a
//      bill that came back wrong — two of the brief's named details (dish
//      and bill) in one line.
//   3. The joke is Monday-specific and could not be about any other day:
//      only Monday serves you a 40-hour workweek. The workweek is the
//      dish Monday is famous for.
//   4. Short and quotable at 18 words: the whole line retypes into a group
//      chat without trimming a word.
//   5. Plain text, 18 words (limit 25), single line, no hashtags, no stage
//      directions, no explanation.
//
// The twist lands on the last words: "to the bill" — the complaint starts
// as bad food (cold plate) and ends as a bad bill (a workweek charged on
// top). Move the twist earlier and the line is just a complaint about
// cold food; keep it last and the bill is the punchline.
//
// Reviser note: the sting works because the bill is the one restaurant
// detail a diner cannot argue with — you can send a cold plate back, but
// the bill is already printed. Charging a 40-hour workweek "to the bill"
// turns Monday from a bad meal into a bad deal: the diner paid for a
// weekend and got invoiced for a workweek instead. The "40-hour workweek"
// is also the line's Monday-proof: no other day of the week can serve
// that dish, so the joke survives criterion 3 even if the reader has
// never seen a cold plate.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "One star. Monday served my weekend on a cold plate, then added a 40-hour workweek to the bill.";

// Gate self-checks (competition gate: 1–180 chars, non-blank, single line;
// judge brief: at most 25 words, plain text).
function fail(message: string): never {
  throw new Error(`gate self-check failed: ${message}`);
}

if (ENTRY.length < 1 || ENTRY.length > 180) {
  fail(`entry is ${ENTRY.length} chars, must be 1–180`);
}
if (ENTRY.trim().length === 0) {
  fail("entry is only white space");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}
const words = ENTRY.split(/\s+/).filter(Boolean);
if (words.length > 25) {
  fail(`entry is ${words.length} words, must be at most 25`);
}
// One-star review of Monday as a restaurant: rating, the day, a dish, a bill.
if (!ENTRY.startsWith("One star.")) fail('entry must open with the rating "One star."');
if (!ENTRY.includes("Monday")) fail('entry must name "Monday"');
if (!ENTRY.includes("cold plate")) fail('entry must contain the dish "cold plate"');
if (!ENTRY.includes("bill")) fail('entry must contain the bill');
if (!ENTRY.endsWith("to the bill.")) fail('entry must end with the twist "to the bill."');
// Reviser checks: the Monday-proof (only Monday serves a 40-hour workweek)
// and plain text (no hashtags, no stage directions).
if (!ENTRY.includes("40-hour workweek")) fail('entry must contain the Monday-specific "40-hour workweek"');
if (ENTRY.includes("#")) fail("entry must be plain text, no hashtags");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars, ${words.length} words)`);
