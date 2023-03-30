"use client"

import { useUser } from '@/contexts/AuthContext';
import { Suspense } from 'react';
import {CardSkeleton} from '@/components/skeleton/PostCardSkeleton';


export default function Dashboard() {
  
  const { user }  = useUser();
  
  return (
  <Suspense fallback={<CardSkeleton isLoading={true} />}>
    <h1 className='text-2xl font-bold'>
        Hi, {user?.name}
    </h1>
  </Suspense>
  );
}