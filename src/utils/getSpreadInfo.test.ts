import { describe, it, expect } from 'vitest';

import { getSpreadInfo } from './getSpreadInfo';

describe('getSpreadInfo', () => {
  it('should return "-" if highestBid or lowestAsk is NaN', () => {
    expect(getSpreadInfo(NaN, 100)).toBe('-');
    expect(getSpreadInfo(100, NaN)).toBe('-');
  });

  it('should return "-" if either highestBid or lowestAsk is 0', () => {
    expect(getSpreadInfo(0, 100)).toBe('-');
    expect(getSpreadInfo(100, 0)).toBe('-');
  });

  it('should return formatted spread percentage for valid inputs', () => {
    expect(getSpreadInfo(95, 105)).toBe('10%');
    expect(getSpreadInfo(50, 100)).toBe('66.67%');
    expect(getSpreadInfo(100, 120)).toBe('18.18%');
  });

  it('should return "0%" for equal highestBid and lowestAsk', () => {
    expect(getSpreadInfo(100, 100)).toBe('0%');
  });

  it('should handle edge cases with very small or very large numbers', () => {
    expect(getSpreadInfo(0.0001, 0.0002)).toBe('66.67%');
    expect(getSpreadInfo(1000000, 2000000)).toBe('66.67%');
  });

  it('should round to two decimal places', () => {
    expect(getSpreadInfo(99.99, 100.01)).toBe('0.02%');
    expect(getSpreadInfo(95, 105)).toBe('10%');
  });
});
