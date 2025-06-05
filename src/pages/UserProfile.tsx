import { useEffect, useState } from "react";
import api from "../api/axios"
import { useAuthHeader } from "../api/useAuthHeader";
import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const authHeader = useAuthHeader();

  useEffect(() => {
    api.get("/users/profile", authHeader)
      .then(res => {
        setUser(res.data);
        setName(res.data.name);
      })
      .catch(() => alert("Erro ao carregar perfil"));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch("/users/profile", {
        name,
        ...(password && { password }),
      }, authHeader);
      alert("Perfil atualizado!");
    } catch {
      alert("Erro ao atualizar perfil");
    }
  };

  if (!user) return <PageWrapper><p>Carregando...</p></PageWrapper>;

  return (
    <PageWrapper>
      <Header />
      <Card>
        <h2 className="text-xl font-bold mb-4">Meu Perfil</h2>
        <form onSubmit={handleUpdate}>
          <Input label="Nome" value={name} onChange={e => setName(e.target.value)} />
          <Input label="Senha (opcional)" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <p className="text-sm text-gray-500 mb-4">Email: {user.email}</p>
          <p className="text-sm text-gray-500 mb-4">Criado em: {new Date(user.createdAt).toLocaleDateString()}</p>
          <Button type="submit" className="w-full">Atualizar</Button>
        </form>
      </Card>
    </PageWrapper>
  );
}
