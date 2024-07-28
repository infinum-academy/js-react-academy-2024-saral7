import { defineStyleConfig } from '@chakra-ui/react';

export const StarIcon = defineStyleConfig({
	baseStyle: {
		boxSize: '24px',
	},
	variants: {
		clicked: {
			color: 'white',
		},
		unclicked: {
			color: 'lightblue',
		},
	},
});
