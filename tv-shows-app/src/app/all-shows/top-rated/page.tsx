'use client'

import AuthRedirect from "@/components/shared/AuthRedirect/AuthRedirect";
import ShowList from "@/components/shared/ShowList/ShowList";
import SidebarNavigation from "@/components/shared/SidebarNavigation/SidebarNavigation";
import { authFetcher } from "@/fetchers/fetcher";
import { getTopShows, IAllShows } from "@/fetchers/shows";
import { swrKeys } from "@/fetchers/swrKeys";
import { Box, Flex } from "@chakra-ui/react";
import useSWR from "swr";

export default function TopRatedSection() {
   const {data, error, isLoading} = useSWR(swrKeys.shows('/top_rated'), authFetcher<IAllShows>);

   if (error) {
      return <Box color="white">Something went wrong...</Box>;
   }
   if (isLoading || !data) {
      return <Box color="white">Loading...</Box>;
   }

   return (
         <>
            <AuthRedirect to='/login' condition="isLoggedOut" />
            <ShowList showList={data.shows}/>
         </> 
    );
}