'use client'

import {useEffect} from "react";
import useFirebaseAuth from "@Src/hooks/auth/useFirebaseAuth";
import Loader from "@Src/components/common/loaders/Loader";
import {useRouter} from "next/navigation";
import {APP_DEFAULT_PATH} from "@Src/config";

export default function AuthPageGuard({ children }: {children: React.ReactNode}) {
  const { isFirebaseLogin, isFirebaseLoading } = useFirebaseAuth();

  const router = useRouter();

  useEffect(() => {

    if (!isFirebaseLoading && isFirebaseLogin) {
      router.replace(APP_DEFAULT_PATH);
    }

  }, [isFirebaseLogin, isFirebaseLoading]);

  if (isFirebaseLoading || isFirebaseLogin) {
    return <Loader />;
  }

  return children;
}