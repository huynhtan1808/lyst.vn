
import Navbar from '@/components/NavBar'
import ToasterComponents from "../components/ToasterComponents";
import { createServerClient } from "../lib/supabase-server";
import SupabaseListener from '@/components/SupabaseListener';
import SupabaseProvider from '@/components/SupabaseProvider';

import type { Database } from '../db_types';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

import './globals.css'

export type TypedSupabaseClient = SupabaseClient<Database>;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="mb-40">
      <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <Navbar />
          <ToasterComponents />
          <main className="max-w-6xl px-4 mx-4 mt-4 md:mt-4 lg:mt-20 lg:mx-auto">
          {children}
          </main>
        </ SupabaseProvider>
      </body>
    </html>
  )
}
