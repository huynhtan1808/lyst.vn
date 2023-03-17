import { User } from "@supabase/gotrue-js";


export type UserDetails = User & {
  id: string /* primary key */;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
}