"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import FarhanCharacter from "~/assets/images/FR.svg";
import Button from "~/components/button";
import { Input, Text, TextField } from "~/components/react-aria-components";
import { twJoin } from "tailwind-merge";
import { useRouter } from "next/navigation";
import axios from "~/lib/axios";

const SignUpSchema = z
  .object({
    email: z.email().min(1),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword)
      ctx.addIssue({
        code: "custom",
        message: "تکرار رمز عبور با رمز عبور یکسان نیست",
        path: ["confirmPassword"],
      });
  });

type SignUpFormFields = z.infer<typeof SignUpSchema>;

const DEFAULT_ERROR_MESSAGE =
  "متأسفانه، یک خطای غیرمنتظره رخ داده است. لطفا دوباره تلاش کنید.";

function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<SignUpFormFields>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submitHandler = handleSubmit(async (values) => {
    setError(null);
    try {
      await axios.post("/auth/local/register", {
        email: values.email,
        password: values.password,
        username: values.email.split("@")[0],
      });
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (res?.ok) {
        router.push("/");
      } else {
        setError(res?.error || DEFAULT_ERROR_MESSAGE);
      }
    } catch (e: unknown) {
      if (e && typeof e === "object" && "response" in e) {
        // @ts-expect-error TODO: use correct typing
        setError(e.response?.data?.error?.message || DEFAULT_ERROR_MESSAGE);
      } else {
        setError(DEFAULT_ERROR_MESSAGE);
      }
    }
  });

  return (
    <main className="min-h-dvh flex flex-col items-center px-6">
      <form
        method="POST"
        onSubmit={submitHandler}
        className="relative flex flex-col items-stretch my-auto bg-crust rounded-2xl p-5 w-full max-w-sm"
      >
        <FarhanCharacter
          className={twJoin(
            "animate-fade-up animate-duration-1000 animate-delay-500",
            "absolute bottom-full left-1/2 -translate-x-1/2 w-25 -z-1",
          )}
        />
        <h1 className="font-bold text-4xl mb-7 text-center">
          <span className="text-rosewater animate-fade">ث</span>
          <span className="text-mauve animate-fade animate-delay-100">ب</span>
          <span className="text-yellow animate-fade animate-delay-200">ت</span>
          <span> </span>
          <span className="text-pink animate-fade animate-delay-300">ن</span>
          <span className="text-maroon animate-fade animate-delay-400">ا</span>
          <span className="text-mauve animate-fade animate-delay-500">م</span>
        </h1>
        <Controller
          name="email"
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
              <Input
                ref={field.ref}
                placeholder="ایمیل"
                className="bg-surface-0 rounded-md px-2.5 py-2 w-full"
              />
              <Text
                slot="description"
                className={twJoin(
                  "text-red block text-label-xs",
                  fieldState.error && "mt-2",
                )}
              >
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
              autoComplete="new-password"
              isDisabled={field.disabled}
              isInvalid={fieldState.invalid}
            >
              <Input
                ref={field.ref}
                placeholder="رمز عبور"
                className="bg-surface-0 rounded-md px-2.5 py-2 w-full"
              />
              <Text
                slot="description"
                className={twJoin(
                  "text-red block text-label-xs",
                  fieldState.error && "mt-2",
                )}
              >
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
                className="bg-surface-0 rounded-md px-2.5 py-2 w-full"
              />
              <Text
                slot="description"
                className={twJoin(
                  "text-red block text-label-xs",
                  fieldState.error && "mt-2",
                )}
              >
                {fieldState.error?.message}
              </Text>
            </TextField>
          )}
        />
        {!!error && (
          <p className="text-center text-label-md text-red my-1">
            {error.trim()}
          </p>
        )}
        <div className="mt-4 flex gap-2">
          <Button type="submit" className="py-2 grow">
            ثبت نام در سایت
          </Button>
          <Button
            type="button"
            variant="outline"
            className="py-2 px-4"
            onPress={() => router.push("/login")}
          >
            ورود
          </Button>
        </div>
      </form>
    </main>
  );
}

export default SignUpForm;
