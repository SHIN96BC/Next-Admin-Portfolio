// PROJECT IMPORTS
import MainLayout from '@Src/layout/MainLayout';
import AuthGuard from '@Src/utils/route-guard/AuthGuard';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <AuthGuard>
      <MainLayout>{children}</MainLayout>
    // </AuthGuard>
  );
}
