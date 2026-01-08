import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Types for our database
export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  read_time: string;
  description: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string; // Added user_id
};
