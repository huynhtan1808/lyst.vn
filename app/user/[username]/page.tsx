import Description from '@/components/shared/Description';
import { supabaseClient } from '@/lib/supabase-browser'
import { notFound } from 'next/navigation'
import Section from "@/components/shared/Section";
import Avatar from '@/components/shared/Avatar';
import PostCardFeed from '@/components/shared/PostCardFeed';


const supabase = supabaseClient();

export async function generateStaticParams() {
  const { data: profiles } = await supabase
    .from('users')
    .select('username')

  return profiles?.map(({ username }) => username) || []
}

export default async function UserPage({ 
  params: { username }
} : { 
    params: { username: string } 
  }) 
  {

    const { data: profile } = await supabase
    .from('users')
    .select("id, name, username, avatar_url, bio, bannerUrl")
    .match({ username })
    .single()

    if (!profile) {
      notFound()
    }

    const { data: posts } = await supabase
    .from('posts')
    .select('id, slug, title, images, user:users!user_id(*)')
    .eq('user_id', profile.id)

  return (
    <div className="w-full">
        <div className="bg-gray-100 w-full flex items-center">
          <Section className="px-0 overflow-hidden relative mx-auto w-full h-[200px]">
            <div className="relative w-full h-full">
              {profile.bannerUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.bannerUrl}
                  className="w-full h-full object-cover"
                  alt="profile banner"
                />
              ) : (
                <div className="w-full h-full bg-gray-100"></div>
              )}
            </div>
          </Section>
        </div>
        <Section className="bg-gray-50 -mt-12 flex flex-col md:flex-row gap-4 md:items-center justify-between pt-6 w-full">
          <div className="w-full relative flex flex-col md:flex-row gap-4 mx-5">
            <div className="border-4 bg-gray-100 border-gray-100 rounded-full w-24 h-24">
              <Avatar
                src={profile.avatar_url}
                className="!w-full !h-full"
              />
            </div>

            <div className="md:pt-10 space-y-2">
              <div className="flex flex-col center gap-2">
                <h1 className="text-xl font-bold">{profile.name}</h1>

                <h3 className="flex items-center text-lg text-gray-400">
                  @{profile.username}
                </h3>
              </div>

              <Description
                description={
                  profile.bio ||
                  "Chưa có mô tả"
                }
              />
            </div>
          </div>
        </Section>

        <div className="mt-5">
        {posts ? (
          posts.map((post: any) => {
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
          })
        ) : (
          <p>Chưa có bài đăng nào.</p>
        )}
      </div>
    </div>
  );
}