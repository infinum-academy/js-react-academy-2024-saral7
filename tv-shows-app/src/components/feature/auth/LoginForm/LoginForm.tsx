'use client'

import { mutator } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Button, chakra, Flex, FormControl, FormErrorMessage, FormHelperText, Input, InputGroup, InputLeftElement, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { cache } from "swr/_internal";
import useSWRMutation from "swr/mutation";

interface ILoginForm {
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
      onError: async (error) => {
         setError("email", {message: error.errors[0]});
      }
   });

   const onLogin = async (data: ILoginForm) => {
      try {
         await trigger(data);
      }
      catch(error) {}
   }

   return (
      <Flex margin="auto" direction="column" padding={2} alignItems="center">
         <chakra.form width="80%" onSubmit={handleSubmit(onLogin)}>
            <FormControl as='fieldset' isDisabled={isSubmitting} display="flex" flexDirection="column" backgroundColor="lightblue" padding={2} borderRadius="20px">
               <InputGroup marginBottom={2} display="flex" flexDirection="column" alignContent="left">
                  <InputLeftElement>
                     <EmailIcon color="white" />
                  </InputLeftElement>
                  <Input {...register("email", {required: 'Email is required'})} type="email" color="white" placeholder="Email"/>
                  {errors.email && <FormHelperText margin={0} textAlign="left" color="white">{errors.email.message}</FormHelperText>}
               </InputGroup>

               <InputGroup marginBottom={2} display="flex" flexDirection="column" alignContent="left">
                  <InputLeftElement>
                     <LockIcon color="white" />
                  </InputLeftElement>
                  <Input {...register("password", {required: 'Password is required'})} type="password" color="white" placeholder="Password"/>
                  {errors.password && <FormHelperText margin={0} textAlign="left" color="white">{errors.password.message}</FormHelperText>}
               </InputGroup>
               <Button isLoading={isSubmitting} width="60%" type="submit" color="darkblue" margin="auto">LOGIN</Button>

               <FormHelperText textAlign="center" color="white">Don't have an account? <Link fontWeight="bold" href="/register">Register</Link></FormHelperText>
            </FormControl>
         </chakra.form>
      </Flex>
   )
}