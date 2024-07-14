import { LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FormHelperText, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

interface IPasswordInputProps {
   registerProps: any, 
   errors: any,
   validationFunction?: any
}

export default function PasswordInput({registerProps, errors} : IPasswordInputProps) {
   const [isClicked, setIsClicked] = useState(false);

   const onClickHandler = () => {
      setIsClicked(!isClicked);
   }
   return (
      <InputGroup marginBottom={2} display="flex" flexDirection="column" alignContent="left">
         <InputLeftElement>
            <LockIcon color="white" />
         </InputLeftElement>
         <Input {...registerProps} type={isClicked ? "text" : "password"} color="white" placeholder="Password"/>
         <InputRightElement>
            {isClicked ? <ViewIcon color="white" onClick={onClickHandler}/>
                     : <ViewOffIcon color="white" onClick={onClickHandler}/>}
         </InputRightElement>
         {errors && <FormHelperText margin={0} textAlign="left" color="white">{errors.message}</FormHelperText>}
      </InputGroup>
   );
}