"use client"

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase-browser";
import { UserDetails } from "@/types";

const useUserProfile = (user: UserDetails) => {
  const [data, setData] = useState<UserDetails>(user);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>();

  const supabase = supabaseClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: userData, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        if (error) {
          throw error;
        }
        setData(userData);
        setIsLoading(false);
      } catch (error) {
        setError(error as Error | null);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useUserProfile;
