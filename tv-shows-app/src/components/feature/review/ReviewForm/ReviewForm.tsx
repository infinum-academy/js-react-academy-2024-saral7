import { IReview, IReviewItem } from "@/typings/review";
import { Button, Flex, FormControl, FormErrorMessage, Text, Textarea } from "@chakra-ui/react";
import ReviewStarsInput from "../ReviewStarsInput/ReviewStarsInput";
import { Controller, Form, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { swrKeys } from "@/fetchers/swrKeys";
import { authFetcher } from "@/fetchers/fetcher";
import { IUser } from "@/typings/user";
import { ReviewFormWrapper } from "./ReviewForm.elements";

export interface IOnPostFunction {
	label: string;
	index: number;
	addShowReview: (review: IReview) => void;
}

interface IReviewFormInputProps {
	text: string;
	rating: number;
}

export default function ReviewForm({ label, index, addShowReview }: IOnPostFunction) {
	const { data } = useSWR<{ user: IUser }>(swrKeys.me, authFetcher);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<IReviewFormInputProps>({ defaultValues: { rating: 1 } });

	// pitanje: bi li i broj kliknutih zvjezdica trebao biti dio form inputa, ili je okej ostaviti ovako sa stateom pa rucno?
	const addNewReview = async ({ text, rating }: IReviewFormInputProps) => {
		if (!data) return;
		const newReview: IReview = {
			show_id: index,
			comment: text,
			rating: rating,
		};
		addShowReview(newReview);
		reset();
	};

	return (
		<ReviewFormWrapper onSubmit={handleSubmit(addNewReview)}>
			<Text fontSize={2} color="white" marginBottom={1} marginRight={["0", "100px"]}>
				{label}
			</Text>

			<Flex direction="column" width="100%">
				<FormControl
					isInvalid={Boolean(errors.text)}
					isDisabled={isSubmitting}
					height="80px"
					width="100%"
					marginBottom={2}
				>
					<Textarea
						{...register("text", { required: "Please write a comment" })}
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
						{/* test nije pronalazio ovaj data-testid kada je on bio u ReviewStarsInput komponenti zapisan */}
						<Controller
							control={control}
							name="rating"
							render={({ field: { onChange, value } }) => {
								return <ReviewStarsInput label="Rating" value={value} onChange={onChange} />;
							}}
						></Controller>
					</Flex>

					<FormControl isDisabled={isSubmitting} maxWidth="144px">
						<Button variant="default" isDisabled={Boolean(errors.text)} isLoading={isSubmitting} type="submit">
							Post
						</Button>
					</FormControl>
				</Flex>
			</Flex>
		</ReviewFormWrapper>
	);
}
