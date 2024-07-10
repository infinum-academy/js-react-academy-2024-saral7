import { IReview, IReviewItem } from "@/typings/review";
import { Button, Flex, Input, NumberInput, Text, Textarea, useMediaQuery } from "@chakra-ui/react";
import ReviewStarsInput from "../ReviewStarsInput/ReviewStarsInput";
import { useState } from "react";

export interface IOnPostFunction {
   addShowReview: (review : IReview) => void;
}

export default function ReviewForm({addShowReview} : IOnPostFunction) { 
   // funkcija koja obraduje post iz forme
   const addNewReview = () => {
      let reviewInputText = document.getElementById('input-form-text') as HTMLTextAreaElement;
      
      if (!reviewInputText.value) return;

      const newReview : IReview = {
         text: reviewInputText.value,
         rating: starsClicked
      };
      addShowReview(newReview); // 

      // cleanup
      reviewInputText.value = "";
      setStarsClicked(1);
   }

   const [starsClicked, setStarsClicked] = useState(1);

   // funkcija koja definira kako izgledaju zvjezdice na klik
   const onStarClick = (index : number) => {
      setStarsClicked(index);
   }

   return <Flex 
            direction={'column'} 
            width={'100%'} 
            marginTop={2}
            marginBottom={2}>

            <Text 
               fontWeight={'bold'} 
               color={'white'} 
               marginBottom={1}>
                  Reviews
            </Text>

            <Textarea 
               id = 'input-form-text'
               backgroundColor={'white'} 
               placeholder="Add review" 
               width='100%'
               marginBottom={1}
               paddingTop={1}
               >
            </Textarea>

            <Flex alignItems={'center'} marginBottom={1}>
               <ReviewStarsInput label = 'Rating' value={starsClicked} onChange = {onStarClick}></ReviewStarsInput>
            </Flex>

            <Button 
               width={'30%'} 
               borderRadius={'10px'}
               onClick={addNewReview}>
                  Post
            </Button>
         </Flex>
}