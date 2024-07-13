'use client'

import AuthRedirect from "@/components/shared/AuthRedirect/AuthRedirect";
import ShowList, { IShowList } from "@/components/shared/ShowList/ShowList";
import { authFetcher, fetcher } from "@/fetchers/fetcher";
import { getAllShows } from "@/fetchers/shows";
import { swrKeys } from "@/fetchers/swrKeys";
import { IShowCard } from "@/typings/show";
import { Box, Flex } from "@chakra-ui/react";
import useSWR from "swr";

export interface IAllShows {
  meta: any,
  shows: Array<IShowCard>
}
export default function AllShowsSection () {
  const {data, error, isLoading} = useSWR(swrKeys.shows(''), authFetcher<IAllShows>);

  if (error) {
    return <Box color="white">Something went wrong...</Box>;
  }
  if (isLoading || !data) {
    return <Box color="white">Loading...</Box>;
  }
  console.log(data);
   return (
        <>
          <AuthRedirect to='/login' condition="isLoggedOut" />
          <ShowList showList={data.shows}/>
        </>
      
    );
}

