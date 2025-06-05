import { useEffect, useState } from "react";
import { useAuthHeader } from "../api/useAuthHeader";
import {
  getUsers,
  getInactiveUsers,
  updateUser,
  deleteUser
} from "../services/userService";
import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import UserCard from "../components/UserCard";
import EditUserModal from "../components/EditUserModal";
import Header from "../components/Header";
import FilterSelect from "../components/FilterSelect";
import Button from "../components/Button";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const [roleFilter, setRoleFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [showInactive, setShowInactive] = useState(false);

  const authHeader = useAuthHeader();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      if (showInactive) {
        const res = await getInactiveUsers(authHeader);
        setUsers(res.data);
      } else {
        const params = new URLSearchParams();
        if (roleFilter) params.append("role", roleFilter);
        if (sortBy) params.append("sortBy", sortBy);
        if (order) params.append("order", order);

        const res = await getUsers(params, authHeader);
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, sortBy, order, showInactive]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      try {
        await deleteUser(id, authHeader);
        setUsers(prev => prev.filter(u => u.id !== id));
        alert("Usuário excluído com sucesso!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Erro ao excluir usuário");
      }
    }
  };

  const handleUpdateUser = async (data: { name: string; role: string }) => {
    if (!selectedUser) return;

    try {
      await updateUser(selectedUser.id, data, authHeader);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, ...data } : u
        )
      );
      setSelectedUser(null);
      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Erro ao atualizar usuário");
    }
  };

  return (
    <PageWrapper>
      <Header />

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Gerenciar Usuários</h2>
          <Button
            onClick={() => setShowInactive(!showInactive)}
            className={showInactive ? "bg-gray-600" : ""}
          >
            {showInactive ? "Ver Ativos" : "Ver Inativos"}
          </Button>
        </div>

        {!showInactive && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <FilterSelect
              label="Filtrar por Papel"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: "", label: "Todos os papéis" },
                { value: "admin", label: "Administradores" },
                { value: "user", label: "Usuários" },
              ]}
            />

            <FilterSelect
              label="Ordenar por"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: "name", label: "Nome" },
                { value: "createdAt", label: "Data de Criação" },
              ]}
            />

            <FilterSelect
              label="Ordem"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              options={[
                { value: "asc", label: "Crescente" },
                { value: "desc", label: "Decrescente" },
              ]}
            />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <p>Carregando usuários...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum usuário encontrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={!showInactive ? () => handleDelete(user.id) : undefined}
                onEdit={!showInactive ? () => setSelectedUser(user) : undefined}
              />
            ))}
          </div>
        )}
      </Card>

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleUpdateUser}
        />
      )}
    </PageWrapper>
  );
}