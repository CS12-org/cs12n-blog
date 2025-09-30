'use client';

import { useState } from 'react';
import { twJoin } from 'tailwind-merge';
import Button from '@/components/button';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Input, Text, TextField } from 'react-aria-components';
import PayamCharachter from '../../../public/payam-character.png';
import { queue } from '../providers/react-aria-toast-provider';

const ChangePasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword)
      ctx.addIssue({
        code: 'custom',
        message: 'تکرار رمز عبور با رمز عبور یکسان نیست',
        path: ['confirmPassword'],
      });
  });

type ChangePasswordFormFields = z.infer<typeof ChangePasswordSchema>;

const DEFAULT_ERROR_MESSAGE = 'متأسفانه، یک خطای غیرمنتظره رخ داده است. لطفا دوباره تلاش کنید.';

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function ChangePasswordForm() {
  const router = useRouter();

  const [isHasSent, setHasSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<ChangePasswordFormFields>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const ChangePasswordMutation = useMutation({
    mutationFn: async (values: ChangePasswordFormFields) => {
      const response = await axios.post('/auth/reset-password', {
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      return response.data;
    },
    onSuccess: (res) => {
      setHasSent(true);
      setSentEmail(res?.data?.email);
    },
    onError: (error: AxiosError) => {
      queue.add(
        {
          title: error.response?.data?.message || DEFAULT_ERROR_MESSAGE,
          description: 'Great success.',
        },
        { timeout: 3000 },
      );
    },
  });

  const submitHandler = handleSubmit((values) => {
    ChangePasswordMutation.mutate(values);
  });
  // Helper to get webmail URL
  const getWebmailUrl = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return null;
    if (domain === 'gmail.com') return 'https://mail.google.com/';
    if (domain === 'yahoo.com') return 'https://mail.yahoo.com/';
    if (domain === 'outlook.com' || domain === 'hotmail.com' || domain === 'live.com')
      return 'https://outlook.live.com/';
    // Add more providers as needed
    return `https://mail.${domain}/`;
  };

  if (!isHasSent)
    return (
      <main className="flex min-h-dvh flex-col items-center">
        <form
          method="POST"
          onSubmit={submitHandler}
          className="bg-crust relative my-auto flex w-[360px] max-w-sm flex-col items-stretch rounded-2xl p-5"
        >
          <Image
            src={PayamCharachter}
            alt="کرکتر پیام"
            className={twJoin(
              'animate-fade-up animate-duration-1000 animate-delay-500',
              'absolute bottom-[210px] left-1/2 -z-1 w-25 -translate-x-1/2',
              'h-[204px] w-[150px]',
            )}
          />
          <h1 className={twJoin('text-3x1 mb-7 text-center font-bold', 'flex items-center justify-center gap-2')}>
            <span className="font-body-md mb-[-10px] h-[24px] w-[320px] text-center align-middle leading-6 tracking-normal text-white">
              تغییر رمز عبور
            </span>
          </h1>

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                className="mb-4"
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                autoComplete="new-password"
                isDisabled={field.disabled}
                isInvalid={fieldState.invalid}
              >
                <Input ref={field.ref} placeholder="رمز عبور" className="bg-surface-0 w-full rounded-md px-2.5 py-2" />
                <Text slot="description" className={twJoin('text-red text-label-xs block', fieldState.error && 'mt-2')}>
                  {fieldState.error?.message}
                </Text>
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <TextField
                className="mb-4"
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                autoComplete="new-password"
                isDisabled={field.disabled}
                isInvalid={fieldState.invalid}
              >
                <Input
                  ref={field.ref}
                  placeholder="تکرار رمز عبور"
                  className="bg-surface-0 w-full rounded-md px-2.5 py-2"
                />
                <Text slot="description" className={twJoin('text-red text-label-xs block', fieldState.error && 'mt-2')}>
                  {fieldState.error?.message}
                </Text>
              </TextField>
            )}
          />
          <div className="mt-0 flex h-[42px] w-[320px] gap-2 rounded-[10px]">
            <Button type="submit" className="grow py-2">
              تایید
            </Button>
          </div>
        </form>
      </main>
    );

  return (
    <div className="mt=30rem w[360px] my-auto mt-70 h-[175px] p-4">
      <div className="mx-auto flex h-[115] w-[340px] max-w-sm flex-col items-center space-y-4 rounded-lg bg-gray-900 p-4 text-white">
        <div className="flex h-[28px] w-[320px] items-center justify-center space-x-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            fill="currentColor"
            className="h-[28px] w-[28px] text-green-400"
          >
            <g clipPath="url(#clip0_1162_6345)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.1518 4.31332C12.5477 2.3591 15.4521 2.3591 16.848 4.31332L17.0702 4.62443C17.3158 4.96836 17.7284 5.15252 18.1484 5.10586L19.1389 4.99579C21.3681 4.74811 23.2517 6.6317 23.004 8.8609L22.894 9.85143C22.8473 10.2715 23.0314 10.6839 23.3754 10.9296L23.6865 11.1518C25.6407 12.5477 25.6407 15.4521 23.6865 16.848L23.3754 17.0702C23.0314 17.3158 22.8473 17.7284 22.894 18.1484L23.004 19.1389C23.2517 21.3681 21.3681 23.2517 19.1389 23.004L18.1484 22.894C17.7284 22.8473 17.3158 23.0314 17.0702 23.3754L16.848 23.6865C15.4521 25.6407 12.5478 25.6407 11.1518 23.6865L10.9296 23.3754C10.6839 23.0314 10.2715 22.8473 9.85141 22.894L8.8609 23.004C6.6317 23.2517 4.74811 21.3681 4.99579 19.1389L5.10586 18.1484C5.15252 17.7284 4.96836 17.3158 4.62443 17.0702L4.31332 16.848C2.3591 15.4521 2.3591 12.5478 4.31332 11.1518L4.62443 10.9296C4.96836 10.6839 5.15252 10.2715 5.10586 9.85141L4.99579 8.8609C4.74811 6.6317 6.6317 4.74811 8.8609 4.99579L9.85143 5.10586C10.2715 5.15252 10.6839 4.96836 10.9296 4.62443L11.1518 4.31332ZM18.3249 10.8416C18.7805 11.2972 18.7805 12.036 18.3249 12.4915L13.8695 16.9469C13.2972 17.5193 12.3693 17.5193 11.797 16.9469L9.67495 14.8249C9.21935 14.3693 9.21935 13.6306 9.67495 13.175C10.1306 12.7194 10.8693 12.7194 11.3249 13.175L12.8333 14.6834L16.675 10.8416C17.1306 10.386 17.8693 10.386 18.3249 10.8416Z"
                fill="#8BD5CA"
              />
            </g>
            <defs>
              <clipPath id="clip0_1162_6345">
                <rect width="28" height="28" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className="w[175px] ml-18 h-[24px] text-white">کد به ایمیل شما ارسال شد</p>
        </div>
        <button
          onClick={() => {
            if (sentEmail) {
              const url = getWebmailUrl(sentEmail);
              if (url) window.open(url, '_blank');
            }
          }}
          className="h-[42px] w-[320px] rounded-lg bg-indigo-300 px-6 py-2 text-black transition hover:bg-indigo-400"
        >
          رفتن به ایمیل
        </button>
      </div>
    </div>
  );
}
