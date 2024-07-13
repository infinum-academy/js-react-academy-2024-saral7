'use client'

import { useParams } from "next/navigation";
import { Box, Flex } from "@chakra-ui/react";
import ShowDetails from "@/components/feature/shows/ShowDetails/ShowDetails";
import ShowReviewSection from "@/components/feature/shows/ShowReviewSection/ShowReviewSection";
import useSWR from "swr";
import AuthRedirect from "@/components/shared/AuthRedirect/AuthRedirect";
import { swrKeys } from "@/fetchers/swrKeys";
import { authFetcher } from "@/fetchers/fetcher";
import { IShowCardProps } from "@/components/shared/ShowCard/ShowCard";



export default function ShowDetailsSection() {
   const params = useParams();

   let id = params.id as string;

   const {data, error, isLoading} = useSWR(swrKeys.shows(`/${id}`), authFetcher<IShowCardProps>);
   if (error) {
      return <Box color="white">Something went wrong...</Box>
    }
    if (isLoading || !data) {
      return <Box color="white">Loading...</Box>
    }

   const updateAverage = (avg : number) => {
      // TODO
   }

   const show = data.show;

   return (
      <>
         <AuthRedirect to='/login' condition="isLoggedOut" />
         <Flex direction={'column'}>
            <ShowDetails show={show}/>  
            <ShowReviewSection index={id} updateAverage={updateAverage} />
         </Flex>
      </>
      
   );
}