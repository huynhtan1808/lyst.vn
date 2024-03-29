"use client"

import React, { useRef } from 'react';
import {
  Swiper as ReactSwiper,
  SwiperSlide as ReactSwiperSlide,
} from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import type SwiperClass from "swiper/types/swiper-class";

import 'swiper/swiper-bundle.css';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import CircleButton from "@/components/shared/CircleButton";
import classNames from "classnames";

export type SwiperInstance = SwiperClass;

export interface SwiperProps extends React.ComponentProps<typeof ReactSwiper> {
  hideNavigation?: boolean;
  isOverflowHidden?: boolean;
  defaultActiveSlide?: number;
}
SwiperCore.use([Autoplay, Navigation]);


const Swiper: React.FC<SwiperProps> = ({
  children,
  hideNavigation,
  onInit,
  isOverflowHidden = true,
  className,
  defaultActiveSlide,
  ...props
}) => {

  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <ReactSwiper
      className={classNames(
        isOverflowHidden ? "!overflow-hidden" : "!overflow-visible",
        className
      )}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      breakpoints={{
        1536: {
          slidesPerView: 5,
          slidesPerGroup: 1,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView:4,
          slidesPerGroup: 1,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          slidesPerGroup: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
        0: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
      }}
      grabCursor
      onInit={(swiper) => {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        swiper.params.navigation.prevEl = prevButtonRef.current;
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        swiper.params.navigation.nextEl = nextButtonRef.current;
        swiper.navigation.update();

        if (defaultActiveSlide) {
          swiper.slideTo(defaultActiveSlide);
        }

        onInit?.(swiper);
      }}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <SwiperSlide className=''>{child}</SwiperSlide>
      ))}
      {!hideNavigation && (
        <div slot="container-end" className="swiper-navigation">
        <CircleButton
          ref={prevButtonRef}
          outline
          className="swiper-button-prev flex items-center justify-center"
          label=''
        />
         <CircleButton
          ref={nextButtonRef}
          outline
          className="swiper-button-next flex items-center justify-center"
          label=''
        />
      </div>     
      )}
    </ReactSwiper>
  );
};
export const SwiperSlide = ReactSwiperSlide;

export default Swiper;
