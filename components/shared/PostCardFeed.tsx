import Image from '@/components/shared/Image'
import Link from 'next/link'
import Avatar from "./Avatar";


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
        <div className='flex flex-wrap gap-1'>
          {images.length === 1 ? (
            <Image
              src={images[0]}
              alt={title}
              width={"620"}
              height={"500"}
              className="object-cover"
            />
          ) : (
            images.map((image: string, index: number) => (
              <Image
                key={index}
                src={image}
                alt={title}
                width={"500"}
                height={"500"}
                className="flex flex-wrap w-36 md:w-[270px] object-cover block aspect-[1/1]"
              />
            ))
          )}
          {images.length - 4 > 1 && (
            <div className="text-center">
              <p className="text-sm text-gray-400">+{images.length - 4} more</p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PostCardFeed;
