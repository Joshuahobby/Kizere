
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface LoginCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      await apiRequest("POST", "/api/auth/login", credentials);
    },
  });

  return {
    login: login.mutateAsync,
  };
}
