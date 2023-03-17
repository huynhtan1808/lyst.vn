import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/db_types';

export const supabaseClient = () =>
  createBrowserSupabaseClient<Database>();