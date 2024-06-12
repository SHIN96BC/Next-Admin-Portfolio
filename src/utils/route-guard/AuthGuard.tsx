'use client';

// next
import {usePathname} from 'next/navigation';

// project-import
import Loader from '@Src/components/common/loaders/Loader';

// types
import { GuardProps } from '@Src/types/auth';
import useFirebaseAuth from "@Src/hooks/auth/useFirebaseAuth";

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }: GuardProps) => {
  const { isFirebaseLogin } = useFirebaseAuth();

  const pathname = usePathname();

  if (!isFirebaseLogin && pathname !== '/login') {
    return <Loader />;
  }

  return children;
};

export default AuthGuard;
