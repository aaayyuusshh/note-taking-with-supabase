import { supabase } from '../supabaseClient';

export async function fetchNotes() {
  return await supabase.from('notes').select('*').order('created_at', { ascending: false });
}

export async function addNote(content: string, userId: string) {
  return await supabase.from('notes').insert({ 
    content: content,
    user_id: userId
  });
}

export async function deleteNote(id: string) {
  return await supabase.from('notes').delete().eq('id', id);
}