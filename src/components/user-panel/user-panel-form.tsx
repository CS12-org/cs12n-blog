'use client';

import { Text } from '@/components/react-aria-components';
import UploadImageModal from '@/components/shared/upload-image-modal';
import Accordion from '@/components/user-panel/accordion';
import { SettingCheckboxOption } from '@/components/user-panel/setting-checkbox';
import { TextInput } from '@/components/user-panel/text-field';
import MyRadioGroup from '@/components/user-panel/theme-setting';
import { getUserProfile, GetUserProfileRes } from '@/service/get-user-profile';
import { postUploadAvatar } from '@/service/post-upload-avatar';
import { putUserProfile } from '@/service/put-user-profile';
import React, { useEffect, useState } from 'react';
import { Button, Input, TextField } from 'react-aria-components';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TbEdit } from 'react-icons/tb';
import { twJoin } from 'tailwind-merge';
import z from 'zod';
import ColorSelect from './color-select';
import SocialLinksSection from './social-links-section';
import SkillsForm from './skills-section';
import SkillsSection from './skills-section';

// -----------------------------
// Schema + Types
// -----------------------------
const schema = z.object({
  info: z.string().max(200).optional(),
  fullName: z.string().min(1),
  // selectedColor رو optional گذاشتم تا اگر فرم‌های قدیمی یا داده سرور این فیلد نداشتن خطا نداشته باشیم.
  selectedColor: z.string().optional(),
});

type FormFields = z.infer<typeof schema>;

const DEFAULT_ERROR_MESSAGE = 'متأسفانه، یک خطای غیرمنتظره رخ داده است. لطفا دوباره تلاش کنید.';

// -----------------------------
// Component
// -----------------------------
export default function UserPanelForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // کلاس‌های آماده برای border و background (مطمئن شو این کلاس‌ها در tailwind تعریف شده‌اند)
  const colorClasses: Record<string, string> = {
    lavender: 'border-lavender',
    maroon: 'border-maroon',
    teal: 'border-teal',
    peach: 'border-peach',
    sky: 'border-sky',
    mauve: 'border-mauve',
    pink: 'border-pink',
    flamingo: 'border-flamingo',
  };
  const bgClasses: Record<string, string> = {
    lavender: 'bg-lavender',
    maroon: 'bg-maroon',
    teal: 'bg-teal',
    peach: 'bg-peach',
    sky: 'bg-sky',
    mauve: 'bg-mauve',
    pink: 'bg-pink',
    flamingo: 'bg-flamingo',
  };

  // state محلی برای پیش‌نمایش UI
  const [color, setColor] = useState<string>('lavender'); // مقدار پیش‌فرض
  const [isOpenAvatarModal, setIsOpenAvatarModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // -----------------------------
  // react-hook-form
  // -----------------------------
  const { control, handleSubmit, reset } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      info: '',
      selectedColor: 'lavender',
    },
  });

  // -----------------------------
  // Query: get user profile (existing)
  // -----------------------------
  const {
    data: userProfileData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['userProfile', session?.user?.username],
    queryFn: async (): Promise<GetUserProfileRes> => {
      if (!session?.user?.username) {
        throw new Error('No username available');
      }
      return await getUserProfile({ username: session.user.username });
    },
    enabled: !!session?.user?.username,
  });

  // -----------------------------
  // Mutation: update profile (put)
  // -----------------------------
  const updateMutation = useMutation({
    mutationFn: async (values: FormFields) => {
      // مقدار selectedColor را از فرم بگیر، در صورت نبودن از state color استفاده کن
      const selectedColorToSend = values.selectedColor ?? color ?? 'lavender';

      return await putUserProfile({
        bio: values.info ?? '',
        fullName: values.fullName,
        username: session?.user?.username ?? '',
        selectedColor: selectedColorToSend,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', session?.user?.username] });
    },
    onError: (err: any) => {
      setErrorMessage(err?.response?.statusText || err?.message || DEFAULT_ERROR_MESSAGE);
    },
  });

  // submit handler (همان الگوی قبلی)
  const submitHandler = handleSubmit((values) => {
    updateMutation.mutate(values);
  });

  // -----------------------------
  // Upload avatar mutation (existing)
  // -----------------------------
  const uploadMutation = useMutation({
    mutationFn: async (blob: Blob) => {
      const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
      return await postUploadAvatar({ image: file });
    },
    onSuccess: () => {
      setIsOpenAvatarModal(false);
      queryClient.invalidateQueries({ queryKey: ['userProfile', session?.user?.username] });
    },
    onError: (err: any) => {
      setErrorMessage(err?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    },
  });

  // -----------------------------
  // وقتی پروفایل لود میشه، فرم و state رنگ رو ریست کن
  // -----------------------------
  useEffect(() => {
    if (userProfileData) {
      reset({
        fullName: userProfileData.fullName || '',
        info: userProfileData.bio || '',
        selectedColor: userProfileData.selectedColor ?? 'lavender',
      });
      setColor(userProfileData.selectedColor ?? 'lavender');
    }
  }, [userProfileData, reset]);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <main>
      {isLoading && <div className="flex items-center justify-center pb-4">در حال بارگذاری پروفایل...</div>}
      {isError && <div className="text-red p-4">خطا در بارگذاری: {(error as Error).message}</div>}

      {/* Avatar Upload Modal */}
      {isOpenAvatarModal && (
        <UploadImageModal
          title="آپلود تصویر پروفایل"
          errorMessage={errorMessage}
          currentImageUrl={userProfileData?.avatarUrl ?? ''}
          imageSize={{ w: 100, h: 100 }}
          isPending={uploadMutation?.isPending}
          onUpload={(file) => uploadMutation.mutate(file)}
          OnCloseModal={() => {
            setIsOpenAvatarModal(false);
          }}
        />
      )}

      <form onSubmit={submitHandler} className="text-subtext-1 flex w-full flex-col gap-2.5">
        {/* user information */}
        <Accordion title="اطلاعات کاربر" openAccordion={true}>
          <figure className="grid grid-cols-1 md:grid-cols-[100px_1fr]">
            <div className="relative mt-2.5 flex h-24 w-24 flex-col items-center gap-4 justify-self-center">
              <Image
                width={100}
                height={100}
                src={userProfileData?.avatarUrl ?? '/user-profile.png'}
                alt="User Profile"
                // safe: از map ثابت استفاده می‌کنیم تا tailwind داینامیک نشه
                className={`h-24 w-24 rounded-2xl border-4 ${colorClasses[color ?? 'lavender']}`}
              />

              <Button
                onClick={() => setIsOpenAvatarModal(true)}
                className={`${bgClasses[color ?? 'lavender']} absolute right-1 bottom-1 rounded-tl-lg rounded-br-lg pe-0.5 pt-0.5`}
              >
                <TbEdit size={20} color="#fff" className="m-0.5" />
              </Button>

              <div className="">
                {/* انتخاب رنگ: با Controller متصل میشه */}
                <Controller
                  name="selectedColor"
                  control={control}
                  render={({ field }) => (
                    <ColorSelect
                      selectedColor={field.value ?? color}
                      onSelectionChange={(key) => {
                        const newColor = key as string;
                        setColor(newColor); // برای پیش‌نمایش سریع UI
                        field.onChange(newColor); // برای ذخیره در فرم
                      }}
                      className=""
                    />
                  )}
                />
              </div>
            </div>

            <figcaption className="m-2.5 flex flex-col gap-y-2">
              <Input
                disabled={true}
                value={session?.user?.username}
                placeholder={'نام کاربری'}
                className="bg-mantle w-full rounded-md px-2.5 py-2"
              />

              <Input
                disabled={true}
                value={session?.user?.email}
                placeholder={' ایمیل'}
                className="bg-mantle w-full rounded-md px-2.5 py-2"
              />

              {/* fullName controller (الگوی مشابه شما) */}
              <Controller
                name="fullName"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    name={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    autoComplete="name"
                    onChange={field.onChange}
                    isDisabled={field.disabled}
                    isInvalid={fieldState.invalid}
                  >
                    <Input
                      ref={field.ref}
                      placeholder="نام خود را وارد کنید"
                      className="bg-mantle w-full rounded-md px-2.5 py-2"
                    />
                    <Text
                      slot="description"
                      className={twJoin('text-red text-label-xs block', fieldState.error && 'mt-2')}
                    >
                      {fieldState.error?.message}
                    </Text>
                  </TextField>
                )}
              />

              {/* info controller (الگوی مشابه شما) */}
              <Controller
                name="info"
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
                    autoComplete="current-info"
                  >
                    <Input
                      ref={field.ref}
                      placeholder="توضیح کوتاهی از خود بنویسید. در حد ۲۰۰ کارکتر."
                      className="bg-mantle w-full rounded-md px-2.5 py-2"
                    />
                    <Text
                      slot="description"
                      className={twJoin('text-red text-label-xs block', fieldState.error && 'mt-2')}
                    >
                      {fieldState.error?.message}
                    </Text>
                  </TextField>
                )}
              />

              <div className="flex w-full justify-end gap-2">
                <Button
                  onClick={() => router.push('/forgot-password')}
                  className="bg-red text-crust flex w-fit items-center justify-center rounded-md px-3 py-1 text-sm"
                >
                  تغییر رمز عبور
                </Button>

                <Button
                  type="submit"
                  className={twJoin(
                    'bg-blue text-crust flex w-fit items-center justify-center rounded-md px-3 py-1 text-sm',
                    updateMutation.isPending && 'opacity-10',
                  )}
                  isDisabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? 'در حال ثبت...' : 'ثبت'}
                </Button>
              </div>
            </figcaption>
          </figure>
        </Accordion>

        {/* user profile color setting */}
        <section className="bg-crust flex flex-col gap-y-2.5 rounded-xl p-5">
          <h2 className="text-xs font-bold">تنظیمات رنگ قسمت سمت راست پروفایل :</h2>
          <div className="flex flex-wrap gap-[5px]">
            <MyRadioGroup
              name="theme-color"
              options={[
                { label: 'lavender', bgColorClass: 'bg-lavender', value: 'lavender' },
                { label: 'maroon', bgColorClass: 'bg-maroon', value: 'maroon' },
                { label: 'teal', bgColorClass: 'bg-teal', value: 'teal' },
                { label: 'peach', bgColorClass: 'bg-peach', value: 'peach' },
                { label: 'sky', bgColorClass: 'bg-sky', value: 'sky' },
                { label: 'mauve', bgColorClass: 'bg-mauve', value: 'mauve' },
                { label: 'pink', bgColorClass: 'bg-pink', value: 'pink' },
                { label: 'flamingo', bgColorClass: 'bg-flamingo', value: 'flamingo' },
              ]}
            />
          </div>
        </section>

        {/* social links */}
<SocialLinksSection
  username={userProfileData?.username}
/>


        {/* the rest of accordions (kept unchanged) */}
<SkillsSection username={userProfileData?.username} />
        <Accordion title="تنظیمات">
          <section>
            <fieldset className="bg-crust flex w-full flex-col gap-y-2.5 rounded-xl p-2">
              <SettingCheckboxOption value="sss">
                آیا ۱۰ تا از آخرین نظراتتون در صفحه پروفایلتون توسط دیگران دیده شود؟
              </SettingCheckboxOption>
              <SettingCheckboxOption value="sss1">
                آیا قسمت زبانهایی که بلدید در صفحه پروفایلتون توسط دیگران دیده شود؟
              </SettingCheckboxOption>
              <SettingCheckboxOption value="sss2">
                آیا قسمت هایلایتها و یادداشتهای شیر شده توسط شما در قسمت پروفایلتون قابل مشاهده باشد؟
              </SettingCheckboxOption>
              <SettingCheckboxOption value="sss3">
                آیا قسمت سوشال مدیای شما در پروفایلتون قابل مشاهده توسط دیگران باشد؟
              </SettingCheckboxOption>
              <SettingCheckboxOption value="sss4">
                آیا تصویر پروفایل شما برای دیگران قابل مشاهده باشد؟
              </SettingCheckboxOption>
              <SettingCheckboxOption value="ss5">
                آیا امتیاز و جایگاه شما در چالشهای هفتگی قابل مشاهده باشد؟
              </SettingCheckboxOption>
              <SettingCheckboxOption value="sss6">آیا صفحه پروفایل برای شما ساخته شود؟</SettingCheckboxOption>
              <div className="col-span-3">
                <Button className="bg-red text-crust flex w-full items-center justify-center rounded-md px-3 py-1 text-sm">
                  بازگشت به تنظیمات پیشفرض
                </Button>
              </div>
            </fieldset>
          </section>
        </Accordion>

        <Accordion title="درخواست ها">
          <section>
            <article className="bg-crust flex items-center gap-x-2.5 rounded-xl p-2">
              <Text className="bg-mantle h-9 w-full rounded-md p-2 text-xs">
                شما یک کاربر عادی هستید برای تبدیل شدن به منتور درخواست بدید.
              </Text>
            </article>
          </section>
        </Accordion>

        {/* survay  */}

        {/* TODO: In HTML, <form> cannot be a descendant of <form>. This will
        cause a hydration error. */}
        <Accordion title="نظرسنجی">
          <section className="flex w-full flex-col gap-2">
            <article className="bg-crust flex w-full items-center gap-x-2.5 rounded-xl p-2">
              <form className="w-full">
                <TextInput
                  name="نظر در مورد سایت"
                  placeholder="نظرتون رو در مورد این سایت بنویسید. (بعد از ۲۰ روز در این قسمت امکان نوشتن هست)"
                  className="w-full"
                />
              </form>
            </article>
          </section>
        </Accordion>
      </form>
    </main>
  );
}
