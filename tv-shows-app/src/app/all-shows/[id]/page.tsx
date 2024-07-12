'use client'

import ShowCard from "@/components/shared/ShowCard/ShowCard";
import { mockList } from "../page";
import { IShow, IShowCard } from "@/typings/show";
import { useParams } from "next/navigation";
import { Box, Flex } from "@chakra-ui/react";
import ShowDetails from "@/components/feature/shows/ShowDetails/ShowDetails";
import { useState } from "react";
import ShowReviewSection from "@/components/feature/shows/ShowReviewSection/ShowReviewSection";
import useSWR from "swr";
import { getShow } from "@/fetchers/shows";
import SidebarNavigation from "@/components/shared/SidebarNavigation/SidebarNavigation";
import AuthRedirect from "@/components/shared/AuthRedirect/AuthRedirect";



export default function ShowDetailsSection() {
   const params = useParams();

   let id = params.id as string;

   const {data, error, isLoading} = useSWR(`all-shows/${id}`, () => {return getShow(id)});

   if (error) {
      return <Box color="white">Something went wrong...</Box>
    }
    if (isLoading || !data) {
      return <Box color="white">Loading...</Box>
    }

   let show = data;
   //const [show, setShow] = useState(showData);

   const updateAverage = (avg : number) => {
      const newShow : IShowCard = {
         id: show.title,
         title: show.title,
         description: show.description,
         image_url: show.image_url,
         average_rating: parseFloat((avg).toFixed(1)) 
      }
      //setShow(newShow);
   }

   // ShowDetails prima objekt tipa IShow
   const showDetails : IShow = {
      title: show.title,
      description: show.description,
      averageRating: show.average_rating,
      imageUrl: show.image_url
   }

   return (
      <>
         <AuthRedirect to='/login' condition="isLoggedOut" />
         <Flex direction={'column'}>
            <ShowDetails show={showDetails}/>  
            <ShowReviewSection index={id} updateAverage={updateAverage} />
         </Flex>
      </>
      
   );
}