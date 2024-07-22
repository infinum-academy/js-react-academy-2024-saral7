import { createMultiStyleConfigHelpers, useMultiStyleConfig } from '@chakra-ui/react';
import { cardAnatomy } from '@chakra-ui/anatomy';

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(cardAnatomy.keys);

export const Card = defineMultiStyleConfig({
	variants: {
		showCard: {
			container: {
				backgroundColor: 'white',
				borderRadius: 1,
				overflow: 'hidden',
			},
			body: {
				color: 'lightblue',
			},
		},
		showDetails: {
			container: {
				margin: 'auto',
				marginTop: 2,
				borderRadius: 1,
				overflow: 'hidden',
			},
			body: {
				color: 'lightblue',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-around',
				alignItems: 'center',
			},
		},
	},
});
