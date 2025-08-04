// src/App.tsx
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

import Auth from './components/Auth';
import NotesList from './components/NotesList';
import NoteAddForm from './components/NoteAddForm';

import type { Note } from './types/Note';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  useEffect(() => {
    if (session) fetchNotes();
  }, [session]);

  async function fetchNotes() {
    const { data } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
    if (data) setNotes(data);
  }

  async function addNote(content: string) {
    const { data: userData } = await supabase.auth.getUser();

    await supabase.from('notes').insert({ 
      content: content,
      user_id: userData?.user?.id
    });
   
    fetchNotes();
  }

  async function deleteNote(id: string) {
    await supabase.from('notes').delete().eq('id', id);
    fetchNotes();
  }

  async function handleLogin() {
    const email = prompt('Enter your email')!;
    const password = prompt('Enter your password')!;
    await supabase.auth.signInWithPassword({ email, password });
  }

  async function handleSignup() {
    const email = prompt('Enter your email')!;
    const password = prompt('Enter your password')!;
    await supabase.auth.signUp({ email, password });
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (!session) {
    return <Auth onLogin={handleLogin} onSignup={handleSignup}/>
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <button onClick={handleLogout} className="bg-gray-500 text-white px-3 py-1 mb-4">Logout</button>
      
     	<NoteAddForm onAdd={addNote}/>
			<NotesList notes={notes} onDelete={deleteNote}/>
    </div>
  );
}
