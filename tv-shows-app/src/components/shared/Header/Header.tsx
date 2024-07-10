import { Center, Flex, Heading } from "@chakra-ui/react";

export default function Header() {
   return <Flex direction={'column'} alignItems={'center'} paddingTop={'16px'}>
      <Heading color={'white'} width={'60vw'} fontSize={'24px'}>
      TV shows App 
      </Heading>
   </Flex>
}