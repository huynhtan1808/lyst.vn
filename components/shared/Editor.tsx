import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import classNames from "classnames";


const Editor = ({ description, setDescription }) => {
  // console.log('description', description);

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
      setDescription(html);
    },
    editorProps: {
      attributes: {
        class: classNames(
          "!max-w-full prose prose-sm prose-invert focus:outline-none focus:border-none min-h-[2rem]"
        ),
      },
    },
  });

  return (
    <div className='border border-gray-300'>
      <EditorContent 
      className={classNames("p-2")}
      editor={editor} />
    </div>
  );
};

export default Editor;