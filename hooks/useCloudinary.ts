import { useState } from 'react';

const useImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const uploadImages = async (selectedImages:any) => {
    setLoading(true);
    setError(null);
    const imageUrls = [];

    try {
      for (let i = 0; i < selectedImages.length; i++){
        const file = selectedImages[i];

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

      setLoading(false);
      return imageUrls.join(',');
    } catch (err:any) {
      setLoading(false);
      setError(err.message);
    }
  }

  return { uploadImages, loading, error };
}

export default useImageUpload;
