'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { MultiSelect } from '@/components/fancy-multi-select';
import { useDebounce } from 'use-debounce';
import { searchTags } from './search.api';
import RichTextEditor from '@/components/editor/editor';

type EditorFormData = {
  featuredImage: FileList | null;
  slideImage: FileList | null;
  title: string;
  content: any;
  tags: { name: string }[];
  isDraft: boolean;
};

export default function EditorPage() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditorFormData>({
    defaultValues: {
      featuredImage: null,
      slideImage: null,
      title: '',
      content: {},
      tags: [] as { name: string }[],
      isDraft: false,
    },
  });

  const [selectedTags, setSelectedTags] = useState<{ name: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setValue('tags', selectedTags);
  }, [selectedTags, setValue]);

  const [debouncedSearchQuery] = useDebounce(inputValue, 300);
  const { data: tagsData } = useQuery({
    queryKey: ['tags', debouncedSearchQuery],
    queryFn: () => searchTags(debouncedSearchQuery),
    select: (data) => data?.items || data || [],
    enabled: debouncedSearchQuery.trim().length > 0,
  });

  const createPostMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axios.post('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => alert('پست با موفقیت ایجاد شد'),
    onError: (err: any) => alert(err?.response?.data?.message || err.message),
  });

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    const featured = values.featuredImage;
    if (!featured?.[0]) return alert('تصویر الزامی است');
    formData.append('featuredImage', featured[0]);
    if (values.slideImage?.length > 0) for (const file of values.slideImage) formData.append('slideImage', file);
    formData.append('title', values.title || '');
    formData.append('content', JSON.stringify(values.content || {}));
    formData.append('tags', JSON.stringify(values.tags || []));
    formData.append('isDraft', values.isDraft ? 'true' : 'false');
    createPostMutation.mutate(formData);
  };

  return (
    <div className="text-text flex min-h-screen flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-crust flex w-full flex-col gap-4 rounded-xl p-6">
        <section className="flex h-fit w-full flex-col gap-4">
          <input
            {...register('title', { required: 'عنوان الزامی است' })}
            className="placeholder:text-subtext-0 bg-base h-fit w-full rounded-md p-3 text-sm"
            placeholder="عنوان"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

          <Controller
            control={control}
            name="content"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <RichTextEditor value={value} onChange={onChange} error={error?.message} />
            )}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm">تصویر</label>
            <input
              type="file"
              accept="image/*"
              {...register('featuredImage', { required: true })}
              className="bg-base cursor-pointer rounded-md p-3"
            />
            {errors.featuredImage && <p className="text-sm text-red-500">{errors.featuredImage.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">اسلایدها</label>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register('slideImage')}
              className="bg-base cursor-pointer rounded-md p-3"
            />
          </div>

          <Controller
            control={control}
            name="tags"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <MultiSelect
                items={tagsData || []}
                getLabel={(e) => e.name}
                getValue={(e) => e.name}
                selectedItems={selectedTags}
                onChange={setSelectedTags}
                createNewItem={(val) => ({ name: val })}
                inputValue={inputValue}
                onInputChange={setInputValue}
              />
            )}
          />

          <div className="flex items-center gap-2">
            <input type="checkbox" {...register('isDraft')} id="isDraft" />
            <label htmlFor="isDraft" className="text-sm">
              پیش‌نویس
            </label>
          </div>

          <button type="submit" disabled={isSubmitting} className="bg-sky text-crust w-full rounded-md px-4 py-2">
            {isSubmitting ? 'در حال ارسال...' : 'ارسال'}
          </button>
        </section>
      </form>
    </div>
  );
}
