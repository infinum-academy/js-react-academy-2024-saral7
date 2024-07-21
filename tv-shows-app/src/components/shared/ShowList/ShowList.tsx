import { IShowCard } from "@/typings/show";
import { Box, Flex } from "@chakra-ui/react";
import {ShowCard} from "../ShowCard/ShowCard";

import NextLink from "next/link";

export interface IShowList {
   showList: Array<IShowCard>
}

export default function ShowList({showList} : IShowList) {
   return <Flex gap="25px" wrap="wrap" height="1000px" padding="20px" justifyContent="space-around" marginTop={2} data-testid="show-list" flex="0 0 auto">
      {showList.map((show, index) => {
         return <Box width="240px" height="375px" key={index} marginBottom={2} >
                  <NextLink href={`/all-shows/${show.id}`}>
                     <ShowCard show={show}/>
                  </NextLink>
               </Box>
         })
      }
   </Flex>
}