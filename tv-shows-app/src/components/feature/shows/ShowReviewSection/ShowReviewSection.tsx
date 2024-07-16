'use client'

import { Box, Flex } from "@chakra-ui/react";
import ReviewForm from "../../review/ReviewForm/ReviewForm";
import { Fragment, useEffect, useRef, useState } from "react";
import { IReview, IReviewItem, IReviewList } from "@/typings/review";
import ReviewList from "../../review/ReviewList/ReviewList";
import useSWR from "swr";
import { swrKeys } from "@/fetchers/swrKeys";
import { authFetcher } from "@/fetchers/fetcher";
import useSWRMutation from "swr/mutation";
import { createReview } from "@/fetchers/mutators";

export interface ShowReviewSectionProps {
   index: number,
   updateAverage: (avg : number) => void;
}

export default function ShowReviewSection({index, updateAverage} : ShowReviewSectionProps) {
   
   const {trigger} = useSWRMutation(swrKeys.reviews(''), createReview);
   
   const addToReviewList = async (newReview : IReview) => {
      await trigger(newReview);
   };
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