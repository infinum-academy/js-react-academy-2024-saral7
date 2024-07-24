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
	Box,
	ModalFooter,
	Flex,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { PickerContext } from "./components/PickerContextProvider";
import { ShowCard } from "@/components/shared/ShowCard/ShowCard";
import { PickerStep } from "./components/PickerStep";
import { PickerButtons } from "./components/PickerButtons";
import { PickerResults } from "./components/PickerResults";
import { PickerProgress } from "./components/PickerProgress";

export function Picker() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { shows, winners, setWinners, active, setActive, setSelected, setCurrentStep } = useContext(PickerContext);

	const isOver = winners.showList.length == 1 && active.showList.length == 0;
	useEffect(() => {
		if (!isOpen) return;
		setWinners({ showList: [] });
		setSelected({ showList: [] });
		setActive(shows);
		setCurrentStep(1);
	}, [isOpen]);
	return (
		<>
			<Button onClick={onOpen}> What to watch? </Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalContent maxWidth="50vw" height="60vh">
					{isOver && <ModalCloseButton color="white" />}

					<ModalHeader border={0} backgroundColor="darkblue" padding={2}>
						<Heading color="white"> {isOver ? "Tonight on repertoire..." : "Choose one..."}</Heading>
					</ModalHeader>

					<ModalBody
						backgroundColor="darkblue"
						display="flex"
						flexWrap="wrap"
						justifyContent="space-around"
						gap={1}
						padding={1}
						height="90%"
					>
						{isOver ? <PickerResults /> : <PickerStep />}
					</ModalBody>
					<ModalFooter padding={1} backgroundColor="darkblue">
						{isOver ? (
							<></>
						) : (
							<Flex direction="column" width="100%">
								<PickerProgress />
								<PickerButtons />
							</Flex>
						)}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
