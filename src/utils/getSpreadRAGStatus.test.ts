import { describe, it, expect } from 'vitest';

import { getSpreadRAGStatus } from './getSpreadRAGStatus.tsx';

describe('getSpreadInfo', () => {
	it('should return red "#FF0000" color if calculatedSpread is null', () => {
		expect(getSpreadRAGStatus(NaN, NaN)).toBe('#FF0000');
		expect(getSpreadRAGStatus(NaN, 100)).toBe('#FF0000');
		expect(getSpreadRAGStatus(100, NaN)).toBe('#FF0000');
	});

	it('should return green "#00FF00" color if calculatedSpread is equal or lower than 2', () => {
		expect(getSpreadRAGStatus(0.5, 0.48)).toBe('#00FF00');
		expect(getSpreadRAGStatus(5.25, 5.28)).toBe('#00FF00');
		expect(getSpreadRAGStatus(0.000018, 0.0000182)).toBe('#00FF00');
	});

	it('should return amber "#FFBF00" color if calculatedSpread is bigger than 2', () => {
		expect(getSpreadRAGStatus(0.5, 1)).toBe('#FFBF00');
		expect(getSpreadRAGStatus(5, 20)).toBe('#FFBF00');
		expect(getSpreadRAGStatus(20, 200)).toBe('#FFBF00');
		expect(getSpreadRAGStatus(0.0907, 0.09334)).toBe('#FFBF00');
	});
});
