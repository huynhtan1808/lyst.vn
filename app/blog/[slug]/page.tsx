
import { supabaseClient } from '@/lib/supabase-browser'
import { notFound } from 'next/navigation'
import Image from '@/components/shared/Image'
import SinglePost from '@/components/shared/Singlepost'

const supabase = supabaseClient();

export async function generateStaticParams() {
  const { data: posts } = await supabase.from('posts').select("*, user:users!user_id(*)")

  return posts?.map(({ slug }) => slug) || []
}

export default async function Post({ 
  params: { slug } }: { params: { slug: string } }) {


    const { data: post } = await supabase
    .from('posts')
    .select('id, slug, title, images, description, user_id, user:users!user_id(*)')
    .match({ slug })
    .single()


   
    if (!post) {
      notFound()
    }
    
    const imageUrls = post.images ? post.images.split(",") : [];

    const user = Array.isArray(post.user) ? post.user[0] : post.user;

    return (
      <SinglePost
        userAvatar={user?.avatar_url}
        name={user?.name}
        username={user?.username}
        images={imageUrls}
        title={post.title}
        description={post.description}
      />
    );
}