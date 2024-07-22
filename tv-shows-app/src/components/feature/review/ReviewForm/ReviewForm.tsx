import { IReview, IReviewItem } from '@/typings/review';
import {
	Button,
	chakra,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	NumberInput,
	Text,
	Textarea,
	useMediaQuery,
	useStyleConfig,
} from '@chakra-ui/react';
import ReviewStarsInput from '../ReviewStarsInput/ReviewStarsInput';
import { useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';
import { swrKeys } from '@/fetchers/swrKeys';
import { authFetcher } from '@/fetchers/fetcher';
import { waitFor } from '@testing-library/react';
import { IUser } from '@/typings/user';
import useSWRMutation from 'swr/mutation';
import { createReview } from '@/fetchers/mutators';

export interface IOnPostFunction {
	label: string;
	index: number;
	addShowReview: (review: IReview) => void;
	style: any;
}

interface IReviewFormInputProps {
	text: string;
}

export default function ReviewForm({ label, index, addShowReview, style }: IOnPostFunction) {
	const { data } = useSWR<{ user: IUser }>(swrKeys.me, authFetcher);
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<IReviewFormInputProps>();
	const [starsClicked, setStarsClicked] = useState(1);

	// pitanje: bi li i broj kliknutih zvjezdica trebao biti dio form inputa, ili je okej ostaviti ovako sa stateom pa rucno?
	const addNewReview = async ({ text }: IReviewFormInputProps) => {
		if (!data) return;
		const newReview: IReview = {
			show_id: index,
			comment: text,
			rating: starsClicked,
		};
		addShowReview(newReview);

		setStarsClicked(1);
		reset();
	};

	const onStarClick = (starIndex: number) => {
		setStarsClicked(starIndex);
	};

	return (
		<chakra.form
			__css={style}
			width={['90%', '100%']}
			flexDirection={['column', 'row']}
			onSubmit={handleSubmit(addNewReview)}
		>
			<Text fontSize={2} color="white" marginBottom={1} marginRight={['0', '100px']}>
				{label}
			</Text>

			<Flex direction="column" width={['100%', '90%']}>
				<FormControl
					isInvalid={Boolean(errors.text)}
					isDisabled={isSubmitting}
					height="80px"
					width="100%"
					marginBottom={2}
				>
					<Textarea
						{...register('text', { required: 'Please write a comment' })}
						backgroundColor="white"
						placeholder="Add review"
						width="100%"
						padding={1}
					/>
					<FormErrorMessage marginTop={0} marginBottom={1}>
						{errors.text?.message}
					</FormErrorMessage>
				</FormControl>

				<Flex direction="row" justifyContent="space-between">
					<Flex alignItems="center" marginBottom={1} data-testid="stars-input">
						{' '}
						{/* test nije pronalazio ovaj data-testid kada je on bio u ReviewStarsInput komponenti zapisan */}
						<ReviewStarsInput label="Rating" value={starsClicked} onChange={isSubmitting ? () => {} : onStarClick} />
					</Flex>

					<FormControl isDisabled={isSubmitting} width="160px">
						<Button isDisabled={Boolean(errors.text)} isLoading={isSubmitting} type="submit">
							Post
						</Button>
					</FormControl>
				</Flex>
			</Flex>
		</chakra.form>
	);
}
