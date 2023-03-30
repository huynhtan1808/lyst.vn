'use client';

import Link from 'next/link';
import { useUser } from '@/contexts/AuthContext';
import UserCard from "@/components/shared/UserCard";
import Button from "@/components/shared/Button"
import Footer from '@/components/partials/Footer';
import TextIcon from './TextIcon';
import { FcGoogle } from "react-icons/fc";



export default function RightSidebar() {
  const {user} = useUser();

  return (
    <aside>
    <div className="px-6 hidden lg:block">
      <div>
        <div className="flex flex-col gap-6 mt-4">
          {user ? (
              <UserCard
              avatar={user.avatar_url}
              name={user.name}
              username={user.username}
              />
              ) : (
              <div className="block items-center px-4">
                <Link href={"/login"}>
                    <Button className="shadow px-3 py-2 relative bg-white text-black flex items-center justify-center w-full hover:shadow-lg">
                      <TextIcon LeftIcon={FcGoogle} className="line-clamp-1">Đăng nhập</TextIcon>
                    </Button>
                </Link>
              </div>
              )}
        </div>
        <Footer />
      </div>
      </div>
    </aside>
  );
}