
import { supabaseClient } from '../../lib/supabase-browser'
import PostCardFeed from '@/components/shared/PostCardFeed'

export const revalidate = 0

export default async function Posts() {

  const supabase = supabaseClient();

  const { data: posts } = await supabase
  .from('posts')
  .select('id, slug, title, images, user:users!user_id(*)')
  
  if (!posts) {
    return <p>No posts found.</p>
  }
  return (
  <>
  <h1 className="text-xl font-bold">Khám phá</h1>
  <div className="mt-5">
      {posts.map((post: any) => {
      const imageUrls = post.images ? post.images.split(",") : [];
      const imageUrl = imageUrls.shift();
      return (
        <PostCardFeed
          key={post.id}
          id={post.id}
          userAvatar={post.user.avatar_url}
          name={post.user.name}
          username={post.user.username}
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