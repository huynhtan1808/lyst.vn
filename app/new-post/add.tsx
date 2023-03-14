'use client';

import { useState, useEffect } from 'react'
import { useSupabase } from '@/components/SupabaseProvider';
import { Database } from '@/db_types'
import Button from "@/components/shared/Button"

type Posts = Database['public']['Tables']['posts']['Row']

const initialState = {
  title: "",
  content: "",
  slug: "",
  featured_image: "",
};

export default function AddPost() {
  const { supabase, session } = useSupabase();

  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState<Posts['title']>(null)
  const [content, setContent] = useState<Posts['content']>(null)
  const [slug, setSlug] = useState<Posts['slug']>(null)
  const [user_id, setUserID] = useState<Posts['user_id']>(null)
  const [featured_image, setFeaturedImage] = useState<Posts['featured_image']>(null)
  const [formData, setFormData] = useState(initialState);



  const handleImage = async (e) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      setLoading(true);
    };
    const files = e.target.files[0];
    if (!files) return;
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "c_tags");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dld0jgbne/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setFormData({ ...formData, featured_image: file.secure_url });
    setLoading(false);
  };

  
  async function addPost({
    title,
    content,
    slug,
    featured_image,
    user_id,
  }: {
    title: Posts['title']
    content: Posts['content']
    slug: Posts['slug']
    featured_image: Posts['featured_image']
    user_id: Posts['user_id']
  }) {
    try {
        setLoading(true)

        const updates = {
          title,
          content,
          slug,
          featured_image : `${formData.featured_image}`,
          created_at: new Date().toISOString(),
          user_id: session.user.id
        }

        let { error } = await supabase.from('posts').upsert(updates)
        if (error) throw error
        alert('Published!')
        } catch (error) {
        alert('Error updating the data!')
        console.log(error)
        } finally {
        setLoading(false)
        }
    }
   
  return (
    <div className="max-w-3xl mx-auto">
      <div>
      <form
          className="mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ title, content, slug, featured_image, user_id })
          }}
        >
        <input
          id="featured_image"
          type="file"
          className="relative block w-full appearance-none rounded-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          accept="image/*"
          onChange={(e) => handleImage(e)}
        />

        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className="relative block w-full appearance-none rounded-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
        />
   
        <label htmlFor="Content">Content</label>
        <input
          id="content"
          type="text"
          className="relative block w-full appearance-none rounded-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={content || ''}
          onChange={(e) => setContent(e.target.value)}
        />
    
    
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          type="text"
          className="relative block w-full appearance-none rounded-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={slug || ''}
          onChange={(e) => setSlug(e.target.value)}
        />
          <div>
          <Button
            className="mt-5 bg-red-500"
            onClick={() => addPost({ title, content, slug, user_id, featured_image  })}
          >
            Publish
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
}