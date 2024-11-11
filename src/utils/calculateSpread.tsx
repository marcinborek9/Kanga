export const calculateSpread = (highestBid: number, lowestAsk: number): number | null => {
	if (!highestBid || !lowestAsk || isNaN(highestBid) || isNaN(lowestAsk)) {
		return null;
	}

	const difference = lowestAsk - highestBid;
	const midpointPrice = 0.5 * (lowestAsk + highestBid);
	const percentageDifference = (difference / midpointPrice) * 100;

	return Math.round(percentageDifference * 100) / 100;
};
