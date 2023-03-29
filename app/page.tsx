import { createServerClient } from '@/lib/supabase-server'
import PostCardFeed from '@/components/shared/PostCardFeed'
import PostSwiper from '@/components/shared/PostSwiper'
import AddPost from './dashboard/post/add/page'

export const revalidate = 0

export default async function Home() {

  const supabase = createServerClient()

  const { data: posts } = await supabase.from('posts').select('id, slug, title, images')
  if (!posts) {
    return <p>No posts found.</p>
  }

  return (
    <>
    <PostSwiper />
    <div className="mt-5">
      <AddPost/>
    </div>
    <div className="mt-5">
      {posts.map((post: any) => {
      const imageUrls = post.images ? post.images.split(",") : [];
      const imageUrl = imageUrls.shift();
      return (
        <PostCardFeed
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
