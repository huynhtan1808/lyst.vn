
import { supabaseClient } from '../../../lib/supabase-browser'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

const supabase = supabaseClient();

export async function generateStaticParams() {
  const { data: posts } = await supabase.from('posts').select('slug')

  return posts?.map(({ slug }) => ({
    slug,
  }))
}

export default async function Post({ params: { slug } }: { params: { slug: string } }) {
  const { data: post } = await supabase.from('posts').select().match({ slug }).single()


  if (!post) {
    notFound()
  }

  return (
    <section>
      <h1 className='text-2xl font-bold'>
        {post.title}
      </h1>
      <p>
        {post.content}
      </p>
    </section>
  );
}