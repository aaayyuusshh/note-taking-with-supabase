import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import NotesList from './components/NotesList';
import NoteAddForm from './components/NoteAddForm';
import Header from './components/Header';
import { handleLogin, handleSignup, handleLogout } from './services/authService';
import { useNotes } from './hooks/useNotes';
import ShareNoteModal from './components/ShareNoteModal';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const { notes, handleAdd, handleDelete } = useNotes(session);
  const [shareNoteId, setShareNoteId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  async function handleShare(noteId: string, email: string) {
    const response = await fetch('http://localhost:4000/share-note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ noteId, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Failed to share note');
      return;
    }

    alert(data.message);
    setShareNoteId(null);
  }

  if (!session) {
    return <Auth onLogin={handleLogin} onSignup={handleSignup}/>
  }

   return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <Header onLogout={handleLogout} userEmail={session.user?.email}/>
        <NoteAddForm onAdd={handleAdd}/>
        <NotesList notes={notes} onDelete={handleDelete} onShare={(id) => setShareNoteId(id)}/>
        {shareNoteId && (
          <ShareNoteModal
            noteId={shareNoteId}
            onShare={handleShare}
            onClose={() => setShareNoteId(null)}
          />
        )}
      </div>
    </div>
  );
}