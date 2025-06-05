import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  role: "admin" | "user";
};

export default function RoleRoute({ role }: Props) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;
  return user.role === role ? <Outlet /> : <Navigate to="/" />;
}
