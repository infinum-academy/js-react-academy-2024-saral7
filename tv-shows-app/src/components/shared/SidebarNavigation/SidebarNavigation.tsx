"use client";

import { Picker } from "@/components/feature/picker/Picker/Picker";
import { swrKeys } from "@/fetchers/swrKeys";
import { Box, Flex, Tag } from "@chakra-ui/react";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useSWR, { mutate, useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export default function SidebarNavigation() {
	const route = usePathname();
	const router = useRouter();
	console.log("vbdsjkvanl");
	const { mutate } = useSWR(swrKeys.me);

	const logOut = () => {
		localStorage.setItem("loginInfo", "");
		mutate(null, { revalidate: false });
		router.push("/");
	};

	console.log("route ", route);
	return (
		<Flex
			direction="column"
			justifyContent="space-between"
			alignItems="center"
			height="90vh"
			paddingTop={2}
			paddingBottom={2}
		>
			<Flex direction="column" gap={1}>
				<Tag
					fontSize={2}
					as={NextLink}
					href={"/all-shows"}
					color="white"
					background={route == "/all-shows" ? "lightblue" : "transparent"}
				>
					All shows
				</Tag>

				<Tag
					fontSize={2}
					as={NextLink}
					href={"/all-shows/top-rated"}
					color="white"
					background={route == "/all-shows/top-rated" ? "lightblue" : "transparent"}
				>
					Top rated
				</Tag>
				<Tag fontSize={2} color="white" background="transparent">
					My profile
				</Tag>

				<Picker />
			</Flex>
			<Tag fontSize={2} color="white" background="transparent" onClick={logOut}>
				Log out
			</Tag>
		</Flex>
	);
}
