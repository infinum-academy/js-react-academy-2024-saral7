import { background, defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
   baseStyle: {
      borderRadius: "full",
      width: "144px",
      height: "52px"
   },

   sizes: {
      md: {
         width: "144px",
         height: "52px"
      }
   },

   variants: {
      default: {
         color: "lightblue",
         backgroundColor: "white",
         _loading: {
            backgroundColor: "black"
         },
         width: "144px",
         height: "52px"
      },
      edit: {
         color: "white",
         backgroundColor: "transparent",
         _loading: {
            backgroundColor: "black"
         },
         borderColor: "white",
         width: "60px",
         height: "60px"
      }
      
   },
   defaultProps: {
      variant: "default",
      size: 'md'
   }
})