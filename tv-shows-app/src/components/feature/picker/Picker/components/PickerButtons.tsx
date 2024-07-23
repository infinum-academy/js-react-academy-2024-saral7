import { useContext } from "react";
import { PickerContext } from "./PickerContextProvider";
import { Button, Flex } from "@chakra-ui/react";

export function PickerButtons() {
	const { shows, currentStep, setCurrentStep, showingAtOnce, lastStep } = useContext(PickerContext);
	return (
		<Flex margin="auto" width="100%" justifyContent="space-between" alignItems="center" gap={1}>
			<Button
				variant={{ base: "small", md: "default" }}
				onClick={() => setCurrentStep(currentStep - 1)}
				visibility={currentStep == 0 ? "hidden" : "visible"}
			>
				Prev
			</Button>
			<Button
				variant={{ base: "small", md: "default" }}
				onClick={() => setCurrentStep(currentStep + 1)}
				visibility={currentStep > lastStep ? "hidden" : "visible"}
			>
				{currentStep == lastStep ? "Selected" : "Next"}
			</Button>
		</Flex>
	);
}
