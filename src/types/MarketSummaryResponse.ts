export interface MarketSummaryDetailsResponse {
	trading_pairs: string;
	lowest_price_24h: string;
	highest_price_24h: string;
	highest_bid: string;
	lowest_ask: string;
	base_volume: string;
	quote_volume: string;
	last_price: string;
	price_change_percent_24h: string;
}

export interface MarketSummaryResponse {
	timestamp: string;
	summary: MarketSummaryDetailsResponse[];
}
