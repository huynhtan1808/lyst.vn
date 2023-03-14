
import Link from 'next/link'
import { supabaseClient } from '../../lib/supabase-browser'
import Image from '@/components/shared/Image'

export const revalidate = 0

export default async function Posts() {
  const supabase = supabaseClient();

  const { data: posts } = await supabase.from('posts').select('id, slug, title, featured_image')
  if (!posts) {
    return <p>No posts found.</p>
  }
  return posts.map((post: any) => (
    <ul className='flex flex-column'>
    <li key={post.id}>
        <Image 
        src={post.featured_image}
        alt="abc" 
        height='100'
        width='100'
        style={{ height: 'auto', objectFit: 'contain', position: 'relative' }}
        />
        <Link href={`/blog/${post.slug}`}>
        {post.title}
      </Link>
    </li>
    </ul>
  ))
}