import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="">
      <div className="">
       <h1 className='text-3xl font-bold'>Home</h1>
      </div>
    </main>
  )
}
