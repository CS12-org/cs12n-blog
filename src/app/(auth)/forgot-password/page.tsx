import type { Metadata } from 'next';
import ForgotPasswordForm from '~/components/Auth/forgot-password-form';

export const metadata: Metadata = {
  title: 'فراموشی رمز عبور',
  description: 'دریافت کد تغییر رمز عبور از طریق ایمیل',
  keywords: ['فراموشی رمز عبور', 'تغییر رمز', 'کد تایید', 'ایمیل'],
  openGraph: {
    title: 'فراموشی رمز عبور',
    description: 'دریافت کد تغییر رمز عبور از طریق ایمیل',
    type: 'website',
  },
};

export default function Page() {
  return <ForgotPasswordForm />;
}
