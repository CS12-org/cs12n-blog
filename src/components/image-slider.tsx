'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import '../assets/styles/main.css';
// import required modules
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import { FC } from 'react';
import { ImageData } from '~/service/posts';

type ImageSliderProps = { slideImages: ImageData[] };
export const ImageSlider: FC<ImageSliderProps> = ({ slideImages }) => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
      {slideImages?.map((slideImage) => (
        <SwiperSlide>
          <div className="relative w-full h-64">
            <Image
              alt={`slideImage-${slideImage?.id}`}
              src={
            slideImage?.url?.startsWith('http')
              ? slideImage?.url
              : `https://cms.cs12.ir${slideImage?.url}`
              }
              className="rounded-tl-[10px] rounded-tr-[10px] object-cover"
              fill
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
