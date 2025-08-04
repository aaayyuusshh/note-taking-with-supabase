interface Props {
  onLogout: () => void;
  userEmail?: string;
}

export default function Header({ onLogout, userEmail }: Props) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
      <div>
        <h1 className="text-3xl font-bold text-indigo-900">My Notes</h1>
        {userEmail && (
          <p className="text-sm text-gray-600">Logged in as <span className="font-medium">{userEmail}</span></p>
        )}
      </div>
      <button
        onClick={onLogout}
        className="bg-red-600 hover:bg-red-700 transition text-white rounded-md px-3 py-1 font-semibold cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
}
