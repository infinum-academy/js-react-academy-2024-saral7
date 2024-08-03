import { useContext } from "react";
import { PickerContext } from "./PickerContextProvider";
import { Button, Flex } from "@chakra-ui/react";

export function PickerButtons() {
	const { selected, setSelected, winners, setWinners, active, setActive, currentStep, setCurrentStep } =
		useContext(PickerContext);
	return (
		<Flex margin="auto" width="100%" justifyContent="space-between" alignItems="center" gap={1}>
			<Button
				variant={{ base: "small", md: "default" }}
				isDisabled={selected.showList.length == 0}
				onClick={() => {
					if (active.showList.length >= 2) {
						setActive({ showList: active.showList.slice(2, active.showList.length) });
						setWinners({ showList: [...winners.showList, ...selected.showList] });
						setSelected({ showList: [] });
					} else {
						setActive({ showList: [...winners.showList, ...active.showList] });
						setWinners({ showList: [] });
						setSelected({ showList: [] });
					}
					setCurrentStep(currentStep + 1);
				}}
			>
				Next
			</Button>
		</Flex>
	);
}
