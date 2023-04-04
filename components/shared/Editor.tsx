"use client"

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import classNames from "classnames";
import CircleButton from "@/components/shared/CircleButton";
import {
  AiOutlineBold,
  AiOutlineEyeInvisible,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineSend,
  AiOutlineStrikethrough,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
} from "react-icons/ai";


type Props = {
  description?: string | null;
  setDescription?: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className: string | null;
};

const Editor = ({ description, setDescription, readOnly, className, placeholder } : Props) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder,
        emptyNodeClass:
          "first:before:h-0 first:before:text-gray-500 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
      }),
    ],
    content: description,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (setDescription) {
        setDescription(html);
      }
    },
    editorProps: {
      attributes: {
        class: classNames(
          "!max-w-full prose prose-sm focus:outline-none focus:border-none min-h-[5rem]",
          !readOnly && "min-h-[2rem]",
        ),
      },
    },
    editable: !readOnly,
  });
  [placeholder, readOnly]

  return (
    <div 
      className={classNames(!readOnly && "border border-gray-300", className)}
      >
      <EditorContent 
      className={classNames("p-2")}
      editor={editor}
      />
      
      {!readOnly && (
      <div className="p-2 flex flex-col md:flex-row justify-between border-t gap-2 border-gray-300">
            <div className="flex items-center md:gap-2 flex-wrap">
              <CircleButton
                secondary
                className="text-gray-400"
                iconClassName="w-4 h-4"
                LeftIcon={AiOutlineBold}
                onClick={() => editor?.chain().toggleBold().focus().run()}
                title="Bold"
                label=""
              />

              <CircleButton
                secondary
                className="text-gray-400"
                iconClassName="w-4 h-4"
                LeftIcon={AiOutlineUnderline}
                onClick={() => editor?.chain().toggleUnderline().focus().run()}
                title="Underline"
                label=""
              />

              <CircleButton
                secondary
                className="text-gray-400"
                iconClassName="w-4 h-4"
                LeftIcon={AiOutlineItalic}
                onClick={() => editor?.chain().toggleItalic().focus().run()}
                title="Italic"
                label=""
              />

              <CircleButton
                secondary
                className="text-gray-300"
                iconClassName="w-4 h-4"
                LeftIcon={AiOutlineUnorderedList}
                onClick={() => editor?.chain().toggleBulletList().focus().run()}
                title="Unordered list"
                label=""
              />

              <CircleButton
                secondary
                className="text-gray-400"
                iconClassName="w-4 h-4"
                LeftIcon={AiOutlineOrderedList}
                onClick={() => editor?.chain().toggleOrderedList().focus().run()}
                title="Ordered list"
                label=""
              />

              <CircleButton
                secondary
                className="text-gray-400"
                iconClassName="w-4 h-4"
                LeftIcon={AiOutlineStrikethrough}
                onClick={() => editor?.chain().toggleStrike().focus().run()}
                title="Strikethrough"
                label=""
              />
            </div>
        </div>
      )}
    </div>
  );
};

export default Editor;