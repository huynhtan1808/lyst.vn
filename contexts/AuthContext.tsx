'use client'

import { useEffect, useState, createContext, useContext } from 'react';
import {
  useUser as useSupaUser,
  useSessionContext,
  User
} from '@supabase/auth-helpers-react';
import { supabaseClient } from '@/lib/supabase-browser'
import nookies from "nookies";

import type { Session } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/db_types'


import { UserDetails } from '@/types';

const accessTokenCookieName = "sb-access-token";
const refreshTokenCookieName = "sb-refresh-token";

type MaybeSession = Session | null;


type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  supabase: SupabaseClient<Database>;
  session: MaybeSession;
};

export const UserContext = createContext<UserContextType | null>(
  null
);

export interface Props {
  [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const [supabase] = useState(() => supabaseClient())
  
  // Check if user session is invalid
  useEffect(() => {
    const session = supabase.auth.getSession();

    if (!session) {
      setUserDetails(null);

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
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

        setUserDetails(profileUser);
    };

    getUserDetails();
  }, []);

  // Set cookies on auth state change
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      const user = supabase.auth.getUser();

      if (!session) {
        setUserDetails(null);

        nookies.destroy(null, accessTokenCookieName);
        nookies.destroy(null, refreshTokenCookieName);

        return;
      }

      if (event === "SIGNED_OUT") {
        setUserDetails(null);
      } else if (event === "SIGNED_IN") {
        const { data: profileUser } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

        setUserDetails(profileUser);
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

    return data.unsubscribe;
  }, []);

  const value = {
    accessToken,
    user,
    userDetails,
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