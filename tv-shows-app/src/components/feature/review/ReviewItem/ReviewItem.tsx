import { IReview } from "@/typings/review";
import { Avatar, AvatarGroup, Button, Card, Flex, Text } from "@chakra-ui/react";
import ReviewStarsInput from "../ReviewStarsInput/ReviewStarsInput";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { swrKeys } from "@/fetchers/swrKeys";
import { deleteReview } from "@/fetchers/mutators";

export interface IReviewItemProps {
   review: IReview,
   onDelete: (review: IReview) => void;
}

export default function ReviewItem({review, onDelete} : IReviewItemProps) {
   const { trigger } = useSWRMutation(swrKeys.reviews(`/${review.id}`), deleteReview, {
      onSuccess: () => {
         mutate(swrKeys.getReviews)
      }
   });

   const removeReview = async () => {
      try {
         await trigger();
      }
      catch(error) {}
   } 

   return <Card padding={1} backgroundColor={'lightblue'} color={'white'}>
      <Flex direction={'column'} gap = {1}>
         <Flex alignItems="center">
            <Avatar height="32px" width="32px" name={review.user?.email} marginRight={1}/>
            <Text fontWeight="bold">{review.user?.email}</Text>
         </Flex>
         <Text data-testid="text">{review.comment}</Text>
         <ReviewStarsInput label = {`${review.rating} / 5`} value={review.rating} onChange={() => {return;}}></ReviewStarsInput>
         {/*<Show above='768px'>     
            <Button width={'30%'} onClick={() => {onDelete(review)}}>Remove</Button>
         </Show>
         <Show below='767px'>     
            <Button width={'40%'} onClick={() => {onDelete(review)}}>Remove</Button>
         </Show>*/} 
         <Button width={'30%'} onClick={() => {removeReview()}}>Remove</Button>
      </Flex>
   </Card>
}