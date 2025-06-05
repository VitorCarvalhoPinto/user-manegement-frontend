import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-white shadow-sm px-6 py-4 mb-6 flex justify-between items-center rounded-lg">
      <h1 className="font-bold text-lg">Painel {user?.role === "admin" ? "Admin" : "Usuário"}</h1>
      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Sair
      </button>
    </div>
  );
}
