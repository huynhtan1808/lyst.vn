import React from "react";
import Profile from "@/components/Profile";
import { createServerClient } from "@/lib/supabase-server";

type Props = {};

async function userProfile({}: Props) {
  const supabase = createServerClient();

  // fetch user data
  const fetchUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    return { user };
  };

  const { user } = await fetchUser();

  return (
    <div className="flex flex-col min-h-full py-12 px-3 sm:px-6 lg:px-8">
      <Profile email={user?.email || ""} id={user?.id || ""} />
    </div>
  );
}

export default userProfile;