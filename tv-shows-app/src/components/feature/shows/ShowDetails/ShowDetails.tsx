import { IShowCard } from '@/typings/show';
import { StarIcon } from '@chakra-ui/icons';
import { Card, CardBody, Flex, Image, Text } from '@chakra-ui/react';

// dodala sam "wrapper" za IShow, da se moze direktno objekt tipa IShow proslijedivati
export interface IShowItem {
	show: IShowCard;
}

export default function ShowDetails({ show }: IShowItem) {
	return (
		<Card variant="showDetails" width="80%">
			<Image
				objectFit="cover"
				height="440px"
				width={"100%"}
				src={show.image_url ? show.image_url : '/images/placeholder.png'}
			/>

			<CardBody flexDirection={['column', 'row']} alignItems={['start', 'center']}>
				<Flex direction="column" alignContent="start" alignItems="start">
					<Text fontWeight="bold" fontSize={[2, 1]}>
						{' '}
						{show.title}{' '}
					</Text>
					<Flex alignContent="center" alignItems="center">
						<StarIcon alignContent="center" marginRight="8px" />
						<Text fontSize={[5, 2]}> {show.average_rating ? `${show.average_rating} / 5` : 'No ratings'}</Text>
					</Flex>
				</Flex>
				<Text width={['100%', '50%']} fontSize={[5, 2]}>
					{' '}
					{show.description}{' '}
				</Text>
			</CardBody>
		</Card>
	);
}
