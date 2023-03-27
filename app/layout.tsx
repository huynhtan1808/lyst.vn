
import Navbar from '@/components/NavBar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar';
import ToasterComponents from "../components/ToasterComponents";
import Error from './error';
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
      <UserContextProvider>
      <body className='antialiased max-w-5xl mb-40 flex flex-col md:flex-row mt-12 lg:mx-auto'>
      <ToasterComponents />
        <LeftSidebar />
        <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-4">
          {children}
        </main>
        <RightSidebar />
      </body>
      </UserContextProvider>
    </html>
  )
}
