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
      <body className='max-w-6xl flex flex-col md:flex-row lg:mx-auto'>
      <ToasterComponents />
        <div className="h-screen">
        <div className="container h-full mx-auto xl:px-30 max-w-6xl">
          <div className="grid grid-cols-8 md:grid-cols-4 h-full">
          <LeftSidebar />
            <main 
              className="col-span-7 lg:col-span-2 px-4 my-6">
              {children}
            </main>
            <RightSidebar />
          </div>
          </div>
          </div>
      </body>
      </UserContextProvider>
    </html>
  )
}
