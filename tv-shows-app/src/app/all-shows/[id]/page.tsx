'use client'

import ShowCard from "@/components/shared/ShowCard/ShowCard";
import { mockList } from "../page";
import { IShow, IShowCard } from "@/typings/show";
import { useParams } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import ShowDetails from "@/components/feature/shows/ShowDetails/ShowDetails";
import { useState } from "react";
import ShowReviewSection from "@/components/feature/shows/ShowReviewSection/ShowReviewSection";
import useSWR from "swr";
import { getShow } from "@/fetchers/shows";
import SidebarNavigation from "@/components/shared/SidebarNavigation/SidebarNavigation";



export default function ShowDetailsSection() {
   const params = useParams();

   let id = params.id as string;

   const {data, error, isLoading} = useSWR(`all-shows/${id}`, () => {return getShow(id)});

   if (error) {
      return <div>Something went wrong...</div>
    }
    if (isLoading || !data) {
      return <div>Loading...</div>;
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

   return <Flex width="80vw" direction={'column'}>
      <SidebarNavigation route = {undefined} />
      <ShowDetails show={showDetails}/>  
      <ShowReviewSection index={id} updateAverage={updateAverage} />
   </Flex>
}