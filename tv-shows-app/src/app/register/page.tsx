'use client'

import RegisterForm from "@/components/feature/auth/RegisterForm/RegisterForm";
import AuthRedirect from "@/components/shared/AuthRedirect/AuthRedirect";

export default function Register() {
   return <>
         <AuthRedirect to="/all-shows" condition="isLoggedIn" />
         <RegisterForm />
      </>
      
}