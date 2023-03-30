import Link from 'next/link'
import Avatar from "./Avatar";


type Props = {
  avatar: string;
  name: string;
  username: string;
};

const UserCard = ({ avatar, name, username }: Props) => {
  return (
  <Link href={`/user/${username}`}>
    <div className="flex text-sm items-center py-2 space-x-2">
      <Avatar src={avatar}/>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-gray-300 capitalize">{username}</p>
      </div>
    </div>
  </Link>
  );
};

export default UserCard;