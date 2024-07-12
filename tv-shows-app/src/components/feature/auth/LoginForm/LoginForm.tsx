'use client'

import { mutator } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Button, chakra, Flex, FormControl, FormHelperText, Input, InputGroup, InputLeftElement, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

interface ILoginForm {
   email: string,
   password: string
}

export default function LoginForm() {
   const [loggedIn, setLoggedIn] = useState(false);
   const {register, handleSubmit} = useForm<ILoginForm>();

   const {trigger} = useSWRMutation(swrKeys.login, mutator, {
      onSuccess: (data) => {
         const loginInfo = {
            'uid': data.uid,
            'client': data.client,
            'token': data.token
         }
         localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
         mutate(data, {revalidate: false});
         setLoggedIn(true);
      }
   });

   const onLogin = async (data: ILoginForm) => {
      const response = await trigger(data);
   }

   return (
      <Flex margin="auto" direction="column" padding={2} alignItems="center">
         <chakra.form width="80%" onSubmit={handleSubmit(onLogin)}>
            <FormControl as='fieldset' display="flex" flexDirection="column" backgroundColor="lightblue" padding={2} borderRadius="20px">
               <InputGroup marginBottom={2}>
                  <InputLeftElement>
                     <EmailIcon color="white" />
                  </InputLeftElement>
                  <Input {...register("email")} type="email" color="white" placeholder="Email"/>
               </InputGroup>

               <InputGroup marginBottom={2}>
                  <InputLeftElement>
                     <LockIcon color="white" />
                  </InputLeftElement>
                  <Input {...register("password")} type="password" color="white" placeholder="Password"/>
               </InputGroup>
               

               <Button width="60%" type="submit" color="darkblue" margin="auto">LOGIN</Button>

               <FormHelperText textAlign="center" color="white">Don't have an account? <Link fontWeight="bold" href="/register">Register</Link></FormHelperText>
            </FormControl>
         </chakra.form>
      </Flex>
   )
}