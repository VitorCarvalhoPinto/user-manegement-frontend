type Props = {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
};

export default function FilterSelect({ label, value, onChange, options }: Props) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm mb-1">{label}</label>}
      <select value={value} onChange={onChange} className="border p-2 rounded">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
