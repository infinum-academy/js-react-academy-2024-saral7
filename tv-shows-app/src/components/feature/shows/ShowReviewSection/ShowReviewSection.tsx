'use client'

import { Box, Flex } from "@chakra-ui/react";
import ReviewForm from "../../review/ReviewForm/ReviewForm";
import { Fragment, useEffect, useRef, useState } from "react";
import { IReview, IReviewItem, IReviewList } from "@/typings/review";
import ReviewList from "../../review/ReviewList/ReviewList";
import useSWR from "swr";
import { swrKeys } from "@/fetchers/swrKeys";
import { authFetcher } from "@/fetchers/fetcher";

export interface ShowReviewSectionProps {
   index: number,
   updateAverage: (avg : number) => void;
}

export default function ShowReviewSection({index, updateAverage} : ShowReviewSectionProps) {
   /*const [reviewList, setReviewList] = useState(mockReviewList); 
   
   
   const loadFromLocalStorage =  () => {
      const listString = localStorage.getItem(`reviewList-${index}`);
      if (!listString) {
         setReviewList(mockReviewList);
         return;
      }
      setReviewList(JSON.parse(listString));
      //console.log(reviewList);    // vazno: seteri iz useStatea su asinkroni pa se ovo ne ispisuje tocno
   }
   useEffect(loadFromLocalStorage, []);


   const storeToLocalStorage = () => {
      localStorage.setItem(`reviewList-${index}`, JSON.stringify(reviewList));
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

   useEffect(() => {updateAverage(reviewList.reduce((acc, b) => {return acc + b.rating;}, 0) / reviewList.length); }, [reviewList]);
      
   const addToReviewList = (newReview : IReview) => {
      const newList = [... reviewList, newReview];
      setReviewList(newList);
   }

   const removeFromReviewList = (review : IReview) => {
      const newList = reviewList.filter((x) => {return x !== review});
      setReviewList(newList);
   }*/

   const addToReviewList = (newReview : IReview) => {};
   const removeFromReviewList = (review : IReview) => {}

   const {data, error, isLoading} = useSWR(swrKeys.getReviews(index), authFetcher<IReviewList>);

   if (error) {
      if (error.status !== 401) return <Box color="white">Something went wrong...</Box>;
   }
   if (isLoading || !data) {
      return <Box color="white">Loading...</Box>;
   }
   console.log(data);
   console.log(data.reviews)
   return <Flex direction={'column'} width={'80%'} margin={'auto'}>
      <ReviewForm addShowReview={addToReviewList} index={index}/>
      <ReviewList reviewList={data.reviews} onDelete={removeFromReviewList}/>
   </Flex>
}