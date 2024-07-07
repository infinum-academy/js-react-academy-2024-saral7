import StarIcon, { IStar } from "@/app/components/shared/Icons/StarIcon/StarIcon";
import { PhoneIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

export interface IReviewStarsInputProps {
   value: IStar[],
   onChange: (star : IStar) => void
}

export default function ReviewStarsInput({value, onChange} : IReviewStarsInputProps) {
   const stars = value; // niz IStar elemenata, za svaki kaze je li zvjezdica selected ili ne

   return <Flex alignItems={'center'} marginBottom={1}>
      <Text fontWeight={'bold'} fontSize={1} color={'white'} marginRight={0.5}>Rating</Text>
      {
         stars.map((s, index) => {return <StarIcon key={index} star={s} onChange={onChange}></StarIcon>})
      }
      </Flex>
}