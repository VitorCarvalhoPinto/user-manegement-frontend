import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

type Props = {
  user: any;
  onClose: () => void;
  onSave: (data: { name: string; role: string }) => void;
};

export default function EditUserModal({ user, onClose, onSave }: Props) {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">Editar Usuário</h3>
        <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Papel</label>
          <select
            className="w-full p-2 border rounded mt-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">Usuário</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} type="button" className="bg-gray-300 text-black">
            Cancelar
          </Button>
          <Button
            onClick={() => onSave({ name, role })}
            type="button"
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
