import { TableCell, TableRow, TableRowProps } from '@mui/material';
import { getSpreadInfo } from '../../utils/getSpreadInfo.tsx';
import { ColoredIndicator } from '../atoms/ColoredIndicator.tsx';
import { getSpreadRAGStatus } from '../../utils/getSpreadRAGStatus.tsx';
import { MarketDetails } from '../../types/MarketDetails.ts';

import './TableRowWithData.css';

interface TableRowWithDataProps {
	marketDetails: MarketDetails;
	onRowClick: TableRowProps['onClick'];
}

export const TableRowWithData = ({ marketDetails, onRowClick }: TableRowWithDataProps) => (
	<TableRow onClick={onRowClick} className="table-row-container" data-testid={`table-row-${marketDetails.ticker_id}`}>
		<TableCell>{marketDetails.ticker_id}</TableCell>
		<TableCell>{marketDetails.highest_bid ? marketDetails.highest_bid : '-'}</TableCell>
		<TableCell>{marketDetails.lowest_ask ? marketDetails.lowest_ask : '-'}</TableCell>
		<TableCell data-testid={`table-cell-price-${marketDetails.ticker_id}`}>
			{getSpreadInfo(Number(marketDetails.highest_bid), Number(marketDetails.lowest_ask))}
		</TableCell>
		<TableCell>
			<ColoredIndicator
				color={getSpreadRAGStatus(
					Number(marketDetails.highest_bid),
					Number(marketDetails.lowest_ask),
				)}
			/>
		</TableCell>
	</TableRow>
);
