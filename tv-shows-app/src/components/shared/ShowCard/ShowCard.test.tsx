/**
 * render image
 * render title
 * render average
 */

import { render, screen } from '@testing-library/react';
import {ShowCard} from './ShowCard';
import { IShowCard } from '@/typings/show';


describe('ShowCard', () => {
   const mockShow : IShowCard= {
      id: '1',
      title: 'Brooklyn',
      description: 'some text',
      average_rating: 3,
      image_url: "https://picsum.photos/400/600?random=2"
   };

   const mockShow2 : IShowCard= {
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

   it('should render image if proper image_url is given', () => {
      render(<ShowCard show={mockShow} />);

      const image = screen.getByRole('img') as HTMLImageElement;
      expect(image.src).toBe(mockShow.image_url);
   });

   it('should render correct rating if number is given', () => {
      render(<ShowCard show={mockShow} />);

      const expectedText = `${mockShow.average_rating} / 5`;

      const rating = screen.getByTestId("rating") as HTMLElement;
      expect(rating.textContent).toBe(expectedText);
   });

   it('should render correct rating message if undefined rating is given', () => {
      render(<ShowCard show={mockShow2} />);

      const rating = screen.getByTestId("rating") as HTMLElement;
      expect(rating.textContent).toBe("No ratings");
   });
});