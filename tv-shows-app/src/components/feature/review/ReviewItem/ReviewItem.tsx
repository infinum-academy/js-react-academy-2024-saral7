import { IReview } from "@/typings/review";
import { Avatar, AvatarGroup, Button, Card, Flex, Text, useStyleConfig } from "@chakra-ui/react";
import ReviewStarsInput from "../ReviewStarsInput/ReviewStarsInput";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { swrKeys } from "@/fetchers/swrKeys";
import { deleteReview } from "@/fetchers/mutators";
import { authFetcher } from "@/fetchers/fetcher";
import { IUser } from "@/typings/user";
import ReviewUpdate from "./components/ReviewUpdate/ReviewUpdate";
import {ReviewDeleteButton} from "./components/ReviewDeleteButton/ReviewDeleteButton";

export interface IReviewItemProps {
   review: IReview
}

export function ReviewItem({review} : IReviewItemProps) {
   const {data} = useSWR(swrKeys.me, authFetcher<{user: IUser}>);

   const style = useStyleConfig('ReviewItem');
   return <Flex __css={style} flexDirection={["column", "row"]} alignItems={["left", "center"]} width={["340px", "870px"]}>
            <Flex direction="row" alignItems="center" marginLeft={[0, 1]} marginRight={2} width={["90%", "300px"]}>
               <Avatar boxSize="40px" name={review.user?.email} marginRight={1}/>
               <Flex direction="column" alignItems="start">
                  <Text fontWeight="bold" fontSize={[4, 3]}>{review.user?.email}</Text>
                  <ReviewStarsInput label = {`${review.rating} / 5`} value={review.rating} onChange={() => {}} />
               </Flex>
            </Flex>
            <Text data-testid="text" fontSize={[4, 3]} flexGrow={1}>{review.comment}</Text>
            {data?.user.email === review.user?.email &&
               <Flex direction={["row", "column"]} height="100%" justifyContent="space-around" alignItems="end" marginRight={1}>
                  <ReviewUpdate updatingReview={review} />
                  <ReviewDeleteButton review={review}/>
               </Flex>
            }
      </Flex>
}