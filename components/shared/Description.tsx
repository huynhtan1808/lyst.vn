import React from "react";
import Editor from "../shared/Editor";
import { Editor as EditorType } from "@tiptap/react";

export interface DescriptionProps {
  description: string;
}

const Description = React.forwardRef<EditorType, DescriptionProps>(
  ({ description, ...props }, ref) => {
    return (
      <Editor
        readOnly
        description={description}
        className="text-base text-gray-300 hover:text-gray-100"
        {...props}
      />
    );
  }
);

Description.displayName = "Description";

export default Description;
