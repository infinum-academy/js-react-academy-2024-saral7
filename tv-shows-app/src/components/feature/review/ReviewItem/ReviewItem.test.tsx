import { IReview } from "@/typings/review";
import ReviewItem from "./ReviewItem";
import { render, screen } from "@testing-library/react";

describe('ReviewItem', () => {
   const mockReviewItem : IReview = {
      text: "neki tekst",
      rating: 3
   }
   it('should render correct review comment', () => {
      render(<ReviewItem review={mockReviewItem} onDelete={()=>{}}/>);

      const description = screen.getByTestId("text") as HTMLElement;
      expect(description.textContent).toBe(mockReviewItem.text);
   })

   it('should render a delete button', () => {
      render(<ReviewItem review={mockReviewItem} onDelete={()=>{}}/>);

      const deleteButton = screen.getByRole("button");
      expect(deleteButton).toBeInTheDocument();
   })

   it('should see if onDelete callback has been called only once', () => {
      const mockOnDelete = jest.fn();
      render(<ReviewItem review={mockReviewItem} onDelete={mockOnDelete}/>);

      const deleteButton = screen.getByRole("button");
      deleteButton.click();
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
   })
});