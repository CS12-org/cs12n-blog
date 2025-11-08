'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

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
    { label: 'B', action: () => editor.chain().focus().toggleBold().run(), isActive: () => editor.isActive('bold') },
    {
      label: 'I',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      label: 'S',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      label: '« »',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      label: 'Code',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      label: '• List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      label: '1. List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
  ];

  return (
    <div className="text-text flex min-h-screen items-start justify-center py-10">
      <div className="border-mantle bg-mantle w-full max-w-2xl rounded-xl border p-6 shadow-lg">
        <h2 className="text-sky mb-4 text-right text-2xl font-semibold">پست خود را بنویسید</h2>

        {/* Toolbar */}
        <div className="border-crust bg-mantle flex flex-wrap gap-2 rounded-t-lg border p-2">
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
            Copy
          </button>
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className="border-crust bg-mantle prose text-text [&_blockquote]:border-sky min-h-[200px] max-w-none rounded-b-lg border border-t-0 p-4 text-right focus:outline-none [&_blockquote]:mr-4 [&_blockquote]:rounded-md [&_blockquote]:border-r-4 [&_blockquote]:bg-[#1e1e2e] [&_blockquote]:pr-4 [&_blockquote]:text-[#b4befe] [&_blockquote]:italic [&_code]:rounded [&_code]:bg-[#1e1e2e] [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_ol]:mr-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-[#0f0f17] [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-[#cdd6f4] [&_ul]:mr-6 [&_ul]:list-disc [&_ul]:pl-6"
        />
      </div>
    </div>
  );
}
