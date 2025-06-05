import { useEffect, useState } from "react";
import { useAuthHeader } from "../api/useAuthHeader";
import { getProfile, updateProfile } from "../services/userService";
import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getProfile(authHeader);
        setUser(res.data);
        setName(res.data.name);
      } catch (error) {
        console.error("Error loading profile:", error);
        alert("Erro ao carregar perfil");
      }
    };

    loadProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        name,
        ...(password && { password }),
      };

      await updateProfile(updateData, authHeader);
      alert("Perfil atualizado com sucesso!");
      setPassword(""); // Limpa o campo de senha após atualizar
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center min-h-[200px]">
          <p>Carregando...</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Header />
      <Card>
        <h2 className="text-xl font-bold mb-4">Meu Perfil</h2>
        <form onSubmit={handleUpdate}>
          <Input
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            label="Nova Senha (opcional)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="Deixe em branco para manter a senha atual"
          />
          <div className="bg-gray-50 p-3 rounded mb-4">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Criado em:</strong> {new Date(user.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Atualizando..." : "Atualizar Perfil"}
          </Button>
        </form>
      </Card>
    </PageWrapper>
  );
}