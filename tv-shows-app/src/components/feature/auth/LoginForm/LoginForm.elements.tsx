import { Button, chakra } from "@chakra-ui/react";
import { Form } from "react-hook-form";

export const LoginFormWrapper = chakra(chakra.form, {
	baseStyle: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "lightblue",
		margin: "auto",
		position: "relative",
		top: { base: 0, md: "70px" },
		borderRadius: { base: 0, md: 2 },
		width: { base: "100vw", md: "500px" },
		height: { base: "100%", md: "500px" },
	},
});
