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
        className="py-2"
        >
        <Link href={`/blog/${slug}`}>
          <div>
            <Image
              src={images}
              alt={title}
              width={"300"}
              height={"500"}
              className="rounded object-cover aspect-[3/4]"
            />
          </div>
          <h2 className="text-sm p-2">{title}</h2>
        </Link>
    </div>
  );
};

export default PostCard;