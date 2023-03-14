'use client';

import Link from "next/link";
import { useSupabase } from '@/components/SupabaseProvider';

export default function HeaderProfile() {

  const { session } = useSupabase();

  
  return session ? (
    <div>
    <Link href='/new-post'>
    <button >
      <p className=" ml-5 font-semibold line-clamp-1">Add Post</p>
    </button>
    </Link>
    </div>
     ) : (
    <Link href='/login'>
    <button >
      <p className="font-semibold line-clamp-1">Login</p>
    </button>
    </Link>
    )
};