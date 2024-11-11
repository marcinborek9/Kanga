import { ChangeEvent } from 'react';

import { Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
	value: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
	placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder = 'Search' }: SearchInputProps) => {
	return (
		<Input
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			startAdornment={
				<InputAdornment position="start">
					<SearchIcon />
				</InputAdornment>
			}
		/>
	);
};
