'use client';

import z from 'zod';
import Image from 'next/image';
import axios from '~/lib/axios';
import { useState } from 'react';
import { twJoin } from 'tailwind-merge';
import Button from '~/components/button';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Input } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text, TextField } from 'react-aria-components';
import Mohammadhoseincharacter from '~/assets/images/mohammad-hossein-character.png';

const ForgotPasswordSchema = z.object({
  email: z.email().min(1),
});
const DEFAULT_ERROR_MESSAGE = 'متأسفانه، یک خطای غیرمنتظره رخ داده است. لطفا دوباره تلاش کنید.';

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
}
type ForgotPasswordFormFields = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [isHasSent, setHasSent] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<ForgotPasswordFormFields>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const forgotPasswordMutation = useMutation({
    mutationFn: async (values: ForgotPasswordFormFields) => {
      const response = await axios.post('/api/auth/forgot-password', {
        email: values.email,
      });
      return response.data;
    },
    onSuccess: () => {
      setHasSent(true);
    },
    onError: (error: AxiosError) => {
      setError(error.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    },
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
  const submitHandler = handleSubmit((values) => {
    setSentEmail(values.email);
    forgotPasswordMutation.mutate(values);
  });
  if (!isHasSent)
    return (
      <main className='min-h-dvh flex flex-col items-center'>
        <form
          method='POST'
          onSubmit={submitHandler}
          className='relative flex flex-col items-stretch my-auto bg-crust rounded-2xl p-5 w-[360px]'
        >
          <Image
            src={Mohammadhoseincharacter}
            alt='کرکتر محمد حسین'
            className={twJoin(
              'animate-fade-up animate-duration-1000 animate-delay-500',
              'absolute bottom-[165px] left-1/2 -translate-x-1/2 w-25 -z-1',
              'w-[150px]'
            )}
          />
          <h1
            className={twJoin(
              'font-bold text-3x1 mb-6 text-center',
              'flex gap-2 justify-center items-center '
            )}
          >
            <span className='leading-6 text-white tracking-normal text-center align-middle font-body-md w-[320px] h-[24px]'>
              کد تغییر رمز رو دریافت کن
            </span>
          </h1>

          <Controller
            name='email'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                className='mb-4'
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                autoComplete='email'
                onChange={field.onChange}
                isDisabled={field.disabled}
                isInvalid={fieldState.invalid}
              >
                <Input
                  ref={field.ref}
                  placeholder='ایمیل خود را وارد کنید'
                  className='bg-surface-0 rounded-md px-2.5 py-2 w-full'
                />
                <Text
                  slot='description'
                  className={twJoin('text-red block text-label-xs', fieldState.error && 'mt-2')}
                >
                  {fieldState.error?.message}
                </Text>
              </TextField>
            )}
          />

          <div className='mt-4 flex gap-2 w-[320px] h-[42px] border rounded-[10px]'>
            <Button type='submit' className='py-2 grow '>
              تایید
            </Button>
          </div>
        </form>
      </main>
    );

  return (
    <div className='p-4 mt=30rem my-auto mt-70 w[360px] h-[175px]'>
      <div className='bg-gray-900 text-white p-4 rounded-lg h-[115] w-[340px] max-w-sm mx-auto flex flex-col items-center space-y-4'>
        <div className='flex items-center space-x-10 justify-center w-[320px] h-[28px]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 28 28'
            fill='currentColor'
            className='w-[28px] h-[28px] text-green-400'
          >
            <g clipPath='url(#clip0_1162_6345)'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M11.1518 4.31332C12.5477 2.3591 15.4521 2.3591 16.848 4.31332L17.0702 4.62443C17.3158 4.96836 17.7284 5.15252 18.1484 5.10586L19.1389 4.99579C21.3681 4.74811 23.2517 6.6317 23.004 8.8609L22.894 9.85143C22.8473 10.2715 23.0314 10.6839 23.3754 10.9296L23.6865 11.1518C25.6407 12.5477 25.6407 15.4521 23.6865 16.848L23.3754 17.0702C23.0314 17.3158 22.8473 17.7284 22.894 18.1484L23.004 19.1389C23.2517 21.3681 21.3681 23.2517 19.1389 23.004L18.1484 22.894C17.7284 22.8473 17.3158 23.0314 17.0702 23.3754L16.848 23.6865C15.4521 25.6407 12.5478 25.6407 11.1518 23.6865L10.9296 23.3754C10.6839 23.0314 10.2715 22.8473 9.85141 22.894L8.8609 23.004C6.6317 23.2517 4.74811 21.3681 4.99579 19.1389L5.10586 18.1484C5.15252 17.7284 4.96836 17.3158 4.62443 17.0702L4.31332 16.848C2.3591 15.4521 2.3591 12.5478 4.31332 11.1518L4.62443 10.9296C4.96836 10.6839 5.15252 10.2715 5.10586 9.85141L4.99579 8.8609C4.74811 6.6317 6.6317 4.74811 8.8609 4.99579L9.85143 5.10586C10.2715 5.15252 10.6839 4.96836 10.9296 4.62443L11.1518 4.31332ZM18.3249 10.8416C18.7805 11.2972 18.7805 12.036 18.3249 12.4915L13.8695 16.9469C13.2972 17.5193 12.3693 17.5193 11.797 16.9469L9.67495 14.8249C9.21935 14.3693 9.21935 13.6306 9.67495 13.175C10.1306 12.7194 10.8693 12.7194 11.3249 13.175L12.8333 14.6834L16.675 10.8416C17.1306 10.386 17.8693 10.386 18.3249 10.8416Z'
                fill='#8BD5CA'
              />
            </g>
            <defs>
              <clipPath id='clip0_1162_6345'>
                <rect width='28' height='28' fill='white' />
              </clipPath>
            </defs>
          </svg>
          <p className=' text-white w[175px] h-[24px] ml-18'>کد به ایمیل شما ارسال شد</p>
        </div>
        <button
          className='bg-indigo-300 text-black px-6 py-2 w-full rounded-lg hover:bg-indigo-400 transition'
          type='button'
          onClick={() => {
            if (sentEmail) {
              const url = getWebmailUrl(sentEmail);
              if (url) window.open(url, '_blank');
            }
          }}
        >
          رفتن به ایمیل
        </button>
      </div>
    </div>
  );
}
