import { chakra } from "@chakra-ui/react";

export const RegisterFormWrapper = chakra(chakra.form, {
	baseStyle: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "lightblue",
		margin: "auto",
		position: "relative",
		top: { base: 0, md: "50px" },
		borderRadius: { base: 0, md: 2 },
		width: { base: "100vw", md: "500px" },
		height: { base: "100vh", md: "550px" },
	},
});
