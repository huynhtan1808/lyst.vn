'use client';

import { useCallback, useState, useEffect, useMemo } from "react";
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

enum STEPS {
    IMAGES = 0,
    INFO = 1,
  }

const AddModal = () => {
  const { user , supabase } = useUser();
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState<Posts['title']>()
  const [description, setDescription] = useState<Posts['description']>()
  const [slug, setSlug] = useState<Posts['slug']>(null)
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { uploadImages } = useImageUpload();

  const [step, setStep] = useState(STEPS.IMAGES);

  const addModal = useAddModal();

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const handleTitleChange = async (e : any) =>  {
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
    if (!selectedImages || selectedImages.length === 0) {
        toast.error('Vui lòng chọn ít nhất 1 ảnh.');
        setLoading(false);
        return;
    }

    if (step !== STEPS.INFO) {
        return onNext();
      }

    if (!title) {
    toast.error('Vui lòng nhập tiêu đề và mô tả.');
    setLoading(false);
    return;
    }

    setLoading(true);

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

      if (error) {
        toast.error(error.message);
      };

      toast.success('Đã đăng!');
      addModal.onClose();
    } catch (error) {
        toast.error('Something went wrong.');
        console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Đăng tin'
    }

    return 'Tiếp tục'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) {
      return undefined
    }

    return 'Quay lại'
  }, [step]);

  let bodyContent = (
    <div>
      <UploadContainer isVerified={user?.isVerified}>
        <label htmlFor="Images">Hình ảnh</label>
        <ImageUpload value={selectedImages} onChange={setSelectedImages} />
      </UploadContainer>
    </div>
  )

  if (step === STEPS.INFO) {
    bodyContent = (
        <div>
        <UploadContainer isVerified={user?.isVerified}>
        <div>
          <TextInput
            id="title"
            label="Tiêu đề"
            value={title}
            onChange={handleTitleChange}
            required
          />
  
          <label htmlFor="Description">Mô tả</label>
          <Editor
            className="rounded-md"
            description={description}
            setDescription={setDescription}
          />
        </div>
        </UploadContainer>
      </div>
    );
  }

  return (
    <Modal
      disabled={loading}
      isOpen={addModal.isOpen}
      title="Đăng tin mới"
      actionLabel={actionLabel}
      onClose={addModal.onClose}
      onSubmit={handleFormSubmit}
      body={bodyContent}
      secondaryAction={step === STEPS.IMAGES ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      className="w-full"
    />
  );
}

export default AddModal;