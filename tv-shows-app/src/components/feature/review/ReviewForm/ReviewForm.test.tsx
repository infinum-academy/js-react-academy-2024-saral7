import { render, screen } from '@testing-library/react';
import ReviewForm from './ReviewForm';

describe('ReviewFrom', () => {
	it('should render input textarea', () => {
		render(<ReviewForm label="" index={1} addShowReview={() => {}} />);

		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	it('should render input button', () => {
		render(<ReviewForm label="" index={1} addShowReview={() => {}} />);

		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('should render input stars rating', () => {
		render(<ReviewForm label="" index={1} addShowReview={() => {}} />);

		expect(screen.getByTestId('stars-input')).toBeInTheDocument();
	});
});
