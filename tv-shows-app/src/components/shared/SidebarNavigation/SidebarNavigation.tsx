'use client'

import { swrKeys } from "@/fetchers/swrKeys";
import { Box, Flex, Tag } from "@chakra-ui/react";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useSWR, { mutate, useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";



export default function SidebarNavigation() {
   const route = usePathname();
   const to = useRouter();
   const {mutate} = useSWR(swrKeys.me);

   const logOut = () => {
      localStorage.setItem('loginInfo', '');
      mutate(null, {revalidate: false});
      to.push('/');
   }
   return <Flex direction="column" justifyContent="space-between">
      <Flex direction="column" position="fixed">
         <Tag as={NextLink} href={"/all-shows"} color="white" background={route == "/all-shows" ? "lightblue" : "transparent"}>All shows</Tag>
         
         <Tag as={NextLink} href={"/all-shows/top-rated"} color="white" background={route == "/all-shows/top-rated" ? "lightblue" : "transparent"}>Top rated</Tag>
         <Tag color="white" background="transparent">My profile</Tag>
      </Flex>
      <Tag visibility="hidden">_________</Tag> {/* ovo mi je bezveze, ali ne znam kako da zadrzim ovakav fixed scrollbar u flowu inače bez da je neki dio static" */}
      <Tag position="fixed" bottom="5vh" color="white" background="transparent" onClick={logOut}>Log out</Tag>
   </Flex>
}