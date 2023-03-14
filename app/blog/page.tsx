
import Link from 'next/link'
import { supabaseClient } from '../../lib/supabase-browser'
import BlogPosts from '@/components/shared/Posts'

export const revalidate = 0

export default async function Posts() {
  const supabase = supabaseClient();

  const { data: posts } = await supabase.from('posts').select('id, slug, title, featured_image')
  if (!posts) {
    return <p>No posts found.</p>
  }
  return posts.map((post: any) => (
    <div>
       <BlogPosts
       id={post.id}
       featured_image={post.featured_image}
       title={post.title}
       slug={post.slug}
    />
    </div>
   
  ))
}