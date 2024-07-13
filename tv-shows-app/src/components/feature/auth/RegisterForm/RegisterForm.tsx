'use client'

import { mutator } from "@/fetchers/mutators";
import { swrKeys } from "@/fetchers/swrKeys";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Alert, Button, chakra, Flex, FormControl, FormHelperText, FormLabel, Input, InputAddon, InputGroup, InputLeftElement, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";

interface IRegisterForm {
   email: string,
   password: string,
   password_confirmation: string
}

export default function RegisterForm() {
   const router = useRouter();
   const [registered, setRegistered] = useState(false);
   const {register, handleSubmit, formState: {isSubmitting}} = useForm<IRegisterForm>();

   const {trigger} = useSWRMutation(swrKeys.register, mutator, {
      onError: (error, key) => { //TODO: error handling
         alert(error);
      },
      onSuccess: () => {
         setRegistered(true);
      }

   });

   const onRegister = async (data : IRegisterForm) => {
      if (data.password !== data.password_confirmation) {
         alert('Please provide equal passwords!');    //TODO: doradi
         return;
      }
      if (data.password.length < 1) {
         alert('Please provide a password with at least 8 characters!');    //TODO: doradi, da bude 8
         return;
      }
      //console.log(data);
      await trigger(data);
   }

   return <>
   {registered && (router.push("/login"))}
   {!registered && (
      <Flex margin="auto" direction="column" padding={2} alignItems="center">
         <chakra.form width="80%" onSubmit={handleSubmit(onRegister)}>
            <FormControl as='fieldset' disabled={isSubmitting} display="flex" flexDirection="column" backgroundColor="lightblue" padding={2} borderRadius="20px">
               <InputGroup marginBottom={2}>
                  <InputLeftElement>
                     <EmailIcon color="white" />
                  </InputLeftElement>
                  <Input {...register("email")} type="email" color="white" placeholder="Email"/>
               </InputGroup>

               <InputGroup>
                  <InputLeftElement>
                     <LockIcon color="white" />
                  </InputLeftElement>
                  <Input {...register("password")} type="password" color="white" placeholder="Password"/>
               </InputGroup>
               <FormHelperText margin="8px 0 16px 8px" textAlign="left" color="white">At least 8 characters</FormHelperText>
               
               <InputGroup marginBottom={1}>
                  <InputLeftElement>
                     <LockIcon color="white" />
                  </InputLeftElement>
                  <Input {...register("password_confirmation")} type="password" color="white" placeholder="Confirm password"/>
               </InputGroup>

               <Button isLoading={isSubmitting} width="60%" type="submit" color="darkblue" margin="auto">SIGN UP</Button>

               <FormHelperText textAlign="center" color="white">Already have an account? <Link fontWeight="bold" href="/login">Login</Link></FormHelperText>
            </FormControl>
         </chakra.form>
      </Flex>
   )}
   </>;
}