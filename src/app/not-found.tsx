'use client';

import Vector404 from '@/assets/images/404.svg';
import { MainLayoutStoreProvider } from '@/components/providers/main-layout-store-provider';
import Main from '@/layout/main';

function NotFoundPage() {
  return (
    <MainLayoutStoreProvider>
      <Main>
        <main className="bg-crust flex w-full flex-col items-center justify-center gap-y-4 rounded-xl p-4 pr-10 pl-6 text-xl font-extrabold text-white md:pr-14 md:pl-7.5 lg:text-3xl">
          <h2 className="text-flamingo md:text-headline-lg text-xl"> اوپس! فردین صفحه ات رو خورد!</h2>
          <Vector404 className="h-auto w-full" aria-label="صفحه پیدا نشد" />
          <h2 className="text-lg md:text-[32px]">
            صفحه پیدا <span className="text-maroon">نشد</span> <sup>!</sup>!<sub>!</sub>
          </h2>
          <p className="text-xs font-normal lg:text-sm"> صفحه ای که شما به دنبالش میگردید در حال حاضر وجود ندارد.</p>
        </main>
      </Main>
    </MainLayoutStoreProvider>
  );
}

export default NotFoundPage;
