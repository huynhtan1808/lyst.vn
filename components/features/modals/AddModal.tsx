'use client';

import { useCallback, useState, useEffect } from "react";
import { useUser } from '@/contexts/AuthContext';
import toast, { Toaster } from "react-hot-toast";
import { Database } from '@/db_types'
import { redirect } from 'next/navigation';
import slugify from 'slugify';

import useAddModal from "@/hooks/useAddModal";
import Modal from "./Modal";
import Button from "@/components/shared/Button";
import Editor from "@/components/shared/Editor"
import ImageUpload from '@/components/features/upload/ImageUpload';
import UploadContainer from "@/components/features/upload/UploadContainer";
import useImageUpload from '@/hooks/useCloudinary';
import TextInput from '@/components/shared/TextInput';

type Posts = Database['public']['Tables']['posts']['Row']


const AddModal = () => {
  const { user , supabase } = useUser();
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState<Posts['title']>()
  const [description, setDescription] = useState<Posts['description']>()
  const [slug, setSlug] = useState<Posts['slug']>(null)
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { uploadImages } = useImageUpload();

  const addModal = useAddModal();

  const handleTitleChange = async (e:any) =>  {
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

  const handleFormSubmit = async () =>  {

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

  const bodyContent = (
    <div>
      <UploadContainer isVerified={user?.isVerified}>
      <div>
      <form onSubmit={handleFormSubmit}>
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
  )

  return (
    <Modal
      disabled={loading}
      isOpen={addModal.isOpen}
      title="Đăng tin mới"
      actionLabel="Continue"
      onClose={addModal.onClose}
      onSubmit = {handleFormSubmit}
      body={bodyContent}
      className="w-full"
    />
  );
}

export default AddModal;