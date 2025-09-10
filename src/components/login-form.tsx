'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input, Label, Text, TextField } from '~/components/react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { twJoin } from 'tailwind-merge';
import { z } from 'zod';
import SamanCharacter from '~/assets/images/saman-character.png';
import Button from '~/components/button';
import Image from 'next/image';

const schema = z.object({
  password: z.string().min(8),
  identifier: z.string().min(1),
});

type FormFields = z.infer<typeof schema>;

const DEFAULT_ERROR_MESSAGE = 'متأسفانه، یک خطای غیرمنتظره رخ داده است. لطفا دوباره تلاش کنید.';

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      identifier: '',
    },
  });

  const submitHandler = handleSubmit(async (values) => {
    setError(null);

    const res = await signIn('credentials', {
      redirect: false,
      email: values.identifier,
      password: values.password,
    });
    if (res?.ok) {
      router.push('/');
    } else {
      setError(res?.error || DEFAULT_ERROR_MESSAGE);
    }
  });

  return (
    <main className="flex min-h-dvh flex-col items-center px-6">
      <form
        onSubmit={submitHandler}
        className="bg-crust relative my-auto flex w-full max-w-sm flex-col items-stretch rounded-2xl p-5"
      >
        <Image
          src={SamanCharacter}
          alt="کرکتر سامان"
          className={twJoin(
            'animate-fade-up animate-duration-1000 animate-delay-500',
            'absolute bottom-full left-1/2 -z-1 h-auto w-25 -translate-x-1/2',
            'object-contain',
          )}
        />
        <h1 className={twJoin('mb-7 text-center text-4xl font-bold', 'flex justify-center gap-2')}>
          <span className="text-rosewater animate-fade">و</span>
          <span className="text-pink animate-fade animate-delay-200">ر</span>
          <span className="text-mauve animate-fade animate-delay-400">و</span>
          <span className="text-peach animate-fade animate-delay-600">د</span>
        </h1>
        <Controller
          name="identifier"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              className="mb-4"
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              autoComplete="username"
              onChange={field.onChange}
              isDisabled={field.disabled}
              isInvalid={fieldState.invalid}
            >
              <Label className="hidden">نام کاربری یا ایمیل</Label>
              <Input
                ref={field.ref}
                placeholder="نام کاربری یا ایمیل"
                className="bg-surface-0 w-full rounded-md px-2.5 py-2"
              />
              <Text slot="description" className={twJoin('text-red text-label-xs block', fieldState.error && 'mt-2')}>
                {fieldState.error?.message}
              </Text>
            </TextField>
          )}
        />
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
              isDisabled={field.disabled}
              isInvalid={fieldState.invalid}
              autoComplete="current-password"
            >
              <Label className="hidden">رمز عبور</Label>
              <Input ref={field.ref} placeholder="رمز عبور" className="bg-surface-0 w-full rounded-md px-2.5 py-2" />
              <Text slot="description" className={twJoin('text-red text-label-xs block', fieldState.error && 'mt-2')}>
                {fieldState.error?.message}
              </Text>
            </TextField>
          )}
        />
        {!!error && <p className="text-label-md text-red my-1 text-center">{error.trim()}</p>}
        <button
          type="button"
          className="text-lavender mb-4 self-start rounded-md hover:underline"
          onClick={() => router.push('/forgot-password')}
        >
          رمز عبورم رو فراموش کردم!
        </button>
        <div className="mt-4 flex gap-2">
          <Button type="submit" className="grow py-2">
            ورود به سایت
          </Button>
          <Button type="button" variant="outline" className="px-4 py-2" onPress={() => router.push('/signup')}>
            ثبت نام
          </Button>
        </div>
      </form>
    </main>
  );
}

export default LoginForm;
