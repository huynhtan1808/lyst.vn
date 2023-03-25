"use client"

import CircleButton from "@/components/shared/CircleButton";
import Image from "@/components/shared/Image";
import TextIcon from "@/components/shared/TextIcon";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { AiFillHeart, AiFillPlayCircle } from "react-icons/ai";
import { MdTagFaces } from "react-icons/md";
import Skeleton, { SkeletonItem } from "./Skeleton";

interface HomeBannerProps {
  isLoading?: boolean;
}

const bannerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const transition = [0.33, 1, 0.68, 1];

const HomeBanner: React.FC<HomeBannerProps> = ({ isLoading }) => {
  return (
    <React.Fragment>
      <BrowserView>
        {isLoading ? (
          <DesktopHomeBannerSkeleton />
        ) : (
          <DesktopHomeBanner />
        )}
      </BrowserView>

      <MobileView className="overflow-hidden px-4 pt-20 pb-8 md:px-12">
        {isLoading ? (
          <MobileHomeBannerSkeleton />
        ) : (
          <MobileHomeBanner />
        )}
      </MobileView>
    </React.Fragment>
  );
};

const MobileHomeBanner: React.FC<HomeBannerProps> = () => {

  return (
    <React.Fragment>
    <div className="group relative w-full overflow-hidden md:h-[450px] xl:h-[500px] 2xl:h-[550px]">
      <AnimatePresence>
          <motion.div
            variants={bannerVariants}
            animate="animate"
            exit="exit"
            initial="initial"
            className="h-0 w-full"
            key="{title}"
          >
            <Image
              src="https://res.cloudinary.com/dld0jgbne/image/upload/v1679650976/local-uploads/ms3ge09uzhneexgqpv1l.webp"
              layout="fill"
              objectFit="cover"
              objectPosition="50% 35%"
              alt=""
            />
          </motion.div>
      </AnimatePresence>
      <div className="banner__overlay absolute inset-0 flex flex-col justify-center px-4 md:px-12"></div>

      <motion.div
        variants={bannerVariants}
        animate="animate"
        initial="initial"
        key="{title}"
        className="absolute left-4 top-1/2 w-full -translate-y-1/2 md:left-12 md:w-[45%] lg:left-20 xl:left-28 2xl:left-36"
      >
        <h1 className="text-2xl font-bold uppercase line-clamp-2 sm:line-clamp-3 md:text-4xl md:line-clamp-4">
          ANC
        </h1>
      </motion.div>
      <div className="banner__overlay--down absolute bottom-0 h-16 w-full"></div>
    </div>
  </React.Fragment>
  );
};

const MobileHomeBannerSkeleton = () => (
  <Skeleton>
    <SkeletonItem className="aspect-w-16 aspect-h-9 rounded-md" />
  </Skeleton>
);

const DesktopHomeBanner: React.FC<HomeBannerProps> = () => {
  const [index, setIndex] = useState<number>(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const isRanOnce = useRef(false);

  return (
    <React.Fragment>
      <div className="group relative w-full overflow-hidden md:h-[350px] xl:h-[400px] 2xl:h-[450px]">
        <AnimatePresence>
            <motion.div
                variants={bannerVariants}
                animate="animate"
                exit="exit"
                initial="initial"
                className="h-0 w-full"
                key="{title}"
            >
              <Image
                src="https://res.cloudinary.com/dld0jgbne/image/upload/v1679650976/local-uploads/ms3ge09uzhneexgqpv1l.webp"
                layout="fill"
                objectFit="cover"
                objectPosition="50% 35%"
                alt=""
              />
            </motion.div>
        </AnimatePresence>
        <div className="banner__overlay absolute inset-0 flex flex-col justify-center px-4 md:px-12"></div>
        <motion.div
            variants={bannerVariants}
            animate="animate"
            initial="initial"
            key="{title}"
            className="md:h-[350px] xl:h-[400px] 2xl:h-[450px] flex mx-auto max-w-6xl items-center translate-y-0"
        >
          <h1 className="text-2xl text-white font-bold uppercase line-clamp-2 sm:line-clamp-3 md:text-4xl md:line-clamp-4">
            LYST
          </h1>
        </motion.div>
      </div>
    </React.Fragment>
  );
};

const DesktopHomeBannerSkeleton = () => (
  <Skeleton className="w-full">
    <SkeletonItem
      className="relative w-full md:h-[450px] xl:h-[500px] 2xl:h-[550px]"
      container
    >
      <SkeletonItem
        className="absolute left-4 top-1/2 w-full -translate-y-1/2 md:left-12 md:w-[45%] lg:left-20 xl:left-28 2xl:left-36"
        container
      >
        <SkeletonItem className="h-12 w-5/6" />

        <SkeletonItem className="mt-2 h-6 w-4/6" />

        <SkeletonItem className="mt-4 h-32 w-full" />
      </SkeletonItem>
    </SkeletonItem>
  </Skeleton>
);

export default React.memo(HomeBanner) as typeof HomeBanner;
