
import { supabaseClient } from '@/lib/supabase-browser';
import PostCardFeed from '@/components/shared/PostCardFeed';

export default async function UserPosts() {

  const supabase = supabaseClient();

  const { data: posts } = await supabase
  .from('posts')
  .select('id, slug, title, images, user_id, user:users!user_id(*)')

  if (!posts) {
    return <p>No posts found.</p>;
  }
  
  return (
    <>
      <div>
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
          )
        })}
      </div>
    </>
  );
}
