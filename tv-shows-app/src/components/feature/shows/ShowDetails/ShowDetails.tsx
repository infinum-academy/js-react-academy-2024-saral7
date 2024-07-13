import { IShowCard } from "@/typings/show";
import { Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";

// dodala sam "wrapper" za IShow, da se moze direktno objekt tipa IShow proslijedivati
export interface IShowItem {
   show: IShowCard
}


export default function ShowDetails({show}: IShowItem) {
   return <Card borderTopRadius='20px' borderBottomRadius={0} marginTop={2} margin="auto" width="60%">
         <Image borderTopRadius='20px' src = {show.image_url ? show.image_url : '/images/placeholder.png'} />
            
         <CardBody color={'darkblue'}>
            <Text fontWeight={'bold'} fontSize={1.5} marginBottom={1}> {show.title} </Text>
            <Text marginBottom={1}> {show.description} </Text>
            <Text> {show.average_rating ? `${show.average_rating} / 5` : 'No ratings'}</Text>
         </CardBody>
        
      </Card>
};