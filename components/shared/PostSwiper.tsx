"use client"

import { useState, useEffect } from 'react';
import { supabaseClient } from '../../lib/supabase-browser'
import PostCard from '@/components/shared/PostCard'
import Swiper, { SwiperSlide } from "@/components/shared/Swiper";

export const revalidate = 0

export default function PostSwiper() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = supabaseClient();
      const { data: postsData } = await supabase.from('posts').select('id, slug, title, images');
      setPosts(postsData);
    }
    fetchPosts();
  }, []);

  return (
    <>
    <div>
    <h2 className="text-xl font-bold">Nổi bật</h2>
    <Swiper
       slidesPerView={4}
       slidesPerGroup={1}
       hideNavigation
       breakpoints={{
         1536: {
           slidesPerView: 3.2,
           slidesPerGroup: 1,
           spaceBetween: 20,
         },
         1280: {
           slidesPerView: 3.2,
           slidesPerGroup: 1,
           spaceBetween: 20,
         },
         1024: {
           slidesPerView: 3.2,
           slidesPerGroup: 3,
           spaceBetween: 20,
         },
         768: {
           slidesPerView: 3.2,
           slidesPerGroup: 2,
           spaceBetween: 20,
         },
         0: {
           slidesPerView: 2.2,
           slidesPerGroup: 1,
           spaceBetween: 10,
         },
        }}
      >
      {posts.map((post: any) => {
      const imageUrls = post.images ? post.images.split(",") : [];
      const imageUrl = imageUrls.shift();
      return (
        <SwiperSlide  key={post.id}>
        <PostCard
          key={post.id}
          id={post.id}
          images={imageUrl}
          title=""
          slug={post.slug}
        />
        </SwiperSlide>
    )
  })}
  </Swiper>
  </div>
  </>
  )
}