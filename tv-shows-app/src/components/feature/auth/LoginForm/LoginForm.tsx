'use client'

import { mutator } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Button, chakra, createStylesContext, Flex, FormControl, FormErrorMessage, FormHelperText, Input, InputGroup, InputLeftElement, Link, Text, useInputGroupStyles, useMultiStyleConfig, useStyleConfig } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { cache } from "swr/_internal";
import useSWRMutation from "swr/mutation";
import PasswordInput from "../PasswordInput/PasswordInput";

export interface ILoginForm {
   email: string,
   password: string
}

interface ILoginErrorProps {
   isError: boolean,
   message?: string
}

export default function LoginForm() {
   const {register, handleSubmit, setError, formState: {isSubmitting, errors}} = useForm<ILoginForm>();
   const {mutate} = useSWR(swrKeys.me);
   
   const {trigger} = useSWRMutation(swrKeys.login, mutator, {
      onSuccess: (data) => {
         const loginInfo = {
            'uid': data.uid,
            'client': data.client,
            'token': data.token
         }
         localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
         mutate(data, {revalidate: false});
      },
      onError: async (error : {errors: Array<string>}) => {
         setError("email", {message: error.errors[0]});   // kad je ovo, test baca TypeError
      }
   });

   const onLogin = async (data: ILoginForm) => {
      try {
         await trigger(data);
      }
      catch(error) {}
   }

   const styles = useStyleConfig('LoginForm');
   return (
         <chakra.form __css={styles} top={["0", "100px"]} borderRadius={["0", "30px"]} width={["100vw", "500px"]} height={["100vh", "500px"]} onSubmit={handleSubmit(onLogin)}>
            <Text fontStyle="italic" fontSize={2} position="absolute" top="56px" color="white">TV SHOWS APP</Text>
            <FormControl position="absolute" top="145px" height="56px" width={["300px", "388px"]} isInvalid={Boolean(errors.email)} isDisabled={isSubmitting}>
               <InputGroup >
                  <InputLeftElement>
                     <EmailIcon color="white" />
                  </InputLeftElement>
                  <Input {...register("email", {required: 'Email is required'})} type="email" color="white" placeholder="Email"/>
               </InputGroup>
               <FormErrorMessage margin={0} data-testid="email-error-message">{errors?.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl position="absolute" top="240px" height="56px" width={["300px", "388px"]} isInvalid={Boolean(errors.password)} isDisabled={isSubmitting} >
               <PasswordInput registerProps={{...register("password", {required: 'Password is required'})}} errors={errors} />
               <FormErrorMessage margin={0} data-testid="password-error-message">{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            
            <FormControl position="absolute" top="350px" display="flex" justifyContent="space-around">
               <Button isLoading={isSubmitting} type="submit" data-testid="submit-button">LOGIN</Button>
            </FormControl>

            <FormControl position="absolute" top="430px">
               <FormHelperText margin={0} textAlign="center" color="white">Don't have an account? <Link fontWeight="bold" href="/register">Register</Link></FormHelperText>
            </FormControl>
            
         </chakra.form>
   )
}