import React from "react";
import Image from '@/components/shared/Image'
import Link from 'next/link'

type Props = {
  id: string;
  slug: string;
  title: string;
  images: string;
};

const PostCard = ({ id, slug, title, images }: Props) => {
  return (
        <div 
        key={id}
        className="py-5"
        >
        <Link href={`/blog/${slug}`}>
          <div className="w-28 h-28">
            <Image
              src={images}
              alt={title}
              layout="fill"
              objectFit="cover"
              unoptimized
              className="rounded w-28 h-28"
            />
          </div>
          <h2 className="text-sm p-2">{title}</h2>
        </Link>
    </div>
  );
};

export default PostCard;