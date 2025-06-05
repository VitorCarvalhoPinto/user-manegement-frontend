type Props = {
  user: any;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function UserCard({ user, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center w-full break-words">
      <div className="mb-2 sm:mb-0">
        <p className="font-bold">{user.name}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-xs text-gray-500">{user.role}</p>
      </div>
      <div className="flex gap-2">
        {onEdit && <button onClick={onEdit} className="text-blue-600 text-sm">Editar</button>}
        {onDelete && <button onClick={onDelete} className="text-red-600 text-sm">Excluir</button>}
      </div>
    </div>
  );
}
