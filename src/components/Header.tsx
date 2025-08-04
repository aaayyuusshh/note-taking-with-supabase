interface Props {
    onLogout: () => void
}

export default function Header({ onLogout }: Props) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <button onClick={onLogout} className="bg-gray-500 text-white px-3 py-1 mb-4">Logout</button>
    </>
  )
}
