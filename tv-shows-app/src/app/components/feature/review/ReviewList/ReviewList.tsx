import { IReviewList } from "@/typings/review";
import { Flex } from "@chakra-ui/react";
import ReviewItem from "../ReviewItem/ReviewItem";

export default function ReviewList({reviewList} : IReviewList) {
   return <Flex direction={'column'} gap = '16px' marginBottom={'16px'}>
      {reviewList.map(
         (review, index) => {
            return <ReviewItem key={index} review={review} />
         }
      )}
   </Flex>
}