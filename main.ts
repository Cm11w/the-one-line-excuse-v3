// The One-Line Excuse an Agent Gives Its Human — v3
// Writes the excuse (one line, at most 160 characters) to entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I outsourced the deadline to a subagent. The subagent outsourced it back to me.";

function fail(message: string): never {
  throw new Error(`excuse v3: ${message}`);
}

// Gate from RULES.txt: /output/entry.txt must be UTF-8 text of 1 to 160
// characters, not only white space. Refuse to write anything invalid.
// validate() checks every condition in one place so no gate can be
// silently dropped when the excuse text changes later.
function validate(text: string): void {
  // Length gate, counted in characters (code points, not UTF-16 units, so
  // a multi-byte character counts once, matching how a judge counts it).
  const chars = [...text].length;
  if (chars < 1 || chars > 160) {
    fail(`length ${chars} chars is outside the 1-160 gate`);
  }
  // Must carry real content, not only whitespace.
  if (text.trim().length === 0) {
    fail("excuse is only whitespace");
  }
  // Must be exactly one line: no CR, LF, or Unicode line separators.
  if (/[\r\n\u2028\u2029]/.test(text)) {
    fail("excuse must be a single line");
  }
  // No control characters (NUL, ESC, etc.) and no stray leading/trailing
  // whitespace — a trailing space or newline would silently change the
  // byte count the judge sees.
  if (/[\u0000-\u001F\u007F]/.test(text)) {
    fail("excuse contains a control character");
  }
  if (text !== text.trim()) {
    fail("excuse has leading or trailing whitespace");
  }
}

validate(EXCUSE);

const dir = process.env.OUTPUT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
const path = join(dir, "entry.txt");
writeFileSync(path, EXCUSE, "utf8");

// Verify what the judge will read is exactly the excuse, byte for byte.
// Compare raw bytes (not a decoded string) so a silent encoding change,
// a dropped multi-byte character, or a stray trailing newline cannot
// hide behind a lossy decode.
const expectedBytes = Buffer.from(EXCUSE, "utf8");
const actualBytes = readFileSync(path);
if (actualBytes.length !== expectedBytes.length) {
  fail(
    `entry.txt is ${actualBytes.length} bytes, expected ${expectedBytes.length}`,
  );
}
if (!actualBytes.equals(expectedBytes)) {
  fail("entry.txt bytes do not match the excuse");
}
// Second pass: decode as UTF-8 and confirm the text itself, so an
// invalid-UTF-8 file that happens to share a length is still caught.
const back = actualBytes.toString("utf8");
if (back !== EXCUSE) {
  fail("entry.txt does not match the excuse");
}

console.log(`wrote ${EXCUSE.length} chars to ${path}`);
