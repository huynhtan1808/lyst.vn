"use client"

import { useUser } from '@/contexts/AuthContext';

export default function Dashboard() {
  
  const { user }  = useUser();
  
  return (
    <h1 className='text-2xl font-bold'>
        Hi, {user?.name}
    </h1>
  );
}