'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

export default function EditorPage() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>پستت رو بنویس</p>',
    immediatelyRender: false, // لازم برای Next.js
  });

  if (!editor) {
    return <p className="text-center text-gray-500 mt-10">در حال بارگذاری ادیتور...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-2">
      <h2 className="text-2xl font-semibold mb-4 text-right"> ویرایشگر متن</h2>

      <div className="border border-gray-300 rounded-xl p-4 min-h-[200px] text-right rtl">
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none focus:outline-none"
        />
      </div>
    </div>
  );
}
