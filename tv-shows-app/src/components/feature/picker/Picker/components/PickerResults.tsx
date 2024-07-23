import { Box, Flex, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { PickerContext } from "./PickerContextProvider";
import { CheckCircleIcon, QuestionIcon } from "@chakra-ui/icons";

export function PickerResults() {
	const { selected } = useContext(PickerContext);
	return (
		<Flex width="100%" flexDirection="column" justifyContent="space-between">
			{selected.showList.map((show, index) => {
				return (
					<Flex key={index} width="90%" color="white" fontSize={2} alignItems="center">
						<CheckCircleIcon marginRight={1} />
						<Text>{show.title}</Text>
					</Flex>
				);
			})}
		</Flex>
	);
}
