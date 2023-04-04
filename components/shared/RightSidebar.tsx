'use client';

import { useUser } from '@/contexts/AuthContext';
import UserCard from "@/components/shared/UserCard";
import Button from "@/components/shared/Button"
import Footer from '@/components/partials/Footer';
import useLoginModal from "@/hooks/useLoginModal";


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