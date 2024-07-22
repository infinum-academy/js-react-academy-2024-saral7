import { IReview } from '@/typings/review';
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
} from '@chakra-ui/react';
import ReviewStarsInput from '../ReviewStarsInput/ReviewStarsInput';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { swrKeys } from '@/fetchers/swrKeys';
import { deleteReview } from '@/fetchers/mutators';
import { authFetcher } from '@/fetchers/fetcher';
import { IUser } from '@/typings/user';
import ReviewUpdate from './components/ReviewUpdate/ReviewUpdate';
import { ReviewDeleteButton } from './components/ReviewDeleteButton/ReviewDeleteButton';
import { HamburgerIcon, InfoIcon } from '@chakra-ui/icons';
import { ReviewItemStyle } from '@/styles/theme/components/reviewItem';

export interface IReviewItemProps {
	review: IReview;
}

export function ReviewItem({ review }: IReviewItemProps) {
	const { data } = useSWR(swrKeys.me, authFetcher<{ user: IUser }>);

	const style = useStyleConfig('ReviewItem');

	const MenuComponent = (
		<>
			<Menu>
				<MenuButton marginLeft={1}>⋮</MenuButton>
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

	return (
		<Flex
			{...ReviewItemStyle}
			flexDirection={['column', 'row']}
			alignItems={['left', 'center']}
			width={['340px', '870px']}
		>
			<Flex direction="row" alignItems="center" marginLeft={[0, 1]} width={['90%', '300px']}>
				<Avatar boxSize="40px" name={review.user?.email} marginRight={1} />
				<Flex direction="column" alignItems="start">
					<Text fontWeight="bold" fontSize={[4, 3]}>
						{review.user?.email}
					</Text>
					<ReviewStarsInput label={`${review.rating} / 5`} value={review.rating} onChange={() => {}} />
				</Flex>
				{data?.user.email === review.user?.email && window.outerWidth < 480 && MenuComponent}
			</Flex>
			<Text data-testid="text" fontSize={[4, 3]} flexGrow={1}>
				{review.comment}
			</Text>
			{data?.user.email === review.user?.email && window.outerWidth >= 480 && MenuComponent}
		</Flex>
	);
}
