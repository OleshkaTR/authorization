'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAppSelector } from "@/app/store/hooks";
import { AuthSliceSelectors } from "./store/auth/slice";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const RequiresAuth = (props: P) => {
    const router = useRouter();
    const isAuthenticated = useAppSelector(AuthSliceSelectors.getIsAuthenticated); 

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return RequiresAuth;
}
