import { StarIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";

export interface IReviewStarsInputProps {
   label: string,
   value: number,
   onChange: (index : number) => void
}

export default function ReviewStarsInput({label, value, onChange} : IReviewStarsInputProps) {
   return <Flex alignItems={'center'}>
      <Text fontWeight={'bold'} fontSize={1} color={'white'} marginRight={0.5}>{label}</Text>
      {
         Array(5).fill(0).map((x, index) => {return <StarIcon key={index} boxSize='24px' color={index < value ? 'gold' : 'white'} onClick={() => {onChange(index+1)}}/>})
      }
      </Flex>
}