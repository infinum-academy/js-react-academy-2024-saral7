import { Box, Flex, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { PickerContext } from "./PickerContextProvider";
import { CheckCircleIcon, QuestionIcon } from "@chakra-ui/icons";
import { ShowCard } from "@/components/shared/ShowCard/ShowCard";

export function PickerResults() {
	const { winners } = useContext(PickerContext);
	return (
		<Flex flexDirection="column" justifyContent="space-between" margin="auto">
			<ShowCard show={winners.showList[0]} />;
		</Flex>
	);
}
