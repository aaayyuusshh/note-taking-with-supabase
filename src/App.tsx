import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import NotesList from './components/NotesList';
import NoteAddForm from './components/NoteAddForm';
import Header from './components/Header';
import {fetchNotes, addNote, deleteNote} from './services/notesDbService';
import { handleLogin, handleSignup, handleLogout } from './services/authService';
import type { Note } from './types/Note';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  useEffect(() => {
    if (session) loadNotes();
  }, [session]);

  async function loadNotes() {
    const { data } = await fetchNotes();
    if (data) setNotes(data);
  }

  async function handleAdd(content: string) {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    
    if(userId) {
      await addNote(content, userId);
      loadNotes();
    }
  }

  async function handleDelete(id: string) {
    await deleteNote(id);
    loadNotes();
  }

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
