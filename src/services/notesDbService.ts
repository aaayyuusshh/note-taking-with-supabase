import { supabase } from '../supabaseClient';

export async function fetchNotes() {
  // get current user info
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return { data: null, error: userError.message };
  }
  const userId = userData?.user?.id;
  if (!userId) {
    return { data: null, error: 'No user logged in' };
  }

  // three step fetching process - mann, this slows down performance but supabase doesn't have a built in way
  // 1. fetch notes owned by user
  const { data: ownedNotes, error: ownedError } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId);

  if (ownedError) {
    return { data: null, error: ownedError.message };
  }

  // 2. fetch note ids shared with user
  const { data: collaborations, error: collabError } = await supabase
    .from('note_collaborators')
    .select('note_id')
    .eq('user_id', userId);

  if (collabError) {
    return { data: null, error: collabError.message };
  }

  const sharedNoteIds = collaborations?.map(c => c.note_id) || [];

  // 3. fetch notes shared with user
  let sharedNotes = [];
  if (sharedNoteIds.length > 0) {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .in('id', sharedNoteIds);
    if (error) {
      return { data: null, error: error.message };
    }
    sharedNotes = data;
  }

  // combine owned and shared notes and sort by created_at descending
  const combinedNotes = [...ownedNotes, ...sharedNotes].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return { data: combinedNotes, error: null };
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
