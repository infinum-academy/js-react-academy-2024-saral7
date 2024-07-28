'use client';

import { HamburgerIcon } from '@chakra-ui/icons';
import { Center, Flex, Heading, Hide, Show } from '@chakra-ui/react';
import { SidebarDrawer } from './components/Drawer/SidebarDrawer';

export default function Header() {
	return (
		<Flex width="80%" justifyContent="space-between" margin="auto" alignItems="center">
			<Heading color="white" fontSize={1}>
				TV shows App
			</Heading>
			<Hide above='xl'>
				<SidebarDrawer />
			</Hide>
		</Flex>
	);
}
