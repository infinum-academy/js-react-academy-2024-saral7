import { render, screen } from "@testing-library/react";
import ReviewForm from "./ReviewForm";

describe('ReviewFrom', () => {
   it('should render input textarea', () => {
      render(<ReviewForm addShowReview={() => {}} />);

      const inputTextArea = screen.getByRole('textbox');
      expect(inputTextArea).toBeInTheDocument();
   });

   it('should render input button', () => {
      render(<ReviewForm addShowReview={() => {}} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
   });

   it('should render input stars rating', () => {
      render(<ReviewForm addShowReview={() => {}} />);

      const ratingStars = screen.getByTestId('stars-input');
      //console.log(ratingStars);
      expect(ratingStars).toBeInTheDocument();
   });
})
