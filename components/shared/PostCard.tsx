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
        className="py-5 border-b border-gray-200"
        >
        <Link href={`/blog/${slug}`}>
        <Image 
        src={images}
        alt={title}
        height='300'
        width='620'
        className="object-cover block rounded"
        />
        <h2 className="font-bold p-2">{title}</h2>
        </Link>
    </div>
  );
};

export default PostCard;