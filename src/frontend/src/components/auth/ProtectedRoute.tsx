import { ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading } = useIsCallerAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!identity) {
      toast.error('Please login to access admin panel');
      navigate({ to: '/' });
    } else if (!isLoading && !isAdmin) {
      toast.error('Unauthorized: Admin access required');
      navigate({ to: '/' });
    }
  }, [identity, isAdmin, isLoading, navigate]);

  if (!identity || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
          <p className="text-maroon">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
