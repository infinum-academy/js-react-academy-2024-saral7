import { createMultiStyleConfigHelpers, useMultiStyleConfig } from "@chakra-ui/react";
import { cardAnatomy} from "@chakra-ui/anatomy";

const {defineMultiStyleConfig, definePartsStyle} = createMultiStyleConfigHelpers(cardAnatomy.keys)

export const Card = defineMultiStyleConfig({
   variants: {
      showCard: {
         container: {
            backgroundColor: "white",
            borderRadius: "20px",
            overflow: "hidden",
            //height: "375px",
            width: "240px"
         },
         body: {
            color: "lightblue",
            padding: "10px",
            paddingLeft: "15px"
         }
      },
      showDetails: {
         container: {
            margin: "auto",
            marginTop: 2,
            borderRadius: "20px",
            overflow: "hidden",
            width: "1054px"
         },
         body: {
            color: "lightblue",
            padding: "10px",
            paddingLeft: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
         }
      }
   }
})