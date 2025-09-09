"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "~/components/button";
import Image from "next/image";
import FarhanCharacter from "~/assets/images/farhan-character.png";
import { twJoin } from "tailwind-merge";
import axios from "~/lib/axios";

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending",
  );
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [expirationTimer, setExpirationTimer] = useState(0);

  const verifyEmail = async () => {
    try {
      await axios.get(`/api/auth/verify-email?token=${token}`);
      setStatus("success");
      //setExpirationTimer(response?.data?.expiresIn || 0);
    } catch {
      setStatus("error");
      setError("خطا در تایید ایمیل");
    }
  };

  const resendEmail = async () => {
    setIsResending(true);
    try {
      await axios.post(`/api/auth/resend-verification-email`, { email });
      setError(null);
    } catch {
      setError("ارسال مجدد ایمیل با خطا مواجه شد");
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
  const isEmailExsist = error === "Email already verified";
  return (
    <main className="min-h-dvh flex flex-col items-center px-6">
      <form className="relative flex flex-col items-stretch my-auto bg-crust rounded-2xl p-5 w-full max-w-sm">
        <Image
          src={FarhanCharacter}
          alt="فرهان"
          className={twJoin(
            "animate-fade-up animate-duration-1000 animate-delay-500",
            "absolute bottom-full left-1/2 -translate-x-1/2 w-25 -z-1",
          )}
        />
        <h1 className="font-bold text-3xl mb-7 text-center">
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

        {status === "pending" && (
          <>
            <p className="flex items-center justify-center text-center text-label-md text-yellow my-1">
              <span className="inline-block w-5 h-5 mr-2 border-2 border-yellow border-t-transparent rounded-full animate-spin me-2"></span>
              در حال بررسی تایید ایمیل تا {expirationTimer} دیگر ...
            </p>
          </>
        )}
        {status === "error" && !isEmailExsist && (
          <>
            <p className="text-center text-label-md text-red my-1">
              {error?.trim() === ""
                ? "ایمیل شما تایید نشد یا منقضی شده است."
                : error}
            </p>
            <p>لطفاً برای دریافت لینک جدید روی دکمه زیر کلیک کنید.</p>
            <Button
              type="button"
              className="py-2 mt-4"
              isDisabled={isResending}
              onPress={resendEmail}
            >
              {isResending ? "در حال ارسال مجدد..." : "ارسال مجدد ایمیل تایید"}
            </Button>
          </>
        )}
        {status === "error" && isEmailExsist && (
          <>
            <p className="text-center text-label-md text-red my-1">{error}</p>
            <Button
              type="button"
              variant="outline"
              className="py-2 px-10 mt-3"
              onPress={() => router.push("/login")}
            >
              ورود
            </Button>
          </>
        )}
        {status === "success" && (
          <p className="text-center text-label-md text-green my-1">
            ایمیل شما با موفقیت تایید شد!
          </p>
        )}
        {status === "success" && (
          <div className="mt-4 flex items-center gap-2 justify-between m-auto">
            <Button
              type="button"
              variant="outline"
              className="py-2 px-10"
              onPress={() => router.push("/login")}
            >
              ورود
            </Button>
          </div>
        )}
      </form>
    </main>
  );
}
