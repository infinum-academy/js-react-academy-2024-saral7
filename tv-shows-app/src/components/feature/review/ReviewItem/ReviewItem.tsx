import { IReview, IReviewItem } from "@/typings/review";
import { Button, Card, CardBody, Flex, Show, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import ReviewStarsInput from "../ReviewStarsInput/ReviewStarsInput";
import { IStar } from "@/app/components/shared/Icons/StarIcon/StarIcon";

export interface IReviewItemProps {
   review: IReview,
   onDelete: (review: IReview) => void;
}

export default function ReviewItem({review, onDelete} : IReviewItemProps) {
   return <Card padding={1} backgroundColor={'lightblue'} color={'white'}>
      <Flex direction={'column'} gap = {1}>
         <Text> {review.text} </Text>
         <ReviewStarsInput label = {`${review.rating} / 5`} value={review.rating} onChange={() => {return;}}></ReviewStarsInput>
         <Show above='768px'>     
            <Button width={'30%'} onClick={() => {onDelete(review)}}>Remove</Button>
         </Show>
         <Show below='767px'>     
            <Button width={'40%'} onClick={() => {onDelete(review)}}>Remove</Button>
         </Show>
      </Flex>
   </Card>
}