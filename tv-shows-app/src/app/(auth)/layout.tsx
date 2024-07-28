import { Box, Flex, Hide, Show } from '@chakra-ui/react';
import SidebarNavigation from '@/components/shared/SidebarNavigation/SidebarNavigation';
import Header from '@/components/shared/Header/Header';
import { Providers } from '../providers';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<Show below='xl'>
				<Box>{children}</Box>
			</Show>
			<Show above='xl'>
				<Flex justifyContent="space-between">
					<Box width="15%">
						<SidebarNavigation />
					</Box>
					<Box width="80%">{children}</Box>
				</Flex>
			</Show>
		</>
	);
}
