'use client'

import { Flex } from "@chakra-ui/react";
import ReviewForm from "../../review/ReviewForm/ReviewForm";
import { Fragment, useEffect, useRef, useState } from "react";
import { IReview, IReviewItem, IReviewList } from "@/typings/review";
import ReviewList from "../../review/ReviewList/ReviewList";

let mockReviewList = [] as IReview[]; // implicitni cast

export interface ShowReviewSectionProps {
   index: string,
   updateAverage: (avg : number) => void;
}

export default function ShowReviewSection({index, updateAverage} : ShowReviewSectionProps) {

   // pitanje: je li ova komponenta ispravno mjesto za logiku s localStorageom?
   // ima mi nekog smisla da je, obzirom da trebamo odavdje slati stanje reviewList prema ReviewList komponenti, 
   // ali ne znam bi li bilo semanticki bolje da bude u npr. ReviewForm (jedino ne znam kako exportati reviewList onda)
   // update: sve vise mi se cini da je ovdje okej jer se podaci komponentama salju preko zajednickog parenta
   
   const [reviewList, setReviewList] = useState(mockReviewList); 
   

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
   }

   return <Flex direction={'column'} width={'80%'} margin={'auto'}>
      <ReviewForm addShowReview={addToReviewList}/>
      <ReviewList reviewList={reviewList} onDelete={removeFromReviewList}/>
   </Flex>
}