import { createServerClient } from '@/lib/supabase-server'
import PostCardFeed from '@/components/shared/PostCardFeed'
import PostSwiper from '@/components/shared/PostSwiper'

export const revalidate = 0

export default async function Home() {

  const supabase = createServerClient()

  const { data: posts } = await supabase
  .from('posts')
  .select('id, slug, title, images, user:users!user_id(*)')

  if (!posts) {
    return <p>No posts found.</p>
  }

  return (
    <>
    <div className="border-b border-gray-200">
    <PostSwiper />
    </div>
      <div className="mt-5">
        {posts.map((post: any) => {
          const imageUrls = post.images ? post.images.split(",") : [];
          return (
          <PostCardFeed
            key={post.id}
            id={post.id}
            userAvatar={post.user.avatar_url}
            name={post.user.name}
            username={post.user.username}
            images={imageUrls}
            title={post.title}
            slug={post.slug}
          />
        );
      })}
    </div> 
  </>
  )
};
