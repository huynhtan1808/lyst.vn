'use client'


import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '@/db_types'
type Posts = Database['public']['Tables']['posts']['Row']

const initialState = {
  title: "",
  content: "",
  slug: "",
  featured_image: "",
};

export default function FeaturedImage({
  url,
  size,
  onUpload,
}: {
  
  url: Posts['featured_image']
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = useSupabaseClient<Database>()
  const [featured_image, setFeaturedImage] = useState<Posts['featured_image']>(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState(false);



  //handle image function

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

  const setFeaturedImage = async () => {
    const res = await supabase.from("posts").insert([
      {
        featured_image: `${formData.featured_image}`,
      },
    ]);
    if (res.error === null && res.status === 201) {
      setStatus(true);
      setFormData(initialState);
      setTimeout(() => {
        setStatus(false);
      }, 5000);
    }
  };


  return (
    <div>
      <div>
        <label className="block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={(e) => handleImage(e)}
          disabled={uploading}
        />
      </div>
    </div>
  )
}