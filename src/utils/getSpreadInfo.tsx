import { calculateSpread } from './calculateSpread.tsx';

export const getSpreadInfo = (highestBid: number, lowestAsk: number) => {
	const calculatedSpread = calculateSpread(highestBid, lowestAsk);

	if (calculatedSpread === null) {
		return '-';
	}

	return `${calculatedSpread}%`;
};
