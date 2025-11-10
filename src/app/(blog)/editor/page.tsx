'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { HiMiniBold } from 'react-icons/hi2';
import { FaItalic } from 'react-icons/fa6';
import { FaStrikethrough } from 'react-icons/fa6';
import { FaQuoteRight } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa6';
import { MdFormatListBulleted } from 'react-icons/md';
import { PiListNumbers } from 'react-icons/pi';
import { MdCopyAll } from 'react-icons/md';
import { MultiSelect } from '@/components/fancy-multi-select';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { searchTags } from './search.api';

export default function EditorPage() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>به ادیتور خوش اومدی ✨</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'outline-none text-right rtl',
      },
    },
  });
  editor?.on('update', ({ editor }) => {
    console.log(editor.getJSON());
  });
  const [selectedTags, setSelectedTags] = useState<{ name: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const [debouncedSearchQuery] = useDebounce(inputValue, 300);
  const { data: tagsData } = useQuery({
    queryKey: ['tags', debouncedSearchQuery],
    queryFn: () => searchTags(debouncedSearchQuery),
    select: (data) => data?.items || data || [],
    enabled: debouncedSearchQuery.trim().length > 0,
  });

  // Force rerender on selection or content change
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

  if (!editor) return <p className="text-sky mt-10 text-center">در حال بارگذاری...</p>;

  const handleCopy = async () => {
    const html = editor.getHTML();
    await navigator.clipboard.writeText(html);
    alert('✅ متن کپی شد!');
  };

  const buttons = [
    {
      label: <HiMiniBold />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      label: <FaItalic />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      label: <FaStrikethrough />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      label: <FaQuoteRight />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      label: <FaCode />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      label: <MdFormatListBulleted />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      label: <PiListNumbers />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
  ];

  return (
    <div className="bg-crust text-text flex min-h-screen items-start justify-center py-10">
      <div className="border-mantle bg-mantle flex w-full max-w-2xl rounded-xl border p-6 shadow-lg">
        {/* Toolbar */}
        <div className="border-crust bg-mantle flex flex-col flex-wrap gap-2 rounded-t-lg border p-2">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className={`rounded border px-3 py-1 text-sm transition-all ${
                btn.isActive() ? 'bg-sky text-crust border-sky' : 'hover:bg-crust border-crust text-sky'
              } `}
            >
              {btn.label}
            </button>
          ))}

          <button
            onClick={handleCopy}
            className="border-crust text-sky hover:bg-crust ml-auto rounded border px-3 py-1"
          >
            <MdCopyAll />
          </button>
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className="border-crust bg-mantle prose text-text [&_blockquote]:border-sky min-h-[200px] w-full max-w-none rounded-b-lg border border-t-0 p-4 text-right focus:outline-none [&_blockquote]:mr-4 [&_blockquote]:rounded-md [&_blockquote]:border-r-4 [&_blockquote]:bg-[#1e1e2e] [&_blockquote]:pr-4 [&_blockquote]:text-[#b4befe] [&_blockquote]:italic [&_code]:rounded [&_code]:bg-[#1e1e2e] [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_ol]:mr-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-[#0f0f17] [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-[#cdd6f4] [&_ul]:mr-6 [&_ul]:list-disc [&_ul]:pl-6"
        />
      </div>
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
    </div>
  );
}
