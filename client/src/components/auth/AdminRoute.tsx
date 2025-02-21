
import { Navigate } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Volunteer } from "@shared/schema";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useQuery<Volunteer>({ 
    queryKey: ["/api/auth/me"]
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
