'use client'

import { mutator } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Alert, Button, chakra, Flex, FormControl, FormErrorIcon, FormErrorMessage, FormHelperText, FormLabel, Input, InputAddon, InputGroup, InputLeftElement, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import PasswordInput from "../PasswordInput/PasswordInput";

interface IRegisterForm {
   email: string,
   password: string,
   password_confirmation: string
}

export default function RegisterForm() {
   const router = useRouter();
   const [registered, setRegistered] = useState(false);
   const {register, handleSubmit, watch, setError, formState: {isSubmitting, errors}} = useForm<IRegisterForm>();

   const {trigger} = useSWRMutation(swrKeys.register, mutator, {
      onError: (error,) => { 
         setError("email", {message: error.errors[0]});
      },
      onSuccess: () => {
         setRegistered(true);
      }
   });

   const onRegister = async (data : IRegisterForm) => {
      try {
         await trigger(data);
      }
      catch(error) {}
   }

   const emailRequirements = {
      required: 'Email is required'
   }

   const passwordRequirements = {
      required: 'Password is required', 
      minLength: {
         value: 8, 
         message: 'At least 8 characters'
      }
   }

   const passwordConfirmationRequirements = {
      ...passwordRequirements,
      validate: {
         equals: (value: string) => {
            return watch("password") == value || 'Make sure passwords are equal';
         }
      }
   }

   return <>
   {registered && (router.push("/login"))}
   {!registered && (
      <Flex margin="auto" direction="column" padding={2} alignItems="center">
         <chakra.form width="80%" onSubmit={handleSubmit(onRegister)}>
            <FormControl as='fieldset' disabled={isSubmitting} display="flex" flexDirection="column" backgroundColor="lightblue" padding={2} borderRadius="20px">
               <InputGroup marginBottom={2} display="flex" flexDirection="column" alignContent="left">
                  <InputLeftElement>
                     <EmailIcon color="white" />
                  </InputLeftElement>
                  <Input {...register("email", emailRequirements)} type="email" color="white" placeholder="Email"/>
                  {errors.email && <FormHelperText margin={0} textAlign="left" color="white">{errors.email.message}</FormHelperText>} {/*mozda napraviti komponentu za ovo?*/}
               </InputGroup>

               <PasswordInput registerProps={{...register("password", passwordRequirements)}} errors={errors.password} />
               
               <PasswordInput registerProps={{...register("password_confirmation", passwordConfirmationRequirements)}} errors={errors.password_confirmation} />

               <Button isLoading={isSubmitting} width="60%" type="submit" color="darkblue" margin="auto">SIGN UP</Button>

               <FormHelperText textAlign="center" color="white">Already have an account? <Link fontWeight="bold" href="/login">Login</Link></FormHelperText>
            </FormControl>
         </chakra.form>
      </Flex>
   )}
   </>;
}