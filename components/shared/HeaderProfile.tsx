'use client';

import { useUser } from '@/contexts/AuthContext';
import Avatar from "@/components/shared/Avatar";



export default function HeaderProfile() {

  const { user } = useUser();
  if (!user) return null;

  return (
    <div>
      <div className="flex text-sm items-center px-3 py-2 space-x-2">
        <Avatar src={user.avatar_url} />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-gray-300 capitalize">{user.authRole}</p>
        </div>
      </div>
    </div>  
  );
};