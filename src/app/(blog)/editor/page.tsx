'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { HiMiniBold } from 'react-icons/hi2';
import { FaItalic, FaStrikethrough, FaCode } from 'react-icons/fa6';
import { FaQuoteRight } from 'react-icons/fa';
import { MdFormatListBulleted, MdCopyAll } from 'react-icons/md';
import { PiListNumbers } from 'react-icons/pi';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { MultiSelect } from '@/components/fancy-multi-select';

export default function EditorPage() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      featuredImage: null,
      slideImage: null,
      title: '',
      content: null,
      tags: [],
      isDraft: false,
    },
  });

  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: '<p></p>',
    editorProps: { attributes: { class: 'outline-none text-right rtl' } },
  });

  useEffect(() => {
    if (!editor) return;
    setValue('content', editor.getJSON());
    const handler = () => setValue('content', editor.getJSON(), { shouldDirty: true, shouldValidate: true });
    editor.on('update', handler);
    return () => editor.off('update', handler);
  }, [editor, setValue]);

  const [, forceUpdate] = useState(0);
  useEffect(() => {
    if (!editor) return;
    const handler = () => forceUpdate((n) => n + 1);
    editor.on('selectionUpdate', handler);
    editor.on('transaction', handler);
    return () => {
      editor.off('selectionUpdate', handler);
      editor.off('transaction', handler);
    };
  }, [editor]);

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
    if (values.slideImage?.length > 0) for (let file of values.slideImage) formData.append('slideImage', file);
    formData.append('title', values.title || '');
    formData.append('content', JSON.stringify(values.content || {}));
    formData.append('tags', JSON.stringify(values.tags || []));
    formData.append('isDraft', values.isDraft ? 'true' : 'false');
    createPostMutation.mutate(formData);
  };

  const handleCopy = async () => {
    if (!editor) return;
    await navigator.clipboard.writeText(editor.getHTML());
    alert('متن کپی شد');
  };

  const buttons = [
    {
      label: <HiMiniBold />,
      action: () => editor.chain().focus().toggleBold().run(),
      active: () => editor?.isActive('bold'),
    },
    {
      label: <FaItalic />,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: () => editor?.isActive('italic'),
    },
    {
      label: <FaStrikethrough />,
      action: () => editor.chain().focus().toggleStrike().run(),
      active: () => editor?.isActive('strike'),
    },
    {
      label: <FaQuoteRight />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: () => editor?.isActive('blockquote'),
    },
    {
      label: <FaCode />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      active: () => editor?.isActive('codeBlock'),
    },
    {
      label: <MdFormatListBulleted />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: () => editor?.isActive('bulletList'),
    },
    {
      label: <PiListNumbers />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: () => editor?.isActive('orderedList'),
    },
  ];

  if (!editor) return <p className="text-sky mt-10 text-center">در حال بارگذاری...</p>;

  return (
    <div className="text-text flex min-h-screen flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-crust flex w-full max-w-2xl flex-col gap-4 rounded-xl p-6">
        <section className="flex gap-4">
          <div className="bg-crust flex flex-col flex-wrap gap-2 rounded-t-lg p-2">
            {buttons.map((btn, i) => (
              <button
                key={i}
                type="button"
                onClick={btn.action}
                className={`flex h-[30px] w-[30px] items-center justify-center rounded text-sm ${btn.active() ? 'text-sky' : 'hover:bg-surface-0 text-subtext-0'}`}
              >
                {btn.label}
              </button>
            ))}
            <button
              type="button"
              onClick={handleCopy}
              className="bg-crust text-sky hover:bg-base flex h-[30px] w-[30px] items-center justify-center rounded-md"
            >
              <MdCopyAll className="h-[18px] w-[18px]" />
            </button>
          </div>
          <section className="flex h-fit w-full flex-col gap-4">
            <input
              {...register('title', { required: 'عنوان الزامی است' })}
              className="placeholder:text-subtext-0 bg-base h-fit w-full rounded-md p-3 text-sm"
              placeholder="عنوان"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

            <div className="border-crust bg-base prose text-text [&_blockquote]:border-sky min-h-[200px] w-full rounded-lg border p-4 text-right [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-[#1e1e2e] [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_ol]:mr-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:mr-6 [&_ul]:list-disc [&_ul]:pl-6">
              <EditorContent editor={editor} />
            </div>
            {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}

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
                  items={[]}
                  getLabel={(e) => e.name}
                  getValue={(e) => e.name}
                  selectedItems={value || []}
                  onChange={onChange}
                  createNewItem={(val) => ({ name: val })}
                />
              )}
            />

            <div className="flex items-center gap-2">
              <input type="checkbox" {...register('isDraft')} id="isDraft" />
              <label htmlFor="isDraft" className="text-sm">
                پیش‌نویس
              </label>
            </div>

            <Controller control={control} name="content" rules={{ required: true }} render={() => null} />

            <button type="submit" disabled={isSubmitting} className="bg-sky text-crust w-full rounded-md px-4 py-2">
              {isSubmitting ? 'در حال ارسال...' : 'ارسال'}
            </button>
          </section>
        </section>
      </form>
    </div>
  );
}
