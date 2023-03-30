"use client"

import { useState, useEffect } from 'react';
import { supabaseClient } from '@/lib/supabase-browser';
import PostCardFeed from '@/components/shared/PostCardFeed';
import { useUser } from '@/contexts/AuthContext';

export const revalidate = 0;

export default function UserPosts() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = supabaseClient();
      const { data } = await supabase
      .from('posts')
      .select('id, slug, title, images, user:users!user_id(*)')

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
            <PostCardFeed
              key={post.id}
              id={post.id}
              userAvatar={post.user.avatar_url}
              name={post.user.name}
              username={post.user.username}
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
