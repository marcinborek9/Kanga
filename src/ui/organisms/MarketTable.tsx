import { useState, MouseEvent, useMemo } from 'react';
import {
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material';
import { TableRowWithData } from '../molecules/TableRowWithData.tsx';
import { MarketDetails } from '../../types/MarketDetails.ts';
import { Order } from '../../types/Order.ts';
import { MarketOrderBy } from '../../types/MarketOrderBy.ts';
import { getMarketDetailsSortingComparator } from '../../utils/getMarketDetailsSortingComparator.ts';

import './MarketTable.css';

interface MarketTableProps {
	marketDetails: MarketDetails[];
	onRowClick: (item: MarketDetails) => void;
	isLoading: boolean;
}

export const MarketTable = ({ marketDetails, onRowClick, isLoading }: MarketTableProps) => {
	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<MarketOrderBy>('ticker_id');

	const handleRequestSort = (_event: MouseEvent<unknown>, property: MarketOrderBy) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const sortedRows = useMemo(
		() => [...marketDetails].sort(getMarketDetailsSortingComparator(order, orderBy)),
		[marketDetails, order, orderBy],
	);

	return (
		<TableContainer component={Paper} className="table-container">
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<TableSortLabel
								active={orderBy === 'ticker_id'}
								direction={orderBy === 'ticker_id' ? order : 'asc'}
								onClick={(event) => handleRequestSort(event, 'ticker_id')}
							>
								Market name
							</TableSortLabel>
						</TableCell>
						<TableCell>Highest BID</TableCell>
						<TableCell>Lowest ASK</TableCell>
						<TableCell>
							<TableSortLabel
								active={orderBy === 'spread'}
								direction={orderBy === 'spread' ? order : 'asc'}
								onClick={(event) => handleRequestSort(event, 'spread')}
							>
								Spread
							</TableSortLabel>
						</TableCell>
						<TableCell>RAG</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{!isLoading && (
						sortedRows.map((item) => (
							<TableRowWithData
								key={item.ticker_id}
								onRowClick={() => onRowClick(item)}
								marketDetails={item}
							/>
						))
					)}
				</TableBody>
			</Table>
			{isLoading && (
				<div className="market-table-loader">
					<CircularProgress/>
				</div>
			)}
		</TableContainer>
	);
};
