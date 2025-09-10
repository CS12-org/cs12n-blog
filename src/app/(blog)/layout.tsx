import { ReactNode } from 'react';
import Main from '~/layout/main';
import { MainLayoutStoreProvider } from '~/components/providers/main-layout-store-provider';

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
