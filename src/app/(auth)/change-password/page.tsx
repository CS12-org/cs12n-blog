import type { Metadata } from 'next';
import ChangePasswordForm from '@/components/auth/change-password-form';

export const metadata: Metadata = {
  title: 'تغییر رمز عبور',
  description: 'تغییر رمز عبور با وارد کردن رمز جدید و تکرار آن',
  keywords: ['تغییر رمز عبور', 'رمز جدید', 'تکرار رمز', 'امنیت'],
  openGraph: {
    title: 'تغییر رمز عبور',
    description: 'تغییر رمز عبور با وارد کردن رمز جدید و تکرار آن',
    type: 'website',
  },
};

export default function ChangePassword() {
  return <ChangePasswordForm />;
}
