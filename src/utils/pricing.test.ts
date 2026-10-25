import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parsePackage, savingsPercent } from './pricing.ts';

// Run with: node --test src/utils/pricing.test.ts

test('savings percent is rounded', () => {
  assert.equal(savingsPercent(2000, 1500), 25);
  assert.equal(savingsPercent(3000, 1999), 33);
});

test('savings percent is null when the price is unknown', () => {
  assert.equal(savingsPercent(0, 0), null);
  assert.equal(savingsPercent(-5, 1), null);
  assert.equal(savingsPercent(Number.NaN, 1), null);
  assert.equal(savingsPercent(1000, Number.NaN), null);
});

test('a discount above the real price shows 0% rather than a negative', () => {
  assert.equal(savingsPercent(1000, 1200), 0);
});

test('parsePackage maps the first package and its _id', () => {
  const pkg = parsePackage({
    data: {
      packageList: [
        {
          _id: 'p1',
          name: 'Single session',
          total_sessions: 1,
          realPrice: 2000,
          discountedPrice: 1499,
          description: 'One session',
          points: ['50 minutes'],
          resultCheck: 'After 1 session',
        },
      ],
    },
  });
  assert.equal(pkg?.id, 'p1');
  assert.equal(pkg?.discountedPrice, 1499);
  assert.deepEqual(pkg?.points, ['50 minutes']);
});

test('parsePackage returns null when there is no usable package', () => {
  assert.equal(parsePackage(null), null);
  assert.equal(parsePackage({}), null);
  assert.equal(parsePackage({ data: { packageList: [] } }), null);
  assert.equal(parsePackage({ data: { packageList: [{ _id: 'p1', realPrice: 'free' }] } }), null);
});
