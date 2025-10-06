import type { ReactNode } from 'react';
import MainBottombar from './main-bottom-bar';
import MainFooter from './main-footer';
import MainTopbar from './main-top-bar';
import Footer from '@/components/footer';
import { twJoin } from 'tailwind-merge';
import { getServerSession } from 'next-auth';
import { UserInitializer } from '@/hooks/ user-initializer';
import { Sidebar } from '@/components/shared/sidebar';
import { getUserProfile } from '@/service/get-user-profile';
import authOptions from '@/auth.config';

type Props = { children?: ReactNode };

async function Main(props: Props) {
  const { children } = props;
  // 1️⃣ Get session server-side
  const session = await getServerSession(authOptions);
  let userProfile = null;
  // 2️⃣ Fetch user profile if session exists
  if (session?.accessToken) {
    try {
      userProfile = await getUserProfile({});
    } catch (err) {
      console.error('Failed to fetch user profile', err);
    }
  }
  return (
    <div className="relative flex flex-col items-center px-6">
      <div className={twJoin('w-full', 'max-w-sm md:max-w-140 lg:max-w-235', 'mx-auto space-y-5 pb-[95px] lg:pb-5')}>
        <MainTopbar />
        <UserInitializer userProfile={userProfile} />
        <main>{children}</main>
        <MainBottombar />
        <MainFooter />
      </div>
      <Footer />
      <Sidebar />
    </div>
  );
}

export default Main;
