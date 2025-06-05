import { useAuth } from "../contexts/AuthContext";

export function useAuthHeader() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
