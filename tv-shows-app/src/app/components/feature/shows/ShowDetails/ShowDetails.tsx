import { IShow } from "@/typings/show";
import { Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";
import { mock } from "node:test";
import { useState } from "react";

// dodala sam "wrapper" za IShow, da se moze direktno objekt tipa IShow proslijedivati
export interface IShowItem {
   show: IShow
}


export default function ShowDetails({show}: IShowItem) {
   return <Flex width='60vw' marginTop={'32px'}>
      <Card borderTopRadius='20px' borderBottomRadius={0}>
         <Image borderTopRadius='20px' src = {show.imageUrl ? show.imageUrl : '/images/star-yellow.png'} />
            
         <CardBody color='#0D065E'>
            <Text fontWeight={'bold'} fontSize='24px' marginBottom='16px'> {show.title} </Text>
            <Text marginBottom='16px'> {show.description} </Text>
            <Text> {show.averageRating ? `${show.averageRating} / 5` : 'No ratings'}</Text>
         </CardBody>
        
      </Card>
   </Flex>
};