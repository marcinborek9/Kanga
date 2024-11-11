import { MarketDetails } from '../types/MarketDetails.ts';
import { calculateSpread } from './calculateSpread.tsx';
import { Order } from '../types/Order.ts';
import { MarketOrderBy } from '../types/MarketOrderBy.ts';

const descendingComparator = (a: MarketDetails, b: MarketDetails, orderBy: MarketOrderBy) => {
  if (orderBy === 'spread') {
    const spreadA = calculateSpread(Number(a.highest_bid), Number(a.lowest_ask));
    const spreadB = calculateSpread(Number(b.highest_bid), Number(b.lowest_ask));

    if (spreadA === null) return 1;
    if (spreadB === null) return -1;

    return spreadB - spreadA;
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const getMarketDetailsSortingComparator = (
	order: Order,
	orderBy: MarketOrderBy,
): ((a: MarketDetails, b: MarketDetails) => number) => {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
};
