import { ReactNode } from "react";
import { MainLayoutStoreProvider } from "~/components/Providers/MainLayoutStoreProvider";
import Main from "~/layout/Main";

type Props = { children?: ReactNode };

function Layout(props: Props) {
  const { children } = props;

  return (
    <MainLayoutStoreProvider>
      <Main>{children}</Main>
    </MainLayoutStoreProvider>
  );
}

export default Layout;
