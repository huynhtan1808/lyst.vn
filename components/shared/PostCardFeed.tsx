import Image from '@/components/shared/Image'
import Link from 'next/link'
import Avatar from "./Avatar";
import {FiImage} from "react-icons/fi"


type Props = {
  id: string;
  slug: string;
  title: string;
  images: string[];
  userAvatar: string;
  name: string;
  username: string;
};

const PostCardFeed = ({ id, slug, title, images, userAvatar, name, username }: Props) => {
  return (
    <div key={id} className="py-5 border-b border-gray-200">
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
        <h2 className="py-2">{title}</h2>
        <div className='relative'>
          <Image
            src={images[0]}
            alt={title}
            width={"620"}
            height={"500"}
            className="object-cover"
          />
          {images.length > 1 && (
            <div className='absolute flex bg-white/30 items-center text-sm top-1 right-1 text-white p-1 rounded-md'>
              <FiImage className="w-4 h-4 mr-1"/>{images.length - 1}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PostCardFeed;
