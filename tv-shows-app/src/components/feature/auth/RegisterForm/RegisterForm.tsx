'use client'

import { mutator } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Alert, Button, chakra, Flex, FormControl, FormErrorIcon, FormErrorMessage, FormHelperText, FormLabel, Input, InputAddon, InputGroup, InputLeftElement, Link, Text, useMultiStyleConfig, useStyleConfig } from "@chakra-ui/react";
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
      onError: (error) => { 
         setError("email", {message: error.errors[0]});
      },
      onSuccess: () => {
         setRegistered(true);
      }
   });

   const onRegister = async (data : IRegisterForm) => {
      console.log(errors);
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
   const style = useStyleConfig('RegisterForm');
   return <>
   {registered && (router.push("/login"))}
   {!registered && (
         <chakra.form __css={style} onSubmit={handleSubmit(onRegister)}>
            <Text fontStyle="italic" fontSize={2} position="absolute" top="56px" color="white">TV SHOWS APP</Text>
            <FormControl position="absolute" top="140px" height="56px" width="388px" isInvalid={Boolean(errors.email)} isDisabled={isSubmitting}>
               <InputGroup>
                  <InputLeftElement>
                     <EmailIcon color="white" />
                  </InputLeftElement>
                  <Input {...register("email", emailRequirements)} type="email" color="white" placeholder="Email"/>
               </InputGroup>
               <FormErrorMessage margin={0} textAlign="left">{errors?.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl position="absolute" top="230px" height="56px" width="388px" isInvalid={Boolean(errors.password)} isDisabled={isSubmitting}  >
               <PasswordInput registerProps={{...register("password", passwordRequirements)}} errors={errors.password} />
               <FormErrorMessage margin={0} textAlign="left">{errors?.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl position="absolute" top="320px" height="56px" width="388px" isInvalid={Boolean(errors.password_confirmation)} isDisabled={isSubmitting}  >
               <PasswordInput registerProps={{...register("password_confirmation", passwordConfirmationRequirements)}} errors={errors.password_confirmation} />
               <FormErrorMessage margin={0} textAlign="left">{errors?.password_confirmation?.message}</FormErrorMessage>
            </FormControl>

            <FormControl position="absolute" top="420px" display="flex" justifyContent="space-around">
               <Button type="submit" isLoading={isSubmitting} >SIGN UP</Button>
            </FormControl>

            <FormControl position="absolute" top="500px">
               <FormHelperText margin={0} textAlign="center" color="white">Already have an account? <Link fontWeight="bold" href="/login">Login</Link></FormHelperText>
            </FormControl>
         </chakra.form>
   )}
   </>;
}