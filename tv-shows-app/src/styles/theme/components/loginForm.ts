import { createMultiStyleConfigHelpers, defineStyleConfig, useInputGroupStyles } from "@chakra-ui/react";


export const LoginForm = defineStyleConfig({
   baseStyle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      borderRadius: "30px",
      bg: "lightblue",
      margin: "auto auto",
      top: "50px",
      width: "500px",
      height: "500px"
   },
   sizes: { 
      /* kako napraviti da se ovo applyja automatski :( */
      sm: {
         height: "400px",
         width: "300px"
      }
   }
})