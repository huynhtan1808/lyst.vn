
import Navbar from '@/components/NavBar'
import ToasterComponents from "../components/ToasterComponents";
import { UserContextProvider } from '@/contexts/AuthContext';
import type { Database } from '../db_types';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

import './globals.css'

export type TypedSupabaseClient = SupabaseClient<Database>;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
  
    
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      
      <body className="mb-40">
      <UserContextProvider>
          <Navbar />
          <ToasterComponents />
          <main className="mx-auto">
          {children}
          </main>
      </UserContextProvider>
      </body>
    </html>
    
  )
}
