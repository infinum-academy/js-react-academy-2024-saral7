import { IReview } from "@/typings/review";
import {ReviewItem} from "./ReviewItem";
import { render, screen } from "@testing-library/react";
import { ReviewDeleteButton } from "./components/ReviewDeleteButton/ReviewDeleteButton";

jest.mock("./components/ReviewDeleteButton/ReviewDeleteButton", () => {
   return {
      ReviewDeleteButton: jest.fn().mockReturnValue(null)
   }
})

describe('ReviewItem', () => {
   const mockReviewItem : IReview = {
      comment: "neki tekst",
      rating: 3,
      show_id: 3
   }

   // kako testirati npr. da se renderirao deleteButton ako je review od trenutnog korisnika

   // TODO: ne radi kada ovo nije prvi test, a jest.mock() funcionira jedino izvan describea
   it('should render a delete button', () => {
      render(<ReviewItem review={mockReviewItem} />);

      expect(ReviewDeleteButton).toHaveBeenCalledWith({review: mockReviewItem}, expect.anything());
   })

   it('should render correct review comment', () => {
      render(<ReviewItem review={mockReviewItem}/>);

      const description = screen.getByTestId("text") as HTMLElement;
      expect(description.textContent).toBe(mockReviewItem.comment);
   })

});