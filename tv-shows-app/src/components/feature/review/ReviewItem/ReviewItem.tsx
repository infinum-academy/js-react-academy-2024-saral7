import { IReview } from "@/typings/review";
import { Avatar, AvatarGroup, Button, Card, Flex, Text } from "@chakra-ui/react";
import ReviewStarsInput from "../ReviewStarsInput/ReviewStarsInput";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { swrKeys } from "@/fetchers/swrKeys";
import { deleteReview } from "@/fetchers/mutators";
import { authFetcher } from "@/fetchers/fetcher";
import { IUser } from "@/typings/user";
import ReviewUpdate from "./components/ReviewUpdate/ReviewUpdate";
import ReviewDeleteButton from "./components/ReviewDeleteButton/ReviewDeleteButton";

export interface IReviewItemProps {
   review: IReview
}

export default function ReviewItem({review} : IReviewItemProps) {
   const {data} = useSWR(swrKeys.me, authFetcher<{user: IUser}>);

   return <Card padding={1} backgroundColor={'lightblue'} color={'white'}>
      <Flex direction={'column'} gap = {1}>
         <Flex justifyContent="space-between">
            <Flex alignItems="center">
               <Avatar height="32px" width="32px" name={review.user?.email} marginRight={1}/>
               <Text fontWeight="bold">{review.user?.email}</Text>
            </Flex>
            {data?.user.email === review.user?.email && <ReviewUpdate updatingReview={review} />}
         </Flex>
         <Text data-testid="text">{review.comment}</Text>
         <ReviewStarsInput label = {`${review.rating} / 5`} value={review.rating} onChange={() => {return;}}></ReviewStarsInput>
         {data?.user.email === review.user?.email && <ReviewDeleteButton review={review}/>}
      </Flex>
   </Card>
}