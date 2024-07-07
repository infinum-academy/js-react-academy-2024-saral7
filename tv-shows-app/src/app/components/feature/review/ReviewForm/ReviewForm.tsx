import { IReview, IReviewItem } from "@/typings/review";
import { Button, Flex, Input, NumberInput, Text, Textarea, useMediaQuery } from "@chakra-ui/react";
import ReviewStarsInput from "../ReviewStarsInput/ReviewStarsInput";
import { useState } from "react";
import { IStar } from "@/app/components/shared/Icons/StarIcon/StarIcon";

export interface IOnPostFunction {
   addShowReview: (review : IReview) => void;
}

export default function ReviewForm({addShowReview} : IOnPostFunction) { 
   // funkcija koja obraduje post iz forme
   const addNewReview = () => {
      let reviewInputText = document.getElementById('input-form-text') as HTMLTextAreaElement;
      
      if (!reviewInputText.value) return;
      
      const rating = stars.filter((s) => {return s.selected == true;}).length;

      const newReview : IReview = {
         text: reviewInputText.value,
         rating: rating
      };
      addShowReview(newReview); // 

      // cleanup
      reviewInputText.value = "";
      const newStarList : IStar[] = [];
      for (let i = 0; i < 5; i++) newStarList.push({selected: i == 0});
      setStars(newStarList);
   }

   const mockStars : IStar[] = [];
   for (let i = 0; i < 5; i++) mockStars.push({selected: i == 0});

   const [stars, setStars] = useState(mockStars);

   // funkcija koja definira kako izgledaju zvjezdice na klik
   const onStarClick = (star : IStar) => {
      const newStarList : IStar[] = [];
      let found = true;
      let counter = 0;
      for (let s of stars) {
         if (found) counter++;
         newStarList.push({selected: found}); // postavi selected svim zvjezdicama do kliknute
         if (s === star) found = false;
      }
      setStars(newStarList);
   }

   return <Flex 
            direction={'column'} 
            width={'100%'} 
            marginTop={'32px'}
            marginBottom={'32px'}>

            <Text 
               fontWeight={'bold'} 
               color={'white'} 
               marginBottom={'16px'}>
                  Reviews
            </Text>

            <Textarea 
               id = 'input-form-text'
               backgroundColor={'white'} 
               placeholder="Add review" 
               width='100%'
               marginBottom={'16px'}>
            </Textarea>

            <ReviewStarsInput value={stars} onChange = {onStarClick}></ReviewStarsInput>

            <Button 
               width={'30%'} 
               borderRadius={'10px'}
               onClick={addNewReview}>
                  Post
            </Button>
         </Flex>
}