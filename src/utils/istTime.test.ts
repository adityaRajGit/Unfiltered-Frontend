import { test } from 'node:test';
import assert from 'node:assert/strict';
import { istSlotToUtcIso, istSlotToIstWallClock, istDateHourKey } from './istTime.ts';

// Run with: node --test src/utils/istTime.test.ts  (try TZ=America/Toronto too)
// Calendar cells are built as local-midnight Dates: new Date(year, monthIndex, day).
const SEP_10 = new Date(2026, 8, 10);

test('20:00 IST slot on 10 Sep is 14:30Z in every browser timezone', () => {
  assert.equal(istSlotToUtcIso(SEP_10, '20:00'), '2026-09-10T14:30:00.000Z');
});

test('early-morning IST slot falls on the previous UTC day', () => {
  assert.equal(istSlotToUtcIso(SEP_10, '03:00'), '2026-09-09T21:30:00.000Z');
});

test('wall-clock string for the recommend API has no offset', () => {
  assert.equal(istSlotToIstWallClock(SEP_10, '20:00'), '2026-09-10T20:00:00');
});

test('IST key round-trips with the booked instant', () => {
  assert.equal(istDateHourKey(new Date(istSlotToUtcIso(SEP_10, '20:00'))), '2026-09-10-20');
});

test('IST key of an invalid date is empty', () => {
  assert.equal(istDateHourKey(new Date('garbage')), '');
});

test('malformed slots throw', () => {
  assert.throws(() => istSlotToUtcIso(SEP_10, '25:00'));
  assert.throws(() => istSlotToUtcIso(SEP_10, 'abc'));
});
