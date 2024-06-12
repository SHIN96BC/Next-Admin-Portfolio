// project import
import Login from '@Src/features/auth/login/Login';
import AuthPageGuard from "@Src/utils/route-guard/AuthPageGuard";

export default function HomePage() {
  return (
    <AuthPageGuard>
      <Login />
    </AuthPageGuard>
  );
}
