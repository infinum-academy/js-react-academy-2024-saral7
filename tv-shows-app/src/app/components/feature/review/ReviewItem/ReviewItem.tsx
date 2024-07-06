import { IReview, IReviewItem } from "@/typings/review";
import { Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { Fragment } from "react";

export default function ReviewItem({review} : IReviewItem) {
   return <Card padding={'16px'} backgroundColor={'#271F7E'} color={'white'}>
      <Flex direction={'column'} gap = '16px'>
         <Text> {review.text} </Text>
         <Text> {`${review.rating} / 5`} </Text>
         <Button width={'30%'}>Remove</Button>
      </Flex>
   </Card>
}