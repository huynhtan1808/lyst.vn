'use client';

import { useState } from "react";
import Link from "next/link";
import { useUser } from '@/contexts/AuthContext';
import Avatar from "@/components/shared/Avatar";
import LogoutButton from "../LogoutButton";
import Button from "@/components/shared/Button";
import TextIcon from "@/components/shared/TextIcon";
import { AiOutlineUpload, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import Popover from "@/components/shared/Popup";


export default function Profile() {

  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!user) return null;
  
  return (
    <div>
      <Popover
      trigger={
      <div className="flex items-center px-2 space-x-2 text-lg">
      <AiOutlineMenu className="w-6 h-6"/>
      <div>
        <p>Cài đặt</p>
      </div>
    </div>}
      isOpen={isOpen}
      onClose={handleClose}
      content={
      <div>
      <div className="space-y-2">
        <Link href={`/users/${user.username}`}>
          <Button className="w-full">
            <TextIcon LeftIcon={AiOutlineUser}>Hồ sơ</TextIcon>
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button className="w-full">
            <TextIcon LeftIcon={AiOutlineUpload}>Bảng điều khiển</TextIcon>
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