'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '~/components/button';
import Image from 'next/image';
import FarhanCharacter from '~/assets/images/farhan-character.png';
import { twJoin } from 'tailwind-merge';
import axios from '~/lib/axios';

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [expirationTimer, setExpirationTimer] = useState(0);

  const verifyEmail = async () => {
    try {
      await axios.get(`/api/auth/verify-email?token=${token}`);
      setStatus('success');
      //setExpirationTimer(response?.data?.expiresIn || 0);
    } catch {
      setStatus('error');
      setError('خطا در تایید ایمیل');
    }
  };

  const resendEmail = async () => {
    setIsResending(true);
    try {
      await axios.post(`/api/auth/resend-verification-email`, { email });
      setError(null);
    } catch {
      setError('ارسال مجدد ایمیل با خطا مواجه شد');
    }
    setIsResending(false);
  };
  useEffect(() => {
    if (expirationTimer > 0) {
      const interval = setInterval(() => {
        setExpirationTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [expirationTimer]);
  // Call verifyEmail on mount (or when needed)
  useEffect(() => {
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isEmailExsist = error === 'Email already verified';
  return (
    <main className="flex min-h-dvh flex-col items-center px-6">
      <form className="bg-crust relative my-auto flex w-full max-w-sm flex-col items-stretch rounded-2xl p-5">
        <Image
          src={FarhanCharacter}
          alt="فرهان"
          className={twJoin(
            'animate-fade-up animate-duration-1000 animate-delay-500',
            'absolute bottom-full left-1/2 -z-1 w-25 -translate-x-1/2',
          )}
        />
        <h1 className="mb-7 text-center text-3xl font-bold">
          <span className="text-rosewater animate-fade">ت</span>
          <span className="text-mauve animate-fade animate-delay-100">ا</span>
          <span className="text-yellow animate-fade animate-delay-200">ی</span>
          <span className="text-pink animate-fade animate-delay-300">ی</span>
          <span className="text-maroon animate-fade animate-delay-400">د</span>
          <span> </span>
          <span className="text-mauve animate-fade animate-delay-500">ا</span>
          <span className="text-yellow animate-fade animate-delay-600">ی</span>
          <span className="text-pink animate-fade animate-delay-700">م</span>
          <span className="text-maroon animate-fade animate-delay-800">ی</span>
          <span className="text-mauve animate-fade animate-delay-900">ل</span>
        </h1>

        {status === 'pending' && (
          <>
            <p className="text-label-md text-yellow my-1 flex items-center justify-center text-center">
              <span className="border-yellow me-2 mr-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></span>
              در حال بررسی تایید ایمیل تا {expirationTimer} دیگر ...
            </p>
          </>
        )}
        {status === 'error' && !isEmailExsist && (
          <>
            <p className="text-label-md text-red my-1 text-center">
              {error?.trim() === '' ? 'ایمیل شما تایید نشد یا منقضی شده است.' : error}
            </p>
            <p>لطفاً برای دریافت لینک جدید روی دکمه زیر کلیک کنید.</p>
            <Button type="button" className="mt-4 py-2" isDisabled={isResending} onPress={resendEmail}>
              {isResending ? 'در حال ارسال مجدد...' : 'ارسال مجدد ایمیل تایید'}
            </Button>
          </>
        )}
        {status === 'error' && isEmailExsist && (
          <>
            <p className="text-label-md text-red my-1 text-center">{error}</p>
            <Button type="button" variant="outline" className="mt-3 px-10 py-2" onPress={() => router.push('/login')}>
              ورود
            </Button>
          </>
        )}
        {status === 'success' && (
          <p className="text-label-md text-green my-1 text-center">ایمیل شما با موفقیت تایید شد!</p>
        )}
        {status === 'success' && (
          <div className="m-auto mt-4 flex items-center justify-between gap-2">
            <Button type="button" variant="outline" className="px-10 py-2" onPress={() => router.push('/login')}>
              ورود
            </Button>
          </div>
        )}
      </form>
    </main>
  );
}
