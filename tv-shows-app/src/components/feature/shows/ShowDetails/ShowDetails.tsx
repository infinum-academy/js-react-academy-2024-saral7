import { IShowCard } from "@/typings/show";
import { StarIcon } from "@chakra-ui/icons";
import { Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";

// dodala sam "wrapper" za IShow, da se moze direktno objekt tipa IShow proslijedivati
export interface IShowItem {
   show: IShowCard
}


export default function ShowDetails({show}: IShowItem) {
   return <Card variant="showDetails">
         <Image objectFit="cover" height="440" width="1054" src = {show.image_url ? show.image_url : '/images/placeholder.png'} />
            
         <CardBody>
            <Flex direction="column">
               <Text fontWeight="bold" fontSize={1} > {show.title} </Text>
               <Flex alignContent="center" alignItems="center">
                  <StarIcon alignContent="center" marginRight="8px" />
                  <Text fontSize={2}> {show.average_rating ? `${show.average_rating} / 5` : 'No ratings'}</Text>
               </Flex>
            </Flex>
            <Text width="50%" fontSize={3}> {show.description} </Text>
         </CardBody>
        
      </Card>
};