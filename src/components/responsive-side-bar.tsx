'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { type FunctionComponent, useEffect, useId, useState } from 'react';
import { FaAnglesRight, FaX } from 'react-icons/fa6';
import { twJoin, twMerge } from 'tailwind-merge';
import Button from '@/components/button';
import { useMainLayoutStore } from '@/components/providers/main-layout-store-provider';
import { Link } from '@/components/react-aria-components';

type Props = {
  title: string;
  groups: {
    slug: string;
    title: string;
    icon: { url: string; width: number; height: number } | FunctionComponent<{ className?: string; size?: number }>;
  }[];
};
const ResponsiveSideBar = (prop: Props) => {
  const headingId = useId();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth < 1024) setCollapsed(false);
    };

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  const sideBarOpen = useMainLayoutStore((state) => state.isSideBarOpen);
  const toggleIsSideBarOpen = useMainLayoutStore((state) => state.toggleIsSideBarOpen);

  const asideContents = (
    <>
      <header className="flex min-h-6.75 items-center">
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.h2
              id={headingId}
              exit={{ opacity: 0, width: 0 }}
              className="text-title-md truncate"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '100%' }}
            >
              {prop.title}
            </motion.h2>
          )}
        </AnimatePresence>

        <Button
          variant="none"
          onPress={() => setCollapsed((prev) => !prev)}
          className={twMerge(
            'bg-base mr-auto shrink-0 rounded-lg p-1.5',
            collapsed && 'bg-mantle p-[17px] transition-all',
            'hidden lg:block',
          )}
        >
          <FaAnglesRight size={10} className={twJoin(collapsed ? 'rotate-180' : '', 'transition')} />
        </Button>

        <Button
          variant="none"
          onPress={() => toggleIsSideBarOpen()}
          className={twMerge('bg-base mr-auto shrink-0 rounded-lg p-1.5', 'block lg:hidden')}
        >
          <FaX size={10} className="text-red" />
        </Button>
      </header>
      <div aria-hidden className="bg-surface-0 -mx-3 my-3 h-px" />
      <nav className="text-body-sm">
        <ul className="flex flex-col items-stretch gap-1.5">
          {prop.groups.map((group) => (
            <li key={group.title}>
              <Link
                href={`${group.slug}`}
                onClick={() => toggleIsSideBarOpen()}
                className={twJoin(
                  'bg-mantle flex items-center justify-between p-2',
                  'transition hover:brightness-110 active:brightness-95',
                  'rounded-md',
                )}
              >
                <AnimatePresence initial={false}>
                  {!collapsed && (
                    <motion.span
                      className="truncate"
                      exit={{ opacity: 0, width: 0 }}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: '100%' }}
                    >
                      {group.title}
                    </motion.span>
                  )}
                </AnimatePresence>
                {typeof group.icon === 'function' ? (
                  <group.icon size={16} className="bg-base text-sky box-content shrink-0 rounded p-1.5" />
                ) : (
                  <Image
                    alt={group.title}
                    src={group.icon.url}
                    width={group.icon.width}
                    height={group.icon.height}
                    className="bg-base box-content size-4 shrink-0 rounded p-1.5"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
  return (
    <>
      <AnimatePresence initial={false}>
        {sideBarOpen && (
          <motion.div
            aria-hidden
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-overlay-0/5 fixed inset-0 z-9 backdrop-blur-xs lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        aria-labelledby={headingId}
        className={twMerge(
          'bg-crust w-full rounded-xl p-3',
          'hidden max-w-65 transition-[width] lg:block',
          'sticky top-5',
          collapsed && 'w-17',
        )}
      >
        {asideContents}
      </aside>

      <AnimatePresence initial={false}>
        {sideBarOpen && (
          <motion.aside
            aria-labelledby={headingId}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: '-1rem' }}
            initial={{ opacity: 0, translateY: '-1rem' }}
            className={twMerge(
              'fixed top-30.5 right-[calc((100%-384px)/2)]',
              'bg-crust z-10 w-full max-w-sm rounded-xl p-3',
              'lg:hidden',
            )}
          >
            {asideContents}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResponsiveSideBar;
