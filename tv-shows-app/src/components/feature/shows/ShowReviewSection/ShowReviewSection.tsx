"use client";

import { Box, Flex, useStyleConfig } from "@chakra-ui/react";
import ReviewForm from "../../review/ReviewForm/ReviewForm";
import { Fragment, useEffect, useRef, useState } from "react";
import { IReview, IReviewItem, IReviewList } from "@/typings/review";
import ReviewList from "../../review/ReviewList/ReviewList";
import useSWR, { mutate } from "swr";
import { swrKeys } from "@/fetchers/swrKeys";
import { authFetcher } from "@/fetchers/fetcher";
import useSWRMutation from "swr/mutation";
import { createReview } from "@/fetchers/mutators";

export interface ShowReviewSectionProps {
	index: number;
}

export default function ShowReviewSection({ index }: ShowReviewSectionProps) {
	const { data, error, isLoading } = useSWR(swrKeys.getReviews(index), authFetcher<IReviewList>);

	const { trigger } = useSWRMutation(swrKeys.reviews(""), createReview, {
		onSuccess: () => {
			mutate(swrKeys.getReviews(index));
			mutate(swrKeys.shows(`/${index}`));
		},
	});

	const addToReviewList = async (newReview: IReview) => {
		await trigger(newReview);
	};

	if (error) {
		if (error.status !== 401) return <Box color="white">Something went wrong...</Box>;
	}
	if (isLoading || !data) {
		return <Box color="white">Loading...</Box>;
	}

	return (
		<Flex direction="column" width="80%" margin="auto">
			<ReviewForm label="Reviews" addShowReview={addToReviewList} index={index} />
			<ReviewList reviewList={data.reviews} />
		</Flex>
	);
}
