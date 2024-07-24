'use client'

import LoginForm from "@/components/feature/auth/LoginForm/LoginForm";
import AuthRedirect from "@/components/shared/AuthRedirect/AuthRedirect";

export default function Login() {
   return (
      <>
         <AuthRedirect to='/all-shows' condition="isLoggedIn" />
         <LoginForm />
      </>
   )
}