'use client';

import { useState } from "react";
import Link from "next/link";
import { useUser } from '@/contexts/AuthContext';
import Avatar from "@/components/shared/Avatar";
import LogoutButton from "../LogoutButton";
import Button from "@/components/shared/Button";
import TextIcon from "@/components/shared/TextIcon";
import { AiOutlineControl, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";

import Popover from "@/components/shared/Popup";
import SidebarItem from './SidebarItem';
import toast from "react-hot-toast";


const items = {
    icon: AiOutlineMenu,
    label: 'Cài đặt',
  }


export default function Profile() {

  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const { supabase } = useUser();

  const logout = async () => {
    const loadingToast = toast.loading("logging out");
    // logic
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message, {
        id: loadingToast,
      });
    } else {
      toast.success("You are logged.", {
        id: loadingToast,
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!user) return null;
  
  return (
    <div>
      <Popover
      trigger={
          <SidebarItem
            icon={items.icon} 
            label={items.label}
            className="flex flex-row items-center"
            />
      }
      isOpen={isOpen}
      onClose={handleClose}
      content={
      <div>
      <div className="space-y-2 p-2">
        <Link href={`/user/${user.username}`}>
          <Button label="" className="w-full">
            <TextIcon LeftIcon={AiOutlineUser}>Hồ sơ</TextIcon>
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button label="" className="w-full">
            <TextIcon LeftIcon={AiOutlineControl}>Bảng điều khiển</TextIcon>
          </Button>
        </Link>
        <Button label="" onClick={logout} className="w-full">
            <TextIcon LeftIcon={HiOutlineLogout}>Đăng xuất</TextIcon>
        </Button>
      </div>
      </div>
      }
      
>
  </Popover>
    </div>
  );
};