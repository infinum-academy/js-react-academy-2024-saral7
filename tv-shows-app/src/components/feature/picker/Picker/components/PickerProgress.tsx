import { Progress } from "@chakra-ui/react";
import { useContext } from "react";
import { PickerContext } from "./PickerContextProvider";

export function PickerProgress() {
	const { currentStep, totalSteps } = useContext(PickerContext);
	console.log(currentStep, totalSteps);
	return <Progress marginBottom={1} value={(currentStep / totalSteps) * 100} />;
}
