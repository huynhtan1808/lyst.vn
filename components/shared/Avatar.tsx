

import Image from "@/components/shared/Image";
import classNames from "classnames";
import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '@/db_types'

type Profiles = Database['public']['Tables']['users']['Row']


export default function Avatar({
  uid,
  url
}: {
  uid: string
  url: Profiles['avatarUrl']
  
}) {
  const supabase = useSupabaseClient<Database>()
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatarUrl']>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }
        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase.storage])

  return (
    <div>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
        />  
      ) : (
        <div className="avatar no-image"/>
      )}
    </div>
  );
};