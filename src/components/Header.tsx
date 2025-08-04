interface Props {
  onLogout: () => void,
}

export default function Header({ onLogout, }: Props) {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-indigo-900">My Notes</h1>
      <button
        onClick={onLogout}
        className="bg-red-600 hover:bg-red-700 transition text-white rounded-md px-3 py-1 font-semibold cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
}
