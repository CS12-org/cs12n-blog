'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@/lib/axios';
import { Button, Input, Text } from 'react-aria-components';
import Accordion from '@/components/user-panel/accordion';
import PlusSign from '@/assets/images/plus-sign.svg';

const skillSchema = z.object({
  skill: z.string().min(2, 'مهارت باید حداقل ۲ کاراکتر باشد').max(50, 'مهارت نمی‌تواند بیشتر از ۵۰ کاراکتر باشد'),
});
type SkillForm = z.infer<typeof skillSchema>;

interface SkillsFormProps {
  userProfileData?: {
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

export default function SkillsForm({ userProfileData }: SkillsFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillForm>({
    resolver: zodResolver(skillSchema),
    defaultValues: { skill: '' },
  });

  // ======= مهم: از optional chaining استفاده شده تا اگر userProfileData موجود نبود، ارور ندهد
  const [skills, setSkills] = useState<string[]>(userProfileData?.skills ?? []);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setSkills(userProfileData?.skills ?? []);
  }, [userProfileData]);

  // helper برای ساخت payload امن (اگر userProfileData هنوز undefined باشه، مقدارهای پیش‌فرض می‌ذاریم)
  const buildSafeProfilePayload = (overrides: Partial<SkillsFormProps['userProfileData']> = {}) => {
    return {
      username: userProfileData?.username ?? '',
      fullName: userProfileData?.fullName ?? '',
      bio: userProfileData?.bio ?? '',
      socialUrls: userProfileData?.socialUrls ?? [],
      selectedColor: userProfileData?.selectedColor ?? '',
      skills: userProfileData?.skills ?? [],
      ...overrides,
    };
  };

  // تبدیل خطای API به رشته تا React از نمایش object به عنوان child ارور نده
  const extractApiErrorMessage = (err: any) => {
    const apiData = err?.response?.data ?? err;
    if (typeof apiData === 'string') return apiData;
    if (typeof apiData?.message === 'string') return apiData.message;
    try {
      return JSON.stringify(apiData);
    } catch {
      return 'خطایی رخ داده است';
    }
  };

  // ➕ افزودن مهارت
  const onSubmit = async (data: SkillForm) => {
    setLoading(true);
    setServerError(null);
    setSuccessMsg(null);

    const newSkill = data.skill.trim();
    if (!newSkill) {
      setServerError('مهارت نمی‌تواند خالی باشد');
      setLoading(false);
      return;
    }

    if (skills.includes(newSkill)) {
      setServerError('این مهارت قبلاً ثبت شده است');
      setLoading(false);
      return;
    }

    try {
      const newSkills = [...skills, newSkill];
      const payload = buildSafeProfilePayload({ skills: newSkills });
      const res = await axios.put('/api/user-profile', payload);

      if (res.status === 200) {
        setSkills(newSkills);
        setSuccessMsg('مهارت با موفقیت ثبت شد');
        reset();
      } else {
        setServerError(`خطا: ${res.status}`);
      }
    } catch (err: any) {
      console.error('Error saving skill:', err);
      setServerError(extractApiErrorMessage(err) ?? 'خطا در ثبت مهارت');
    } finally {
      setLoading(false);
    }
  };

  // ❌ حذف مهارت
  const removeSkill = async (index: number) => {
    setLoading(true);
    setServerError(null);
    setSuccessMsg(null);

    try {
      const newSkills = skills.filter((_, i) => i !== index);
      const payload = buildSafeProfilePayload({ skills: newSkills });
      const res = await axios.put('/api/user-profile', payload);

      if (res.status === 200) {
        setSkills(newSkills);
        setSuccessMsg('مهارت با موفقیت حذف شد');
      } else {
        setServerError(`خطا: ${res.status}`);
      }
    } catch (err: any) {
      console.error('Error removing skill:', err);
      setServerError(extractApiErrorMessage(err) ?? 'خطا در حذف مهارت');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion title="مهارت‌ها">
      <section className="flex w-full flex-col gap-2">
        <Controller
          name="skill"
          control={control}
          render={({ field }) => (
            <article className="bg-crust flex flex-col gap-1 rounded-xl p-2">
              <div className="flex items-center gap-x-2.5">
                <Button
                  className="bg-mantle flex h-8 w-8 items-center justify-center rounded-md"
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  isDisabled={loading}
                  aria-label="افزودن مهارت"
                >
                  <PlusSign className="h-4 w-4" />
                </Button>

                <Input
                  {...field}
                  placeholder="زبان‌ها و تکنولوژی‌هایی که بلد هستید را وارد کنید (مثال: C programming language)"
                  className="bg-mantle h-9 w-full rounded-md px-2 py-1 text-xs"
                  aria-label="مهارت"
                />
              </div>

              {errors.skill && <Text className="text-red text-label-xs">{errors.skill.message}</Text>}
            </article>
          )}
        />

        {serverError && <Text className="text-red text-label-xs mt-1">{serverError}</Text>}
        {successMsg && <Text className="text-label-xs mt-1 text-green-400">{successMsg}</Text>}

        {skills.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1">
            {skills.map((skill, idx) => (
              <li
                key={idx}
                className="bg-mantle flex items-center justify-between rounded-md px-2 py-1 text-xs text-white"
              >
                <span className="break-all">{skill}</span>
                <Button
                  type="button"
                  className="text-red-400 hover:text-red-200"
                  onClick={() => removeSkill(idx)}
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
