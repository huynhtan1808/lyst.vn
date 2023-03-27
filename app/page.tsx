import Image from 'next/image'
import { Inter } from '@next/font/google'
import { createServerClient } from '@/lib/supabase-server';
import BlogPosts from '@/components/shared/Posts'
import Swiper, { SwiperSlide } from "@/components/shared/Swiper";
import HomeBanner from '@/components/shared/HomeBanner';

export const revalidate = 0

export default async function Home() {

  const supabase = createServerClient()

  const { data: posts } = await supabase.from('posts').select('id, slug, title, images')
  if (!posts) {
    return <p>No posts found.</p>
  }

  return (
    <>
    <HomeBanner/>
    <div className="max-w-6xl mt-5 mx-auto px-4">
    <Swiper
       slidesPerView={4}
       slidesPerGroup={1}
       breakpoints={{
         1536: {
           slidesPerView: 4.2,
           slidesPerGroup: 1,
           spaceBetween: 20,
         },
         1280: {
           slidesPerView: 4.2,
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
        <BlogPosts
          key={post.id}
          id={post.id}
          images={imageUrl}
          title={post.title}
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
