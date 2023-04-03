import Image from '@/components/shared/Image'
import Link from 'next/link'
import Avatar from "./Avatar";
import Swiper, { SwiperSlide } from "@/components/shared/Swiper";

type Props = {
  title: string;
  images: string[];
  description: string;
  userAvatar?: string;
  name?: string;
  username?: string;
};

const SinglePost = ({ title, images, description, userAvatar, name, username }: Props) => {
  
  const content = {__html : description || ''};
  
  return (
    <div className="">
        <div className=''>
          {images.length === 1 ? (
            <Image
              src={images[0]}
              alt={title}
              width={"620"}
              height={"500"}
              className="object-cover"
            />
          ) : (
            <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            breakpoints={{
                1536: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 20,
                },
                1280: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 20,
                },
                1024: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 20,
                },
                768: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 20,
                },
                0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 10,
                },
                }}
            >
            {images.map((image: string, index: number) => (
            <SwiperSlide  key={index}>
              <Image
                key={index}
                src={image}
                alt={title}
                width={"620"}
                height={"500"}
                className="object-cover block aspect-[16/9]"
              />
              </SwiperSlide>
             
            ))}
            </Swiper>
            )}
          
        </div>
        <h1 className='text-2xl font-bold mt-5 mb-2'>{title}</h1>
        <div
        dangerouslySetInnerHTML={content} 
        />
        <div className="mt-5">
        <Link href={`/user/${username}`}>
        <div className="flex text-sm items-center py-2 space-x-2">
          <Avatar src={userAvatar}/>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-gray-300 capitalize">{username}</p>
          </div>
        </div>
      </Link>
      </div>
    </div>
  );
};

export default SinglePost;
