'use client';

import { IReview, IReviewList } from '@/typings/review';
import { Flex } from '@chakra-ui/react';
import {ReviewItem} from '../ReviewItem/ReviewItem';
import { useEffect } from 'react';

export interface IReviewListProps {
	reviewList: Array<IReview>;
}

export default function ReviewList({ reviewList }: IReviewListProps) {
	return (
		<Flex direction={'column'} alignItems="end" gap={1} marginBottom={1}>
			{reviewList.map((review, index) => {
				return <ReviewItem key={index} review={review} />;
			})}
		</Flex>
	);
}
