import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
	IconButton,
	Modal,
	ModalBody,
	useDisclosure,
	Text,
	ModalContent,
	ModalOverlay,
	ModalHeader,
	CloseButton,
	ModalCloseButton,
} from '@chakra-ui/react';
import ReviewForm from '../../../ReviewForm/ReviewForm';
import { IReview } from '@/typings/review';
import useSWRMutation from 'swr/mutation';
import { swrKeys } from '@/fetchers/swrKeys';
import { updateReview } from '@/fetchers/mutators';
import { mutate } from 'swr';

export interface IReviewUpdateProps {
	updatingReview: IReview;
}

export default function ReviewUpdate({ updatingReview }: IReviewUpdateProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const onOpening = () => {
		console.log('clicked');
		onOpen();
	};

	const { trigger } = useSWRMutation(swrKeys.reviews(`/${updatingReview.id}`), updateReview, {
		onSuccess: () => {
			mutate(swrKeys.getReviews(updatingReview.show_id));
			onClose();
		},
	});

	const onUpdate = async (review: IReview) => {
		try {
			await trigger(review);
		} catch (error) {}
	};

	return (
		<>
			<Text color="darkblue" onClick={onOpening}>
				Edit
			</Text>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent backgroundColor="darkblue" maxWidth={{ base: "80vw", md: "60vw"}}>
					<ModalCloseButton margin={0} color="white">
						<CloseIcon />
					</ModalCloseButton>
					<ModalBody>
						<ReviewForm label="Edit your review" index={updatingReview.show_id} addShowReview={onUpdate} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
