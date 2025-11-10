'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { HiMiniBold } from "react-icons/hi2";
import { FaItalic } from "react-icons/fa6";
import { FaStrikethrough } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { MdFormatListBulleted } from "react-icons/md";
import { PiListNumbers } from "react-icons/pi";
import { MdCopyAll } from "react-icons/md";

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

  // Force rerender on selection or content change
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    if (!editor) return;
    const handler = () => forceUpdate(n => n + 1);
    editor.on('selectionUpdate', handler);
    editor.on('transaction', handler);
    return () => {
      editor.off('selectionUpdate', handler);
      editor.off('transaction', handler);
    };
  }, [editor]);

  if (!editor) return <p className="text-center mt-10 text-sky">در حال بارگذاری...</p>;

  const handleCopy = async () => {
    const html = editor.getHTML();
    await navigator.clipboard.writeText(html);
    alert('✅ متن کپی شد!');
  };

  const buttons = [
    { label: <HiMiniBold />, action: () => editor.chain().focus().toggleBold().run(), isActive: () => editor.isActive('bold') },
    { label: <FaItalic />, action: () => editor.chain().focus().toggleItalic().run(), isActive: () => editor.isActive('italic') },
    { label: <FaStrikethrough />, action: () => editor.chain().focus().toggleStrike().run(), isActive: () => editor.isActive('strike') },
    { label: <FaQuoteRight />, action: () => editor.chain().focus().toggleBlockquote().run(), isActive: () => editor.isActive('blockquote') },
    { label: <FaCode />, action: () => editor.chain().focus().toggleCodeBlock().run(), isActive: () => editor.isActive('codeBlock') },
    { label: <MdFormatListBulleted />, action: () => editor.chain().focus().toggleBulletList().run(), isActive: () => editor.isActive('bulletList') },
    { label: <PiListNumbers />, action: () => editor.chain().focus().toggleOrderedList().run(), isActive: () => editor.isActive('orderedList') },
  ];

  return (
    <div className="min-h-screen bg-crust text-text flex justify-center items-start py-10">
      <div className="w-full max-w-2xl rounded-xl flex shadow-lg border border-mantle bg-mantle p-6">

        {/* Toolbar */}
        <div className="flex flex-wrap flex-col gap-2 border border-crust rounded-t-lg p-2 bg-mantle">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className={`
                px-3 py-1 rounded border text-sm transition-all
                ${btn.isActive()
                  ? 'bg-sky text-crust border-sky'
                  : 'hover:bg-crust border-crust text-sky'}
              `}
            >
              {btn.label}
            </button>
          ))}

          <button
            onClick={handleCopy}
            className="ml-auto px-3 py-1 rounded border border-crust text-sky hover:bg-crust"
          >
          <MdCopyAll />
          </button>
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className="border w-full border-t-0 border-crust rounded-b-lg p-4 min-h-[200px] bg-mantle prose max-w-none text-right focus:outline-none text-text
            [&_pre]:bg-[#0f0f17] [&_pre]:text-[#cdd6f4] [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:font-mono [&_pre]:overflow-x-auto
            [&_code]:bg-[#1e1e2e] [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono
            [&_ul]:list-disc [&_ul]:mr-6 [&_ul]:pl-6
            [&_ol]:list-decimal [&_ol]:mr-6 [&_ol]:pl-6
            [&_blockquote]:border-r-4 [&_blockquote]:border-sky [&_blockquote]:mr-4 [&_blockquote]:pr-4 [&_blockquote]:italic [&_blockquote]:bg-[#1e1e2e] [&_blockquote]:rounded-md [&_blockquote]:text-[#b4befe]
          "
        />
      </div>
    </div>
  );
}
