
import Link from 'next/link'
import { supabaseClient } from '../../lib/supabase-browser'
import BlogPosts from '@/components/shared/Posts'
import Swiper, { SwiperSlide } from "@/components/shared/Swiper";

export const revalidate = 0

export default async function Posts() {

  const supabase = supabaseClient();

  const { data: posts } = await supabase.from('posts').select('id, slug, title, images')

  if (!posts) {
    return <p>No posts found.</p>
  }
  return (
    <>
    <div className="mt-10">
       <h1 className='text-3xl font-bold mb-5'>Blog</h1>
    </div>
    <Swiper
       slidesPerView={4}
       slidesPerGroup={4}
       breakpoints={{
         1536: {
           slidesPerView: 4,
           slidesPerGroup: 4,
           spaceBetween: 20,
         },
         1280: {
           slidesPerView: 3,
           slidesPerGroup: 3,
           spaceBetween: 20,
         },
         1024: {
           slidesPerView: 3,
           slidesPerGroup: 3,
           spaceBetween: 20,
         },
         768: {
           slidesPerView: 2,
           slidesPerGroup: 2,
           spaceBetween: 20,
         },
         0: {
           slidesPerView: 1,
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
  </>
  )
}