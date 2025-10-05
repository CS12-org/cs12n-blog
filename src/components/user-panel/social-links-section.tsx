'use client';

import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Text } from 'react-aria-components';
import Accordion from '@/components/user-panel/accordion';
import PlusSign from '@/assets/images/plus-sign.svg';
import axios from '@/lib/axios';

const socialSchema = z.object({
  link: z.string().url('لینک معتبر نیست'),
});
type SocialForm = z.infer<typeof socialSchema>;

interface SocialLinksSectionProps {
  username?: string;
}

export default function SocialLinksSection({ username }: SocialLinksSectionProps) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SocialForm>({
    resolver: zodResolver(socialSchema),
    defaultValues: { link: '' },
  });

  const { data: links = [], isLoading } = useQuery<string[]>({
    queryKey: ['userProfileSocialLinks', username],
    queryFn: async () => {
      const res = await axios.get(`/api/user-profile?username=${username}`);
      return res.data.socialUrls ?? [];
    },
    enabled: !!username,
  });

  const extractApiError = (err: unknown) => {
    try {
      const data = (err as any)?.response?.data ?? err;
      if (typeof data === 'string') return data;
      if ((data as any)?.message) return (data as any).message;
      return JSON.stringify(data);
    } catch {
      return 'خطایی رخ داده است';
    }
  };

  const addLinkMutation = useMutation<string[], unknown, string>({
    mutationFn: async (newLink: string) => {
      const updatedLinks = [...links, newLink];
      await axios.put('/api/user-profile', { username, socialUrls: updatedLinks });
      return updatedLinks;
    },
    onSuccess: (updatedLinks: string[]) => {
      queryClient.setQueryData(['userProfileSocialLinks', username], updatedLinks);
      reset();
    },
    onError: (err) => console.error(extractApiError(err)),
  });

  const removeLinkMutation = useMutation<string[], unknown, number>({
    mutationFn: async (index: number) => {
      const updatedLinks = links.filter((_: string, idx: number) => idx !== index);
      await axios.put('/api/user-profile', { username, socialUrls: updatedLinks });
      return updatedLinks;
    },
    onSuccess: (updatedLinks: string[]) => {
      queryClient.setQueryData(['userProfileSocialLinks', username], updatedLinks);
    },
    onError: (err) => console.error(extractApiError(err)),
  });

  const onAddLink = (data: SocialForm) => {
    const trimmed = data.link.trim();
    if (!trimmed) return;
    if (links.includes(trimmed)) return;
    addLinkMutation.mutate(trimmed);
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
                  onClick={handleSubmit(onAddLink)}
                  isDisabled={addLinkMutation.isPending}
                  aria-label="افزودن لینک"
                >
                  <PlusSign className="h-4 w-4" />
                </Button>

                <Input
                  {...field}
                  placeholder="لینک سوشال مدیا خود را وارد کنید"
                  className="bg-mantle h-9 w-full rounded-md px-2 py-1 text-xs"
                  aria-label="لینک سوشال"
                />
              </div>
              {errors.link && <Text className="text-red text-label-xs">{errors.link.message}</Text>}
            </article>
          )}
        />

        {isLoading && <Text>در حال بارگذاری لینک‌ها...</Text>}

        {links.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1">
            {links.map((link: string, idx: number) => (
              <li
                key={idx}
                className="bg-mantle flex items-center justify-between rounded-md px-2 py-1 text-xs text-white"
              >
                <a href={link} target="_blank" rel="noopener noreferrer" className="break-all underline">
                  {link}
                </a>
                <Button
                  type="button"
                  className="text-red-400 hover:text-red-200"
                  onClick={() => removeLinkMutation.mutate(idx)}
                  isDisabled={removeLinkMutation.isPending}
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
