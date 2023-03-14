import React from "react";
import Image from '@/components/shared/Image'
import Link from 'next/link'

type Props = {
  id: string;
  slug: string;
  title: string;
  featured_image: string;
};

const BlogPosts = ({ id, slug, title, featured_image }: Props) => {
  return (
        <div 
        className="bg-gray-100 border border-gray-200"
        key={id}>
        <Link href={`/blog/${slug}`}>
        <Image 
        src={featured_image}
        alt="abc" 
        height='100'
        width='200'
        className="object-cover w-46 h-36"
        />
        <h2 className="font-bold p-2">{title}</h2>
        </Link>
    </div>
  );
};

export default BlogPosts;