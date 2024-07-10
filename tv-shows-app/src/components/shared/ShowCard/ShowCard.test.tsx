/**
 * render image
 * render title
 * render average
 */

import { render, screen } from '@testing-library/react';
import ShowCard from './ShowCard';
import { IShow, IShowCard } from '@/typings/show';


describe('ShowCard', () => {
   const mockShow : IShowCard= {
      id: '1',
      title: 'Brooklyn',
      description: 'some text',
      average_rating: undefined
   };

   it('should render title', () => {
      render(<ShowCard show={mockShow} />);

      const title = screen.getByTestId("title");
      expect(title).toBeInTheDocument();
   });

   it('should render image', () => {
      render(<ShowCard show={mockShow} />);

      const image = screen.getByRole('img') as HTMLImageElement;
      expect(image.src).toBeDefined();
   });

   it('should render correct rating', () => {
      render(<ShowCard show={mockShow} />);

      const expectedText = mockShow.average_rating ? `${mockShow.average_rating} / 5` : 'No ratings';

      const rating = screen.getByTestId("rating") as HTMLElement;
      expect(rating.textContent).toBe(expectedText);
   });
});