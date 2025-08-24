

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import Home from "~/assets/images/home.svg"
import Telephone from "~/assets/images/telephone.svg"
import Help from "~/assets/images/help.svg"
import About from "~/assets/images/aboutus.svg"

export default function Footer() {
  const pathname = usePathname()

  const links = [
    { href: "/about", label: "درباره ما", icon: About },
    { href: "/", label: "خونه", icon: Home },
    { href: "/contact", label: "تماس با ما", icon: Telephone },
    { href: "/help", label: "کمک!", icon: Help },
  ]

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <section className="bg-crust lg:hidden justify-between flex rounded-t-[11px] px-[50px] pt-[20px] pb-[10px] gap-[20px] text-overlay-1 text-[12px]">
      {links.map((link) => {
        const active = isActive(link.href)
        const Icon = link.icon
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-[5px] ${
              active ? "bg-base w-[40px] h-[40px] translate-y-[0px] rounded-[6px]" : ""
            }`}
          >
            <Icon
              className={`w-[22px] h-[22px] transition-transform duration-200 ${
                active ? "translate-y-[8px]" : ""
              }`}
            />
            {!active && <span>{link.label}</span>}
          </Link>
        )
      })}
    </section>
  )
}

