import React from "react";
import type { NextPage } from 'next'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Profile from '@/components/Profile'
import { useSupabase } from '@/components/SupabaseProvider';
import { createServerClient } from "@/lib/supabase-server";

import { redirect } from 'next/navigation';


type Props = {};


async function Home({}: Props) {

  const supabase  = createServerClient();

  // fetch user data
  const fetchUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    return { user };
  };

  const { user } = await fetchUser();

  if (!user) {
    redirect('/login');
  }

  return  (
    <>
    <h3>Account</h3>
    <Profile email={user?.email || ""} id={user?.id || ""} />  
  </>
);
}

export default Home