import { supabaseClient } from '@/lib/supabase-browser'
import { notFound } from 'next/navigation'
import Image from '@/components/shared/Image'

export const dynamic = 'force-static'

const supabase = supabaseClient();

export async function generateStaticParams() {
  const { data: posts } = await supabase.from('posts').select('slug')

  return posts?.map(({ slug }) => ({
    slug,
  }))
}

export default async function Post({ 
  params: { slug } }: { params: { slug: string } }) {
  const { data: post } = await supabase.from('posts').select().match({ slug }).single()
  if (!post) {
    notFound()
  }
  const content = {__html : post?.description};
  const imageUrls = post?.images ? post.images.split(",") : [];

  return (
    <section className="max-w-3xl mx-auto">
      <div>
        {imageUrls.map((url , index) => (
          <div key={index}>
          <Image
          src={url}
          alt="abc"
          height='500'
          width='800'
          className="object-cover block aspect-[16/9] rounded-md"
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