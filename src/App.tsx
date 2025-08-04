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
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <Header onLogout={handleLogout}/>
     	<NoteAddForm onAdd={handleAdd}/>
      <NotesList notes={notes} onDelete={handleDelete}/>
    </div>
  );
}