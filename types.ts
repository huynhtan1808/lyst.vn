import { User } from "@supabase/gotrue-js";


export type UserDetails = User & {
  authRole: string;
  isVerified: boolean;
  avatarUrl: string;
  bannerUrl: string;
  name: string;
  username: string;
  bio: string;
}