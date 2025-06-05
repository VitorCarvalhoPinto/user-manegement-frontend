import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuthHeader } from "../api/useAuthHeader";
import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import UserCard from "../components/UserCard";
import EditUserModal from "../components/EditUserModal";
import Header from "../components/Header";
import FilterSelect from "../components/FilterSelect";


export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // Novos estados
  const [roleFilter, setRoleFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const [showInactive, setShowInactive] = useState(false);

  const authHeader = useAuthHeader();

const fetchUsers = async () => {
  try {
    if (showInactive) {
      const res = await api.get("/users/inactive", authHeader);
      setUsers(res.data);
    } else {
      const params = new URLSearchParams();
      if (roleFilter) params.append("role", roleFilter);
      if (sortBy) params.append("sortBy", sortBy);
      if (order) params.append("order", order);

      const res = await api.get(`/users?${params.toString()}`, authHeader);
      setUsers(res.data);
    }
  } catch {
    alert("Erro ao carregar usuários");
  }
};


  useEffect(() => {
    fetchUsers();
  }, [roleFilter, sortBy, order, showInactive]);


  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      try {
        await api.delete(`/users/${id}`, authHeader);
        setUsers(prev => prev.filter(u => u.id !== id));
      } catch {
        alert("Erro ao deletar usuário");
      }
    }
  };

  return (
    <PageWrapper>
      <Header />

      <Card>
        <h2 className="text-xl font-bold mb-4">Usuários</h2>

        {/* Filtros e ordenação */}
        <div className="flex flex-wrap gap-4 mb-4">
          <FilterSelect
            label="Papel"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { value: "", label: "Todos" },
              { value: "admin", label: "Admins" },
              { value: "user", label: "Usuários" },
            ]}
          />

          <FilterSelect
            label="Filtro"
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

        <div className="space-y-2">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={() => handleDelete(user.id)}
              onEdit={() => setSelectedUser(user)}
            />
          ))}
        </div>
      </Card>

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={async (data) => {
            try {
              await api.patch(`/users/${selectedUser.id}`, data, authHeader);
              setUsers((prev) =>
                prev.map((u) =>
                  u.id === selectedUser.id ? { ...u, ...data } : u
                )
              );
              setSelectedUser(null);
              alert("Usuário atualizado!");
            } catch {
              alert("Erro ao atualizar usuário");
            }
          }}
        />
      )}
    </PageWrapper>
  );
}
