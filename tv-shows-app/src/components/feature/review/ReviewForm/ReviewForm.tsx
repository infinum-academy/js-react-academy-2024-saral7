import { IReview, IReviewItem } from "@/typings/review";
import { Button, chakra, Flex, FormControl, FormErrorMessage, Input, NumberInput, Text, Textarea, useMediaQuery } from "@chakra-ui/react";
import ReviewStarsInput from "../ReviewStarsInput/ReviewStarsInput";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { swrKeys } from "@/fetchers/swrKeys";
import { authFetcher } from "@/fetchers/fetcher";
import { waitFor } from "@testing-library/react";
import { IUser } from "@/typings/user";
import useSWRMutation from "swr/mutation";
import { createReview } from "@/fetchers/mutators";

export interface IOnPostFunction {
   label: string,
   index: number,
   addShowReview: (review : IReview) => void;
}

interface IReviewFormInputProps {
   text: string
}

export default function ReviewForm({label, index, addShowReview} : IOnPostFunction) { 
   const {data} = useSWR<{user: IUser}>(swrKeys.me, authFetcher);
   const {register, handleSubmit, reset, formState: {isSubmitting, errors}} = useForm<IReviewFormInputProps>();
   const [starsClicked, setStarsClicked] = useState(1);

   // pitanje: bi li i broj kliknutih zvjezdica trebao biti dio form inputa, ili je okej ostaviti ovako sa stateom pa rucno?
   const addNewReview = async ({text} : IReviewFormInputProps) => {
      if (!data) return;
      const newReview : IReview = {
         show_id: index,
         comment: text,
         rating: starsClicked
      }
      addShowReview(newReview);

      setStarsClicked(1);
      reset();
   }

   const onStarClick = (starIndex : number) => {
      setStarsClicked(starIndex);
   }


   return (
      <chakra.form display="flex" marginTop={2} marginBottom={2} flexDirection="column" width="100%" onSubmit={handleSubmit(addNewReview)}>
         <Text fontWeight="bold" color="white" marginBottom={1}>{label}</Text>

         <FormControl isInvalid={Boolean(errors.text)} isDisabled={isSubmitting}>
            <Textarea {...register("text", {required: 'Please write a comment'})} backgroundColor="white"placeholder="Add review" width="100%" marginBottom={1} paddingTop={1} />
            <FormErrorMessage marginTop={0} marginBottom={1}>{errors.text?.message}</FormErrorMessage>
         </FormControl>

         <Flex alignItems="center" marginBottom={1} data-testid="stars-input"> {/* test nije pronalazio ovaj data-testid kada je on bio u ReviewStarsInput komponenti zapisan */}
            <ReviewStarsInput label = "Rating" value={starsClicked} onChange = {isSubmitting ? () => {} : onStarClick} />
         </Flex>

         <FormControl isDisabled={isSubmitting}>
            <Button isLoading={isSubmitting} type="submit" width="30%" borderRadius="10px">Post</Button>
         </FormControl>
      </chakra.form> 
   )
}