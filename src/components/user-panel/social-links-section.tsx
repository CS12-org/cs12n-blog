'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@/lib/axios';
import { Button, Input, Text } from 'react-aria-components'; 
import Accordion from '@/components/user-panel/accordion';
import PlusSign from '@/assets/images/plus-sign.svg';

const socialSchema = z.object({
  link: z.string().url("لینک معتبر نیست"),
});
type SocialForm = z.infer<typeof socialSchema>;

interface SocialLinksFormProps {
  userProfileData: {
    username?: string;
    fullName?: string;
    bio?: string;
    avatarUrl?: string;
    selectedColor?: string;
    skills?: string[];
    survey?: string;
    socialUrls?: string[];
  };
}

export default function SocialLinksForm({ userProfileData }: SocialLinksFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }, // 👈 اینو گرفتم تا خطاها رو نشون بدیم
  } = useForm<SocialForm>({
    resolver: zodResolver(socialSchema),
    defaultValues: { link: "" },
  });

  const [links, setLinks] = useState<string[]>(userProfileData.socialUrls ?? []);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // ✅ وقتی پروفایل از سرور آپدیت شد، استیت هم سینک بشه
  useEffect(() => {
    if (userProfileData?.socialUrls) {
      setLinks(userProfileData.socialUrls);
    }
  }, [userProfileData]);

  // ➕ افزودن لینک
  const onSubmit = async (data: SocialForm) => {
    setLoading(true);
    setServerError(null);
    setSuccessMsg(null);

    const newLink = data.link.trim();

    // ⛔ چک کنیم لینک تکراری نباشه
    if (links.includes(newLink)) {
      setServerError("این لینک قبلاً ثبت شده است");
      setLoading(false);
      return;
    }

    try {
      const newLinks = [...links, newLink];
      const res = await axios.put('/user-profile', {
        ...userProfileData,
        socialUrls: newLinks,
      });

      if (res.status === 200) {
        setLinks(newLinks);
        setSuccessMsg('لینک با موفقیت ثبت شد');
        reset();
      }
    } catch (err: any) {
      console.error('Error saving social link:', err);
      setServerError(err?.response?.data?.message ?? 'خطا در ثبت لینک');
    } finally {
      setLoading(false);
    }
  };

  // ❌ حذف لینک
  const removeLink = async (index: number) => {
    setLoading(true);
    setServerError(null);
    setSuccessMsg(null);

    try {
      const newLinks = links.filter((_, i) => i !== index);
      const res = await axios.put('/user-profile', {
        ...userProfileData,
        socialUrls: newLinks,
      });

      if (res.status === 200) {
        setLinks(newLinks);
        setSuccessMsg('لینک با موفقیت حذف شد');
      }
    } catch (err: any) {
      console.error('Error removing social link:', err);
      setServerError(err?.response?.data?.message ?? 'خطا در حذف لینک');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion title="شبکه‌های اجتماعی">
      <section className="flex w-full flex-col gap-2">
        <Controller
          name="link"
          control={control}
          render={({ field }) => (
            <article className="bg-crust flex flex-col gap-1 rounded-xl p-2">
              <div className="flex items-center gap-x-2.5">
                <Button
                  className="bg-mantle flex h-8 w-8 items-center justify-center rounded-md"
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  isDisabled={loading}
                  aria-label="افزودن لینک"
                >
                  <PlusSign className="w-4 h-4" />
                </Button>

                <Input
                  {...field}
                  placeholder="لینک سوشال مدیا خود را وارد کنید"
                  className="bg-mantle h-9 w-full rounded-md px-2 py-1 text-xs"
                  aria-label="لینک سوشال"
                />
              </div>

              {/* 👇 نمایش خطای اعتبارسنجی */}
              {errors.link && (
                <Text className="text-red text-label-xs">{errors.link.message}</Text>
              )}
            </article>
          )}
        />

        {serverError && (
          <Text className="text-red text-label-xs mt-1">{serverError}</Text>
        )}
        {successMsg && (
          <Text className="text-green-400 text-label-xs mt-1">{successMsg}</Text>
        )}

        {/* 📌 نمایش لیست لینک‌ها */}
        {links.length > 0 && (
          <ul className="flex flex-col gap-1 mt-2">
            {links.map((link, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-mantle rounded-md px-2 py-1 text-xs text-white"
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline break-all"
                >
                  {link}
                </a>
                <Button
                  type="button"
                  className="text-red-400 hover:text-red-200"
                  onClick={() => removeLink(idx)}
                  isDisabled={loading}
                >
                  حذف
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Accordion>
  );
}
