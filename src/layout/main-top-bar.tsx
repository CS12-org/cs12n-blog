'use client';

import Logo from '@/assets/images/cs12-logo.svg';
import Button from '@/components/button';
import { useMainLayoutStore } from '@/components/providers/main-layout-store-provider';
import { Input, Link, TextField } from '@/components/react-aria-components';
import twMerge from '@/lib/tw-merge';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import { FaArrowRightToBracket, FaBars, FaBook, FaMagnifyingGlass } from 'react-icons/fa6';
import { twJoin } from 'tailwind-merge';
import MainThemeSwitch from './main-theme-switch';

type Props = {
  isBlured?: boolean;
};

const PATH_ICONS: Record<string, ReactNode> = {
  '/': <FaBook size={16} />,
  '/user-panel': <FaBars size={16} />,
  '/user-panel/saved-posts': <FaBars size={16} />,
  '/user-panel/user-level': <FaBars size={16} />,
  '/user-panel/comments': <FaBars size={16} />,
};

export default function MainTopbar({ isBlured = false }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const matchedIcon = PATH_ICONS[pathname];
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(searchParams.get('query') || '');

  const sideBarOpen = useMainLayoutStore((state) => state.isSideBarOpen);
  const toggleIsSideBarOpen = useMainLayoutStore((state) => state.toggleIsSideBarOpen);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <header
      className={twJoin(
        'bg-crust [&>button]:text-overlay-1 relative z-11 mt-8 flex h-17.5 items-center',
        'gap-3.5 rounded-xl px-4 select-none lg:px-7.5 [&>*]:shrink-0',
      )}
    >
      <Link href="/">
        <Logo />
      </Link>
      <div className={twJoin('flex grow items-center gap-3.5')}>
        <nav className="text-body-sm mr-3.5 hidden lg:block">
          <ul className="flex gap-7">
            <li>
              <Link href="#" className="cursor-default select-none">
                جوخه
              </Link>
            </li>
            <li>
              <Link href="#" className="cursor-default select-none">
                بمان تا با
              </Link>
            </li>
            <li>
              <Link href="#" className="cursor-default select-none">
                دوباره
              </Link>
            </li>
            <li className="text-maroon">
              <Link href="#" className="cursor-default select-none">
                کشک
              </Link>
            </li>
          </ul>
        </nav>

        <div aria-hidden className="grow" />

        <div className="flex gap-x-4">
          {matchedIcon && (
            <Button
              variant="none"
              onClick={toggleIsSideBarOpen}
              className={twMerge(
                'bg-base rounded-lg p-3 select-none lg:hidden',
                sideBarOpen && 'bg-sapphire text-crust',
              )}
            >
              {matchedIcon}
            </Button>
          )}

          <form onSubmit={handleSubmit} role="searchbox">
            <TextField className="relative z-[1]">
              <Input
                aria-label="سرچ بار"
                value={searchValue}
                role="search"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="جستوجو کنید"
                className={twJoin(
                  'bg-base placeholder:text-text absolute left-0 h-10 w-10 opacity-0',
                  'rounded-lg text-xs placeholder:text-xs focus:p-2.5 focus:opacity-100',
                  'focus:w-[245px] focus:outline-none lg:focus:w-[660px]',
                  'cursor-pointer transition-all duration-200 ease-in-out',
                )}
              />
              <div className="bg-base size-10 rounded-lg">
                <FaMagnifyingGlass className="pointer-events-none absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer" />
              </div>
            </TextField>
          </form>

          <Button variant="none" aria-label="دکمه ورود" className="bg-base cursor-default rounded-lg p-3">
            <FaArrowRightToBracket size={16} />
          </Button>
        </div>

        <span className="select-none">
          <MainThemeSwitch />
        </span>
      </div>
    </header>
  );
}
