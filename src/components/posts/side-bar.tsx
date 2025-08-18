

"use client"
import { useState } from "react"
import Arrow from "~/assets/images/sidebar-arrow.svg"

export default function PostSideBar({ className = "" }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section
      className={`flex flex-col mt-[370px] transition-all duration-300 z-20
        ${isOpen ? "ml-[-60px]" : "ml-[20px]"} ${className}`}
    >
      <section 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-crust p-[10px] rounded-[10px] cursor-pointer"
      >
        <Arrow className="w-[27px] h-[27px] rounded-[3px] p-[5px] bg-base" />
      </section>
    </section>
  )
}

