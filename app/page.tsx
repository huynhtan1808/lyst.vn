import { createServerClient } from '@/lib/supabase-server'
import PostCardFeed from '@/components/shared/PostCardFeed'
import PostSwiper from '@/components/shared/PostSwiper'
import Button from '@/components/shared/Button'
import Link from 'next/link'

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
    <PostSwiper />
    <div className="mt-5">
    <Link href="/add">
      <Button primary className="block w-full justify-center font-bold">
        Đăng tin
      </Button>
      </Link>
    </div>
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
