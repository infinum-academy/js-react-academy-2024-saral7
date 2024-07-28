import { IReview } from "@/typings/review";
import {
	Avatar,
	AvatarGroup,
	Button,
	Card,
	Flex,
	Menu,
	MenuButton,
	MenuIcon,
	MenuItem,
	MenuList,
	Text,
	useStyleConfig,
} from "@chakra-ui/react";
import ReviewStarsInput from "../ReviewStarsInput/ReviewStarsInput";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { swrKeys } from "@/fetchers/swrKeys";
import { deleteReview } from "@/fetchers/mutators";
import { authFetcher } from "@/fetchers/fetcher";
import { IUser } from "@/typings/user";
import ReviewUpdate from "./components/ReviewUpdate/ReviewUpdate";
import { ReviewDeleteButton } from "./components/ReviewDeleteButton/ReviewDeleteButton";
import { HamburgerIcon, InfoIcon } from "@chakra-ui/icons";
import { ReviewItemStyle } from "@/styles/theme/components/reviewItem";

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
		<Flex {...ReviewItemStyle} flexDirection="row" alignItems="left" width="100%">
			<Flex direction={{ base: "column", lg: "row" }} justifyContent="space-between" width="90%">
				<Flex direction="row" alignItems="start" width="50%">
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
		</Flex>
	);
}
