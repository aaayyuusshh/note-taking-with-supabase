import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import NotesList from './components/NotesList';
import NoteAddForm from './components/NoteAddForm';
import Header from './components/Header';
import { handleLogin, handleSignup, handleLogout } from './services/authService';
import { useNotes } from './hooks/useNotes';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const { notes, handleAdd, handleDelete } = useNotes(session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  if (!session) {
    return <Auth onLogin={handleLogin} onSignup={handleSignup}/>
  }

   return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <Header onLogout={handleLogout}/>
        <NoteAddForm onAdd={handleAdd}/>
        <NotesList notes={notes} onDelete={handleDelete}/>
      </div>
    </div>
  );
}