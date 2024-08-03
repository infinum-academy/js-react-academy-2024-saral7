import { IReview } from "@/typings/review";
import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useStyleConfig } from "@chakra-ui/react";
import ReviewStarsInput from "../ReviewStarsInput/ReviewStarsInput";
import useSWR, { mutate } from "swr";
import { swrKeys } from "@/fetchers/swrKeys";
import { authFetcher } from "@/fetchers/fetcher";
import { IUser } from "@/typings/user";
import ReviewUpdate from "./components/ReviewUpdate/ReviewUpdate";
import { ReviewDeleteButton } from "./components/ReviewDeleteButton/ReviewDeleteButton";
import { ReviewItemWrapper } from "./ReviewItem.elements";

export interface IReviewItemProps {
	review: IReview;
}

const MenuComponent = ({ review }: IReviewItemProps) => {
	return (
		<>
			<Menu>
				<MenuButton>⋮</MenuButton>
				<MenuList minW={0} width="100px" fontSize={4} padding={1}>
					<MenuItem padding="0">
						<ReviewUpdate updatingReview={review} />
					</MenuItem>
					<MenuItem padding="0">
						<ReviewDeleteButton review={review} />
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
};

export function ReviewItem({ review }: IReviewItemProps) {
	const { data } = useSWR(swrKeys.me, authFetcher<{ user: IUser }>);

	const style = useStyleConfig("ReviewItem");

	return (
		<ReviewItemWrapper>
			<Flex direction={{ base: "column", lg: "row" }} justifyContent="space-between" width="90%">
				<Flex direction="row" alignItems="start" width={{ base: "100%", lg: "50%" }}>
					<Avatar boxSize={{ base: "32px", sm: "40px" }} name={review.user?.email} marginRight={1} />
					<Flex direction="column" alignItems="start">
						<Text fontWeight="bold" fontSize={{ base: 5, sm: 3 }}>
							{review.user?.email}
						</Text>
						<ReviewStarsInput label={`${review.rating} / 5`} value={review.rating} onChange={() => {}} />
					</Flex>
				</Flex>
				<Text data-testid="text" fontSize={[4, 3]} flexGrow={1} width={{ base: "100%", lg: "50%" }}>
					{review.comment}
				</Text>
			</Flex>
			{data?.user.email === review.user?.email && <MenuComponent review={review} />}
		</ReviewItemWrapper>
	);
}
