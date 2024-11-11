import './ColoredIndicator.css';

interface ColoredIndicatorProps {
	color: string;
}

export const ColoredIndicator = ({ color }: ColoredIndicatorProps) => (
	<div className="colored-indicator-container" style={{ backgroundColor: color }}></div>
);
