import { IReview, IReviewItem } from "@/typings/review";
import { Button, chakra, Flex, FormControl, Input, NumberInput, Text, Textarea, useMediaQuery } from "@chakra-ui/react";
import ReviewStarsInput from "../ReviewStarsInput/ReviewStarsInput";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import useSWR from "swr";
import { swrKeys } from "@/fetchers/swrKeys";
import { authFetcher } from "@/fetchers/fetcher";

export interface IOnPostFunction {
   addShowReview: (review : IReview) => void;
}

interface IReviewFormInputProps {
   text: string
}

export default function ReviewForm({addShowReview} : IOnPostFunction) { 
   const {data} = useSWR<{user: {email: string}}>(swrKeys.me, authFetcher);
   const {register, handleSubmit, reset} = useForm<IReviewFormInputProps>();
   const [starsClicked, setStarsClicked] = useState(1);

   // pitanje: bi li i broj kliknutih zvjezdica trebao biti dio form inputa, ili je okej ostaviti ovako sa stateom pa rucno?
   const addNewReview = ({text} : IReviewFormInputProps) => {
      if (!data) return;
      const newReview : IReview = {
         text: text,
         rating: starsClicked,
         email: data.user.email
      }
      addShowReview(newReview);
      setStarsClicked(1);
      reset();
   }

   const onStarClick = (index : number) => {
      setStarsClicked(index);
   }


   return (
      <chakra.form onSubmit={handleSubmit(addNewReview)}>
         <FormControl display="flex" flexDirection="column" width="100%" marginTop={2} marginBottom={2}>
            <Text fontWeight="bold" color="white" marginBottom={1}>Reviews</Text>

            <Textarea {...register("text")} backgroundColor="white"placeholder="Add review" width="100%" marginBottom={1} paddingTop={1} />
               
            <Flex alignItems="center" marginBottom={1} data-testid="stars-input"> {/* test nije pronalazio ovaj data-testid kada je on bio u ReviewStarsInput komponenti zapisan */}
               <ReviewStarsInput label = "Rating" value={starsClicked} onChange = {onStarClick} />
            </Flex>

            <Button type="submit" width="30%" borderRadius="10px">Post</Button>
         </FormControl>
      </chakra.form> 
   )
}