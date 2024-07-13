'use client'

import { authFetcher, fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";

interface IAuthRedirect {
   to: string,
   condition: 'isLoggedIn' | 'isLoggedOut'
}

export default function AuthRedirect({to, condition} :  IAuthRedirect) {
   const route = useRouter();
   const {data, isLoading} = useSWR(swrKeys.me, authFetcher);

   useEffect(() => {
      if (isLoading) return;
      console.log(data, condition);
      if (!data && condition == 'isLoggedOut') {
         route.push(to);
      }

      if (data && condition == 'isLoggedIn') {  // ako postoji trenutni user i uvjet je loggedin, redirect
         route.push(to);
      }

   }, [data, isLoading, to, condition, route]);

   return null;
}