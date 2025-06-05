export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md sm:max-w-lg break-words">
      {children}
    </div>
  );
}
