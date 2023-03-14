import Image from 'next/image'
import { Inter } from '@next/font/google'
import RealtimePosts from './new-post/realtime-posts';
import { createServerClient } from '@/lib/supabase-server';


const inter = Inter({ subsets: ['latin'] })

export default async function Home() {

  const supabase = createServerClient()

  const { data } = await supabase.from('posts').select('*')


  return (
    <main className="">
      <div className="">
       <h1 className='text-3xl font-bold'>Home</h1>
      </div>
      <RealtimePosts serverPosts={data} />
    </main>
  )
}
