'use client'

import { useEffect, useState, createContext, useContext } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@/lib/supabase-browser'
import nookies from "nookies";

import type { SupabaseClient, Session } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/db_types'


import { UserDetails } from '@/types';

const accessTokenCookieName = "sb-access-token";
const refreshTokenCookieName = "sb-refresh-token";

type MaybeSession = Session | null;


type UserContextType = {
  accessToken: string | null;
  user: UserDetails | null;
  isLoading: boolean;
  supabase: SupabaseClient<Database>;
  session: MaybeSession;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
  } = useSessionContext();
  const [user, setUser] = useState<UserDetails | null>(null);
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [supabase] = useState(() => supabaseClient())
  
  // Check if user session is invalid
  useEffect(() => {
    const currentDate = new Date();
    const session = supabase.auth.getSession();

    if (!session) {
      setUser(null);

      nookies.destroy(null, accessTokenCookieName);
      nookies.destroy(null, refreshTokenCookieName);
    }
  }, []);

  useEffect(() => {
    const getUserDetails = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profileUser } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id)
        .single();

        setUser(profileUser);
    };
    getUserDetails();
  }, []);

  // Set cookies on auth state change
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
  
      if (!session) {
        setUser(null);
  
        nookies.destroy(null, accessTokenCookieName);
        nookies.destroy(null, refreshTokenCookieName);
  
        return;
      }
  
      if (event === "SIGNED_OUT") {
        setUser(null);
      } else if (event === "SIGNED_IN") {
        const { data: profileUser } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id)
        .single();
  
        setUser(profileUser);
      }
  
      const token = session.access_token;
      const refreshToken = session.refresh_token;
  
      nookies.destroy(null, accessTokenCookieName);
      nookies.set(null, accessTokenCookieName, token, {
        path: "/",
        maxAge: 604800,
      });
  
      nookies.destroy(null, refreshTokenCookieName);
      nookies.set(null, refreshTokenCookieName, refreshToken, {
        path: "/",
        maxAge: 604800,
      });
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
  

  
  const value = {
    accessToken,
    user,
    isLoading: isLoadingUser || isLoadingData,
    supabase,
    session,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};