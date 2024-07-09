'use client'

import { IReview, IReviewList } from "@/typings/review";
import { Flex } from "@chakra-ui/react";
import ReviewItem from "../ReviewItem/ReviewItem";
import { useEffect } from "react";

export interface IReviewListProps {
   reviewList : Array<IReview>,
   onDelete: (review : IReview) => void,
   updateAverage: (avg : number) => void;
}

export default function ReviewList({reviewList, onDelete, updateAverage} : IReviewListProps) {
   // TODO: ovo prouciti detaljno, nije radilo dok sam pozivala samo updateAverage(...) bez da je wrappan u useEffect, 
   // bio je error Maximum Update Depth Exceeded, vjerojatno zato sto se updatealo u pageu pa se dogodio infinite loop 
   //    jer se opet na render pagea ovo pozivalo itd., pa sam ovako probala i proradilo je,
   // ali voljela bih skuziti malo bolje useEffect
   useEffect(() => {updateAverage(reviewList.reduce((acc, b) => {return acc + b.rating;}, 0) / reviewList.length);}, [reviewList]); 

   return <Flex direction={'column'} gap = {1} marginBottom={1}>
      {reviewList.map(
         (review, index) => {
            return <ReviewItem key={index} review={review} onDelete={onDelete}/>
         }
      )}
   </Flex>
}