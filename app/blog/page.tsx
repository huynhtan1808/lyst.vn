
import { supabaseClient } from '../../lib/supabase-browser'
import PostCardFeed from '@/components/shared/PostCardFeed'

export const revalidate = 0

const sleep = (ms:any) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default async function Posts() {

  const supabase = supabaseClient();

  await sleep(5000);

  const { data: posts } = await supabase.from('posts').select('id, slug, title, images')

  if (!posts) {
    return <p>No posts found.</p>
  }
  return (
  <>
  <h2 className="text-xl font-bold">Khám phá</h2>
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