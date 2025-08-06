import UserPanelList from "~/components/user-panel/user-panel-list";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex gap-x-5 w-full items-start">
      <UserPanelList />
      {children}
    </section>
  );
}

export default Layout;
