import Avatar from "@/components/shared/Avatar"
import LogoutButton from "@/components/LogoutButton"
import Button from "@/components/shared/Button"
import { supabaseClient } from "@/lib/supabase-browser"
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";
import { AiOutlineUpload, AiOutlineUser } from "react-icons/ai";

const HeaderProfile = () => {

  return (
      <div className="space-y-2">
        <LogoutButton />
      </div>
  );
};

export default React.memo(HeaderProfile);
