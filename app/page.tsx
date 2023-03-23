import Image from 'next/image'
import { Inter } from '@next/font/google'
import { createServerClient } from '@/lib/supabase-server';
import BlogPosts from '@/components/shared/Posts'


export const revalidate = 0

export default async function Home() {

  const supabase = createServerClient()

  const { data: posts } = await supabase.from('posts').select('id, slug, title, images')
  if (!posts) {
    return <p>No posts found.</p>
  }

  return (
    <>
    <div className="">
       <h1 className='text-3xl font-bold'>HOME</h1>
    </div>
    <div className="flex flex-wrap grid md:grid-cols-2 lg:grid-cols-4 py-3 gap-6">
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
  )
}
