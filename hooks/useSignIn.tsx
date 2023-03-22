import { supabaseClient } from "@/lib/supabase-browser";
import { Provider } from "@supabase/gotrue-js";
import { useMutation } from "react-query";

interface UseSignInOptions {
  redirectTo?: string;
  scopes?: string;
}

const useSignIn = (supabaseOptions?: UseSignInOptions) => {
    const supabase = supabaseClient();

  return useMutation((provider: Provider) => {
    return supabase.auth.signInWithOAuth(
      {provider},
    );
  });
};

export default useSignIn;
