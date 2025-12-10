'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { HiMiniBold } from 'react-icons/hi2';
import { FaItalic, FaStrikethrough, FaCode } from 'react-icons/fa6';
import { FaQuoteRight } from 'react-icons/fa';
import { MdFormatListBulleted, MdCopyAll } from 'react-icons/md';
import { PiListNumbers } from 'react-icons/pi';
import Placeholder from '@tiptap/extension-placeholder';

type RichTextEditorProps = {
  value?: any;
  onChange?: (content: any) => void;
  error?: string;
};

export default function RichTextEditor({ value, onChange, error }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: 'شروع به نوشتن کنید ...' })],
    immediatelyRender: false,
    content: '<p></p>',
    editorProps: { attributes: { class: 'outline-none  ' } },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
    textDirection: 'auto',
  });

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

  const handleCopy = async () => {
    if (!editor) return;
    await navigator.clipboard.writeText(editor.getHTML());
    alert('متن کپی شد');
  };

  const buttons = [
    {
      label: <HiMiniBold />,
      action: () => editor?.chain().focus().toggleBold().run(),
      active: () => editor?.isActive('bold'),
    },
    {
      label: <FaItalic />,
      action: () => editor?.chain().focus().toggleItalic().run(),
      active: () => editor?.isActive('italic'),
    },
    {
      label: <FaStrikethrough />,
      action: () => editor?.chain().focus().toggleStrike().run(),
      active: () => editor?.isActive('strike'),
    },
    {
      label: <FaQuoteRight />,
      action: () => editor?.chain().focus().toggleBlockquote().run(),
      active: () => editor?.isActive('blockquote'),
    },
    {
      label: <FaCode />,
      action: () => editor?.chain().focus().toggleCodeBlock().run(),
      active: () => editor?.isActive('codeBlock'),
    },
    {
      label: <MdFormatListBulleted />,
      action: () => editor?.chain().focus().toggleBulletList().run(),
      active: () => editor?.isActive('bulletList'),
    },
    {
      label: <PiListNumbers />,
      action: () => editor?.chain().focus().toggleOrderedList().run(),
      active: () => editor?.isActive('orderedList'),
    },
  ];

  if (!editor) return <p className="text-sky mt-10 text-center">در حال بارگذاری...</p>;

  return (
    <div className="flex gap-4">
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
        <div className="border-crust bg-base prose text-text [&_blockquote]:border-sky min-h-[400px] w-full rounded-lg border p-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-[#1e1e2e] [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_ol]:mr-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:mr-6 [&_ul]:list-disc [&_ul]:pl-6">
          <EditorContent editor={editor} />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </section>
    </div>
  );
}
