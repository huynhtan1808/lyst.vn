"use client";

import React from "react";
import toast from "react-hot-toast";
import { useUser } from '@/contexts/AuthContext';
import Button from "@/components/shared/Button"
import { HiOutlineLogout } from "react-icons/hi";
import TextIcon from "@/components/shared/TextIcon";



type Props = {};

const LogoutButton = (props: Props) => {

  const { supabase } = useUser();

  const logout = async () => {
    const loadingToast = toast.loading("Đang đăng xuất...");
    // logic
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message, {
        id: loadingToast,
      });
    } else {
      toast.success("Bạn đã đăng xuất.", {
        id: loadingToast,
      });
    }
  };

  return (
    <div>
      <Button
      className="w-full text-red-500"
      onClick={logout}
      LeftIcon={HiOutlineLogout}
      label="Đăng xuất"
      />
    </div>
  );
};

export default LogoutButton;