import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	useDisclosure,
	Text,
	Heading,
} from "@chakra-ui/react";
import { useContext } from "react";
import { PickerContext } from "./components/PickerContextProvider";
import { ShowCard } from "@/components/shared/ShowCard/ShowCard";
import { PickerStep } from "./components/PickerStep";
import { PickerButtons } from "./components/PickerButtons";
import { PickerResults } from "./components/PickerResults";

export function Picker() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { shows, currentStep, showingAtOnce, lastStep } = useContext(PickerContext);

	console.log(shows);
	return (
		<>
			<Button onClick={onOpen}> What to watch? </Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalContent maxWidth="50vw">
					{currentStep > lastStep && <ModalCloseButton color="white" />}

					<ModalHeader border={0} backgroundColor="darkblue" padding={2}>
						<Heading color="white"> {currentStep > lastStep ? "Tonight on repertoire..." : "Choose one..."}</Heading>
					</ModalHeader>

					<ModalBody backgroundColor="darkblue" display="flex" flexWrap="wrap" justifyContent="space-around" gap={1}>
						{currentStep > lastStep ? <PickerResults /> : <PickerStep />}
						<PickerButtons />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
