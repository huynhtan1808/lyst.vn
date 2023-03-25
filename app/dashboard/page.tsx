"use client"

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/AuthContext';

export default function Dashboard() {
    
    const router = useRouter();
    const { user }  = useUser();
  
    if (!user) {
      router.push('/');
    }
    
    return (
    <div className=''>
      <h1 className='text-2xl font-bold'>
        Hi, {user?.name}
      </h1>
    </div>
  );
}