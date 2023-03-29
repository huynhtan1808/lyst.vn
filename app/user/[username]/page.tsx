
import { supabaseClient } from '@/lib/supabase-browser'
import { notFound } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton';
export const dynamic = 'force-static'

const supabase = supabaseClient();

export async function generateStaticParams() {
  const { data: profiles } = await supabase.from('users').select('username')
  return profiles?.map(({ username }) => username) || []
}

export default async function Profile({ params: { username } }: { params: { username: string } }) {
  const { data: profile } = await supabase.from('users').select().match({ username }).single()


  if (!profile) {
    notFound()
  }

  return (
    <section>
      <h1 className='text-2xl font-bold'>
        Hi, {username}
      </h1>
      <p>
        <LogoutButton />
      </p>
    </section>
  );
}