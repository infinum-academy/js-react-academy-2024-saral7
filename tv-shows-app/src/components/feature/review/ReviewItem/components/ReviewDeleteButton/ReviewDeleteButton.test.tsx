import { IReview } from '@/typings/review';
import { render, screen, waitFor } from '@testing-library/react';
import { deleteReview } from '@/fetchers/mutators';
import { ReviewItem } from '../../ReviewItem';
import { ReviewDeleteButton } from './ReviewDeleteButton';
import { swrKeys } from '@/fetchers/swrKeys';

jest.mock('@/fetchers/mutators', () => {
	return {
		deleteReview: jest.fn().mockResolvedValue(null),
	};
});

describe('ReviewDeleteButton', () => {
	const mockReviewItem: IReview = {
		comment: 'neki tekst',
		rating: 3,
		show_id: 3,
		id: '1020',
	};

	it('should call deleteReview mutator on Remove click', async () => {
		render(<ReviewDeleteButton review={mockReviewItem} />);

		const deleteButton = screen.getByRole('button');
		deleteButton.click();

		await waitFor(() => {
			expect(deleteReview).toHaveBeenCalledWith(swrKeys.reviews(`/${mockReviewItem.id}`), expect.anything());
		});
	});
});
