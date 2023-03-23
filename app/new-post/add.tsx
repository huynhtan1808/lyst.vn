'use client';

import { useState, useEffect, useRef } from 'react'
import { useUser } from '@/contexts/AuthContext';
import { Database } from '@/db_types'
import { redirect } from 'next/navigation';

import Button from "@/components/shared/Button"
import Editor from "@/components/shared/Editor"
import Image from '@/components/shared/Image';

type Posts = Database['public']['Tables']['posts']['Row']

const initialState = {
  title: "",
  description: "",
  slug: "",
  images: "",
};

export default function AddPost() {

  const { user , supabase } = useUser();
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState<Posts['title']>(null)
  const [description, setDescription] = useState<Posts['description']>(null)
  const [slug, setSlug] = useState<Posts['slug']>(null)
  const [user_id] = useState<Posts['user_id']>(null)
  const [images, setImages] = useState<Posts['images']>(null)
  const [imageData, setImageData] = useState(initialState);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState([]);




  if (!user) {
    redirect("/login")
  }

  const handleImageInputChange = (e : any) => {
    setSelectedImages(e.target.files);
  }

  async function addPost({
    title,
    description,
    slug,
    images,
  } : {
    title: Posts["title"];
    description: Posts["description"];
    slug: Posts["slug"];
    images: Posts['images'];
    user_id: Posts["user_id"];
  }) {
    try {
      if (!imageInputRef.current?.files || imageInputRef.current?.files.length === 0) {
        // You could set some error message in a state here.
        return;
      }
  
      setLoading(true);

      const imageUrls = [];
  
      for (let i = 0; i < imageInputRef.current.files.length; i++){
        const file = imageInputRef.current.files[i];
  
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "c_tags");
  
        const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_API}`, {
          method: "POST",
          body: data,
        });
  
        const returnedFile = await res.json();
        imageUrls.push(returnedFile.secure_url);
      }
      const images = imageUrls.join(',');
      
      const updates = {
          title,
          description,
          slug,
          images: images,
          created_at: new Date().toISOString(),
          user_id: user?.id,
        };
  
        let { error } = await supabase.from("posts").upsert(updates);
        if (error) throw error;
    
  
      alert("Published!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      <div>
      <form
          className="mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ title, description, slug, images, user_id })
          }}
        >
        <input
          id="images"
          type="file"
          className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageInputChange}
          multiple
        />
        <div className='flex'>
        {selectedImages &&
        Array.from(selectedImages).map((image, index) => (
          <img
            className='w-20 h-20'
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Image ${index + 1}`}
          />
        ))}
        </div>
       
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
   
        
        <label htmlFor="Description">Content</label>
        <Editor
            description={description}
            setDescription={setDescription}
        />
    
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          type="text"
          className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={slug || ''}
          onChange={(e) => setSlug(e.target.value)}
        />
          <div>
        <Button
          primary
          className="mt-5 bg-red-500"
          type="submit"
        >
            Publish
        </Button>
        </div>
        </form>
      </div>
    </div>
  );
}