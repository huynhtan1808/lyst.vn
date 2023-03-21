
import Link from 'next/link'
import { supabaseClient } from '../../lib/supabase-browser'
import BlogPosts from '@/components/shared/Posts'

export const revalidate = 0

export default async function Posts() {

  const supabase = supabaseClient();

  const { data: posts } = await supabase.from('posts').select('id, slug, title, images')
  if (!posts) {
    return <p>No posts found.</p>
  }
  return (
    <>
    <div className="">
       <h1 className='text-3xl font-bold'>Blog</h1>
    </div>
    <div className="flex flex-wrap grid md:grid-cols-2 lg:grid-cols-4 py-3 gap-6">
    {posts.map((post: any) => (
    <BlogPosts
    key={post.id}
    id={post.id}
    images={post.images}
    title={post.title}
    slug={post.slug}
    />
    ))}
  </div>
  </>
  )
}