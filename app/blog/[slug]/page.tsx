
import { supabaseClient } from '@/lib/supabase-browser'
import { notFound } from 'next/navigation'
import Image from '@/components/shared/Image'
import { useUser } from '@/contexts/AuthContext'
import UserCard from '@/components/shared/UserCard'

const supabase = supabaseClient();

export async function generateStaticParams() {
  const { data: posts } = await supabase.from('posts').select("*, user:users!user_id(*)")

  return posts?.map(({ slug }) => slug) || []
}

export default async function Post({ 
  params: { slug } }: { params: { slug: string } }) {


    const { data: post } = await supabase.from('posts').select().match({ slug }).single()
   
    const content = {__html : post?.description || ''};
    const imageUrls = post?.images ? post.images.split(",") : [];

    if (!post) {
      notFound()
    }

  return (
    <section>
      <div className="flex flex-wrap gap-5">
      {imageUrls.map((url ,index) => (
        <div key={index}>
          <Image 
            src={url}
            alt={post.title || ''}
            height='500'
            width='500'
            className="flex flex-wrap w-60 object-cover block aspect-[16/9] rounded-md"
          />
        </div>
      ))}
      </div>
    <h1 className='text-2xl font-bold mt-5 mb-2'>
      {post.title}
    </h1>
    <div dangerouslySetInnerHTML={content} />
  </section>
  );
}