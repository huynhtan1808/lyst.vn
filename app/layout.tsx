import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar';
import ToasterComponents from "../components/ToasterComponents";
import LoginModal from '@/components/features/modals/LoginModal';
import AddModal from '@/components/features/modals/AddModal';

import { UserContextProvider } from '@/contexts/AuthContext';
import type { Database } from '../db_types';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Metadata } from 'next';


import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Lyst.vn',
    template: '%s | Lyst.vn',
  },
  description: 'Nền tảng Mua – Bán – Cho Thuê Bất Động Sản hàng đầu Việt Nam',
  openGraph: {
    title: 'Lyst.vn',
    description: 'Nền tảng Mua – Bán – Cho Thuê Bất Động Sản hàng đầu Việt Nam',
    url: 'https://lyst.vn',
    siteName: 'Lyst.vn',
    images: [
      {
        url: 'https://lyst.vn/banner.jpg',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'vn-VN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Lyst.vn',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
  verification: {
    google: '',
    yandex: '',
  },
};

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
      <body className='max-w-6xl flex flex-col lg:mx-auto'>
      <ToasterComponents />
      <LoginModal />
      <AddModal/>
        <div className="h-screen">
        <div className="container h-full mx-auto xl:px-30 max-w-6xl">
          <div className="grid grid-cols-8 lg:grid-cols-4 h-full">
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
