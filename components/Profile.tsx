import React from "react";
import LogoutButton from "./LogoutButton";

type Props = {
  email: string;
  id: string;
};

const Profile = ({ email, id }: Props) => {
  return (
    <div className="w-3xl h-auto space-y-2">
      <p>Hello</p>
      <h2 className="text-lg font-bold">Email</h2>
      <p>{email}</p>
      <h2 className="text-lg font-bold">Id</h2>
      <p>{id}</p>
      
      <LogoutButton />
    </div>
  );
};

export default Profile;