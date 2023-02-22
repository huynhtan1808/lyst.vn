'use client'

import { useEffect, useState } from 'react'
import supabase from '@/lib/supabase-browser'

export default function RealtimePosts({ serverPosts }: { serverPosts: any }) {
  const [posts, setPosts] = useState(serverPosts)

  useEffect(() => {
    setPosts(serverPosts)
  }, [serverPosts])

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) =>
        setPosts((posts: any) => [...posts, payload.new])
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [serverPosts])

  return <pre>{JSON.stringify(posts, null, 2)}</pre>
}