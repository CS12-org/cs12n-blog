import { twJoin } from 'tailwind-merge';

import Logo from '@/assets/images/cs12-logo.svg';
import MainThemeSwitch from './main-theme-switch';

const COPYRIGHT_TEXT = 'کلیه حقوق مادی و معنوی سایت برای CS12 محفوظ است.';

function MainFooter() {
  return (
    <footer className="bg-crust rounded-xl">
      <div className={twJoin('flex min-h-17.5', 'items-center justify-between', 'w-full px-4 lg:px-7.5')}>
        <Logo />

        <p className="text-body-sm hidden lg:block">{COPYRIGHT_TEXT}</p>

        <MainThemeSwitch />
      </div>

      <p className="text-body-sm px-4 pb-4 text-center lg:hidden">{COPYRIGHT_TEXT}</p>
    </footer>
  );
}

export default MainFooter;
