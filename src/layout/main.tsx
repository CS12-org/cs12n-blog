import type { ReactNode } from 'react';
import MainBottombar from './main-bottom-bar';
import MainFooter from './main-footer';
import MainTopbar from './main-top-bar';
import Footer from '@/components/footer';
import { twJoin } from 'tailwind-merge';

type Props = { children?: ReactNode };

function Main(props: Props) {
  const { children } = props;

  return (
    <div className="flex flex-col items-center px-6">
      <div className={twJoin('w-full', 'max-w-sm md:max-w-140 lg:max-w-235', 'mx-auto space-y-5 pb-[95px] lg:pb-5')}>
        <MainTopbar isBlured={false} />
        <main>{children}</main>
        <MainBottombar />
        <MainFooter />
      </div>
      <Footer />
    </div>
  );
}

export default Main;
