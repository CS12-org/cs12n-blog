// TODO: replace remix-auth with next-auth
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Input, Text, TextField } from "react-aria-components";
import { Controller, useForm } from "react-hook-form";
import {
  data,
  redirect,
  useActionData,
  useNavigate,
  useSubmit,
} from "react-router";
import { twJoin } from "tailwind-merge";
import { z } from "zod";
import FarhanCharacter from "~/assets/images/FR.svg?url";
import Button from "~/components/Button";
import {
  authenticate,
  authenticator,
  sessionStorage,
} from "~/service/auth.server";
import type { Route } from "./+types/SignUp";

type SignUpForm = z.infer<typeof SignUpSchema>;

const SignUpSchema = z
  .object({
    email: z.string().min(1).email(),
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

const DEFAULT_ERROR_MESSAGE =
  "متأسفانه، یک خطای غیرمنتظره رخ داده است. لطفا دوباره تلاش کنید.";

function SignUp() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const error = useActionData<typeof action>();

  const { control, handleSubmit } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submitHandler = handleSubmit((_, event) => {
    if (event) submit(event.target, { method: "POST" });
  });

  return (
    <main className="min-h-dvh flex flex-col items-center px-6">
      <form
        method="POST"
        onSubmit={submitHandler}
        className="relative flex flex-col items-stretch my-auto bg-crust rounded-2xl p-5 w-full max-w-sm"
      >
        <img
          src={FarhanCharacter}
          alt="animated character"
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
            onPress={() => navigate("/login")}
          >
            ورود
          </Button>
        </div>
      </form>
    </main>
  );
}

export async function action(args: Route.ActionArgs) {
  const { request } = args;
  const headers = request.headers.get("cookie");

  try {
    const user = await authenticator.authenticate("user-pass-signup", request);
    const session = await sessionStorage.getSession(headers);

    session.set("user", user);

    return redirect("/", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  } catch (error: unknown) {
    let res: string = DEFAULT_ERROR_MESSAGE;

    if (error instanceof AxiosError) {
      res = error.response?.data?.error?.message || DEFAULT_ERROR_MESSAGE;
    } else if (error instanceof Error) {
      res = error.message;
    }

    return data(res, {
      status: 400,
      statusText: "Bad Request",
    });
  }
}

export async function loader(args: Route.LoaderArgs) {
  const user = await authenticate(args.request, false);
  if (user) return redirect("/");
  return null;
}

export default SignUp;
