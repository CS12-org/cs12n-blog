import UserPanelSidebar from "~/components/user-panel/user-panel-sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex gap-x-5 w-full items-start">
      <UserPanelSidebar />
      {children}
    </section>
  );
}

export default Layout;
