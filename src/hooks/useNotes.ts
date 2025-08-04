import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import type { Note } from '../types/Note';
import { fetchNotes, addNote, deleteNote } from '../services/notesDbService';

export function useNotes(session: any) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (session) loadNotes();
  }, [session]);

  async function loadNotes() {
    const { data, error } = await fetchNotes();
    if (error) {
      console.error('Error fetching notes:', error.message);
      return;
    }
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

  async function handleShare(noteId: string, email: string) {
    // put this in noteDbService
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
  }

  return { notes, handleAdd, handleDelete, handleShare };
}
