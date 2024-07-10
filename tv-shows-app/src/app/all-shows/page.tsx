'use client'

import ShowList, { IShowList } from "@/components/shared/ShowList/ShowList";
import { getAllShows } from "@/fetchers/shows";
import { Box } from "@chakra-ui/react";
import useSWR from "swr";

// privremeni mock, ne koristim kasnije
export const mockList = [
   {
      title: 'Brooklyn-99',
      description: `Comedy series following the exploits of Det. Jake Peralta and his diverse,
                   lovable colleagues as they police the NYPD's 99th Precinct.`,
      imageUrl: '/images/brooklyn99.jpg',
      averageRating: 4.5
    } ,
    {
      title: 'Friends',
      description: `Comedy series following the exploits of Det. Jake Peralta and his diverse,
                   lovable colleagues as they police the NYPD's 99th Precinct.`
    },
    {
      title: 'Brooklyn-99',
      description: `Comedy series following the exploits of Det. Jake Peralta and his diverse,
                   lovable colleagues as they police the NYPD's 99th Precinct.`,
      imageUrl: '/images/brooklyn99.jpg',
      averageRating: 4.5
    },
    {
      title: 'Friends',
      description: `Neki text`
    }
]

export default function AllShowsSection () {
  const {data, error, isLoading} = useSWR(`/all-shows`, () => {return getAllShows();});

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

