import { IReviewItem } from "@/typings/review";
import { Button, Flex, Input, NumberInput, Text, Textarea, useMediaQuery } from "@chakra-ui/react";

export interface IOnPostFunction {
   addShowReview: () => void;
}

export default function ReviewForm({addShowReview} : IOnPostFunction) {
   const [phoneQuery] = useMediaQuery('(max-width: 400px)');

   return <Flex 
            direction={'column'} 
            width={'100%'} 
            marginTop={'32px'}
            marginBottom={'32px'}>

            <Text 
               fontWeight={'bold'} 
               color={'white'} 
               marginBottom={'16px'}>
                  Reviews
            </Text>

            <Textarea 
               id = 'input-form-text'
               backgroundColor={'white'} 
               placeholder="Add review" 
               width='100%'
               marginBottom={'16px'}>
            </Textarea>

            <Input
               id = 'input-form-rating'
               min={1}
               max={5}
               backgroundColor={'white'} 
               width='50%'
               marginBottom={'16px'}
               placeholder="Add rating">
            </Input>

            <Button 
               width={'30%'} 
               borderRadius={'10px'}
               onClick={addShowReview}>
                  Post
            </Button>
         </Flex>
}