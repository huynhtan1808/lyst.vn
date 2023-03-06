import Link from "next/link";
import { useSupabase } from '@/components/SupabaseProvider';
import Button from "@/components/shared/Button";


export default function HeaderProfile() {

  const { supabase, session } = useSupabase();


  return !session ? (
      <Link href='/login'>
      <Button primary>
        <p className="font-semibold line-clamp-1">Login</p>
      </Button>
      </Link>
    ) : (
      <div className="flex space-y-2">
        <Link href="/profile">Profile</Link>
      </div>
  );
};