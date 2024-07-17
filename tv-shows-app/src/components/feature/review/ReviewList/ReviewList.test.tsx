import { IReview } from "@/typings/review";
import {ReviewItem} from "../ReviewItem/ReviewItem";
import ReviewList from "./ReviewList";
import { render } from "@testing-library/react";
import { mock } from "node:test";

jest.mock("../ReviewItem/ReviewItem", () => {
   return {
      ReviewItem: jest.fn().mockReturnValue(null)
   }
});

describe('ReviewList', () => {
   const mockList : IReview[] = [
      {
         comment: "some comment",
         rating: 2,
         show_id: 1
      },
      {
         comment: "other comment",
         rating: 5,
         show_id: 1021
      }
   ]

   it('should check if all ReviewItems are rendered', () => {
      render(<ReviewList reviewList={mockList}/>);

      expect(ReviewItem).toHaveBeenCalledTimes(mockList.length);
   });

   it('should check if ReviewItem was called with appropriate props', () => {
      render(<ReviewList reviewList={mockList}/>);

      mockList.forEach((review, index) => expect(ReviewItem).toHaveBeenNthCalledWith(index+1, {review: review}, expect.anything()));
   });
})
