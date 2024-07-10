'use client'

import ShowList from "@/components/shared/ShowList/ShowList";
import { getTopShows } from "@/fetchers/shows";
import { Box } from "@chakra-ui/react";
import useSWR from "swr";

export default function TopRatedSection() {
   const {data, error, isLoading} = useSWR(`/all-shows`, () => {return getTopShows();});

   if (error) {
      return <Box width="80vw" color="white">Something went wrong...</Box>;
   }
   if (isLoading || !data) {
      return <Box width="80vw" color="white">Loading...</Box>;
   }

   return (
      <Box width="80vw">
         <ShowList showList={data.shows}/>
      </Box>
    );
}