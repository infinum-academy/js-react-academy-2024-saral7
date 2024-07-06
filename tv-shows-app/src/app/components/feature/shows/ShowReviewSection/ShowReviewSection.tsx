'use client'

import { Flex } from "@chakra-ui/react";
import ReviewForm from "../../review/ReviewForm/ReviewForm";
import { Fragment, useEffect, useRef, useState } from "react";
import { IReview, IReviewItem, IReviewList } from "@/typings/review";
import ReviewList from "../../review/ReviewList/ReviewList";
import { isArrayBufferView } from "util/types";

//let mockReviewList = [] as IReview[];

export default function ShowReviewSection() {

   // pitanje: je li ova komponenta ispravno mjesto za logiku s localStorageom?
   // ima mi nekog smisla da je, obzirom da trebamo odavdje slati stanje reviewList prema ReviewList komponenti, 
   // ali ne znam bi li bilo semanticki bolje da bude u npr. ReviewForm (jedino ne znam kako exportati reviewList onda)

   const [reviewList, setReviewList] = useState([] as IReview[]); // implicitni cast
   
   const loadFromLocalStorage =  () => {
      const listString = localStorage.getItem('reviewList');
      if (!listString) {
         setReviewList([] as IReview[]);
         return;
      }
      setReviewList(JSON.parse(listString));
      //console.log(reviewList);    // vazno: seteri iz useStatea su asinkroni pa se ovo ne ispisuje tocno
   }
   useEffect(loadFromLocalStorage, []);


   const storeToLocalStorage = () => {
      localStorage.setItem('reviewList', JSON.stringify(reviewList));
   }
   const [firstRender, setFirstRender] = useState(true); 
   useEffect(
      () => {        // da se ne storea na prvi render, jer onda pregazi prave vrijednosti i stavi prazno
         if (firstRender) setFirstRender(false);
         else storeToLocalStorage();
      }, 
      [reviewList]   // nek se storea novo na svaku promjenu reviewList
   );

   // VAZNO: prouciti hookove!

   const addToReviewList = () => {
      let reviewInputText = document.getElementById('input-form-text') as HTMLTextAreaElement;
      let reviewInputRating = document.getElementById('input-form-rating') as HTMLInputElement;

      if (!reviewInputRating.value || !reviewInputText.value) return;
      
      const rating = parseInt(reviewInputRating.value)
      if (!(1 <= rating && rating <= 5)) return;

      const newReview : IReview = {
         text: reviewInputText.value,
         rating: rating
      };

      const newList = [... reviewList, newReview] as IReview[];
      
      setReviewList(newList);
   }



   return <Flex direction={'column'} width={'60vw'}>
      <ReviewForm addShowReview={addToReviewList}/>
      <ReviewList reviewList={reviewList} />
   </Flex>
}