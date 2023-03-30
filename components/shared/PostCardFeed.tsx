import React from "react";
import Image from '@/components/shared/Image'
import Link from 'next/link'
import Avatar from "./Avatar";


type Props = {
  id: string;
  slug: string;
  title: string;
  images: string;
  userAvatar: string;
  name: string;
  username: string;
};

const PostCard = ({ id, slug, title, images, userAvatar, name, username }: Props) => {
  return (
        <div 
        key={id}
        className="py-5 border-t border-gray-200"
        >

        <Link href={`/user/${username}`}>
        <div className="flex text-sm items-center py-2 space-x-2">
        <Avatar src={userAvatar}/>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-gray-300 capitalize">{username}</p>
        </div>
        </div>
        </Link>
       
        <Link href={`/blog/${slug}`}>
          <div>
            <Image
              src={images}
              alt={title}
              width={"620"}
              height={"500"}
              className="rounded"
            />
          </div>
        <h2 className="py-2">{title}</h2>
        </Link>
    </div>
  );
};

export default PostCard;