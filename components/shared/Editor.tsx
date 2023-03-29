
import { useState } from 'react';
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
  description: string | null;
  setDescription?: (content: string) => void;
};

const Editor = ({ description, setDescription } : Props) => {

  const [selectedOption, setSelectedOption] = useState("");


  const sampleDesc = `Describe your product in 4-5 bullet points...
    Point #1: this is an explanation of my product.
    Point #2: ....`;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: sampleDesc,
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
          "!max-w-full prose prose-sm focus:outline-none focus:border-none min-h-[5rem]"
        ),
      },
    },
  });

  return (
    <div className='border border-gray-300 rounded-md'>
      <EditorContent 
      className={classNames("p-2")}
      editor={editor} />
      <div className="p-2 flex flex-col md:flex-row justify-between border-t gap-2 border-gray-300">
            <div className="flex items-center md:gap-2 flex-wrap">
              <CircleButton
                secondary
                className="text-gray-300"
                iconClassName="w-4 h-4"
                LeftIcon={AiOutlineBold}
                onClick={() => editor?.chain().toggleBold().focus().run()}
                title="Bold"
              />

              <CircleButton
                secondary
                className="text-gray-300"
                iconClassName="w-4 h-4"
                LeftIcon={AiOutlineUnderline}
                onClick={() => editor?.chain().toggleUnderline().focus().run()}
                title="Underline"
              />

              <CircleButton
                secondary
                className="text-gray-300"
                iconClassName="w-4 h-4"
                LeftIcon={AiOutlineItalic}
                onClick={() => editor?.chain().toggleItalic().focus().run()}
                title="Italic"
              />

              <CircleButton
                secondary
                className="text-gray-300"
                iconClassName="w-4 h-4"
                LeftIcon={AiOutlineUnorderedList}
                onClick={() => editor?.chain().toggleBulletList().focus().run()}
                title="Unordered list"
              />

              <CircleButton
                secondary
                className="text-gray-300"
                iconClassName="w-4 h-4"
                LeftIcon={AiOutlineOrderedList}
                onClick={() => editor?.chain().toggleOrderedList().focus().run()}
                title="Ordered list"
              />

              <CircleButton
                secondary
                className="text-gray-300"
                iconClassName="w-4 h-4"
                LeftIcon={AiOutlineStrikethrough}
                onClick={() => editor?.chain().toggleStrike().focus().run()}
                title="Strikethrough"
              />
            </div>
        </div>
    </div>
  );
};

export default Editor;