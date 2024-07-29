import { chakra } from "@chakra-ui/react";

export const ReviewFormWrapper = chakra(chakra.form, {
	baseStyle: {
		display: "flex",
		flexDirection: { base: "column", lg: "row" },
		justifyContent: "space-between",
		marginTop: 4,
		marginBottom: 4,
		width: "100%",
	},
});
