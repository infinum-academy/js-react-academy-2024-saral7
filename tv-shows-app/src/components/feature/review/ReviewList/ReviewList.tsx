'use client';

import { IReview, IReviewList } from '@/typings/review';
import { Flex } from '@chakra-ui/react';
import ReviewItem from '../ReviewItem/ReviewItem';
import { useEffect } from 'react';

export interface IReviewListProps {
	reviewList: Array<IReview>;
	onDelete: (review: IReview) => void;
}

export default function ReviewList({ reviewList, onDelete }: IReviewListProps) {
	return (
		<Flex direction={'column'} gap={1} marginBottom={1}>
			{reviewList.map((review, index) => {
				return <ReviewItem key={index} review={review} onDelete={onDelete} />;
			})}
		</Flex>
	);
}
