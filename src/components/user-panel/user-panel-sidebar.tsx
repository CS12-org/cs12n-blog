'use client';

import { BiMessageAltDetail } from 'react-icons/bi';
import { CiBookmark } from 'react-icons/ci';
import { RiUser3Fill } from 'react-icons/ri';
import { TbNotes } from 'react-icons/tb';
import ResponsiveSideBar from '../responsive-side-bar';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

const groups = [
  {
    slug: '/user-panel',
    icon: RiUser3Fill,
    title: 'اطلاعات اولیه کاربر',
  },
  {
    slug: '/user-panel/saved-posts',
    icon: CiBookmark,
    title: 'پست های سیو شده',
  },
  {
    slug: '/user-panel/notes',
    icon: TbNotes,
    title: 'یادداشت ها و هایلایت ها',
  },
  {
    slug: '/user-panel/comments',
    icon: BiMessageAltDetail,
    title: 'نظرات و پرسش و پاسخ',
  },
  {
    slug: '/user-panel/user-level',
    icon: BiMessageAltDetail,
    title: '؟درچه سطحی هستم',
  },
];

function UserPanelSidebar() {
  const session = useSession();
  if (!session) redirect('/login');

  return <ResponsiveSideBar title="پنل کاربری" groups={groups} />;
}

export default UserPanelSidebar;
