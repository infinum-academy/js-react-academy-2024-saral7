import { IShowItem } from "@/components/feature/shows/ShowDetails/ShowDetails";
import { IShowCard } from "@/typings/show";
import { Box, Card, CardBody, Flex, Image, Tag, Text } from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
export interface IShowCardProps {
   show: IShowCard
}

export default function ShowCard({show}: IShowCardProps) {
   return <Card borderRadius="20px" overflow="hidden" marginTop={2} margin="auto">
         <Image src = {show.image_url ? show.image_url : '/images/placeholder.png'} data-testid = "image" />
            
         <CardBody color="darkblue">
            <Text fontWeight="bold" fontSize={1.5} marginBottom={1} data-testid = "title"> {show.title} </Text>
            <Flex alignContent="center" alignItems="center">
               <StarIcon alignContent="center" color="darkblue" marginRight="8px" />
               <Text flexGrow={1} data-testid="rating">{show.average_rating ? `${show.average_rating} / 5` : 'No ratings'}</Text>
            </Flex>
         </CardBody>
        
      </Card>
};