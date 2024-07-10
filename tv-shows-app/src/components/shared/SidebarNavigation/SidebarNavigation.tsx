'use client'

import { Box, Flex, Tag } from "@chakra-ui/react";

import NextLink from "next/link";

export interface ISidebarNavigation {
   route?: string
}

export default function SidebarNavigation({route} : ISidebarNavigation) {
   // zasad hardkodirani podaci... promijenit cu
   return <Flex direction="column" justifyContent="space-between">
      <Flex direction="column" position="fixed">
         <Tag as={NextLink} href={"/all-shows"} color="white" background={route == "/all-shows" ? "lightblue" : "transparent"}>All shows</Tag>
         
         <Tag as={NextLink} href={"/all-shows/top-rated"} color="white" background={route == "/all-shows/top-rated" ? "lightblue" : "transparent"}>Top rated</Tag>
         <Tag color="white" background="transparent">My profile</Tag>
      </Flex>
      <Tag visibility="hidden">_________</Tag> {/* ovo mi je bezveze, ali ne znam kako da zadrzim ovakav fixed scrollbar u flowu inače bez da je neki dio static" */}
      <Tag position="fixed" bottom="5vh" color="white" background="transparent">Log out</Tag>
   </Flex>
}