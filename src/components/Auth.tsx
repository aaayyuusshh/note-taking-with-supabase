interface Props {
  onLogin: () => void;
  onSignup: () => void;
}

export default function Auth({ onLogin, onSignup }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-indigo-50 px-6">
      <h1 className="text-5xl font-semibold text-indigo-900 drop-shadow-md">
        Welcome to <b>Supabase Notes</b> 🗒️
      </h1>
      <div className="flex gap-6">
        <button
          onClick={onLogin}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold rounded-lg px-8 py-3 shadow-md cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={onSignup}
          className="bg-green-600 hover:bg-green-700 transition text-white font-semibold rounded-lg px-8 py-3 shadow-md cursor-pointer"
        >
          Signup
        </button>
      </div>
      <p className="text-indigo-800 max-w-sm text-center">
        Simple, fast note taking powered by <i>Supabase</i>. Log in or sign up to get started.
      </p>
    </div>
  );
}
