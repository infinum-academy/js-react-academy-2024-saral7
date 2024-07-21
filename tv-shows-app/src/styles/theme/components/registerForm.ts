import { createMultiStyleConfigHelpers, defineStyleConfig, useInputGroupStyles } from "@chakra-ui/react";


export const RegisterForm = defineStyleConfig({
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
      height: "600px"
   } 
})