import { StarIcon } from "@chakra-ui/icons";
import { Flex, Text, useStyleConfig } from "@chakra-ui/react";

export interface IReviewStarsInputProps {
   label: string,
   value: number,
   onChange: (index : number) => void
}

export default function ReviewStarsInput({label, value, onChange} : IReviewStarsInputProps) {
   const clicked = useStyleConfig('StarIcon', { variant: 'clicked'});
   const unclicked = useStyleConfig('StarIcon', { variant: 'unclicked'});

   return <Flex alignItems={'center'}>
      <Text fontSize={3} color={'white'} marginRight="8px">{label}</Text>
      {
         Array(5).fill(0).map((x, index) => {return <StarIcon key={index} __css={index < value ? clicked : unclicked} onClick={() => {onChange(index+1)}}/>})
      }
      </Flex>
}