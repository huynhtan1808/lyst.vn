'use client';

import { useCallback, useState } from "react";

import Link from 'next/link';
import { useUser } from '@/contexts/AuthContext';
import UserCard from "@/components/shared/UserCard";
import Button from "@/components/shared/Button"
import Footer from '@/components/partials/Footer';
import TextIcon from './TextIcon';
import { FcGoogle } from "react-icons/fc";
import useLoginModal from "@/hooks/useLoginModal";
import SidebarItem from './SidebarItem';



export default function RightSidebar() {
  const {user} = useUser();
  const loginModal = useLoginModal();
 


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
              <Button
              primary
              onClick={loginModal.onOpen}
              className="justify-center"
              >
                Đăng nhập
              </Button>
              )}
        </div>
        <Footer />
      </div>
      </div>
    </aside>
  );
}