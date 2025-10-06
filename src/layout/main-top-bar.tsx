'use client';

import Logo from '@/assets/images/cs12-logo.svg';
import Button from '@/components/button';
import { useMainLayoutStore } from '@/components/providers/main-layout-store-provider';
import {
  Input,
  Link,
  TextField,
  Dialog,
  DialogTrigger,
  Popover,
  Button as AriaButton,
} from '@/components/react-aria-components';
import twMerge from '@/lib/tw-merge';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import { FaArrowRightToBracket, FaBars, FaBook, FaMagnifyingGlass } from 'react-icons/fa6';
import { twJoin } from 'tailwind-merge';
import MainThemeSwitch from './main-theme-switch';
import { useSession } from 'next-auth/react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { signOut } from 'next-auth/react';

// removed unused Props

const PATH_ICONS: Record<string, ReactNode> = {
  '/': <FaBook size={16} />,
  '/user-panel': <FaBars size={16} />,
  '/user-panel/saved-posts': <FaBars size={16} />,
  '/user-panel/user-level': <FaBars size={16} />,
  '/user-panel/comments': <FaBars size={16} />,
};

export default function MainTopbar() {
  const router = useRouter();
  const pathname = usePathname();
  const matchedIcon = PATH_ICONS[pathname];
  const searchParams = useSearchParams();
  const session = useSession();
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
        'bg-crust mt-8 h-17.5 rounded-xl',
        'flex items-center px-4',
        'gap-3.5 lg:px-7.5 [&>*]:shrink-0',
        'relative z-11 select-none',
        '[&>button]:text-overlay-1',
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
          {!session.data?.user.email ? (
            <Link href="/login" aria-label="دکمه ورود" className="bg-base rounded-lg p-3">
              <FaArrowRightToBracket size={16} />
            </Link>
          ) : (
            <DialogTrigger>
              <AriaButton aria-label="پنل کاربری" className="bg-base rounded-lg p-3">
                <RiAccountCircleLine size={18} />
              </AriaButton>
              <Popover className="bg-base border-overlay-0 min-w-40 rounded-lg border p-2 shadow-2xl">
                <Dialog className="outline-none">
                  <div className="flex flex-col gap-1" dir="rtl">
                    <Link
                      href="/user-panel"
                      className="text-body-sm text-overlay-1 hover:text-text hover:bg-overlay-0/40 rounded-md px-3 py-2 text-start"
                    >
                      پنل کاربری
                    </Link>
                    <AriaButton
                      className="text-body-sm text-overlay-1 hover:text-text hover:bg-overlay-0/40 rounded-md px-3 py-2 text-start"
                      onPress={() => signOut()}
                    >
                      خروج از حساب
                    </AriaButton>
                  </div>
                </Dialog>
              </Popover>
            </DialogTrigger>
          )}
        </div>

        <span className="select-none">
          <MainThemeSwitch />
        </span>
      </div>
    </header>
  );
}
