const assert = require('assert');
const {
  SEASON, PHASES, WEEKS, FINALE, toISODate, getProgramStatus,
} = require('./fall-ball-data.js');

// --- toISODate ---
assert.strictEqual(toISODate(new Date(2026, 7, 10)), '2026-08-10'); // month is 0-indexed: 7 = Aug
assert.strictEqual(toISODate(new Date(2026, 0, 5)), '2026-01-05');

// --- structural invariants ---
assert.strictEqual(WEEKS.length, 8, 'expected 8 weeks');
WEEKS.forEach((w, i) => {
  assert.strictEqual(w.num, i + 1, `week at index ${i} should have num ${i + 1}`);
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(w.rangeStart), `week ${w.num} rangeStart not ISO date`);
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(w.rangeEnd), `week ${w.num} rangeEnd not ISO date`);
  assert.ok(w.phase, `week ${w.num} missing phase`);
  assert.ok(w.title, `week ${w.num} missing title`);
  assert.ok(w.mon, `week ${w.num} missing mon content`);
  assert.ok(w.wed, `week ${w.num} missing wed content`);
});

// --- contiguous coverage, no gaps or overlaps between weeks ---
for (let i = 1; i < WEEKS.length; i++) {
  const prevEnd = new Date(WEEKS[i - 1].rangeEnd + 'T00:00:00');
  const currStart = new Date(WEEKS[i].rangeStart + 'T00:00:00');
  const diffDays = Math.round((currStart - prevEnd) / 86400000);
  assert.strictEqual(diffDays, 1, `gap/overlap between week ${WEEKS[i - 1].num} and week ${WEEKS[i].num}`);
}
assert.strictEqual(WEEKS[0].rangeStart, SEASON.start, 'week 1 should start on season start');

// --- phases cover weeks 1-8 in 4 contiguous pairs ---
assert.deepStrictEqual(PHASES.map((p) => p.weeks), [[1, 2], [3, 4], [5, 6], [7, 8]]);

// --- FINALE ---
assert.strictEqual(FINALE.date, SEASON.end);

// --- getProgramStatus: before / during / after, string or Date input ---
assert.deepStrictEqual(getProgramStatus(WEEKS, SEASON, '2026-08-01'), { state: 'before', weekIndex: null });
assert.deepStrictEqual(getProgramStatus(WEEKS, SEASON, new Date(2026, 7, 1)), { state: 'before', weekIndex: null });
assert.deepStrictEqual(getProgramStatus(WEEKS, SEASON, '2026-08-10'), { state: 'during', weekIndex: 0 });
assert.deepStrictEqual(getProgramStatus(WEEKS, SEASON, '2026-08-16'), { state: 'during', weekIndex: 0 });
assert.deepStrictEqual(getProgramStatus(WEEKS, SEASON, '2026-09-11'), { state: 'during', weekIndex: 4 }, 'Sep 11 falls in week 5 (Sep 7-13, Labor Day week)');
assert.deepStrictEqual(getProgramStatus(WEEKS, SEASON, '2026-09-30'), { state: 'during', weekIndex: 7 });
assert.deepStrictEqual(getProgramStatus(WEEKS, SEASON, '2026-10-02'), { state: 'during', weekIndex: 7 }, 'season.end itself is still "during"');
assert.deepStrictEqual(getProgramStatus(WEEKS, SEASON, '2026-10-10'), { state: 'after', weekIndex: null });

console.log('All fall-ball-data tests passed.');
