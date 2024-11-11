import { CircularProgress, Modal, ModalProps, Typography } from '@mui/material';
import { MarketDepthDetails } from '../../types/MarketDepthDetails.ts';

import './MarketDetailsModal.css';

interface MarketDetailsModalProps {
	open: ModalProps['open'];
	onClose: ModalProps['onClose'];
	isLoading?: boolean;
	data: MarketDepthDetails | null;
}

export const MarketDetailsModal = ({ open, onClose, isLoading, data }: MarketDetailsModalProps) => (
	<Modal open={open} onClose={onClose}>
		<div className="modal-container">
			{isLoading ? (
				<div className="loader-container">
					<CircularProgress />
				</div>
			) : (
				data && (
					<div className="content-container">
						<Typography variant="h3">
							<span className="text-bold">{data.marketName}</span>
						</Typography>
						<Typography>
							BID sum quantity: <span className="text-bold">{Math.round(data.bidsSumQuantity * 100) / 100}</span>
						</Typography>
						<Typography>
							min BID: <span className="text-bold">{data.lowestBidPrice}</span>
						</Typography>
						<Typography>
							max BID: <span className="text-bold">{data.highestBidPrice}</span>
						</Typography>
						<Typography>
							ASK sum quantity: <span className="text-bold">{Math.round(data.asksSumQuantity * 100) / 100}</span>
						</Typography>
						<Typography>
							min ASK: <span className="text-bold">{data.lowestAskPrice}</span>
						</Typography>
						<Typography>
							max ASK: <span className="text-bold">{data.highestAskPrice}</span>
						</Typography>
					</div>
				)
			)}
		</div>
	</Modal>
);
