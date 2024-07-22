import { extendTheme } from '@chakra-ui/react';
import { fontSizes } from './foundations/font-sizes';
import '@fontsource/roboto';
import '@fontsource/roboto/700.css';
import { fonts } from './foundations/fonts';
import { colors } from './foundations/colors';
import { fontWeights } from './foundations/font-weights';
import { Button } from './components/button';
import { space } from './foundations/spaces';
import { Input } from './components/input';
import { Card } from './components/card';
import { StarIcon } from './components/starIcon';
import { radii } from './foundations/border-radii';
import { breakpoints } from './foundations/breakpoints';

export const customTheme = extendTheme({
	components: {
		Button,
		Input,
		Card,
		StarIcon,
	},
	fontSizes,
	fonts,
	colors,
	fontWeights,
	space,
	radii,
   breakpoints
});
