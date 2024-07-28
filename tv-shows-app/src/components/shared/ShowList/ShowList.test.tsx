import { render, screen } from '@testing-library/react';
import { IShowCard } from '@/typings/show';
import ShowList, { IShowList } from './ShowList';
import { ShowCard } from '../ShowCard/ShowCard';
import { mock } from 'node:test';

jest.mock('../ShowCard/ShowCard', () => {
	return {
		ShowCard: jest.fn().mockReturnValue(null),
	};
});

describe('ShowList', () => {
	const mockShows: IShowList = {
		showList: [
			{
				id: '106',
				average_rating: 2,
				description:
					'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
				image_url: 'https://picsum.photos/400/600?random=1',
				no_of_reviews: 4,
				title: 'Stranger Things',
			},
			{
				id: '223',
				average_rating: 5,
				description: 'comment',
				image_url: 'https://picsum.photos/400/600?random=1',
				no_of_reviews: 7,
				title: 'Brooklyn',
			},
		],
	};

	it('should check if all shows are rendered', () => {
		render(<ShowList showList={mockShows.showList} />);

		expect(ShowCard).toHaveBeenCalledTimes(mockShows.showList.length);
	});

	it('should check if mocked ShowCard has been called with appropriate props', () => {
		render(<ShowList showList={mockShows.showList} />);
		mockShows.showList.forEach((show, index) =>
			expect(ShowCard).toHaveBeenNthCalledWith(index + 1, { show: show }, expect.anything())
		); // ovaj drugi {} je ref vrijednost
	});
});
