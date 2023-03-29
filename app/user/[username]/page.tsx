import Description from '@/components/shared/Description';
import { supabaseClient } from '@/lib/supabase-browser'
import { notFound } from 'next/navigation'

const supabase = supabaseClient();

export async function generateStaticParams() {
  const { data: profiles } = await supabase
  .from('users')
  .select('username')

  return profiles?.map(({ username }) => username) || []
}

export default async function UserPage({ params: { username } }: { params: { username: string} }) {

  const { data: profile } = await supabase
  .from('users')
  .select("name, username, bio")
  .match({ username })
  .single()

  if (!profile) {
    notFound()
  }

  return (
    <div className="md:pt-16 space-y-2">
              <div className="flex flex-col md:flex-row center gap-4">
                <h1 className="text-4xl font-bold">{profile.name}</h1>

                <h3 className="flex items-center text-2xl text-gray-300">
                  @{profile.username}
                </h3>
              </div>

              <Description
                description={
                  profile.bio ||
                  "This user is busy watching anime so hasn't written anything here yet."
                }
              />
    </div>
  );
}