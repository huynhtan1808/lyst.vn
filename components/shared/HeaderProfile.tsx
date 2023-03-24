'use client';

import { useState } from "react";
import Link from "next/link";
import { useUser } from '@/contexts/AuthContext';
import Avatar from "@/components/shared/Avatar";
import LogoutButton from "../LogoutButton";
import Button from "@/components/shared/Button";
import TextIcon from "@/components/shared/TextIcon";
import { AiOutlineUpload, AiOutlineUser } from "react-icons/ai";
import Popover from "@/components/shared/Popup";


export default function HeaderProfile() {

  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!user) return null;
  
  return (
    <div>
      <Popover
      trigger={<Avatar src={user.avatar_url} className="h-8 w-8"/>}
      isOpen={isOpen}
      onClose={handleClose}
      content={
        <div>
        <div className="flex items-center px-3 py-2 space-x-2">
        <Avatar src={user.avatar_url} />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-gray-300 text-sm">User</p>
        </div>
      </div>
      <div className="space-y-2">
        <Link href={`/users/${user.username}`}>
          <Button className="w-full">
            <TextIcon LeftIcon={AiOutlineUser}>Profile</TextIcon>
          </Button>
        </Link>
        <Link href="/new-post">
          <Button className="w-full">
            <TextIcon LeftIcon={AiOutlineUpload}>Upload</TextIcon>
          </Button>
        </Link>
        <LogoutButton />
      </div>
      </div>
      }
      
>
  </Popover>
    </div>
  );
};