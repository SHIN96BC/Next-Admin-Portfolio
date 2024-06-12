// PROJECT IMPORTS

// types
import { GuardProps } from '@Src/types/auth';
import AuthPageGuard from "@Src/utils/route-guard/AuthPageGuard";

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }: GuardProps) {
  return <AuthPageGuard>{children}</AuthPageGuard>;
}
