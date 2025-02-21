import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Volunteer } from "@shared/schema";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useQuery<Volunteer>({ 
    queryKey: ["/api/auth/me"]
  });
  const [, setLocation] = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    setLocation("/login");
    return null;
  }

  return <>{children}</>;
}