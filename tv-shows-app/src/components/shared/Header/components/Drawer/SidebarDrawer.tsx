import SidebarNavigation from "@/components/shared/SidebarNavigation/SidebarNavigation";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, useDisclosure } from "@chakra-ui/react";

export function SidebarDrawer() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<HamburgerIcon boxSize="24px" color="white" onClick={onOpen} />
			<Drawer isOpen={isOpen} onClose={onClose}>
				<DrawerContent backgroundColor="lightblue">
					<DrawerCloseButton color="white" />
					<DrawerBody width="70%">
						<SidebarNavigation onClose={onClose} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
