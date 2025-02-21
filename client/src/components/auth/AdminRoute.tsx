
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Volunteer } from "@shared/schema";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useQuery<Volunteer>({ 
    queryKey: ["/api/auth/me"]
  });
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}
