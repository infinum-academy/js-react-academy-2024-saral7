import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
   fontSizes: {
      '1': '16px',
      '1.5': '24px',
      '2': '32px' 
   },
   colors: {
      'darkblue': '#0D065E',
      'lightblue': '#271F7E'
   },
   space: {
      '0.5': '8px',
      '1': '16px',
      '1.5': '24px',
      '2': '32px' 
   }
});