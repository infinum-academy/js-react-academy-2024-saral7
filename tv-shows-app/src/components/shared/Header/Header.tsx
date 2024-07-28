"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Center, Flex, Heading, Hide, Show } from "@chakra-ui/react";
import { SidebarDrawer } from "./components/Drawer/SidebarDrawer";
import { TfiDesktop } from "react-icons/tfi";

export default function Header() {
	return (
		<Flex width="80%" justifyContent="space-between" margin="auto" alignItems="center" paddingTop={1}>
			<Flex alignItems="center" gap={1}>
				<TfiDesktop color="white" size="40px" />
				<Heading color="white" fontSize={{ base: 2, xl: 2 }} fontStyle="italic" alignItems="center">
					TV shows App
				</Heading>
			</Flex>

			<Hide above="xl">
				<SidebarDrawer />
			</Hide>
		</Flex>
	);
}
