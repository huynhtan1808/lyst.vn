'use client';

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/AuthContext';
import { Database } from '@/db_types'
import { redirect } from 'next/navigation';
import slugify from 'slugify';

import Button from "@/components/shared/Button"
import Editor from "@/components/shared/Editor"
import ImageUpload from '@/components/features/upload/ImageUpload';
import UploadContainer from "@/components/features/upload/UploadContainer";
import useImageUpload from '@/hooks/useCloudinary';
import TextInput from '@/components/shared/TextInput';

type Posts = Database['public']['Tables']['posts']['Row']

export default function AddPost() {
  const { user , supabase } = useUser();
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState<Posts['title']>(null)
  const [description, setDescription] = useState<Posts['description']>(null)
  const [slug, setSlug] = useState<Posts['slug']>(null)
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { uploadImages } = useImageUpload();


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    const slugifiedTitle = slugify(e.target.value, { lower: true });
    setSlug(slugifiedTitle);
  };
  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }
  useEffect(() => {
    if (title) {
      setSlug(generateSlug(title))
    }
  }, [title])

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (!selectedImages || selectedImages.length === 0) {
      alert("Please select at least one image.");
      setLoading(false);
      return;
    }

    try {
      const imageUrls = await uploadImages(selectedImages);
      
      const post = {
        title,
        description,
        slug,
        images: imageUrls,
        user_id: user?.id,
      };

      let { error } = await supabase.from("posts").upsert(post);
      if (error) throw error;

      alert("Published!");
      setTitle("");
      setDescription("");
      setSlug("");
      setSelectedImages([]);
    } catch (error) {
      alert("Error publishing the post.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Đăng tin mới</h2>
      <UploadContainer className="py-4" isVerified={user?.isVerified}>
      <div>
      <form className="mt-3" onSubmit={handleFormSubmit}>
        
        <label htmlFor="Images">Hình ảnh</label>
        <ImageUpload onChange={setSelectedImages} />

        <TextInput
          id="title"
          label="Tiêu đề"
          value={title || ''}
          onChange={handleTitleChange}
          required
        />

        <label htmlFor="Description">Mô tả</label>
        <Editor
          className="rounded-md"
          description={description}
          setDescription={setDescription}
        />
        <div>
        <Button
          primary
          className="mt-5 w-full justify-center"
          type="submit"
        >
            Đăng tin
        </Button>
        </div>
        </form>
      </div>
      </UploadContainer>
    </div>
  );
}