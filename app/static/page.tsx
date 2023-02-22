'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabaseClient } from '../../lib/supabase-browser'


export default function Posts() {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<any>([])

  const supabase = supabaseClient();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from('posts').select()
      setPosts(data)
      setIsLoading(false)
    }

    fetchPosts()
  }, [])
  if (!posts) {
    return <p>No posts found.</p>
  }
  return isLoading ? <p>Loading</p> : posts.map((post: any) => (
    <p key={post.id}>
      <Link href={`/static/${post.slug}`}>{post.title}</Link>
    </p>
  ))
}