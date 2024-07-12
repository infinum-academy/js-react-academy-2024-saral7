'use client'

import ShowList from "@/components/shared/ShowList/ShowList";
import SidebarNavigation from "@/components/shared/SidebarNavigation/SidebarNavigation";
import { getTopShows } from "@/fetchers/shows";
import { Box, Flex } from "@chakra-ui/react";
import useSWR from "swr";

export default function TopRatedSection() {
   const {data, error, isLoading} = useSWR(`/all-shows`, () => {return getTopShows();});

   if (error) {
      return <Box color="white">Something went wrong...</Box>;
   }
   if (isLoading || !data) {
      return <Box color="white">Loading...</Box>;
   }

   return (
         <ShowList showList={data.shows}/>
    );
}