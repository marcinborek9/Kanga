import { describe, it, expect } from 'vitest';

import { calculateSpread } from './calculateSpread';

describe('calculateSpread', () => {
  it('should return null if highestBid or lowestAsk is NaN', () => {
    expect(calculateSpread(NaN, 100)).toBeNull();
    expect(calculateSpread(100, NaN)).toBeNull();
  });

  it('should return correct spread for valid inputs', () => {
    expect(calculateSpread(95, 105)).toBe(10);
    expect(calculateSpread(50, 100)).toBe(66.67);
    expect(calculateSpread(100, 120)).toBe(18.18);
  });

  it('should return null if either highestBid or lowestAsk is 0', () => {
    expect(calculateSpread(0, 100)).toBeNull();
    expect(calculateSpread(100, 0)).toBeNull();
  });

  it('should handle edge cases with very small or very large numbers', () => {
    expect(calculateSpread(0.0001, 0.0002)).toBe(66.67);
    expect(calculateSpread(1000000, 2000000)).toBe(66.67);
  });

  it('should handle equal highestBid and lowestAsk (zero spread)', () => {
    expect(calculateSpread(100, 100)).toBe(0);
  });

  it('should round to two decimal places', () => {
    expect(calculateSpread(99.99, 100.01)).toBe(0.02);
    expect(calculateSpread(95, 105)).toBe(10);
  });
});
