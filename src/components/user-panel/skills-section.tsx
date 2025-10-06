'use client';

import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Text } from 'react-aria-components';
import Accordion from '@/components/user-panel/accordion';
import PlusSign from '@/assets/images/plus-sign.svg';
import axios from '@/lib/axios';
import RemovableListItem from './removable-list-item';
import { putUserProfile } from '@/service/put-user-profile';

const skillSchema = z.object({
  skill: z.string().min(2, 'مهارت باید حداقل ۲ کاراکتر باشد').max(50, 'مهارت نمی‌تواند بیشتر از ۵۰ کاراکتر باشد'),
});

type SkillForm = z.infer<typeof skillSchema>;

interface SkillsSectionProps {
  username?: string;
}

export default function SkillsSection({ username }: SkillsSectionProps) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillForm>({
    resolver: zodResolver(skillSchema),
    defaultValues: { skill: '' },
  });

  const { data: skills = [], isLoading } = useQuery<string[]>({
    queryKey: ['userProfileSkills', username],
    queryFn: async () => {
      const res = await axios.get(`/api/user-profile?username=${username}`);
      return res.data.skills ?? [];
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

  const addSkillMutation = useMutation<string[], unknown, string>({
    mutationFn: async (newSkill: string) => {
      const updatedSkills = [...skills, newSkill];
      await putUserProfile({ username, skills: updatedSkills });
      return updatedSkills;
    },
    onSuccess: (updatedSkills) => {
      queryClient.setQueryData(['userProfileSkills', username], updatedSkills);
      reset();
    },
  });

  const removeSkillMutation = useMutation<string[], unknown, number>({
    mutationFn: async (index: number) => {
      const updatedSkills = skills.filter((_, idx) => idx !== index);
      await putUserProfile({ username, skills: updatedSkills });
      return updatedSkills;
    },
    onSuccess: (updatedSkills) => {
      queryClient.setQueryData(['userProfileSkills', username], updatedSkills);
    },
  });

  const onAddSkill = (data: SkillForm) => {
    const trimmed = data.skill.trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) return;
    addSkillMutation.mutate(trimmed);
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
                  onClick={handleSubmit(onAddSkill)}
                  isDisabled={addSkillMutation.isPending}
                  aria-label="افزودن مهارت"
                >
                  <PlusSign className="h-4 w-4" />
                </Button>

                <Input
                  {...field}
                  placeholder="زبان‌ها و تکنولوژی‌هایی که بلد هستید را وارد کنید"
                  className="bg-mantle h-9 w-full rounded-md px-2 py-1 text-xs"
                  aria-label="مهارت"
                />
              </div>
              {errors.skill && <Text className="text-red text-label-xs">{errors.skill.message}</Text>}
            </article>
          )}
        />

        {isLoading && <Text>در حال بارگذاری مهارت‌ها...</Text>}

        {skills.length > 0 && (
          <ul className="mt-2 flex flex-col gap-2">
            {skills.map((skill: string, idx: number) => (
              <RemovableListItem
                key={idx}
                text={skill}
                onRemove={() => removeSkillMutation.mutate(idx)}
                disabled={removeSkillMutation.isPending}
              />
            ))}
          </ul>
        )}
      </section>
    </Accordion>
  );
}
