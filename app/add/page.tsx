import supabase from '../../lib/supabase-browser'
import RealtimePosts from '@/components/Newpost'

export const revalidate = 0

export default async function Realtime() {
  const { data } = await supabase.from('posts').select('*')
  return <RealtimePosts serverPosts={data} />
}