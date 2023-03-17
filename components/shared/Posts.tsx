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
        <div key={id}>
        <Link href={`/blog/${slug}`}>
        <Image 
        src={featured_image}
        alt="abc" 
        height='300'
        width='500'
        className="object-cover block aspect-[16/9] rounded-md transition-transform duration-400 photo-zoom"
        />
        <h2 className="font-bold p-2">{title}</h2>
        </Link>
    </div>
  );
};

export default BlogPosts;