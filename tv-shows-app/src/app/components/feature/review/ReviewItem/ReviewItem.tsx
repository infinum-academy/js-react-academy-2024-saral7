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
   const value : IStar[] = [];
   for (let i = 0; i < 5; i++) value.push({selected: i < review.rating});

   return <Card padding={1} backgroundColor={'lightblue'} color={'white'}>
      <Flex direction={'column'} gap = {1}>
         <Text> {review.text} </Text>
         <Text> {`${review.rating} / 5`} </Text>
         <ReviewStarsInput value={value} onChange={() => {return;}}></ReviewStarsInput>
         <Show above='768px'>     
            <Button width={'30%'} onClick={() => {onDelete(review)}}>Remove</Button>
         </Show>
         <Show below='767px'>     
            <Button width={'40%'} onClick={() => {onDelete(review)}}>Remove</Button>
         </Show>
      </Flex>
   </Card>
}