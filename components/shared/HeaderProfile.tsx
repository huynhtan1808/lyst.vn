'use client';

import Link from "next/link";
import { useUser } from '@/contexts/AuthContext';
import Avatar from "@/components/shared/Avatar";


export default function HeaderProfile() {

  const { userDetails } = useUser();
  
  return userDetails ? (
    <div className="flex items-center space-x-2">
      <Link href={'/new-post'}>
          <button >
            <p className="font-semibold line-clamp-1">Add Post</p>
          </button>
      </Link>
      <Avatar src={userDetails.avatar_url} className="w-8 h-8" />
      <div>
      </div>
      
  </div>
    ) : (
      <div className="flex items-center space-x-2">
       <Link href={'/login'}>
        <button >
          <p className="font-semibold line-clamp-1">Login</p>
        </button>
    </Link>
    </div>
    )
};