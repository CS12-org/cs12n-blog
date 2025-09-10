'use client';
import { useState } from 'react';
import Arrow from '~/assets/images/sidebar-arrow.svg';

export default function PostSideBar({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className={`z-20 mt-[370px] flex flex-col transition-all duration-300 ${isOpen ? 'ml-[-60px]' : 'ml-[20px]'} ${className}`}
    >
      <section onClick={() => setIsOpen(!isOpen)} className="bg-crust cursor-pointer rounded-[10px] p-[10px]">
        <Arrow className="bg-base h-[27px] w-[27px] rounded-[3px] p-[5px]" />
      </section>
    </section>
  );
}
