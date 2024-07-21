import { IShowItem } from "@/components/feature/shows/ShowDetails/ShowDetails";
import { IShowCard } from "@/typings/show";
import { Box, Card, CardBody, Flex, Image, Tag, Text } from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
export interface IShowCardProps {
   show: IShowCard
}

export function ShowCard({show}: IShowCardProps) {
   return <Card variant="showCard">
         <Image height="300px" width="240px" src = {show.image_url ? show.image_url : '/images/placeholder.png'} data-testid = "image" />
            
         <CardBody>
            <Text fontWeight="bold" fontSize={3} data-testid = "title"> {show.title} </Text>
            <Flex alignContent="center" alignItems="center">
               <StarIcon alignContent="center" color="darkblue" marginRight="8px" />
               <Text fontSize={5} flexGrow={1} data-testid="rating">{show.average_rating ? `${show.average_rating} / 5` : 'No ratings'}</Text>
            </Flex>
         </CardBody>
        
      </Card>
};