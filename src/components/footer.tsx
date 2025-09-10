'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Home from '~/assets/images/home.svg';
import Telephone from '~/assets/images/telephone.svg';
import Help from '~/assets/images/help.svg';
import About from '~/assets/images/aboutus.svg';

export default function Footer() {
  const pathname = usePathname();

  const links = [
    { href: '/about', label: 'درباره ما', icon: About },
    { href: '/', label: 'خونه', icon: Home },
    { href: '/contact', label: 'تماس با ما', icon: Telephone },
    { href: '/help', label: 'کمک!', icon: Help },
  ];

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <section className="bg-crust text-overlay-1 fixed bottom-0 flex w-[384px] justify-between gap-[20px] rounded-t-[11px] px-[50px] pt-[20px] pb-[10px] text-[12px] md:w-[560px] lg:hidden">
      {links.map((link) => {
        const active = isActive(link.href);
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-[5px] ${
              active ? 'bg-base h-[40px] w-[40px] translate-y-[0px] rounded-[6px]' : ''
            }`}
          >
            <Icon
              className={`h-[22px] w-[22px] transition-transform duration-200 ${active ? 'translate-y-[8px]' : ''}`}
            />
            {!active && <span>{link.label}</span>}
          </Link>
        );
      })}
    </section>
  );
}
