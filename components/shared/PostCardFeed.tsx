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
        className="py-5 border-t border-gray-200"
        >
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