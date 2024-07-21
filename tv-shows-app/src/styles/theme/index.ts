import { extendTheme } from "@chakra-ui/react";
import { fontSizes } from "./foundations/font-sizes";
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";
import { fonts } from "./foundations/fonts";
import { colors } from "./foundations/colors";
import { fontWeights } from "./foundations/font-weights";
import { LoginForm } from "./components/loginForm";
import { Button } from "./components/button";
import { space } from "./foundations/spaces";
import { Input } from "./components/input";
import { FormErrorMessage } from "./components/formErrorMessage";
import { RegisterForm } from "./components/registerForm";
import { Card } from "./components/card";
import { StarIcon } from "./components/starIcon";
import { ReviewForm } from "./components/reviewForm";
import { ReviewItem } from "./components/reviewItem";

export const customTheme = extendTheme({
   /*fontSizes: {
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
   }*/
  components: {
   LoginForm,
   RegisterForm,
   Button,
   Input,
   FormErrorMessage,
   Card,
   StarIcon,
   ReviewForm,
   ReviewItem
  },
  fontSizes,
  fonts,
  colors,
  fontWeights,
  space
});