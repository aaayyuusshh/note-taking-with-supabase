interface Props {
  onLogin: () => void;
  onSignup: () => void;
}

export default function Auth({ onLogin, onSignup }: Props) {
  return (
    <div className="flex flex-col items-center mt-10 gap-4">
      <h1 className="text-xl font-bold">Supabase Notes</h1>
      <button onClick={onLogin} className="bg-blue-500 text-white px-4 py-2">Login</button>
      <button onClick={onSignup} className="bg-green-500 text-white px-4 py-2">Signup</button>
    </div>
  );
}
