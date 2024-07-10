import { IShow, IShowCard } from "@/typings/show";
import { Box, Flex } from "@chakra-ui/react";
import ShowCard from "../ShowCard/ShowCard";

import NextLink from "next/link";

export interface IShowList {
   showList: Array<IShowCard>
}

export default function ShowList({showList} : IShowList) {
   return <Flex gap="5%" wrap="wrap" marginTop={2} data-testid="show-list">
      {showList.map((x, index) => {
         return <Flex key={index} maxW="20%" width="20%" marginBottom={2}>
                  <NextLink href={`/all-shows/${x.id}`}>
                     <ShowCard show={x} />
                  </NextLink>
               </Flex>
         })
      }
   </Flex>
}