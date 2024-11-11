import { MarketPairResponse } from './MarketPairResponse.ts';
import { MarketSummaryDetailsResponse } from './MarketSummaryResponse.ts';

export type MarketDetails = MarketPairResponse &
	Pick<MarketSummaryDetailsResponse, 'highest_bid' | 'lowest_ask'>;
