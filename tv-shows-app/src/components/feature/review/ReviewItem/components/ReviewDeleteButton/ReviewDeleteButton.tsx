import { deleteReview } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import { IReview } from "@/typings/review";
import { Button } from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";

interface IReviewDeleteButtonProps {
   review : IReview
}

export function ReviewDeleteButton({review} : IReviewDeleteButtonProps) {
   const { trigger } = useSWRMutation(swrKeys.reviews(`/${review.id}`), deleteReview, {
      onSuccess: () => {
         mutate(swrKeys.getReviews(review.show_id))
      }
   });

   const removeReview = async () => {
      try {
         await trigger();
      }
      catch(error) {}
   }

   return <>
      <Button width={'30%'} onClick={() => {removeReview()}}>Remove</Button>
   </>
}