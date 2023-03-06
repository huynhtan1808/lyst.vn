"use client";

import React from "react";
import toast from "react-hot-toast";
import { supabaseClient } from "../lib/supabase-browser";
import Button from "@/components/shared/Button"


type Props = {};
 const supabase = supabaseClient();

const LogoutButton = (props: Props) => {
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
      className="text-red-500"
      onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;