#!/usr/bin/env node
/**
 * Toggle a lesson's exercise spec on/off.
 *
 *   node scripts/exercises.mjs off [filter]   # disable → suite goes GREEN (baseline)
 *   node scripts/exercises.mjs on  [filter]   # enable  → RED drivers for the exercises
 *   node scripts/exercises.mjs status         # list which lessons are on/off
 *
 * "off" renames  NN-topic/exercises.spec.ts  ->  exercises.spec.ts.off
 * A `.off` file is inert: Jest doesn't match it, tsc doesn't compile it, the editor ignores
 * it. "on" renames it back. `filter` is a substring of the lesson folder (e.g. 08, signals).
 *
 * Typical loop: `node scripts/exercises.mjs off` to green everything, then
 * `node scripts/exercises.mjs on 08` when you start lesson 08.
 */
import { readdirSync, renameSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ACTIVE = 'exercises.spec.ts';
const DISABLED = 'exercises.spec.ts.off';
const appDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'app');

const [, , rawCmd, filter = ''] = process.argv;
const cmd = (rawCmd ?? '').toLowerCase();

if (!['on', 'off', 'status'].includes(cmd)) {
  console.error('Usage: node scripts/exercises.mjs <on|off|status> [lesson-filter]');
  process.exit(1);
}

/** Lesson folders matching the (optional) filter substring. */
const lessons = readdirSync(appDir)
  .filter((name) => /^\d\d-/.test(name))
  .filter((name) => name.includes(filter))
  .sort();

let changed = 0;
for (const lesson of lessons) {
  const dir = join(appDir, lesson);
  const active = join(dir, ACTIVE);
  const disabled = join(dir, DISABLED);
  const has = (p) => {
    try {
      return statSync(p).isFile();
    } catch {
      return false;
    }
  };

  if (cmd === 'status') {
    if (has(active)) console.log(`on   ${lesson}`);
    else if (has(disabled)) console.log(`off  ${lesson}`);
    continue;
  }

  if (cmd === 'on' && has(disabled)) {
    renameSync(disabled, active);
    console.log(`on   ${lesson}`);
    changed++;
  } else if (cmd === 'off' && has(active)) {
    renameSync(active, disabled);
    console.log(`off  ${lesson}`);
    changed++;
  }
}

if (cmd !== 'status') {
  console.log(`\n${changed} lesson(s) turned ${cmd}.`);
  if (changed === 0) console.log('Nothing to change (already in that state, or filter matched nothing).');
}
