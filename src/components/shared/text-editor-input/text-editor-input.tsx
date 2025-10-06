'use client';

import { useEditor, EditorContent } from 'tiptap/react';
import Bold from 'tiptap/extension-bold';
import Document from 'tiptap/extension-document';
import Paragraph from 'tiptap/extension-paragraph';
import Text from 'tiptap/extension-text';
import Italic from 'tiptap/extension-italic';
import { all, createLowlight } from 'lowlight';
import Blockquote from 'tiptap/extension-blockquote';
import CodeBlockLowlight from 'tiptap/extension-code-block-lowlight';
import { GrBlockQuote } from 'react-icons/gr';
import { FaCode } from 'react-icons/fa6';
import { FaItalic } from 'react-icons/fa6';
import { HiOutlineBold } from 'react-icons/hi2';
import { TextEditorButton } from './text-editor-button';
import Placeholder from 'tiptap/extension-placeholder'; // Import Placeholder
import { FC, useEffect } from 'react';

type TextEditorInputProps = { content?: string; placeHolder?: string; onChange?: (content: string) => void };

const TextEditorInput: FC<TextEditorInputProps> = ({
  content = '',
  placeHolder = 'کامنت خود رو بنویسید ...',
  onChange,
}) => {
  const lowlight = createLowlight(all);
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Blockquote,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Placeholder.configure({
        placeholder: placeHolder, // Use the placeHolder prop
        showOnlyWhenEditable: true, // Show placeholder only when editor is editable
        showOnlyCurrent: false, // Show placeholder in all empty nodes
      }),
    ],
    content: content.trim() || '<p></p>',
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => {
      // Trigger onChange with the editor's HTML content
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content.trim() || '<p></p>');
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }
  return (
    <div className="bg-surface-0 flex flex-col gap-4 rounded-lg p-2">
      <EditorContent editor={editor} />
      <div className="flex gap-2 self-end">
        <TextEditorButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'text-sapphire' : ''}
        >
          <GrBlockQuote />
        </TextEditorButton>
        <TextEditorButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'text-sapphire' : ''}
        >
          <FaCode />
        </TextEditorButton>
        <TextEditorButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'text-sapphire' : ''}
        >
          <FaItalic />
        </TextEditorButton>
        <TextEditorButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'text-sapphire' : ''}
        >
          <HiOutlineBold />
        </TextEditorButton>
      </div>
    </div>
  );
};

export default TextEditorInput;
