'use client';

import { type ReactNode, useState } from 'react';
import { Input, TextField, Link } from '@/components/react-aria-components';
import { FaArrowRightToBracket, FaBars, FaBook, FaMagnifyingGlass } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
import Logo from '@/assets/images/cs12-logo.svg';
import Button from '@/components/button';
import twMerge from '@/lib/tw-merge';
import { useMainLayoutStore } from '@/components/providers/main-layout-store-provider';
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

function MainTopbar(props: Props) {
  const { isBlured = false } = props;
  const [focused, setFocused] = useState(false);

  const sideBarOpen = useMainLayoutStore((state) => state.isSideBarOpen);
  const toggleIsSideBarOpen = useMainLayoutStore((state) => state.toggleIsSideBarOpen);

  const pathname = usePathname();
  const matchedIcon = PATH_ICONS[pathname];

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
      <Logo />

      <div
        className={twJoin(
          'flex grow items-center gap-3.5',
          // TODO : remove in release version
          isBlured && 'pointer-events-none blur-[4px]',
        )}
      >
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
              <Link href="#" rel="help" className="cursor-default select-none">
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
              onClick={() => {
                console.log('test');
                toggleIsSideBarOpen();
              }}
              className={twMerge(
                'bg-base rounded-lg p-3 select-none lg:hidden',
                sideBarOpen && 'bg-sapphire text-crust',
              )}
            >
              {' '}
              {matchedIcon}
            </Button>
          )}
          <TextField className="relative h-10 w-10">
            <Input
              aria-label="سرچ بار"
              onBlur={() => setFocused(false)}
              onFocus={() => setFocused(true)}
              placeholder={focused ? 'جستوجو کنید' : ''}
              className={twJoin(
                'bg-base absolute left-0 h-10 w-10 rounded-lg',
                'placeholder:text-text text-xs placeholder:text-xs focus:p-2.5',
                'focus:w-[245px] focus:outline-none lg:focus:w-[660px]',
                'cursor-pointer transition-all duration-200 ease-in-out',
              )}
            />
            <FaMagnifyingGlass
              size={16}
              className={twJoin(
                'absolute top-1/2 left-1/2 -translate-x-1/2',
                'pointer-events-none -translate-y-1/2 cursor-pointer',
              )}
            />
          </TextField>

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

export default MainTopbar;
