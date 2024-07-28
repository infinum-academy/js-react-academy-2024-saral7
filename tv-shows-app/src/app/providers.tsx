// app/providers.tsx
'use client';

import { customTheme } from '@/styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import '@fontsource/roboto';
import '@fontsource/roboto/700.css';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SWRConfig>
			<ChakraProvider theme={customTheme}>{children}</ChakraProvider>
		</SWRConfig>
	);
}
