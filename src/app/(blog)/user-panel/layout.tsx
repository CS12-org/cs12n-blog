import UserPanelSidebar from '@/components/user-panel/user-panel-sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex w-full items-start gap-x-5">
      <UserPanelSidebar />
      {children}
    </section>
  );
}

export default Layout;
