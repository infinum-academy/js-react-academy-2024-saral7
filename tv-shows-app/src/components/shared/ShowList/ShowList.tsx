import { IShowCard } from "@/typings/show";
import { Box, Flex } from "@chakra-ui/react";
import {ShowCard} from "../ShowCard/ShowCard";

import NextLink from "next/link";

export interface IShowList {
   showList: Array<IShowCard>
}

export default function ShowList({showList} : IShowList) {
   return <Flex gap="5%" wrap="wrap" marginTop={2} data-testid="show-list" flex="0 0 auto">
      {showList.map((show, index) => {
         return <Box key={index} width="20%" marginBottom={2} >
                  <NextLink href={`/all-shows/${show.id}`}>
                     <ShowCard show={show}/>
                  </NextLink>
               </Box>
         })
      }
   </Flex>
}