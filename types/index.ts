import { User } from "@supabase/gotrue-js";
import { QueryKey } from "react-query";

export type AdditionalUser = User & {
  authRole: string | null;
  isVerified: boolean | null;
  avatarUrl: string | null;
  bannerUrl: string | null;
  name: string | null;
  username: string | null;
  bio: string | null;
};

export interface DisplayUser {
  id: string;
  name: string;
  avatar: string;
  username: string;
  role: string;
}