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

  return (
    <div>
      <Button
      className="w-full text-red-500"
      onClick={logout}
      >
        <TextIcon LeftIcon={HiOutlineLogout}> Logout</TextIcon>
      </Button>
    </div>
  );
};

export default LogoutButton;