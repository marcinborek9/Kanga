export interface MarketDepthPointResponse {
	quantity: string;
	price: string;
}

export interface MarketDepthResponse {
	timestamp: string;
	bids: MarketDepthPointResponse[];
	asks: MarketDepthPointResponse[];
}
