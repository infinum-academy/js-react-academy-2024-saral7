import { Box, Flex, Hide, Show } from "@chakra-ui/react";
import SidebarNavigation from "@/components/shared/SidebarNavigation/SidebarNavigation";
import Header from "@/components/shared/Header/Header";
import { PickerContextProvider } from "@/components/feature/picker/Picker/components/PickerContextProvider";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<PickerContextProvider>
				<Show below="xl">
					<Header />
					<Box>{children}</Box>
				</Show>
				<Show above="xl">
					<Flex justifyContent="space-between">
						<Box width="20%">
							<Header />
							<SidebarNavigation />
						</Box>
						<Box width="80%">{children}</Box>
					</Flex>
				</Show>
			</PickerContextProvider>
		</>
	);
}
