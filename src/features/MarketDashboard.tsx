import { ChangeEvent, useEffect, useState } from 'react';

import { MarketTable } from '../ui/organisms/MarketTable.tsx';
import { MarketDetailsModal } from '../ui/organisms/MarketDetailsModal.tsx';
import { SearchInput } from '../ui/molecules/SearchInput.tsx';

import { MarketDetails } from '../types/MarketDetails.ts';
import { MarketDepthDetails } from '../types/MarketDepthDetails.ts';
import { MarketPairResponse } from '../types/MarketPairResponse.ts';
import { MarketSummaryResponse } from '../types/MarketSummaryResponse.ts';
import { MarketDepthPointResponse, MarketDepthResponse } from '../types/MarketDepthResponse.ts';

export const MarketDashboard = () => {
	const [searchValue, setSearchValue] = useState('');
	const [marketData, setMarketData] = useState<MarketDetails[]>([]);
	const [isMarketDetailsModalOpen, setIsMarketDetailsModalOpen] = useState(false);
	const [marketDepthDetails, setMarketDepthDetails] = useState<MarketDepthDetails | null>(null);
	const [isFetchingMarketDetailsData, setIsFetchingMarketDetailsData] = useState(false);
	const [isFetchingMarketData, setIsFetchingMarketData] = useState(false);

	useEffect(() => {
		fetchMarketDetails();
	}, []);

	const fetchMarketDetails = async () => {
		try {
			const [marketPairsResponse, marketSummaryResponse] = await Promise.all([
				fetch('https://public.kanga.exchange/api/market/pairs'),
				fetch('https://public.kanga.exchange/api/market/summary'),
			]);

			if (!marketPairsResponse.ok || !marketSummaryResponse.ok) {
				throw new Error('Failed to fetch data');
			}

			const marketPairsResponseData: MarketPairResponse[] = await marketPairsResponse.json();
			const marketSummaryResponseData: MarketSummaryResponse = await marketSummaryResponse.json();

			const data = marketPairsResponseData.map((pair) => {
				const pairDetails = marketSummaryResponseData.summary.find(
					(summary) => summary.trading_pairs.replace('-', '_') === pair.ticker_id,
				);

				return pairDetails
					? { ...pair, highest_bid: pairDetails.highest_bid, lowest_ask: pairDetails.lowest_ask }
					: { ...pair, highest_bid: '', lowest_ask: '' };
			});

			setMarketData(data);
		} catch (error) {
			console.error('Error:', error);
			setMarketData([]);
		} finally {
			setIsFetchingMarketData(false);
		}
	};

	const handleOnClickRow = (item: MarketDetails) => {
		setIsFetchingMarketDetailsData(true);
		setIsMarketDetailsModalOpen(true);

		const getPrices = (data: MarketDepthPointResponse[]): number[] =>
			data.map((item) => Number(item.price));

		const getSumQuantity = (data: MarketDepthPointResponse[]): number =>
			data.reduce(
				(previousValue, currentValue) => previousValue + Number(currentValue.quantity),
				0,
			);

		fetch(`https://public.kanga.exchange/api/market/depth/${item.ticker_id}`)
			.then((response) => response.json())
			.then((data: MarketDepthResponse) => {
				const bidsPrices = getPrices(data.bids);
				const asksPrices = getPrices(data.asks);

				const bidsSumQuantity = getSumQuantity(data.bids);
				const asksSumQuantity = getSumQuantity(data.asks);

				const lowestBidPrice = Math.min(...bidsPrices);
				const highestBidPrice = Math.max(...bidsPrices);

				const lowestAskPrice = Math.min(...asksPrices);
				const highestAskPrice = Math.max(...asksPrices);

				setMarketDepthDetails({
					marketName: item.ticker_id,
					bidsSumQuantity,
					lowestBidPrice,
					highestBidPrice,
					asksSumQuantity,
					lowestAskPrice,
					highestAskPrice,
				});
			})
			.catch((error) => {
				throw new Error(error);
			})
			.finally(() => {
				setIsFetchingMarketDetailsData(false);
			});
	};

	const handleOnInputSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	return (
		<>
			<SearchInput placeholder="Market name" value={searchValue} onChange={handleOnInputSearch} />
			<MarketTable
				marketDetails={marketData.filter((item) => item.ticker_id.includes(searchValue))}
				onRowClick={handleOnClickRow}
				isLoading={isFetchingMarketData}
			/>
			<MarketDetailsModal
				open={isMarketDetailsModalOpen}
				onClose={() => setIsMarketDetailsModalOpen(false)}
				isLoading={isFetchingMarketDetailsData}
				data={marketDepthDetails}
			/>
		</>
	);
};
