import { supabase } from '../supabaseClient';

export async function handleLogin(email: string, password: string) { 
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function handleSignup(email: string, password: string) {
  return await supabase.auth.signUp({ email, password });
}

export async function handleLogout() {
  return await supabase.auth.signOut();
}
