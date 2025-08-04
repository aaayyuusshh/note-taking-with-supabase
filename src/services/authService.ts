import { supabase } from '../supabaseClient';

export async function handleLogin() {
  const email = prompt('Enter your email')!;
  const password = prompt('Enter your password')!;
  
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function handleSignup() {
  const email = prompt('Enter your email')!;
  const password = prompt('Enter your password')!;
  
  return await supabase.auth.signUp({ email, password });
}

export async function handleLogout() {
  return await supabase.auth.signOut();
}
