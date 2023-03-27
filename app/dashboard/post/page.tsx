"use client"

import { useState, useEffect } from 'react';
import { supabaseClient } from '@/lib/supabase-browser';
import BlogPosts from '@/components/shared/PostCard';
import { useUser } from '@/contexts/AuthContext';

export const revalidate = 0;

export default function Posts() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = supabaseClient();
      const { data } = await supabase.from('posts').select('id, slug, title, images').eq('user_id', user?.id)
      if (!data) {
        return <p>No posts found.</p>
      }
      setPosts(data as never[])
    }
    fetchPosts();
  }, [user]);

  if (!posts) {
    return <p>No posts found.</p>;
  }
  return (
    <>
      <div>
        {posts.map((post: any) => {
          const imageUrls = post.images ? post.images.split(",") : [];
          const imageUrl = imageUrls.shift();
          return (
            <BlogPosts
              key={post.id}
              id={post.id}
              images={imageUrl}
              title={post.title}
              slug={post.slug}
            />
          )
        })}
      </div>
    </>
  );
}
