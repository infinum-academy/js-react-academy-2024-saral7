import { Box, Flex } from '@chakra-ui/react';
import SidebarNavigation from '@/components/shared/SidebarNavigation/SidebarNavigation';
import Header from '@/components/shared/Header/Header';
import { Providers } from '../providers';

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return ( <>
		<Header />
		<Flex justifyContent="space-between">
			<SidebarNavigation />
			<Box width="80vw">{children}</Box>
		</Flex>
	</>
					
	);
}
