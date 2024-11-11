import '@testing-library/jest-dom';

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { MarketDashboard } from './MarketDashboard.tsx';

import mockPairs from '../mocks/mockPairs.json';
import mockSummary from '../mocks/mockSummary.json';
import mock_10SET_PLN from '../mocks/mock_10SET_PLN.json';

const server = setupServer(
	http.get(`https://public.kanga.exchange/api/market/pairs`, () => {
		return HttpResponse.json(mockPairs);
	}),
	http.get(`https://public.kanga.exchange/api/market/summary`, () => {
		return HttpResponse.json(mockSummary);
	}),
	http.get(`https://public.kanga.exchange/api/market/depth/10SET_PLN`, () => {
		return HttpResponse.json(mock_10SET_PLN);
	}),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Market Dashboard', () => {
	it('Load data and render data in the table correctly', async () => {
		render(<MarketDashboard />);

		await screen.findAllByText('10SET_PLN');
		expect(screen.getByRole('cell', { name: '10SET_PLN' })).toBeInTheDocument();

		await screen.getByTestId('table-cell-price-10SET_PLN');
		expect(screen.getByTestId('table-cell-price-10SET_PLN')).toHaveTextContent('25.64%');
	});

	it('Displays multiple matching elements based on search query', async () => {
		render(<MarketDashboard />);

		const inputElement = screen.getByPlaceholderText('Market name');

		fireEvent.change(inputElement, { target: { value: 'PEPE' } });

		await screen.findAllByText('PEPE_PLN');
		expect(screen.getByRole('cell', { name: 'PEPE_PLN' })).toBeInTheDocument();

		await screen.findAllByText('PEPE_USDT');
		expect(screen.getByRole('cell', { name: 'PEPE_USDT' })).toBeInTheDocument();
	});

	it('Displays modal with specific market name details', async () => {
		render(<MarketDashboard />);

		await screen.findAllByText('10SET_PLN');

		fireEvent.click(screen.getByTestId('table-row-10SET_PLN'));

		await screen.findByRole('presentation');

		expect(screen.getByRole('heading')).toHaveTextContent('10SET_PLN');

		expect(screen.getByText('BID sum quantity:', { exact: false })).toHaveTextContent('66340.82');
		expect(screen.getByText('min BID:', { exact: false })).toHaveTextContent('0.001');
		expect(screen.getByText('max BID:', { exact: false })).toHaveTextContent('0.85');

		expect(screen.getByText('ASK sum quantity:', { exact: false })).toHaveTextContent('16661.93');
		expect(screen.getByText('min ASK:', { exact: false })).toHaveTextContent('1.1');
		expect(screen.getByText('max ASK:', { exact: false })).toHaveTextContent('500');
	});
});
