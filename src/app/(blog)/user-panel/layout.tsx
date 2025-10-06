import UserPanelSidebar from '@/components/user-panel/user-panel-sidebar';
import { getServerSession } from 'next-auth';
import authOptions from '@/auth.config';
import { redirect } from 'next/navigation';

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');
  return (
    <section className="flex w-full items-start gap-x-5">
      <UserPanelSidebar />
      {children}
    </section>
  );
}

export default Layout;
