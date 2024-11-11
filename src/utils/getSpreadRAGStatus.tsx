import { calculateSpread } from './calculateSpread.tsx';

export const getSpreadRAGStatus = (highestBid: number, lowestAsk: number) => {
	const calculatedSpread = calculateSpread(highestBid, lowestAsk);

	if (calculatedSpread === null) {
		return '#FF0000';
	} else if (calculatedSpread <= 2) {
		return '#00FF00';
	} else {
		return '#FFBF00';
	}
};
