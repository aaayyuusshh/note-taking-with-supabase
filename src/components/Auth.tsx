import { useState } from 'react';

interface Props {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string) => void;
}

export default function Auth({ onLogin, onSignup }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onSignup(email, password);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50 px-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-900 drop-shadow-md text-center mb-4">
        Welcome to <b>Supabase Notes</b> 🗒️ 
      </h1>
      <p className="text-indigo-800 max-w-sm text-center mb-10">
        Simple, fast note-taking powered by <i>Supabase</i>.  
        Log in or sign up below to get started.
      </p>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 cursor-pointer font-medium rounded-l-lg border border-gray-300 w-1/2 ${
              isLogin
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 cursor-pointer font-medium rounded-r-lg border border-gray-300 w-1/2 ${
              !isLogin
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className={`w-full py-2 cursor-pointer rounded-md text-white font-semibold shadow-md transition ${
              isLogin
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>

      <p className="absolute bottom-4 w-full text-center text-gray-600 text-sm">
        Made with ❤️
        <a className="text-blue-500" href="https://github.com/aaayyuusshh/note-taking-with-supabase"> Github</a> 
      </p>
    </div>
  );
}
