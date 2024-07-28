import { background, defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
	baseStyle: {
		borderRadius: 'full',
		width: '144px',
		height: '52px'
	},

	variants: {
		default: {
			color: 'lightblue',
			backgroundColor: 'white',
			_loading: {
				backgroundColor: 'black',
			},
			width: '144px',
			height: '52px',
			padding: 0
		},
		edit: {
			color: 'white',
			backgroundColor: 'transparent',
			_loading: {
				backgroundColor: 'black',
			},
			borderColor: 'white',
			width: '60px',
			height: '60px',
			padding: 0
		},
		small: {
			color: 'lightblue',
			backgroundColor: 'white',
			_loading: {
				backgroundColor: 'black',
			},
			borderColor: 'white',
			width: '95px',
			borderRadius: "8px",
			height: '40px',
			padding: 0
		},
	}
});
