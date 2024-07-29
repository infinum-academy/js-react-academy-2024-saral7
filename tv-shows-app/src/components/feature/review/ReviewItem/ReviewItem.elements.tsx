import { chakra, Flex } from "@chakra-ui/react";

export const ReviewItemWrapper = chakra(Flex, {
	baseStyle: {
		display: "flex",
		flexDirection: "row",
		gap: 1,
		fontSize: 3,
		backgroundColor: "lightblue",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 1,
		color: "white",
		padding: 1,
		width: "100%",
	},
});
